/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Tv,
  Radio,
  ShieldCheck,
  Cpu,
  FileText,
  Volume2,
  VolumeX,
  Sparkles,
  AlertTriangle,
  Zap,
  Clock,
  Compass,
  Lock,
  Maximize2,
  RefreshCw,
  CloudSun,
  Globe,
  Star
} from 'lucide-react';
import {
  DeviceProfile,
  ProfileOverride,
  ProfileMode,
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
import { MOCK_NEWS_ARTICLES } from './data/mockNews';
import { AppLanguage, getInitialAppLanguage, saveAppLanguage, TRANSLATIONS } from './services/i18n';
import { SecurityShield } from './components/SecurityShield';
import { TermsModal } from './components/TermsModal';
import { HardwareDiagnosticsModal } from './components/HardwareDiagnosticsModal';
import { VirtualTvRemote } from './components/VirtualTvRemote';
import { LegacyLiteView } from './components/LegacyLiteView';
import { ModernRichView } from './components/ModernRichView';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { TeletextView } from './components/TeletextView';
import { WeatherDisplay } from './components/WeatherDisplay';
import { LanguageSelectModal } from './components/LanguageSelectModal';
import { GooglePlayReviewModal } from './components/GooglePlayReviewModal';

const CATEGORIES: NewsCategory[] = [
  'All',
  'Weather',
  'Breaking',
  'Tech & AI',
  'Markets',
  'World',
  'Science',
  'Sports',
  'Entertainment'
];

export default function App() {
  // 1. Hardware & Profile Engine (SharedPreferences override + auto detection)
  const [profileMode, setProfileMode] = useState<ProfileOverride>(() => getManualProfileOverride());
  const [hardwareSpecs, setHardwareSpecs] = useState<HardwareMetrics>(() => detectHardwareSpecs());

  // Determine active profile (User manual override OR Auto-detected profile)
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
  const [articlesReadCount, setArticlesReadCount] = useState<number>(0);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('newsrule_terms_accepted') === 'true';
    } catch {
      return false;
    }
  });

  // 3. Navigation & Content State
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('All');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [focusZone, setFocusZone] = useState<'menu' | 'content'>('content');
  const [newsByCat, setNewsByCat] = useState<Record<string, NewsArticle[]>>({});
  const [isFetchingAi, setIsFetchingAi] = useState<boolean>(false);

  // Fetch summarized news via AIStudioClient
  const fetchCategoryNews = useCallback(
    (cat: NewsCategory, legacyMode: boolean) => {
      setIsFetchingAi(true);
      AIStudioClient.fetchSummarizedNews(cat, legacyMode, {
        onSuccess: (articles) => {
          setNewsByCat((prev) => ({ ...prev, [cat]: articles }));
          setIsFetchingAi(false);
        },
        onFailure: () => {
          setIsFetchingAi(false);
        },
      });
    },
    []
  );

  useEffect(() => {
    fetchCategoryNews(activeCategory, activeProfile === 'LEGACY_LITE');
  }, [activeCategory, activeProfile, fetchCategoryNews]);

  // Live filtered articles (prioritizes dynamic AI summaries, falls back to wire data)
  const filteredArticles = useMemo(() => {
    const fromAi = newsByCat[activeCategory];
    if (fromAi && fromAi.length > 0) return fromAi;
    if (activeCategory === 'All') return MOCK_NEWS_ARTICLES;
    return MOCK_NEWS_ARTICLES.filter((a) => a.category === activeCategory);
  }, [activeCategory, newsByCat]);

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

  // Handler to toggle profile mode (Legacy Lite vs Modern Rich)
  const handleToggleProfile = useCallback(() => {
    setProfileMode((prev) => {
      let next: ProfileOverride;
      if (prev === 'LEGACY') next = 'MODERN';
      else if (prev === 'MODERN') next = 'LEGACY';
      else {
        // if AUTO, toggle to opposite of current detected
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
          targetArticle.fullContent
        );
      }
    }
  }, [isSpeaking, activeArticle, filteredArticles, focusedIndex]);

  // TV D-Pad Navigation Handler
  const handleNavigate = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (activeArticle) return; // Inside modal, handled by modal scrolling

      if (activeProfile === 'LEGACY_LITE') {
        // Android TV Split Screen Mode: 25% Left Navigation Menu & 75% Right Content Display Panel
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
    if (showTermsModal || showDiagnosticsModal || showSecurityModal) return;
    if (activeArticle) return;

    if (activeProfile === 'LEGACY_LITE' && focusZone === 'menu') {
      // Move from 25% Menu to 75% Content panel
      setFocusZone('content');
      return;
    }

    const item = filteredArticles[focusedIndex];
    if (item) {
      setActiveArticle(item);
      setArticlesReadCount((prev) => {
        const next = prev + 1;
        if (next === 2) {
          // Official Google Play Review Manager milestone trigger (MainActivity.java showGooglePlayReviewPopup)
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
      // Step back from 75% Content Frame to 25% Navigation Menu
      setFocusZone('menu');
      return;
    }
    // Return to first category if not already there
    if (activeCategory !== 'All') {
      setActiveCategory('All');
      setFocusedIndex(0);
    }
  }, [activeArticle, showLanguageModal, showPlayReviewModal, showTeletext, showTermsModal, showDiagnosticsModal, showSecurityModal, activeProfile, focusZone, activeCategory]);

  // Global TV Remote Keyboard Listeners (Arrow keys, Enter, Backspace/Esc, Shortcuts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input (none currently, but good practice)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

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
          // Toggle TV Mode (Legacy Lite / Modern Rich)
          e.preventDefault();
          soundFx.playToggleMode();
          handleToggleProfile();
          break;
        case 'w':
        case 'W':
          // Jump to NewsRule Weather Assistant (Baku, Azerbaijan)
          e.preventDefault();
          soundFx.playSelect();
          setActiveCategory('Weather');
          setFocusZone('content');
          break;
        case 'p':
        case 'P':
        case ' ': // Spacebar plays/stops Voice Anchor
          e.preventDefault();
          soundFx.playSelect();
          handleToggleSpeech();
          break;
        case 'x':
        case 'X':
          // Toggle Retro Teletext mode
          e.preventDefault();
          soundFx.playSelect();
          setShowTeletext((prev) => !prev);
          break;
        case 's':
        case 'S':
          // Toggle Terms & Security
          e.preventDefault();
          soundFx.playSelect();
          setShowTermsModal((prev) => !prev);
          break;
        case 'l':
        case 'L':
          // Toggle Language Selection Dialog (res/layout/dialog_language_select.xml)
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
  }, [handleNavigate, handleSelectCurrent, handleBack, handleToggleProfile, handleToggleSpeech]);

  const isLegacy = activeProfile === 'LEGACY_LITE';

  return (
    <div
      className={`min-h-screen w-full flex flex-col select-none text-zinc-100 ${
        isLegacy
          ? 'bg-zinc-950 font-mono transition-none'
          : 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 font-sans transition-colors duration-500'
      }`}
    >
      {/* Anti-Screen Recording & Anti-Copy Security Shield (Web FLAG_SECURE) */}
      <SecurityShield
        showDetailsModal={showSecurityModal}
        onCloseDetailsModal={() => setShowSecurityModal(false)}
        onOpenTerms={() => setShowTermsModal(true)}
      />

      {/* Top TV Station Header */}
      <header
        className={`sticky top-0 z-20 px-4 sm:px-8 py-3.5 border-b flex items-center justify-between ${
          isLegacy
            ? 'bg-zinc-950 border-zinc-800'
            : 'bg-zinc-950/90 border-zinc-800/80 backdrop-blur-xl'
        }`}
      >
        {/* Brand & Call-sign */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-zinc-950 font-black flex items-center justify-center text-lg shadow-md shadow-amber-500/20">
              NR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  News<span className="text-amber-400">Rule</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-800 text-amber-300 border border-zinc-700">
                  TV NET
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono hidden sm:block">
                Broadcast Edition • Auto-Adaptive Display Engine
              </p>
            </div>
          </div>
        </div>

        {/* Live Hardware Telemetry & Profile Badges (Ported from HardwareDetector) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hardware Profile Badge */}
          <button
            onClick={() => {
              soundFx.playToggleMode();
              handleToggleProfile();
            }}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold transition-all ${
              isLegacy
                ? 'bg-zinc-900 text-amber-400 border-amber-500/60 ring-1 ring-amber-500/40'
                : 'bg-zinc-900/80 text-cyan-300 border-cyan-500/40 hover:bg-zinc-800'
            }`}
            title="Click or press [T] to toggle Old TV / Smart TV mode"
          >
            <Tv className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">
              {profileMode === 'AUTO' ? 'AUTO: ' : 'FORCED: '}
            </span>
            <span>{isLegacy ? 'OLD TV (LITE)' : 'SMART TV (4K)'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-sans">
              [T]
            </span>
          </button>

          {/* FLAG_SECURE Indicator */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setShowSecurityModal(true);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5 hover:bg-emerald-500/20 transition-colors"
            title="Android FLAG_SECURE & Anti-Copying Shield"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden lg:inline">FLAG_SECURE: ACTIVE</span>
          </button>

          {/* Live AI Summarizer Sync (AIStudioClient) */}
          <button
            onClick={() => {
              soundFx.playSelect();
              fetchCategoryNews(activeCategory, isLegacy);
            }}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              isFetchingAi
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse'
                : 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20'
            }`}
            title="Fetch Summarized News via AIStudioClient"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isFetchingAi ? 'animate-spin text-amber-400' : 'text-purple-400'}`} />
            <span className="hidden sm:inline">{isFetchingAi ? 'AI SUMMARIZING...' : 'AI WIRE: SYNCED'}</span>
          </button>

          {/* Quick Baku Weather Button (Channel 010) */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setActiveCategory('Weather');
              setFocusZone('content');
            }}
            className="hidden md:flex items-center transition-transform hover:scale-105 active:scale-95"
            title="Open NewsRule Weather Assistant (Baku, Azerbaijan) [W]"
          >
            <WeatherDisplay isCompact={true} />
          </button>

          {/* Teletext Toggle */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setShowTeletext(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono hover:text-amber-300"
            title="Open Retro Teletext Ceefax mode [X]"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>TXT [X]</span>
          </button>

          {/* Language Selection Dialog Button [L] */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setShowLanguageModal(true);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="Select Language / Dil Seçimi / Выберите язык [L]"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">{currentLanguage.toUpperCase()}</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 font-sans hidden md:inline">[L]</span>
          </button>

          {/* Google Play Review Button */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setShowPlayReviewModal(true);
            }}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-amber-400 hover:bg-zinc-800 transition-colors"
            title="Google Play Store Review (ReviewManager)"
          >
            <Star className="w-4 h-4 fill-amber-400/20" />
          </button>

          {/* Terms & Copyright Button */}
          <button
            onClick={() => {
              soundFx.playSelect();
              setShowTermsModal(true);
            }}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800 transition-colors"
            title="Terms of Service & Proprietary Policy [S]"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Live UTC / Broadcast Time */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/60 px-3 py-1.5 rounded-xl border border-zinc-800">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentTime || '00:00:00'}</span>
          </div>
        </div>
      </header>

      {/* Main TV Broadcast Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col">
        {/* Hardware Status Banner if on Legacy Lite */}
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
          />
        )}
      </main>

      {/* Live Breaking News Lower-Third Marquee Ticker */}
      <footer className="sticky bottom-0 z-20 bg-zinc-950 border-t border-zinc-800 text-zinc-200 text-xs font-mono select-none">
        <div className="flex items-center">
          {/* Breaking News Label */}
          <div className="bg-red-600 px-4 py-2 font-black text-white flex items-center gap-2 uppercase tracking-wider shrink-0 shadow-md">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>NEWS WIRE</span>
          </div>

          {/* Scrolling Ticker Line */}
          <div className="flex-1 overflow-hidden py-2 px-3 whitespace-nowrap bg-zinc-900/90 text-zinc-300">
            <div className="inline-block animate-marquee hover:pause">
              <span className="text-amber-400 font-bold mr-2">BREAKING:</span>
              <span>Global Energy Summit ratifies Unified Grid Protocol 2030</span>
              <span className="mx-4 text-zinc-600">■</span>
              <span className="text-cyan-400 font-bold mr-2">TECH:</span>
              <span>Silicon photonics chips shatter bandwidth benchmarks with 3.2 Tbps throughput</span>
              <span className="mx-4 text-zinc-600">■</span>
              <span className="text-emerald-400 font-bold mr-2">MARKETS:</span>
              <span>Central bank liquidity adjustments bolster industrial manufacturing indices</span>
              <span className="mx-4 text-zinc-600">■</span>
              <span className="text-purple-400 font-bold mr-2">POLICY:</span>
              <span>Proprietary Content & Anti-Copying Policy enforced under NewsRule terms</span>
            </div>
          </div>

          {/* Remote Shortcut Helper Pill */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 text-[11px] text-zinc-500 bg-zinc-950 border-l border-zinc-800 shrink-0">
            <span>[▲/▼/◄/►] Navigate</span>
            <span>[OK] Open</span>
            <span>[T] Mode</span>
            <span>[Esc] Back</span>
          </div>
        </div>
      </footer>

      {/* On-Screen Virtual TV Remote Controller */}
      <VirtualTvRemote
        onNavigate={handleNavigate}
        onSelect={handleSelectCurrent}
        onBack={handleBack}
        onToggleMode={handleToggleProfile}
        onToggleTeletext={() => setShowTeletext((prev) => !prev)}
        onOpenTerms={() => setShowTermsModal(true)}
        onOpenDiagnostics={() => setShowDiagnosticsModal(true)}
        onToggleSpeech={handleToggleSpeech}
        onSelectWeather={() => {
          setActiveCategory('Weather');
          setFocusZone('content');
        }}
        isSpeaking={isSpeaking}
        currentProfile={activeProfile}
        isTeletextOpen={showTeletext}
      />

      {/* Article Detail Reader Modal */}
      <ArticleDetailModal
        article={activeArticle}
        isOpen={Boolean(activeArticle)}
        onClose={() => setActiveArticle(null)}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
        profile={activeProfile}
      />

      {/* Retro Teletext / Ceefax View Modal */}
      <TeletextView
        isOpen={showTeletext}
        onClose={() => setShowTeletext(false)}
        articles={filteredArticles}
        onSelectArticle={(article) => {
          setShowTeletext(false);
          setActiveArticle(article);
        }}
      />

      {/* Terms of Service & Anti-Copying Policy Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={handleAcceptTerms}
        isAccepted={termsAccepted}
      />

      {/* Hardware & RAM Detector Diagnostics Modal */}
      <HardwareDiagnosticsModal
        isOpen={showDiagnosticsModal}
        onClose={() => setShowDiagnosticsModal(false)}
        metrics={hardwareSpecs}
        currentMode={profileMode}
        onSelectMode={handleSelectProfileMode}
        onRefreshMetrics={handleRefreshHardware}
      />

      {/* Android TV Language Select Modal (dialog_language_select.xml) */}
      <LanguageSelectModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => {
          setCurrentLanguage(lang);
          soundFx.playSelect();
        }}
      />

      {/* Google Play Review Flow Modal (MainActivity.java ReviewManager) */}
      <GooglePlayReviewModal
        isOpen={showPlayReviewModal}
        onClose={() => setShowPlayReviewModal(false)}
      />
    </div>
  );
}
