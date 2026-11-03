import React, { useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  Radio,
  ArrowLeft,
  X,
  Share2,
  Lock,
  Tv,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { NewsArticle } from '../types/news';
import { speechAnchor } from '../services/speechAnchor';
import { soundFx } from '../services/soundFx';
import { AppLanguage, TRANSLATIONS, getLocalizedCategoryName } from '../services/i18n';

interface ArticleDetailModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  profile: 'LEGACY_LITE' | 'MODERN_RICH';
  language?: AppLanguage;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isOpen,
  onClose,
  isSpeaking,
  onToggleSpeech,
  profile,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    // Stop speech when closing modal
    if (!isOpen) {
      speechAnchor.stop();
    }
  }, [isOpen]);

  if (!isOpen || !article) return null;

  const isLegacy = profile === 'LEGACY_LITE';
  const localizedCat = getLocalizedCategoryName(article.category, language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md select-none animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-2xl overflow-hidden border-2 text-zinc-100 ${
          isLegacy
            ? 'bg-zinc-950 border-amber-500 shadow-none'
            : 'bg-zinc-900/95 border-amber-500/50 shadow-2xl backdrop-blur-xl'
        }`}
      >
        {/* TV Modal Top Banner */}
        <div className="px-5 py-3.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playBack();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold text-xs uppercase tracking-wider transition-colors focus:ring-2 focus:ring-amber-400"
              autoFocus
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToMenu} [Esc]</span>
            </button>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                CH {article.channelNumber}
              </span>
              <span className="text-zinc-400">{localizedCat}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{article.timestamp}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playSelect();
                onToggleSpeech();
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors border ${
                isSpeaking
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 animate-pulse'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-amber-300 border-amber-500/30'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{isSpeaking ? t.readingAloud : t.readAloud}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playBack();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Article Header */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              {article.isBreaking && (
                <span className="px-2.5 py-0.5 rounded bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider animate-pulse">
                  {t.categories.breaking}
                </span>
              )}
              <span className="text-xs font-mono text-zinc-400">
                Source: <strong className="text-zinc-200">{article.source}</strong>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-400">{article.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {article.title}
            </h1>
          </div>

          {/* AI-Generated Summaries Section (Protected under NewsRule Terms) */}
          <div
            className={`p-4 sm:p-5 rounded-xl border-l-4 border-amber-500 ${
              isLegacy
                ? 'bg-zinc-900 border-zinc-800'
                : 'bg-gradient-to-r from-amber-950/30 to-zinc-900/40 border-y border-r border-amber-500/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {t.rulesBasedTakeaways}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> Protected
              </span>
            </div>
            <ul className="space-y-2.5 text-sm sm:text-base text-zinc-200 font-medium">
              {article.aiSummary.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Media (Only rendered with rich effects if Modern profile) */}
          {!isLegacy && (
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 shadow-xl max-h-72">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-mono text-white/90 bg-black/60 px-3 py-1 rounded backdrop-blur-xs">
                <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>NEWSRULE VERIFIED WIRE FEED</span>
              </div>
            </div>
          )}

          {/* Full Report Text - Extra large TV readable typography */}
          <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">
              {t.detailedReport}
            </h3>
            {article.fullContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Proprietary Content Notice matching terms */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              NewsRule Proprietary News Network
            </span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};
