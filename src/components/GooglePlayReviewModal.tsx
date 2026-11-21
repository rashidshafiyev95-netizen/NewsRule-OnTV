import React, { useState } from 'react';
import { Star, CheckCircle, X, Shield, Sparkles } from 'lucide-react';
import { soundFx } from '../services/soundFx';
import { AppLanguage, getTranslations } from '../services/i18n';

interface GooglePlayReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview?: (stars: number, feedback: string) => void;
  language?: AppLanguage;
}

export const GooglePlayReviewModal: React.FC<GooglePlayReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  language = 'en',
}) => {
  const t = getTranslations(language);
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSelectStar = (s: number) => {
    soundFx.playFocus();
    setRating(s);
  };

  const handleSubmit = () => {
    soundFx.playSelect();
    setSubmitted(true);
    if (onSubmitReview) {
      onSubmitReview(rating, 'Optimized for smart and vintage TV sets.');
    }
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl p-6 sm:p-7 shadow-2xl text-zinc-950 dark:text-zinc-100 flex flex-col select-none font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 via-emerald-600 to-amber-500 flex items-center justify-center p-1.5 shadow-md">
              <svg className="w-full h-full text-white fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.025 2.025 0 0 1-.61-1.46V3.274c0-.573.228-1.096.61-1.46zm11.603 11.604l2.583 2.583-11.758 6.77 9.175-9.353zm0-2.836L6.037 1.229l11.758 6.77-2.583 2.583zm1.417 1.418l3.498 2.012c1.173.675 1.173 1.776 0 2.451l-3.498 2.012-2.122-2.122 2.122-2.353z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight">
                Google Play TV Review
              </h3>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                ReviewManager (MainActivity.java)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playBack();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-zinc-300 dark:border-zinc-700"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-600/40 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
              {t.playReviewThanksTitle}
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {t.playReviewThanksBody}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">{t.playReviewTitle}</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                {t.playReviewSubtitle}
              </p>
            </div>

            {/* 5-Star Selector */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((s) => {
                const isActive = (hoverRating !== null ? hoverRating : rating) >= s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSelectStar(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1.5 transition-transform hover:scale-125 focus:scale-125 focus:outline-none"
                    aria-label={`${s} star`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        isActive
                          ? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400'
                          : 'text-zinc-300 dark:text-zinc-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Quick feedback highlights (clean unboxed text) */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-zinc-700 dark:text-zinc-300">
              <span>★ {t.oldTvLite}</span>
              <span aria-hidden="true">·</span>
              <span>★ {t.smartTv4k}</span>
              <span aria-hidden="true">·</span>
              <span>★ {t.categories.weather}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playBack();
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 text-xs font-semibold"
              >
                {t.playReviewLater} [Esc]
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 text-xs font-bold shadow-lg"
              >
                {t.playReviewSubmit} [OK]
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-zinc-300 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-600 dark:text-zinc-500">
          <span>ReviewManager.launchReviewFlow()</span>
          <span>Verified Device</span>
        </div>
      </div>
    </div>
  );
};
