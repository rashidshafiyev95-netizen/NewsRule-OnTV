import React from 'react';
import {
  Sparkles,
  Radio,
  Tv,
  Lock,
  ShieldCheck,
  Play,
  Volume2,
  Clock,
  Eye,
  TrendingUp,
  Compass
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types/news';
import { soundFx } from '../services/soundFx';
import { WeatherDisplay } from './WeatherDisplay';
import { AppLanguage, TRANSLATIONS, getLocalizedCategoryName } from '../services/i18n';

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
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const heroArticle = articles[0] || null;
  const gridArticles = articles.slice(1);

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* 4K Modern Category Bar with localized labels */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
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
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                isSelected
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800/80'
              }`}
            >
              {localizedName}
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
          {/* Hero Showcase (4K Smart TV Spotlight with simulated live broadcast stream) */}
          {heroArticle && (
            <div
              onClick={() => {
                soundFx.playSelect();
                onSelectArticle(heroArticle);
              }}
              onMouseEnter={() => onArticleFocus(0)}
              className={`relative rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-300 group ${
                focusedIndex === 0
                  ? 'border-amber-400 ring-4 ring-amber-400/30 scale-[1.01] shadow-2xl shadow-amber-500/10'
                  : 'border-zinc-800 hover:border-zinc-600 shadow-xl'
              }`}
            >
              {/* Backdrop Image with gradient overlays */}
              <div className="h-80 sm:h-96 w-full relative overflow-hidden bg-zinc-950">
                <img
                  src={heroArticle.imageUrl}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />

                {/* Live TV Broadcast Watermark & Badges */}
                <div className="absolute top-4 left-5 flex items-center gap-3">
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-xs tracking-wider uppercase shadow-md animate-pulse">
                    <Radio className="w-3.5 h-3.5" />
                    {t.liveBroadcast}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-xs">
                    CH {heroArticle.channelNumber}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> FLAG_SECURE
                  </span>
                </div>

                {/* Hero Text Information */}
                <div className="absolute bottom-5 left-5 right-5 sm:max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                    <span>{getLocalizedCategoryName(heroArticle.category, language)}</span>
                    <span>•</span>
                    <span>{heroArticle.timestamp}</span>
                    <span>•</span>
                    <span>{heroArticle.source}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
                    {heroArticle.title}
                  </h2>

                  {/* AI Digest Highlights */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {heroArticle.aiSummary.slice(0, 2).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 bg-black/50 p-2 rounded-lg border border-white/10 backdrop-blur-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider group-hover:bg-amber-400 shadow-md">
                      <Play className="w-4 h-4 fill-current" />
                      {t.openInFullReader} [OK]
                    </span>
                    <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" /> {t.proprietaryPolicy}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4K Multi-Column News Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                {t.channelHeadlines}
              </h3>
              <span className="text-xs font-mono text-zinc-400">
                {gridArticles.length + (heroArticle ? 1 : 0)} Active Feeds
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gridArticles.map((article, index) => {
                const trueIndex = index + 1;
                const isFocused = trueIndex === focusedIndex;
                return (
                  <div
                    key={article.id}
                    onClick={() => {
                      soundFx.playSelect();
                      onSelectArticle(article);
                    }}
                    onMouseEnter={() => onArticleFocus(trueIndex)}
                    className={`group rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 flex flex-col bg-zinc-900/70 backdrop-blur-md ${
                      isFocused
                        ? 'border-amber-400 ring-4 ring-amber-400/30 scale-[1.02] shadow-2xl bg-zinc-900'
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-bold border border-white/20">
                          CH {article.channelNumber}
                        </span>
                        {article.isBreaking && (
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase">
                            {t.categories.breaking}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded bg-zinc-900/80 text-[10px] text-zinc-300 font-mono">
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-1.5">
                          <span className="text-amber-400 font-semibold">{getLocalizedCategoryName(article.category, language)}</span>
                          <span>•</span>
                          <span>{article.timestamp}</span>
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                      </div>

                      {/* Summarized Key Takeaways Preview */}
                      <div className="pt-2 border-t border-zinc-800/80">
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {article.aiSummary[0]}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono pt-1">
                        <span className="text-zinc-500 text-[11px] truncate max-w-[140px]">
                          {article.source}
                        </span>
                        <span className={`text-[11px] font-bold flex items-center gap-1 ${
                          isFocused ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}>
                          [OK] {t.openInFullReader}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
