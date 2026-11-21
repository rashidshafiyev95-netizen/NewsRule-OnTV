import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types/news';
import { soundFx } from '../services/soundFx';
import { WeatherDisplay } from './WeatherDisplay';
import { AppLanguage, getTranslations, getLocalizedCategoryName } from '../services/i18n';

interface LegacyLiteViewProps {
  articles: NewsArticle[];
  focusedIndex: number;
  onSelectArticle: (article: NewsArticle) => void;
  onArticleFocus: (index: number) => void;
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  categories: NewsCategory[];
  focusZone: 'menu' | 'content';
  onSetFocusZone: (zone: 'menu' | 'content') => void;
  language?: AppLanguage;
}

export const LegacyLiteView: React.FC<LegacyLiteViewProps> = ({
  articles,
  focusedIndex,
  onSelectArticle,
  onArticleFocus,
  activeCategory,
  onSelectCategory,
  categories,
  focusZone,
  onSetFocusZone,
  language = 'en',
}) => {
  const t = getTranslations(language);
  const activeArticle = articles[focusedIndex] || articles[0];

  return (
    <div className="w-full flex-1 flex flex-col rounded-xl overflow-hidden border-2 border-zinc-900 dark:border-zinc-800 bg-white dark:bg-black text-zinc-950 dark:text-zinc-100">
      {/* Top Telemetry Strip */}
      <div className="bg-zinc-100 dark:bg-black border-b-2 border-zinc-900 dark:border-zinc-800 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-zinc-700 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-950 dark:bg-amber-400" />
          <span className="text-zinc-950 dark:text-zinc-200 font-bold uppercase">
            TV Split Frame (25% Menu / 75% Content)
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">|</span>
          <span className="text-amber-800 dark:text-amber-400 font-semibold">{t.pureBlackSaver}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-700 dark:text-zinc-400">
            Active Zone: <strong className="text-zinc-950 dark:text-white uppercase">{focusZone}</strong>
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: 25% Left Navigation Menu / 75% Content Display Panel */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[580px]">
        {/* Left Side: Navigation Menu (25% Width) */}
        <div
          className={`w-full md:w-1/4 flex flex-col p-4 border-b-2 md:border-b-0 md:border-r-2 border-zinc-900 dark:border-zinc-800 select-none transition-none bg-zinc-50 dark:bg-[#0a0a0c] ${
            focusZone === 'menu' ? 'ring-2 ring-inset ring-zinc-950 dark:ring-amber-400' : ''
          }`}
          onClick={() => onSetFocusZone('menu')}
        >
          {/* Header Title */}
          <div className="mb-5 pb-3 border-b border-zinc-300 dark:border-zinc-800">
            <h1 className="text-zinc-950 dark:text-white font-bold font-display text-xl flex items-center justify-between">
              <span>{t.appName} TV</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-white dark:bg-zinc-800 dark:text-amber-400">
                LITE
              </span>
            </h1>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono mt-0.5">
              {t.tagline}
            </p>
          </div>

          {/* Scrollable Category List */}
          <div className="flex-1 space-y-1 overflow-y-auto pr-1">
            <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{t.channelsTitle}</span>
              <span>[▲/▼]</span>
            </div>

            {categories.map((cat, idx) => {
              const isSelected = activeCategory === cat;
              const isFocusedCategory = focusZone === 'menu' && isSelected;
              const localizedLabel = getLocalizedCategoryName(cat, language);

              return (
                <button
                  key={cat}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playFocus();
                    onSelectCategory(cat);
                    onSetFocusZone('content');
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-mono font-bold flex items-center justify-between border-2 transition-none ${
                    isFocusedCategory
                      ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-black dark:border-white shadow-lg'
                      : isSelected
                      ? 'bg-zinc-200 text-zinc-950 border-zinc-400 dark:bg-zinc-800 dark:text-amber-400 dark:border-zinc-700'
                      : 'bg-transparent text-zinc-700 dark:text-zinc-400 border-transparent hover:border-zinc-400 dark:hover:border-zinc-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] opacity-70">0{idx + 1}</span>
                    <span>{localizedLabel}</span>
                  </span>
                  {isSelected && (
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isFocusedCategory
                          ? 'text-white dark:text-black'
                          : 'text-zinc-950 dark:text-amber-400'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* D-Pad Navigation Hint */}
          <div className="mt-4 pt-3 border-t border-zinc-300 dark:border-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
            <span>[►] {t.navHints.navigate}</span>
            <span className="text-amber-800 dark:text-amber-400 font-bold">Menu Zone</span>
          </div>
        </div>

        {/* Right Side: Content Display Panel (75% Width) */}
        <div
          className={`w-full md:w-3/4 flex flex-col p-6 select-none transition-none bg-white dark:bg-black ${
            focusZone === 'content' ? 'ring-2 ring-inset ring-zinc-950 dark:ring-amber-400' : ''
          }`}
          onClick={() => onSetFocusZone('content')}
        >
          {/* Header Info */}
          <div className="border-b-2 border-zinc-200 dark:border-zinc-800 pb-3 mb-4 flex items-center justify-between">
            <div>
              <p className="text-zinc-700 dark:text-zinc-300 font-medium text-sm font-mono">
                {t.channelsTitle}:{' '}
                <strong className="text-zinc-950 dark:text-white">
                  {getLocalizedCategoryName(activeCategory, language)}
                </strong>{' '}
                — {t.rulesBasedSummary}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono mt-0.5">
                {articles.length} {t.channelHeadlines}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hidden sm:inline">
                [◄] {t.backToMenu}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-amber-400 text-xs font-mono font-bold border border-zinc-300 dark:border-zinc-800">
                75% Frame
              </span>
            </div>
          </div>

          {/* Dynamic Content */}
          {activeCategory === 'Weather' ? (
            <WeatherDisplay
              currentLanguage={language}
              onBackToNews={() => onSelectCategory('All')}
            />
          ) : articles.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center p-8 text-zinc-600 dark:text-zinc-400 font-mono text-sm">
              {t.channelsTitle}
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto">
              {/* Headlines List Column */}
              <div className="lg:col-span-5 space-y-2 overflow-y-auto pr-1 max-h-[500px]">
                <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>{t.channelHeadlines}</span>
                  <span>[▲/▼]</span>
                </div>

                {articles.map((item, idx) => {
                  const isItemFocused = idx === focusedIndex && focusZone === 'content';
                  const isCurrentActive = idx === focusedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playFocus();
                        onArticleFocus(idx);
                        onSetFocusZone('content');
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        soundFx.playSelect();
                        onSelectArticle(item);
                      }}
                      className={`p-3 rounded border-2 cursor-pointer transition-none ${
                        isItemFocused
                          ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-black dark:border-white shadow-xl'
                          : isCurrentActive
                          ? 'bg-zinc-100 border-zinc-400 text-zinc-950 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100'
                          : 'bg-transparent border-zinc-200 dark:border-zinc-900 text-zinc-700 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span
                          className={`font-bold ${
                            isItemFocused
                              ? 'text-amber-400 dark:text-black'
                              : 'text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          CH {item.channelNumber}
                        </span>
                        <span
                          className={`text-[11px] ${
                            isItemFocused
                              ? 'text-zinc-300 dark:text-zinc-700 font-semibold'
                              : 'text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          {item.timestamp}
                        </span>
                      </div>
                      <h4
                        className={`text-sm font-bold leading-snug line-clamp-2 ${
                          isItemFocused
                            ? 'text-white dark:text-black'
                            : 'text-zinc-950 dark:text-zinc-100'
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                  );
                })}
              </div>

              {/* Summary & Reading Panel */}
              <div className="lg:col-span-7 flex flex-col p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800">
                {activeArticle ? (
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                        <span className="font-bold text-amber-700 dark:text-amber-400">
                          CH {activeArticle.channelNumber}
                        </span>
                        <span>·</span>
                        <span>{activeArticle.source}</span>
                        <span>·</span>
                        <span>{activeArticle.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-zinc-950 dark:text-white leading-snug mb-3">
                        {activeArticle.title}
                      </h3>

                      <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 mb-3 space-y-2">
                        <div className="text-xs font-bold text-amber-800 dark:text-amber-400 font-mono uppercase tracking-wider">
                          {t.rulesBasedTakeaways}
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-800 dark:text-zinc-200 font-mono">
                          {activeArticle.aiSummary.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="text-amber-700 dark:text-amber-400 font-bold shrink-0">►</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-xs text-zinc-700 dark:text-zinc-400 leading-relaxed line-clamp-3 font-sans">
                        {activeArticle.fullContent}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-300 dark:border-zinc-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                        {t.proprietaryPolicy}
                      </span>
                      <button
                        onClick={() => {
                          soundFx.playSelect();
                          onSelectArticle(activeArticle);
                        }}
                        className="px-4 py-2 rounded bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-black font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5"
                      >
                        <span>{t.openInFullReader}</span>
                        <span className="bg-white/20 dark:bg-black/20 px-1 py-0.2 rounded text-[10px]">[OK]</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-zinc-600 dark:text-zinc-400 text-sm font-mono">
                    {t.rulesBasedSummary}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
