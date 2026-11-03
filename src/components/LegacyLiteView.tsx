import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Radio,
  Tv,
  Lock,
  ShieldCheck,
  ChevronRight,
  Volume2,
  CheckCircle2,
  ArrowRight,
  FileText
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types/news';
import { soundFx } from '../services/soundFx';
import { WeatherDisplay } from './WeatherDisplay';
import { AppLanguage, TRANSLATIONS, getLocalizedCategoryName } from '../services/i18n';

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
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const activeArticle = articles[focusedIndex] || articles[0];

  return (
    <div
      className="w-full flex-1 flex flex-col rounded-lg overflow-hidden border border-zinc-800"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Top Telemetry Strip */}
      <div className="bg-black border-b border-zinc-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-zinc-200 font-bold uppercase">
            Android TV Split Layout (25% Menu / 75% Content)
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-amber-400">{t.pureBlackSaver}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> FLAG_SECURE
          </span>
          <span className="text-zinc-500">
            Focus: <strong className="text-white uppercase">{focusZone}</strong>
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: 25% Left Navigation Menu / 75% Content Display Panel */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[580px]">
        {/* Left Side: Navigation Menu (25% Width) */}
        <div
          className={`w-full md:w-1/4 flex flex-col p-4 border-b md:border-b-0 md:border-r border-zinc-800 select-none transition-none ${
            focusZone === 'menu' ? 'ring-2 ring-inset ring-amber-400' : ''
          }`}
          style={{ backgroundColor: '#111111' }}
          onClick={() => onSetFocusZone('menu')}
        >
          {/* App Name / Header: TextView android:id="@+id/menuTitle" */}
          <div className="mb-6">
            <h1
              id="menuTitle"
              className="text-white font-bold tracking-tight text-2xl flex items-center justify-between"
              style={{ fontSize: '24px' }}
            >
              <span>{t.appName}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                TV
              </span>
            </h1>
            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
              {t.tagline}
            </p>
          </div>

          {/* Scrollable Category List: RecyclerView android:id="@+id/categoryRecyclerView" */}
          <div
            id="categoryRecyclerView"
            className="flex-1 space-y-1.5 overflow-y-auto pr-1"
          >
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{t.channelsTitle}</span>
              <span className="text-zinc-400">[▲/▼]</span>
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
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-sm font-mono font-bold flex items-center justify-between border transition-none ${
                    isFocusedCategory
                      ? 'tv-item-selector state-focused bg-white text-black border-white shadow-lg'
                      : isSelected
                      ? 'bg-zinc-800 text-white border-zinc-600'
                      : 'tv-item-selector bg-transparent text-zinc-400 border-transparent hover:border-zinc-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs opacity-60">#{idx + 1}</span>
                    <span>{localizedLabel}</span>
                  </span>
                  {isSelected && (
                    <ArrowRight className={`w-3.5 h-3.5 ${isFocusedCategory ? 'text-black' : 'text-amber-400'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* D-Pad Navigation Hint for Left Menu */}
          <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
            <span>[►] {t.navHints.navigate}</span>
            <span className="text-amber-400 font-bold">Menu Zone</span>
          </div>
        </div>

        {/* Right Side: Content Display Panel (75% Width): FrameLayout android:id="@+id/contentFrame" */}
        <div
          id="contentFrame"
          className={`w-full md:w-3/4 flex flex-col p-6 select-none transition-none ${
            focusZone === 'content' ? 'ring-2 ring-inset ring-amber-400' : ''
          }`}
          style={{ backgroundColor: '#000000' }}
          onClick={() => onSetFocusZone('content')}
        >
          {/* Default TextView prompt or Dynamic Content Header */}
          <div className="border-b border-zinc-800 pb-3 mb-4 flex items-center justify-between">
            <div>
              <p
                id="newsSummaryText"
                className="text-zinc-300 font-medium"
                style={{ fontSize: '18px', color: '#CCCCCC' }}
              >
                {t.channelsTitle}: <strong className="text-white">{getLocalizedCategoryName(activeCategory, language)}</strong> — {t.rulesBasedSummary}
              </p>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                {articles.length} {t.channelHeadlines}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                [◄] {t.backToMenu}
              </span>
              <span className="px-2 py-1 rounded bg-zinc-900 text-amber-400 text-xs font-mono font-bold border border-zinc-800">
                75% Content Frame
              </span>
            </div>
          </div>

          {/* Dynamic Content Loaded inside FrameLayout */}
          {activeCategory === 'Weather' ? (
            <WeatherDisplay
              currentLanguage={language}
              onBackToNews={() => onSelectCategory('All')}
            />
          ) : articles.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center p-8 text-zinc-400 font-mono text-base">
              {t.channelsTitle}
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto">
              {/* Articles List Column (5 cols) */}
              <div className="lg:col-span-5 space-y-2.5 overflow-y-auto pr-1 max-h-[500px]">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
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
                      className={`p-3 rounded-md border cursor-pointer transition-none ${
                        isItemFocused
                          ? 'tv-item-selector state-focused bg-white text-black border-white shadow-xl'
                          : isCurrentActive
                          ? 'bg-zinc-900 border-zinc-600 text-zinc-100'
                          : 'tv-item-selector bg-transparent border-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className={`font-bold ${isItemFocused ? 'text-black' : 'text-amber-400'}`}>
                          CH {item.channelNumber}
                        </span>
                        <span className={`text-[11px] ${isItemFocused ? 'text-zinc-700 font-semibold' : 'text-zinc-500'}`}>
                          {item.timestamp}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold leading-snug line-clamp-2 ${isItemFocused ? 'text-black' : 'text-zinc-100'}`}>
                        {item.title}
                      </h4>
                    </div>
                  );
                })}
              </div>

              {/* Rules-Based AI Summary & Preview Panel (7 cols) */}
              <div className="lg:col-span-7 flex flex-col p-4 rounded-xl bg-zinc-950 border-2 border-zinc-800">
                {activeArticle ? (
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Active Story Channel Header */}
                      <div className="flex items-center gap-2 mb-2 text-xs font-mono">
                        <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-bold">
                          CH {activeArticle.channelNumber}
                        </span>
                        {activeArticle.isBreaking && (
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold">
                            {t.categories.breaking}
                          </span>
                        )}
                        <span className="text-zinc-400">{activeArticle.source}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400">{activeArticle.readTime}</span>
                      </div>

                      {/* Main Headline */}
                      <h3 className="text-xl font-bold text-white leading-snug mb-3">
                        {activeArticle.title}
                      </h3>

                      {/* Rules-Based AI Summaries Box */}
                      <div className="p-3.5 rounded-lg bg-zinc-900/90 border-l-4 border-amber-400 border-y border-r border-zinc-800 mb-3">
                        <div className="flex items-center justify-between text-xs font-bold text-amber-400 font-mono mb-2 uppercase">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            {t.rulesBasedTakeaways}
                          </span>
                          <span className="text-[10px] text-zinc-400">Exclusive</span>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-zinc-200">
                          {activeArticle.aiSummary.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold shrink-0">►</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Brief excerpt of text */}
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                        {activeArticle.fullContent}
                      </p>
                    </div>

                    {/* Bottom Action inside Content Frame */}
                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span>{t.proprietaryPolicy}</span>
                      </div>
                      <button
                        onClick={() => {
                          soundFx.playSelect();
                          onSelectArticle(activeArticle);
                        }}
                        className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 transition-none"
                      >
                        <span>{t.openInFullReader}</span>
                        <span className="bg-black/20 px-1 py-0.2 rounded text-[10px]">[OK]</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-zinc-400 text-sm font-mono">
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
