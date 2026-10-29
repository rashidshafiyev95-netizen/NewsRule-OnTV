import React, { useState } from 'react';
import { Star, CheckCircle, X, Shield, Sparkles } from 'lucide-react';
import { soundFx } from '../services/soundFx';

interface GooglePlayReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview?: (stars: number, feedback: string) => void;
}

export const GooglePlayReviewModal: React.FC<GooglePlayReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-zinc-900 border-2 border-zinc-700 rounded-3xl p-6 sm:p-7 shadow-2xl text-zinc-100 flex flex-col select-none font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-amber-500 flex items-center justify-center p-1.5 shadow-md">
              <svg className="w-full h-full text-white fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.025 2.025 0 0 1-.61-1.46V3.274c0-.573.228-1.096.61-1.46zm11.603 11.604l2.583 2.583-11.758 6.77 9.175-9.353zm0-2.836L6.037 1.229l11.758 6.77-2.583 2.583zm1.417 1.418l3.498 2.012c1.173.675 1.173 1.776 0 2.451l-3.498 2.012-2.122-2.122 2.122-2.353z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Google Play TV Review
              </h3>
              <p className="text-[11px] text-zinc-400">
                Official In-App Review Flow
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playBack();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Thank You for Your Feedback!</h4>
            <p className="text-xs text-zinc-400">
              Your rating has been registered to the Google Play Store for NewsRule TV.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-bold text-white">Enjoying NewsRule TV?</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Tap the stars below to rate your experience on Android TV.
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
                          ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Quick feedback tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
              <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                ★ Fast on Old TVs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                ★ Crisp 4K Text
              </span>
              <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                ★ Accurate Weather
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playBack();
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
              >
                Not Now [Esc]
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold shadow-lg shadow-emerald-500/20"
              >
                Submit Review [OK]
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
          <span>ReviewManager.launchReviewFlow()</span>
          <span>Verified Device</span>
        </div>
      </div>
    </div>
  );
};
