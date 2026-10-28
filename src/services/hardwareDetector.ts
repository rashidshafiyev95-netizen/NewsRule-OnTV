import { DeviceProfile, HardwareMetrics, ProfileMode, ProfileOverride } from '../types/news';

/**
 * Port of com.newsrule.app.HardwareDetector to Web/Smart TV environment.
 * Evaluates available memory, CPU logical processors, screen resolution,
 * and user agent profiles to select between LEGACY_LITE and MODERN_RICH.
 */
export function detectHardwareSpecs(): HardwareMetrics {
  let ramGb = 4; // default assumption for modern desktop/smart TV

  // 1. Check device memory API (supported in Chromium/Android TV browsers)
  if ('deviceMemory' in navigator && typeof (navigator as { deviceMemory?: number }).deviceMemory === 'number') {
    ramGb = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;
  } else if (typeof performance !== 'undefined' && 'memory' in performance) {
    // Fallback: estimate from heap limit if available
    const perfMemory = (performance as unknown as { memory?: { jsHeapSizeLimit?: number } }).memory;
    if (perfMemory?.jsHeapSizeLimit) {
      ramGb = Math.round((perfMemory.jsHeapSizeLimit / (1024 * 1024 * 1024)) * 2);
    }
  }

  // 2. Check CPU processor cores
  const cpuCores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;

  // 3. Screen resolution & User Agent heuristics
  const screenWidth = typeof window !== 'undefined' ? window.screen.width : 1920;
  const screenHeight = typeof window !== 'undefined' ? window.screen.height : 1080;
  const screenRes = `${screenWidth}x${screenHeight}`;
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';

  // Check for legacy Android TV versions (Android 7 or lower / SDK < 26) or legacy WebViews
  const isLegacyAndroid = /Android [1-7]\./i.test(ua) || /Tizen [1-4]\./i.test(ua) || /webOS\/[1-3]\./i.test(ua);
  const isSmallScreen = screenWidth < 1280 && screenHeight < 720;

  // Exact threshold matching user's Java code:
  // "Less than 3GB RAM or cpuCores <= 4 or sdkVersion < Build.VERSION_CODES.O = LEGACY_LITE"
  const isLowSpec = ramGb < 3 || cpuCores <= 4 || isLegacyAndroid || isSmallScreen;
  const detectedProfile: DeviceProfile = isLowSpec ? 'LEGACY_LITE' : 'MODERN_RICH';

  // Attempt WebGL GPU renderer string probe
  let gpuRenderer: string | undefined;
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (gl && typeof gl.getExtension === 'function') {
      const dbgRenderInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (dbgRenderInfo) {
        gpuRenderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  } catch {
    // Non-fatal
  }

  return {
    totalRamGb: ramGb,
    cpuCores,
    screenRes,
    fps: 60,
    isLowSpec,
    detectedProfile,
    userAgent: ua,
    gpuRenderer,
  };
}

/**
 * Android SharedPreferences compatibility layer:
 * PREFS_NAME = "NewsRuleSettings"
 * KEY_OVERRIDE_PROFILE = "override_hardware_profile"
 */
const PREFS_NAME = 'NewsRuleSettings';
const KEY_OVERRIDE_PROFILE = 'override_hardware_profile';

export function getManualProfileOverride(): ProfileOverride {
  if (typeof window === 'undefined') return 'AUTO';
  try {
    const raw = localStorage.getItem(`${PREFS_NAME}_${KEY_OVERRIDE_PROFILE}`);
    if (raw === 'LEGACY' || raw === 'MODERN' || raw === 'AUTO') {
      return raw;
    }
  } catch {
    // Storage access issue fallback
  }
  return 'AUTO';
}

export function setManualProfileOverride(value: ProfileOverride): void {
  try {
    localStorage.setItem(`${PREFS_NAME}_${KEY_OVERRIDE_PROFILE}`, value);
  } catch {
    // Storage access issue fallback
  }
}

/**
 * Exact implementation of HardwareDetector.detectDevicePerformance(Context context):
 * 1. Checks for manual user override first: "LEGACY" -> LEGACY_LITE, "MODERN" -> MODERN_RICH
 * 2. Fallback to Automatic Detection if preference is set to "AUTO"
 */
export function detectDevicePerformance(): DeviceProfile {
  const manualPreference = getManualProfileOverride();

  if (manualPreference === 'LEGACY') {
    return 'LEGACY_LITE';
  } else if (manualPreference === 'MODERN') {
    return 'MODERN_RICH';
  }

  // Fallback to Automatic Detection
  const specs = detectHardwareSpecs();
  return specs.detectedProfile;
}

// Backward compatibility aliases
export const getSavedProfileMode = getManualProfileOverride;
export const saveProfileMode = setManualProfileOverride;
