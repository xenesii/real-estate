import { BankOffer, NeighborhoodGuide } from '../types';

export const INITIAL_BANK_OFFERS: BankOffer[] = [
  {
    id: 'bank-nlb',
    bankName: 'NLB Banka Kosovë',
    logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=150&auto=format&fit=crop&q=80',
    country: 'Kosovo',
    minInterestRate: 3.79,
    maxInterestRate: 4.20,
    fixedPeriodYears: 3,
    maxTermYears: 25,
    maxFinancingPercent: 85,
    administrativeFeePercent: 0.5,
    earlyRepaymentFee: '0% pas vitit të 3-të',
    highlights: [
      'Normë fikse interesi për 3 vitet e para',
      'Miratim i shpejtë brenda 48 orëve',
      'Financim i posaçëm edhe për diasporën me kontrata pune në Zvicër/BE'
    ],
    eligibilityRequirements: [
      'Paga mujore neto minimale: €450 (për banorë) ose €2,200 (për diasporë)',
      'Kontratë e rregullt pune me afat të pacaktuar',
      'Hipotekë mbi patundshmërinë e blerë me vlerë mbulimi 120%'
    ],
    contactEmail: 'kredia@nlb-kos.com',
    contactPhone: '+383 38 240 240'
  },
  {
    id: 'bank-teb',
    bankName: 'TEB Sh.A. (BNP Paribas)',
    logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=150&auto=format&fit=crop&q=80',
    country: 'Kosovo',
    minInterestRate: 3.89,
    maxInterestRate: 4.35,
    fixedPeriodYears: 5,
    maxTermYears: 25,
    maxFinancingPercent: 80,
    administrativeFeePercent: 0.5,
    earlyRepaymentFee: '0% për pagesa të pjesshme deri €10,000 në vit',
    highlights: [
      'Opsion me 5 vite normë fikse interesi',
      'Kartelë Starcard me limit të veçantë për mobilim',
      'Mundësi bashkë-huamarrësi me anëtarë të familjes'
    ],
    eligibilityRequirements: [
      'Paga e transferuar përmes llogarisë në TEB',
      'Përvojë pune minimale 6 muaj tek punëdhënësi aktual',
      'Raport pozitiv nga Regjistri Kreditor i Kosovës (RKK)'
    ],
    contactEmail: 'info@teb-kos.com',
    contactPhone: '+383 38 230 000'
  },
  {
    id: 'bank-raiffeisen-ks',
    bankName: 'Raiffeisen Bank Kosovë',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80',
    country: 'Kosovo',
    minInterestRate: 3.85,
    maxInterestRate: 4.25,
    fixedPeriodYears: 3,
    maxTermYears: 25,
    maxFinancingPercent: 85,
    administrativeFeePercent: 0.4,
    earlyRepaymentFee: 'Pa komision pas periudhës fikse',
    highlights: [
      'Programi "Kredia e Gjelbër" me zbritje interesi për ndërtesa me klasë energjie A/B',
      'Aplikim 100% online përmes RaiConnect me video-thirrje',
      'Përfshin vlerësimin falas të patundshmërisë nga vlerësues të licencuar'
    ],
    eligibilityRequirements: [
      'Të ardhura të dëshmueshme familjare mbi €600/muaj',
      'Marrëveshje paraprake e noterizuar e shitblerjes',
      'Sigurimi i jetës dhe pronës'
    ],
    contactEmail: 'individual@raiffeisen-kosovo.com',
    contactPhone: '+383 38 222 222'
  },
  {
    id: 'bank-bkt',
    bankName: 'Banka Kombëtare Tregtare (BKT)',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&auto=format&fit=crop&q=80',
    country: 'Albania',
    minInterestRate: 4.10,
    maxInterestRate: 4.85,
    fixedPeriodYears: 3,
    maxTermYears: 30,
    maxFinancingPercent: 80,
    administrativeFeePercent: 0.6,
    earlyRepaymentFee: 'Sipas ligjit për kredinë konsumatore në Shqipëri',
    highlights: [
      'Financim deri në 30 vite për blerje banese në Shqipëri dhe Kosovë',
      'Pako speciale për blerje apartamentesh në bregdet (Durrës, Vlorë, Sarandë)',
      'Mundësi financimi në Monedhën Lek (ALL) ose Euro (EUR)'
    ],
    eligibilityRequirements: [
      'Mosha maksimale në përfundim të kredisë: 68 vjeç',
      'Kontratë pune e deklaruar me sigurime shoqërore',
      'Hipotekë e rangut të parë në ASHK (Kadastër)'
    ],
    contactEmail: 'callcenter@bkt.com.al',
    contactPhone: '+355 4 2266 288'
  },
  {
    id: 'bank-credins',
    bankName: 'Credins Bank',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
    country: 'Albania',
    minInterestRate: 4.25,
    maxInterestRate: 4.95,
    fixedPeriodYears: 2,
    maxTermYears: 25,
    maxFinancingPercent: 75,
    administrativeFeePercent: 0.7,
    earlyRepaymentFee: '1% brenda 3 viteve të para',
    highlights: [
      'Mbështetje e veçantë për investitorët nga diaspora dhe të vetëpunësuarit',
      'Procedura fleksibile për vlerësimin e të ardhurave nga biznesi privat',
      'Kombinim me kredi rinovimi ose arredimi'
    ],
    eligibilityRequirements: [
      'Dëshmi e të ardhurave për 12 muajt e fundit',
      'Faturë tatimore për të vetëpunësuar',
      'Çertifikatë pronësie e pastër nga çdo barrë'
    ],
    contactEmail: 'info@bankacredins.com',
    contactPhone: '+355 4 5353 000'
  },
  {
    id: 'bank-intesa',
    bankName: 'Intesa Sanpaolo Bank Albania',
    logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=150&auto=format&fit=crop&q=80',
    country: 'Albania',
    minInterestRate: 3.99,
    maxInterestRate: 4.60,
    fixedPeriodYears: 3,
    maxTermYears: 25,
    maxFinancingPercent: 80,
    administrativeFeePercent: 0.5,
    earlyRepaymentFee: '0% për ripagim me të ardhura vetjake',
    highlights: [
      'Pjesë e grupit prestigjioz italian Intesa Sanpaolo',
      'Norma preferenciale për pasuri të paluajtshme të certifikuara ekologjike',
      'Këshillim financiar i personalizuar për blerësit e banesës së parë'
    ],
    eligibilityRequirements: [
      'Të ardhura të rregullta bankare',
      'Kësti mujor të mos tejkalojë 40% të të ardhurave neto mujore',
      'Raporti LTV (Loan-to-Value) maksimal 80%'
    ],
    contactEmail: 'info@intesasanpaolobank.al',
    contactPhone: '+355 4 2276 000'
  }
];

export const INITIAL_NEIGHBORHOODS: NeighborhoodGuide[] = [
  {
    id: 'neigh-arberia',
    city: 'Prishtinë',
    country: 'Kosovo',
    name: 'Arbëria (Dragodan)',
    tagline: 'Lagjja diplomatike me pamje panoramike mbi Prishtinën',
    descriptionSq: 'Arbëria (e njohur tradicionalisht si Dragodan) është një nga lagjet më elitare të kryeqytetit. Këtu ndodhen shumica e ambasadave të huaja (SHBA, Gjermani, Britani), parqe të gjelbra me shëtitore, dhe komplekse banimi luksoze me siguri të lartë.',
    descriptionEn: 'Arbëria is the diplomatic and high-end residential neighborhood of Pristina, home to foreign embassies, scenic hills, and tranquil pedestrian paths.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    tags: ['Ambasadat & Siguria', 'Pamje Panoramike', 'Zona Elitare', 'Qetësi'],
    ratings: {
      walkability: 8.4,
      greenSpaces: 9.1,
      schoolsAndDaycare: 8.8,
      publicTransit: 7.8,
      safety: 9.6,
      nightlifeAndCafes: 8.2
    },
    priceRangePerSqm: { min: 1450, max: 2100 },
    avgRentMonthly: 550,
    highlightPoints: [
      'Ambasada e SHBA-ve dhe institucionet ndërkombëtare',
      'Parku i Arbërisë me kënde lodrash dhe shtigje vrapimi',
      'Restorante panoramike dhe kafeteri moderne',
      'Afërsi 5 minuta me këmbë drejt Qendrës përmes shkallëve të Arbërisë'
    ],
    upcomingProjects: [
      'Zgjerimi i shëtitores së gjelbër lidhëse me Qendrën',
      'Rehabilitimi i ndriçimit publik inteligjent LED'
    ]
  },
  {
    id: 'neigh-lakrishte',
    city: 'Prishtinë',
    country: 'Kosovo',
    name: 'Lakrishte',
    tagline: 'Qendra e re financiare dhe kullat moderne të biznesit',
    descriptionSq: 'Lakrishtja përfaqëson Prishtinën moderne të së ardhmes. E karakterizuar nga kulla të larta rezidenciale dhe qendra tregtare, kjo zonë është zemra e re e bizneseve, zyrave korporative dhe apartamenteve me standarde evropiane.',
    descriptionEn: 'Lakrishte is the modern skyscraper and business district of Pristina, with premier commercial centers and high-rise residences.',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    tags: ['Kullat & Rrokaqiejt', 'Qendër Biznesi', 'Investim me Kthim të Lartë', 'Ashensorë të Shpejtë'],
    ratings: {
      walkability: 8.9,
      greenSpaces: 6.2,
      schoolsAndDaycare: 7.5,
      publicTransit: 9.3,
      safety: 9.0,
      nightlifeAndCafes: 8.7
    },
    priceRangePerSqm: { min: 1550, max: 2350 },
    avgRentMonthly: 620,
    highlightPoints: [
      'Komplekset e njohura: Dukagjini Center, Prime Residence, Donika Center',
      'Lidhje e drejtpërdrejtë me rrethrrotullimin kryesor dhe autostradat',
      'Përshtatshmëri maksimale për zyra dhe qira për ekspertë të huaj'
    ],
    upcomingProjects: [
      'Ndërtimi i mbikalimit këmbësor me shëtitore të gjelbër',
      'Qendra e re kongresuale dhe hotel me 5 yje'
    ]
  },
  {
    id: 'neigh-mati1',
    city: 'Prishtinë',
    country: 'Kosovo',
    name: 'Mati 1 (Rruga B & C)',
    tagline: 'Lagjja më dinamike me shërbime të plota për familje të reja',
    descriptionSq: 'Mati 1 dhe korridori i Rrugës B e C është zona më e gjallë dhe e kërkuar për jetesë familjare. E mbushur me supermarkete, kafeteri, shkolla, çerdhe dhe farmaci në çdo hap, ofron një stil jetese tepër komod dhe aktiv.',
    descriptionEn: 'Mati 1 and Street B is Pristina’s most lively residential hub, packed with gourmet coffee shops, schools, and family amenities.',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
    tags: ['Familjare', 'Rruga B & C', 'Kafeteri & Gastronomi', 'Likuiditet i Lartë'],
    ratings: {
      walkability: 9.2,
      greenSpaces: 7.0,
      schoolsAndDaycare: 9.4,
      publicTransit: 8.6,
      safety: 8.9,
      nightlifeAndCafes: 9.5
    },
    priceRangePerSqm: { min: 1200, max: 1650 },
    avgRentMonthly: 420,
    highlightPoints: [
      'Kafetë dhe restorantet më popullore në Rrugën B',
      'Shkolla fillore "Pavarësia" dhe disa çerdhe private e publike',
      'Qasje e shpejtë në Rrugën A dhe qendrën spitalore QKUK'
    ],
    upcomingProjects: [
      'Përfundimi i segmentit të Rrugës A me korsi biçikletash',
      'Krijimi i parkut të ri lagjor dhe zonave sportive'
    ]
  },
  {
    id: 'neigh-blloku',
    city: 'Tiranë',
    country: 'Albania',
    name: 'Ish-Blloku',
    tagline: 'Epiqendra e stilit, kulturës, dhe gastronimisë në Tiranë',
    descriptionSq: 'Ish-Blloku mbetet zona më prestigjioze dhe e kërkuar në zemër të Tiranës. Me butikë të njohur ndërkombëtarë, restorantet më me famë dhe jetë nate aktive, pronat këtu gëzojnë rendimentin më të lartë nga qiratë ditore (Airbnb/Booking).',
    descriptionEn: 'Ish-Blloku is the trendiest and most vibrant cultural and gastronomic district in the very center of Tirana.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    tags: ['Zemra e Tiranës', 'Turizëm & Airbnb', 'Kulturë & Gastronomi', 'Vlerë Historike'],
    ratings: {
      walkability: 9.8,
      greenSpaces: 7.5,
      schoolsAndDaycare: 8.5,
      publicTransit: 9.4,
      safety: 9.2,
      nightlifeAndCafes: 9.9
    },
    priceRangePerSqm: { min: 2400, max: 3800 },
    avgRentMonthly: 850,
    highlightPoints: [
      'Mbi 100 restorante, bare dhe ambiente arti bashkëkohor',
      'Distancë 3 minuta me këmbë nga Parku Rinia dhe Sheshi Skënderbej',
      'Kërkesë konstante 365 ditë në vit për qira ditore'
    ],
    upcomingProjects: [
      'Pedonalizimi i rrugicave të brendshme',
      'Rinovimi i fasadave historike dhe trashëgimisë arkitekturore'
    ]
  },
  {
    id: 'neigh-liqe-artificial',
    city: 'Tiranë',
    country: 'Albania',
    name: 'Liqeni Artificial & Sauk',
    tagline: 'Oazi i gjelbër dhe rezidencat elitare pranë natyrës',
    descriptionSq: 'Zona buzë Parkut të Madh të Liqenit Artificial ofron ajrin më të pastër dhe cilësinë më të lartë të jetesës në Tiranë. E kërkuar nga menaxherë, diplomatë dhe blerës që dëshirojnë natyrë, vrapim buzë ujit dhe arkitekturë moderne.',
    descriptionEn: 'The Grand Park and Artificial Lake area represents premier eco-luxury living in Tirana with jogging trails and serene parkfront views.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    tags: ['Buzë Liqenit', 'Ajër i Pastër', 'Rezidenca Luksoze', 'Sport & Natyrë'],
    ratings: {
      walkability: 9.1,
      greenSpaces: 9.9,
      schoolsAndDaycare: 8.7,
      publicTransit: 8.3,
      safety: 9.5,
      nightlifeAndCafes: 8.6
    },
    priceRangePerSqm: { min: 2200, max: 3500 },
    avgRentMonthly: 900,
    highlightPoints: [
      'Shtigjet e vrapimit dhe kodrat e Parkut të Madh',
      'Qasje e shpejtë në Unazën e Madhe të Tiranës dhe TEG',
      'Komplekse të reja rezidenciale me pishina dhe palestra private'
    ],
    upcomingProjects: [
      'Zgjerimi i korridorit ekologjik drejt Saukut',
      'Ndërtimi i rrugëve të reja lidhëse të gjelbra'
    ]
  },
  {
    id: 'neigh-lungomare',
    city: 'Vlorë',
    country: 'Albania',
    name: 'Lungomare & Uji i Ftohtë',
    tagline: 'Bregdeti joshës dhe qendra e investimeve turistike',
    descriptionSq: 'Lungomare e Vlorës është një nga shëtitoret bregdetare më të gjata dhe të bukura në Mesdhe. E transformuar totalisht, ofron pamje magjepsëse të perëndimit të diellit mbi Sazan dhe Gadishullin e Karaburunit, me kthim fantastik investimi nga qiraja turistike.',
    descriptionEn: 'Vlora Lungomare is a Mediterranean coastal boulevard renowned for high-yield vacation rentals and seaside sunsets.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    tags: ['Bregdet & Plazh', 'Lungomare', 'Pamje nga Deti', 'ROI Turistik 9%+'],
    ratings: {
      walkability: 9.6,
      greenSpaces: 8.4,
      schoolsAndDaycare: 7.2,
      publicTransit: 8.0,
      safety: 9.3,
      nightlifeAndCafes: 9.4
    },
    priceRangePerSqm: { min: 1400, max: 2400 },
    avgRentMonthly: 500,
    highlightPoints: [
      'Shëtitorja 5 kilometërshe me palma, korsi vrapimi dhe biçikletash',
      'Afërsia me Aeroportin Ndërkombëtar të Vlorës (hapje e shpejtë)',
      'Plazhe të pastra, marina për jahte dhe gastronomi me prodhime deti'
    ],
    upcomingProjects: [
      'Hapja e Aeroportit të Vlorës për fluturime ndërkombëtare',
      'Marina e Re Turistike e Vlorës me standarde botërore'
    ]
  },
  {
    id: 'neigh-gjiri-lalzit',
    city: 'Durrës',
    country: 'Albania',
    name: 'Gjiri i Lalzit',
    tagline: 'Rezortet ekskluzive të vilave buzë pishave dhe Adriatikut',
    descriptionSq: 'Gjiri i Lalzit është destinacioni më prestigjioz për vila pushimi dhe rezidenca sekondare në Shqipëri. I vendosur mes pyjeve me pisha dhe rërës së imët të Adriatikut, është vetëm 35 minuta larg Aeroportit të Rinasit dhe Tiranës.',
    descriptionEn: 'Lalzi Bay is the gold standard for gated villa resorts, pinewood serenity, and beachside retreats near Tirana and the airport.',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
    tags: ['Vila Rezidenciale', 'Pyll me Pisha', 'Plazh Privat', 'Siguri 24/7'],
    ratings: {
      walkability: 7.8,
      greenSpaces: 9.8,
      schoolsAndDaycare: 6.0,
      publicTransit: 6.5,
      safety: 9.7,
      nightlifeAndCafes: 8.0
    },
    priceRangePerSqm: { min: 1600, max: 2700 },
    avgRentMonthly: 750,
    highlightPoints: [
      'Komplekse të mbyllura të certifikuara me roje dhe administrim profesional',
      'Plazh me ujë të cekët dhe rërë të pastër kurative',
      'Vetëm 35 minuta nga kryeqyteti Tirana dhe Aeroporti Nënë Tereza'
    ],
    upcomingProjects: [
      'Zgjerimi i rrugës lidhëse me 4 korsi',
      'Qendra të reja SPA & Wellness me standarde 5 yje'
    ]
  }
];
