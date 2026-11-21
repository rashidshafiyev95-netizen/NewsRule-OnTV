import { GoogleGenAI } from '@google/genai';
import { TRANSLATIONS, Translations } from './src/services/i18n';
import { MOCK_NEWS_ARTICLES_EN } from './src/data/mockNews';
import { NewsArticle } from './src/types/news';

let cachedAiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!cachedAiClient) {
    cachedAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedAiClient;
}

const GEMINI_TEXT_MODELS = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'] as const;

const MYMEMORY_LANG_MAP: Record<string, string> = {
  zh: 'zh-CN',
  'zh-tw': 'zh-TW',
  'zh-TW': 'zh-TW',
  jv: 'jv-ID',
  tl: 'fil',
  no: 'nb-NO',
  he: 'he-IL',
  hy: 'hy-AM',
};

const MINT_LANG_MAP: Record<string, string> = {
  // zh-TW uses Traditional Chinese via MyMemory directly
};

const NATIVE_PACK_LANGS = new Set(['en', 'az', 'ru', 'tr', 'es', 'fr', 'de', 'ar', 'zh']);

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function protectHotkeys(text: string): { clean: string; suffix: string; prefix: string } {
  let clean = text;
  let prefix = '';
  let suffix = '';

  const prefixMatch = clean.match(/^(\[[^\]]+\]|#[0-9a-fA-F]{6})\s+/);
  if (prefixMatch) {
    prefix = prefixMatch[1] + ' ';
    clean = clean.slice(prefixMatch[0].length);
  }

  const suffixMatch = clean.match(/\s+(\[[A-Za-z0-9/]+\])$/);
  if (suffixMatch) {
    suffix = ' ' + suffixMatch[1];
    clean = clean.slice(0, -suffixMatch[0].length);
  }

  return { clean, prefix, suffix };
}

async function translateBatchViaMinT(texts: string[], targetLang: string): Promise<string[] | null> {
  if (targetLang === 'zh-TW') return null;
  const mintTarget = MINT_LANG_MAP[targetLang] || targetLang;

  try {
    const htmlBlocks = texts
      .map((t, idx) => `<p id="nr_${idx}">${escapeHtml(t)}</p>`)
      .join('');
    const payload = `<div>${htmlBlocks}</div>`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch('https://translate.wmcloud.org/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NewsRuleTV/1.0 (TV Broadcast Localization)',
      },
      body: JSON.stringify({
        source_language: 'en',
        target_language: mintTarget,
        format: 'html',
        content: payload,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = (await res.json()) as { translation?: string };
    if (!data.translation) return null;

    const extractedById = new Map<number, string>();
    const idRegex = /<p\b[^>]*id=["']?nr_(\d+)["']?[^>]*>([\s\S]*?)<\/p>/gi;
    let match: RegExpExecArray | null;
    while ((match = idRegex.exec(data.translation)) !== null) {
      const idx = parseInt(match[1], 10);
      const inner = decodeHtmlEntities(match[2].replace(/<[^>]+>/g, '').trim());
      if (inner) extractedById.set(idx, inner);
    }

    if (extractedById.size === texts.length) {
      return texts.map((orig, i) => extractedById.get(i) || orig);
    }

    // Fallback positional <p> matching if model stripped id attribute
    const ordered: string[] = [];
    const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
    while ((match = pRegex.exec(data.translation)) !== null) {
      ordered.push(decodeHtmlEntities(match[1].replace(/<[^>]+>/g, '').trim()));
    }
    if (ordered.length === texts.length) {
      return ordered.map((t, i) => t || texts[i]);
    }

    if (extractedById.size > 0) {
      return texts.map((orig, i) => extractedById.get(i) || orig);
    }

    return null;
  } catch {
    return null;
  }
}

async function translateSingleViaMyMemory(text: string, targetLang: string): Promise<string> {
  if (!text.trim() || text.length > 450) return text;
  const mmTarget = MYMEMORY_LANG_MAP[targetLang] || MYMEMORY_LANG_MAP[targetLang.toLowerCase()] || targetLang;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${encodeURIComponent(`en|${mmTarget}`)}&de=broadcast@newsrule.tv`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return text;
    const json = (await res.json()) as {
      responseStatus?: number;
      responseData?: { translatedText?: string };
      matches?: Array<{ translation?: string }>;
    };
    if (json.responseStatus === 200) {
      const candidate = json.responseData?.translatedText || json.matches?.[0]?.translation;
      if (candidate && !candidate.includes('MYMEMORY WARNING') && !candidate.includes('INVALID TARGET')) {
        return decodeHtmlEntities(candidate.trim());
      }
    }
  } catch {
    // Fallback to source text
  }
  return text;
}

async function translateViaMyMemory(texts: string[], targetLang: string): Promise<string[]> {
  // Fast delimiter-packed grouping for short strings (<= 380 chars total per batch)
  const isShortOnly = texts.every((t) => t.length <= 120);
  if (isShortOnly && texts.length > 1) {
    const groups: Array<{ start: number; items: string[] }> = [];
    let current: string[] = [];
    let startIdx = 0;
    let runningLen = 0;

    texts.forEach((t, idx) => {
      const addLen = t.length + 5;
      if (current.length >= 6 || (runningLen + addLen > 360 && current.length > 0)) {
        groups.push({ start: startIdx, items: current });
        current = [t];
        startIdx = idx;
        runningLen = t.length;
      } else {
        current.push(t);
        runningLen += addLen;
      }
    });
    if (current.length > 0) {
      groups.push({ start: startIdx, items: current });
    }

    const packedResults = [...texts];
    await Promise.all(
      groups.map(async (g) => {
        if (g.items.length === 1) {
          packedResults[g.start] = await translateSingleViaMyMemory(g.items[0], targetLang);
          return;
        }
        const joined = g.items.join(' || ');
        const res = await translateSingleViaMyMemory(joined, targetLang);
        const parts = res.split(/\s*\|\|\s*/);
        if (parts.length === g.items.length) {
          parts.forEach((p, idx) => {
            packedResults[g.start + idx] = p.trim() || g.items[idx];
          });
        } else {
          // Positional mismatch fallback to individual calls for this group
          const singles = await Promise.all(
            g.items.map((item) => translateSingleViaMyMemory(item, targetLang))
          );
          singles.forEach((p, idx) => {
            packedResults[g.start + idx] = p || g.items[idx];
          });
        }
      })
    );
    return packedResults;
  }

  const results = new Array<string>(texts.length);
  const CONCURRENCY = 6;

  for (let i = 0; i < texts.length; i += CONCURRENCY) {
    const slice = texts.slice(i, i + CONCURRENCY);
    const translated = await Promise.all(
      slice.map((item) => {
        if (item.length <= 420) {
          return translateSingleViaMyMemory(item, targetLang);
        }
        // Split long multi-sentence paragraphs cleanly below MyMemory 500-byte limit
        const sentences = item.match(/[^.!?]+[.!?]*\s*/g) || [item];
        const chunks: string[] = [];
        let buf = '';
        for (const s of sentences) {
          if ((buf + s).length > 380 && buf) {
            chunks.push(buf.trim());
            buf = s;
          } else {
            buf += s;
          }
        }
        if (buf.trim()) chunks.push(buf.trim());
        return Promise.all(chunks.map((c) => translateSingleViaMyMemory(c, targetLang))).then((parts) =>
          parts.join(' ')
        );
      })
    );
    translated.forEach((val, offset) => {
      results[i + offset] = val;
    });
  }
  return results;
}

export async function translateStrings(
  texts: string[],
  targetLang: string,
  preserveHotkeys = false
): Promise<string[]> {
  if (!targetLang || targetLang === 'en' || texts.length === 0) return texts;

  const processed = preserveHotkeys
    ? texts.map(protectHotkeys)
    : texts.map((clean) => ({ clean, prefix: '', suffix: '' }));
  const cleanInputs = processed.map((p) => p.clean);

  // Split into optimal chunks (~14 strings / ~3KB max per MinT call, concurrency 6)
  const CHUNK_SIZE = 14;
  const chunks: Array<{ start: number; items: string[] }> = [];
  for (let i = 0; i < cleanInputs.length; i += CHUNK_SIZE) {
    chunks.push({ start: i, items: cleanInputs.slice(i, i + CHUNK_SIZE) });
  }

  const output = [...cleanInputs];
  const CONCURRENCY = 6;

  for (let c = 0; c < chunks.length; c += CONCURRENCY) {
    const wave = chunks.slice(c, c + CONCURRENCY);
    await Promise.all(
      wave.map(async (chunk) => {
        let translatedChunk = await translateBatchViaMinT(chunk.items, targetLang);
        if (!translatedChunk) {
          translatedChunk = await translateViaMyMemory(chunk.items, targetLang);
        }
        translatedChunk.forEach((val, idx) => {
          output[chunk.start + idx] = val || chunk.items[idx];
        });
      })
    );
  }

  return processed.map((meta, i) => `${meta.prefix}${output[i]}${meta.suffix}`);
}

export async function generateWithGeminiJson<T>(
  systemInstruction: string,
  prompt: string
): Promise<T | null> {
  const ai = getAiClient();
  if (!ai) return null;

  for (const model of GEMINI_TEXT_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });
      const rawText = response.text || '';
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      if (!cleanJson) continue;
      return JSON.parse(cleanJson) as T;
    } catch (err) {
      console.warn(`Gemini model ${model} fallback triggered:`, err instanceof Error ? err.message : err);
    }
  }
  return null;
}

// =========================================================================
// Server-side Caches & In-Flight Deduplication
// =========================================================================
const CACHE_TTL_MS = 15 * 60 * 1000;
const i18nCache = new Map<string, Translations>();
const i18nInFlight = new Map<string, Promise<Translations>>();

const newsCache = new Map<string, { ts: number; articles: NewsArticle[] }>();
const newsInFlight = new Map<string, Promise<NewsArticle[]>>();

const weatherCache = new Map<
  string,
  { ts: number; data: { temp: number; condition: string; summary: string[] } }
>();
const weatherInFlight = new Map<
  string,
  Promise<{ temp: number; condition: string; summary: string[] }>
>();

const CONTEXTUAL_PHRASE_OVERRIDES: Record<string, string> = {
  'categories.all': 'All News',
  'categories.breaking': 'Breaking News',
  'headerWhiteTheme': 'Light Mode',
  'headerSaver': 'Screensaver',
  'saverHint': 'Screensaver',
};

function extractTranslatableEntries(en: Translations): Array<{ path: string; value: string }> {
  const entries: Array<{ path: string; value: string }> = [];
  const skipTopKeys = new Set(['appName', 'langDescriptions', 'teletextDisclaimer']);

  for (const [k, v] of Object.entries(en)) {
    if (skipTopKeys.has(k)) continue;
    if (typeof v === 'string') {
      entries.push({ path: k, value: CONTEXTUAL_PHRASE_OVERRIDES[k] || v });
    } else if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const [subK, subV] of Object.entries(v as Record<string, unknown>)) {
        if (typeof subV === 'string') {
          const fullPath = `${k}.${subK}`;
          entries.push({
            path: fullPath,
            value: CONTEXTUAL_PHRASE_OVERRIDES[fullPath] || subV,
          });
        }
      }
    }
  }
  return entries;
}

export async function getLocalizedUiBundle(
  lang: string,
  langName?: string,
  nativeLabel?: string
): Promise<Translations> {
  if (NATIVE_PACK_LANGS.has(lang) && TRANSLATIONS[lang]) {
    return TRANSLATIONS[lang];
  }
  const cached = i18nCache.get(lang);
  if (cached) return cached;

  const existing = i18nInFlight.get(lang);
  if (existing) return existing;

  const task = (async (): Promise<Translations> => {
    const en = TRANSLATIONS.en;
    const entries = extractTranslatableEntries(en);

    // 1. Try Gemini 4 Hydrogen first if API key is present
    if (process.env.GEMINI_API_KEY) {
      const flatInput: Record<string, string> = {};
      entries.forEach((e) => {
        flatInput[e.path] = e.value;
      });
      const aiTranslated = await generateWithGeminiJson<Record<string, string>>(
        `You are a professional broadcast localization engineer. Translate every UI string value in the provided JSON object accurately into ${
          langName || lang
        }${nativeLabel ? ` (${nativeLabel})` : ''} [ISO: ${lang}]. Keep bracket keyboard hints like [P], [R], [L], [T], [Esc], [OK], [▲/▼/◄/►] unchanged. Preserve keys exactly. Return only a valid JSON object.`,
        JSON.stringify(flatInput)
      );
      if (aiTranslated && typeof aiTranslated === 'object' && aiTranslated['categories.all']) {
        const bundle = applyFlatEntries(en, entries, (path, fallback) =>
          typeof aiTranslated[path] === 'string' && aiTranslated[path].trim()
            ? aiTranslated[path].trim()
            : fallback
        );
        i18nCache.set(lang, bundle);
        return bundle;
      }
    }

    // 2. Neural MT (MinT / MyMemory) batch translation for ALL 102 languages
    const sourceValues = entries.map((e) => e.value);
    const translatedValues = await translateStrings(sourceValues, lang, true);
    const valueMap = new Map<string, string>();
    entries.forEach((e, idx) => {
      valueMap.set(e.path, translatedValues[idx] || e.value);
    });

    const bundle = applyFlatEntries(en, entries, (path, fallback) => valueMap.get(path) || fallback);
    i18nCache.set(lang, bundle);
    return bundle;
  })();

  i18nInFlight.set(lang, task);
  try {
    return await task;
  } finally {
    i18nInFlight.delete(lang);
  }
}

function applyFlatEntries(
  en: Translations,
  entries: Array<{ path: string; value: string }>,
  picker: (path: string, fallback: string) => string
): Translations {
  const clone: Translations = {
    ...en,
    categories: { ...en.categories },
    navHints: { ...en.navHints },
    tickerItems: { ...en.tickerItems },
    langDescriptions: { ...en.langDescriptions },
  };

  for (const { path, value } of entries) {
    const val = picker(path, value);
    if (path.startsWith('categories.')) {
      const sub = path.slice('categories.'.length) as keyof Translations['categories'];
      clone.categories[sub] = val;
    } else if (path.startsWith('navHints.')) {
      const sub = path.slice('navHints.'.length) as keyof Translations['navHints'];
      clone.navHints[sub] = val;
    } else if (path.startsWith('tickerItems.')) {
      const sub = path.slice('tickerItems.'.length) as keyof Translations['tickerItems'];
      clone.tickerItems[sub] = val;
    } else {
      (clone as unknown as Record<string, unknown>)[path] = val;
    }
  }
  return clone;
}

export async function getLocalizedNewsArticles(options: {
  category: string;
  isLegacy: boolean;
  language: string;
  languageName?: string;
  nativeLabel?: string;
}): Promise<{ articles: NewsArticle[]; sourceType: 'gemini' | 'neural_mt' | 'native' }> {
  const { category, isLegacy, language, languageName, nativeLabel } = options;
  const cacheKey = `${category}_${language}`;
  const cached = newsCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return {
      articles: cached.articles.map((a) => ({ ...a, imageUrl: isLegacy ? '' : a.imageUrl })),
      sourceType: 'neural_mt',
    };
  }

  const existing = newsInFlight.get(cacheKey);
  if (existing) {
    const res = await existing;
    return {
      articles: res.map((a) => ({ ...a, imageUrl: isLegacy ? '' : a.imageUrl })),
      sourceType: 'neural_mt',
    };
  }

  const task = (async (): Promise<NewsArticle[]> => {
    // 1. Try Gemini 4 Hydrogen if configured
    if (process.env.GEMINI_API_KEY) {
      const langDesc = languageName
        ? `${languageName}${nativeLabel ? ` (${nativeLabel})` : ''} [ISO: ${language}]`
        : language;
      const systemInstruction =
        `You are NewsRule, a strict text aggregator designed for TV broadcast displays. ` +
        `CRITICAL: Respond STRICTLY in ${langDesc}. All titles, summary bullet points, sources, readTimes, and fullContent MUST be in natural, professional ${langDesc} journalism. ` +
        `Return a JSON array of 5 recent news stories for the category: ${category}. ` +
        `Each item must have: 'title' (string), 'summary' (array of 3 punchy, factual bullet points), 'source' (string), 'readTime' (string), 'fullContent' (string, 2 paragraphs).`;

      const aiArticles = await generateWithGeminiJson<
        Array<{
          title?: string;
          summary?: string[];
          source?: string;
          readTime?: string;
          fullContent?: string;
        }>
      >(systemInstruction, `Generate breaking news summaries for category: ${category} in language: ${language}`);

      if (Array.isArray(aiArticles) && aiArticles.length > 0) {
        const defaultImgs = [
          '/src/assets/images/hero_global_energy_grid_1794487958839.jpg',
          '/src/assets/images/tech_silicon_photonics_1794487958876.jpg',
          '/src/assets/images/markets_stock_trading_1794487961178.jpg',
          '/src/assets/images/science_deep_ocean_1794487960917.jpg',
          '/src/assets/images/baku_caspian_boulevard_1794487961025.jpg',
        ];
        const normalized: NewsArticle[] = aiArticles.map((item, idx) => ({
          id: `ai-${language}-${idx}-${Date.now()}`,
          channelNumber: 100 + (idx + 1) * 11,
          title: item.title || MOCK_NEWS_ARTICLES_EN[idx % MOCK_NEWS_ARTICLES_EN.length].title,
          category: (category === 'All' ? 'Breaking' : category) as NewsArticle['category'],
          aiSummary: Array.isArray(item.summary) ? item.summary.slice(0, 3) : [],
          fullContent: item.fullContent || (Array.isArray(item.summary) ? item.summary.join('\n\n') : ''),
          source: item.source || 'NewsRule Wire',
          timestamp: 'LIVE',
          readTime: item.readTime || '3 min',
          imageUrl: defaultImgs[idx % defaultImgs.length],
          isBreaking: idx === 0,
          priorityScore: 95 - idx * 4,
          tags: [category],
        }));
        newsCache.set(cacheKey, { ts: Date.now(), articles: normalized });
        return normalized;
      }
    }

    // 2. If one of the 9 languages with pre-authored native journalism and no API key, return [] so client loads native rich mocks instantly
    if (NATIVE_PACK_LANGS.has(language)) {
      return [];
    }

    // 3. Neural MT translation of the curated English broadcast wire into ANY of the other 93 languages
    const pool =
      category === 'All'
        ? MOCK_NEWS_ARTICLES_EN
        : MOCK_NEWS_ARTICLES_EN.filter((a) => a.category === category);
    const sourceArticles = pool.length > 0 ? pool : MOCK_NEWS_ARTICLES_EN;

    // Flatten translatable fields in order: title, source, timestamp, readTime, 3 bullets, paragraphs
    const flatTexts: string[] = [];
    const shapes = sourceArticles.map((article) => {
      const paragraphs = article.fullContent.split('\n\n').filter(Boolean);
      const start = flatTexts.length;
      flatTexts.push(article.title, article.source, article.timestamp, article.readTime);
      const bulletsStart = flatTexts.length;
      flatTexts.push(...article.aiSummary);
      const paraStart = flatTexts.length;
      flatTexts.push(...paragraphs);
      return {
        start,
        bulletsStart,
        bulletsCount: article.aiSummary.length,
        paraStart,
        paraCount: paragraphs.length,
      };
    });

    const translated = await translateStrings(flatTexts, language, false);

    const localizedArticles: NewsArticle[] = sourceArticles.map((orig, idx) => {
      const s = shapes[idx];
      return {
        ...orig,
        id: `${orig.id}-${language}`,
        title: translated[s.start] || orig.title,
        source: translated[s.start + 1] || orig.source,
        timestamp: translated[s.start + 2] || orig.timestamp,
        readTime: translated[s.start + 3] || orig.readTime,
        aiSummary: translated.slice(s.bulletsStart, s.bulletsStart + s.bulletsCount),
        fullContent: translated.slice(s.paraStart, s.paraStart + s.paraCount).join('\n\n'),
      };
    });

    newsCache.set(cacheKey, { ts: Date.now(), articles: localizedArticles });
    return localizedArticles;
  })();

  newsInFlight.set(cacheKey, task);
  try {
    const result = await task;
    return {
      articles: result.map((a) => ({ ...a, imageUrl: isLegacy ? '' : a.imageUrl })),
      sourceType: result.length === 0 ? 'native' : 'neural_mt',
    };
  } finally {
    newsInFlight.delete(cacheKey);
  }
}

const DEFAULT_WEATHER_NATIVE: Record<string, { temp: number; condition: string; summary: string[] }> = {
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

export async function getLocalizedBakuWeather(
  lang: string,
  langName?: string,
  nativeLabel?: string
): Promise<{ temp: number; condition: string; summary: string[] }> {
  const cached = weatherCache.get(lang);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }

  const existing = weatherInFlight.get(lang);
  if (existing) return existing;

  const task = (async () => {
    const baseEn = DEFAULT_WEATHER_NATIVE.en;

    if (process.env.GEMINI_API_KEY) {
      const langDesc = langName
        ? `${langName}${nativeLabel ? ` (${nativeLabel})` : ''} [ISO: ${lang}]`
        : lang;
      const aiWeather = await generateWithGeminiJson<{
        temp?: number;
        condition?: string;
        summary?: string[];
      }>(
        `You are NewsRule Weather Assistant. CRITICAL: Respond STRICTLY in ${langDesc}. Return a clean JSON object for the current weather in Baku, Azerbaijan with 'temp' (Celsius number), 'condition' (string in ${langDesc}), and 'summary' (array of 2 concise bullet points with today's forecast and clothing advice in ${langDesc}).`,
        `Provide current weather conditions and clothing advice for Baku, Azerbaijan in language: ${lang}.`
      );
      if (aiWeather?.condition && Array.isArray(aiWeather.summary)) {
        const result = {
          temp: typeof aiWeather.temp === 'number' ? aiWeather.temp : baseEn.temp,
          condition: aiWeather.condition,
          summary: aiWeather.summary,
        };
        weatherCache.set(lang, { ts: Date.now(), data: result });
        return result;
      }
    }

    if (DEFAULT_WEATHER_NATIVE[lang]) {
      return DEFAULT_WEATHER_NATIVE[lang];
    }

    // Translate weather briefing dynamically into any of the remaining 93 languages
    const [condition, line1, line2] = await translateStrings(
      [baseEn.condition, baseEn.summary[0], baseEn.summary[1]],
      lang,
      false
    );
    const result = {
      temp: baseEn.temp,
      condition: condition || baseEn.condition,
      summary: [line1 || baseEn.summary[0], line2 || baseEn.summary[1]],
    };
    weatherCache.set(lang, { ts: Date.now(), data: result });
    return result;
  })();

  weatherInFlight.set(lang, task);
  try {
    return await task;
  } finally {
    weatherInFlight.delete(lang);
  }
}
