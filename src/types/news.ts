export type DeviceProfile = 'LEGACY_LITE' | 'MODERN_RICH';

export type ProfileOverride = 'AUTO' | 'LEGACY' | 'MODERN';
export type ProfileMode = ProfileOverride;

export interface HardwareMetrics {
  totalRamGb: number;
  cpuCores: number;
  screenRes: string;
  fps: number;
  isLowSpec: boolean;
  detectedProfile: DeviceProfile;
  userAgent: string;
  gpuRenderer?: string;
}

export type NewsCategory =
  | 'All'
  | 'Breaking'
  | 'Weather'
  | 'World'
  | 'Tech & AI'
  | 'Markets'
  | 'Science'
  | 'Sports'
  | 'Entertainment';

export interface NewsArticle {
  id: string;
  channelNumber: number;
  title: string;
  category: NewsCategory;
  aiSummary: string[];
  fullContent: string;
  source: string;
  timestamp: string;
  readTime: string;
  imageUrl: string;
  isBreaking?: boolean;
  priorityScore: number;
  tags: string[];
}

export interface SecurityState {
  flagSecureEnforced: boolean;
  antiCopyActive: boolean;
  windowBlurred: boolean;
  lastViolation: string | null;
  violationCount: number;
  showTerms: boolean;
  termsAccepted: boolean;
}
