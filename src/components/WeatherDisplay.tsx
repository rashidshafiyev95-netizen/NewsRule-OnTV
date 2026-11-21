import React, { useState, useEffect, useCallback } from 'react';
import {
  CloudSun,
  RefreshCw,
  Volume2,
  VolumeX,
  ShieldCheck,
  MapPin,
  Wind,
  Droplets,
  Gauge,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { AIStudioClient } from '../services/aiStudioClient';
import { soundFx } from '../services/soundFx';
import { speechAnchor } from '../services/speechAnchor';
import { AppLanguage, getTranslations, getLanguageMeta } from '../services/i18n';

interface WeatherDisplayProps {
  onBackToNews?: () => void;
  isCompact?: boolean;
  currentLanguage?: AppLanguage;
}

const IMG_WEATHER_BAKU = '/src/assets/images/baku_caspian_boulevard_1794487961025.jpg';

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  onBackToNews,
  isCompact = false,
  currentLanguage = 'en',
}) => {
  const t = getTranslations(currentLanguage);

  const [weather, setWeather] = useState<{
    temp: number | string;
    condition: string;
    summary: string[];
  }>({
    temp: 18,
    condition: 'Caspian Breeze & Partly Cloudy',
    summary: [t.weatherBriefTitle],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const loadWeather = useCallback(async () => {
    setIsLoading(true);
    const data = await AIStudioClient.fetchBakuWeather(currentLanguage);
    setWeather(data);
    setIsLoading(false);
  }, [currentLanguage]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const handleReadAloud = () => {
    soundFx.playSelect();
    if (isSpeaking) {
      speechAnchor.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const headline = `${t.weatherTitle}: ${weather.temp}°C, ${weather.condition}`;

      speechAnchor.speakArticle(headline, weather.summary, undefined, currentLanguage);

      const checkInterval = setInterval(() => {
        if (!speechAnchor.isSpeaking()) {
          setIsSpeaking(false);
          clearInterval(checkInterval);
        }
      }, 500);
    }
  };

  // Compact Header Strip View
  if (isCompact) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 text-xs font-mono">
        <CloudSun className="w-4 h-4 text-amber-700 dark:text-amber-400" />
        <span className="font-bold text-zinc-950 dark:text-white tabular-nums">{weather.temp}°C</span>
        <span className="text-zinc-600 dark:text-zinc-400 hidden xl:inline truncate max-w-[120px]">{weather.condition}</span>
      </div>
    );
  }

  // Full Screen TV Weather Hub
  return (
    <div className="w-full flex-1 flex flex-col rounded-2xl overflow-hidden border-2 border-zinc-300 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 select-none shadow-2xl">
      {/* Top Hero Banner with Real Baku Panoramic Photography */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-900">
        <img
          src={IMG_WEATHER_BAKU}
          alt="Baku Boulevard and Caspian Sea"
          className="w-full h-full object-cover opacity-60"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <span className="text-amber-400 font-bold">CH 010</span>
            <span aria-hidden="true">·</span>
            <span>Baku, Azerbaijan</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-400">Absheron Maritime Coastline</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playSelect();
                loadWeather();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-zinc-700/80 text-zinc-200 text-xs font-mono hover:bg-zinc-800 transition-colors"
              title="Refresh Forecast [R]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">{t.refreshForecast}</span>
            </button>

            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                isSpeaking
                  ? 'bg-amber-400 text-black border-amber-400 font-bold animate-pulse'
                  : 'bg-zinc-900/80 backdrop-blur-md hover:bg-zinc-800 text-amber-300 border-amber-500/30'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? t.readingForecast : t.voiceBrief}</span>
            </button>

            {onBackToNews && (
              <button
                onClick={() => {
                  soundFx.playBack();
                  onBackToNews();
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-zinc-300 text-xs font-mono hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.backToMenu} [Esc]</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Temperature Readout Overlay */}
        <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl sm:text-7xl font-bold font-display tracking-tight text-white tabular-nums leading-none">
                {weather.temp}°
              </span>
              <span className="text-xl sm:text-2xl text-zinc-300 font-medium font-display">
                {weather.condition}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              {t.weatherStation}
            </p>
          </div>

          {/* Meteorological Vector Gauges */}
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span>Khazri: 18 km/h</span>
            </div>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>{t.weatherHumidity}: 62%</span>
            </div>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>1016 hPa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Content & Bulleted Insights */}
      <div dir={getLanguageMeta(currentLanguage).dir} className="p-6 sm:p-8 space-y-6 bg-white dark:bg-zinc-950">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold mb-3 flex items-center justify-between">
            <span>{t.weatherBriefTitle}</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-500 font-normal">{t.weatherCoastalTelemetry}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weather.summary.map((bullet, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-amber-700 dark:bg-amber-400 mt-2 shrink-0" />
                <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {bullet.replace(/^[•\s-]+/, '')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Day Maritime Outlook Strip */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-3">
            {t.weatherTrajectory}
          </div>
          <div className="grid grid-cols-3 gap-3 text-center font-mono">
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-300 dark:border-zinc-800">
              <div className="text-xs text-zinc-600 dark:text-zinc-400">{t.weatherToday}</div>
              <div className="text-lg font-bold text-zinc-950 dark:text-white mt-1">18°C</div>
              <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">Khazri 18 km/h</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-300 dark:border-zinc-800">
              <div className="text-xs text-zinc-600 dark:text-zinc-400">{t.weatherTomorrow}</div>
              <div className="text-lg font-bold text-zinc-950 dark:text-white mt-1">21°C</div>
              <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">Gilavar 12 km/h</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-300 dark:border-zinc-800">
              <div className="text-xs text-zinc-600 dark:text-zinc-400">{t.weatherSaturday}</div>
              <div className="text-lg font-bold text-zinc-950 dark:text-white mt-1">19°C</div>
              <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">ABŞERON 1016 hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
