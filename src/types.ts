export type TransactionType = 'sale' | 'rent';

export type PropertyCategory = 'residential' | 'commercial' | 'land' | 'parking' | 'other';

export type PropertyTypeSlug = 
  | 'apartment' 
  | 'house' 
  | 'villa' 
  | 'studio' 
  | 'penthouse'
  | 'duplex'
  | 'office' 
  | 'commercial' 
  | 'warehouse'
  | 'building'
  | 'land_building' 
  | 'land_agricultural' 
  | 'land_industrial'
  | 'garage' 
  | 'other';

export type ListingStatus = 
  | 'draft' 
  | 'pending' 
  | 'published' 
  | 'reserved' 
  | 'sold' 
  | 'rented' 
  | 'expired' 
  | 'archived' 
  | 'rejected';

export type UserRole = 'user' | 'agent' | 'agency_admin' | 'admin';

export type Currency = 'EUR' | 'ALL';
export type DisplayCurrency = 'EUR' | 'CHF' | 'USD' | 'GBP' | 'ALL';

export type RentPeriod = 'monthly' | 'daily';

export type PropertyCondition = 'new_construction' | 'renovated' | 'good' | 'needs_renovation' | 'under_construction';

export type FurnishedStatus = 'furnished' | 'semi_furnished' | 'unfurnished';

export type HeatingType = 'central_city' | 'central_electric' | 'pellet' | 'heat_pump' | 'air_conditioner' | 'wood' | 'none';

export type EnergyClass = 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'G';

export interface Location {
  id: string;
  country: 'Kosovo' | 'Albania';
  city: string;
  municipality: string;
  neighborhood: string;
  lat: number;
  lng: number;
  postalCode?: string;
  region?: string;
}

export interface Amenity {
  id: string;
  slug: string;
  nameSq: string;
  nameEn: string;
  icon: string;
  category: 'interior' | 'exterior' | 'comfort' | 'security';
}

export interface ListingPriceHistory {
  date: string;
  price: number;
  currency: Currency;
  note?: string;
}

export interface ListingMedia {
  id: string;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  isCover: boolean;
  order: number;
}

export interface Listing {
  id: string;
  slug: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  userRole: UserRole;
  isVerifiedOwner: boolean;
  agencyId?: string;
  agencyName?: string;
  agencyLogo?: string;
  
  transaction: TransactionType;
  propertyType: PropertyTypeSlug;
  category: PropertyCategory;
  
  titleSq: string;
  titleEn: string;
  descriptionSq: string;
  descriptionEn: string;
  
  price: number;
  currency: Currency;
  priceNegotiable: boolean;
  rentPeriod?: RentPeriod;
  deposit?: number;
  monthlyCharges?: number;
  availableFrom?: string;
  
  areaSqm: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  condition: PropertyCondition;
  furnished: FurnishedStatus;
  heating: HeatingType;
  energyClass?: EnergyClass;
  
  location: Location;
  exactAddress: string;
  displayAddress: string;
  isApproximateLocation: boolean;
  
  amenities: string[]; // Amenity slugs
  media: ListingMedia[];
  
  status: ListingStatus;
  rejectionReason?: string;
  viewsCount: number;
  favoritesCount: number;
  featured: boolean;
  verified: boolean;
  priceReduced: boolean;
  priceHistory: ListingPriceHistory[];
  
  // Sprint 08: 360 Tour
  hasVirtualTour?: boolean;
  virtualTourUrl?: string;
  
  // Sprint 09: Open House Event
  openHouse?: OpenHouseEvent;
  
  enablePhone: boolean;
  enableWhatsApp: boolean;
  enableViber: boolean;
  
  // Legal & Cadastral Verification (Sprint 5)
  cadastralZone?: string;
  parcelNumber?: string;
  titleDeedStatus?: 'clean_title' | 'in_process' | 'mortgaged' | 'unregistered';
  buildingPermitStatus?: 'permitted' | 'legalized' | 'under_legalization';
  notaryVerified?: boolean;
  
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  isVerified: boolean;
  agencyName?: string;
  agencyId?: string;
  bio?: string;
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  title: string;
  filters: SearchFilters;
  frequency: 'instant' | 'daily' | 'weekly';
  newMatchesCount: number;
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  transaction?: TransactionType;
  category?: PropertyCategory;
  propertyType?: string;
  country?: string;
  city?: string;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number | 'any';
  bathrooms?: number | 'any';
  furnished?: FurnishedStatus;
  condition?: PropertyCondition;
  heating?: HeatingType;
  amenities?: string[];
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'area_desc' | 'most_viewed';
  
  // Sprint 09: Commute & Isochrone Search
  commuteHubId?: string;
  maxCommuteMinutes?: number;
  commuteMode?: 'car' | 'transit' | 'walking';
  hasOpenHouse?: boolean;
}

export interface ConversationMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  messageText: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCover: string;
  listingPrice: number;
  listingCurrency: Currency;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ConversationMessage[];
}

export interface PropertyReport {
  id: string;
  listingId: string;
  listingTitle: string;
  reporterEmail: string;
  reason: 'fraud' | 'fake_property' | 'stolen_photos' | 'wrong_info' | 'inappropriate' | 'spam';
  details: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface PlatformSettings {
  brandName: string;
  taglineSq: string;
  taglineEn: string;
  supportEmail: string;
  supportPhone: string;
  defaultCurrency: Currency;
  eurToAllRate: number;
  requireListingModeration: boolean;
  allowGuestContacts: boolean;
}

export type ActiveView = 
  | 'home' 
  | 'search' 
  | 'detail' 
  | 'compare' 
  | 'publish' 
  | 'dashboard' 
  | 'admin'
  | 'agencies'
  | 'valuation'
  | 'market_insights'
  | 'diaspora'
  | 'neighborhoods'
  | 'financing'
  | 'developments'
  | 'investments'
  | 'contracts'
  | 'legal_contracts'
  | 'open_houses'
  | 'property_management'
  | 'contact';

export interface BankOffer {
  id: string;
  bankName: string;
  logo: string;
  country: 'Kosovo' | 'Albania';
  minInterestRate: number;
  maxInterestRate: number;
  fixedPeriodYears: number;
  maxTermYears: number;
  maxFinancingPercent: number;
  administrativeFeePercent: number;
  earlyRepaymentFee: string;
  highlights: string[];
  eligibilityRequirements: string[];
  contactEmail: string;
  contactPhone: string;
}

export interface NeighborhoodGuide {
  id: string;
  city: string;
  country: 'Kosovo' | 'Albania';
  name: string;
  tagline: string;
  descriptionSq: string;
  descriptionEn: string;
  coverImage: string;
  tags: string[];
  ratings: {
    walkability: number;
    greenSpaces: number;
    schoolsAndDaycare: number;
    publicTransit: number;
    safety: number;
    nightlifeAndCafes: number;
  };
  priceRangePerSqm: { min: number; max: number };
  avgRentMonthly: number;
  highlightPoints: string[];
  upcomingProjects: string[];
}

export interface NotaryEstimate {
  propertyPrice: number;
  country: 'Kosovo' | 'Albania';
  notaryFee: number;
  cadastralTax: number;
  transferTax: number;
  administrativeFee: number;
  totalEstimatedCost: number;
  notes: string[];
}

export interface DiasporaInquiry {
  id: string;
  name: string;
  residenceCountry: string; // e.g. Zvicër, Gjermani, Austri, SHBA, Angli
  phone: string;
  email: string;
  preferredCity: string;
  budgetRange: string;
  propertyType: string;
  needsPowerOfAttorneyHelp: boolean;
  needsRemoteInspection: boolean;
  message: string;
  createdAt: string;
}

export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverPhoto: string;
  city: string;
  country: 'Kosovo' | 'Albania';
  address: string;
  phone: string;
  email: string;
  website?: string;
  licenseNumber: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  descriptionSq: string;
  descriptionEn: string;
  activeListingsCount: number;
  soldCount: number;
  foundedYear: number;
  specialties: string[];
}

export interface Agent {
  id: string;
  name: string;
  agencyId: string;
  agencyName: string;
  photo: string;
  titleSq: string;
  titleEn: string;
  phone: string;
  email: string;
  languages: string[];
  activeListingsCount: number;
  rating: number;
  dealsClosed: number;
  bioSq: string;
  bioEn: string;
}

export interface ViewingRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCover: string;
  listingPrice: number;
  listingCity: string;
  type: 'in_person' | 'virtual_tour';
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface MarketStat {
  city: string;
  country: 'Kosovo' | 'Albania';
  avgPricePerSqmSale: number;
  avgPriceRentMonthly: number;
  quarterlyGrowth: number;
  demandLevel: 'Shumë e Lartë' | 'E Lartë' | 'Mesatare';
  topNeighborhoods: string[];
  popularType: string;
  totalActiveListings: number;
}

export interface ValuationParams {
  city: string;
  neighborhood: string;
  category: PropertyCategory;
  propertyType: PropertyTypeSlug;
  areaSqm: number;
  bedrooms?: number;
  condition: PropertyCondition;
  yearBuilt?: number;
  floor?: number;
  hasElevator?: boolean;
  hasParking?: boolean;
  hasBalcony?: boolean;
}

export interface ValuationResult {
  estimatedPriceMin: number;
  estimatedPriceAvg: number;
  estimatedPriceMax: number;
  pricePerSqmAvg: number;
  confidenceScore: number; // 0 - 100%
  marketTrend: 'rising' | 'stable' | 'cooling';
  growthRateYoY: number;
  comparableListingIds: string[];
}

export type ConstructionStatus = 
  | 'planning' 
  | 'excavation' 
  | 'structure' 
  | 'facade_finishing' 
  | 'interior_works' 
  | 'ready_to_move';

export interface DevelopmentUnit {
  id: string;
  type: string; // e.g. "1+1", "2+1", "3+1", "Duplex Penthouse", "Vilë Tipike"
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  startingPrice: number;
  availableUnits: number;
  floorPlanImage: string;
}

export interface DevelopmentProject {
  id: string;
  name: string;
  developerName: string;
  developerLogo?: string;
  city: string;
  neighborhood: string;
  country: 'Kosovo' | 'Albania';
  status: ConstructionStatus;
  statusLabelSq: string;
  expectedCompletionDate: string;
  totalUnits: number;
  availableUnitsCount: number;
  startingPricePerSqm: number;
  totalStartingPrice: number;
  tagline: string;
  descriptionSq: string;
  descriptionEn: string;
  coverImage: string;
  galleryImages: string[];
  features: string[];
  paymentPlans: {
    downPaymentPercent: number;
    installmentsCount: number;
    interestFree: boolean;
    descriptionSq: string;
  }[];
  units: DevelopmentUnit[];
  permitNumber: string;
  permitIssuingAuthority: string;
  contactPhone: string;
  contactEmail: string;
  lat: number;
  lng: number;
}

export interface InvestmentParams {
  purchasePrice: number;
  downPaymentPercent: number;
  loanTermYears: number;
  interestRate: number;
  rentalStrategy: 'long_term' | 'short_term_airbnb';
  monthlyRentExpected?: number;
  nightlyRateExpected?: number;
  occupancyRateDaysPerYear?: number;
  monthlyMaintenanceFee: number;
  propertyManagementFeePercent: number;
  annualInsuranceCost: number;
  annualPropertyTax: number;
  rentalIncomeTaxPercent: number;
  annualAppreciationRate: number;
}

export interface InvestmentResult {
  totalInitialInvestment: number;
  loanAmount: number;
  monthlyMortgagePayment: number;
  annualGrossRentalIncome: number;
  annualOperatingExpenses: number;
  annualNetOperatingIncome: number;
  annualCashFlow: number;
  grossRentalYield: number; // %
  netRentalYield: number; // %
  capRate: number; // %
  cashOnCashReturn: number; // %
  projectedValue5Years: number;
  projectedValue10Years: number;
  totalEquityAccumulated10Years: number;
}

// Sprint 08: Real-Time Alerts & Notification Center
export interface AppNotification {
  id: string;
  type: 'price_drop' | 'new_match' | 'viewing_update' | 'viewing_confirmed' | 'legal_verified' | 'inquiry_received' | 'new_listing' | 'contract_created' | 'open_house_rsvp' | 'system';
  title: string;
  message: string;
  listingId?: string;
  listingTitle?: string;
  listingImage?: string;
  priceOld?: number;
  priceNew?: number;
  timestamp: string;
  isRead: boolean;
  actionView?: ActiveView;
}

// Sprint 08: 360° Virtual Tour & Interactive Walkthrough
export interface VirtualTourHotspot {
  id: string;
  targetRoomId: string;
  labelSq: string;
  labelEn: string;
  x: number; // 0 to 100% position on panorama view
  y: number; // 0 to 100% position
}

export interface VirtualTourFeatureTag {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
}

export interface VirtualTourRoom {
  id: string;
  nameSq: string;
  nameEn: string;
  panoramaUrl: string;
  roomType: 'living' | 'kitchen' | 'bedroom' | 'balcony' | 'bathroom' | 'corridor' | 'exterior';
  dimensions: string; // e.g. "5.4m x 4.2m"
  areaSqm: number;
  floorPlanCoords: { x: number; y: number }; // percentage on floor plan
  hotspots: VirtualTourHotspot[];
  features: VirtualTourFeatureTag[];
}

export interface VirtualTourData {
  id: string;
  listingId: string;
  listingTitle: string;
  floorPlanUrl: string;
  rooms: VirtualTourRoom[];
}

// Sprint 08: Agency & Broker CRM Lead Pipeline
export type LeadStage = 
  | 'new_inquiry' 
  | 'viewing_scheduled' 
  | 'negotiation' 
  | 'under_notary' 
  | 'closed_won' 
  | 'lost';

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
  authorName: string;
}

export interface CrmLead {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientLocation?: string;
  listingId: string;
  listingTitle: string;
  dealValue: number;
  stage: LeadStage;
  source: 'web_inquiry' | 'diaspora_form' | 'whatsapp' | 'phone_call';
  notes: LeadNote[];
  nextFollowUpDate?: string;
  lastContactedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Sprint 08: Legal & Closing Cost Calculator
export interface ClosingCostBreakdown {
  propertyPrice: number;
  country: 'Kosovo' | 'Albania';
  isFirstHomeBuyer: boolean;
  isNewConstruction: boolean;
  hasMortgage: boolean;
  notaryContractFee: number;
  cadastralRegistrationFee: number;
  municipalStampDuty: number;
  titleDeedVerificationFee: number;
  propertyTaxAnnual: number;
  bankMortgagePledgeFee: number;
  legalDueDiligenceFee: number;
  totalClosingCost: number;
  effectivePercent: number;
  legalChecklist: { title: string; desc: string; mandatory: boolean }[];
}

// Sprint 09: Legal Contracts & Document Hub
export type ContractTemplateType = 
  | 'residential_lease'
  | 'commercial_lease'
  | 'sales_preliminary'
  | 'handover_protocol'
  | 'diaspora_power_of_attorney';

export interface ContractParty {
  fullName: string;
  personalId: string; // Numri Personal / NIPT
  address: string;
  city: string;
  phone: string;
  email: string;
  isCompany?: boolean;
  companyName?: string;
  fiscalNumber?: string;
}

export interface ContractArticle {
  number: number;
  titleSq: string;
  titleEn: string;
  contentSq: string;
  contentEn: string;
  isCustomizable?: boolean;
}

export interface LegalContractData {
  id: string;
  templateType: ContractTemplateType;
  title: string;
  jurisdiction: 'Kosovo' | 'Albania';
  governingLaw: string; // e.g. "Ligji Nr. 04/L-077 për Marrëdhëniet e Detyrimeve të Kosovës"
  status: 'draft' | 'ready_to_sign' | 'executed' | 'notarized';
  partyA: ContractParty; // Landlord / Seller / Grantor
  partyB: ContractParty; // Tenant / Buyer / Attorney-in-Fact
  property: {
    listingId?: string;
    title: string;
    address: string;
    city: string;
    municipality: string;
    cadastralZone?: string;
    parcelNumber?: string;
    propertyNumber?: string;
    areaSqm: number;
    floor?: number;
    roomsCount?: number;
    inventoryList?: string[];
  };
  financialTerms: {
    priceOrRent: number;
    currency: Currency;
    depositAmount?: number;
    paymentDayOfMonth?: number;
    paymentMethod: 'bank_transfer' | 'cash';
    bankIban?: string;
    bankName?: string;
    handoverDate: string;
    contractDurationMonths?: number;
    penaltyPerDay?: number;
    utilitiesResponsibility: string;
  };
  customClauses?: string[];
  articles: ContractArticle[];
  createdAt: string;
  updatedAt: string;
}

// Sprint 09: Open House & Virtual Live Stream Events
export interface OpenHouseEvent {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCover: string;
  listingPrice: number;
  city: string;
  country: 'Kosovo' | 'Albania';
  address: string;
  date: string; // "2026-04-04"
  startTime: string; // "11:00"
  endTime: string; // "14:00"
  type: 'in_person' | 'live_stream' | 'hybrid';
  liveStreamPlatform?: 'zoom' | 'youtube' | 'instagram' | 'built_in';
  liveStreamUrl?: string;
  maxAttendees: number;
  currentRsvps: number;
  rsvpList?: { name: string; email: string; phone: string; timestamp: string }[];
  agentName: string;
  agentPhone: string;
  agentAvatar?: string;
  notes?: string;
}

// Sprint 09: Commute & Isochrone Search Hubs
export interface CommuteHub {
  id: string;
  name: string;
  city: string;
  country: 'Kosovo' | 'Albania';
  category: 'center' | 'hospital' | 'university' | 'mall' | 'transport';
  lat: number;
  lng: number;
  description: string;
}

// Sprint 10: AI Matchmaker & Smart Buyer Profiler
export interface MatchmakerCriteria {
  purpose: 'living' | 'investment' | 'diaspora_vacation' | 'commercial';
  transaction: 'sale' | 'rent';
  targetCities: string[];
  maxBudget: number;
  minBedrooms: number;
  preferredCategories: PropertyCategory[];
  mustHaves: {
    parking: boolean;
    elevator: boolean;
    balcony: boolean;
    cleanTitle: boolean;
    bankMortgageEligible: boolean;
    newConstruction: boolean;
    furnished: boolean;
  };
  commutePriority?: {
    hubId: string;
    maxMinutes: number;
  };
}

export interface MatchedListingResult {
  listing: Listing;
  score: number; // 0-100
  matchReasons: string[];
  highlightBadge: string;
}

// Sprint 10: Digital Escrow & Safe Transaction Pipeline
export type TransactionStepStatus = 'completed' | 'in_progress' | 'pending' | 'locked';

export interface SafeTransactionMilestone {
  id: string;
  stepNumber: number;
  titleSq: string;
  titleEn: string;
  descriptionSq: string;
  descriptionEn: string;
  status: TransactionStepStatus;
  completedAt?: string;
  assignedParty: 'buyer' | 'seller' | 'notary' | 'bank' | 'cadastre';
  requiredDocuments: string[];
  tipsSq: string;
  tipsEn: string;
}

export interface SafeTransactionData {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingCover: string;
  buyerName: string;
  buyerPhone: string;
  sellerName: string;
  sellerPhone: string;
  notaryName: string;
  notaryOffice: string;
  notaryCity: string;
  country: 'Kosovo' | 'Albania';
  escrowAmount: number;
  currency: Currency;
  milestones: SafeTransactionMilestone[];
  currentStepIndex: number;
  createdAt: string;
  updatedAt: string;
}

// Sprint 11 & 13: Tenant Application, Screening & Landlord Property Management
export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface TenantApplication {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingCover: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  employmentStatus: 'employed' | 'self_employed' | 'student' | 'diaspora_income' | 'other';
  employerName?: string;
  monthlyIncome: number;
  occupantsCount: number;
  hasPets: boolean;
  moveInDate: string;
  proposedLeaseMonths: number;
  screeningScore: number; // 0-100
  status: ApplicationStatus;
  createdAt: string;
}

export type MaintenanceUrgency = 'low' | 'medium' | 'high' | 'emergency';
export type MaintenanceStatus = 'open' | 'in_progress' | 'resolved';

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  tenantPhone: string;
  category: 'plumbing' | 'electrical' | 'heating' | 'appliances' | 'key_lock' | 'other';
  title: string;
  description: string;
  urgency: MaintenanceUrgency;
  status: MaintenanceStatus;
  reportedDate: string;
}

export interface RentPaymentRecord {
  id: string;
  propertyTitle: string;
  tenantName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
}


