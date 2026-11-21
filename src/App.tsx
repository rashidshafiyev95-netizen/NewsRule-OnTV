/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Tv,
  Radio,
  Clock,
  Globe,
  Star,
  CloudSun,
  Cpu,
  SunMoon,
  MoonStar
} from 'lucide-react';
import {
  DeviceProfile,
  ProfileOverride,
  HardwareMetrics,
  NewsArticle,
  NewsCategory
} from './types/news';
import {
  detectHardwareSpecs,
  getManualProfileOverride,
  setManualProfileOverride
} from './services/hardwareDetector';
import { soundFx } from './services/soundFx';
import { speechAnchor } from './services/speechAnchor';
import { AIStudioClient } from './services/aiStudioClient';
import { getMockArticlesForLanguage } from './data/mockNews';
import {
  AppLanguage,
  getInitialAppLanguage,
  getLanguageMeta,
  getTranslations,
  hasTranslationsLoaded,
  saveAppLanguage,
  subscribeTranslations,
} from './services/i18n';
import { SecurityShield } from './components/SecurityShield';
import { TermsModal } from './components/TermsModal';
import { HardwareDiagnosticsModal } from './components/HardwareDiagnosticsModal';
import { VirtualTvRemote } from './components/VirtualTvRemote';
import { LegacyLiteView } from './components/LegacyLiteView';
import { ModernRichView } from './components/ModernRichView';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { TeletextView } from './components/TeletextView';
import { LanguageSelectModal } from './components/LanguageSelectModal';
import { GooglePlayReviewModal } from './components/GooglePlayReviewModal';
import { BurnInScreensaver } from './components/BurnInScreensaver';

const CATEGORIES: NewsCategory[] = [
  'All',
  'Weather',
  'Breaking',
  'Tech & AI',
  'Markets',
  'World',
  'Science',
  'Sports'
];

export default function App() {
  // 1. Hardware & Profile Engine
  const [profileMode, setProfileMode] = useState<ProfileOverride>(() => getManualProfileOverride());
  const [hardwareSpecs, setHardwareSpecs] = useState<HardwareMetrics>(() => detectHardwareSpecs());

  const activeProfile: DeviceProfile = useMemo(() => {
    if (profileMode === 'LEGACY') return 'LEGACY_LITE';
    if (profileMode === 'MODERN') return 'MODERN_RICH';
    return hardwareSpecs.detectedProfile;
  }, [profileMode, hardwareSpecs.detectedProfile]);

  // 2. Modals & Dialogs State
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false);
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState<boolean>(false);
  const [showTeletext, setShowTeletext] = useState<boolean>(false);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [showPlayReviewModal, setShowPlayReviewModal] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>(() => getInitialAppLanguage());
  const [theme, setTheme] = useState<'dark' | 'white-contrast'>(() => {
    try {
      const saved = localStorage.getItem('newsrule_theme');
      return saved === 'white-contrast' ? 'white-contrast' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [screensaverTimeoutSec, setScreensaverTimeoutSec] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('newsrule_screensaver_timeout');
      const parsed = saved !== null ? parseInt(saved, 10) : 60;
      return Number.isNaN(parsed) ? 60 : parsed;
    } catch {
      return 60;
    }
  });
  const [isScreensaverActive, setIsScreensaverActive] = useState<boolean>(false);
  const [articlesReadCount, setArticlesReadCount] = useState<number>(0);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('newsrule_terms_accepted') === 'true';
    } catch {
      return false;
    }
  });

  const [translationsVersion, setTranslationsVersion] = useState<number>(0);
  const [isTranslatingUi, setIsTranslatingUi] = useState<boolean>(false);

  const t = useMemo(
    () => getTranslations(currentLanguage),
    [currentLanguage, translationsVersion]
  );
  const langMeta = useMemo(() => getLanguageMeta(currentLanguage), [currentLanguage]);

  // 3. Navigation & Content State
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('All');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [focusZone, setFocusZone] = useState<'menu' | 'content'>('content');
  const [newsByCat, setNewsByCat] = useState<Record<string, NewsArticle[]>>({});
  const [isFetchingAi, setIsFetchingAi] = useState<boolean>(false);

  // Sync Dark / White Contrast class on <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('newsrule_theme', theme);
    } catch {
      // Storage ignore
    }
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'white-contrast' : 'dark'));
  }, []);

  const handleChangeScreensaverTimeout = useCallback((sec: number) => {
    setScreensaverTimeoutSec(sec);
    try {
      localStorage.setItem('newsrule_screensaver_timeout', String(sec));
    } catch {
      // Storage ignore
    }
  }, []);

  // Burn-in screensaver idle monitor
  useEffect(() => {
    if (screensaverTimeoutSec <= 0 || isScreensaverActive) return;

    let timer: ReturnType<typeof setTimeout>;
    const resetIdleTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScreensaverActive(true);
      }, screensaverTimeoutSec * 1000);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'];
    events.forEach((evt) => window.addEventListener(evt, resetIdleTimer, { passive: true }));
    resetIdleTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, resetIdleTimer));
    };
  }, [screensaverTimeoutSec, isScreensaverActive]);

  // Subscribe to dynamic UI translation pack updates across all 102 languages
  useEffect(() => {
    const unsub = subscribeTranslations(() => {
      setTranslationsVersion((v) => v + 1);
    });
    return unsub;
  }, []);

  // Synchronize speechAnchor, HTML lang/dir attributes, and dynamic UI bundle with active language
  useEffect(() => {
    speechAnchor.setLanguage(currentLanguage);
    document.documentElement.lang = currentLanguage;

    if (!hasTranslationsLoaded(currentLanguage)) {
      setIsTranslatingUi(true);
      AIStudioClient.fetchUiTranslations(currentLanguage).finally(() => {
        setIsTranslatingUi(false);
        setTranslationsVersion((v) => v + 1);
      });
    } else {
      setIsTranslatingUi(false);
    }
  }, [currentLanguage]);

  // Fetch summarized news via AIStudioClient
  const fetchCategoryNews = useCallback(
    (cat: NewsCategory, legacyMode: boolean, lang?: AppLanguage) => {
      const activeLang = lang || currentLanguage;
      setIsFetchingAi(true);
      AIStudioClient.fetchSummarizedNews(cat, legacyMode, activeLang, {
        onSuccess: (articles) => {
          setNewsByCat((prev) => ({ ...prev, [`${cat}_${activeLang}`]: articles }));
          setIsFetchingAi(false);
        },
        onFailure: () => {
          setIsFetchingAi(false);
        },
      });
    },
    [currentLanguage]
  );

  useEffect(() => {
    fetchCategoryNews(activeCategory, activeProfile === 'LEGACY_LITE', currentLanguage);
  }, [activeCategory, activeProfile, currentLanguage, fetchCategoryNews]);

  // Live filtered articles
  const filteredArticles = useMemo(() => {
    const cacheKey = `${activeCategory}_${currentLanguage}`;
    const fromAi = newsByCat[cacheKey];
    if (fromAi && fromAi.length > 0) return fromAi;
    const localizedPool = getMockArticlesForLanguage(currentLanguage);
    if (activeCategory === 'All') return localizedPool;
    const filtered = localizedPool.filter((a) => a.category === activeCategory);
    return filtered.length > 0 ? filtered : localizedPool;
  }, [activeCategory, currentLanguage, newsByCat]);

  // Clock update for TV broadcast header
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen to speech anchor status changes
  useEffect(() => {
    const unsub = speechAnchor.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return unsub;
  }, []);

  // Language change handler
  const handleSelectLanguage = useCallback(
    (lang: AppLanguage) => {
      setCurrentLanguage(lang);
      saveAppLanguage(lang);
      speechAnchor.setLanguage(lang);
      fetchCategoryNews(activeCategory, activeProfile === 'LEGACY_LITE', lang);
    },
    [activeCategory, activeProfile, fetchCategoryNews]
  );

  // Toggle profile mode (Legacy Lite vs Modern Rich)
  const handleToggleProfile = useCallback(() => {
    setProfileMode((prev) => {
      let next: ProfileOverride;
      if (prev === 'LEGACY') next = 'MODERN';
      else if (prev === 'MODERN') next = 'LEGACY';
      else {
        next = activeProfile === 'LEGACY_LITE' ? 'MODERN' : 'LEGACY';
      }
      setManualProfileOverride(next);
      return next;
    });
  }, [activeProfile]);

  const handleSelectProfileMode = (mode: ProfileOverride) => {
    setProfileMode(mode);
    setManualProfileOverride(mode);
  };

  const handleRefreshHardware = () => {
    const fresh = detectHardwareSpecs();
    setHardwareSpecs(fresh);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    try {
      localStorage.setItem('newsrule_terms_accepted', 'true');
    } catch {
      // Storage error
    }
  };

  // Toggle Voice Anchor Read Aloud
  const handleToggleSpeech = useCallback(() => {
    if (isSpeaking) {
      speechAnchor.stop();
    } else {
      const targetArticle = activeArticle || filteredArticles[focusedIndex] || filteredArticles[0];
      if (targetArticle) {
        speechAnchor.speakArticle(
          targetArticle.title,
          targetArticle.aiSummary,
          targetArticle.fullContent,
          currentLanguage
        );
      }
    }
  }, [isSpeaking, activeArticle, filteredArticles, focusedIndex, currentLanguage]);

  // TV D-Pad Navigation Handler
  const handleNavigate = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (activeArticle) return;

      if (activeProfile === 'LEGACY_LITE') {
        if (direction === 'left') {
          setFocusZone('menu');
        } else if (direction === 'right') {
          setFocusZone('content');
        } else if (direction === 'up') {
          if (focusZone === 'menu') {
            const catIdx = CATEGORIES.indexOf(activeCategory);
            if (catIdx > 0) {
              setActiveCategory(CATEGORIES[catIdx - 1]);
              setFocusedIndex(0);
            }
          } else {
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
        } else if (direction === 'down') {
          if (focusZone === 'menu') {
            const catIdx = CATEGORIES.indexOf(activeCategory);
            if (catIdx < CATEGORIES.length - 1) {
              setActiveCategory(CATEGORIES[catIdx + 1]);
              setFocusedIndex(0);
            }
          } else {
            setFocusedIndex((prev) => (prev < filteredArticles.length - 1 ? prev + 1 : prev));
          }
        }
        return;
      }

      // Modern Rich Profile Navigation
      if (direction === 'down') {
        setFocusedIndex((prev) => (prev < filteredArticles.length - 1 ? prev + 1 : prev));
      } else if (direction === 'up') {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (direction === 'right') {
        const catIdx = CATEGORIES.indexOf(activeCategory);
        if (catIdx < CATEGORIES.length - 1) {
          setActiveCategory(CATEGORIES[catIdx + 1]);
          setFocusedIndex(0);
        }
      } else if (direction === 'left') {
        const catIdx = CATEGORIES.indexOf(activeCategory);
        if (catIdx > 0) {
          setActiveCategory(CATEGORIES[catIdx - 1]);
          setFocusedIndex(0);
        }
      }
    },
    [activeArticle, activeProfile, focusZone, activeCategory, filteredArticles.length]
  );

  const handleSelectCurrent = useCallback(() => {
    if (showTermsModal || showDiagnosticsModal || showSecurityModal || showLanguageModal || showPlayReviewModal) return;
    if (activeArticle) return;

    if (activeProfile === 'LEGACY_LITE' && focusZone === 'menu') {
      setFocusZone('content');
      return;
    }

    const item = filteredArticles[focusedIndex];
    if (item) {
      setActiveArticle(item);
      setArticlesReadCount((prev) => {
        const next = prev + 1;
        if (next === 2) {
          setTimeout(() => {
            setShowPlayReviewModal(true);
          }, 1500);
        }
        return next;
      });
    }
  }, [showTermsModal, showDiagnosticsModal, showSecurityModal, showLanguageModal, showPlayReviewModal, activeArticle, activeProfile, focusZone, filteredArticles, focusedIndex]);

  const handleBack = useCallback(() => {
    if (activeArticle) {
      setActiveArticle(null);
      return;
    }
    if (showLanguageModal) {
      setShowLanguageModal(false);
      return;
    }
    if (showPlayReviewModal) {
      setShowPlayReviewModal(false);
      return;
    }
    if (showTeletext) {
      setShowTeletext(false);
      return;
    }
    if (showTermsModal) {
      setShowTermsModal(false);
      return;
    }
    if (showDiagnosticsModal) {
      setShowDiagnosticsModal(false);
      return;
    }
    if (showSecurityModal) {
      setShowSecurityModal(false);
      return;
    }
    if (activeProfile === 'LEGACY_LITE' && focusZone === 'content') {
      setFocusZone('menu');
      return;
    }
    if (activeCategory !== 'All') {
      setActiveCategory('All');
      setFocusedIndex(0);
    }
  }, [activeArticle, showLanguageModal, showPlayReviewModal, showTeletext, showTermsModal, showDiagnosticsModal, showSecurityModal, activeProfile, focusZone, activeCategory]);

  // Global TV Remote Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScreensaverActive) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Let LanguageSelectModal handle 1-9, D-Pad, Enter, and Esc/Backspace exclusively while open
      if (showLanguageModal) {
        if (e.key === 'l' || e.key === 'L') {
          e.preventDefault();
          soundFx.playBack();
          setShowLanguageModal(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          soundFx.playFocus();
          handleNavigate('down');
          break;
        case 'ArrowUp':
          e.preventDefault();
          soundFx.playFocus();
          handleNavigate('up');
          break;
        case 'ArrowRight':
          e.preventDefault();
          soundFx.playFocus();
          handleNavigate('right');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          soundFx.playFocus();
          handleNavigate('left');
          break;
        case 'Enter':
          e.preventDefault();
          soundFx.playSelect();
          handleSelectCurrent();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          soundFx.playBack();
          handleBack();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          soundFx.playToggleMode();
          handleToggleProfile();
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          soundFx.playToggleMode();
          handleToggleTheme();
          break;
        case 'b':
        case 'B':
          e.preventDefault();
          soundFx.playSelect();
          setIsScreensaverActive(true);
          break;
        case 'w':
        case 'W':
          e.preventDefault();
          soundFx.playSelect();
          setActiveCategory('Weather');
          setFocusZone('content');
          break;
        case 'p':
        case 'P':
        case ' ':
          e.preventDefault();
          soundFx.playSelect();
          handleToggleSpeech();
          break;
        case 'x':
        case 'X':
          e.preventDefault();
          soundFx.playSelect();
          setShowTeletext((prev) => !prev);
          break;
        case 's':
        case 'S':
          e.preventDefault();
          soundFx.playSelect();
          setShowTermsModal((prev) => !prev);
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          soundFx.playSelect();
          setShowLanguageModal((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isScreensaverActive, showLanguageModal, handleNavigate, handleSelectCurrent, handleBack, handleToggleProfile, handleToggleTheme, handleToggleSpeech]);

  const isLegacy = activeProfile === 'LEGACY_LITE';

  return (
    <div
      className={`min-h-screen w-full flex flex-col select-none text-zinc-950 dark:text-zinc-100 ${
        isLegacy
          ? 'bg-white dark:bg-black font-mono transition-none'
          : 'bg-white dark:bg-[#08080a] font-sans'
      }`}
    >
      {/* OLED / Plasma Burn-In Pixel-Shift Screensaver */}
      <BurnInScreensaver
        isActive={isScreensaverActive}
        onWake={() => setIsScreensaverActive(false)}
        articles={filteredArticles}
        currentLanguage={currentLanguage}
      />

      {/* Anti-Screen Recording & Anti-Copy Security Shield */}
      <SecurityShield
        showDetailsModal={showSecurityModal}
        onCloseDetailsModal={() => setShowSecurityModal(false)}
        onOpenTerms={() => setShowTermsModal(true)}
      />

      {/* Top Bar Contract: 3-Zone Architecture */}
      <header className="sticky top-0 z-30 px-6 lg:px-12 py-3.5 border-b border-zinc-300 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white dark:bg-amber-500 dark:text-zinc-950 font-black flex items-center justify-center text-base shadow-sm">
            NR
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-zinc-950 dark:text-white uppercase whitespace-nowrap">
            News<span className="text-amber-700 dark:text-amber-400">Rule</span> TV
          </span>
        </div>

        {/* Zone 2: 5 Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400">
          <button
            onClick={() => {
              soundFx.playSelect();
              setActiveCategory('All');
              setFocusZone('content');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-zinc-950 dark:hover:text-white ${
              activeCategory !== 'Weather' ? 'text-zinc-950 dark:text-amber-400 font-bold' : ''
            }`}
          >
            {t.headerLiveWire}
          </button>

          <button
            onClick={() => {
              soundFx.playSelect();
              setActiveCategory('Weather');
              setFocusZone('content');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 ${
              activeCategory === 'Weather' ? 'text-zinc-950 dark:text-amber-400 font-bold' : ''
            }`}
          >
            <CloudSun className="w-3.5 h-3.5" />
            <span>{t.headerWeather} [W]</span>
          </button>

          <button
            onClick={() => {
              soundFx.playSelect();
              setShowTeletext(true);
            }}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{t.headerTeletext} [X]</span>
          </button>

          <button
            onClick={() => {
              soundFx.playToggleMode();
              handleToggleTheme();
            }}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5"
            title="Switch White High-Contrast / Dark Broadcast Theme [C]"
          >
            <SunMoon className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{theme === 'white-contrast' ? `${t.headerDarkTheme} [C]` : `${t.headerWhiteTheme} [C]`}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playSelect();
              setIsScreensaverActive(true);
            }}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5"
            title="Launch OLED Burn-In Screensaver [B]"
          >
            <MoonStar className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{t.headerSaver} [B]</span>
          </button>
        </nav>

        {/* Zone 3: Primary Language Action & Compact Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Live Clock */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 tabular-nums">
            <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{currentTime || '00:00:00'}</span>
          </div>

          {/* Primary Action: Language Selector (102 Languages) */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setShowLanguageModal(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-amber-400 border border-zinc-950 dark:border-zinc-700/80 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            title={`${t.selectLanguageTitle} (102 Languages) [L]`}
          >
            <Globe className={`w-3.5 h-3.5 text-amber-400 dark:text-cyan-400 ${isTranslatingUi || isFetchingAi ? 'animate-spin' : ''}`} />
            <span>{currentLanguage.toUpperCase()}</span>
            <span className="text-zinc-200 dark:text-zinc-300 font-sans hidden xl:inline font-medium">
              {isTranslatingUi ? t.translatingLabel : langMeta.nativeLabel}
            </span>
            <span className="text-[10px] text-zinc-300 dark:text-zinc-400 font-sans hidden sm:inline">[L]</span>
          </button>

          {/* Hardware Specs & Burn-In Config */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setShowDiagnosticsModal(true);
            }}
            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-cyan-400 dark:border-zinc-800 transition-colors"
            title="Hardware Specs & Burn-In Saver Settings"
            aria-label="Hardware Specs"
          >
            <Cpu className="w-4 h-4" />
          </button>

          {/* Google Play Review Star */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setShowPlayReviewModal(true);
            }}
            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-amber-700 border border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-amber-400 dark:border-zinc-800 transition-colors"
            title="Google Play Store Review"
            aria-label="Google Play Review"
          >
            <Star className="w-4 h-4 fill-amber-500/20" />
          </button>
        </div>
      </header>

      {/* Main Broadcast Stage */}
      <main dir={langMeta.dir} className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col">
        {isLegacy ? (
          <LegacyLiteView
            articles={filteredArticles}
            focusedIndex={focusedIndex}
            onSelectArticle={(article) => setActiveArticle(article)}
            onArticleFocus={(idx) => setFocusedIndex(idx)}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setFocusedIndex(0);
            }}
            categories={CATEGORIES}
            focusZone={focusZone}
            onSetFocusZone={(zone) => setFocusZone(zone)}
            language={currentLanguage}
          />
        ) : (
          <ModernRichView
            articles={filteredArticles}
            focusedIndex={focusedIndex}
            onSelectArticle={(article) => setActiveArticle(article)}
            onArticleFocus={(idx) => setFocusedIndex(idx)}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setFocusedIndex(0);
            }}
            categories={CATEGORIES}
            language={currentLanguage}
          />
        )}
      </main>

      {/* Lower-Third News Marquee Ticker */}
      <footer className="sticky bottom-0 z-30 bg-zinc-100 dark:bg-zinc-950 border-t-2 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs font-mono select-none">
        <div className="flex items-center">
          {/* Breaking Channel Mark */}
          <div className="bg-red-700 dark:bg-red-600 px-4 py-2.5 font-bold text-white flex items-center gap-2 uppercase tracking-wider shrink-0 shadow-md">
            <Radio className="w-3.5 h-3.5" />
            <span>{t.newsWire}</span>
          </div>

          {/* Scrolling Ticker Text */}
          <div className="flex-1 overflow-hidden py-2 px-3 whitespace-nowrap bg-white dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-300">
            <div className="inline-block animate-marquee hover:pause">
              <span className="text-amber-800 dark:text-amber-400 font-bold mr-2">{t.tickerBreaking}</span>
              <span>{t.tickerItems.breaking}</span>
              <span className="mx-4 text-zinc-400 dark:text-zinc-600">■</span>
              <span className="text-cyan-800 dark:text-cyan-400 font-bold mr-2">{t.tickerTech}</span>
              <span>{t.tickerItems.tech}</span>
              <span className="mx-4 text-zinc-400 dark:text-zinc-600">■</span>
              <span className="text-emerald-800 dark:text-emerald-400 font-bold mr-2">{t.tickerMarkets}</span>
              <span>{t.tickerItems.markets}</span>
              <span className="mx-4 text-zinc-400 dark:text-zinc-600">■</span>
              <span className="text-purple-800 dark:text-purple-400 font-bold mr-2">{t.tickerPolicy}</span>
              <span>{t.tickerItems.policy}</span>
            </div>
          </div>

          {/* Remote Navigation Guide */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 text-[11px] text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-950 border-l border-zinc-300 dark:border-zinc-800 shrink-0 font-mono">
            <span>{t.navHints.navigate}</span>
            <span>{t.navHints.open}</span>
            <span>{t.navHints.mode}</span>
            <span>{t.navHints.language}</span>
            <span>[C] {t.themeHint}</span>
            <span>[B] {t.saverHint}</span>
          </div>
        </div>
      </footer>

      {/* Virtual TV Remote Controller */}
      <VirtualTvRemote
        onNavigate={handleNavigate}
        onSelect={handleSelectCurrent}
        onBack={handleBack}
        onToggleMode={handleToggleProfile}
        onToggleTeletext={() => setShowTeletext((prev) => !prev)}
        onOpenTerms={() => setShowTermsModal(true)}
        onOpenDiagnostics={() => setShowDiagnosticsModal(true)}
        onToggleSpeech={handleToggleSpeech}
        onOpenLanguage={() => setShowLanguageModal(true)}
        onSelectWeather={() => {
          setActiveCategory('Weather');
          setFocusZone('content');
        }}
        onToggleTheme={handleToggleTheme}
        onStartScreensaver={() => setIsScreensaverActive(true)}
        isSpeaking={isSpeaking}
        currentProfile={activeProfile}
        isTeletextOpen={showTeletext}
        currentLanguage={currentLanguage}
        currentTheme={theme}
      />

      {/* Article Detail Reader Modal */}
      <ArticleDetailModal
        article={activeArticle}
        isOpen={Boolean(activeArticle)}
        onClose={() => setActiveArticle(null)}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
        profile={activeProfile}
        language={currentLanguage}
      />

      {/* Retro Teletext View Modal */}
      <TeletextView
        isOpen={showTeletext}
        onClose={() => setShowTeletext(false)}
        articles={filteredArticles}
        onSelectArticle={(article) => {
          setShowTeletext(false);
          setActiveArticle(article);
        }}
        language={currentLanguage}
      />

      {/* Terms of Service Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={handleAcceptTerms}
        isAccepted={termsAccepted}
      />

      {/* Hardware Diagnostics & Burn-In Config Modal */}
      <HardwareDiagnosticsModal
        isOpen={showDiagnosticsModal}
        onClose={() => setShowDiagnosticsModal(false)}
        metrics={hardwareSpecs}
        currentMode={profileMode}
        onSelectMode={handleSelectProfileMode}
        onRefreshMetrics={handleRefreshHardware}
        screensaverTimeoutSec={screensaverTimeoutSec}
        onChangeScreensaverTimeout={handleChangeScreensaverTimeout}
        onLaunchScreensaver={() => setIsScreensaverActive(true)}
      />

      {/* Language Select Modal */}
      <LanguageSelectModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Google Play Review Modal */}
      <GooglePlayReviewModal
        isOpen={showPlayReviewModal}
        onClose={() => setShowPlayReviewModal(false)}
        language={currentLanguage}
      />
    </div>
  );
}
