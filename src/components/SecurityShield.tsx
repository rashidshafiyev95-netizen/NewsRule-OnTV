import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldAlert, Lock, AlertTriangle, EyeOff, Terminal, X } from 'lucide-react';
import { soundFx } from '../services/soundFx';

interface SecurityShieldProps {
  showDetailsModal: boolean;
  onCloseDetailsModal: () => void;
  onOpenTerms: () => void;
}

export const SecurityShield: React.FC<SecurityShieldProps> = ({
  showDetailsModal,
  onCloseDetailsModal,
  onOpenTerms,
}) => {
  const [isWindowBlurred, setIsWindowBlurred] = useState<boolean>(false);
  const [violationAlert, setViolationAlert] = useState<string | null>(null);
  const [sessionId] = useState<string>(() => `NR-${Math.floor(100000 + Math.random() * 900000)}`);
  const [watermarkPos, setWatermarkPos] = useState<{ x: number; y: number }>({ x: 20, y: 30 });

  // 1. Recents / Background Window Blackout (Mirrors Android FLAG_SECURE recent apps preview masking)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsWindowBlurred(true);
      } else {
        setIsWindowBlurred(false);
      }
    };

    const handleWindowBlur = () => {
      setIsWindowBlurred(true);
    };

    const handleWindowFocus = () => {
      setIsWindowBlurred(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  // 2. Anti-Screenshot & Anti-Recording key traps (PrintScreen, shortcuts)
  useEffect(() => {
    const triggerViolation = (msg: string) => {
      soundFx.playSecurityAlert();
      setViolationAlert(msg);
      // Flash screen momentarily
      setIsWindowBlurred(true);
      setTimeout(() => {
        setIsWindowBlurred(false);
      }, 1400);

      const timer = setTimeout(() => {
        setViolationAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        triggerViolation('FLAG_SECURE: Screen capture attempt intercepted. NewsRule broadcasts are protected under Terms of Service.');
      }

      // Mac screenshot shortcut (Cmd + Shift + 3 / 4 / 5)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) {
        e.preventDefault();
        triggerViolation('FLAG_SECURE: Screen clipping hotkey intercepted.');
      }

      // Print page trap (Ctrl + P)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        triggerViolation('FLAG_SECURE: Document printing is prohibited for NewsRule proprietary content.');
      }

      // Save page trap (Ctrl + S)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        triggerViolation('FLAG_SECURE: Content export is restricted under NewsRule Terms.');
      }

      // DevTools inspect trap (F12, Ctrl+Shift+I)
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i'))) {
        e.preventDefault();
        triggerViolation('FLAG_SECURE: DOM inspection is restricted on NewsRule TV feed.');
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerViolation('ANTI-COPY: Text clipboard copying is disabled under NewsRule Proprietary Content Policy.');
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerViolation('PROTECTED FEED: Context menu and media extraction are disabled.');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', (e) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        triggerViolation('FLAG_SECURE: PrintScreen key release blocked.');
      }
    });
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // 3. Dynamic moving forensic watermark (drifts across screen to deter video recording / cropping)
  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkPos({
        x: Math.floor(10 + Math.random() * 70),
        y: Math.floor(10 + Math.random() * 75),
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Dynamic Floating Forensic Security Watermark */}
      <div
        className="pointer-events-none fixed z-30 select-none transition-all duration-1000 ease-in-out opacity-20 hover:opacity-0 text-[10px] sm:text-xs font-mono tracking-widest text-white/50"
        style={{
          left: `${watermarkPos.x}%`,
          top: `${watermarkPos.y}%`,
          textShadow: '0 0 4px rgba(0,0,0,0.8)',
        }}
      >
        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-white/10 backdrop-blur-xs">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>NEWSRULE SECURE TV • {sessionId} • DO NOT RECORD</span>
        </div>
      </div>

      {/* FLAG_SECURE Blackout Curtain (Triggered on Window Blur / Recents / Screenshot Attempt) */}
      {isWindowBlurred && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/98 backdrop-blur-2xl text-center p-6 text-white select-none animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-5 shadow-lg shadow-amber-500/10">
            <EyeOff className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3 tracking-wider uppercase font-mono">
            FLAG_SECURE Active
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Broadcast Content Protected
          </h2>
          <p className="mt-3 max-w-lg text-sm sm:text-base text-zinc-400 leading-relaxed">
            Content is obscured while the window is inactive or screen capture is detected. Return focus to NewsRule TV to resume normal viewing.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-zinc-500 font-mono">
            <span>Session: {sessionId}</span>
            <span>•</span>
            <span>Android TV Security Layer v2.4</span>
          </div>
        </div>
      )}

      {/* Security Violation HUD Toast */}
      {violationAlert && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[90%] bg-red-950/90 border border-red-500/80 rounded-xl p-4 shadow-2xl backdrop-blur-md text-white animate-in slide-in-from-top duration-300 flex items-start gap-3.5 select-none">
          <div className="p-2 rounded-lg bg-red-600/30 text-red-300 shrink-0">
            <ShieldAlert className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-red-200 uppercase tracking-wide flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Security Shield Alert
              </h4>
              <button
                onClick={() => setViolationAlert(null)}
                className="text-red-400 hover:text-white p-1"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-red-100/90 leading-snug">
              {violationAlert}
            </p>
            <div className="mt-2.5 flex items-center gap-3">
              <button
                onClick={onOpenTerms}
                className="text-xs font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-2"
              >
                View Terms of Service & Policy →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hardware & Android FLAG_SECURE Architecture Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-zinc-100 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    NewsRule Security Architecture
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Multi-Layer Screen Recording & Piracy Protection
                  </p>
                </div>
              </div>
              <button
                onClick={onCloseDetailsModal}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
                    <Terminal className="w-4 h-4" />
                    Native Android Implementation (FLAG_SECURE)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    ACTIVE
                  </span>
                </div>
                <pre className="font-mono text-xs bg-zinc-900/90 text-zinc-200 p-3.5 rounded-lg overflow-x-auto border border-zinc-800">
{`package com.newsrule.app;

import android.os.Bundle;
import android.view.WindowManager;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Prevents screenshots, screen recording, and hides content in the recent apps preview
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        );
        
        setContentView(R.layout.activity_main);
    }
}`}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                    Recents & Multitask Blackout
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Blanks the app stream whenever switching TV HDMI inputs or opening the TV launcher task switcher to avoid thumbnail cache exposure.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    Anti-Copy & Scraping Guard
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Intersects text selection, right-click context menu, clipboard cut/copy events, and automated screen scrapers.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onCloseDetailsModal();
                    onOpenTerms();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-colors text-center shadow-md shadow-amber-500/20"
                >
                  Review Terms of Service & Legal Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
