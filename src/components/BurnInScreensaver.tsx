import React, { useState, useEffect, useRef } from 'react';
import { MoonStar, Tv } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { AppLanguage, getLanguageMeta, getTranslations } from '../services/i18n';

interface BurnInScreensaverProps {
  isActive: boolean;
  onWake: () => void;
  articles: NewsArticle[];
  currentLanguage: AppLanguage;
}

export const BurnInScreensaver: React.FC<BurnInScreensaverProps> = ({
  isActive,
  onWake,
  articles,
  currentLanguage,
}) => {
  const [clockText, setClockText] = useState<string>('');
  const [dateText, setDateText] = useState<string>('');
  const [shiftPos, setShiftPos] = useState<{ x: number; y: number }>({ x: 18, y: 22 });
  const [headlineIndex, setHeadlineIndex] = useState<number>(0);
  const activatedAtRef = useRef<number>(0);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

  const langMeta = getLanguageMeta(currentLanguage);
  const t = getTranslations(currentLanguage);

  useEffect(() => {
    if (!isActive) return;

    activatedAtRef.current = Date.now();
    lastPointerRef.current = null;

    const updateClock = () => {
      const now = new Date();
      setClockText(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      try {
        setDateText(
          now.toLocaleDateString(currentLanguage, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })
        );
      } catch {
        setDateText(
          now.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })
        );
      }
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Pixel-shift orbit every 7 seconds to eliminate static phosphor/OLED subpixel wear
    const shiftInterval = setInterval(() => {
      setShiftPos({
        x: Math.round(10 + Math.random() * 52),
        y: Math.round(14 + Math.random() * 52),
      });
    }, 7000);

    // Rotate subtle headline every 11 seconds
    const headlineInterval = setInterval(() => {
      setHeadlineIndex((prev) =>
        articles.length > 0 ? (prev + 1) % articles.length : 0
      );
    }, 11000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(shiftInterval);
      clearInterval(headlineInterval);
    };
  }, [isActive, articles.length]);

  useEffect(() => {
    if (!isActive) return;

    const handleWakeKey = (e: KeyboardEvent) => {
      if (Date.now() - activatedAtRef.current < 350) return;
      e.preventDefault();
      e.stopPropagation();
      onWake();
    };

    const handleWakePointerDown = (e: MouseEvent | TouchEvent) => {
      if (Date.now() - activatedAtRef.current < 350) return;
      e.preventDefault();
      e.stopPropagation();
      onWake();
    };

    const handleWakeMouseMove = (e: MouseEvent) => {
      if (Date.now() - activatedAtRef.current < 450) return;
      if (!lastPointerRef.current) {
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
        return;
      }
      const dx = Math.abs(e.clientX - lastPointerRef.current.x);
      const dy = Math.abs(e.clientY - lastPointerRef.current.y);
      if (dx > 14 || dy > 14) {
        onWake();
      }
    };

    window.addEventListener('keydown', handleWakeKey, true);
    window.addEventListener('mousedown', handleWakePointerDown, true);
    window.addEventListener('touchstart', handleWakePointerDown, true);
    window.addEventListener('mousemove', handleWakeMouseMove, true);

    return () => {
      window.removeEventListener('keydown', handleWakeKey, true);
      window.removeEventListener('mousedown', handleWakePointerDown, true);
      window.removeEventListener('touchstart', handleWakePointerDown, true);
      window.removeEventListener('mousemove', handleWakeMouseMove, true);
    };
  }, [isActive, onWake]);

  if (!isActive) return null;

  const activeHeadline = articles[headlineIndex] || articles[0];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black text-zinc-400 select-none overflow-hidden cursor-none"
      role="dialog"
      aria-label="OLED Burn-In Protection Screensaver"
    >
      {/* Drifting Low-Luminance Floating Module */}
      <div
        dir={langMeta.dir}
        className="absolute max-w-xl w-[82vw] sm:w-auto p-6 will-change-transform transition-transform duration-[3200ms] ease-out motion-reduce:transition-none"
        style={{
          transform: `translate3d(${shiftPos.x}vw, ${shiftPos.y}vh, 0)`,
        }}
      >
        <div className="space-y-3 opacity-80">
          {/* Subdued Pixel-Safe Clock */}
          <div className="flex items-baseline gap-4">
            <span className="text-6xl sm:text-7xl font-bold font-mono tabular-nums tracking-tight text-zinc-300">
              {clockText}
            </span>
            <span className="text-sm font-mono uppercase tracking-widest text-zinc-500">
              {dateText}
            </span>
          </div>

          {/* Minimal Channel Signature */}
          <div className="flex items-center gap-2.5 text-xs font-mono text-amber-500/75">
            <Tv className="w-3.5 h-3.5" />
            <span className="font-bold tracking-wider uppercase">{t.appName} TV</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-500">{t.screensaverActive}</span>
          </div>

          {/* Rotating Dimmed Story Headline */}
          {activeHeadline && (
            <div className="pt-2 border-t border-zinc-900 max-w-lg">
              <div className="text-[11px] font-mono text-zinc-600 mb-1">
                CH {activeHeadline.channelNumber} · {activeHeadline.source}
              </div>
              <p className="text-sm sm:text-base font-medium text-zinc-400 leading-snug line-clamp-2">
                {activeHeadline.title}
              </p>
            </div>
          )}

          {/* Subtle Resume Prompt */}
          <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-zinc-600">
            <MoonStar className="w-3.5 h-3.5 text-zinc-600" />
            <span>{t.screensaverWake}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
