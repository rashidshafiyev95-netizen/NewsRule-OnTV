import { NewsArticle } from '../types/news';

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
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
