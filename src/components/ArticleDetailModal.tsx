import React, { useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  ArrowLeft,
  X,
  Lock,
  Radio
} from 'lucide-react';
import { NewsArticle } from '../types/news';
import { speechAnchor } from '../services/speechAnchor';
import { soundFx } from '../services/soundFx';
import { AppLanguage, getTranslations, getLanguageMeta, getLocalizedCategoryName } from '../services/i18n';

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
  const t = getTranslations(language);

  useEffect(() => {
    if (!isOpen) {
      speechAnchor.stop();
    }
  }, [isOpen]);

  if (!isOpen || !article) return null;

  const isLegacy = profile === 'LEGACY_LITE';
  const langMeta = getLanguageMeta(language);
  const localizedCat = getLocalizedCategoryName(article.category, language);
  const paragraphs = article.fullContent.split('\n\n');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 dark:bg-black/90 backdrop-blur-md select-none animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-2xl overflow-hidden border-2 text-zinc-950 dark:text-zinc-100 ${
          isLegacy
            ? 'bg-white border-zinc-950 dark:bg-zinc-950 dark:border-amber-500 shadow-none'
            : 'bg-white border-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 shadow-2xl'
        }`}
      >
        {/* TV Modal Top Banner */}
        <div className="px-5 py-3.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-300 dark:border-zinc-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playBack();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-amber-400 font-bold text-xs uppercase tracking-wider transition-colors border border-zinc-950 dark:border-zinc-800"
              autoFocus
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToMenu} [Esc]</span>
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-amber-700 dark:text-amber-400">CH {article.channelNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{localizedCat}</span>
              <span aria-hidden="true">·</span>
              <span>{article.timestamp}</span>
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
                  ? 'bg-amber-600 text-white border-amber-700 dark:bg-amber-400 dark:text-zinc-950 dark:border-amber-400 animate-pulse'
                  : 'bg-white hover:bg-zinc-100 text-zinc-950 border-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-amber-300 dark:border-zinc-800'
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
              className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white border border-zinc-300 dark:border-zinc-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Content */}
        <div dir={langMeta.dir} className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 bg-white dark:bg-zinc-950">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
              {article.isBreaking && (
                <span className="text-red-700 dark:text-red-500 font-bold uppercase tracking-wider">
                  ● {t.categories.breaking}
                </span>
              )}
              {article.isBreaking && <span aria-hidden="true">·</span>}
              <span>{t.sourceLabel}: <strong className="text-zinc-950 dark:text-zinc-200">{article.source}</strong></span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-zinc-950 dark:text-white leading-tight" style={{ textWrap: 'balance' }}>
              {article.title}
            </h1>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider font-mono">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                {t.rulesBasedTakeaways}
              </span>
              <span className="text-[11px] text-zinc-600 dark:text-zinc-500 font-normal">NewsRule AI Wire</span>
            </div>
            <ul className="space-y-2 text-sm text-zinc-800 dark:text-zinc-200">
              {article.aiSummary.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-700 dark:text-amber-400 font-bold shrink-0 mt-0.5">►</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {!isLegacy && article.imageUrl && (
            <div className="relative rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-800/80 max-h-80 bg-zinc-950">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-mono text-zinc-200 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-red-500" />
                <span>{t.verifiedFeed}</span>
              </div>
            </div>
          )}

          <div className="space-y-4 text-base sm:text-lg text-zinc-900 dark:text-zinc-200 leading-relaxed font-sans max-w-prose">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 border-b border-zinc-300 dark:border-zinc-800 pb-2">
              {t.detailedReport}
            </h3>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:float-start first-letter:me-3 first-letter:mt-1 first-letter:text-amber-700 dark:first-letter:text-amber-400' : ''}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-300 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              {t.appName} — {t.tagline}
            </span>
            <span>{t.allRightsReserved}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
