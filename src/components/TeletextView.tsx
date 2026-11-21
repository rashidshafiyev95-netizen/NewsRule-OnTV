import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Radio, Shield, Hash, ArrowLeft } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { soundFx } from '../services/soundFx';

import { AppLanguage, getLanguageMeta, getTranslations, getLocalizedCategoryName } from '../services/i18n';

interface TeletextViewProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  language?: AppLanguage;
}

export const TeletextView: React.FC<TeletextViewProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
  language = 'en',
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const langDir = getLanguageMeta(language).dir;
  const t = getTranslations(language);

  if (!isOpen) return null;

  const activeArticle = articles[currentPageIndex] || articles[0];
  const pageNumber = 100 + (currentPageIndex + 1);

  const prevPage = () => {
    soundFx.playFocus();
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : articles.length - 1));
  };

  const nextPage = () => {
    soundFx.playFocus();
    setCurrentPageIndex((prev) => (prev < articles.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/95 select-none font-mono">
      {/* CRT Scanline & Phosphor Overlay */}
      <div className="relative w-full max-w-4xl bg-black border-4 border-yellow-400 rounded-none p-4 sm:p-6 text-yellow-300 shadow-none">
        {/* Teletext Header Bar */}
        <div className="border-b-2 border-yellow-400 pb-2 mb-4 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold tracking-widest text-cyan-400">
            <span className="bg-cyan-400 text-black px-1.5 py-0.5">P{pageNumber}</span>
            <span>NEWSRULE-TXT</span>
            <span className="text-white">100</span>
            <span className="text-green-400">{t.teletextTitle}</span>
          </div>
          <div className="text-right text-yellow-400 font-bold flex items-center gap-4">
            <span className="text-red-400 animate-pulse">● {t.liveBroadcast}</span>
            <button
              onClick={() => {
                soundFx.playBack();
                onClose();
              }}
              className="bg-red-600 text-white px-2 py-0.5 hover:bg-red-500 font-bold"
            >
              {t.close} [Esc]
            </button>
          </div>
        </div>

        {/* Teletext Subheader Banner */}
        <div className="bg-blue-900 text-white p-2 font-bold text-sm sm:text-base tracking-wider mb-4 flex items-center justify-between">
          <span>{t.teletextService} {activeArticle.channelNumber}</span>
          <span className="text-yellow-300 text-xs">{getLocalizedCategoryName(activeArticle.category, language).toUpperCase()}</span>
        </div>

        {/* Story Title & Content */}
        <div dir={langDir}>
          {/* Story Title in classic green */}
          <div className="text-green-400 font-black text-lg sm:text-2xl leading-tight mb-4">
            {activeArticle.title}
          </div>

          {/* AI Bullet Summaries in Cyan */}
          <div className="space-y-2 mb-6 text-cyan-300 text-sm sm:text-base leading-relaxed">
            <div className="text-white font-bold bg-zinc-900 px-2 py-1 inline-block mb-1">
              &gt;&gt; {t.teletextSummaryHeading} &lt;&lt;
            </div>
            {activeArticle.aiSummary.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">#{idx + 1}</span>
                <span className="text-zinc-100">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Teletext Body Text in White */}
          <div className="text-zinc-200 text-xs sm:text-sm leading-relaxed border-t border-zinc-800 pt-3 max-h-48 overflow-y-auto">
            {activeArticle.fullContent}
          </div>
        </div>

        {/* Teletext Fasttext Color Navigation Buttons (Red, Green, Yellow, Blue) */}
        <div className="mt-6 pt-3 border-t-2 border-yellow-400 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
          <button
            onClick={prevPage}
            className="bg-red-600 text-white p-2 text-center hover:bg-red-700 active:scale-95"
          >
            ◄ {t.teletextPrevPage} [P{pageNumber > 101 ? pageNumber - 1 : 100 + articles.length}]
          </button>
          <button
            onClick={nextPage}
            className="bg-green-600 text-white p-2 text-center hover:bg-green-700 active:scale-95"
          >
            {t.teletextNextPage} ► [P{pageNumber < 100 + articles.length ? pageNumber + 1 : 101}]
          </button>
          <button
            onClick={() => {
              soundFx.playSelect();
              onSelectArticle(activeArticle);
              onClose();
            }}
            className="bg-yellow-400 text-black p-2 text-center hover:bg-yellow-500 active:scale-95"
          >
            {t.teletextOpenStory} [OK]
          </button>
          <button
            onClick={() => {
              soundFx.playBack();
              onClose();
            }}
            className="bg-blue-600 text-white p-2 text-center hover:bg-blue-700 active:scale-95"
          >
            {t.teletextExit} [Esc]
          </button>
        </div>

        {/* Anti-copy Teletext Disclaimer */}
        <div className="mt-4 text-[10px] text-zinc-500 text-center tracking-widest uppercase">
          {t.teletextDisclaimer}
        </div>
      </div>
    </div>
  );
};
