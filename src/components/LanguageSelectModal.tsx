import React, { useState, useEffect } from 'react';
import { Globe, Check, X } from 'lucide-react';
import { AppLanguage, saveAppLanguage } from '../services/i18n';
import { soundFx } from '../services/soundFx';

interface LanguageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
}

export const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(() => {
    if (currentLanguage === 'en') return 0;
    if (currentLanguage === 'az') return 1;
    return 2;
  });

  const languages: { id: AppLanguage; label: string; desc: string; buttonId: string }[] = [
    { id: 'en', label: 'English', desc: 'Default Global Broadcast', buttonId: 'btnLangEn' },
    { id: 'az', label: 'Azərbaycan', desc: 'Ana dilində xəbərlər', buttonId: 'btnLangAz' },
    { id: 'ru', label: 'Русский', desc: 'Для ТВ бабушки и дедушки', buttonId: 'btnLangRu' },
  ];

  // TV Remote D-Pad Navigation inside Modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundFx.playFocus();
        setFocusedIndex((prev) => (prev < languages.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundFx.playFocus();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        soundFx.playSelect();
        const chosen = languages[focusedIndex];
        if (chosen) {
          saveAppLanguage(chosen.id);
          onSelectLanguage(chosen.id);
          onClose();
        }
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        soundFx.playBack();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, onSelectLanguage, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      {/* Container: LinearLayout background="#111111" padding="24dp" */}
      <div
        className="w-full max-w-md rounded-2xl border-2 border-zinc-700 shadow-2xl flex flex-col select-none"
        style={{
          backgroundColor: '#111111',
          padding: '24dp',
        }}
      >
        {/* Header: TextView textSize="20sp" textColor="#FFFFFF" textStyle="bold" */}
        <div className="flex items-start justify-between mb-4 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2
                className="text-white font-bold leading-snug"
                style={{ fontSize: '20px', color: '#FFFFFF' }}
              >
                Select Language / Dil Seçimi / Выберите язык
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                Android TV System Localization
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playBack();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons List matching dialog_language_select.xml */}
        <div className="space-y-2.5 font-mono">
          {languages.map((item, idx) => {
            const isSelected = currentLanguage === item.id;
            const isFocused = focusedIndex === idx;

            return (
              <button
                key={item.id}
                id={item.buttonId}
                onClick={() => {
                  soundFx.playSelect();
                  saveAppLanguage(item.id);
                  onSelectLanguage(item.id);
                  onClose();
                }}
                onMouseEnter={() => setFocusedIndex(idx)}
                className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-none ${
                  isFocused
                    ? 'tv-item-selector state-focused bg-white text-black border-white shadow-xl scale-[1.01]'
                    : isSelected
                    ? 'bg-zinc-800 text-amber-400 border-amber-500/50'
                    : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base">{item.label}</span>
                    {item.id === 'ru' && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${isFocused ? 'bg-zinc-800 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                        ТВ Бабушки
                      </span>
                    )}
                  </div>
                  <p className={`text-xs ${isFocused ? 'text-zinc-800 font-medium' : 'text-zinc-500'}`}>
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isSelected && (
                    <span className="flex items-center gap-1 text-xs font-bold">
                      <Check className={`w-4 h-4 ${isFocused ? 'text-black' : 'text-emerald-400'}`} />
                    </span>
                  )}
                  {isFocused && (
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isFocused ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      [OK]
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Hint */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>[▲/▼] Navigate</span>
          <span>[OK] Apply Language</span>
        </div>
      </div>
    </div>
  );
};
