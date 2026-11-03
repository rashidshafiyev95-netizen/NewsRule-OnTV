export type AppLanguage = 'en' | 'az' | 'ru';

export interface Translations {
  appName: string;
  tagline: string;
  selectLanguageTitle: string;
  langEn: string;
  langAz: string;
  langRu: string;
  langDescEn: string;
  langDescAz: string;
  langDescRu: string;
  categories: {
    all: string;
    weather: string;
    breaking: string;
    tech: string;
    markets: string;
    world: string;
    science: string;
    sports: string;
    entertainment: string;
  };
  channelsTitle: string;
  channelHeadlines: string;
  rulesBasedSummary: string;
  rulesBasedTakeaways: string;
  detailedReport: string;
  openInFullReader: string;
  backToMenu: string;
  readAloud: string;
  readingAloud: string;
  flagSecureActive: string;
  pureBlackSaver: string;
  oldTvLite: string;
  smartTv4k: string;
  autoMode: string;
  forcedMode: string;
  weatherTitle: string;
  weatherBriefTitle: string;
  liveAiWire: string;
  aiSummarizing: string;
  newsWire: string;
  termsTitle: string;
  proprietaryPolicy: string;
  rateApp: string;
  playReviewTitle: string;
  playReviewSubtitle: string;
  playReviewSubmit: string;
  playReviewLater: string;
  teletextTitle: string;
  broadcastEdition: string;
  liveBroadcast: string;
  close: string;
  navHints: {
    navigate: string;
    open: string;
    mode: string;
    back: string;
    language: string;
  };
  tickerBreaking: string;
  tickerTech: string;
  tickerMarkets: string;
  tickerPolicy: string;
  tickerItems: {
    breaking: string;
    tech: string;
    markets: string;
    policy: string;
  };
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  en: {
    appName: 'NewsRule',
    tagline: 'Proprietary News Network',
    selectLanguageTitle: 'Select Language / Dil Seçimi / Выберите язык',
    langEn: 'English',
    langAz: 'Azərbaycan',
    langRu: 'Русский',
    langDescEn: 'Default Global Broadcast',
    langDescAz: 'Ana dilində xəbərlər',
    langDescRu: 'Для ТВ бабушки и дедушки',
    categories: {
      all: 'All',
      weather: 'Weather',
      breaking: 'Breaking',
      tech: 'Tech & AI',
      markets: 'Markets',
      world: 'World',
      science: 'Science',
      sports: 'Sports',
      entertainment: 'Entertainment',
    },
    channelsTitle: 'Categories',
    channelHeadlines: 'Channel Headlines',
    rulesBasedSummary: 'Rules-based AI summaries',
    rulesBasedTakeaways: 'Rules-Based AI Summary:',
    detailedReport: 'Detailed Telemetry & Reporting',
    openInFullReader: 'Open In Full Reader',
    backToMenu: 'Back to Menu',
    readAloud: 'Read Aloud [P]',
    readingAloud: 'Reading Aloud...',
    flagSecureActive: 'FLAG_SECURE: ACTIVE',
    pureBlackSaver: '#000000 Pure Black Energy Saver',
    oldTvLite: 'OLD TV (LITE)',
    smartTv4k: 'SMART TV (4K)',
    autoMode: 'AUTO',
    forcedMode: 'FORCED',
    weatherTitle: 'NewsRule Weather Assistant • Baku, Azerbaijan',
    weatherBriefTitle: 'NewsRule Weather Assistant Brief & Clothing Advisory:',
    liveAiWire: 'AI WIRE: SYNCED',
    aiSummarizing: 'AI SUMMARIZING...',
    newsWire: 'NEWS WIRE',
    termsTitle: 'Terms of Service',
    proprietaryPolicy: 'Proprietary Content Policy',
    rateApp: 'Rate on Google Play',
    playReviewTitle: 'Enjoying NewsRule TV?',
    playReviewSubtitle: 'Your feedback helps us optimize broadcasts for all TV sets.',
    playReviewSubmit: 'Submit Review',
    playReviewLater: 'Not Now',
    teletextTitle: 'CEEFAX/TV TEXT',
    broadcastEdition: 'Broadcast Edition • Auto-Adaptive Display Engine',
    liveBroadcast: 'Live Broadcast',
    close: 'Close',
    navHints: {
      navigate: '[▲/▼/◄/►] Navigate',
      open: '[OK] Open',
      mode: '[T] Mode',
      back: '[Esc] Back',
      language: '[L] Language',
    },
    tickerBreaking: 'BREAKING:',
    tickerTech: 'TECH:',
    tickerMarkets: 'MARKETS:',
    tickerPolicy: 'POLICY:',
    tickerItems: {
      breaking: 'Global Energy Summit ratifies Unified Grid Protocol 2030',
      tech: 'Silicon photonics chips shatter bandwidth benchmarks with 3.2 Tbps throughput',
      markets: 'Central bank liquidity adjustments bolster industrial manufacturing indices',
      policy: 'Proprietary Content & Anti-Copying Policy enforced under NewsRule terms',
    },
  },
  az: {
    appName: 'NewsRule',
    tagline: 'Müstəsna Xəbər Şəbəkəsi',
    selectLanguageTitle: 'Select Language / Dil Seçimi / Выберите язык',
    langEn: 'English',
    langAz: 'Azərbaycan',
    langRu: 'Русский',
    langDescEn: 'Qlobal İngilis Yayımı',
    langDescAz: 'Ana dilində xəbərlər',
    langDescRu: 'Nənə və baba televizoru üçün',
    categories: {
      all: 'Hamısı',
      weather: 'Hava',
      breaking: 'Son Xəbər',
      tech: 'Texnologiya & AI',
      markets: 'Bazarlar',
      world: 'Dünya',
      science: 'Elm',
      sports: 'İdman',
      entertainment: 'Mədəniyyət',
    },
    channelsTitle: 'Bölmələr',
    channelHeadlines: 'Kanal Başlıqları',
    rulesBasedSummary: 'Qaydalara əsaslanan AI xülasəsi',
    rulesBasedTakeaways: 'Qaydalara Əsaslanan AI Xülasəsi:',
    detailedReport: 'Ətraflı Telemetriya və Hesabat',
    openInFullReader: 'Tam Məqaləni Oxu',
    backToMenu: 'Menyuya Qayıt',
    readAloud: 'Səsləndir [P]',
    readingAloud: 'Oxunur...',
    flagSecureActive: 'FLAG_SECURE: AKTİV',
    pureBlackSaver: '#000000 Qara Ekran Qənaət Rejimi',
    oldTvLite: 'KÖHNƏ TV (LITE)',
    smartTv4k: 'SMART TV (4K)',
    autoMode: 'AVTO',
    forcedMode: 'MƏCBURİ',
    weatherTitle: 'NewsRule Hava Köməkçisi • Bakı, Azərbaycan',
    weatherBriefTitle: 'NewsRule Hava Köməkçisi Xülasəsi və Geyim Tövsiyəsi:',
    liveAiWire: 'AI XƏTTİ: HAZIR',
    aiSummarizing: 'AI HAZIRLAYIR...',
    newsWire: 'XƏBƏR XƏTTİ',
    termsTitle: 'İstifadə Qaydaları',
    proprietaryPolicy: 'Müstəsna Məzmun Siyasəti',
    rateApp: 'Google Play-də Qiymətləndir',
    playReviewTitle: 'NewsRule TV bəyəndinizmi?',
    playReviewSubtitle: 'Rəyiniz bütün televizorlar üçün yayımı təkmilləşdirməyə kömək edir.',
    playReviewSubmit: 'Rəy Göndər',
    playReviewLater: 'Daha Sonra',
    teletextTitle: 'TELETEKST / CEEFAX',
    broadcastEdition: 'Yayım Nəşri • Avtomatik Uyğunlaşan Ekran Mühərriki',
    liveBroadcast: 'Canlı Yayım',
    close: 'Bağla',
    navHints: {
      navigate: '[▲/▼/◄/►] Hərəkət',
      open: '[OK] Seç',
      mode: '[T] Rejim',
      back: '[Esc] Geri',
      language: '[L] Dil',
    },
    tickerBreaking: 'TƏCİLİ:',
    tickerTech: 'TEXNOLOGİYA:',
    tickerMarkets: 'BAZARLAR:',
    tickerPolicy: 'QAYDALAR:',
    tickerItems: {
      breaking: 'Qlobal Enerji Sammiti Vahid Şəbəkə Protokolu 2030-u təsdiqlədi',
      tech: 'Silisium foton çipləri 3.2 Tbps ötürmə sürəti ilə rekord qırdı',
      markets: 'Mərkəzi bankların likvidlik tənzimləmələri sənaye indekslərini möhkəmləndirdi',
      policy: 'Müstəsna məzmun siyasəti NewsRule şərtlərinə uyğun qorunur',
    },
  },
  ru: {
    appName: 'NewsRule',
    tagline: 'Эксклюзивная сеть новостей',
    selectLanguageTitle: 'Select Language / Dil Seçimi / Выберите язык',
    langEn: 'English',
    langAz: 'Azərbaycan',
    langRu: 'Русский',
    langDescEn: 'Глобальный англоязычный эфир',
    langDescAz: 'Новости на азербайджанском',
    langDescRu: 'Для ТВ бабушки и дедушки',
    categories: {
      all: 'Все',
      weather: 'Погода',
      breaking: 'Срочно',
      tech: 'Технологии & ИИ',
      markets: 'Рынки',
      world: 'В мире',
      science: 'Наука',
      sports: 'Спорт',
      entertainment: 'Культура',
    },
    channelsTitle: 'Категории',
    channelHeadlines: 'Заголовки каналов',
    rulesBasedSummary: 'ИИ-сводки по строгим правилам',
    rulesBasedTakeaways: 'Ключевые пункты ИИ-сводки:',
    detailedReport: 'Подробная телеметрия и отчет',
    openInFullReader: 'Открыть статью целиком',
    backToMenu: 'Назад в меню',
    readAloud: 'Озвучить [P]',
    readingAloud: 'Чтение вслух...',
    flagSecureActive: 'FLAG_SECURE: АКТИВЕН',
    pureBlackSaver: '#000000 Энергосберегающий чёрный экран',
    oldTvLite: 'СТАРЫЙ ТВ (LITE)',
    smartTv4k: 'SMART TV (4K)',
    autoMode: 'АВТО',
    forcedMode: 'ПРИНУДИТЕЛЬНО',
    weatherTitle: 'NewsRule Погодный Ассистент • Баку, Азербайджан',
    weatherBriefTitle: 'Сводка NewsRule и рекомендации по одежде:',
    liveAiWire: 'ИИ-ЛЕНТА: СИНХР.',
    aiSummarizing: 'ИИ ГЕНЕРИРУЕТ...',
    newsWire: 'НОВОСТНАЯ ЛЕНТА',
    termsTitle: 'Условия использования',
    proprietaryPolicy: 'Политика защищённого контента',
    rateApp: 'Оценить в Google Play',
    playReviewTitle: 'Нравится NewsRule TV?',
    playReviewSubtitle: 'Ваш отзыв помогает оптимизировать эфир для телевизоров всех поколений.',
    playReviewSubmit: 'Оценить приложение',
    playReviewLater: 'Позже',
    teletextTitle: 'ТЕЛЕТЕКСТ CEEFAX',
    broadcastEdition: 'Эфирный выпуск • Адаптивный экранный движок',
    liveBroadcast: 'Прямой эфир',
    close: 'Закрыть',
    navHints: {
      navigate: '[▲/▼/◄/►] Навигация',
      open: '[OK] Открыть',
      mode: '[T] Режим',
      back: '[Esc] Назад',
      language: '[L] Язык',
    },
    tickerBreaking: 'СРОЧНО:',
    tickerTech: 'ТЕХНОЛОГИИ:',
    tickerMarkets: 'РЫНКИ:',
    tickerPolicy: 'ПРАВИЛА:',
    tickerItems: {
      breaking: 'Всемирный энергетический саммит утвердил Единый протокол сетей 2030',
      tech: 'Кремниевые фотонные чипы побили рекорды пропускной способности — 3.2 Тбит/с',
      markets: 'Центробанки скорректировали ликвидность в пользу индустриального сектора',
      policy: 'Политика защиты авторского контента активна в эфире NewsRule',
    },
  },
};

const PREFS_NAME = 'NewsRuleSettings';
const KEY_APP_LANG = 'app_lang';

/**
 * Maps category keys to localized category title
 */
export function getLocalizedCategoryName(category: string, lang: AppLanguage): string {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  switch (category) {
    case 'All':
      return t.categories.all;
    case 'Weather':
      return t.categories.weather;
    case 'Breaking':
      return t.categories.breaking;
    case 'Tech & AI':
      return t.categories.tech;
    case 'Markets':
      return t.categories.markets;
    case 'World':
      return t.categories.world;
    case 'Science':
      return t.categories.science;
    case 'Sports':
      return t.categories.sports;
    case 'Entertainment':
      return t.categories.entertainment;
    default:
      return category;
  }
}

/**
 * Port of Android TV OS system language detection:
 * Locale.getDefault().getLanguage()
 * If !prefs.contains("app_lang"), picks system language, defaulting to "en", "az", or "ru".
 */
export function getInitialAppLanguage(): AppLanguage {
  if (typeof window === 'undefined') return 'en';

  try {
    // Check both standard Android SharedPreferences key formats
    const saved =
      (localStorage.getItem(`${PREFS_NAME}_${KEY_APP_LANG}`) as AppLanguage | null) ||
      (localStorage.getItem(KEY_APP_LANG) as AppLanguage | null);

    if (saved === 'en' || saved === 'az' || saved === 'ru') {
      return saved;
    }

    // Read system language directly from Android TV OS / browser
    const systemLanguage = (
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      'en'
    ).toLowerCase();

    let defaultLang: AppLanguage = 'en';
    if (systemLanguage.startsWith('ru')) {
      defaultLang = 'ru';
    } else if (systemLanguage.startsWith('az')) {
      defaultLang = 'az';
    } else {
      defaultLang = 'en';
    }

    // Save initial configuration
    localStorage.setItem(`${PREFS_NAME}_${KEY_APP_LANG}`, defaultLang);
    localStorage.setItem(KEY_APP_LANG, defaultLang);
    return defaultLang;
  } catch {
    return 'en';
  }
}

export function saveAppLanguage(lang: AppLanguage): void {
  try {
    localStorage.setItem(`${PREFS_NAME}_${KEY_APP_LANG}`, lang);
    localStorage.setItem(KEY_APP_LANG, lang);
    // Dispatch cross-component notification
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('newsrule-language-changed', { detail: lang }));
    }
  } catch {
    // Storage fallback
  }
}
