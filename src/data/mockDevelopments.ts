import { DevelopmentProject } from '../types';

export const INITIAL_DEVELOPMENTS: DevelopmentProject[] = [
  {
    id: 'dev-01',
    name: 'Marigona Hill Residence',
    developerName: 'Marigona Hill Real Estate Sh.p.k.',
    developerLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80',
    city: 'Prishtinë',
    neighborhood: 'Çagllavicë / Veternik',
    country: 'Kosovo',
    status: 'facade_finishing',
    statusLabelSq: 'Fazë Përfundimtare & Fasada',
    expectedCompletionDate: 'Qershor 2026',
    totalUnits: 180,
    availableUnitsCount: 28,
    startingPricePerSqm: 1450,
    totalStartingPrice: 135000,
    tagline: 'Kompleks rezidencial elitar me koncept amerikan, parqe të gjelbra dhe siguri 24/7',
    descriptionSq: 'Marigona Hill është një nga projektet më madhore dhe cilësore në Kosovë, i shtrirë në një kodër panoramike në Veternik. Projekti ofron vila individuale, shtëpi në varg dhe apartamente me tarraca të mëdha, sistem të mençur Smart Home, ngrohje gjeotermale dhe izolim akustik maksimal.',
    descriptionEn: 'Marigona Hill is a premier gated luxury community situated on the scenic hills of Veternik, Prishtina. Featuring contemporary villas and terrace residences with private clubhouses, 24/7 security, and extensive green parks.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&auto=format&fit=crop&q=80'
    ],
    features: [
      'Siguri 24/7 dhe qasje e kontrolluar me rampa',
      'Park qendror 1.5 hektarë me kënd lojërash për fëmijë',
      'Pishinë gjysmë-olimpike dhe qendër fitnesi për banorët',
      'Garazhe nëntokësore me karikues për vetura elektrike (EV)',
      'Efiçiencë energjetike Klasa A+ me dritare 3-shtresore alumini',
      'Menaxhim i integruar i mbeturinave dhe mirëmbajtje e përbashkët'
    ],
    paymentPlans: [
      {
        downPaymentPercent: 30,
        installmentsCount: 36,
        interestFree: true,
        descriptionSq: '30% Paradhënie me nënshkrim, pjesa e mbetur me këste mujore pa kamatë deri në pranim teknik.'
      },
      {
        downPaymentPercent: 15,
        installmentsCount: 240,
        interestFree: false,
        descriptionSq: 'Kredi e drejtpërdrejtë bankare përmes bankave partnere (NLB / ProCredit) deri në 20 vite.'
      }
    ],
    units: [
      {
        id: 'u-mh-01',
        type: 'Apartament 2+1 (Tip A)',
        bedrooms: 2,
        bathrooms: 2,
        areaSqm: 94,
        startingPrice: 136300,
        availableUnits: 8,
        floorPlanImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'u-mh-02',
        type: 'Apartament 3+1 me Tarracë',
        bedrooms: 3,
        bathrooms: 2,
        areaSqm: 138,
        startingPrice: 200100,
        availableUnits: 5,
        floorPlanImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'u-mh-03',
        type: 'Vilë Dyshe (Semi-Detached)',
        bedrooms: 4,
        bathrooms: 3,
        areaSqm: 240,
        startingPrice: 348000,
        availableUnits: 3,
        floorPlanImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80'
      }
    ],
    permitNumber: '08-350/02-14920',
    permitIssuingAuthority: 'Drejtoria e Urbanizmit - Komuna e Prishtinës',
    contactPhone: '+383 49 100 200',
    contactEmail: 'shitjet@marigonahill.com',
    lat: 42.6320,
    lng: 21.1710
  },
  {
    id: 'dev-02',
    name: 'Downtown One Tirana',
    developerName: 'Kastrati Construction & Development',
    developerLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    city: 'Tiranë',
    neighborhood: 'Bulevardi Bajram Curri / Ish-Blloku',
    country: 'Albania',
    status: 'ready_to_move',
    statusLabelSq: 'Çelësa në Dorë / Gati për Banim',
    expectedCompletionDate: 'Përfunduar (2025/2026)',
    totalUnits: 240,
    availableUnitsCount: 19,
    startingPricePerSqm: 3200,
    totalStartingPrice: 224000,
    tagline: 'Kulla ikonike 37-katëshe me certifikim LEED Gold në zemër të Tiranës',
    descriptionSq: 'Downtown One është një nga projektet më luksoze në Ballkan, i dizajnuar nga studioja e mirënjohur ndërkombëtare MVRDV. Kulla përfshin apartamente rezidenciale luksoze, zyra të Klasit A, qendër tregtare, spa dhe pamje panoramike 360 shkallë mbi Tiranën dhe Malin e Dajtit.',
    descriptionEn: 'Downtown One is a 37-storey mixed-use skyscraper in central Tirana, designed by MVRDV. Offering LEED-Gold certified residential apartments, Class-A business offices, and luxury lifestyle amenities.',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&auto=format&fit=crop&q=80'
    ],
    features: [
      'Certifikim Ndërkombëtar LEED Gold për Efiçiencë',
      'Sistem ngrohje-ftohje me Chiller qendror dhe ventilim me rekuperim',
      'Ashensorë inteligjentë me shpejtësi të lartë (Otis/Schindler)',
      'Recepsion elitar 24/7 dhe shërbim mirëmbajtjeje konsierzh',
      '5 nivele parkimi nëntokësor me mbrojtje kundër zjarrit',
      'Qasje e menjëhershme në Bulevardin Bajram Curri dhe Parkun e Liqenit'
    ],
    paymentPlans: [
      {
        downPaymentPercent: 40,
        installmentsCount: 12,
        interestFree: true,
        descriptionSq: '40% Me nënshkrim kontrate, pjesa tjetër brenda 12 muajve.'
      },
      {
        downPaymentPercent: 20,
        installmentsCount: 300,
        interestFree: false,
        descriptionSq: 'Kredi me bankat Credins / BKT / Raiffeisen me normë të favorshme 3.9%.'
      }
    ],
    units: [
      {
        id: 'u-dt-01',
        type: 'Apartament 1+1 Premium',
        bedrooms: 1,
        bathrooms: 1,
        areaSqm: 70,
        startingPrice: 224000,
        availableUnits: 6,
        floorPlanImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'u-dt-02',
        type: 'Apartament 2+1 Panoramik',
        bedrooms: 2,
        bathrooms: 2,
        areaSqm: 115,
        startingPrice: 368000,
        availableUnits: 9,
        floorPlanImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'u-dt-03',
        type: 'Sky Penthouse Katin 34',
        bedrooms: 4,
        bathrooms: 4,
        areaSqm: 260,
        startingPrice: 950000,
        availableUnits: 1,
        floorPlanImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=80'
      }
    ],
    permitNumber: 'KV-TR-2021/8834',
    permitIssuingAuthority: 'Bashkia Tiranë & KKT Shqipëri',
    contactPhone: '+355 4 220 0000',
    contactEmail: 'sales@downtownone.al',
    lat: 41.3245,
    lng: 19.8250
  },
  {
    id: 'dev-03',
    name: 'Green Coast Resort & Residences',
    developerName: 'Balfin Group / Green Coast Real Estate',
    developerLogo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=120&auto=format&fit=crop&q=80',
    city: 'Palasë / Himarë',
    neighborhood: 'Gjiri i Palasës, Riviera Jonike',
    country: 'Albania',
    status: 'interior_works',
    statusLabelSq: 'Punime të Brendshme & Faza 2',
    expectedCompletionDate: 'Maj 2026',
    totalUnits: 320,
    availableUnitsCount: 34,
    startingPricePerSqm: 2800,
    totalStartingPrice: 196000,
    tagline: 'Resorti mesdhetar më ekskluziv në Rivierën Shqiptare me plazh privat dhe shëtitore buzëdeti',
    descriptionSq: 'Green Coast është resorti lider në brigjet e Jonit, i vendosur në Palasë, aty ku mali takohet me detin kristal. Me shëtitore buzë detit (Lungomare), restorante elitare me yje Michelin, pishina private dhe mundësi të jashtëzakonshme për kthim investimi (ROI 9-12% përmes qirasë sezonale).',
    descriptionEn: 'Green Coast is an ultra-luxury beachfront resort in Palasa on the Albanian Riviera. Features exclusive villas, apartments, private beach access, seaside promenade, and a high-yield property rental program.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80'
    ],
    features: [
      'Plazh privat me standardet e Flamurit Blu',
      'Program profesional i menaxhimit të qiradhënies për pronarët',
      'Shëtitore tregtare me brende ndërkombëtare dhe beach-bari',
      'Heliport dhe marina për ankorimin e jahteve luksoze',
      'SPA & Wellness Center me trajtime termale',
      'Siguri maksimale dhe shërbim buggies elektrikë për transport të brendshëm'
    ],
    paymentPlans: [
      {
        downPaymentPercent: 30,
        installmentsCount: 24,
        interestFree: true,
        descriptionSq: '30% nënshkrim, 30% në karabinë, 30% në fasadë, 10% në dorëzim çelësash.'
      },
      {
        downPaymentPercent: 25,
        installmentsCount: 180,
        interestFree: false,
        descriptionSq: 'Financim deri në 75% nga bankat e nivelit të dytë për rezidentë dhe mërgatë.'
      }
    ],
    units: [
      {
        id: 'u-gc-01',
        type: 'Apartament 1+1 me Pamje Deti',
        bedrooms: 1,
        bathrooms: 1,
        areaSqm: 70,
        startingPrice: 196000,
        availableUnits: 12,
        floorPlanImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'u-gc-02',
        type: 'Apartament 2+1 me Kopsht Privat',
        bedrooms: 2,
        bathrooms: 2,
        areaSqm: 105,
        startingPrice: 294000,
        availableUnits: 8,
        floorPlanImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'u-gc-03',
        type: 'Vilë Individuale me Pishinë Private',
        bedrooms: 3,
        bathrooms: 3,
        areaSqm: 220,
        startingPrice: 650000,
        availableUnits: 2,
        floorPlanImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=80'
      }
    ],
    permitNumber: 'LEJE-KKT-PALASA-2022',
    permitIssuingAuthority: 'Këshilli Kombëtar i Territorit Shqipëri',
    contactPhone: '+355 69 700 8000',
    contactEmail: 'invest@greencoast.al',
    lat: 40.1650,
    lng: 19.5820
  },
  {
    id: 'dev-04',
    name: 'Linda Premium Residence',
    developerName: 'Al Trade Center Sh.p.k.',
    developerLogo: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?w=120&auto=format&fit=crop&q=80',
    city: 'Prishtinë',
    neighborhood: 'Rruga A / Mati 1',
    country: 'Kosovo',
    status: 'structure',
    statusLabelSq: 'Ndërtim Strukture & Mure',
    expectedCompletionDate: 'Dhjetor 2026',
    totalUnits: 290,
    availableUnitsCount: 45,
    startingPricePerSqm: 1180,
    totalStartingPrice: 79060,
    tagline: 'Standard i ri banimi në korridorin më të ri dhe modern të Prishtinës (Rruga A)',
    descriptionSq: 'Linda Premium Residence në Rrugën A ofron një infrastrukturë bashkëkohore me bulevarde të gjera, kopsht fëmijësh të integruar, hapësira të bollshme të gjelbra dhe izolim të jashtëzakonshëm me lesh guri 12cm.',
    descriptionEn: 'Linda Premium Residence on Street A in Prishtina combines modern urban architecture with spacious green courtyards, kindergarten, and high thermal insulation.',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80'
    ],
    features: [
      'Izolim termik me lesh guri 12cm dhe fasadë ventiluese',
      'Dritare 4-stinore me xham trefish',
      'Kopsht fëmijësh dhe qendër mjekësore brenda kompleksit',
      'Dy kate parkimi nëntokësor me ventilim automatik',
      'Qasje e drejtpërdrejtë në autostradën Prishtinë-Gjilan dhe Rrugën B'
    ],
    paymentPlans: [
      {
        downPaymentPercent: 20,
        installmentsCount: 36,
        interestFree: true,
        descriptionSq: '20% paradhënie, këste tremujore ose mujore sipas dinamikës së ndërtimit.'
      }
    ],
    units: [
      {
        id: 'u-lp-01',
        type: 'Apartament 1+1 (Tip B)',
        bedrooms: 1,
        bathrooms: 1,
        areaSqm: 67,
        startingPrice: 79060,
        availableUnits: 18,
        floorPlanImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'u-lp-02',
        type: 'Apartament 2+1 (Tip Familjar)',
        bedrooms: 2,
        bathrooms: 1,
        areaSqm: 92,
        startingPrice: 108560,
        availableUnits: 14,
        floorPlanImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'u-lp-03',
        type: 'Apartament 3+1 i Madh me Dy Ballkone',
        bedrooms: 3,
        bathrooms: 2,
        areaSqm: 124,
        startingPrice: 146320,
        availableUnits: 7,
        floorPlanImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80'
      }
    ],
    permitNumber: '08-350/01-9923',
    permitIssuingAuthority: 'Komuna e Prishtinës',
    contactPhone: '+383 44 500 600',
    contactEmail: 'info@altradecenter.com',
    lat: 42.6450,
    lng: 21.1850
  }
];
