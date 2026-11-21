import { NewsArticle } from '../types/news';
import { AppLanguage } from '../services/i18n';

// Local high-fidelity generated assets
const IMG_ENERGY_HERO = '/src/assets/images/hero_global_energy_grid_1794487958839.jpg';
const IMG_TECH_PHOTONICS = '/src/assets/images/tech_silicon_photonics_1794487958876.jpg';
const IMG_MARKETS = '/src/assets/images/markets_stock_trading_1794487961178.jpg';
const IMG_SCIENCE_OCEAN = '/src/assets/images/science_deep_ocean_1794487960917.jpg';
const IMG_WEATHER_BAKU = '/src/assets/images/baku_caspian_boulevard_1794487961025.jpg';

export const MOCK_NEWS_ARTICLES_EN: NewsArticle[] = [
  {
    id: 'nr-101',
    channelNumber: 101,
    title: 'Global Energy Summit Reaches Historic Agreement on Next-Generation Grid Standards',
    category: 'Breaking',
    isBreaking: true,
    source: 'NewsRule World Desk',
    timestamp: 'JUST IN',
    readTime: '3 min read',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['Energy', 'Global Summit', 'Infrastructure'],
    aiSummary: [
      'Delegates from 64 nations ratified the Unified Grid Protocol 2030, establishing cross-border low-latency energy routing.',
      'Implementation is projected to reduce commercial transmission losses by up to 28% across major interconnected continental networks.',
      'Full deployment timeline sets initial infrastructure synchronization milestones for Q3 next year.'
    ],
    fullContent: `GENEVA — Delegates representing sixty-four member economies have concluded marathon negotiations at the International Energy Forum, producing a binding consensus on universal standards for distributed renewable micro-grids and dynamic inter-grid routing.\n\nThe landmark accord, titled the Unified Grid Protocol (UGP-30), mandates automated frequency balancing through standardized decentralized storage clusters. Energy analysts present at the plenary session noted that the standard will eliminate redundant cross-border conversion penalties, unlocking unprecedented cross-regional electricity sharing during peak demand oscillations.\n\n"Today we establish the digital and physical circulatory system for twenty-first century power delivery," remarked the summit rapporteur during the closing press briefing. The initial phase of testing commences across twelve high-capacity transit corridors before broad continental rollout.`
  },
  {
    id: 'nr-204',
    channelNumber: 204,
    title: 'Silicon Photonics Breakthrough Delivers 10x Bandwidth Surge with Sub-Milliwatt Efficiency',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'NewsRule Tech Bureau',
    timestamp: '18m ago',
    readTime: '4 min read',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['Semiconductors', 'Photonics', 'AI Hardware'],
    aiSummary: [
      'Engineers have validated monolithic silicon photonic interconnects operating at 3.2 Terabits per second per socket.',
      'Thermal dissipation measurements showed a 74% reduction compared to traditional copper trace interconnects under sustained load.',
      'Major server and TV SoC manufacturers are already testing evaluation dies for next-generation edge compute architectures.'
    ],
    fullContent: `SANTA CLARA — A consortium of materials science institutes and semiconductor fabricators today unveiled operational benchmark telemetry for monolithic optical transceivers fabricated entirely on standard 300mm CMOS lines.\n\nBy guiding laser wavelengths directly through microscopic silicon wave-guides on-chip, the novel design bypasses the resistive heating and capacitive delay that bottleneck high-density computing clusters. In automated continuous stress testing over 5,000 hours, the photonic dies sustained continuous error-free data transfer at extreme throughput with fractions of conventional power budgets.\n\nThe technology is expected to dramatically streamline processing units for everything from centralized hyperscale data centers to compact, energy-efficient television set-top processors and embedded edge neural processors.`
  },
  {
    id: 'nr-305',
    channelNumber: 305,
    title: 'Central Banking Coalition Adjusts Liquidity Ratios Amid Record Manufacturing Expansion',
    category: 'Markets',
    isBreaking: false,
    source: 'NewsRule Financial News',
    timestamp: '42m ago',
    readTime: '3 min read',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['Economics', 'Markets', 'Central Bank'],
    aiSummary: [
      'Coordinated regulatory statements confirmed an easing of reserve friction for capital-goods manufacturers.',
      'Equity markets across Tokyo, Frankfurt, and New York showed broad positive momentum following the policy publication.',
      'Short-term sovereign yield curves flattened as market participants adjusted expectations for the upcoming fiscal quarter.'
    ],
    fullContent: `NEW YORK & FRANKFURT — Global securities indexes registered moderate gains following the simultaneous release of synchronized monetary policy statements from the world’s tier-one central banking authorities.\n\nThe regulatory updates introduce nuanced adjustments to liquidity coverage requirements for verified industrial capital investments, specifically targeting heavy automated fabrication and advanced transit rolling stock. Market volume rose substantially in morning trading, with industrial and high-technology index components leading trading volume.\n\nFinancial sector strategists emphasized that the shift signals confidence in the durability of cross-hemisphere supply chains after consecutive quarters of volatile material valuations.`
  },
  {
    id: 'nr-402',
    channelNumber: 402,
    title: 'Deep Ocean Mapping Expedition Uncovers Extensive Hydrothermal Ecosystem in Southern Trench',
    category: 'Science',
    isBreaking: false,
    source: 'NewsRule Science Desk',
    timestamp: '1h ago',
    readTime: '5 min read',
    priorityScore: 85,
    imageUrl: IMG_SCIENCE_OCEAN,
    tags: ['Marine Biology', 'Exploration', 'Deep Sea'],
    aiSummary: [
      'Autonomous deep-submergence robotic platforms mapped previously uncharted hydrothermal vent spires reaching 40 meters high.',
      'Initial genomic sequencing from collected water column specimens identified over 30 candidate chemosynthetic microbial strains.',
      'Data will be archived in the open Marine Geophysics Collaborative repository for global oceanographic review.'
    ],
    fullContent: `WELLINGTON — Operating at depths exceeding 6,200 meters, an international oceanographic survey vessel has cataloged a vast cluster of active hydrothermal mineral structures along the tectonic boundary of the Southern Mariana Ridge.\n\nHigh-definition acoustic sonar and robotic optical imaging revealed sprawling ecosystems thriving completely independently of solar radiation. The organisms utilize chemosynthesis powered by mineral-saturated plumes exiting the seabed at temperatures nearing 340 degrees Celsius.\n\nBiochemists on board noted that the biological compounds synthesized by these extremophilic organisms could offer unprecedented insights into cellular stability under intense thermal and barometric pressure.`
  },
  {
    id: 'nr-508',
    channelNumber: 508,
    title: 'Spaceflight Directorate Clears Heavy Orbital Cargo Carrier for Multi-Module Station Re-supply',
    category: 'Science',
    isBreaking: false,
    source: 'NewsRule Aerospace',
    timestamp: '2h ago',
    readTime: '3 min read',
    priorityScore: 83,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['Space', 'Aerospace', 'Orbital'],
    aiSummary: [
      'Comprehensive static fire and structural avionics trials concluded successfully at the coastal launch facility.',
      'The automated spacecraft carries 8.4 metric tons of pressurized scientific payload, including closed-loop life support tests.',
      'Automated rendezvous and magnetic soft-docking sequence is scheduled 22 hours after orbital insertion.'
    ],
    fullContent: `CAPE CANAVERAL — Mission controllers confirmed late last night that the heavy autonomous logistics carrier has completed all preliminary mechanical and software flight readiness reviews for its upcoming primary orbital transit.\n\nThe vehicle is slated to deliver vital hardware components for the next iteration of low-Earth orbit research habitats. The flight manifest features specialized hardware chambers designed to study crystallization of pharmaceutical macromolecules in micro-gravity environments, alongside enhanced closed-loop atmospheric recycling modules.\n\nWeather conditions for the designated countdown window remain over ninety percent favorable, with ground teams initiating final propellant loading checks.`
  },
  {
    id: 'nr-609',
    channelNumber: 609,
    title: 'Championship Finals Showcase Historic Comeback as Underdogs Secure Continental Cup',
    category: 'Sports',
    isBreaking: false,
    source: 'NewsRule Sports Arena',
    timestamp: '3h ago',
    readTime: '3 min read',
    priorityScore: 80,
    imageUrl: IMG_MARKETS,
    tags: ['Championship', 'Athletics', 'Victory'],
    aiSummary: [
      'A thrilling final quarter turnaround saw a 14-point deficit erased in the final seven minutes of play.',
      'Defensive adjustments and tactical wing rotations stifled the tournament favorites in high-pressure possessions.',
      'Celebrations erupted in the host city as over 75,000 stadium spectators witnessed the franchise’s maiden championship win.'
    ],
    fullContent: `MADRID — In one of the most dramatic athletic conclusions in recent tournament history, the underdog squad delivered an unforgettable masterclass in tactical composure to hoist the Continental Trophy.\n\nTrailing by double digits late into the decisive contest, the head coach instituted a full-court pressure scheme that forced consecutive turnovers and fueled a relentless scoring run. The winning points arrived with just 4.2 seconds remaining on the clock as a step-back mid-range attempt banked cleanly off the backboard.\n\n"We trusted the discipline we practiced all season long," declared the finals Most Valuable Player during the trophy ceremony as team celebrations swept through the arena.`
  },
  {
    id: 'nr-710',
    channelNumber: 710,
    title: 'Caspian Peninsula Meteorological Bureau Releases Summer Forecast & Urban Microclimate Model',
    category: 'Weather',
    isBreaking: false,
    source: 'NewsRule Caspian Bureau',
    timestamp: '4h ago',
    readTime: '4 min read',
    priorityScore: 75,
    imageUrl: IMG_WEATHER_BAKU,
    tags: ['Weather', 'Caspian', 'Climate'],
    aiSummary: [
      'High-resolution atmospheric modeling indicates prevailing Khazri sea-breezes will temper continental heatwaves.',
      'Coastal humidity gradients along Baku Bay will maintain optimal conditions for evening urban recreation.',
      'Automated weather telemetry nodes along Absheron are now feeding real-time updates directly into NewsRule.'
    ],
    fullContent: `BAKU — Marine and atmospheric researchers along the Absheron Peninsula today deployed an expanded telemetry network monitoring microclimate trends across the Caspian maritime corridor.\n\nThe data shows that natural oceanic thermal inertia shields the metropolitan coastline from the extreme temperature swings common to inner desert zones. Wind velocity monitors along Baku Boulevard recorded steady northeasterly breezes averaging 18 km/h, providing continuous natural ventilation for urban promenades.\n\nNewsRule TV viewers can toggle channel 010 at any moment for localized updates on coastal weather and wardrobe guidance.`
  }
];

export const MOCK_NEWS_ARTICLES_RU: NewsArticle[] = [
  {
    id: 'nr-101-ru',
    channelNumber: 101,
    title: 'Всемирный энергетический саммит утвердил исторический Единый протокол электросетей 2030',
    category: 'Breaking',
    isBreaking: true,
    source: 'Мировое бюро NewsRule',
    timestamp: 'СРОЧНО В ЭФИРЕ',
    readTime: '3 мин чтения',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['Энергетика', 'Саммит', 'Инфраструктура'],
    aiSummary: [
      'Делегаты 64 стран ратифицировали Единый протокол сетей 2030 с минимальной задержкой маршрутизации энергии.',
      'Внедрение стандарта сократит коммерческие потери при передаче электроэнергии до 28% на континенте.',
      'Первый этап синхронизации инфраструктуры стартует в третьем квартале следующего года.'
    ],
    fullContent: `ЖЕНЕВА — Представители 64 государств завершили напряжённые переговоры на Международном энергетическом форуме, подписав юридически обязывающий документ об универсальных стандартах возобновляемых микросетей.\n\nСоглашение, получившее название Единый сетевой протокол (UGP-30), вводит автоматическую балансировку частоты через распределённые кластеры хранения. Эксперты пленарной сессии подчеркнули, что стандарт устранит барьеры и позволит гибко перераспределять электроэнергию в часы пиковых нагрузок.\n\n«Сегодня создаётся кровеносная система энергетики двадцать первого века», — заявил докладчик на итоговой пресс-конференции.`
  },
  {
    id: 'nr-204-ru',
    channelNumber: 204,
    title: 'Кремниевая фотоника: прорыв в 10 раз увеличивает полосу пропускания чипов нового поколения',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'Техбюро NewsRule',
    timestamp: '18 мин назад',
    readTime: '4 мин чтения',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['Полупроводники', 'Фотоника', 'ИИ-чипы'],
    aiSummary: [
      'Инженеры подтвердили скорость монолитных фотонных интерфейсов 3.2 Тбит/с на один сокет.',
      'Тепловыделение чипа снизилось на 74% по сравнению с медными проводниками при пиковой нагрузке.',
      'Производители ТВ-процессоров и серверов уже начали испытания образцов для потребительских устройств.'
    ],
    fullContent: `САНТА-КЛАРА — Консорциум материаловедческих институтов и производителей полупроводников представил результаты тестов оптических трансиверов, созданных на стандартных 300-мм кремниевых линиях.\n\nНаправляя лазерные импульсы через микроскопические волноводы прямо на кристалле, архитектура обходит тепловые ограничения электроники.`
  },
  {
    id: 'nr-305-ru',
    channelNumber: 305,
    title: 'Ведущие центробанки скорректировали нормы ликвидности на фоне промышленного подъёма',
    category: 'Markets',
    isBreaking: false,
    source: 'Финансовые вести NewsRule',
    timestamp: '42 мин назад',
    readTime: '3 мин чтения',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['Экономика', 'Рынки', 'Центробанк'],
    aiSummary: [
      'Согласованные заявления регуляторов снизили резервную нагрузку для промышленных производителей.',
      'Фондовые индексы в Токио, Франкфурте и Нью-Йорке отреагировали уверенным ростом котировок.',
      'Доходности краткосрочных облигаций стабилизировались в преддверии нового финансового квартала.'
    ],
    fullContent: `НЬЮ-ЙОРК И ФРАНКФУРТ — Мировые биржевые индексы продемонстрировали заметный подъём после синхронных заявлений крупнейших центральных банков мира.\n\nКорректировка норм покрытия ликвидности направлена на поддержку инвестиций в тяжёлое автоматизированное производство.`
  },
  {
    id: 'nr-402-ru',
    channelNumber: 402,
    title: 'Глубоководная экспедиция открыла уникальную гидротермальную экосистему на дне океана',
    category: 'Science',
    isBreaking: false,
    source: 'Научный отдел NewsRule',
    timestamp: '1 ч назад',
    readTime: '5 мин чтения',
    priorityScore: 85,
    imageUrl: IMG_SCIENCE_OCEAN,
    tags: ['Биология', 'Океан', 'Наука'],
    aiSummary: [
      'Автономные роботы нанесли на карту ранее неизвестные гидротермальные шпили высотой до 40 метров.',
      'Генетический анализ проб воды выявил более 30 штаммов уникальных хемосинтетических микроорганизмов.',
      'Собранные массивы данных переданы в открытый международный геофизический репозиторий.'
    ],
    fullContent: `ВЕЛЛИНГТОН — Работая на глубинах свыше 6200 метров, международная океанографическая группа описала масштабный кластер действующих геотермальных источников.`
  },
  {
    id: 'nr-710-ru',
    channelNumber: 710,
    title: 'Метеобюро Каспия представило сезонный прогноз погоды и карту ветров Апшерона',
    category: 'Weather',
    isBreaking: false,
    source: 'Каспийское бюро NewsRule',
    timestamp: '4 ч назад',
    readTime: '4 мин чтения',
    priorityScore: 75,
    imageUrl: IMG_WEATHER_BAKU,
    tags: ['Погода', 'Каспий', 'Баку'],
    aiSummary: [
      'Атмосферное моделирование указывает на преобладание умеренного морского ветра Хазри.',
      'Влажность вдоль Бакинской бухты обеспечит комфортные условия для вечерних прогулок.',
      'Датчики на набережной Баку передают оперативную сводку в реальном времени в эфир NewsRule.'
    ],
    fullContent: `БАКУ — Метеорологи Апшеронского полуострова развернули комплекс автоматических датчиков вдоль Каспийской набережной для высокоточного мониторинга погоды.`
  }
];

export const MOCK_NEWS_ARTICLES_AZ: NewsArticle[] = [
  {
    id: 'nr-101-az',
    channelNumber: 101,
    title: 'Qlobal Enerji Sammiti Yeni Nəsil Şəbəkə Standartları üzrə Tarixi Razılaşmaya Nail Oldu',
    category: 'Breaking',
    isBreaking: true,
    source: 'NewsRule Dünya Şöbəsi',
    timestamp: 'CANLI XƏT',
    readTime: '3 dəq oxuma',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['Enerji', 'Qlobal Sammit', 'İnfrastruktur'],
    aiSummary: [
      '64 ölkənin nümayəndələri Vahid Şəbəkə Protokolu 2030-u təsdiqləyərək aşağı gecikməli enerji ötürülməsini təmin etdilər.',
      'Tətbiqin böyük qitə şəbəkələrində kommersiya ötürmə itkilərini 28%-dək azaldacağı gözlənilir.',
      'İnfrastrukturun tam sinxronizasiyasının ilkin mərhələsi gələn ilin üçüncü rübünə planlaşdırılır.'
    ],
    fullContent: `CENEVRƏ — 64 üzv ölkəni təmsil edən nümayəndə heyətləri Beynəlxalq Enerji Forumunda universal enerji standartları üzrə tarixi konsensus əldə etdilər.\n\nVahid Şəbəkə Protokolu (UGP-30) mərkəzsizləşdirilmiş anbar klasterləri vasitəsilə avtomatik tezlik balanslaşdırmasını tələb edir.`
  },
  {
    id: 'nr-204-az',
    channelNumber: 204,
    title: 'Silisium Fotonikasında İnqilab: Çiplərdə 10 Dəfə Yüksək Ötürmə Sürəti Təsdiqləndi',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'NewsRule Texnobüro',
    timestamp: '18 dəq əvvəl',
    readTime: '4 dəq oxuma',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['Yarımkeçiricilər', 'Fotonika', 'AI Prosessorlar'],
    aiSummary: [
      'Mühəndislər hər soket üzrə saniyədə 3.2 Terabit sürətlə işləyən monolitik silisium optik birləşmələri sınaqdan keçirdilər.',
      'İstilik ayrılması ənənəvi mis naqillərlə müqayisədə davamlı yük altında 74% azaldı.',
      'Server və Smart TV prosessor istehsalçıları yeni çipləri sınaqdan keçirməyə başlayıblar.'
    ],
    fullContent: `SANTA KLARA — Materialşünaslıq institutları standart 300 mm CMOS xətlərində istehsal olunan optik ötürücülərin əməliyyat göstəricilərini açıqladı.`
  },
  {
    id: 'nr-305-az',
    channelNumber: 305,
    title: 'Mərkəzi Banklar Sənaye İnkişafı Fonunda Likvidlik Normalarını Yenilədi',
    category: 'Markets',
    isBreaking: false,
    source: 'NewsRule İqtisadiyyat',
    timestamp: '42 dəq əvvəl',
    readTime: '3 dəq oxuma',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['İqtisadiyyat', 'Bazarlar', 'Mərkəzi Bank'],
    aiSummary: [
      'Tənzimləyici orqanlar sənaye istehsalçıları üçün ehtiyat tələblərini yüngülləşdirdi.',
      'Tokio, Frankfurt və Nyu-York birjalarında qərardan sonra müsbət dinamika müşahidə olundu.',
      'Qısamüddətli dövlət istiqrazlarının gəlirliliyi yeni rüb öncəsi sabitləşdi.'
    ],
    fullContent: `NYU-YORK VƏ FRANKFURT — Qlobal qiymətli kağızlar indeksləri aparıcı mərkəzi bankların razılaşdırılmış pul-kredit siyasəti bəyanatlarından sonra yüksəliş qeydə aldı.`
  },
  {
    id: 'nr-402-az',
    channelNumber: 402,
    title: 'Dərin Dəniz Ekspedisiyası Cənub Qatında Geniş Hidrotermal Ekosistem Aşkarladı',
    category: 'Science',
    isBreaking: false,
    source: 'NewsRule Elm Şöbəsi',
    timestamp: '1 saat əvvəl',
    readTime: '5 dəq oxuma',
    priorityScore: 85,
    imageUrl: IMG_SCIENCE_OCEAN,
    tags: ['Dəniz Biologiyası', 'Kəşfiyyat', 'Dərin Dəniz'],
    aiSummary: [
      'Avtonom robot aparatlar 40 metr hündürlüyə çatan hidrotermal strukturları xəritələşdirdi.',
      'Su nümunələrinin ilkin genetik analizi 30-dan çox namizəd kemosintetik mikrob ştammı müəyyən etdi.',
      'Məlumatlar qlobal okeanoqrafik araşdırmalar üçün açıq elmi repozitoriyada saxlanılacaq.'
    ],
    fullContent: `VELLİNQTON — 6200 metrdən çox dərinlikdə fəaliyyət göstərən beynəlxalq okeanoqrafiya gəmisi fəal hidrotermal mineral strukturları qeydə aldı.`
  },
  {
    id: 'nr-710-az',
    channelNumber: 710,
    title: 'Xəzər Meteorologiya Mərkəzi Bakı və Abşeron üçün Hava Proqnozunu Təqdim Etdi',
    category: 'Weather',
    isBreaking: false,
    source: 'NewsRule Xəzər Bürosu',
    timestamp: '4 saat əvvəl',
    readTime: '4 dəq oxuma',
    priorityScore: 75,
    imageUrl: IMG_WEATHER_BAKU,
    tags: ['Hava', 'Xəzər', 'Bakı'],
    aiSummary: [
      'Atmosfer modelləşdirməsi mülayim Xəzri dəniz küləyinin üstünlük təşkil edəcəyini göstərir.',
      'Bakı bulvarı boyu optimal rütubət axşam gəzintiləri üçün əlverişli şərait yaradır.',
      'Dənizkənarı avtomatik sensorlar canlı telemetriya məlumatlarını NewsRule efirinə ötürür.'
    ],
    fullContent: `BAKI — Abşeron yarımadasında fəaliyyət göstərən meteoroloji stansiyalar Xəzər sahili boyu hava şəraitini real vaxt rejimində qeydə alır.`
  }
];

export const MOCK_NEWS_ARTICLES_TR: NewsArticle[] = [
  {
    id: 'nr-101-tr',
    channelNumber: 101,
    title: 'Küresel Enerji Zirvesi Yeni Nesil Şebeke Standartlarında Tarihi Anlaşmaya Vardı',
    category: 'Breaking',
    isBreaking: true,
    source: 'NewsRule Dünya Masası',
    timestamp: 'SON DAKİKA',
    readTime: '3 dk okuma',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['Enerji', 'Zirve', 'Altyapı'],
    aiSummary: [
      '64 ülkenin delegeleri düşük gecikmeli sınır ötesi enerji yönlendirmesi sağlayan 2030 Birleşik Şebeke Protokolünü onayladı.',
      'Uygulamanın kıtalararası büyük ağlarda ticari iletim kayıplarını %28’e kadar azaltması bekleniyor.',
      'İlk altyapı senkronizasyon adımları gelecek yılın üçüncü çeyreğinde başlatılacak.'
    ],
    fullContent: `CENEVRE — Altmış dört üye ekonomiyi temsil eden delegeler, Uluslararası Enerji Forumu’nda dağıtık yenilenebilir mikro şebekeler için bağlayıcı evrensel standartlar üzerinde uzlaşmaya vardı.\n\nUGP-30 adı verilen anlaşma, enerji depolama kümeleri aracılığıyla otomatik frekans dengelemesi getiriyor.`
  },
  {
    id: 'nr-204-tr',
    channelNumber: 204,
    title: 'Silikon Fotonik Devrimi: Yeni Nesil Çiplerde 10 Kat Bant Genişliği Artışı',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'NewsRule Teknoloji Bürosu',
    timestamp: '18 dk önce',
    readTime: '4 dk okuma',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['Yarı İletkenler', 'Fotonik', 'Yapay Zekâ'],
    aiSummary: [
      'Mühendisler soket başına saniyede 3.2 Terabit hızında çalışan monolitik silikon fotonik bağlantıları doğruladı.',
      'Isı dağılımı ölçümleri geleneksel bakır hatlara kıyasla %74 daha az ısınma gösterdi.',
      'Sunucu ve Akıllı TV işlemci üreticileri yeni yongaları test etmeye başladı.'
    ],
    fullContent: `SANTA CLARA — Yarı iletken üreticileri konsorsiyumu, standart 300mm CMOS hatlarında üretilen optik alıcı-vericilerin performans verilerini paylaştı.`
  },
  {
    id: 'nr-305-tr',
    channelNumber: 305,
    title: 'Merkez Bankaları Sanayi Büyümesi Eşliğinde Likidite Oranlarını Güncelledi',
    category: 'Markets',
    isBreaking: false,
    source: 'NewsRule Ekonomi',
    timestamp: '42 dk önce',
    readTime: '3 dk okuma',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['Ekonomi', 'Piyasalar', 'Merkez Bankası'],
    aiSummary: [
      'Eşgüdümlü düzenleyici açıklamalar sermaye malı üreticileri için rezerv yükünü hafifletti.',
      'Tokyo, Frankfurt ve New York borsaları açıklamanın ardından pozitif ivme kazandı.',
      'Kısa vadeli devlet tahvili getirileri yeni mali çeyrek öncesinde dengelendi.'
    ],
    fullContent: `NEW YORK & FRANKFURT — Dünyanın önde gelen merkez bankalarının eş zamanlı para politikası açıklamalarının ardından küresel borsalar yükseldi.`
  },
  {
    id: 'nr-402-tr',
    channelNumber: 402,
    title: 'Derin Deniz Keşfi Güney Çukuru’nda Geniş Bir Hidrotermal Ekosistem Ortaya Çıkardı',
    category: 'Science',
    isBreaking: false,
    source: 'NewsRule Bilim Masası',
    timestamp: '1 sa önce',
    readTime: '5 dk okuma',
    priorityScore: 85,
    imageUrl: IMG_SCIENCE_OCEAN,
    tags: ['Deniz Biyolojisi', 'Keşif', 'Bilim'],
    aiSummary: [
      'Otonom derin dalış robotları 40 metre yüksekliğe ulaşan yeni hidrotermal bacaları haritaladı.',
      'Su örneklerinden yapılan genetik dizilemede 30’dan fazla kemosentetik mikroorganizma türü saptandı.',
      'Veriler küresel oşinografi araştırmaları için açık bilimsel arşive eklendi.'
    ],
    fullContent: `WELLINGTON — 6.200 metreyi aşan derinliklerde çalışan uluslararası araştırma gemisi, Güney Mariana Sırtı boyunca aktif hidrotermal yapılar keşfetti.`
  }
];

export const MOCK_NEWS_ARTICLES_ES: NewsArticle[] = [
  {
    id: 'nr-101-es',
    channelNumber: 101,
    title: 'La Cumbre Energética Global Alcanza Acuerdo Histórico sobre Redes de Nueva Generación',
    category: 'Breaking',
    isBreaking: true,
    source: 'Mesa Mundial NewsRule',
    timestamp: 'ÚLTIMA HORA',
    readTime: '3 min',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['Energía', 'Cumbre', 'Infraestructura'],
    aiSummary: [
      'Delegados de 64 naciones ratificaron el Protocolo de Red Unificada 2030 para enrutamiento energético de baja latencia.',
      'Se proyecta que la implementación reduzca las pérdidas de transmisión comercial hasta en un 28%.',
      'Los primeros hitos de sincronización de infraestructura comenzarán el tercer trimestre del próximo año.'
    ],
    fullContent: `GINEBRA — Delegados de sesenta y cuatro economías concluyeron negociaciones maratónicas en el Foro Internacional de Energía, estableciendo estándares universales para microrredes renovables distribuidas.`
  },
  {
    id: 'nr-204-es',
    channelNumber: 204,
    title: 'Avance en Fotónica de Silicio Multiplica por 10 el Ancho de Banda con Eficiencia Submilivatio',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'Buró Técnico NewsRule',
    timestamp: 'Hace 18m',
    readTime: '4 min',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['Semiconductores', 'Fotónica', 'IA'],
    aiSummary: [
      'Los ingenieros validaron interconexiones fotónicas monolíticas operando a 3.2 Terabits por segundo por zócalo.',
      'La disipación térmica mostró una reducción del 74% frente al cableado tradicional de cobre.',
      'Los fabricantes de televisores inteligentes y servidores ya prueban los nuevos procesadores.'
    ],
    fullContent: `SANTA CLARA — Un consorcio de institutos de ciencia de materiales presentó telemetría operativa de transceptores ópticos monolíticos fabricados en líneas estándar CMOS de 300 mm.`
  },
  {
    id: 'nr-305-es',
    channelNumber: 305,
    title: 'Bancos Centrales Ajustan Ratios de Liquidez Ante la Expansión Récord Manufacturera',
    category: 'Markets',
    isBreaking: false,
    source: 'Noticias Financieras NewsRule',
    timestamp: 'Hace 42m',
    readTime: '3 min',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['Economía', 'Mercados', 'Banca'],
    aiSummary: [
      'Declaraciones coordinadas confirmaron una flexibilización de reservas para fabricantes de bienes de capital.',
      'Las bolsas de Tokio, Fráncfort y Nueva York registraron ganancias tras el anuncio.',
      'Los rendimientos soberanos a corto plazo se estabilizaron de cara al próximo trimestre fiscal.'
    ],
    fullContent: `NUEVA YORK Y FRÁNCFORT — Los índices bursátiles globales registraron alzas moderadas tras las declaraciones sincronizadas de política monetaria.`
  },
  {
    id: 'nr-402-es',
    channelNumber: 402,
    title: 'Expedición de Mapeo Oceánico Descubre Extenso Ecosistema Hidrotermal en Fosa Austral',
    category: 'Science',
    isBreaking: false,
    source: 'Mesa Científica NewsRule',
    timestamp: 'Hace 1h',
    readTime: '5 min',
    priorityScore: 85,
    imageUrl: IMG_SCIENCE_OCEAN,
    tags: ['Biología Marina', 'Exploración', 'Ciencia'],
    aiSummary: [
      'Vehículos robóticos autónomos cartografiaron chimeneas hidrotermales de hasta 40 metros de altura.',
      'La secuenciación genómica inicial identificó más de 30 cepas microbianas quimiosintéticas.',
      'Los datos serán archivados en el repositorio abierto de Geofísica Marina.'
    ],
    fullContent: `WELLINGTON — Operando a más de 6.200 metros de profundidad, un buque oceanográfico catalogó un vasto conjunto de estructuras minerales hidrotermales activas.`
  }
];

export const MOCK_NEWS_ARTICLES_FR: NewsArticle[] = [
  {
    id: 'nr-101-fr',
    channelNumber: 101,
    title: 'Le Sommet Mondial de l’Énergie Conclut un Accord Historique sur les Réseaux de Demain',
    category: 'Breaking',
    isBreaking: true,
    source: 'Rédaction Monde NewsRule',
    timestamp: 'À L’INSTANT',
    readTime: '3 min',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['Énergie', 'Sommet', 'Infrastructure'],
    aiSummary: [
      'Les délégués de 64 nations ont ratifié le Protocole de Réseau Unifié 2030 à faible latence.',
      'La mise en œuvre devrait réduire les pertes de transmission commerciale jusqu’à 28%.',
      'Les premières étapes de synchronisation des infrastructures débuteront au troisième trimestre.'
    ],
    fullContent: `GENÈVE — Les représentants de soixante-quatre économies ont conclu des négociations décisives au Forum International de l’Énergie sur les micro-réseaux renouvelables distribués.`
  },
  {
    id: 'nr-204-fr',
    channelNumber: 204,
    title: 'La Photonique sur Silicium Multiplie par 10 la Bande Passante avec une Efficacité Record',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'Bureau Tech NewsRule',
    timestamp: 'Il y a 18m',
    readTime: '4 min',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['Semi-conducteurs', 'Photonique', 'IA'],
    aiSummary: [
      'Les ingénieurs ont validé des interconnexions photoniques fonctionnant à 3,2 Térabits par seconde.',
      'La dissipation thermique a diminué de 74% par rapport aux pistes de cuivre traditionnelles.',
      'Les fabricants de processeurs TV et serveurs testent déjà les premiers prototypes.'
    ],
    fullContent: `SANTA CLARA — Un consortium d’instituts de matériaux a dévoilé les performances d’émetteurs-récepteurs optiques fabriqués sur lignes CMOS standard de 300 mm.`
  },
  {
    id: 'nr-305-fr',
    channelNumber: 305,
    title: 'Les Banques Centrales Ajustent les Ratios de Liquidité Face à l’Essor Industriel',
    category: 'Markets',
    isBreaking: false,
    source: 'Finance NewsRule',
    timestamp: 'Il y a 42m',
    readTime: '3 min',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['Économie', 'Marchés', 'Banque'],
    aiSummary: [
      'Des déclarations coordonnées confirment un assouplissement des réserves pour les industriels.',
      'Les places boursières de Tokyo, Francfort et New York affichent une progression solide.',
      'Les courbes de rendement souverain à court terme se sont stabilisées.'
    ],
    fullContent: `NEW YORK & FRANCFORT — Les indices boursiers mondiaux ont enregistré des gains modérés suite aux déclarations synchronisées des principales banques centrales.`
  },
  {
    id: 'nr-402-fr',
    channelNumber: 402,
    title: 'Une Expédition Sous-Marine Découvre un Vaste Écosystème Hydrothermal dans la Fosse Australe',
    category: 'Science',
    isBreaking: false,
    source: 'Pôle Science NewsRule',
    timestamp: 'Il y a 1h',
    readTime: '5 min',
    priorityScore: 85,
    imageUrl: IMG_SCIENCE_OCEAN,
    tags: ['Océanographie', 'Exploration', 'Science'],
    aiSummary: [
      'Des robots autonomes ont cartographié des cheminées hydrothermales atteignant 40 mètres de hauteur.',
      'Le séquençage génomique initial a identifié plus de 30 souches microbiennes chimiosynthétiques.',
      'Les données seront archivées dans le dépôt public mondial de géophysique marine.'
    ],
    fullContent: `WELLINGTON — Opérant à plus de 6 200 mètres de profondeur, un navire océanographique international a répertorié un vaste complexe hydrothermal actif.`
  }
];

export const MOCK_NEWS_ARTICLES_DE: NewsArticle[] = [
  {
    id: 'nr-101-de',
    channelNumber: 101,
    title: 'Welt-Energiegipfel Erzielt Historische Einigung über Netzstandards der Nächsten Generation',
    category: 'Breaking',
    isBreaking: true,
    source: 'NewsRule Weltredaktion',
    timestamp: 'EILMELDUNG',
    readTime: '3 Min.',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['Energie', 'Gipfel', 'Infrastruktur'],
    aiSummary: [
      'Delegierte aus 64 Nationen ratifizierten das Unified Grid Protocol 2030 für latenzarme Energieverteilung.',
      'Die Umsetzung soll kommerzielle Übertragungsverluste in kontinentalen Netzen um bis zu 28% senken.',
      'Erste Meilensteine zur Infrastruktursynchronisation starten im dritten Quartal des kommenden Jahres.'
    ],
    fullContent: `GENF — Delegierte aus vierundsechzig Mitgliedsstaaten haben auf dem Internationalen Energieforum verbindliche Standards für verteilte erneuerbare Mikronetze verabschiedet.`
  },
  {
    id: 'nr-204-de',
    channelNumber: 204,
    title: 'Silizium-Photonik-Durchbruch Liefert 10-Fache Bandbreite bei Minimalem Stromverbrauch',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'NewsRule Tech-Büro',
    timestamp: 'Vor 18 Min.',
    readTime: '4 Min.',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['Halbleiter', 'Photonik', 'KI-Hardware'],
    aiSummary: [
      'Ingenieure validierten monolithische Silizium-Photonik-Verbindungen mit 3,2 Terabit pro Sekunde.',
      'Messungen zeigen 74% geringere Wärmeentwicklung im Vergleich zu herkömmlichen Kupferleitungen.',
      'Führende TV- und Server-Chiphersteller testen bereits erste Evaluationsmuster.'
    ],
    fullContent: `SANTA CLARA — Ein Konsortium aus Materialforschungsinstituten präsentierte Leistungsdaten für optische Transceiver auf Basis standardmäßiger 300-mm-CMOS-Fertigung.`
  },
  {
    id: 'nr-305-de',
    channelNumber: 305,
    title: 'Zentralbanken Passen Liquiditätsquoten Angesichts Starken Industriewachstums An',
    category: 'Markets',
    isBreaking: false,
    source: 'NewsRule Finanzen',
    timestamp: 'Vor 42 Min.',
    readTime: '3 Min.',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['Wirtschaft', 'Märkte', 'Zentralbank'],
    aiSummary: [
      'Koordinierte Erklärungen bestätigen eine Entlastung der Reservepflichten für Investitionsgüterhersteller.',
      'Die Aktienmärkte in Tokio, Frankfurt und New York zeigten nach der Veröffentlichung deutliche Gewinne.',
      'Kurzfristige Staatsanleiherenditen stabilisierten sich vor dem kommenden Quartal.'
    ],
    fullContent: `NEW YORK & FRANKFURT — Die globalen Aktienindizes verzeichneten nach abgestimmten geldpolitischen Erklärungen der führenden Notenbanken spürbare Zugewinne.`
  },
  {
    id: 'nr-402-de',
    channelNumber: 402,
    title: 'Tiefsee-Kartierungsexpedition Entdeckt Ausgedehntes Hydrothermales Ökosystem',
    category: 'Science',
    isBreaking: false,
    source: 'NewsRule Wissenschaft',
    timestamp: 'Vor 1 Std.',
    readTime: '5 Min.',
    priorityScore: 85,
    imageUrl: IMG_SCIENCE_OCEAN,
    tags: ['Meeresbiologie', 'Forschung', 'Tiefsee'],
    aiSummary: [
      'Autonome Tiefseeroboter kartierten bis zu 40 Meter hohe hydrothermale Schlote.',
      'Erste Genomanalysen identifizierten über 30 chemosynthetische Mikrobenstämme.',
      'Alle Messdaten werden im offenen Marine-Geophysik-Archiv veröffentlicht.'
    ],
    fullContent: `WELLINGTON — In über 6.200 Metern Tiefe hat ein internationales Forschungsschiff ein weitläufiges Feld aktiver hydrothermaler Mineralstrukturen entdeckt.`
  }
];

export const MOCK_NEWS_ARTICLES_AR: NewsArticle[] = [
  {
    id: 'nr-101-ar',
    channelNumber: 101,
    title: 'قمة الطاقة العالمية تتوصل إلى اتفاق تاريخي حول معايير شبكات الجيل القادم',
    category: 'Breaking',
    isBreaking: true,
    source: 'مكتب NewsRule الدولي',
    timestamp: 'عاجل',
    readTime: '3 دقائق',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['طاقة', 'قمة عالمية', 'بنية تحتية'],
    aiSummary: [
      'صادق مندوبون من 64 دولة على بروتوكول الشبكة الموحدة 2030 لتوجيه الطاقة بزمن استجابة منخفض.',
      'من المتوقع أن يقلل التطبيق خسائر النقل التجاري بنسبة تصل إلى 28% عبر الشبكات القارية.',
      'تنطلق المرحلة الأولى لمزامنة البنية التحتية في الربع الثالث من العام المقبل.'
    ],
    fullContent: `جنيف — اختتم مندوبو أربع وستين دولة مفاوضات مكثفة في منتدى الطاقة الدولي، متوصلين إلى توافق ملزم حول المعايير العالمية للشبكات المتجددة الموزعة.`
  },
  {
    id: 'nr-204-ar',
    channelNumber: 204,
    title: 'اختراق في الفوتونيات السيليكونية يضاعف عرض النطاق الترددي 10 مرات بكفاءة فائقة',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'مكتب NewsRule التقني',
    timestamp: 'منذ 18 د',
    readTime: '4 دقائق',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['أشباه الموصلات', 'فوتونيات', 'ذكاء اصطناعي'],
    aiSummary: [
      'أثبت المهندسون كفاءة وصلات فوتونية أحادية تعمل بسرعة 3.2 تيرابت في الثانية.',
      'أظهرت القياسات الحرارية انخفاضاً بنسبة 74% مقارنة بوصلات النحاس التقليدية.',
      'بدأت شركات تصنيع معالجات التلفاز الذكي والخوادم اختبار النماذج الأولية.'
    ],
    fullContent: `سانتا كلارا — كشف تحالف من معاهد علوم المواد ومصنعي الرقائق عن بيانات أداء أجهزة الإرسال والاستقبال البصرية المصنوعة على خطوط CMOS القياسية.`
  },
  {
    id: 'nr-305-ar',
    channelNumber: 305,
    title: 'ائتلاف البنوك المركزية يعدل نسب السيولة وسط توسع صناعي قياسي',
    category: 'Markets',
    isBreaking: false,
    source: 'أخبار NewsRule المالية',
    timestamp: 'منذ 42 د',
    readTime: '3 دقائق',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['اقتصاد', 'أسواق', 'بنوك مركزية'],
    aiSummary: [
      'أكدت البيانات التنظيمية المنسقة تخفيف متطلبات الاحتياطي لمصنعي السلع الرأسمالية.',
      'أظهرت أسواق الأسهم في طوكيو وفرانكفورت ونيويورك زخماً إيجابياً واسعاً.',
      'استقرت منحنيات العائد السيادي قصيرة الأجل مع استعداد الأسواق للربع المالي القادم.'
    ],
    fullContent: `نيويورك وفرانكفورت — سجلت مؤشرات الأسهم العالمية مكاسب معتدلة عقب صدور بيانات متزامنة للسياسة النقدية من كبرى البنوك المركزية.`
  },
  {
    id: 'nr-710-ar',
    channelNumber: 710,
    title: 'مكتب الأرصاد في بحر قزوين يصدر توقعات الطقس ونموذج المناخ الحضري لباكو',
    category: 'Weather',
    isBreaking: false,
    source: 'مكتب قزوين NewsRule',
    timestamp: 'منذ 4 س',
    readTime: '4 دقائق',
    priorityScore: 75,
    imageUrl: IMG_WEATHER_BAKU,
    tags: ['طقس', 'بحر قزوين', 'باكو'],
    aiSummary: [
      'تشير النمذجة الجوية عالية الدقة إلى استمرار نسيم خزري البحري المعتدل.',
      'تحافظ مستويات الرطوبة على طول خليج باكو على أجواء مثالية للتنزه المسائي.',
      'تنقل محطات القياس الآلية التحديثات الفورية مباشرة إلى شاشة NewsRule.'
    ],
    fullContent: `باكو — نشر باحثو الأرصاد الجوية في شبه جزيرة أبشيرون شبكة موسعة من المستشعرات لمتابعة المناخ المحلي على طول ساحل بحر قزوين.`
  }
];

export const MOCK_NEWS_ARTICLES_ZH: NewsArticle[] = [
  {
    id: 'nr-101-zh',
    channelNumber: 101,
    title: '全球能源峰会就新一代电网标准达成历史性协议',
    category: 'Breaking',
    isBreaking: true,
    source: 'NewsRule 国际部',
    timestamp: '刚刚',
    readTime: '3 分钟阅读',
    priorityScore: 99,
    imageUrl: IMG_ENERGY_HERO,
    tags: ['能源', '全球峰会', '基础设施'],
    aiSummary: [
      '来自 64 个国家的代表批准了《2030 统一电网协议》，建立低延迟跨境能源调度机制。',
      '预计该标准实施后将使跨大陆互联电网的商业传输损耗降低高达 28%。',
      '首批基础设施同步里程碑将于明年第三季度正式启动部署。'
    ],
    fullContent: `日内瓦 — 来自 64 个成员经济体的代表在国际能源论坛结束了马拉松式谈判，就分布式可再生微电网及动态网间路由的通用标准达成了具有约束力的共识。`
  },
  {
    id: 'nr-204-zh',
    channelNumber: 204,
    title: '硅光子技术取得突破：芯片带宽飙升 10 倍，功耗降至亚毫瓦级',
    category: 'Tech & AI',
    isBreaking: false,
    source: 'NewsRule 科技局',
    timestamp: '18 分钟前',
    readTime: '4 分钟阅读',
    priorityScore: 92,
    imageUrl: IMG_TECH_PHOTONICS,
    tags: ['半导体', '硅光子', 'AI 硬件'],
    aiSummary: [
      '工程师验证了单插槽吞吐量达每秒 3.2 太比特的单片硅光子互连架构。',
      '在持续高负载下，热耗散相比传统铜线互连降低了 74%。',
      '主要服务器及智能电视 SoC 厂商已开始测试下一代边缘计算评估芯片。'
    ],
    fullContent: `圣克拉拉 — 材料科学研究所与半导体晶圆厂组成的联盟公布了基于标准 300 毫米 CMOS 产线制造的单片光收发器基准测试遥测数据。`
  },
  {
    id: 'nr-305-zh',
    channelNumber: 305,
    title: '主要央行联合调整流动性比率以配合制造业创纪录扩张',
    category: 'Markets',
    isBreaking: false,
    source: 'NewsRule 财经频道',
    timestamp: '42 分钟前',
    readTime: '3 分钟阅读',
    priorityScore: 88,
    imageUrl: IMG_MARKETS,
    tags: ['经济', '市场', '央行'],
    aiSummary: [
      '协调一致的监管声明确认放宽对资本货物制造商的准备金要求。',
      '政策发布后，东京、法兰克福及纽约股市普遍走强。',
      '随着市场调整下一财季预期，短期主权债券收益率曲线趋于平缓。'
    ],
    fullContent: `纽约与法兰克福 — 全球主要央行同步发布货币政策声明后，全球证券指数普遍录得稳健涨幅。`
  },
  {
    id: 'nr-710-zh',
    channelNumber: 710,
    title: '里海气象局发布巴库夏季天气预报与滨海微气候监测模型',
    category: 'Weather',
    isBreaking: false,
    source: 'NewsRule 里海气象站',
    timestamp: '4 小时前',
    readTime: '4 分钟阅读',
    priorityScore: 75,
    imageUrl: IMG_WEATHER_BAKU,
    tags: ['天气', '里海', '巴库'],
    aiSummary: [
      '高分辨率大气模型显示，温和的哈兹里海风将有效缓和内陆热浪。',
      '巴库湾沿线湿度适宜，为夜间滨海步道活动提供舒适环境。',
      '阿布歇隆半岛自动气象遥测节点现已直接向 NewsRule 传输实时更新。'
    ],
    fullContent: `巴库 — 阿布歇隆半岛海洋与大气研究人员沿里海沿岸部署了扩展遥测网络，实时监测巴库海滨大道的风速与微气候变化。`
  }
];

export const MOCK_NEWS_ARTICLES = MOCK_NEWS_ARTICLES_EN;

export function getMockArticlesForLanguage(lang: AppLanguage): NewsArticle[] {
  const normalized = lang.toLowerCase();
  if (normalized === 'ru') return MOCK_NEWS_ARTICLES_RU;
  if (normalized === 'az') return MOCK_NEWS_ARTICLES_AZ;
  if (normalized === 'tr') return MOCK_NEWS_ARTICLES_TR;
  if (normalized === 'es') return MOCK_NEWS_ARTICLES_ES;
  if (normalized === 'fr') return MOCK_NEWS_ARTICLES_FR;
  if (normalized === 'de') return MOCK_NEWS_ARTICLES_DE;
  if (normalized === 'ar') return MOCK_NEWS_ARTICLES_AR;
  if (normalized === 'zh') return MOCK_NEWS_ARTICLES_ZH;
  return MOCK_NEWS_ARTICLES_EN;
}
