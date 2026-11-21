import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Globe, Check, X, Search } from 'lucide-react';
import {
  AppLanguage,
  LANGUAGE_CATALOG,
  LanguageRegion,
  TOTAL_SUPPORTED_LANGUAGES,
  getTranslations,
  saveAppLanguage
} from '../services/i18n';
import { soundFx } from '../services/soundFx';

interface LanguageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
}

const REGIONS: ('All' | LanguageRegion)[] = [
  'All',
  'Global',
  'Europe',
  'Asia',
  'Middle East & Caucasus',
  'Africa',
  'Americas & Pacific',
];

export const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRegion, setActiveRegion] = useState<'All' | LanguageRegion>('All');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const t = getTranslations(currentLanguage);

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LANGUAGE_CATALOG.filter((item) => {
      const matchesRegion = activeRegion === 'All' || item.region === activeRegion;
      if (!matchesRegion) return false;
      if (!q) return true;
      return (
        item.nativeLabel.toLowerCase().includes(q) ||
        item.englishName.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeRegion]);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setActiveRegion('All');
      const idx = LANGUAGE_CATALOG.findIndex((item) => item.id === currentLanguage);
      setFocusedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen, currentLanguage]);

  useEffect(() => {
    if (focusedIndex >= filteredLanguages.length) {
      setFocusedIndex(Math.max(0, filteredLanguages.length - 1));
    }
  }, [filteredLanguages.length, focusedIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const activeEl = cardRefs.current[focusedIndex];
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIndex, isOpen]);

  const applyLanguage = useCallback(
    (lang: AppLanguage) => {
      soundFx.playSelect();
      saveAppLanguage(lang);
      onSelectLanguage(lang);
      onClose();
    },
    [onSelectLanguage, onClose]
  );

  // TV Remote 3-col D-Pad Navigation & [1]-[9] Quick Pick
  useEffect(() => {
    if (!isOpen) return;

    const total = filteredLanguages.length;
    const cols = 3;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isTypingInSearch = document.activeElement === searchInputRef.current;

      if (e.key === 'Escape') {
        e.preventDefault();
        soundFx.playBack();
        onClose();
        return;
      }

      if (isTypingInSearch) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          searchInputRef.current?.blur();
          soundFx.playFocus();
          setFocusedIndex(0);
        } else if (e.key === 'Enter' && filteredLanguages.length > 0) {
          e.preventDefault();
          applyLanguage(filteredLanguages[focusedIndex]?.id || filteredLanguages[0].id);
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        soundFx.playFocus();
        setFocusedIndex((prev) => (prev + 1 < total ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        soundFx.playFocus();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundFx.playFocus();
        setFocusedIndex((prev) => (prev + cols < total ? prev + cols : Math.max(0, total - 1)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundFx.playFocus();
        setFocusedIndex((prev) => (prev - cols >= 0 ? prev - cols : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const chosen = filteredLanguages[focusedIndex];
        if (chosen) {
          applyLanguage(chosen.id);
        }
      } else if (e.key >= '1' && e.key <= '9') {
        const chosen = LANGUAGE_CATALOG[parseInt(e.key, 10) - 1];
        if (chosen) {
          e.preventDefault();
          applyLanguage(chosen.id);
        }
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        soundFx.playBack();
        onClose();
      } else if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, filteredLanguages, applyLanguage, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl border-2 border-zinc-900 dark:border-zinc-800 shadow-2xl flex flex-col select-none bg-white dark:bg-[#111113] text-zinc-950 dark:text-zinc-100"
        style={{ padding: '24px' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-600/30 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-zinc-950 dark:text-white font-bold font-display text-xl leading-snug truncate">
                {t.selectLanguageTitle}
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono mt-0.5">
                {TOTAL_SUPPORTED_LANGUAGES} Broadcast Languages Supported · Press [1–9] or [/] to Search
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playBack();
              onClose();
            }}
            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors shrink-0 border border-zinc-300 dark:border-zinc-800"
            aria-label={t.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Regional Filter Controls */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFocusedIndex(0);
              }}
              placeholder={`Search across ${TOTAL_SUPPORTED_LANGUAGES} languages (e.g., Japanese, العربية, Azərbaycan, kiSwahili, fi)...`}
              className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
              {filteredLanguages.length}/{TOTAL_SUPPORTED_LANGUAGES}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {REGIONS.map((region) => {
              const isSelected = activeRegion === region;
              const count =
                region === 'All'
                  ? TOTAL_SUPPORTED_LANGUAGES
                  : LANGUAGE_CATALOG.filter((l) => l.region === region).length;
              return (
                <button
                  key={region}
                  onClick={() => {
                    soundFx.playFocus();
                    setActiveRegion(region);
                    setFocusedIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap shrink-0 border transition-colors ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-amber-400 dark:text-zinc-950 dark:border-amber-400'
                      : 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800'
                  }`}
                >
                  {region} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable 3-Column 102-Language Selection Grid */}
        <div className="flex-1 overflow-y-auto pr-1 min-h-[260px]">
          {filteredLanguages.length === 0 ? (
            <div className="py-12 text-center text-sm font-mono text-zinc-500 dark:text-zinc-400">
              No languages matched &ldquo;{searchQuery}&rdquo;. Try searching by English name or ISO code.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono">
              {filteredLanguages.map((item, idx) => {
                const isSelected = currentLanguage === item.id;
                const isFocused = focusedIndex === idx;
                const customDesc = t.langDescriptions[item.id];
                const subtitle = customDesc || `${item.englishName} · ${item.region}`;

                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    id={item.buttonId}
                    dir={item.dir}
                    onClick={() => applyLanguage(item.id)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`w-full text-start p-3 rounded-xl border-2 flex flex-col justify-between gap-1.5 transition-all ${
                      isFocused
                        ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-black dark:border-white shadow-lg'
                        : isSelected
                        ? 'bg-amber-50 text-zinc-950 border-amber-600 dark:bg-zinc-900 dark:text-amber-400 dark:border-amber-500/70'
                        : 'bg-zinc-50 text-zinc-900 border-zinc-200 hover:border-zinc-400 dark:bg-zinc-900/60 dark:text-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div className="flex items-center gap-2 min-w-0">
                        {item.numKey ? (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
                              isFocused
                                ? 'bg-amber-400 text-black'
                                : isSelected
                                ? 'bg-amber-600 text-white dark:bg-amber-500/20 dark:text-amber-300'
                                : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                          >
                            {item.numKey}
                          </span>
                        ) : (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold uppercase shrink-0 ${
                              isFocused
                                ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                                : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                          >
                            {item.id}
                          </span>
                        )}
                        <span className="font-bold text-sm truncate font-sans">
                          {item.nativeLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 ${
                              isFocused
                                ? 'text-amber-400 dark:text-black'
                                : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          />
                        )}
                        {item.dir === 'rtl' && (
                          <span
                            className={`text-[9px] font-bold px-1 py-0.5 rounded ${
                              isFocused
                                ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                                : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                          >
                            RTL
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 w-full">
                      <p
                        className={`text-[11px] truncate font-sans ${
                          isFocused
                            ? 'text-zinc-300 dark:text-zinc-700 font-medium'
                            : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {subtitle}
                      </p>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-semibold shrink-0 ${
                            isFocused
                              ? 'bg-zinc-800 text-amber-300 dark:bg-zinc-900 dark:text-amber-300'
                              : 'bg-amber-100 text-amber-900 dark:bg-zinc-800 dark:text-amber-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
          <span>[▲/▼/◄/►] Navigate · [/] Search · [1–9] Top Languages</span>
          <span>[OK] Apply · [Esc] {t.close}</span>
        </div>
      </div>
    </div>
  );
};
