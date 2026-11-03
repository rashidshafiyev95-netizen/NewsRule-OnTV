import { NewsArticle } from '../types/news';
import { AppLanguage } from '../services/i18n';

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
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1517976487507-59a5e11d6869?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
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
    title: 'International Film Archive Restores 1920s Masterpiece Using AI-Assisted Photochemical Reconstruction',
    category: 'Entertainment',
    isBreaking: false,
    source: 'NewsRule Arts & Culture',
    timestamp: '4h ago',
    readTime: '4 min read',
    priorityScore: 75,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    tags: ['Cinema', 'Restoration', 'Archival Art'],
    aiSummary: [
      'Severely decomposed nitrate negative reels were reconstructed frame-by-frame with neural emulsion correction models.',
      'The audio score was meticulously re-recorded by a 60-piece philharmonic orchestra matching original 1926 sheet music.',
      'World premiere of the 4K restored print is scheduled at the upcoming Venice Cinematheque Gala.'
    ],
    fullContent: `BOLOGNA — Cinematic historians and archival preservationists have achieved a major restoration triumph, completing the painstaking resurrection of a silent era epic previously feared lost to nitrate decay.\n\nLeveraging specialized non-destructive scanning at 8K resolution, technicians utilized proprietary machine learning models to synthesize lost emulsion boundaries while preserving authentic film grain and optical lens characteristics. Missing inter-title cards discovered in private collectors’ vaults were translated and reintegrated according to the director’s original production ledger.\n\nThe completed restoration presents film scholars with an pristine, crystal-clear view into early twentieth-century visual storytelling.`
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
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Энергетика', 'Саммит', 'Инфраструктура'],
    aiSummary: [
      'Делегаты 64 стран ратифицировали Единый протокол сетей 2030 с минимальной задержкой маршрутизации энергии.',
      'Внедрение стандарта сократит коммерческие потери при передаче электроэнергии до 28% на континенте.',
      'Первый этап синхронизации инфраструктуры стартует в третьем квартале следующего года.'
    ],
    fullContent: `ЖЕНЕВА — Представители 64 государств завершили напряжённые переговоры на Международном энергетическом форуме, подписав юридически обязывающий документ об универсальных стандартах возобновляемых микросетей.\n\nСоглашение, получившее название Единый сетевой протокол (UGP-30), вводит автоматическую балансировку частоты через распределённые кластеры хранения. Эксперты пленарной сессии подчеркнули, что стандарт устранит барьеры и позволит гибко перераспределять электроэнергию в часы пиковых нагрузок.\n\n«Сегодня создаётся кровеносная система энергетики двадцать первого века», — заявил докладчик на итоговой пресс-конференции. Пилотный запуск пройдёт в 12 высокопроизводительных транзитных коридорах.`
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
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['Полупроводники', 'Фотоника', 'ИИ-чипы'],
    aiSummary: [
      'Инженеры подтвердили скорость монолитных фотонных интерфейсов 3.2 Тбит/с на один сокет.',
      'Тепловыделение чипа снизилось на 74% по сравнению с медными проводниками при пиковой нагрузке.',
      'Производители ТВ-процессоров и серверов уже начали испытания образцов для потребительских устройств.'
    ],
    fullContent: `САНТА-КЛАРА — Консорциум материаловедческих институтов и производителей полупроводников представил результаты тестов оптических трансиверов, созданных на стандартных 300-мм кремниевых линиях.\n\nНаправляя лазерные импульсы через микроскопические волноводы прямо на кристалле, архитектура обходит тепловые и емкостные ограничения традиционной электроники. При непрерывных 5000-часовых испытаниях фотонные кристаллы обеспечивали безупречную передачу данных с минимальным расходом энергии.\n\nОжидается, что разработка значительно повысит эффективность устройств — от дата-центров до компактных телеприставок и смарт-телевизоров.`
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
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Экономика', 'Рынки', 'Центробанк'],
    aiSummary: [
      'Согласованные заявления регуляторов снизили резервную нагрузку для промышленных производителей.',
      'Фондовые индексы в Токио, Франкфурте и Нью-Йорке отреагировали уверенным ростом котировок.',
      'Доходности краткосрочных облигаций стабилизировались в преддверии нового финансового квартала.'
    ],
    fullContent: `НЬЮ-ЙОРК И ФРАНКФУРТ — Мировые биржевые индексы продемонстрировали заметный подъём после синхронных заявлений крупнейших центральных банков мира.\n\nКорректировка норм покрытия ликвидности направлена на поддержку инвестиций в тяжёлое автоматизированное производство и транспортное машиностроение. Объёмы торгов с утра выросли, а акции технологического и индустриального сектора возглавили список лидеров роста.\n\nАналитики отмечают, что решение свидетельствует об уверенности регуляторов в устойчивости международных цепочек поставок.`
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
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Биология', 'Океан', 'Глубоководные исследования'],
    aiSummary: [
      'Автономные роботы нанесли на карту ранее неизвестные гидротермальные шпили высотой до 40 метров.',
      'Генетический анализ проб воды выявил более 30 штаммов уникальных хемосинтетических микроорганизмов.',
      'Собранные массивы данных переданы в открытый международный геофизический репозиторий.'
    ],
    fullContent: `ВЕЛЛИНГТОН — Работая на глубинах свыше 6200 метров, международная океанографическая группа описала масштабный кластер действующих геотермальных источников на тектоническом стыке Южно-Марианского хребта.\n\nАкустические эхолоты и высокоточная оптика подводных аппаратов зафиксировали процветающие сообщества живых организмов, полностью независимые от солнечного света. Организмы получают энергию за счёт хемосинтеза минеральных потоков при температуре до 340 градусов Цельсия.\n\nБиохимики экспедиции подчеркивают, что обнаруженные ферменты помогут изучить механизмы клеточной устойчивости к экстремальному давлению и температуре.`
  },
  {
    id: 'nr-508-ru',
    channelNumber: 508,
    title: 'Космическое агентство одобрило запуск тяжелого грузового челнока к орбитальной станции',
    category: 'Science',
    isBreaking: false,
    source: 'Аэрокосмический отдел NewsRule',
    timestamp: '2 ч назад',
    readTime: '3 мин чтения',
    priorityScore: 83,
    imageUrl: 'https://images.unsplash.com/photo-1517976487507-59a5e11d6869?auto=format&fit=crop&w=1200&q=80',
    tags: ['Космос', 'Орбита', 'Технологии'],
    aiSummary: [
      'Огневые испытания двигателей и проверка авионики на приморском космодроме завершены на отлично.',
      'Челнок доставит 8.4 тонны полезной нагрузки, включая модули замкнутого жизнеобеспечения.',
      'Автоматическая стыковка на орбите запланирована через 22 часа после старта ракеты.'
    ],
    fullContent: `МЫС КАНАВЕРАЛ — Центр управления полётами подтвердил успешное завершение всех проверок готовности тяжелого автономного грузового корабля к очередному орбитальному рейсу.\n\nАппарат доставит критически важное оборудование для расширения исследовательских возможностей орбитальной станции. В грузовом отсеке размещены кристаллизационные камеры для фармакологии и новейшие регенераторы атмосферы.\n\nМетеорологи дают свыше 90% вероятности благоприятной погоды в стартовое окно, инженеры приступили к заключительным операциям заправки баков.`
  },
  {
    id: 'nr-609-ru',
    channelNumber: 609,
    title: 'Финал континентального кубка: фантастический камбэк приносит победу аутсайдерам',
    category: 'Sports',
    isBreaking: false,
    source: 'Спортивная арена NewsRule',
    timestamp: '3 ч назад',
    readTime: '3 мин чтения',
    priorityScore: 80,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    tags: ['Спорт', 'Финал', 'Победа'],
    aiSummary: [
      'В решающей четверти команда ликвидировала отставание в 14 очков за последние 7 минут матча.',
      'Тактическая смена опеки и прессинг по всей площадке сломили фаворитов турнира.',
      'Более 75 тысяч болельщиков на трибунах шумно праздновали первый в истории титул клуба.'
    ],
    fullContent: `МАДРИД — В одном из самых драматичных спортивных финалов последних лет аутсайдеры турнира продемонстрировали железную выдержку и завоевали заветный Континентальный кубок.\n\nУступая двузначное число очков в концовке встречи, главный тренер перешёл на зонный прессинг, что привело к череде быстрых перехватов. Победный бросок был забит за 4.2 секунды до сирены со средней дистанции с отскоком от щита.\n\n«Мы верили в командную дисциплину до последней секунды», — отметил самый ценный игрок финала во время церемонии награждения.`
  },
  {
    id: 'nr-710-ru',
    channelNumber: 710,
    title: 'Международный киноархив завершил реставрацию шедевра немого кино 1920-х годов с помощью ИИ',
    category: 'Entertainment',
    isBreaking: false,
    source: 'Культура NewsRule',
    timestamp: '4 ч назад',
    readTime: '4 мин чтения',
    priorityScore: 75,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    tags: ['Кино', 'Реставрация', 'Культура'],
    aiSummary: [
      'Повреждённые нитратные киноплёнки были покадрово восстановлены нейросетевыми моделями коррекции эмульсии.',
      'Музыкальное сопровождение заново записано симфоническим оркестром по оригинальным партитурам 1926 года.',
      'Мировая премьера отреставрированной 4K-версии состоится на открытии Венецианского кинофестиваля.'
    ],
    fullContent: `БОЛОНЬЯ — Киноведы и специалисты по реставрации завершили многолетний труд по спасению шедевра эпохи немого кинематографа, ранее считавшегося практически утраченным.\n\nС помощью сканирования в разрешении 8K и нейросетевых фильтров удалось воссоздать утраченные фрагменты эмульсии, сохранив натуральное пленочное зерно и оптические свойства объективов той эпохи. Утерянные титры были восстановлены по архивным производственным записям режиссера.\n\nЗавершенная работа открывает зрителям кристально чистый взгляд на истоки мирового кинематографа.`
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
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Enerji', 'Qlobal Sammit', 'İnfrastruktur'],
    aiSummary: [
      '64 ölkənin nümayəndələri Vahid Şəbəkə Protokolu 2030-u təsdiqləyərək aşağı gecikməli enerji ötürülməsini təmin etdilər.',
      'Tətbiqin böyük qitə şəbəkələrində kommersiya ötürmə itkilərini 28%-dək azaldacağı gözlənilir.',
      'İnfrastrukturun tam sinxronizasiyasının ilkin mərhələsi gələn ilin üçüncü rübünə planlaşdırılır.'
    ],
    fullContent: `CENEVRƏ — 64 üzv ölkəni təmsil edən nümayəndə heyətləri Beynəlxalq Enerji Forumunda universal enerji standartları üzrə tarixi konsensus əldə etdilər.\n\nVahid Şəbəkə Protokolu (UGP-30) adlanan saziş mərkəzsizləşdirilmiş anbar klasterləri vasitəsilə avtomatik tezlik balanslaşdırmasını tələb edir. İclasda iştirak edən enerji analitikləri qeyd etdilər ki, bu standart pik saatlarda elektrik enerjisinin regionlararası səmərəli bölüşdürülməsinə yol açacaq.\n\n«Bu gün biz iyirmi birinci əsrin enerji paylanmasının rəqəmsal və fiziki qan dövranı sistemini qururuq», — deyə sammitin yekun mətbuat konfransında bildirildi.`
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
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['Yarımkeçiricilər', 'Fotonika', 'AI Prosessorlar'],
    aiSummary: [
      'Mühəndislər hər soket üzrə saniyədə 3.2 Terabit sürətlə işləyən monolitik silisium optik birləşmələri sınaqdan keçirdilər.',
      'İstilik ayrılması ənənəvi mis naqillərlə müqayisədə davamlı yük altında 74% azaldı.',
      'Server və Smart TV prosessor istehsalçıları yeni çipləri sınaqdan keçirməyə başlayıblar.'
    ],
    fullContent: `SANTA KLARA — Materialşünaslıq institutları və yarımkeçirici zavodlarının konsorsiumu standart 300 mm CMOS xətlərində istehsal olunan optik ötürücülərin əməliyyat göstəricilərini açıqladı.\n\nLazer dalğalarını birbaşa mikroskopik silisium dalğaboyları ilə çip üzərindən yönləndirən yeni dizayn sıx hesablama klasterlərini ləngidən istilik və gecikmə problemlərini aradan qaldırır.\n\nBu texnologiyanın həm böyük məlumat mərkəzləri, həm də kompakt enerji qənaətli televizor prosessorları üçün mühüm irəliləyiş olacağı vurğulanır.`
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
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    tags: ['İqtisadiyyat', 'Bazarlar', 'Mərkəzi Bank'],
    aiSummary: [
      'Tənzimləyici orqanlar sənaye istehsalçıları üçün ehtiyat tələblərini yüngülləşdirdi.',
      'Tokio, Frankfurt və Nyu-York birjalarında qərardan sonra müsbət dinamika müşahidə olundu.',
      'Qısamüddətli dövlət istiqrazlarının gəlirliliyi yeni rüb öncəsi sabitləşdi.'
    ],
    fullContent: `NYU-YORK VƏ FRANKFURT — Qlobal qiymətli kağızlar indeksləri aparıcı mərkəzi bankların razılaşdırılmış pul-kredit siyasəti bəyanatlarından sonra yüksəliş qeydə aldı.\n\nQərarlar avtomatlaşdırılmış sənaye istehsalı və nəqliyyat sektoruna yönələn investisiyaları dəstəkləməyi hədəfləyir. Texnologiya və sənaye səhmləri ticarət həcmində liderlik etdi.`
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
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Dəniz Biologiyası', 'Kəşfiyyat', 'Dərin Dəniz'],
    aiSummary: [
      'Avtonom robot aparatlar 40 metr hündürlüyə çatan hidrotermal strukturları xəritələşdirdi.',
      'Su nümunələrinin ilkin genetik analizi 30-dan çox namizəd kemosintetik mikrob ştammı müəyyən etdi.',
      'Məlumatlar qlobal okeanoqrafik araşdırmalar üçün açıq elmi repozitoriyada saxlanılacaq.'
    ],
    fullContent: `VELLİNQTON — 6200 metrdən çox dərinlikdə fəaliyyət göstərən beynəlxalq okeanoqrafiya gəmisi Cənubi Mariana silsiləsində fəal hidrotermal mineral strukturlar klasterini qeydə aldı.\n\nSualtı optik görüntülər günəş şüalarından tamamilə asılı olmayan zəngin ekosistemləri aşkar etdi. Canlılar 340 dərəcə istilikdə çıxan mineral axınların kemosintezi ilə qidalanır.`
  },
  {
    id: 'nr-508-az',
    channelNumber: 508,
    title: 'Kosmik Agentlik Beynəlxalq Stansiyanı Təchiz Etmək Üçün Yük Gəmisinin Uçuşunu Təsdiqlədi',
    category: 'Science',
    isBreaking: false,
    source: 'NewsRule Aerokosmik',
    timestamp: '2 saat əvvəl',
    readTime: '3 dəq oxuma',
    priorityScore: 83,
    imageUrl: 'https://images.unsplash.com/photo-1517976487507-59a5e11d6869?auto=format&fit=crop&w=1200&q=80',
    tags: ['Kosmos', 'Aerokosmik', 'Orbital'],
    aiSummary: [
      'Sahil buraxılış məntəqəsində mühərrik və avionika sınaqları uğurla başa çatdı.',
      'Avtonom gəmi stansiyaya 8.4 ton elmi avadanlıq və həyat təminatı modulları çatdıracaq.',
      'Orbitə çıxdıqdan 22 saat sonra avtomatik qovuşma və maqnit birləşməsi nəzərdə tutulub.'
    ],
    fullContent: `KAP KANAVERAL — Uçuş İdarəetmə Mərkəzi ağır avtonom logistika gəmisinin bütün uçuş hazırlığı sınaqlarını tamamladığını təsdiqlədi.\n\nGəmi aşağı Yer orbitindəki elmi laboratoriyalar üçün əvəzolunmaz hissələri və mikromaqnit mühitdə farmasevtik kristalların yetişdirilməsi üçün təcrübə kameralarını daşıyır.`
  },
  {
    id: 'nr-609-az',
    channelNumber: 609,
    title: 'Çempionat Finalı: Əzəmətli Qələbə ilə Kubok Tarixi Sahibini Tapdı',
    category: 'Sports',
    isBreaking: false,
    source: 'NewsRule İdman Meydanı',
    timestamp: '3 saat əvvəl',
    readTime: '3 dəq oxuma',
    priorityScore: 80,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    tags: ['Çempionat', 'İdman', 'Qələbə'],
    aiSummary: [
      'Gərgin son hissədə komanda son 7 dəqiqədə 14 xallıq fərqi aradan qaldırdı.',
      'Taktiki müdafiə dəyişikliyi turnirin favoritini təzyiq altında saxladı.',
      'Stadiondakı 75 mindən çox azarkeş klubun ilk çempionluğunu təntənə ilə qeyd etdi.'
    ],
    fullContent: `MADRİD — Son illərin ən dramatik idman finallarından birində komanda əzmkar oyun nümayiş etdirərək Qitə Kubokunu başı üzərinə qaldırdı.\n\nQələbə topu oyunun bitməsinə cəmi 4.2 saniyə qalmış qeydə alındı. Mükafatlandırma mərasimində finalın ən dəyərli oyunçusu komanda intizamına inamın qələbə gətirdiyini vurğuladı.`
  },
  {
    id: 'nr-710-az',
    channelNumber: 710,
    title: 'Beynəlxalq Film Arxivi 1920-ci İllərin Şah Əsərini Süni İntellektlə Bərpa Etdi',
    category: 'Entertainment',
    isBreaking: false,
    source: 'NewsRule Mədəniyyət',
    timestamp: '4 saat əvvəl',
    readTime: '4 dəq oxuma',
    priorityScore: 75,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    tags: ['Kino', 'Bərpa', 'Mədəniyyət'],
    aiSummary: [
      'Zədələnmiş lentlər neyron şəbəkə modelləri ilə kadrbə-kadr tam bərpa edildi.',
      'Musiqi müşayiəti 1926-cı ilin orijinal notları əsasında 60 nəfərlik orkestr tərəfindən yenidən yazıldı.',
      '4K bərpa edilmiş nüsxənin qlobal premyerası Venesiya Kino Qalasında keçiriləcək.'
    ],
    fullContent: `BOLONYA — Kino tarixçiləri və arxiv mütəxəssisləri səssiz kino dövrünün şah əsərini qoruyub saxlamaq üçün böyük nailiyyət əldə etdilər.\n\n8K skanlama və maşın öyrənməsi modelləri orijinal kino dənəvərliyini və optik linza xüsusiyyətlərini qoruyaraq itirilmiş detalları canlandırdı.`
  }
];

export const MOCK_NEWS_ARTICLES = MOCK_NEWS_ARTICLES_EN;

export function getMockArticlesForLanguage(lang: AppLanguage): NewsArticle[] {
  if (lang === 'ru') return MOCK_NEWS_ARTICLES_RU;
  if (lang === 'az') return MOCK_NEWS_ARTICLES_AZ;
  return MOCK_NEWS_ARTICLES_EN;
}
