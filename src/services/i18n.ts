import {
  AppLanguage,
  LANGUAGE_CATALOG,
  LanguageOption,
  LanguageRegion,
  TOTAL_SUPPORTED_LANGUAGES
} from './languagesCatalog';

export type { AppLanguage, LanguageOption, LanguageRegion };
export const SUPPORTED_LANGUAGES = LANGUAGE_CATALOG;
export { LANGUAGE_CATALOG, TOTAL_SUPPORTED_LANGUAGES };

export function getLanguageMeta(lang: AppLanguage): LanguageOption {
  return (
    LANGUAGE_CATALOG.find((l) => l.id.toLowerCase() === lang.toLowerCase()) ||
    LANGUAGE_CATALOG[0]
  );
}

export interface Translations {
  appName: string;
  tagline: string;
  selectLanguageTitle: string;
  langDescriptions: Record<string, string>;
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
  refreshForecast: string;
  voiceBrief: string;
  readingForecast: string;
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
  playReviewThanksTitle: string;
  playReviewThanksBody: string;
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
  whiteContrastLabel?: string;
  darkBroadcastLabel?: string;
  burnInSaverLabel?: string;
  headerLiveWire: string;
  headerWeather: string;
  headerTeletext: string;
  headerWhiteTheme: string;
  headerDarkTheme: string;
  headerSaver: string;
  themeHint: string;
  saverHint: string;
  storiesActive: string;
  directFeed: string;
  continuouslySynced: string;
  sourceLabel: string;
  allRightsReserved: string;
  verifiedFeed: string;
  weatherToday: string;
  weatherTomorrow: string;
  weatherSaturday: string;
  weatherCoastalTelemetry: string;
  weatherTrajectory: string;
  weatherHumidity: string;
  weatherStation: string;
  teletextService: string;
  teletextPrevPage: string;
  teletextNextPage: string;
  teletextOpenStory: string;
  teletextExit: string;
  teletextSummaryHeading: string;
  teletextDisclaimer: string;
  screensaverActive: string;
  screensaverWake: string;
  translatingLabel: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  en: {
    appName: 'NewsRule',
    tagline: 'Proprietary News Network',
    selectLanguageTitle: 'Select Language / Dil Seçimi / Выберите язык',
    langDescriptions: {
      en: 'Default Global Broadcast',
      az: 'Ana dilində xəbərlər',
      ru: 'Для ТВ бабушки и дедушки',
      tr: 'Türkçe Küresel Yayın',
      es: 'Transmisión Global en Español',
      fr: 'Diffusion Internationale en Français',
      de: 'Weltweite Deutsche Sendung',
      ar: 'البث الإخباري العالمي بالعربية',
      zh: '全球中文新闻广播',
    },
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
    refreshForecast: 'Refresh [R]',
    voiceBrief: 'Voice [P]',
    readingForecast: 'Reading...',
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
    playReviewThanksTitle: 'Thank You for Your Feedback!',
    playReviewThanksBody: 'Your rating has been registered to the Google Play Store for NewsRule TV.',
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
    headerLiveWire: 'Live Wire',
    headerWeather: 'Weather',
    headerTeletext: 'Teletext',
    headerWhiteTheme: 'White HC',
    headerDarkTheme: 'Dark',
    headerSaver: 'Saver',
    themeHint: 'Theme',
    saverHint: 'Saver',
    storiesActive: 'Stories Active',
    directFeed: 'Direct Feed',
    continuouslySynced: 'Continuously Synchronized',
    sourceLabel: 'Source',
    allRightsReserved: 'All rights reserved',
    verifiedFeed: 'NewsRule Verified Broadcast Feed',
    weatherToday: 'TODAY',
    weatherTomorrow: 'TOMORROW',
    weatherSaturday: 'SATURDAY',
    weatherCoastalTelemetry: 'Real-time Coastal Telemetry',
    weatherTrajectory: 'Absheron 3-Day Coastal Trajectory',
    weatherHumidity: 'Humidity',
    weatherStation: 'Caspian Sea Basin Telemetry • Absheron Automatic Station',
    teletextService: 'NEWSRULE BROADCAST TEXT SERVICE • CHANNEL',
    teletextPrevPage: 'PREV PAGE',
    teletextNextPage: 'NEXT PAGE',
    teletextOpenStory: 'OPEN STORY',
    teletextExit: 'EXIT TO TV',
    teletextSummaryHeading: 'AI SUMMARY BULLET POINTS (PROPRIETARY)',
    teletextDisclaimer: 'NEWSRULE CEEFAX BROADCAST • PROTECTED UNDER TERMS OF SERVICE • NO DUPLICATION',
    screensaverActive: 'Burn-In Pixel-Shift Active',
    screensaverWake: 'Press any TV remote key or move pointer to resume',
    translatingLabel: 'Syncing language...',
  },
  az: {
    appName: 'NewsRule',
    tagline: 'Müstəsna Xəbər Şəbəkəsi',
    selectLanguageTitle: 'Dil Seçimi / Select Language',
    langDescriptions: {
      en: 'Qlobal İngilis Yayımı',
      az: 'Ana dilində xəbərlər',
      ru: 'Nənə və baba televizoru üçün',
      tr: 'Türkiyə və Qlobal Yayım',
      es: 'İspan dilində yayım',
      fr: 'Fransız dilində yayım',
      de: 'Alman dilində yayım',
      ar: 'Ərəb dilində yayım',
      zh: 'Çin dilində yayım',
    },
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
    refreshForecast: 'Yenilə [R]',
    voiceBrief: 'Səsləndir [P]',
    readingForecast: 'Oxunur...',
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
    playReviewThanksTitle: 'Rəyiniz üçün təşəkkür edirik!',
    playReviewThanksBody: 'Qiymətiniz NewsRule TV üçün Google Play-ə qeyd olundu.',
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
    headerLiveWire: 'Canlı Xətt',
    headerWeather: 'Hava',
    headerTeletext: 'Teletekst',
    headerWhiteTheme: 'Ağ Rejim',
    headerDarkTheme: 'Tünd',
    headerSaver: 'Qoruyucu',
    themeHint: 'Tema',
    saverHint: 'Ekran qoruyucu',
    storiesActive: 'Aktiv Xəbər',
    directFeed: 'Birbaşa Axın',
    continuouslySynced: 'Fasiləsiz Sinxronizasiya',
    sourceLabel: 'Mənbə',
    allRightsReserved: 'Bütün hüquqlar qorunur',
    verifiedFeed: 'NewsRule Təsdiqlənmiş Yayım Xətti',
    weatherToday: 'BU GÜN',
    weatherTomorrow: 'SABAH',
    weatherSaturday: 'ŞƏNBƏ',
    weatherCoastalTelemetry: 'Real Vaxt Sahil Telemetriyası',
    weatherTrajectory: 'Abşeron 3 Günlük Sahil Proqnozu',
    weatherHumidity: 'Rütubət',
    weatherStation: 'Xəzər Dənizi Hövzəsi Telemetriyası • Abşeron Avtomatik Stansiyası',
    teletextService: 'NEWSRULE YAYIM MƏTN XİDMƏTİ • KANAL',
    teletextPrevPage: 'ƏVVƏLKİ SƏHİFƏ',
    teletextNextPage: 'NÖVBƏTİ SƏHİFƏ',
    teletextOpenStory: 'XƏBƏRİ AÇ',
    teletextExit: 'TV-YƏ QAYIT',
    teletextSummaryHeading: 'AI XÜLASƏ BƏNDLƏRİ (MÜSTƏSNA)',
    teletextDisclaimer: 'NEWSRULE TELETEKST YAYIMI • İSTİFADƏ ŞƏRTLƏRİ İLƏ QORUNUR',
    screensaverActive: 'Ekran Yanmasına Qarşı Qoruma Aktivdir',
    screensaverWake: 'Davam etmək üçün pultda istənilən düyməni basın',
    translatingLabel: 'Dil yüklənir...',
  },
  ru: {
    appName: 'NewsRule',
    tagline: 'Эксклюзивная сеть новостей',
    selectLanguageTitle: 'Выберите язык / Select Language',
    langDescriptions: {
      en: 'Глобальный англоязычный эфир',
      az: 'Новости на азербайджанском',
      ru: 'Для ТВ бабушки и дедушки',
      tr: 'Эфир на турецком языке',
      es: 'Эфир на испанском языке',
      fr: 'Эфир на французском языке',
      de: 'Эфир на немецком языке',
      ar: 'Эфир на арабском языке',
      zh: 'Эфир на китайском языке',
    },
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
    refreshForecast: 'Обновить [R]',
    voiceBrief: 'Озвучить [P]',
    readingForecast: 'Озвучивается...',
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
    playReviewThanksTitle: 'Спасибо за отзыв!',
    playReviewThanksBody: 'Ваша оценка отправлена в Google Play для NewsRule TV.',
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
    headerLiveWire: 'Прямой эфир',
    headerWeather: 'Погода',
    headerTeletext: 'Телетекст',
    headerWhiteTheme: 'Светлая тема',
    headerDarkTheme: 'Тёмная',
    headerSaver: 'Заставка',
    themeHint: 'Тема',
    saverHint: 'Заставка',
    storiesActive: 'материалов в эфире',
    directFeed: 'Прямая лента',
    continuouslySynced: 'Постоянная синхронизация',
    sourceLabel: 'Источник',
    allRightsReserved: 'Все права защищены',
    verifiedFeed: 'Проверенный эфир NewsRule',
    weatherToday: 'СЕГОДНЯ',
    weatherTomorrow: 'ЗАВТРА',
    weatherSaturday: 'СУББОТА',
    weatherCoastalTelemetry: 'Прибрежная телеметрия в реальном времени',
    weatherTrajectory: 'Прогноз по Апшерону на 3 дня',
    weatherHumidity: 'Влажность',
    weatherStation: 'Телеметрия Каспийского бассейна • Станция Апшерон',
    teletextService: 'ТЕКСТОВАЯ СЛУЖБА NEWSRULE • КАНАЛ',
    teletextPrevPage: 'ПРЕД. СТР.',
    teletextNextPage: 'СЛЕД. СТР.',
    teletextOpenStory: 'ОТКРЫТЬ',
    teletextExit: 'ВЫХОД НА ТВ',
    teletextSummaryHeading: 'КЛЮЧЕВЫЕ ПУНКТЫ ИИ-СВОДКИ',
    teletextDisclaimer: 'ЭФИР NEWSRULE ТЕЛЕТЕКСТ • ЗАЩИЩЕНО ПРАВИЛАМИ СЕРВИСА',
    screensaverActive: 'Защита экрана от выгорания активна',
    screensaverWake: 'Нажмите любую кнопку пульта для возврата',
    translatingLabel: 'Перевод интерфейса...',
  },
  tr: {
    appName: 'NewsRule',
    tagline: 'Özel Haber Ağı',
    selectLanguageTitle: 'Dil Seçimi / Select Language',
    langDescriptions: {
      en: 'Küresel İngilizce Yayın',
      az: 'Azerbaycan Türkçesi Yayını',
      ru: 'Rusça TV Yayını',
      tr: 'Türkçe Haber Yayını',
      es: 'İspanyolca Yayın',
      fr: 'Fransızca Yayın',
      de: 'Almanca Yayın',
      ar: 'Arapça Yayın',
      zh: 'Çince Yayın',
    },
    categories: {
      all: 'Tümü',
      weather: 'Hava Durumu',
      breaking: 'Son Dakika',
      tech: 'Teknoloji & YZ',
      markets: 'Piyasalar',
      world: 'Dünya',
      science: 'Bilim',
      sports: 'Spor',
      entertainment: 'Kültür',
    },
    channelsTitle: 'Kategoriler',
    channelHeadlines: 'Kanal Başlıkları',
    rulesBasedSummary: 'Kural tabanlı yapay zekâ özetleri',
    rulesBasedTakeaways: 'Yapay Zekâ Özeti:',
    detailedReport: 'Ayrıntılı Telemetri ve Rapor',
    openInFullReader: 'Tam Haberi Aç',
    backToMenu: 'Menüye Dön',
    readAloud: 'Sesli Oku [P]',
    readingAloud: 'Seslendiriliyor...',
    refreshForecast: 'Yenile [R]',
    voiceBrief: 'Sesli [P]',
    readingForecast: 'Okunuyor...',
    flagSecureActive: 'FLAG_SECURE: ETKİN',
    pureBlackSaver: '#000000 Saf Siyah Enerji Tasarrufu',
    oldTvLite: 'ESKİ TV (LITE)',
    smartTv4k: 'SMART TV (4K)',
    autoMode: 'OTO',
    forcedMode: 'ZORUNLU',
    weatherTitle: 'NewsRule Hava Asistanı • Bakü, Azerbaycan',
    weatherBriefTitle: 'NewsRule Hava Durumu Özeti ve Giyim Önerisi:',
    liveAiWire: 'YZ HATTI: HAZIR',
    aiSummarizing: 'YZ ÖZETLİYOR...',
    newsWire: 'HABER HATTI',
    termsTitle: 'Kullanım Koşulları',
    proprietaryPolicy: 'Özel İçerik Politikası',
    rateApp: 'Google Play’de Değerlendir',
    playReviewTitle: 'NewsRule TV’yi beğendiniz mi?',
    playReviewSubtitle: 'Geri bildiriminiz tüm televizyonlar için yayını geliştirmemize yardımcı olur.',
    playReviewSubmit: 'Değerlendir',
    playReviewLater: 'Şimdi Değil',
    playReviewThanksTitle: 'Geri Bildiriminiz İçin Teşekkürler!',
    playReviewThanksBody: 'Puanınız NewsRule TV için Google Play Store’a kaydedildi.',
    teletextTitle: 'TELETEKST / CEEFAX',
    broadcastEdition: 'Yayın Sürümü • Uyarlanabilir Ekran Motoru',
    liveBroadcast: 'Canlı Yayın',
    close: 'Kapat',
    navHints: {
      navigate: '[▲/▼/◄/►] Gezin',
      open: '[OK] Aç',
      mode: '[T] Mod',
      back: '[Esc] Geri',
      language: '[L] Dil',
    },
    tickerBreaking: 'SON DAKİKA:',
    tickerTech: 'TEKNOLOJİ:',
    tickerMarkets: 'PİYASALAR:',
    tickerPolicy: 'POLİTİKA:',
    tickerItems: {
      breaking: 'Küresel Enerji Zirvesi 2030 Birleşik Şebeke Protokolünü onayladı',
      tech: 'Silikon fotonik yongalar 3.2 Tbps bant genişliği rekorunu kırdı',
      markets: 'Merkez bankası likidite adımları sanayi endekslerini güçlendirdi',
      policy: 'Özel içerik ve kopyalama koruması NewsRule şartlarıyla aktif',
    },
    headerLiveWire: 'Canlı Akış',
    headerWeather: 'Hava',
    headerTeletext: 'Teletekst',
    headerWhiteTheme: 'Açık Tema',
    headerDarkTheme: 'Koyu',
    headerSaver: 'Koruyucu',
    themeHint: 'Tema',
    saverHint: 'Koruyucu',
    storiesActive: 'Aktif Haber',
    directFeed: 'Doğrudan Akış',
    continuouslySynced: 'Sürekli Senkronize',
    sourceLabel: 'Kaynak',
    allRightsReserved: 'Tüm hakları saklıdır',
    verifiedFeed: 'NewsRule Doğrulanmış Yayın Akışı',
    weatherToday: 'BUGÜN',
    weatherTomorrow: 'YARIN',
    weatherSaturday: 'CUMARTESİ',
    weatherCoastalTelemetry: 'Gerçek Zamanlı Kıyı Telemetrisi',
    weatherTrajectory: 'Abşeron 3 Günlük Kıyı Tahmini',
    weatherHumidity: 'Nem',
    weatherStation: 'Hazar Denizi Havzası Telemetrisi • Abşeron Otomatik İstasyonu',
    teletextService: 'NEWSRULE YAYIN METİN SERVİSİ • KANAL',
    teletextPrevPage: 'ÖNCEKİ SAYFA',
    teletextNextPage: 'SONRAKİ SAYFA',
    teletextOpenStory: 'HABERİ AÇ',
    teletextExit: 'TV’YE DÖN',
    teletextSummaryHeading: 'YAPAY ZEKÂ ÖZET MADDELERİ',
    teletextDisclaimer: 'NEWSRULE TELETEKST YAYINI • HİZMET KOŞULLARI İLE KORUNMAKTADIR',
    screensaverActive: 'Ekran Yanma Koruması Etkin',
    screensaverWake: 'Devam etmek için kumandadan herhangi bir tuşa basın',
    translatingLabel: 'Dil yükleniyor...',
  },
  es: {
    appName: 'NewsRule',
    tagline: 'Red de Noticias Exclusiva',
    selectLanguageTitle: 'Seleccionar Idioma / Select Language',
    langDescriptions: {
      en: 'Emisión Global en Inglés',
      az: 'Noticias en Azerbaiyano',
      ru: 'Noticias en Ruso',
      tr: 'Noticias en Turco',
      es: 'Emisión Internacional en Español',
      fr: 'Emisión en Francés',
      de: 'Emisión en Alemán',
      ar: 'Emisión en Árabe',
      zh: 'Emisión en Chino',
    },
    categories: {
      all: 'Todo',
      weather: 'Clima',
      breaking: 'Última Hora',
      tech: 'Tecnología e IA',
      markets: 'Mercados',
      world: 'Mundo',
      science: 'Ciencia',
      sports: 'Deportes',
      entertainment: 'Cultura',
    },
    channelsTitle: 'Categorías',
    channelHeadlines: 'Titulares del Canal',
    rulesBasedSummary: 'Resúmenes de IA basados en reglas',
    rulesBasedTakeaways: 'Resumen de IA:',
    detailedReport: 'Telemetría e Informe Detallado',
    openInFullReader: 'Abrir Artículo Completo',
    backToMenu: 'Volver al Menú',
    readAloud: 'Leer en Voz Alta [P]',
    readingAloud: 'Leyendo...',
    refreshForecast: 'Actualizar [R]',
    voiceBrief: 'Voz [P]',
    readingForecast: 'Leyendo...',
    flagSecureActive: 'FLAG_SECURE: ACTIVO',
    pureBlackSaver: '#000000 Ahorro de Energía Negro Puro',
    oldTvLite: 'TV ANTIGUO (LITE)',
    smartTv4k: 'SMART TV (4K)',
    autoMode: 'AUTO',
    forcedMode: 'FORZADO',
    weatherTitle: 'Asistente Meteorológico NewsRule • Bakú, Azerbaiyán',
    weatherBriefTitle: 'Resumen Meteorológico y Recomendación de Vestimenta:',
    liveAiWire: 'RED IA: SINCRONIZADA',
    aiSummarizing: 'RESUMIENDO...',
    newsWire: 'ÚLTIMAS NOTICIAS',
    termsTitle: 'Términos de Servicio',
    proprietaryPolicy: 'Política de Contenido Exclusivo',
    rateApp: 'Calificar en Google Play',
    playReviewTitle: '¿Disfrutas de NewsRule TV?',
    playReviewSubtitle: 'Tu opinión nos ayuda a optimizar la emisión para todos los televisores.',
    playReviewSubmit: 'Enviar Reseña',
    playReviewLater: 'Ahora No',
    playReviewThanksTitle: '¡Gracias por tu comentario!',
    playReviewThanksBody: 'Tu calificación se ha registrado en Google Play Store para NewsRule TV.',
    teletextTitle: 'TELETEXTO / CEEFAX',
    broadcastEdition: 'Edición de Emisión • Motor de Pantalla Adaptativo',
    liveBroadcast: 'En Vivo',
    close: 'Cerrar',
    navHints: {
      navigate: '[▲/▼/◄/►] Navegar',
      open: '[OK] Abrir',
      mode: '[T] Modo',
      back: '[Esc] Atrás',
      language: '[L] Idioma',
    },
    tickerBreaking: 'URGENTE:',
    tickerTech: 'TECNOLOGÍA:',
    tickerMarkets: 'MERCADOS:',
    tickerPolicy: 'POLÍTICA:',
    tickerItems: {
      breaking: 'La Cumbre Energética Global ratifica el Protocolo de Red Unificada 2030',
      tech: 'Los chips de fotónica de silicio alcanzan 3.2 Tbps de ancho de banda',
      markets: 'Ajustes de liquidez de bancos centrales impulsan los índices industriales',
      policy: 'Política de contenido exclusivo y anticopia activa en NewsRule',
    },
    headerLiveWire: 'En Vivo',
    headerWeather: 'Clima',
    headerTeletext: 'Teletexto',
    headerWhiteTheme: 'Tema Claro',
    headerDarkTheme: 'Oscuro',
    headerSaver: 'Protector',
    themeHint: 'Tema',
    saverHint: 'Protector',
    storiesActive: 'Historias Activas',
    directFeed: 'Señal Directa',
    continuouslySynced: 'Sincronización Continua',
    sourceLabel: 'Fuente',
    allRightsReserved: 'Todos los derechos reservados',
    verifiedFeed: 'Transmisión Verificada NewsRule',
    weatherToday: 'HOY',
    weatherTomorrow: 'MAÑANA',
    weatherSaturday: 'SÁBADO',
    weatherCoastalTelemetry: 'Telemetría Costera en Tiempo Real',
    weatherTrajectory: 'Pronóstico Costero de 3 Días en Absheron',
    weatherHumidity: 'Humedad',
    weatherStation: 'Telemetría del Mar Caspio • Estación Automática Absheron',
    teletextService: 'SERVICIO DE TEXTO NEWSRULE • CANAL',
    teletextPrevPage: 'PÁG. ANTERIOR',
    teletextNextPage: 'SIGUIENTE PÁG.',
    teletextOpenStory: 'ABRIR NOTICIA',
    teletextExit: 'VOLVER A TV',
    teletextSummaryHeading: 'PUNTOS CLAVE DEL RESUMEN IA',
    teletextDisclaimer: 'EMISIÓN TELETEXTO NEWSRULE • PROTEGIDO POR TÉRMINOS DE SERVICIO',
    screensaverActive: 'Protección Anti-Quemado Activa',
    screensaverWake: 'Pulsa cualquier tecla del mando para reanudar',
    translatingLabel: 'Sincronizando idioma...',
  },
  fr: {
    appName: 'NewsRule',
    tagline: 'Réseau d’Information Exclusif',
    selectLanguageTitle: 'Choisir la langue / Select Language',
    langDescriptions: {
      en: 'Diffusion Globale en Anglais',
      az: 'Actualités en Azerbaïdjanais',
      ru: 'Actualités en Russe',
      tr: 'Actualités en Turc',
      es: 'Actualités en Espagnol',
      fr: 'Édition Internationale en Français',
      de: 'Actualités en Allemand',
      ar: 'Actualités en Arabe',
      zh: 'Actualités en Chinois',
    },
    categories: {
      all: 'Tout',
      weather: 'Météo',
      breaking: 'Flash Info',
      tech: 'Tech & IA',
      markets: 'Marchés',
      world: 'Monde',
      science: 'Science',
      sports: 'Sports',
      entertainment: 'Culture',
    },
    channelsTitle: 'Catégories',
    channelHeadlines: 'Titres de la Chaîne',
    rulesBasedSummary: 'Résumés IA basés sur des règles',
    rulesBasedTakeaways: 'Points Clés IA :',
    detailedReport: 'Télémétrie et Rapport Détaillé',
    openInFullReader: 'Lire l’Article Complet',
    backToMenu: 'Retour au Menu',
    readAloud: 'Lire à Voix Haute [P]',
    readingAloud: 'Lecture en cours...',
    refreshForecast: 'Actualiser [R]',
    voiceBrief: 'Voix [P]',
    readingForecast: 'Lecture...',
    flagSecureActive: 'FLAG_SECURE : ACTIF',
    pureBlackSaver: '#000000 Économie d’Énergie Noir Pur',
    oldTvLite: 'ANCIENNE TV (LITE)',
    smartTv4k: 'SMART TV (4K)',
    autoMode: 'AUTO',
    forcedMode: 'FORCÉ',
    weatherTitle: 'Assistant Météo NewsRule • Bakou, Azerbaïdjan',
    weatherBriefTitle: 'Bulletin Météo et Conseil Vestimentaire :',
    liveAiWire: 'FIL IA : SYNCHRONISÉ',
    aiSummarizing: 'RÉSUMÉ IA...',
    newsWire: 'FIL D’INFO',
    termsTitle: 'Conditions d’Utilisation',
    proprietaryPolicy: 'Politique de Contenu Exclusif',
    rateApp: 'Noter sur Google Play',
    playReviewTitle: 'Vous appréciez NewsRule TV ?',
    playReviewSubtitle: 'Votre avis nous aide à optimiser la diffusion pour tous les téléviseurs.',
    playReviewSubmit: 'Envoyer l’avis',
    playReviewLater: 'Plus tard',
    playReviewThanksTitle: 'Merci pour votre retour !',
    playReviewThanksBody: 'Votre note a été enregistrée sur Google Play Store pour NewsRule TV.',
    teletextTitle: 'TÉLÉTEXTE / CEEFAX',
    broadcastEdition: 'Édition TV • Moteur d’Affichage Adaptatif',
    liveBroadcast: 'En Direct',
    close: 'Fermer',
    navHints: {
      navigate: '[▲/▼/◄/►] Naviguer',
      open: '[OK] Ouvrir',
      mode: '[T] Mode',
      back: '[Esc] Retour',
      language: '[L] Langue',
    },
    tickerBreaking: 'FLASH :',
    tickerTech: 'TECH :',
    tickerMarkets: 'MARCHÉS :',
    tickerPolicy: 'RÈGLES :',
    tickerItems: {
      breaking: 'Le Sommet Mondial de l’Énergie ratifie le Protocole de Réseau Unifié 2030',
      tech: 'Les puces photoniques sur silicium atteignent 3,2 Tbps de débit',
      markets: 'Les ajustements de liquidité des banques centrales soutiennent l’industrie',
      policy: 'Protection du contenu exclusif appliquée selon les règles NewsRule',
    },
    headerLiveWire: 'En Direct',
    headerWeather: 'Météo',
    headerTeletext: 'Télétexte',
    headerWhiteTheme: 'Thème Clair',
    headerDarkTheme: 'Sombre',
    headerSaver: 'Écran de veille',
    themeHint: 'Thème',
    saverHint: 'Veille',
    storiesActive: 'Articles Actifs',
    directFeed: 'Flux Direct',
    continuouslySynced: 'Synchronisé en Continu',
    sourceLabel: 'Source',
    allRightsReserved: 'Tous droits réservés',
    verifiedFeed: 'Flux Vérifié NewsRule',
    weatherToday: 'AUJOURD’HUI',
    weatherTomorrow: 'DEMAIN',
    weatherSaturday: 'SAMEDI',
    weatherCoastalTelemetry: 'Télémétrie Côtière en Temps Réel',
    weatherTrajectory: 'Prévisions Côtières sur 3 Jours',
    weatherHumidity: 'Humidité',
    weatherStation: 'Télémétrie de la Mer Caspienne • Station Absheron',
    teletextService: 'SERVICE TÉLÉTEXTE NEWSRULE • CHAÎNE',
    teletextPrevPage: 'PAGE PRÉC.',
    teletextNextPage: 'PAGE SUIV.',
    teletextOpenStory: 'LIRE L’ARTICLE',
    teletextExit: 'QUITTER',
    teletextSummaryHeading: 'POINTS CLÉS IA (EXCLUSIF)',
    teletextDisclaimer: 'DIFFUSION TÉLÉTEXTE NEWSRULE • CONTENU PROTÉGÉ',
    screensaverActive: 'Protection Anti-Marquage Active',
    screensaverWake: 'Appuyez sur une touche pour reprendre la diffusion',
    translatingLabel: 'Chargement de la langue...',
  },
  de: {
    appName: 'NewsRule',
    tagline: 'Exklusives Nachrichtennetzwerk',
    selectLanguageTitle: 'Sprache wählen / Select Language',
    langDescriptions: {
      en: 'Globale Sendung auf Englisch',
      az: 'Nachrichten auf Aserbaidschanisch',
      ru: 'Nachrichten auf Russisch',
      tr: 'Nachrichten auf Türkisch',
      es: 'Nachrichten auf Spanisch',
      fr: 'Nachrichten auf Französisch',
      de: 'Weltweite Deutsche Sendung',
      ar: 'Nachrichten auf Arabisch',
      zh: 'Nachrichten auf Chinesisch',
    },
    categories: {
      all: 'Alle',
      weather: 'Wetter',
      breaking: 'Eilmeldung',
      tech: 'Tech & KI',
      markets: 'Märkte',
      world: 'Welt',
      science: 'Wissenschaft',
      sports: 'Sport',
      entertainment: 'Kultur',
    },
    channelsTitle: 'Kategorien',
    channelHeadlines: 'Kanalschlagzeilen',
    rulesBasedSummary: 'Regelbasierte KI-Zusammenfassungen',
    rulesBasedTakeaways: 'KI-Zusammenfassung:',
    detailedReport: 'Detaillierte Telemetrie & Bericht',
    openInFullReader: 'Vollständigen Artikel öffnen',
    backToMenu: 'Zurück zum Menü',
    readAloud: 'Vorlesen [P]',
    readingAloud: 'Wird vorgelesen...',
    refreshForecast: 'Aktualisieren [R]',
    voiceBrief: 'Stimme [P]',
    readingForecast: 'Liest...',
    flagSecureActive: 'FLAG_SECURE: AKTIV',
    pureBlackSaver: '#000000 Reiner Schwarz-Energiesparmodus',
    oldTvLite: 'ALTER TV (LITE)',
    smartTv4k: 'SMART TV (4K)',
    autoMode: 'AUTO',
    forcedMode: 'ERZWUNGEN',
    weatherTitle: 'NewsRule Wetterassistent • Baku, Aserbaidschan',
    weatherBriefTitle: 'Wetterbericht & Kleidungsempfehlung:',
    liveAiWire: 'KI-TICKER: AKTIV',
    aiSummarizing: 'KI FASST ZUSAMMEN...',
    newsWire: 'NACHRICHTENTICKER',
    termsTitle: 'Nutzungsbedingungen',
    proprietaryPolicy: 'Richtlinie für geschützte Inhalte',
    rateApp: 'Auf Google Play bewerten',
    playReviewTitle: 'Gefällt Ihnen NewsRule TV?',
    playReviewSubtitle: 'Ihr Feedback hilft uns, die Übertragung für alle Fernseher zu optimieren.',
    playReviewSubmit: 'Bewertung senden',
    playReviewLater: 'Später',
    playReviewThanksTitle: 'Vielen Dank für Ihr Feedback!',
    playReviewThanksBody: 'Ihre Bewertung wurde im Google Play Store für NewsRule TV gespeichert.',
    teletextTitle: 'VIDEOTEXT / CEEFAX',
    broadcastEdition: 'Sendeausgabe • Adaptive Display-Engine',
    liveBroadcast: 'Live-Sendung',
    close: 'Schließen',
    navHints: {
      navigate: '[▲/▼/◄/►] Navigieren',
      open: '[OK] Öffnen',
      mode: '[T] Modus',
      back: '[Esc] Zurück',
      language: '[L] Sprache',
    },
    tickerBreaking: 'EIL:',
    tickerTech: 'TECH:',
    tickerMarkets: 'MÄRKTE:',
    tickerPolicy: 'SCHUTZ:',
    tickerItems: {
      breaking: 'Welt-Energiegipfel ratifiziert das Unified Grid Protokoll 2030',
      tech: 'Silizium-Photonik-Chips erreichen Rekordbandbreite von 3,2 Tbps',
      markets: 'Liquiditätsanpassungen der Zentralbanken stärken Industrieindizes',
      policy: 'Kopierschutz und exklusive Inhaltsrichtlinie unter NewsRule aktiv',
    },
    headerLiveWire: 'Live-Ticker',
    headerWeather: 'Wetter',
    headerTeletext: 'Videotext',
    headerWhiteTheme: 'Helles Design',
    headerDarkTheme: 'Dunkel',
    headerSaver: 'Schoner',
    themeHint: 'Design',
    saverHint: 'Schoner',
    storiesActive: 'Aktive Meldungen',
    directFeed: 'Direktfeed',
    continuouslySynced: 'Laufend synchronisiert',
    sourceLabel: 'Quelle',
    allRightsReserved: 'Alle Rechte vorbehalten',
    verifiedFeed: 'Verifizierter NewsRule-Sendestream',
    weatherToday: 'HEUTE',
    weatherTomorrow: 'MORGEN',
    weatherSaturday: 'SAMSTAG',
    weatherCoastalTelemetry: 'Küsten-Telemetrie in Echtzeit',
    weatherTrajectory: 'Absheron 3-Tage-Küstenprognose',
    weatherHumidity: 'Luftfeuchtigkeit',
    weatherStation: 'Telemetrie Kaspisches Meer • Automatische Station Absheron',
    teletextService: 'NEWSRULE VIDEOTEXT-DIENST • KANAL',
    teletextPrevPage: 'VORHERIGE SEITE',
    teletextNextPage: 'NÄCHSTE SEITE',
    teletextOpenStory: 'ARTIKEL ÖFFNEN',
    teletextExit: 'ZUM TV',
    teletextSummaryHeading: 'KI-ZUSAMMENFASSUNG (EXKLUSIV)',
    teletextDisclaimer: 'NEWSRULE VIDEOTEXT • URHEBERRECHTLICH GESCHÜTZT',
    screensaverActive: 'Einbrennschutz durch Pixel-Shift aktiv',
    screensaverWake: 'Beliebige Taste drücken, um fortzufahren',
    translatingLabel: 'Sprache wird geladen...',
  },
  ar: {
    appName: 'NewsRule',
    tagline: 'شبكة الأخبار الحصرية',
    selectLanguageTitle: 'اختر اللغة / Select Language',
    langDescriptions: {
      en: 'البث العالمي بالإنجليزية',
      az: 'الأخبار بالأذربيجانية',
      ru: 'الأخبار بالروسية',
      tr: 'الأخبار بالتركية',
      es: 'الأخبار بالإسبانية',
      fr: 'الأخبار بالفرنسية',
      de: 'الأخبار بالألمانية',
      ar: 'البث الإخباري العالمي بالعربية',
      zh: 'الأخبار بالصينية',
    },
    categories: {
      all: 'الكل',
      weather: 'الطقس',
      breaking: 'عاجل',
      tech: 'التقنية والذكاء',
      markets: 'الأسواق',
      world: 'العالم',
      science: 'العلوم',
      sports: 'الرياضة',
      entertainment: 'الثقافة',
    },
    channelsTitle: 'التصنيفات',
    channelHeadlines: 'عناوين القناة',
    rulesBasedSummary: 'ملخصات ذكاء اصطناعي قائمة على القواعد',
    rulesBasedTakeaways: 'ملخص الذكاء الاصطناعي:',
    detailedReport: 'التقرير التفصيلي والقياسات',
    openInFullReader: 'فتح المقال كاملاً',
    backToMenu: 'العودة للقائمة',
    readAloud: 'قراءة صوتية [P]',
    readingAloud: 'جاري القراءة...',
    refreshForecast: 'تحديث [R]',
    voiceBrief: 'صوت [P]',
    readingForecast: 'جاري القراءة...',
    flagSecureActive: 'FLAG_SECURE: نشط',
    pureBlackSaver: '#000000 موفر الطاقة الأسود النقي',
    oldTvLite: 'تلفاز قديم (LITE)',
    smartTv4k: 'تلفاز ذكي (4K)',
    autoMode: 'تلقائي',
    forcedMode: 'يدوي',
    weatherTitle: 'مساعد الطقس NewsRule • باكو، أذربيجان',
    weatherBriefTitle: 'موجز الطقس ونصائح الملابس:',
    liveAiWire: 'شريط الذكاء: متصل',
    aiSummarizing: 'جاري التلخيص...',
    newsWire: 'الشريط الإخباري',
    termsTitle: 'شروط الخدمة',
    proprietaryPolicy: 'سياسة المحتوى الحصري',
    rateApp: 'قيّم على Google Play',
    playReviewTitle: 'هل تستمتع بـ NewsRule TV؟',
    playReviewSubtitle: 'ملاحظاتك تساعدنا على تحسين البث لجميع أجهزة التلفاز.',
    playReviewSubmit: 'إرسال التقييم',
    playReviewLater: 'ليس الآن',
    playReviewThanksTitle: 'شكراً لملاحظاتك!',
    playReviewThanksBody: 'تم تسجيل تقييمك في متجر Google Play لتطبيق NewsRule TV.',
    teletextTitle: 'تيليتكست / CEEFAX',
    broadcastEdition: 'نسخة البث • محرك عرض متكيف تلقائياً',
    liveBroadcast: 'بث مباشر',
    close: 'إغلاق',
    navHints: {
      navigate: '[▲/▼/◄/►] تنقل',
      open: '[OK] فتح',
      mode: '[T] الوضع',
      back: '[Esc] رجوع',
      language: '[L] اللغة',
    },
    tickerBreaking: 'عاجل:',
    tickerTech: 'تقنية:',
    tickerMarkets: 'أسواق:',
    tickerPolicy: 'سياسة:',
    tickerItems: {
      breaking: 'قمة الطاقة العالمية تصادق على بروتوكول الشبكة الموحدة 2030',
      tech: 'رقائق الفوتونيات السيليكونية تحقق سرعة قياسية تبلغ 3.2 تيرابت/ثانية',
      markets: 'تعديلات السيولة من البنوك المركزية تعزز مؤشرات التصنيع الصناعي',
      policy: 'سياسة المحتوى الحصري ومنع النسخ مفعلة بموجب شروط NewsRule',
    },
    headerLiveWire: 'البث المباشر',
    headerWeather: 'الطقس',
    headerTeletext: 'تيليتكست',
    headerWhiteTheme: 'الوضع الفاتح',
    headerDarkTheme: 'الداكن',
    headerSaver: 'شاشة التوقف',
    themeHint: 'المظهر',
    saverHint: 'التوقف',
    storiesActive: 'أخبار نشطة',
    directFeed: 'البث المباشر للأخبار',
    continuouslySynced: 'مزامنة مستمرة',
    sourceLabel: 'المصدر',
    allRightsReserved: 'جميع الحقوق محفوظة',
    verifiedFeed: 'بث NewsRule الموثق',
    weatherToday: 'اليوم',
    weatherTomorrow: 'غداً',
    weatherSaturday: 'السبت',
    weatherCoastalTelemetry: 'قياسات ساحلية مباشرة',
    weatherTrajectory: 'توقعات الساحل لـ 3 أيام في أبشيرون',
    weatherHumidity: 'الرطوبة',
    weatherStation: 'قياسات حوض بحر قزوين • محطة أبشيرون الآلية',
    teletextService: 'خدمة النصوص الإخبارية NEWSRULE • قناة',
    teletextPrevPage: 'الصفحة السابقة',
    teletextNextPage: 'الصفحة التالية',
    teletextOpenStory: 'فتح الخبر',
    teletextExit: 'العودة للتلفاز',
    teletextSummaryHeading: 'نقاط ملخص الذكاء الاصطناعي',
    teletextDisclaimer: 'بث تيليتكست NEWSRULE • محمي بموجب شروط الخدمة',
    screensaverActive: 'حماية الشاشة من الاحتراق نشطة',
    screensaverWake: 'اضغط أي زر في جهاز التحكم للمتابعة',
    translatingLabel: 'جاري مزامنة اللغة...',
  },
  zh: {
    appName: 'NewsRule',
    tagline: '专有智能新闻电视网',
    selectLanguageTitle: '选择语言 / Select Language',
    langDescriptions: {
      en: '全球英语新闻广播',
      az: '阿塞拜疆语新闻',
      ru: '俄语电视新闻',
      tr: '土耳其语新闻',
      es: '西班牙语新闻',
      fr: '法语新闻',
      de: '德语新闻',
      ar: '阿拉伯语新闻',
      zh: '全球中文新闻广播',
    },
    categories: {
      all: '全部',
      weather: '天气',
      breaking: '突发',
      tech: '科技与AI',
      markets: '市场',
      world: '国际',
      science: '科学',
      sports: '体育',
      entertainment: '文化',
    },
    channelsTitle: '频道分类',
    channelHeadlines: '频道头条',
    rulesBasedSummary: '基于规则的 AI 摘要',
    rulesBasedTakeaways: 'AI 核心摘要：',
    detailedReport: '详细遥测与深度报道',
    openInFullReader: '打开完整阅读',
    backToMenu: '返回菜单',
    readAloud: '语音播报 [P]',
    readingAloud: '正在播报...',
    refreshForecast: '刷新 [R]',
    voiceBrief: '语音 [P]',
    readingForecast: '播报中...',
    flagSecureActive: 'FLAG_SECURE: 已启用',
    pureBlackSaver: '#000000 纯黑节能模式',
    oldTvLite: '旧款电视 (LITE)',
    smartTv4k: '智能电视 (4K)',
    autoMode: '自动',
    forcedMode: '手动',
    weatherTitle: 'NewsRule 气象助手 • 阿塞拜疆巴库',
    weatherBriefTitle: 'NewsRule 气象简报与穿衣建议：',
    liveAiWire: 'AI 新闻线：已同步',
    aiSummarizing: 'AI 生成摘要中...',
    newsWire: '新闻快讯',
    termsTitle: '服务条款',
    proprietaryPolicy: '专有内容保护政策',
    rateApp: '在 Google Play 评分',
    playReviewTitle: '喜欢 NewsRule TV 吗？',
    playReviewSubtitle: '您的反馈有助于我们为各类电视设备优化广播体验。',
    playReviewSubmit: '提交评价',
    playReviewLater: '以后再说',
    playReviewThanksTitle: '感谢您的反馈！',
    playReviewThanksBody: '您的评分已提交至 NewsRule TV 的 Google Play 商店页面。',
    teletextTitle: '图文电视 / CEEFAX',
    broadcastEdition: '广播版 • 自适应显示引擎',
    liveBroadcast: '实时直播',
    close: '关闭',
    navHints: {
      navigate: '[▲/▼/◄/►] 导航',
      open: '[OK] 打开',
      mode: '[T] 模式',
      back: '[Esc] 返回',
      language: '[L] 语言',
    },
    tickerBreaking: '突发：',
    tickerTech: '科技：',
    tickerMarkets: '市场：',
    tickerPolicy: '声明：',
    tickerItems: {
      breaking: '全球能源峰会批准 2030 统一电网协议',
      tech: '硅光子芯片吞吐量突破 3.2 Tbps 行业基准',
      markets: '主要央行流动性调整提振工业制造指数',
      policy: 'NewsRule 专有内容与防复制保护条款全面生效',
    },
    headerLiveWire: '实时新闻线',
    headerWeather: '天气',
    headerTeletext: '图文电视',
    headerWhiteTheme: '浅色高对比',
    headerDarkTheme: '深色模式',
    headerSaver: '屏保',
    themeHint: '主题',
    saverHint: '屏保',
    storiesActive: '条实时报道',
    directFeed: '直连快讯源',
    continuouslySynced: '持续实时同步',
    sourceLabel: '来源',
    allRightsReserved: '保留所有权利',
    verifiedFeed: 'NewsRule 官方核实广播源',
    weatherToday: '今天',
    weatherTomorrow: '明天',
    weatherSaturday: '周六',
    weatherCoastalTelemetry: '实时沿海气象遥测',
    weatherTrajectory: '阿布歇伦半岛 3 天沿海气象趋势',
    weatherHumidity: '湿度',
    weatherStation: '里海盆地气象遥测 • 阿布歇伦自动气象站',
    teletextService: 'NEWSRULE 广播图文服务 • 频道',
    teletextPrevPage: '上一页',
    teletextNextPage: '下一页',
    teletextOpenStory: '阅读全文',
    teletextExit: '返回电视',
    teletextSummaryHeading: 'AI 核心摘要要点（专有内容）',
    teletextDisclaimer: 'NEWSRULE 图文电视广播 • 受服务条款保护 • 禁止复制',
    screensaverActive: '像素偏移防烧屏保护已开启',
    screensaverWake: '按遥控器任意键或移动光标恢复播放',
    translatingLabel: '正在同步语言...',
  },
};

const DYNAMIC_STORAGE_PREFIX = 'newsrule_i18n_v2_';
const dynamicTranslations: Record<string, Translations> = {};
const translationListeners = new Set<() => void>();

function hydrateDynamicPackFromStorage(lang: string): Translations | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${DYNAMIC_STORAGE_PREFIX}${lang}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Translations>;
    const merged = mergeWithBaseTranslations(parsed);
    dynamicTranslations[lang] = merged;
    return merged;
  } catch {
    return null;
  }
}

export function mergeWithBaseTranslations(partial: Partial<Translations>): Translations {
  const en = TRANSLATIONS.en;
  return {
    ...en,
    ...partial,
    categories: { ...en.categories, ...(partial.categories || {}) },
    navHints: { ...en.navHints, ...(partial.navHints || {}) },
    tickerItems: { ...en.tickerItems, ...(partial.tickerItems || {}) },
    langDescriptions: { ...en.langDescriptions, ...(partial.langDescriptions || {}) },
  };
}

export function hasNativeTranslations(lang: AppLanguage): boolean {
  return Boolean(TRANSLATIONS[lang]);
}

export function hasTranslationsLoaded(lang: AppLanguage): boolean {
  if (TRANSLATIONS[lang] || dynamicTranslations[lang]) return true;
  return Boolean(hydrateDynamicPackFromStorage(lang));
}

export function setDynamicTranslations(lang: AppLanguage, bundle: Partial<Translations>): Translations {
  const merged = mergeWithBaseTranslations(bundle);
  dynamicTranslations[lang] = merged;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`${DYNAMIC_STORAGE_PREFIX}${lang}`, JSON.stringify(merged));
    } catch {
      // Storage quota ignore
    }
  }
  translationListeners.forEach((cb) => cb());
  return merged;
}

export function subscribeTranslations(cb: () => void): () => void {
  translationListeners.add(cb);
  return () => {
    translationListeners.delete(cb);
  };
}

export function getTranslations(lang: AppLanguage): Translations {
  if (TRANSLATIONS[lang]) return TRANSLATIONS[lang];
  if (dynamicTranslations[lang]) return dynamicTranslations[lang];
  const fromStorage = hydrateDynamicPackFromStorage(lang);
  if (fromStorage) return fromStorage;
  return TRANSLATIONS.en;
}

const PREFS_NAME = 'NewsRuleSettings';
const KEY_APP_LANG = 'app_lang';

const VALID_LANGUAGE_IDS = new Set(LANGUAGE_CATALOG.map((l) => l.id));

export function isAppLanguage(val: unknown): val is AppLanguage {
  return typeof val === 'string' && VALID_LANGUAGE_IDS.has(val);
}

/**
 * Maps category keys to localized category title
 */
export function getLocalizedCategoryName(category: string, lang: AppLanguage): string {
  const t = getTranslations(lang);
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
 * Port of Android TV OS system language detection across all 102 supported languages.
 */
export function getInitialAppLanguage(): AppLanguage {
  if (typeof window === 'undefined') return 'en';

  try {
    const saved =
      localStorage.getItem(`${PREFS_NAME}_${KEY_APP_LANG}`) ||
      localStorage.getItem(KEY_APP_LANG);

    if (isAppLanguage(saved)) {
      return saved;
    }

    const systemLanguage = (
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      'en'
    ).toLowerCase();

    const exactMatch = LANGUAGE_CATALOG.find(
      (item) => item.id.toLowerCase() === systemLanguage
    );
    const prefixMatch = LANGUAGE_CATALOG.find((item) =>
      systemLanguage.startsWith(item.id.toLowerCase() + '-') || systemLanguage === item.id.toLowerCase()
    );
    const defaultLang: AppLanguage = exactMatch?.id || prefixMatch?.id || 'en';

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
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('newsrule-language-changed', { detail: lang }));
    }
  } catch {
    // Storage fallback
  }
}
