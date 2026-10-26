import { DatasetItem } from '../types';

export const BENCHMARK_DATASET: DatasetItem[] = [
  // --- FAKE NEWS TRAINING SET ---
  {
    id: 'fake-1',
    headline: 'Government announces free laptops for every college student in India.',
    label: 'FAKE',
    category: 'Government & Policy',
    source: 'Viral WhatsApp Scheme',
    split: 'train'
  },
  {
    id: 'fake-2',
    headline: 'Government announces free smartphones for every citizen under new digital program.',
    label: 'FAKE',
    category: 'Government & Policy',
    source: 'Telegram Clickbait Channel',
    split: 'train'
  },
  {
    id: 'fake-3',
    headline: 'Drinking boiled garlic water completely cures all viral infections within 24 hours.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'MiracleHealthBlog',
    split: 'train'
  },
  {
    id: 'fake-4',
    headline: 'Secret NASA documents prove moon landing was staged in Hollywood soundstage studio.',
    label: 'FAKE',
    category: 'Entertainment & Viral',
    source: 'TruthSeekers Underground',
    split: 'train'
  },
  {
    id: 'fake-5',
    headline: 'Central Bank warns all paper currency will be declared worthless starting next Monday midnight.',
    label: 'FAKE',
    category: 'Politics',
    source: 'FinancialPanic Forum',
    split: 'train'
  },
  {
    id: 'fake-6',
    headline: 'Billionaire tech mogul secretly buys small European country and dissolves all taxes for followers.',
    label: 'FAKE',
    category: 'Entertainment & Viral',
    source: 'CelebrityInsider Gossip',
    split: 'train'
  },
  {
    id: 'fake-7',
    headline: 'Scientists discover ancient frozen dragon preserved inside Antarctic ice core sample.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'CryptoZoology Daily',
    split: 'train'
  },
  {
    id: 'fake-8',
    headline: 'Ministry of Finance offering immediate 50,000 cash grant to anyone who registers phone number.',
    label: 'FAKE',
    category: 'Government & Policy',
    source: 'Phishing SMS Alert',
    split: 'train'
  },
  {
    id: 'fake-9',
    headline: 'Drinking hot lemon water kills cancer cells ten thousand times stronger than chemotherapy.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'AlternativeHealing News',
    split: 'train'
  },
  {
    id: 'fake-10',
    headline: 'Secret military base underneath Sahara desert housing extraterrestrial spacecraft confirmed by whistleblower.',
    label: 'FAKE',
    category: 'World',
    source: 'AlienDisclosures.org',
    split: 'train'
  },
  {
    id: 'fake-11',
    headline: 'Major telecom operator giving away free 500GB internet data recharge to commemorate anniversary.',
    label: 'FAKE',
    category: 'Technology',
    source: 'Scam Social Post',
    split: 'train'
  },
  {
    id: 'fake-12',
    headline: 'Pope Francis endorses billionaire presidential candidate in unprecedented live television broadcast.',
    label: 'FAKE',
    category: 'Politics',
    source: 'WTOE 5 News Hoax',
    split: 'train'
  },
  {
    id: 'fake-13',
    headline: 'United Nations plans secret takeover of private citizen land across thirty member states.',
    label: 'FAKE',
    category: 'World',
    source: 'Sovereign Liberty Forum',
    split: 'train'
  },
  {
    id: 'fake-14',
    headline: 'Shocking miracle plant eliminates diabetes in just two days without any medication doctors stunned.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'Clickbait Miracle Ads',
    split: 'train'
  },
  {
    id: 'fake-15',
    headline: 'Eiffel Tower set to be demolished next year to make room for luxury hotel development.',
    label: 'FAKE',
    category: 'Entertainment & Viral',
    source: 'Satire Daily Wire',
    split: 'train'
  },
  {
    id: 'fake-16',
    headline: 'Supreme court judge secretly caught accepting suitcase filled with gold bars from foreign cartel.',
    label: 'FAKE',
    category: 'Politics',
    source: 'Conspiracy Tribune',
    split: 'train'
  },
  {
    id: 'fake-17',
    headline: 'Government introducing mandatory chip implants for every school student before upcoming semester.',
    label: 'FAKE',
    category: 'Government & Policy',
    source: 'DystopianAlert Post',
    split: 'train'
  },
  {
    id: 'fake-18',
    headline: 'Drinking baking soda solution neutralizes all radiation poisoning and detoxifies human organs instantly.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'HolisticRemedy Hub',
    split: 'train'
  },
  {
    id: 'fake-19',
    headline: 'Leaked documents prove major airline fuels planes with mind-control chemicals sprayed in clouds.',
    label: 'FAKE',
    category: 'World',
    source: 'Chemtrail Chronicles',
    split: 'train'
  },
  {
    id: 'fake-20',
    headline: 'President signs emergency executive order banning all gasoline vehicles starting next month.',
    label: 'FAKE',
    category: 'Government & Policy',
    source: 'RageBait Network',
    split: 'train'
  },
  {
    id: 'fake-21',
    headline: 'Ancient pyramid discovered deep in Bermuda Triangle powered by mysterious perpetual energy crystals.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'MysticAtlas Blog',
    split: 'train'
  },
  {
    id: 'fake-22',
    headline: 'Smartphone batteries secretly recording audio even when phones are powered completely off.',
    label: 'FAKE',
    category: 'Technology',
    source: 'TechScare Rumors',
    split: 'train'
  },
  {
    id: 'fake-23',
    headline: 'Prime Minister secretly fled country in private jet following national financial collapse.',
    label: 'FAKE',
    category: 'Politics',
    source: 'Disinformation Telegram',
    split: 'train'
  },
  {
    id: 'fake-24',
    headline: 'Celebrity chef reveals secret spice combination that melts forty pounds of body fat in one week.',
    label: 'FAKE',
    category: 'Entertainment & Viral',
    source: 'DietMiracle Clickbait',
    split: 'train'
  },
  {
    id: 'fake-25',
    headline: 'World Health Organization mandates all citizens surrender pets due to imaginary biohazard danger.',
    label: 'FAKE',
    category: 'World',
    source: 'PanicFeed Wire',
    split: 'train'
  },
  {
    id: 'fake-26',
    headline: 'Astronomers discover giant planet heading directly toward Earth set to collide in ninety days.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'Doomsday Watcher',
    split: 'train'
  },
  {
    id: 'fake-27',
    headline: 'National lottery winner discovered to be artificial intelligence algorithm programmed by bank executives.',
    label: 'FAKE',
    category: 'Technology',
    source: 'ConspiracyHub',
    split: 'train'
  },
  {
    id: 'fake-28',
    headline: 'Government giving away free electric scooters to all university graduates who fill survey form.',
    label: 'FAKE',
    category: 'Government & Policy',
    source: 'SurveyScam Net',
    split: 'train'
  },

  // --- REAL NEWS TRAINING SET ---
  {
    id: 'real-1',
    headline: 'Federal Reserve leaves benchmark interest rates unchanged following two-day monetary policy meeting.',
    label: 'REAL',
    category: 'Politics',
    source: 'Reuters Financial',
    split: 'train'
  },
  {
    id: 'real-2',
    headline: 'NASA James Webb Space Telescope captures unprecedented infrared views of distant spiral galaxy.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'Associated Press',
    split: 'train'
  },
  {
    id: 'real-3',
    headline: 'Ministry of Education announces revised syllabus and examination timetable for secondary schools.',
    label: 'REAL',
    category: 'Government & Policy',
    source: 'Official Press Information Bureau',
    split: 'train'
  },
  {
    id: 'real-4',
    headline: 'World Health Organization issues updated clinical guidelines for monitoring influenza variants.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'WHO Official Bulletin',
    split: 'train'
  },
  {
    id: 'real-5',
    headline: 'European Union leaders approve bilateral trade and energy cooperation agreement during Brussels summit.',
    label: 'REAL',
    category: 'World',
    source: 'BBC News International',
    split: 'train'
  },
  {
    id: 'real-6',
    headline: 'Semiconductor manufacturer reports quarterly earnings growth driven by data center infrastructure demand.',
    label: 'REAL',
    category: 'Technology',
    source: 'Bloomberg Technology',
    split: 'train'
  },
  {
    id: 'real-7',
    headline: 'Parliamentary committee conducts public hearing on proposed national consumer protection regulations.',
    label: 'REAL',
    category: 'Politics',
    source: 'Parliamentary Records',
    split: 'train'
  },
  {
    id: 'real-8',
    headline: 'Astronomers observe gravitational wave signal originating from collision of two neutron stars.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'Nature Physics Journal',
    split: 'train'
  },
  {
    id: 'real-9',
    headline: 'Department of Transportation allocates federal grants for bridge rehabilitation and highway safety.',
    label: 'REAL',
    category: 'Government & Policy',
    source: 'GovPress Wire',
    split: 'train'
  },
  {
    id: 'real-10',
    headline: 'United Nations Climate Summit concludes with multilateral pledge to expand renewable energy capacity.',
    label: 'REAL',
    category: 'World',
    source: 'The Guardian Environment',
    split: 'train'
  },
  {
    id: 'real-11',
    headline: 'Pharmaceutical company initiates Phase 3 randomized clinical trial for novel malaria vaccine candidate.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'The Lancet Medical Review',
    split: 'train'
  },
  {
    id: 'real-12',
    headline: 'Cybersecurity agency alerts public to verify suspicious email links and enable multi-factor authentication.',
    label: 'REAL',
    category: 'Technology',
    source: 'CISA Advisory Bulletin',
    split: 'train'
  },
  {
    id: 'real-13',
    headline: 'Supreme Court hears oral arguments in landmark dispute concerning patent eligibility for algorithms.',
    label: 'REAL',
    category: 'Politics',
    source: 'Legal Daily Reporter',
    split: 'train'
  },
  {
    id: 'real-14',
    headline: 'Automotive manufacturer announces capital investment to expand electric vehicle battery assembly facility.',
    label: 'REAL',
    category: 'Technology',
    source: 'Financial Times',
    split: 'train'
  },
  {
    id: 'real-15',
    headline: 'Weather service issues regional flood warnings as seasonal monsoon rains intensify across coastal areas.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'National Meteorological Agency',
    split: 'train'
  },
  {
    id: 'real-16',
    headline: 'Prime Minister addresses joint diplomatic press conference with visiting delegation from Japan.',
    label: 'REAL',
    category: 'World',
    source: 'Diplomatic Press Corps',
    split: 'train'
  },
  {
    id: 'real-17',
    headline: 'Central Bank publishes annual economic survey projecting moderate GDP growth and controlled inflation.',
    label: 'REAL',
    category: 'Politics',
    source: 'Reserve Bank Bulletin',
    split: 'train'
  },
  {
    id: 'real-18',
    headline: 'Marine biologists document recovery of coral reef ecosystems following conservation program.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'Marine Ecology Progress',
    split: 'train'
  },
  {
    id: 'real-19',
    headline: 'City council approves municipal budget expanding public library hours and park maintenance.',
    label: 'REAL',
    category: 'Government & Policy',
    source: 'Civic Chronicle',
    split: 'train'
  },
  {
    id: 'real-20',
    headline: 'Space agency successfully completes static fire test for next-generation orbital launch booster.',
    label: 'REAL',
    category: 'Technology',
    source: 'Aerospace Weekly',
    split: 'train'
  },
  {
    id: 'real-21',
    headline: 'Public health ministry schedules nationwide immunization drive targeting pediatric respiratory illnesses.',
    label: 'REAL',
    category: 'Government & Policy',
    source: 'Health Ministry Spokesperson',
    split: 'train'
  },
  {
    id: 'real-22',
    headline: 'International energy agency releases forecast on global solar installation growth and supply chains.',
    label: 'REAL',
    category: 'World',
    source: 'IEA Global Energy Report',
    split: 'train'
  },
  {
    id: 'real-23',
    headline: 'University research team synthesizes high-efficiency thermoelectric material for waste heat recovery.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'Science Advances',
    split: 'train'
  },
  {
    id: 'real-24',
    headline: 'Telecom regulatory authority issues framework regarding spectrum allocation for rural broadband.',
    label: 'REAL',
    category: 'Technology',
    source: 'Telecom Regulatory Gazette',
    split: 'train'
  },
  {
    id: 'real-25',
    headline: 'Archaeologists uncover well-preserved Roman mosaic pavement during urban drainage excavation.',
    label: 'REAL',
    category: 'Entertainment & Viral',
    source: 'Antiquity Archaeological Journal',
    split: 'train'
  },
  {
    id: 'real-26',
    headline: 'Finance Minister presents fiscal policy review before parliament outlining revenue targets.',
    label: 'REAL',
    category: 'Politics',
    source: 'Official Parliamentary Broadcast',
    split: 'train'
  },
  {
    id: 'real-27',
    headline: 'World Health Organization validates elimination of endemic trachoma in two South Asian nations.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'WHO Geneva Press',
    split: 'train'
  },
  {
    id: 'real-28',
    headline: 'Postal service introduces new commemorative stamp series honoring pioneering women scientists.',
    label: 'REAL',
    category: 'Government & Policy',
    source: 'National Postal Service Gazette',
    split: 'train'
  },

  // --- FAKE NEWS TEST SET (For Evaluation) ---
  {
    id: 'fake-test-1',
    headline: 'Government gives free electric cars to all citizens who forward message to twenty contacts.',
    label: 'FAKE',
    category: 'Government & Policy',
    source: 'Chain Message Hoax',
    split: 'test'
  },
  {
    id: 'fake-test-2',
    headline: 'Drinking colloidal silver guarantees complete immunity from all bacterial and viral diseases.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'QuackMedical Forum',
    split: 'test'
  },
  {
    id: 'fake-test-3',
    headline: 'Scientists confirm Earth will experience total darkness for seven consecutive days next month.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'Viral Hoax Network',
    split: 'test'
  },
  {
    id: 'fake-test-4',
    headline: 'Secret royal family vault raided by underground team discovering proof of vampire heritage.',
    label: 'FAKE',
    category: 'Entertainment & Viral',
    source: 'Tabloid Fiction Post',
    split: 'test'
  },
  {
    id: 'fake-test-5',
    headline: 'Central Bank announcing cancellation of all personal bank loans and credit debts today.',
    label: 'FAKE',
    category: 'Government & Policy',
    source: 'DebtForgiveness Hoax Site',
    split: 'test'
  },
  {
    id: 'fake-test-6',
    headline: 'Miracle vinegar concoction eliminates cataract surgery requirements in just forty eight hours.',
    label: 'FAKE',
    category: 'Science & Health',
    source: 'Fake Cure Daily',
    split: 'test'
  },
  {
    id: 'fake-test-7',
    headline: 'Prime Minister signs secret treaty handing over national water supply to private foreign conglomerate.',
    label: 'FAKE',
    category: 'Politics',
    source: 'Disinfo Blog',
    split: 'test'
  },

  // --- REAL NEWS TEST SET (For Evaluation) ---
  {
    id: 'real-test-1',
    headline: 'Bank of England maintains official policy interest rate at five percent following committee vote.',
    label: 'REAL',
    category: 'Politics',
    source: 'Reuters UK',
    split: 'test'
  },
  {
    id: 'real-test-2',
    headline: 'NASA engineers complete vibration testing on next deep space planetary exploration probe.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'NASA Jet Propulsion Lab',
    split: 'test'
  },
  {
    id: 'real-3',
    headline: 'Health authority confirms seasonal vaccination clinics scheduled to open across metropolitan clinics.',
    label: 'REAL',
    category: 'Government & Policy',
    source: 'Public Health Agency Bulletin',
    split: 'test'
  },
  {
    id: 'real-test-4',
    headline: 'United Nations Security Council adopts resolution extending mandate for regional peacekeeping mission.',
    label: 'REAL',
    category: 'World',
    source: 'UN Press Centre',
    split: 'test'
  },
  {
    id: 'real-test-5',
    headline: 'Technology consortium establishes standardized benchmark protocol for cloud data centers energy metrics.',
    label: 'REAL',
    category: 'Technology',
    source: 'IEEE Spectrum',
    split: 'test'
  },
  {
    id: 'real-test-6',
    headline: 'Environmental agency issues advisory on particulate matter levels following regional dust storm.',
    label: 'REAL',
    category: 'Science & Health',
    source: 'EPA Regional Bulletin',
    split: 'test'
  },
  {
    id: 'real-test-7',
    headline: 'Transportation ministry inaugurates modernized high-speed railway corridor connecting provincial capitals.',
    label: 'REAL',
    category: 'Government & Policy',
    source: 'National Transport Bureau',
    split: 'test'
  }
];
