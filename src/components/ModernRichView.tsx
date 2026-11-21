import React from 'react';
import {
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types/news';
import { soundFx } from '../services/soundFx';
import { WeatherDisplay } from './WeatherDisplay';
import { AppLanguage, getTranslations, getLocalizedCategoryName } from '../services/i18n';

interface ModernRichViewProps {
  articles: NewsArticle[];
  focusedIndex: number;
  onSelectArticle: (article: NewsArticle) => void;
  onArticleFocus: (index: number) => void;
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  categories: NewsCategory[];
  language?: AppLanguage;
}

export const ModernRichView: React.FC<ModernRichViewProps> = ({
  articles,
  focusedIndex,
  onSelectArticle,
  onArticleFocus,
  activeCategory,
  onSelectCategory,
  categories,
  language = 'en',
}) => {
  const t = getTranslations(language);
  const heroArticle = articles[0] || null;
  const secondaryArticles = articles.slice(1, 4);
  const wireArticles = articles.slice(4);

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* Category Segmented Bar - Clean Minimal Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-300 dark:border-zinc-800/80">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          const localizedName = getLocalizedCategoryName(cat, language);
          return (
            <button
              key={cat}
              onClick={() => {
                soundFx.playFocus();
                onSelectCategory(cat);
              }}
              className={`px-3.5 py-2 text-xs font-semibold tracking-wide whitespace-nowrap transition-colors relative ${
                isSelected
                  ? 'text-zinc-950 dark:text-amber-400 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
              }`}
            >
              <span>{localizedName}</span>
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 dark:bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Weather Assistant Mode */}
      {activeCategory === 'Weather' ? (
        <WeatherDisplay
          currentLanguage={language}
          onBackToNews={() => onSelectCategory('All')}
        />
      ) : (
        <>
          {/* TIER 1: Lead Broadcast Feature (Hero Showcase) */}
          {heroArticle && (
            <section
              onClick={() => {
                soundFx.playSelect();
                onSelectArticle(heroArticle);
              }}
              onMouseEnter={() => onArticleFocus(0)}
              className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 group ${
                focusedIndex === 0
                  ? 'border-zinc-950 dark:border-amber-400 ring-2 ring-zinc-950/30 dark:ring-amber-400/50 shadow-2xl scale-[1.008]'
                  : 'border-zinc-300 dark:border-zinc-800/80 hover:border-zinc-500 dark:hover:border-zinc-700 shadow-xl'
              }`}
            >
              <div className="h-96 sm:h-[440px] w-full relative overflow-hidden bg-zinc-950">
                <img
                  src={heroArticle.imageUrl}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-65"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />

                {/* Lead Story Content Overlay (Always over dark scrim for crisp contrast) */}
                <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-200">
                    <span className="text-red-400 font-bold tracking-wider uppercase">
                      ● {t.liveBroadcast}
                    </span>
                    <span aria-hidden="true" className="text-zinc-500">·</span>
                    <span className="text-amber-400 font-bold">CH {heroArticle.channelNumber}</span>
                    <span aria-hidden="true" className="text-zinc-500">·</span>
                    <span>{getLocalizedCategoryName(heroArticle.category, language)}</span>
                    <span aria-hidden="true" className="text-zinc-500">·</span>
                    <span className="text-zinc-300">{heroArticle.readTime}</span>
                  </div>

                  <div className="max-w-3xl space-y-4">
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors" style={{ textWrap: 'balance' }}>
                      {heroArticle.title}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-200 font-sans">
                      {heroArticle.aiSummary.slice(0, 2).map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-lg bg-black/65 backdrop-blur-md border border-white/15"
                        >
                          <span className="text-amber-400 font-bold shrink-0 mt-0.5">►</span>
                          <span className="leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 font-mono tracking-wider group-hover:underline">
                        <span>{t.openInFullReader}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="text-xs text-zinc-300 font-mono">
                        {t.sourceLabel}: {heroArticle.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TIER 2: Secondary Featured Grid (3 Deep-Dive Cards) */}
          {secondaryArticles.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-2">
                <h3 className="text-base font-bold font-display text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>{t.channelHeadlines}</span>
                </h3>
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  {secondaryArticles.length + (heroArticle ? 1 : 0)} {t.storiesActive}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {secondaryArticles.map((article, index) => {
                  const trueIndex = index + 1;
                  const isFocused = trueIndex === focusedIndex;

                  return (
                    <article
                      key={article.id}
                      onClick={() => {
                        soundFx.playSelect();
                        onSelectArticle(article);
                      }}
                      onMouseEnter={() => onArticleFocus(trueIndex)}
                      className={`group rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 flex flex-col bg-zinc-50 dark:bg-zinc-900/60 backdrop-blur-sm ${
                        isFocused
                          ? 'border-zinc-950 dark:border-amber-400 ring-2 ring-zinc-950/25 dark:ring-amber-400/50 shadow-xl scale-[1.015] bg-white dark:bg-zinc-900'
                          : 'border-zinc-300 dark:border-zinc-800/80 hover:border-zinc-500 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 dark:opacity-75"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white drop-shadow-md">
                          <span className="font-bold text-amber-400">CH {article.channelNumber}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                            <span>{getLocalizedCategoryName(article.category, language)}</span>
                            <span aria-hidden="true" className="mx-1.5">·</span>
                            <span>{article.timestamp}</span>
                          </div>

                          <h4 className="text-base font-bold font-display text-zinc-950 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h4>

                          <p className="text-xs text-zinc-700 dark:text-zinc-400 line-clamp-2 leading-relaxed font-sans pt-1">
                            {article.aiSummary[0]}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400">
                          <span className="truncate max-w-[130px]">{article.source}</span>
                          <span className="text-zinc-950 dark:text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">
                            [OK]
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* TIER 3: Fast-Scanning Wire Feed */}
          {wireArticles.length > 0 && (
            <section className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-800 pb-2 flex items-center justify-between">
                <span>{t.newsWire} · {t.directFeed}</span>
                <span>{t.continuouslySynced}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {wireArticles.map((article, wIdx) => {
                  const trueIdx = secondaryArticles.length + 1 + wIdx;
                  const isFocused = trueIdx === focusedIndex;

                  return (
                    <div
                      key={article.id}
                      onClick={() => {
                        soundFx.playSelect();
                        onSelectArticle(article);
                      }}
                      onMouseEnter={() => onArticleFocus(trueIdx)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-colors flex items-start gap-3 ${
                        isFocused
                          ? 'border-zinc-950 bg-zinc-950 text-white dark:border-amber-400 dark:bg-zinc-900 dark:text-white shadow-md'
                          : 'border-zinc-300 bg-zinc-50 hover:border-zinc-500 text-zinc-900 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-bold shrink-0 mt-0.5 ${
                          isFocused
                            ? 'text-amber-400'
                            : 'text-amber-700 dark:text-amber-400'
                        }`}
                      >
                        CH {article.channelNumber}
                      </span>
                      <div className="flex-1 space-y-1">
                        <h5 className="text-sm font-bold leading-snug">
                          {article.title}
                        </h5>
                        <p
                          className={`text-xs line-clamp-1 ${
                            isFocused
                              ? 'text-zinc-300 dark:text-zinc-400'
                              : 'text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          {article.aiSummary[0]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
