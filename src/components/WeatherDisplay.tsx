import React, { useState, useEffect } from 'react';
import { CloudSun, RefreshCw, Volume2, VolumeX, ShieldCheck, MapPin } from 'lucide-react';
import { AIStudioClient } from '../services/aiStudioClient';
import { soundFx } from '../services/soundFx';
import { speechAnchor } from '../services/speechAnchor';

interface WeatherDisplayProps {
  onBackToNews?: () => void;
  isCompact?: boolean;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  onBackToNews,
  isCompact = false,
}) => {
  const [weather, setWeather] = useState<{
    temp: number | string;
    condition: string;
    summary: string[];
  }>({
    temp: '--',
    condition: 'Loading Forecast...',
    summary: ['• Checking local conditions...'],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const loadWeather = async () => {
    setIsLoading(true);
    const data = await AIStudioClient.fetchBakuWeather();
    setWeather(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const handleReadAloud = () => {
    soundFx.playSelect();
    if (isSpeaking) {
      speechAnchor.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechAnchor.speakArticle(
        `Weather in Baku, Azerbaijan is currently ${weather.temp} degrees Celsius, with ${weather.condition}`,
        weather.summary
      );
      // Auto-reset isSpeaking when speech ends
      const checkInterval = setInterval(() => {
        if (!speechAnchor.isSpeaking()) {
          setIsSpeaking(false);
          clearInterval(checkInterval);
        }
      }, 500);
    }
  };

  if (isCompact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono">
        <CloudSun className="w-4 h-4 text-amber-400" />
        <span className="font-bold text-white">{weather.temp}°C</span>
        <span className="text-zinc-400 hidden xl:inline">{weather.condition}</span>
      </div>
    );
  }

  return (
    <div
      className="w-full flex-1 flex flex-col justify-between rounded-xl border border-zinc-800 select-none transition-none"
      style={{
        backgroundColor: '#000000',
        padding: '32dp', // exact android:padding="32dp"
      }}
    >
      <div>
        {/* TV Header Info Strip */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Baku, Azerbaijan
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                  CH 010
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                NewsRule AI Weather Assistant • Caspian Basin Telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playSelect();
                loadWeather();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono transition-none"
              title="Refresh Forecast"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Refresh [R]</span>
            </button>

            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-none ${
                isSpeaking
                  ? 'bg-amber-400 text-black border-amber-400 font-bold animate-pulse'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-amber-300 border-amber-500/30'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Reading Forecast...' : 'Voice Brief [P]'}</span>
            </button>
          </div>
        </div>

        {/* Temperature Display: TextView android:id="@+id/weatherTempText" */}
        <div
          id="weatherTempText"
          className="font-bold tracking-tight text-white leading-none font-mono"
          style={{
            fontSize: '72px', // android:textSize="72sp"
            color: '#FFFFFF', // android:textColor="#FFFFFF"
            fontWeight: 'bold',
          }}
        >
          {weather.temp}°C
        </div>

        {/* Condition Subtitle: TextView android:id="@+id/weatherConditionText" */}
        <div
          id="weatherConditionText"
          className="font-mono mt-2"
          style={{
            fontSize: '24px', // android:textSize="24sp"
            color: '#CCCCCC', // android:textColor="#CCCCCC"
            marginBottom: '24px', // android:layout_marginBottom="24dp"
          }}
        >
          {weather.condition}
        </div>

        {/* Bulleted AI Forecast Brief: TextView android:id="@+id/weatherBriefText" */}
        <div
          id="weatherBriefText"
          className="font-mono p-5 rounded-xl bg-zinc-950 border-l-4 border-amber-400 border-y border-r border-zinc-800 space-y-3"
          style={{
            fontSize: '18px', // android:textSize="18sp"
            color: '#EAEAEA', // android:textColor="#EAEAEA"
            lineHeight: '1.6', // android:lineSpacingExtra="8dp"
          }}
        >
          <div className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>NewsRule Weather Assistant Brief & Clothing Advisory:</span>
            <span className="text-[10px] text-zinc-500">Gemini Powered</span>
          </div>

          <ul className="space-y-3">
            {weather.summary.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{point.replace(/^[•\s-]+/, '')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-6 border-t border-zinc-800/80 mt-6 flex items-center justify-between text-xs font-mono text-zinc-500">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" /> Meteorological Wire Verified
        </span>
        <span className="text-zinc-400">
          Press [◄] or [Esc] to Return to Channels
        </span>
      </div>
    </div>
  );
};
