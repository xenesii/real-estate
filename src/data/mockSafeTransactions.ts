import { SafeTransactionData, SafeTransactionMilestone } from '../types';

export const DEFAULT_TRANSACTION_MILESTONES: SafeTransactionMilestone[] = [
  {
    id: 'm-1',
    stepNumber: 1,
    titleSq: 'Oferta & Miratimi i Çmimit',
    titleEn: 'Offer & Price Agreement',
    descriptionSq: 'Blerësi dhe Shitësi bien dakord për çmimin përfundimtar, kushtet e pagesës dhe afatet e dorëzimit.',
    descriptionEn: 'Buyer and Seller agree on final price, payment terms, and handover schedule.',
    status: 'completed',
    completedAt: '2026-03-15',
    assignedParty: 'buyer',
    requiredDocuments: ['Letërnjoftimi / Pasaporta', 'Oferta me Shkrim'],
    tipsSq: 'Sigurohuni që oferta të përfshijë qartë mobilimin, vendin e parkimit dhe detajet shtesë.',
    tipsEn: 'Ensure the offer explicitly specifies furniture, parking spaces, and additional items.'
  },
  {
    id: 'm-2',
    stepNumber: 2,
    titleSq: 'Parakontrata & Kapara (Earnest Deposit)',
    titleEn: 'Preliminary Contract & Deposit',
    descriptionSq: 'Hartimi i parakontratës me kaparë ligjore (zakonisht 5-10%) të bllokuar në llogari noteriale/bankare.',
    descriptionEn: 'Drafting preliminary agreement with legal earnest deposit (5-10%) held in escrow.',
    status: 'completed',
    completedAt: '2026-03-18',
    assignedParty: 'notary',
    requiredDocuments: ['Parakontrata e Shitblerjes', 'Dëshmia e Transferit të Kaparës'],
    tipsSq: 'Sipas LMD (Kosovë) dhe Kodit Civil (Shqipëri), nëse blerësi tërhiqet pa arsye humb kaparën, ndërsa shitësi e kthen dyfish.',
    tipsEn: 'Under regional law, earnest money protects both parties against unilateral withdrawal.'
  },
  {
    id: 'm-3',
    stepNumber: 3,
    titleSq: 'Due Diligence: Verifikimi Kadastral & Ligjor',
    titleEn: 'Due Diligence: Title & Cadastral Verification',
    descriptionSq: 'Verifikimi i Fletës Poseduese në AKK/ASHK, mungesa e barrëve hipotekare, tatimeve dhe lejes së ndërtimit.',
    descriptionEn: 'Title deed status verification, checking for liens, unpaid property taxes, and construction legalization.',
    status: 'completed',
    completedAt: '2026-03-22',
    assignedParty: 'cadastre',
    requiredDocuments: ['Kopja e Planit Kadastral', 'Certifikata e Pronësisë (jo më e vjetër se 5 ditë)', 'Vërtetimi i Tatimit në Pronë'],
    tipsSq: 'Noteri kryen qasje të drejtpërdrejtë në regjistrin elektronik kadastral para nënshkrimit.',
    tipsEn: 'The notary accesses the official digital land registry immediately prior to execution.'
  },
  {
    id: 'm-4',
    stepNumber: 4,
    titleSq: 'Miratimi i Kredisë Bankare (Nëse ka)',
    titleEn: 'Bank Mortgage Underwriting & Approval',
    descriptionSq: 'Vlerësimi nga vlerësuesi i licencuar i bankës dhe miratimi i kredisë hipotekare për blerësin.',
    descriptionEn: 'Independent bank appraisal valuation and mortgage underwriting clearance.',
    status: 'in_progress',
    assignedParty: 'bank',
    requiredDocuments: ['Raporti i Vlerësimit nga Banka', 'Miratimi i Financimit', 'Pëlqimi për Vendosje të Hipotekës'],
    tipsSq: 'Banka vendos hipotekën e radhës së parë në çastin e lidhjes së kontratës kryesore.',
    tipsEn: 'The lending bank registers a first-degree mortgage upon contract execution.'
  },
  {
    id: 'm-5',
    stepNumber: 5,
    titleSq: 'Nënshkrimi i Kontratës Finale te Noteri',
    titleEn: 'Final Deed Signing before Notary Public',
    descriptionSq: 'Nënshkrimi dhe solemnizimi zyrtar i Kontratës mbi Shitblerjen në zyrën e Noterit Publik.',
    descriptionEn: 'Official solemnization and notarization of the property purchase contract.',
    status: 'pending',
    assignedParty: 'notary',
    requiredDocuments: ['Kontrata Noteriale e Shitblerjes', 'Identifikimi i Palëve', 'Deklarata e Martesës / Pëlqimi i Bashkëshortit'],
    tipsSq: 'Për pronat e fituara gjatë martesës, kërkohet pëlqimi me shkrim i të dy bashkëshortëve sipas Ligjit për Familjen.',
    tipsEn: 'Both spouses must sign for marital community property transfers.'
  },
  {
    id: 'm-6',
    stepNumber: 6,
    titleSq: 'Pagesa e Plotë në Llogarinë e Mirëbesimit (Escrow)',
    titleEn: 'Escrow Settlement & Fund Clearance',
    descriptionSq: 'Transferimi i sigurt bankar i shumës së mbetur në llogarinë e shitësit pas konfirmimit noterial.',
    descriptionEn: 'Secure bank transfer of the remainder to the seller account following notary confirmation.',
    status: 'locked',
    assignedParty: 'buyer',
    requiredDocuments: ['Konfirmimi Bankar SWIFT/SEPA', 'Klauzola e Zhbllokimit Intabulandi'],
    tipsSq: 'Klauzola Intabulandi garanton që pagesa lirohet vetëm kur shitësi liron pronën dhe nënshkruan lejen e regjistrimit.',
    tipsEn: 'Clausula Intabulandi guarantees that funds are disbursed safely upon clear title transfer.'
  },
  {
    id: 'm-7',
    stepNumber: 7,
    titleSq: 'Regjistrimi në Kadastër & Dorëzimi i Çelësave',
    titleEn: 'Cadastral Title Transfer & Handover',
    descriptionSq: 'Regjistrimi i pronarit të ri në Agjencinë Kadastrale (AKK/ASHK) dhe dorëzimi fizik me Procesverbal.',
    descriptionEn: 'Final registration in the official Land Registry and physical key handover inspection.',
    status: 'locked',
    assignedParty: 'cadastre',
    requiredDocuments: ['Fleta e Re Poseduese', 'Procesverbali i Pranim-Dorëzimit'],
    tipsSq: 'Urime! Prona tani është 100% ligjërisht në emrin tuaj.',
    tipsEn: 'Congratulations! The property is now fully registered in your name.'
  }
];

export const INITIAL_ACTIVE_TRANSACTIONS: SafeTransactionData[] = [
  {
    id: 'trx-prn-901',
    listingId: 'list-1',
    listingTitle: 'Apartament Modern 2+1 në Arbëri',
    listingPrice: 128000,
    listingCover: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    buyerName: 'Alban Berisha (Diaspora Zvicër)',
    buyerPhone: '+41 79 123 4567',
    sellerName: 'Valon Krasniqi',
    sellerPhone: '+383 44 234 567',
    notaryName: 'Av. Fatmir Kastrati',
    notaryOffice: 'Zyra Noteriale Nr. 12, Prishtinë',
    notaryCity: 'Prishtinë',
    country: 'Kosovo',
    escrowAmount: 12800,
    currency: 'EUR',
    currentStepIndex: 3,
    milestones: DEFAULT_TRANSACTION_MILESTONES,
    createdAt: '2026-03-12T10:00:00Z',
    updatedAt: '2026-03-22T14:30:00Z'
  }
];
