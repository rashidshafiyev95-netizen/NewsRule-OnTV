import React from 'react';
import { Cpu, HardDrive, Monitor, Zap, Check, X, ShieldAlert, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { HardwareMetrics, ProfileMode } from '../types/news';
import { soundFx } from '../services/soundFx';

interface HardwareDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: HardwareMetrics;
  currentMode: ProfileMode;
  onSelectMode: (mode: ProfileMode) => void;
  onRefreshMetrics: () => void;
}

export const HardwareDiagnosticsModal: React.FC<HardwareDiagnosticsModalProps> = ({
  isOpen,
  onClose,
  metrics,
  currentMode,
  onSelectMode,
  onRefreshMetrics,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Hardware & RAM Detector
              </h2>
              <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider">
                TV Hardware Classification Engine
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playSelect();
                onRefreshMetrics();
              }}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Re-probe Hardware"
              aria-label="Re-probe Hardware"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundFx.playBack();
                onClose();
              }}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1.5 text-sm">
          {/* Telemetry Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                <span>System RAM</span>
              </div>
              <div className="text-2xl font-bold font-mono text-zinc-100">
                ~{metrics.totalRamGb} GB
              </div>
              <span className={`text-[10px] font-mono ${metrics.totalRamGb < 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {metrics.totalRamGb < 3 ? 'Below 3GB Threshold' : 'Optimal Capacity'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>CPU Logical Cores</span>
              </div>
              <div className="text-2xl font-bold font-mono text-zinc-100">
                {metrics.cpuCores} Cores
              </div>
              <span className={`text-[10px] font-mono ${metrics.cpuCores <= 4 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {metrics.cpuCores <= 4 ? 'Low/Mid SOC (<=4)' : 'Multi-Core SOC'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Monitor className="w-4 h-4 text-purple-400" />
                <span>Display Canvas</span>
              </div>
              <div className="text-lg font-bold font-mono text-zinc-100 truncate">
                {metrics.screenRes}
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                Aspect ratio native
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Hardware Profile</span>
              </div>
              <div className="text-sm font-bold font-mono text-amber-400 uppercase truncate">
                {metrics.detectedProfile}
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                {metrics.isLowSpec ? 'Legacy TV Profile' : 'Modern 4K Profile'}
              </span>
            </div>
          </div>

          {/* Profile Selector Controls */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-200 font-semibold mb-3">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Television Experience Profile Override (SharedPreferences)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => {
                  soundFx.playToggleMode();
                  onSelectMode('AUTO');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  currentMode === 'AUTO'
                    ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500'
                    : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs uppercase tracking-wider">AUTO</span>
                  {currentMode === 'AUTO' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  setManualProfileOverride(this, "AUTO") — auto-classifies from RAM (&lt;3GB) and cores.
                </p>
              </button>

              <button
                onClick={() => {
                  soundFx.playToggleMode();
                  onSelectMode('LEGACY');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  currentMode === 'LEGACY'
                    ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500'
                    : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs uppercase tracking-wider">LEGACY (LITE)</span>
                  {currentMode === 'LEGACY' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  setManualProfileOverride(this, "LEGACY") — forces low-resource text layouts and zero animations.
                </p>
              </button>

              <button
                onClick={() => {
                  soundFx.playToggleMode();
                  onSelectMode('MODERN');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  currentMode === 'MODERN'
                    ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500'
                    : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs uppercase tracking-wider">MODERN (RICH)</span>
                  {currentMode === 'MODERN' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  setManualProfileOverride(this, "MODERN") — forces 4K animations, ambient glow, and video previews.
                </p>
              </button>
            </div>
          </div>

          {/* Reference Android TV Item Focus Selector (tv_item_selector.xml) */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-white rounded-xs inline-block" />
                TV Item Focus Selector (res/drawable/tv_item_selector.xml)
              </span>
              <span className="text-[10px] font-mono text-zinc-500">State Focused / Pressed</span>
            </div>
            <pre className="font-mono text-xs bg-zinc-900/90 text-zinc-300 p-3 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed">
{`<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- When the TV remote highlighted/focused on the item -->
    <item android:state_focused="true" android:drawable="@android:color/white" />
    <!-- When clicked -->
    <item android:state_pressed="true" android:drawable="@android:color/white" />
    <!-- Default state -->
    <item android:drawable="@android:color/transparent" />
</selector>`}
            </pre>
          </div>

          {/* Reference Android TV XML Layout Source (activity_main.xml) */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Android TV XML Layout (res/layout/activity_main.xml)
              </span>
              <span className="text-[10px] font-mono text-zinc-500">25% Menu / 75% Content Frame</span>
            </div>
            <pre className="font-mono text-xs bg-zinc-900/90 text-zinc-300 p-3 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed max-h-48">
{`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:background="#000000"> <!-- Pure black background saves energy on older panels -->

    <!-- Left Side: Navigation Menu (25% Width) -->
    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="0.25"
        android:orientation="vertical"
        android:background="#111111"
        android:padding="16dp">

        <TextView
            android:id="@+id/menuTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="NewsRule"
            android:textColor="#FFFFFF"
            android:textSize="24sp"
            android:textStyle="bold"
            android:layout_marginBottom="24dp"/>

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/categoryRecyclerView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:focusable="true"
            android:clickable="true"/>
    </LinearLayout>

    <!-- Right Side: Content Display Panel (75% Width) -->
    <FrameLayout
        android:id="@+id/contentFrame"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="0.75"
        android:padding="24dp">

        <TextView
            android:id="@+id/newsSummaryText"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Select a category to view rules-based summaries."
            android:textColor="#CCCCCC"
            android:textSize="18sp" />
    </FrameLayout>
</LinearLayout>`}
            </pre>
          </div>

          {/* Reference Android Weather Assistant XML Layout */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Weather Assistant Layout (res/layout/layout_weather.xml)
              </span>
              <span className="text-[10px] font-mono text-zinc-500">72sp Temp / 24sp Condition / 18sp Brief</span>
            </div>
            <pre className="font-mono text-xs bg-zinc-900/90 text-zinc-300 p-3 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed max-h-56">
{`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="32dp">

    <!-- Temperature Display -->
    <TextView
        android:id="@+id/weatherTempText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="--°C"
        android:textSize="72sp"
        android:textStyle="bold"
        android:textColor="#FFFFFF"/>

    <!-- Condition Subtitle -->
    <TextView
        android:id="@+id/weatherConditionText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Loading Forecast..."
        android:textSize="24sp"
        android:textColor="#CCCCCC"
        android:layout_marginBottom="24dp"/>

    <!-- Bulleted AI Forecast Brief -->
    <TextView
        android:id="@+id/weatherBriefText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="• Checking local conditions..."
        android:textSize="18sp"
        android:textColor="#EAEAEA"
        android:lineSpacingExtra="8dp"/>
</LinearLayout>`}
            </pre>
          </div>

          {/* Reference Android HardwareDetector Source */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                HardwareDetector Reference (Java)
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Android SDK 26+</span>
            </div>
            <pre className="font-mono text-xs bg-zinc-900/90 text-zinc-300 p-3 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed max-h-56">
{`package com.newsrule.app;

import android.app.ActivityManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;

public class HardwareDetector {

    public enum DeviceProfile {
        LEGACY_LITE,
        MODERN_RICH
    }

    private static final String PREFS_NAME = "NewsRuleSettings";
    private static final String KEY_OVERRIDE_PROFILE = "override_hardware_profile";

    public static DeviceProfile detectDevicePerformance(Context context) {
        // 1. Check for manual user override first
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String manualPreference = prefs.getString(KEY_OVERRIDE_PROFILE, "AUTO");

        if (manualPreference.equals("LEGACY")) {
            return DeviceProfile.LEGACY_LITE;
        } else if (manualPreference.equals("MODERN")) {
            return DeviceProfile.MODERN_RICH;
        }

        // 2. Fallback to Automatic Detection if preference is set to "AUTO"
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo memoryInfo = new ActivityManager.MemoryInfo();
        
        if (activityManager != null) {
            activityManager.getMemoryInfo(memoryInfo);
        }
        
        long totalRamInBytes = memoryInfo.totalMem;
        long totalRamInGb = totalRamInBytes / (1024 * 1024 * 1024);
        int cpuCores = Runtime.getRuntime().availableProcessors();
        int sdkVersion = Build.VERSION.SDK_INT;

        if (totalRamInGb < 3 || cpuCores <= 4 || sdkVersion < Build.VERSION_CODES.O) {
            return DeviceProfile.LEGACY_LITE;
        } else {
            return DeviceProfile.MODERN_RICH;
        }
    }

    // Call this method from your Settings menu when a button or switch is pressed
    public static void setManualProfileOverride(Context context, String value) {
        // Value options: "AUTO", "LEGACY", or "MODERN"
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(KEY_OVERRIDE_PROFILE, value).apply();
    }
}`}
            </pre>
          </div>

          {/* Reference Android AIStudioClient Source (Gemini Summarizer) */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                AIStudioClient Reference (Java & Gemini AI)
              </span>
              <span className="text-[10px] font-mono text-zinc-500">fetchSummarizedNews</span>
            </div>
            <pre className="font-mono text-xs bg-zinc-900/90 text-zinc-300 p-3 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed max-h-56">
{`package com.newsrule.app;

import android.content.Context;
import org.json.JSONArray;
import org.json.JSONObject;

public class AIStudioClient {
    public static void fetchSummarizedNews(Context context, String category, NewsCallback callback) {
        HardwareDetector.DeviceProfile profile = HardwareDetector.detectDevicePerformance(context);
        final boolean isLegacy = (profile == HardwareDetector.DeviceProfile.LEGACY_LITE);

        // Craft optimization instructions for model payload
        String systemInstruction = "You are NewsRule, a strict text aggregator. Return a JSON array of recent news for category: " + category + ". "
                + "Each item must have 'title' and 'summary' (max 3 punchy bullet points). "
                + (isLegacy ? "Do not include any image fields or media links." : "Include an 'imageUrl' field with a valid thumbnail link.");

        // Dispatches HTTP request to Gemini API and delivers parsed JSONArray
    }
}`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 pt-4 mt-4 flex items-center justify-between">
          <div className="text-xs text-zinc-500 font-mono">
            Active Mode: <strong className="text-zinc-200">{currentMode}</strong>
          </div>
          <button
            onClick={() => {
              soundFx.playBack();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
          >
            Done [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
