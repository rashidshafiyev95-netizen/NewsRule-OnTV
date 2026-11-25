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
  Cpu,
  Minimize2,
  Maximize2,
  Radio,
  CloudSun,
  Globe,
  SunMoon,
  MoonStar
} from 'lucide-react';
import { soundFx } from '../services/soundFx';
import { AppLanguage, TOTAL_SUPPORTED_LANGUAGES } from '../services/i18n';

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
  onToggleTheme?: () => void;
  onStartScreensaver?: () => void;
  isSpeaking: boolean;
  currentProfile: 'LEGACY_LITE' | 'MODERN_RICH';
  isTeletextOpen: boolean;
  currentLanguage?: AppLanguage;
  currentTheme?: 'dark' | 'white-contrast';
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
  onToggleTheme,
  onStartScreensaver,
  isSpeaking,
  currentProfile,
  isTeletextOpen,
  currentLanguage = 'en',
  currentTheme = 'dark',
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
    <div className="fixed bottom-12 right-4 z-40 select-none font-mono">
      {isCollapsed ? (
        <button
          onClick={() => {
            soundFx.playSelect();
            setIsCollapsed(false);
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 hover:bg-zinc-100 text-zinc-950 border-2 border-zinc-900 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 dark:text-amber-400 dark:border-amber-500/40 shadow-xl backdrop-blur-md text-xs font-bold transition-all hover:scale-105"
          title="Open Virtual TV Remote"
        >
          <Tv className="w-4 h-4" />
          <span>TV Remote</span>
          <Maximize2 className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
        </button>
      ) : (
        <div className="w-72 bg-white/95 dark:bg-zinc-950/95 border-2 border-zinc-900 dark:border-zinc-700/80 rounded-3xl p-4 shadow-2xl backdrop-blur-xl text-zinc-950 dark:text-zinc-200">
          {/* Remote Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-2.5 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-amber-800 dark:text-amber-400 uppercase">
                NewsRule Remote
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleSound}
                className="p-1 rounded text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />}
              </button>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 rounded text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                title="Collapse Remote"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Action Row 1 */}
          <div className="grid grid-cols-4 gap-1 mb-1.5">
            <button
              onClick={() => {
                soundFx.playToggleMode();
                onToggleMode();
              }}
              className="py-1.5 px-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[10px] font-semibold dark:text-amber-300 dark:border-amber-500/30 flex items-center justify-center gap-0.5 transition-colors"
              title="Switch between Old TV (Legacy Lite) and Modern 4K [T]"
            >
              <Tv className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>{currentProfile === 'LEGACY_LITE' ? 'Old [T]' : '4K [T]'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                if (onSelectWeather) onSelectWeather();
              }}
              className="py-1.5 px-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[10px] font-semibold dark:text-cyan-300 dark:border-cyan-500/30 flex items-center justify-center gap-0.5 transition-colors"
              title="NewsRule Weather Assistant (Baku) [W]"
            >
              <CloudSun className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>Baku [W]</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                onToggleTeletext();
              }}
              className={`py-1.5 px-1 rounded-lg text-[10px] font-semibold border flex items-center justify-center gap-0.5 transition-colors ${
                isTeletextOpen
                  ? 'bg-emerald-600 text-white border-emerald-700 dark:bg-emerald-600/30 dark:text-emerald-300 dark:border-emerald-500'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
              }`}
              title="Toggle Retro Teletext / Ceefax mode [X]"
            >
              <Radio className="w-3 h-3 text-cyan-700 dark:text-cyan-400 shrink-0" />
              <span>TXT [X]</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                if (onOpenLanguage) onOpenLanguage();
              }}
              className="py-1.5 px-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-950 border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[10px] font-bold dark:text-amber-400 dark:border-amber-500/40 flex items-center justify-center gap-0.5 transition-colors"
              title={`Select Language (${TOTAL_SUPPORTED_LANGUAGES} Languages) [L]`}
            >
              <Globe className="w-3 h-3 text-cyan-700 dark:text-cyan-400 shrink-0" />
              <span className="uppercase truncate max-w-[36px]">{currentLanguage}</span>
            </button>
          </div>

          {/* Quick Action Row 2: White Contrast Theme [C] & Burn-In Saver [B] */}
          <div className="grid grid-cols-2 gap-1 mb-3">
            <button
              onClick={() => {
                soundFx.playToggleMode();
                if (onToggleTheme) onToggleTheme();
              }}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border flex items-center justify-center gap-1 transition-colors ${
                currentTheme === 'white-contrast'
                  ? 'bg-zinc-950 text-white border-zinc-950'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
              }`}
              title="Toggle White Contrast / Dark Broadcast Theme [C]"
            >
              <SunMoon className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{currentTheme === 'white-contrast' ? 'Dark [C]' : 'White HC [C]'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                if (onStartScreensaver) onStartScreensaver();
              }}
              className="py-1.5 px-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[10px] font-semibold dark:text-zinc-200 dark:border-zinc-700 flex items-center justify-center gap-1 transition-colors"
              title="Activate OLED Burn-In Screensaver [B]"
            >
              <MoonStar className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>Burn-In [B]</span>
            </button>
          </div>

          {/* D-Pad Controller */}
          <div className="relative w-40 h-40 mx-auto my-2">
            <div className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 shadow-inner flex items-center justify-center">
              <button
                onClick={() => {
                  soundFx.playFocus();
                  onNavigate('up');
                }}
                className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-amber-700 dark:hover:text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Up"
              >
                <ChevronUp className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  soundFx.playFocus();
                  onNavigate('down');
                }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-amber-700 dark:hover:text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Down"
              >
                <ChevronDown className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  soundFx.playFocus();
                  onNavigate('left');
                }}
                className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-12 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-amber-700 dark:hover:text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  soundFx.playFocus();
                  onNavigate('right');
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-12 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-amber-700 dark:hover:text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  soundFx.playSelect();
                  onSelect();
                }}
                className="w-14 h-14 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-zinc-950 font-black text-sm flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                aria-label="OK / Select"
              >
                OK
              </button>
            </div>
          </div>

          {/* Secondary Function Buttons */}
          <div className="grid grid-cols-3 gap-1.5 mt-3 pt-2 border-t border-zinc-300 dark:border-zinc-800">
            <button
              onClick={() => {
                soundFx.playBack();
                onBack();
              }}
              className="py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[10px] dark:text-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center gap-0.5 active:bg-zinc-300 dark:active:bg-zinc-700"
              title="Back button [Esc]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
              <span>Back [Esc]</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                onToggleSpeech();
              }}
              className={`py-1.5 rounded-lg border text-[10px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isSpeaking
                  ? 'bg-amber-600 text-white border-amber-700 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-800'
              }`}
              title="Voice Anchor Read Aloud [P]"
            >
              <Radio className={`w-3.5 h-3.5 ${isSpeaking ? 'text-white dark:text-amber-400 animate-pulse' : 'text-zinc-600 dark:text-zinc-400'}`} />
              <span>{isSpeaking ? 'Mute' : 'Voice [P]'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSelect();
                onOpenDiagnostics();
              }}
              className="py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-cyan-800 border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[10px] dark:text-cyan-300 dark:border-cyan-500/20 flex flex-col items-center justify-center gap-0.5"
              title="Hardware, RAM & Burn-In Settings"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
              <span>Specs</span>
            </button>
          </div>

          {/* Terms & Legal Shortcut */}
          <div className="mt-2 pt-2 border-t border-zinc-300 dark:border-zinc-800/80 flex items-center justify-between text-[10px]">
            <button
              onClick={() => {
                soundFx.playSelect();
                onOpenTerms();
              }}
              className="text-amber-800 hover:text-amber-950 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <FileText className="w-3 h-3" />
              <span>Terms & Security</span>
            </button>
            <span className="text-zinc-600 dark:text-zinc-400">TV Remote</span>
          </div>
        </div>
      )}
    </div>
  );
};
