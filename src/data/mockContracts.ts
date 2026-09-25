import { LegalContractData, ContractTemplateType, ContractParty, ContractArticle } from '../types';

export interface ContractTemplateDefinition {
  type: ContractTemplateType;
  titleSq: string;
  titleEn: string;
  category: 'rent' | 'sale' | 'protocol' | 'diaspora';
  jurisdiction: 'Kosovo' | 'Albania';
  governingLawSq: string;
  governingLawEn: string;
  descriptionSq: string;
  descriptionEn: string;
  badge: string;
  defaultArticles: ContractArticle[];
}

export const CONTRACT_TEMPLATES: ContractTemplateDefinition[] = [
  {
    type: 'residential_lease',
    titleSq: 'Kontratë Qiraje për Banim (Standarde)',
    titleEn: 'Standard Residential Tenancy Agreement',
    category: 'rent',
    jurisdiction: 'Kosovo',
    governingLawSq: 'Ligji Nr. 04/L-077 për Marrëdhëniet e Detyrimeve të Republikës së Kosovës (Neni 585 - 612)',
    governingLawEn: 'Law No. 04/L-077 on Obligational Relationships of the Republic of Kosovo (Articles 585-612)',
    descriptionSq: 'Kontratë zyrtare e qirasë për apartamente dhe shtëpi me përcaktim të depozitës së sigurisë, faturave komunale, inventarit dhe kushteve të ndërprerjes.',
    descriptionEn: 'Official residential lease agreement with deposit protection, utility clauses, inventory register, and termination terms.',
    badge: 'Më e Përdorura 🇽🇰',
    defaultArticles: [
      {
        number: 1,
        titleSq: 'Neni 1: Objekti i Kontratës dhe Përshkrimi i Pronës',
        titleEn: 'Article 1: Object of Contract & Property Description',
        contentSq: 'Qiradhënësi i jep me qira Qiramarrësit patundshmërinë e identifikuar më sipër në gjendje të rregullt funksionale dhe të banueshme, së bashku me të gjitha instalimet dhe inventarin përkatës.',
        contentEn: 'The Landlord agrees to lease to the Tenant the property described above in good functional condition, together with all associated fixtures and inventory.'
      },
      {
        number: 2,
        titleSq: 'Neni 2: Kohëzgjatja e Qirasë',
        titleEn: 'Article 2: Duration of Lease',
        contentSq: 'Kjo kontratë lidhet për periudhën e caktuar duke filluar nga data e dorëzimit të çelësave. Në rast se palët dëshirojnë vazhdimin, njoftimi duhet të bëhet të paktën 30 ditë para skadimit me shkrim.',
        contentEn: 'This agreement is executed for the specified term starting on the key handover date. Any lease renewal requires at least 30 days prior written notice.'
      },
      {
        number: 3,
        titleSq: 'Neni 3: Çmimi i Qirasë dhe Mënyra e Pagesës',
        titleEn: 'Article 3: Rental Amount & Payment Terms',
        contentSq: 'Qiraja mujore paguhet rregullisht deri më datën e caktuar të çdo muaji përmes transfertës bankare në llogarinë e specifikuar të Qiradhënësit. Vonesat mbi 5 ditë ngarkojnë kamatë ligjore.',
        contentEn: 'Monthly rent must be paid promptly by the specified day of each month via bank transfer to the Landlord’s designated IBAN. Delays exceeding 5 days incur legal interest.'
      },
      {
        number: 4,
        titleSq: 'Neni 4: Depozita e Garancisë (Kaucioni)',
        titleEn: 'Article 4: Security Deposit',
        contentSq: 'Qiramarrësi depoziton shumën e garancisë me nënshkrimin e kësaj kontrate. Depozita mbahet si garanci për pagesën e faturave komunale dhe riparimin e dëmeve të mundshme jashtë konsumit normal, dhe kthehet plotësisht brenda 15 ditëve pas lirimit të rregullt të pronës.',
        contentEn: 'The Tenant deposits the security sum upon execution. The deposit secures unpaid utilities and damages beyond normal wear and tear, and shall be refunded within 15 days of departure.'
      },
      {
        number: 5,
        titleSq: 'Neni 5: Shpenzimet Komunale dhe Mirëmbajtja',
        titleEn: 'Article 5: Utilities & Property Maintenance',
        contentSq: 'Qiramarrësi merr përsipër pagesën e rregullt të energjisë elektrike (KEDS/OSHEE), ujësjellësit, ngrohjes qendrore (Termokos), mbeturinave dhe mirëmbajtjes së hyrjes, duke dorëzuar dëshmitë e pagesave çdo muaj.',
        contentEn: 'The Tenant assumes full responsibility for utilities (electricity, water, central heating, waste collection, and building common maintenance).'
      },
      {
        number: 6,
        titleSq: 'Neni 6: Ndërprerja e Parakohshme dhe Zgjidhja e Mosmarrëveshjeve',
        titleEn: 'Article 6: Early Termination & Dispute Resolution',
        contentSq: 'Secila palë mund të kërkojë zgjidhjen e parakohshme të kontratës me njoftim paraprak me shkrim prej 30 ditësh. Çdo mosmarrëveshje do të zgjidhet me mirëkuptim, ose në pamundësi, në Gjykatën Themelore kompetente.',
        contentEn: 'Either party may terminate the contract with a 30-day written notice. Any unresolved disputes shall be submitted to the competent Basic Court.'
      }
    ]
  },
  {
    type: 'sales_preliminary',
    titleSq: 'Parakontratë Shitblerjeje Patundshmërie me Kapar',
    titleEn: 'Preliminary Real Estate Purchase Agreement (with Earnest Money)',
    category: 'sale',
    jurisdiction: 'Kosovo',
    governingLawSq: 'Ligji për Marrëdhëniet e Detyrimeve dhe Ligji për Noterinë në Kosovë',
    governingLawEn: 'Law on Obligational Relationships and Law on Notary in Kosovo',
    descriptionSq: 'Marrëveshje paraprake ligjore për rezervimin e pronës, përcaktimin e çmimit final, kaparit (kaparisë) dhe afatit të noterizimit përfundimtar.',
    descriptionEn: 'Binding preliminary purchase contract establishing property price, down payment (kapar), deadlines, and notary deed finalization.',
    badge: 'Gati për Noter 📜',
    defaultArticles: [
      {
        number: 1,
        titleSq: 'Neni 1: Deklarimi i Pronësisë dhe Zotimit të Shitjes',
        titleEn: 'Article 1: Ownership Declaration & Commitment to Sell',
        contentSq: 'Shitësi deklaron dhe garanton se është pronar i vetëm dhe legjitim i patundshmërisë me fletë poseduese të pastër, e papenguar nga hipotekat, servitutet apo pretendimet e palëve të treta.',
        contentEn: 'The Seller warrants full legal ownership of the property with a clean title deed, free of unrecorded liens, mortgages, or third-party encumbrances.'
      },
      {
        number: 2,
        titleSq: 'Neni 2: Çmimi i Dakorduar dhe Shuma e Kaparit',
        titleEn: 'Article 2: Agreed Price & Earnest Money (Kapar)',
        contentSq: 'Blerësi i paguan Shitësit kaparin e dakorduar në momentin e nënshkrimit si konfirmim të vullnetit të blerjes. Pjesa e mbetur e çmimit do të paguhet në ditën e lidhjes së Kontratës Përfundimtare tek Noteri.',
        contentEn: 'The Buyer pays the earnest money upon signing as confirmation of purchase intent. The remaining balance will be settled at the Notary signing.'
      },
      {
        number: 3,
        titleSq: 'Neni 3: Pasojat e Heqjes Dorë (Rregulli i Kaparit)',
        titleEn: 'Article 3: Forfeiture & Penalty Clauses',
        contentSq: 'Nëse Blerësi heq dorë nga blerja pa shkaqe madhore, kapari mbetet tek Shitësi. Nëse Shitësi heq dorë nga shitja, detyrohet t\'i kthejë Blerësit kaparin dyfish sipas dispozitave ligjore në fuqi.',
        contentEn: 'If the Buyer breaches the agreement, the earnest money is forfeited to the Seller. If the Seller breaches, they must return double the earnest money pursuant to civil law.'
      },
      {
        number: 4,
        titleSq: 'Neni 4: Afati për Lidhjen e Kontratës Noteriale',
        titleEn: 'Article 4: Deadline for Notary Contract Execution',
        contentSq: 'Palët zotohen të paraqiten para Noterit të përzgjedhur brenda afatit të dakorduar me të gjithë dokumentacionin kadastral dhe certifikatat e papengueshmërisë tatimore.',
        contentEn: 'The parties commit to appear before the designated Notary by the agreed deadline with all cadastral certificates and tax clearance documents.'
      }
    ]
  },
  {
    type: 'handover_protocol',
    titleSq: 'Procesverbal i Pranim-Dorëzimit të Pronës dhe Inventarit',
    titleEn: 'Property Condition Handover Protocol & Inventory Checklist',
    category: 'protocol',
    jurisdiction: 'Kosovo',
    governingLawSq: 'Rregullorja për Pranim-Dorëzim dhe Inventarizim të Patundshmërive',
    governingLawEn: 'Real Estate Handover & Meter Verification Protocol',
    descriptionSq: 'Dokument thelbësor për regjistrimin e gjendjes së njehsorit të rrymës (orës), ujit, ngrohjes, çelësave dhe pajisjeve elektroshtëpiake.',
    descriptionEn: 'Essential record documenting electric and water meter readings, key sets, condition of appliances, and structural state upon move-in/move-out.',
    badge: 'Mbrojtje Ligjore 🔑',
    defaultArticles: [
      {
        number: 1,
        titleSq: 'Neni 1: Leximi i Njehsorëve (Gjendja Fillestare)',
        titleEn: 'Article 1: Meter Readings (Initial State)',
        contentSq: 'Njehsori i Energjisë Elektrike (KEDS/OSHEE Nr. Njehsorit): [______] kWh; Njehsori i Ujësjellësit: [______] m³; Çelësat e dorëzuar: [3] palë çelësa hyrjeje, [1] pult garazhi.',
        contentEn: 'Electricity meter reading: [______] kWh; Water meter reading: [______] m³; Handed over keys: [3] main door sets, [1] garage remote.'
      },
      {
        number: 2,
        titleSq: 'Neni 2: Gjendja e Mureve, Dyshemesë dhe Dritareve',
        titleEn: 'Article 2: Condition of Walls, Flooring & Windows',
        contentSq: 'Muret janë të lyera rishtazi, pa lagështi; parketi në gjendje të shkëlqyer pa gërvishtje; dritaret me xham trefish funksionojnë pa defekte.',
        contentEn: 'Walls freshly painted without dampness; hardwood parquet in excellent condition; triple-glazed windows functioning without defect.'
      },
      {
        number: 3,
        titleSq: 'Neni 3: Lista e Pajisjeve Elektroshtëpiake',
        titleEn: 'Article 3: Inventory of Home Appliances',
        contentSq: 'Kondicioner Inverter, Frigorifer No-Frost, Lavatriçe, Lavastovilje, Shporet elektrik me pllakë qeramike, TV Smart - të gjitha të testuara dhe funksionale.',
        contentEn: 'Inverter A/C, No-Frost Refrigerator, Washing Machine, Dishwasher, Induction Stove, Smart TV - tested and fully operational.'
      }
    ]
  },
  {
    type: 'commercial_lease',
    titleSq: 'Kontratë Qiraje për Hapësira Komerciale & Zyra',
    titleEn: 'Commercial Office & Retail Space Lease Agreement',
    category: 'rent',
    jurisdiction: 'Kosovo',
    governingLawSq: 'Ligji për Marrëdhëniet e Detyrimeve dhe Legjislacioni Tatimor (TVSH & Tatimi në Qira)',
    governingLawEn: 'Law on Obligational Relationships & Tax Legislation (VAT & Withholding Tax)',
    descriptionSq: 'Kontratë e specializuar për lokale afariste, zyra, depo dhe restorante me klauzola për TVSH, tatim në burim, modifikime dhe orar pune.',
    descriptionEn: 'Specialized commercial contract for offices, retail stores, and warehouses with VAT, withholding tax, fit-out, and sign placement clauses.',
    badge: 'Biznes & Zyra 🏢',
    defaultArticles: [
      {
        number: 1,
        titleSq: 'Neni 1: Qëllimi i Shfrytëzimit Komercial',
        titleEn: 'Article 1: Permitted Commercial Use',
        contentSq: 'Qiradhënësi i jep hapësirën komerciale Qiramarrësit ekskluzivisht për veprimtari të ligjshme afariste (zyra / shitore / shërbime). Çdo ndryshim i destinimit kërkon pëlqim paraprak.',
        contentEn: 'The Landlord leases the commercial premises exclusively for lawful business activities. Any change of business use requires prior written consent.'
      },
      {
        number: 2,
        titleSq: 'Neni 2: Qiraja, TVSH dhe Detyrimet Tatimore',
        titleEn: 'Article 2: Rent, VAT & Tax Obligations',
        contentSq: 'Shuma mujore e qirasë është neto/bruto sipas faturës tatimore. Qiramarrësi si person juridik merr përsipër deklarimin dhe pagesën e tatimit në burim (9%) pranë Administratës Tatimore (ATK / DPT).',
        contentEn: 'The monthly rent is invoiced according to tax regulations. The commercial tenant shall withhold and declare the applicable tax with the Tax Administration.'
      },
      {
        number: 3,
        titleSq: 'Neni 3: Përshtatja e Hapësirës (Fit-out) dhe Reklamat',
        titleEn: 'Article 3: Space Fit-out & Signage',
        contentSq: 'Qiramarrësi ka të drejtë të bëjë përshtatje të brendshme sipas identitetit të markës dhe të vendosë tabelën ndriçuese reklamuese në fasadë pas miratimit të planit teknik.',
        contentEn: 'The Tenant is entitled to carry out internal fit-out according to corporate identity and mount illuminated storefront signage upon technical approval.'
      }
    ]
  },
  {
    type: 'diaspora_power_of_attorney',
    titleSq: 'Autorizim Noterial për Përfaqësim në Blerje (Për Diasporën)',
    titleEn: 'Special Power of Attorney for Real Estate Acquisition (Diaspora)',
    category: 'diaspora',
    jurisdiction: 'Kosovo',
    governingLawSq: 'Ligji për Noterinë dhe Konventa e Hagës për Apostilin (Republika e Kosovës & Shqipëria)',
    governingLawEn: 'Law on Notary and Hague Apostille Convention (Kosovo & Albania)',
    descriptionSq: 'Draft autorizimi noterial për bashkatdhetarët në Zvicër, Gjermani, Austri, SHBA për të autorizuar familjarët apo avokatin të nënshkruajnë kontratën e blerjes.',
    descriptionEn: 'Power of Attorney draft allowing diaspora buyers abroad to authorize family members or attorneys to purchase, sign, and register property in Kosovo/Albania.',
    badge: 'Për Diasporën 🌍',
    defaultArticles: [
      {
        number: 1,
        titleSq: 'Neni 1: Objekti i Autorizimit dhe Tagrat Përfaqësuese',
        titleEn: 'Article 1: Scope of Authority & Representation Rights',
        contentSq: 'Unë, Urdhërdhënësi (Blerësi jashtë vendit), autorizoj plotësisht dhe pa kufizim Përfaqësuesin tim të më përfaqësojë pranë çdo Noteri, Zyre Kadastrale, Komune apo Banke për të nënshkruar kontratën e shitblerjes së patundshmërisë.',
        contentEn: 'I, the Principal residing abroad, hereby grant full power and authority to my designated Representative to represent me before Notaries, Cadastral Agencies, and Banks to sign and register the property purchase.'
      },
      {
        number: 2,
        titleSq: 'Neni 2: Regjistrimi në Regjistrin e të Drejtave mbi Pronën',
        titleEn: 'Article 2: Cadastral Title Registration',
        contentSq: 'Përfaqësuesi autorizohet të dorëzojë kërkesën për bartjen e pronësisë në Agjencinë Kadastrale të Kosovës (AKK) / ASHK Shqipëri ekskluzivisht në emër të Urdhërdhënësit.',
        contentEn: 'The Representative is authorized to submit the transfer of ownership deed with the Cadastral Agency strictly registered in the name of the Principal.'
      }
    ]
  }
];

export const INITIAL_SAVED_CONTRACTS: LegalContractData[] = [
  {
    id: 'cnt-001',
    templateType: 'residential_lease',
    title: 'Kontratë Qiraje - Banesë 2+1 në Arbëri (Dragodan), Prishtinë',
    jurisdiction: 'Kosovo',
    governingLaw: 'Ligji Nr. 04/L-077 për Marrëdhëniet e Detyrimeve të Republikës së Kosovës',
    status: 'ready_to_sign',
    partyA: {
      fullName: 'Gëzim Kelmendi',
      personalId: '1012345678',
      address: 'Rruga Ahmet Krasniqi Nr. 45',
      city: 'Prishtinë',
      phone: '+383 44 223 344',
      email: 'gezim.kelmendi@gmail.com'
    },
    partyB: {
      fullName: 'Drenusha Berisha',
      personalId: '2023456789',
      address: 'Rruga UÇK Nr. 12',
      city: 'Prishtinë',
      phone: '+383 49 556 677',
      email: 'drenusha.b@tech-kosova.com'
    },
    property: {
      listingId: 'ks-pr-01',
      title: 'Banesë luksoze 2+1 me pamje panoramike në Arbëri',
      address: 'Rruga Ahmet Krasniqi, Arbëri',
      city: 'Prishtinë',
      municipality: 'Prishtinë',
      cadastralZone: 'Zona Kadastrale Prishtinë 71914',
      parcelNumber: 'Parcela 1420/5',
      propertyNumber: 'Njësia B-34',
      areaSqm: 88,
      floor: 4,
      roomsCount: 3,
      inventoryList: [
        'Kuzhinë e kompletuar me aparaturë Bosch',
        'Kondicioner Daikin Inverter 18000 BTU',
        'Sallon i kompletuar me garniturë lëkure dhe TV 65" LG OLED',
        'Shtrat dopio dhe dollap i integruar në dhomë gjumi kryesore',
        'Pult automatik i parkingut nëntokësor (Niveli -1)'
      ]
    },
    financialTerms: {
      priceOrRent: 600,
      currency: 'EUR',
      depositAmount: 1200,
      paymentDayOfMonth: 5,
      paymentMethod: 'bank_transfer',
      bankIban: 'XK05 1501 0010 1234 5678',
      bankName: 'ProCredit Bank Kosova',
      handoverDate: '2026-04-01',
      contractDurationMonths: 12,
      penaltyPerDay: 5,
      utilitiesResponsibility: 'Qiramarrësi paguan faturat e KEDS, Ujësjellësit Rajonal Prishtina dhe mirëmbajtjen e ndërtesës (20€/muaj).'
    },
    customClauses: [
      'Pirja e duhanit brenda hapësirës së banesës është e ndaluar; lejohet vetëm në ballkon.',
      'Mbajtja e kafshëve shtëpiake lejohet me marrëveshje paraprake të shkruar.'
    ],
    articles: CONTRACT_TEMPLATES[0].defaultArticles,
    createdAt: '2026-03-18T11:20:00Z',
    updatedAt: '2026-03-20T14:40:00Z'
  },
  {
    id: 'cnt-002',
    templateType: 'sales_preliminary',
    title: 'Parakontratë Shitblerjeje - Penthouse në Lungomare, Vlorë',
    jurisdiction: 'Albania',
    governingLaw: 'Kodi Civil i Republikës së Shqipërisë (Nenet 837-850)',
    status: 'ready_to_sign',
    partyA: {
      fullName: 'Arben Hoxha',
      personalId: 'I80512045A',
      address: 'Bulevardi Vlorë-Skelë Nr. 88',
      city: 'Vlorë',
      phone: '+355 69 401 2345',
      email: 'arben.hoxha@vloraproperty.al'
    },
    partyB: {
      fullName: 'Florian Krasniqi (Diasporë Zvicër)',
      personalId: 'XK-99120485',
      address: 'Badenerstrasse 412',
      city: 'Zürich, Zvicër',
      phone: '+41 79 123 4567',
      email: 'florian.krasniqi@swisscom.ch'
    },
    property: {
      listingId: 'al-vl-01',
      title: 'Penthouse Ekskluziv me Verandë mbi Jon',
      address: 'Rruga Aleksandër Moisiu, Lungomare',
      city: 'Vlorë',
      municipality: 'Vlorë',
      cadastralZone: 'Zona Kadastrale 8602 Vlorë',
      parcelNumber: 'Pasuria Nr. 45/129-Vol.14',
      propertyNumber: 'Apartamenti Nr. 18 (Kati 7)',
      areaSqm: 145,
      floor: 7,
      roomsCount: 4,
      inventoryList: [
        'Sistem kondicionimi qendror VRF',
        'Verandë 40m² e shtruar me dru tik dhe xhama panoramikë',
        'Garazh i mbyllur me qepene automatike'
      ]
    },
    financialTerms: {
      priceOrRent: 245000,
      currency: 'EUR',
      depositAmount: 25000,
      paymentDayOfMonth: 1,
      paymentMethod: 'bank_transfer',
      bankIban: 'AL45 2051 1001 0000 0012 3456 7890',
      bankName: 'Banka Kombëtare Tregtare (BKT Vlorë)',
      handoverDate: '2026-05-15',
      penaltyPerDay: 50,
      utilitiesResponsibility: 'Të gjitha faturat e papaguara deri në ditën e dorëzimit mbulohen nga Shitësi.'
    },
    customClauses: [
      'Shitësi merr përsipër pajisjen me Vërtetim Pronësie (Hipotekë) të azhornuar brenda datës 30 Prill 2026.',
      'Shpenzimet noteriale dhe taksa e regjistrimit në ASHK ndahen sipas marrëveshjes (Blerësi mbulon tarifën noteriale).'
    ],
    articles: CONTRACT_TEMPLATES[1].defaultArticles,
    createdAt: '2026-03-15T09:30:00Z',
    updatedAt: '2026-03-19T16:15:00Z'
  }
];
