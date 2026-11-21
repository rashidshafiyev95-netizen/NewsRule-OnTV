import { NewsArticle, NewsCategory } from '../types/news';
import { getMockArticlesForLanguage } from '../data/mockNews';
import {
  AppLanguage,
  Translations,
  getInitialAppLanguage,
  getLanguageMeta,
  getTranslations,
  hasTranslationsLoaded,
  setDynamicTranslations,
} from './i18n';

interface RawGeneratedArticle {
  id?: string;
  channelNumber?: number;
  category?: NewsCategory;
  title: string;
  aiSummary?: string[];
  summary?: string[] | string;
  source?: string;
  timestamp?: string;
  readTime?: string;
  fullContent?: string;
  imageUrl?: string;
  isBreaking?: boolean;
  priorityScore?: number;
  tags?: string[];
}

const WEATHER_FALLBACKS: Record<string, { temp: number; condition: string; summary: string[] }> = {
  en: {
    temp: 18,
    condition: 'Caspian Breeze & Partly Cloudy',
    summary: [
      'Moderate Khazri wind gusting along Baku Boulevard with daytime highs around 18°C.',
      'A light windbreaker or layered sweater is recommended for evening strolls near the seaside.',
    ],
  },
  az: {
    temp: 18,
    condition: 'Xəzri Meh və Qismən Buludlu',
    summary: [
      'Bakı bulvarı boyunca mülayim Xəzri küləyi, gündüz temperatur təxminən 18°C.',
      'Dənizkənarı axşam gəzintiləri üçün yüngül pencək və ya gödəkcə tövsiyə olunur.',
    ],
  },
  ru: {
    temp: 18,
    condition: 'Каспийский бриз, переменная облачность',
    summary: [
      'Умеренный ветер Хазри вдоль Бакинского бульвара, дневная температура около 18°C.',
      'Для вечерней прогулки по набережной рекомендуется ветровка или легкая куртка.',
    ],
  },
  tr: {
    temp: 18,
    condition: 'Hazar Esintisi ve Parçalı Bulutlu',
    summary: [
      'Bakü Bulvarı boyunca orta şiddette Hazri rüzgarı, gündüz en yüksek sıcaklık yaklaşık 18°C.',
      'Sahil boyunca akşam yürüyüşleri için ince bir rüzgarlık veya ceket önerilir.',
    ],
  },
  es: {
    temp: 18,
    condition: 'Brisa del Caspio y Parcialmente Nublado',
    summary: [
      'Viento moderado Khazri en el Bulevar de Bakú con máximas diurnas cercanas a los 18°C.',
      'Se recomienda una chaqueta ligera para los paseos nocturnos junto al mar.',
    ],
  },
  fr: {
    temp: 18,
    condition: 'Brise Caspienne et Temps Peu Nuageux',
    summary: [
      'Vent modéré Khazri le long du boulevard de Bakou avec des maximales autour de 18°C.',
      'Un coupe-vent léger est conseillé pour les promenades en soirée en bord de mer.',
    ],
  },
  de: {
    temp: 18,
    condition: 'Kaspische Brise & Leicht Bewölkt',
    summary: [
      'Mäßiger Khazri-Wind am Baku Boulevard mit Tageshöchstwerten um 18°C.',
      'Für abendliche Spaziergänge an der Küste wird eine leichte Windjacke empfohlen.',
    ],
  },
  ar: {
    temp: 18,
    condition: 'نسيم بحر قزوين وغائم جزئياً',
    summary: [
      'رياح خزري معتدلة على طول بوليفارد باكو مع درجات حرارة نهارية تقارب 18 درجة مئوية.',
      'يُوصى بارتداء سترة خفيفة للنزهات المسائية بالقرب من الواجهة البحرية.',
    ],
  },
  zh: {
    temp: 18,
    condition: '里海微风，局部多云',
    summary: [
      '巴库海滨大道沿线吹拂温和的哈兹里风，日间最高气温约为 18°C。',
      '傍晚在海滨散步建议穿着轻便防风外套。',
    ],
  },
};

const pendingUiBundles = new Map<string, Promise<Translations>>();
const clientArticlesCache = new Map<string, NewsArticle[]>();
const clientWeatherCache = new Map<
  string,
  { temp: number | string; condition: string; summary: string[] }
>();

const ARTICLES_STORAGE_PREFIX = 'newsrule_articles_v2_';

function loadCachedArticles(key: string): NewsArticle[] | null {
  if (clientArticlesCache.has(key)) {
    return clientArticlesCache.get(key) || null;
  }
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${ARTICLES_STORAGE_PREFIX}${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as NewsArticle[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      clientArticlesCache.set(key, parsed);
      return parsed;
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

function saveCachedArticles(key: string, articles: NewsArticle[]): void {
  clientArticlesCache.set(key, articles);
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${ARTICLES_STORAGE_PREFIX}${key}`, JSON.stringify(articles));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Port of com.newsrule.app.AIStudioClient to Web environment.
 * Dispatches 102-language UI bundles, summarized news, and weather briefs.
 */
export class AIStudioClient {
  public static async fetchUiTranslations(language: AppLanguage): Promise<Translations> {
    if (hasTranslationsLoaded(language)) {
      return getTranslations(language);
    }

    const existing = pendingUiBundles.get(language);
    if (existing) return existing;

    const langMeta = getLanguageMeta(language);
    const task = (async () => {
      try {
        const res = await fetch(
          `/api/i18n/bundle?lang=${encodeURIComponent(language)}&langName=${encodeURIComponent(
            langMeta.englishName
          )}&nativeLabel=${encodeURIComponent(langMeta.nativeLabel)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data?.bundle) {
          return setDynamicTranslations(language, data.bundle);
        }
      } catch (err) {
        console.warn('UI bundle translation fallback:', err);
      } finally {
        pendingUiBundles.delete(language);
      }
      return getTranslations(language);
    })();

    pendingUiBundles.set(language, task);
    return task;
  }

  public static async fetchSummarizedNews(
    category: NewsCategory,
    isLegacy: boolean,
    language: AppLanguage,
    callback: {
      onSuccess: (articles: NewsArticle[]) => void;
      onFailure: (err: Error) => void;
    }
  ): Promise<void> {
    const cacheKey = `${category}_${language}`;
    const cached = loadCachedArticles(cacheKey);
    if (cached && cached.length > 0) {
      callback.onSuccess(cached.map((a) => ({ ...a, imageUrl: isLegacy ? '' : a.imageUrl })));
      return;
    }

    try {
      const langMeta = getLanguageMeta(language);
      const t = getTranslations(language);
      const response = await fetch('/api/news/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          isLegacy,
          language,
          languageName: langMeta.englishName,
          nativeLabel: langMeta.nativeLabel,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error Code: ${response.status}`);
      }

      const data = await response.json();

      if (data.fallback || !Array.isArray(data.articles) || data.articles.length === 0) {
        const localizedPool = getMockArticlesForLanguage(language);
        const fallbackList =
          category === 'All'
            ? localizedPool
            : localizedPool.filter((a) => a.category === category);
        callback.onSuccess(fallbackList.length > 0 ? fallbackList : localizedPool);
        return;
      }

      const mappedArticles: NewsArticle[] = data.articles.map(
        (item: RawGeneratedArticle, idx: number) => {
          const rawSummary = item.aiSummary || item.summary;
          const summaries = Array.isArray(rawSummary)
            ? rawSummary
            : typeof rawSummary === 'string'
            ? [rawSummary]
            : [t.rulesBasedSummary];

          return {
            id: item.id || `ai-${language}-${Date.now()}-${idx}`,
            channelNumber: item.channelNumber || 100 + (idx + 1) * 11,
            title: item.title || t.channelHeadlines,
            category: item.category || (category === 'All' ? 'Breaking' : category),
            aiSummary: summaries.slice(0, 3),
            fullContent: item.fullContent || summaries.join('\n\n'),
            source: item.source || `${t.appName}`,
            timestamp: item.timestamp || t.liveBroadcast,
            readTime: item.readTime || '3 min',
            imageUrl: isLegacy
              ? ''
              : item.imageUrl || '/src/assets/images/hero_global_energy_grid_1794487958839.jpg',
            isBreaking: typeof item.isBreaking === 'boolean' ? item.isBreaking : idx === 0,
            priorityScore: item.priorityScore ?? 90 - idx * 5,
            tags: Array.isArray(item.tags) ? item.tags : [category],
          };
        }
      );

      saveCachedArticles(cacheKey, mappedArticles);
      callback.onSuccess(mappedArticles);
    } catch (err: unknown) {
      console.warn('AIStudioClient fetch error, using localized wire cache fallback:', err);
      const localizedPool = getMockArticlesForLanguage(language);
      const fallbackList =
        category === 'All'
          ? localizedPool
          : localizedPool.filter((a) => a.category === category);
      callback.onSuccess(fallbackList.length > 0 ? fallbackList : localizedPool);
      callback.onFailure(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * NewsRule Weather Assistant client for Baku, Azerbaijan across all 102 languages.
   */
  public static async fetchBakuWeather(
    lang?: AppLanguage
  ): Promise<{ temp: number | string; condition: string; summary: string[] }> {
    const activeLang = lang || getInitialAppLanguage();
    const cached = clientWeatherCache.get(activeLang);
    if (cached) return cached;

    const langMeta = getLanguageMeta(activeLang);
    const fallback = WEATHER_FALLBACKS[activeLang] || WEATHER_FALLBACKS.en;

    try {
      const res = await fetch(
        `/api/weather/baku?lang=${encodeURIComponent(activeLang)}&langName=${encodeURIComponent(
          langMeta.englishName
        )}&nativeLabel=${encodeURIComponent(langMeta.nativeLabel)}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const result = {
        temp: data.temp ?? fallback.temp,
        condition: data.condition || fallback.condition,
        summary: Array.isArray(data.summary) ? data.summary : fallback.summary,
      };
      clientWeatherCache.set(activeLang, result);
      return result;
    } catch (err) {
      console.warn('Weather fetch fallback:', err);
      return fallback;
    }
  }
}
