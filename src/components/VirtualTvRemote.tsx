import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Tv,
  Volume2,
  VolumeX,
  FileText,
  RotateCcw,
  Sparkles,
  Cpu,
  Minimize2,
  Maximize2,
  Radio,
  Power,
  CloudSun,
  Globe
} from 'lucide-react';
import { soundFx } from '../services/soundFx';
import { AppLanguage } from '../services/i18n';

interface VirtualTvRemoteProps {
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onSelect: () => void;
  onBack: () => void;
  onToggleMode: () => void;
  onToggleTeletext: () => void;
  onOpenTerms: () => void;
  onOpenDiagnostics: () => void;
  onToggleSpeech: () => void;
  onOpenLanguage?: () => void;
  onSelectWeather?: () => void;
  isSpeaking: boolean;
  currentProfile: 'LEGACY_LITE' | 'MODERN_RICH';
  isTeletextOpen: boolean;
  currentLanguage?: AppLanguage;
}

export const VirtualTvRemote: React.FC<VirtualTvRemoteProps> = ({
  onNavigate,
  onSelect,
  onBack,
  onToggleMode,
  onToggleTeletext,
  onOpenTerms,
  onOpenDiagnostics,
  onToggleSpeech,
  onOpenLanguage,
  onSelectWeather,
  isSpeaking,
  currentProfile,
  isTeletextOpen,
  currentLanguage = 'en',
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
    if (next) soundFx.playSelect();
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none font-mono">
      {isCollapsed ? (
        <button
          onClick={() => {
            soundFx.playSelect();
            setIsCollapsed(false);
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-xl backdrop-blur-md text-xs font-bold transition-all hover:scale-105"
          title="Open Virtual TV Remote"
        >
          <Tv className="w-4 h-4" />
          <span>TV Remote</span>
          <Maximize2 className="w-3 h-3 text-zinc-400" />
        </button>
      ) : (
        <div className="w-72 bg-zinc-950/95 border-2 border-zinc-700/80 rounded-3xl p-4 shadow-2xl backdrop-blur-xl text-zinc-200">
          {/* Remote Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase">
                NewsRule Remote
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleSound}
                className="p-1 rounded text-zinc-400 hover:text-white"
                title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-red-400" />}
              </button>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 rounded text-zinc-400 hover:text-white"
                title="Collapse Remote"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Action Pills: 4 Key TV Operations including Language [L] */}
          <div className="grid grid-cols-4 gap-1 mb-3">
            <button
              onClick={() => {
                soundFx.playToggleMode();
                onToggleMode();
              }}
              className="py-1.5 px-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[10px] font-semibold text-amber-300 border border-amber-500/30 flex items-center justify-center gap-0.5 transition-colors"
              title="Switch between Old TV (Legacy Lite) and Modern 4K [T]"
            >
              <Tv className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{currentProfile === 'LEGACY_LITE' ? 'Old [T]' : '4K [T]'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                if (onSelectWeather) onSelectWeather();
              }}
              className="py-1.5 px-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[10px] font-semibold text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-0.5 transition-colors"
              title="NewsRule Weather Assistant (Baku) [W]"
            >
              <CloudSun className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Baku [W]</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                onToggleTeletext();
              }}
              className={`py-1.5 px-1 rounded-lg text-[10px] font-semibold border flex items-center justify-center gap-0.5 transition-colors ${
                isTeletextOpen
                  ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
              }`}
              title="Toggle Retro Teletext / Ceefax mode [X]"
            >
              <Radio className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>TXT [X]</span>
            </button>

            {/* Language Selection Dialog Shortcut Button [L] */}
            <button
              onClick={() => {
                soundFx.playSelect();
                if (onOpenLanguage) onOpenLanguage();
              }}
              className="py-1.5 px-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[10px] font-bold text-amber-400 border border-amber-500/40 flex items-center justify-center gap-0.5 transition-colors"
              title="Select Language / Dil Seçimi / Выберите язык [L]"
            >
              <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="uppercase">{currentLanguage} [L]</span>
            </button>
          </div>

          {/* D-Pad Controller */}
          <div className="relative w-40 h-40 mx-auto my-2">
            <div className="absolute inset-0 rounded-full bg-zinc-900 border border-zinc-800 shadow-inner flex items-center justify-center">
              {/* Up */}
              <button
                onClick={() => {
                  soundFx.playFocus();
                  onNavigate('up');
                }}
                className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-10 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Up"
              >
                <ChevronUp className="w-6 h-6" />
              </button>

              {/* Down */}
              <button
                onClick={() => {
                  soundFx.playFocus();
                  onNavigate('down');
                }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-10 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Down"
              >
                <ChevronDown className="w-6 h-6" />
              </button>

              {/* Left */}
              <button
                onClick={() => {
                  soundFx.playFocus();
                  onNavigate('left');
                }}
                className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-12 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right */}
              <button
                onClick={() => {
                  soundFx.playFocus();
                  onNavigate('right');
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-12 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Center OK Button */}
              <button
                onClick={() => {
                  soundFx.playSelect();
                  onSelect();
                }}
                className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                aria-label="OK / Select"
              >
                OK
              </button>
            </div>
          </div>

          {/* Secondary Function Buttons */}
          <div className="grid grid-cols-3 gap-1.5 mt-3 pt-2 border-t border-zinc-800">
            <button
              onClick={() => {
                soundFx.playBack();
                onBack();
              }}
              className="py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-800 flex flex-col items-center justify-center gap-0.5 active:bg-zinc-700"
              title="Back button [Esc]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span>Back [Esc]</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                onToggleSpeech();
              }}
              className={`py-1.5 rounded-lg border text-[10px] flex flex-col items-center justify-center gap-0.5 active:bg-zinc-700 transition-colors ${
                isSpeaking
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
              }`}
              title="Voice Anchor Read Aloud [P]"
            >
              <Radio className={`w-3.5 h-3.5 ${isSpeaking ? 'text-amber-400 animate-pulse' : 'text-zinc-400'}`} />
              <span>{isSpeaking ? 'Mute' : 'Voice [P]'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                onOpenDiagnostics();
              }}
              className="py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[10px] text-cyan-300 border border-cyan-500/20 flex flex-col items-center justify-center gap-0.5 active:bg-zinc-700"
              title="Hardware & RAM Specs"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Specs</span>
            </button>
          </div>

          {/* Terms & Legal Shortcut */}
          <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
            <button
              onClick={() => {
                soundFx.playSelect();
                onOpenTerms();
              }}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <FileText className="w-3 h-3" />
              <span>Terms & Security</span>
            </button>
            <span className="text-zinc-400">TV Remote</span>
          </div>
        </div>
      )}
    </div>
  );
};
