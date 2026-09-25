import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Listing, SearchFilters, UserProfile, Conversation, 
  SavedSearch, PropertyReport, PlatformSettings, Currency,
  Agency, Agent, MarketStat, ViewingRequest, ActiveView,
  BankOffer, NeighborhoodGuide, DiasporaInquiry,
  DevelopmentProject, AppNotification, VirtualTourData,
  CrmLead, LeadStage, LeadNote, DisplayCurrency,
  LegalContractData, OpenHouseEvent, SafeTransactionData,
  TransactionStepStatus, TenantApplication, MaintenanceTicket,
  RentPaymentRecord, ApplicationStatus, MaintenanceStatus
} from '../types';
import { INITIAL_LISTINGS } from '../data/mockListings';
import { 
  INITIAL_CONVERSATIONS, INITIAL_SAVED_SEARCHES, 
  INITIAL_REPORTS, INITIAL_SETTINGS 
} from '../data/mockInteractions';
import { 
  INITIAL_AGENCIES, INITIAL_AGENTS, 
  INITIAL_MARKET_STATS, INITIAL_VIEWING_REQUESTS 
} from '../data/mockAgencies';
import { INITIAL_BANK_OFFERS, INITIAL_NEIGHBORHOODS } from '../data/mockGuides';
import { INITIAL_DEVELOPMENTS } from '../data/mockDevelopments';
import { INITIAL_VIRTUAL_TOURS } from '../data/mockVirtualTours';
import { INITIAL_NOTIFICATIONS } from '../data/mockNotifications';
import { INITIAL_CRM_LEADS } from '../data/mockCrmLeads';
import { INITIAL_SAVED_CONTRACTS } from '../data/mockContracts';
import { INITIAL_OPEN_HOUSES } from '../data/mockOpenHouses';
import { INITIAL_ACTIVE_TRANSACTIONS } from '../data/mockSafeTransactions';
import { 
  INITIAL_TENANT_APPLICATIONS, 
  INITIAL_MAINTENANCE_TICKETS, 
  INITIAL_RENT_PAYMENTS 
} from '../data/mockRentalManagement';

interface AppContextType {
  listings: Listing[];
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  comparedIds: string[];
  toggleCompare: (listingId: string) => void;
  removeCompare: (listingId: string) => void;
  clearCompare: () => void;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetFilters: () => void;
  activeListing: Listing | null;
  setActiveListing: (listing: Listing | null) => void;
  currentUser: UserProfile;
  addListing: (newListing: Listing) => void;
  updateListingStatus: (id: string, status: Listing['status'], rejectionReason?: string) => void;
  updateListingPrice: (id: string, newPrice: number, note?: string) => void;
  deleteListing: (id: string) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  
  // Messaging & Conversations (Sprint 3)
  conversations: Conversation[];
  sendInquiry: (params: {
    listingId: string;
    listingTitle: string;
    listingCover: string;
    listingPrice: number;
    listingCurrency: Currency;
    messageText: string;
    senderName: string;
    senderEmail: string;
    senderPhone?: string;
  }) => string; // returns conversationId
  sendMessage: (conversationId: string, text: string) => void;
  markConversationRead: (conversationId: string) => void;
  unreadMessagesCount: number;

  // Saved Searches & Alerts (Sprint 3)
  savedSearches: SavedSearch[];
  saveSearch: (title: string, filtersToSave: SearchFilters, frequency?: 'instant' | 'daily' | 'weekly') => void;
  deleteSavedSearch: (id: string) => void;
  applySavedSearch: (savedSearch: SavedSearch) => void;

  // Property Reports & Trust (Sprint 3)
  reports: PropertyReport[];
  addReport: (params: {
    listingId: string;
    listingTitle: string;
    reporterEmail: string;
    reason: PropertyReport['reason'];
    details: string;
  }) => void;
  updateReportStatus: (id: string, status: PropertyReport['status']) => void;

  // Platform Settings (Sprint 3)
  platformSettings: PlatformSettings;
  updatePlatformSettings: (settings: Partial<PlatformSettings>) => void;

  // Sprint 4: Agencies, Viewings, & Market Analytics
  agencies: Agency[];
  agents: Agent[];
  selectedAgencyId: string | null;
  setSelectedAgencyId: (id: string | null) => void;
  marketStats: MarketStat[];
  viewingRequests: ViewingRequest[];
  scheduleViewing: (params: {
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
  }) => string;
  updateViewingStatus: (id: string, status: ViewingRequest['status']) => void;
  valuationPrefill: { price: number; type: string; city: string } | null;
  setValuationPrefill: (prefill: { price: number; type: string; city: string } | null) => void;

  // Sprint 5: Diaspora, Financing & Neighborhood Guides
  bankOffers: BankOffer[];
  neighborhoodGuides: NeighborhoodGuide[];
  diasporaInquiries: DiasporaInquiry[];
  addDiasporaInquiry: (params: Omit<DiasporaInquiry, 'id' | 'createdAt'>) => string;
  currency: DisplayCurrency;
  setCurrency: (c: DisplayCurrency) => void;
  convertPrice: (priceInEur: number) => { amount: number; formatted: string; symbol: string };

  // Sprint 7: New Residential Developments & Investment ROI Engine
  developments: DevelopmentProject[];
  selectedDevelopmentId: string | null;
  setSelectedDevelopmentId: (id: string | null) => void;
  investmentPrefill: { price: number; rentMonthly?: number; city: string; title: string; areaSqm?: number } | null;
  setInvestmentPrefill: (prefill: { price: number; rentMonthly?: number; city: string; title: string; areaSqm?: number } | null) => void;

  // Sprint 8: Real-Time Alerts & Notification Center
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;

  // Sprint 8: 360° Virtual Tour Experience
  virtualTours: Record<string, VirtualTourData>;
  activeVirtualTour: VirtualTourData | null;
  isVirtualTourOpen: boolean;
  openVirtualTour: (listingId: string) => void;
  closeVirtualTour: () => void;

  // Sprint 8: Agent & Broker CRM Lead Pipeline
  crmLeads: CrmLead[];
  updateLeadStage: (leadId: string, newStage: LeadStage) => void;
  addLeadNote: (leadId: string, noteText: string, authorName?: string) => void;
  addCrmLead: (lead: Omit<CrmLead, 'id' | 'createdAt' | 'updatedAt' | 'notes'> & { initialNote?: string }) => void;
  updateLead: (leadId: string, updates: Partial<CrmLead>) => void;

  // Sprint 8: Closing Costs Calculator Modal
  isClosingCostsOpen: boolean;
  closingCostsPrice: number;
  openClosingCosts: (price: number) => void;
  openClosingCostsModal: (price?: number, country?: 'Kosovo' | 'Albania') => void;
  closeClosingCosts: () => void;

  // Sprint 09: Legal Contracts & Document Hub
  contracts: LegalContractData[];
  saveContract: (contract: LegalContractData) => void;
  deleteContract: (contractId: string) => void;
  updateContractStatus: (contractId: string, status: LegalContractData['status']) => void;
  isContractModalOpen: boolean;
  contractModalListing: Listing | null;
  openContractBuilder: (listing?: Listing | null) => void;
  closeContractBuilder: () => void;

  // Sprint 09: Open House & Virtual Live Events
  openHouses: OpenHouseEvent[];
  rsvpOpenHouse: (eventId: string, guest: { name: string; email: string; phone: string }) => void;
  scheduleOpenHouse: (event: Omit<OpenHouseEvent, 'id' | 'currentRsvps' | 'rsvpList'>) => void;

  // Sprint 10: Escrow & Safe Transactions & AI Matchmaker
  activeTransactions: SafeTransactionData[];
  updateTransactionMilestone: (txId: string, milestoneId: string, status: TransactionStepStatus) => void;
  isTransactionTrackerOpen: boolean;
  activeTransactionId: string | null;
  openTransactionTracker: (txId?: string) => void;
  closeTransactionTracker: () => void;
  isMatchmakerOpen: boolean;
  openMatchmaker: () => void;
  closeMatchmaker: () => void;

  // Sprint 11: Rental Property Management & Screening
  tenantApplications: TenantApplication[];
  submitTenantApplication: (appData: Omit<TenantApplication, 'id' | 'createdAt' | 'status' | 'screeningScore'>) => void;
  updateTenantApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  isTenantApplicationModalOpen: boolean;
  tenantApplicationModalListing: Listing | null;
  openTenantApplicationModal: (listing?: Listing | null) => void;
  closeTenantApplicationModal: () => void;
  maintenanceTickets: MaintenanceTicket[];
  addMaintenanceTicket: (ticket: Omit<MaintenanceTicket, 'id'>) => void;
  updateMaintenanceStatus: (ticketId: string, status: MaintenanceStatus) => void;
  rentPayments: RentPaymentRecord[];
}

const defaultUser: UserProfile = {
  id: 'usr-agent-01',
  name: 'Kreshnik Krasniqi',
  email: 'kreshnik@realestatekosova.com',
  phone: '+38344123456',
  role: 'agent',
  isVerified: true,
  agencyName: 'Kosovë Real Estate Partners',
  agencyId: 'agency-01',
  createdAt: '2026-01-15T10:00:00Z',
};

const defaultFilters: SearchFilters = {
  query: '',
  transaction: undefined,
  propertyType: 'all',
  country: 'all',
  city: 'all',
  minPrice: undefined,
  maxPrice: undefined,
  bedrooms: 'any',
  sortBy: 'newest',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('pronat_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('pronat_favorites');
    return saved ? JSON.parse(saved) : ['prop-001', 'prop-002'];
  });

  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [currentUser] = useState<UserProfile>(defaultUser);

  // Sprint 3 States
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('pronat_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() => {
    const saved = localStorage.getItem('pronat_saved_searches');
    return saved ? JSON.parse(saved) : INITIAL_SAVED_SEARCHES;
  });

  const [reports, setReports] = useState<PropertyReport[]>(() => {
    const saved = localStorage.getItem('pronat_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('pronat_platform_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Sprint 4 States
  const [agencies] = useState<Agency[]>(INITIAL_AGENCIES);
  const [agents] = useState<Agent[]>(INITIAL_AGENTS);
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);
  const [marketStats] = useState<MarketStat[]>(INITIAL_MARKET_STATS);
  const [viewingRequests, setViewingRequests] = useState<ViewingRequest[]>(() => {
    const saved = localStorage.getItem('pronat_viewing_requests');
    return saved ? JSON.parse(saved) : INITIAL_VIEWING_REQUESTS;
  });
  const [valuationPrefill, setValuationPrefill] = useState<{ price: number; type: string; city: string } | null>(null);

  // Sprint 7 States
  const [developments] = useState<DevelopmentProject[]>(INITIAL_DEVELOPMENTS);
  const [selectedDevelopmentId, setSelectedDevelopmentId] = useState<string | null>(null);
  const [investmentPrefill, setInvestmentPrefill] = useState<{ price: number; rentMonthly?: number; city: string; title: string; areaSqm?: number } | null>(null);

  useEffect(() => {
    localStorage.setItem('pronat_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('pronat_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('pronat_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('pronat_saved_searches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  useEffect(() => {
    localStorage.setItem('pronat_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('pronat_platform_settings', JSON.stringify(platformSettings));
  }, [platformSettings]);

  useEffect(() => {
    localStorage.setItem('pronat_viewing_requests', JSON.stringify(viewingRequests));
  }, [viewingRequests]);

  const scheduleViewing = (params: {
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
  }) => {
    const newId = `viewing-${Date.now()}`;
    const newReq: ViewingRequest = {
      id: newId,
      ...params,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setViewingRequests(prev => [newReq, ...prev]);
    return newId;
  };

  const updateViewingStatus = (id: string, status: ViewingRequest['status']) => {
    setViewingRequests(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleCompare = (id: string) => {
    setComparedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        alert('Mund të krahasoni deri në 4 prona njëkohësisht.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeCompare = (id: string) => {
    setComparedIds(prev => prev.filter(item => item !== id));
  };

  const clearCompare = () => setComparedIds([]);

  const resetFilters = () => setFilters(defaultFilters);

  const addListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
  };

  const updateListingStatus = (id: string, status: Listing['status'], rejectionReason?: string) => {
    setListings(prev => prev.map(l => {
      if (l.id === id) {
        return { ...l, status, rejectionReason: rejectionReason || l.rejectionReason, updatedAt: new Date().toISOString() };
      }
      return l;
    }));
  };

  const updateListingPrice = (id: string, newPrice: number, note?: string) => {
    setListings(prev => prev.map(l => {
      if (l.id === id) {
        const isReduction = newPrice < l.price;
        const newHistory = [
          ...l.priceHistory,
          {
            date: new Date().toISOString().split('T')[0],
            price: newPrice,
            currency: l.currency,
            note: note || (isReduction ? 'Çmim i zbritur nga pronari' : 'Përditësim i çmimit')
          }
        ];
        return {
          ...l,
          price: newPrice,
          priceReduced: isReduction ? true : l.priceReduced,
          priceHistory: newHistory,
          updatedAt: new Date().toISOString()
        };
      }
      return l;
    }));
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(l => l.id !== id));
  };

  // Messaging functions (Sprint 3)
  const sendInquiry = (params: {
    listingId: string;
    listingTitle: string;
    listingCover: string;
    listingPrice: number;
    listingCurrency: Currency;
    messageText: string;
    senderName: string;
    senderEmail: string;
    senderPhone?: string;
  }) => {
    const existing = conversations.find(c => c.listingId === params.listingId && c.participantName === params.senderName);
    const now = new Date().toISOString();
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id === 'usr-agent-01' ? 'usr-guest' : currentUser.id,
      senderName: params.senderName,
      senderRole: 'user' as const,
      messageText: params.messageText,
      timestamp: now,
      isRead: false
    };

    if (existing) {
      setConversations(prev => prev.map(c => {
        if (c.id === existing.id) {
          return {
            ...c,
            lastMessage: params.messageText,
            lastMessageTime: now,
            unreadCount: c.unreadCount + 1,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      }));
      return existing.id;
    } else {
      const newConvId = `conv-${Date.now()}`;
      const newConv: Conversation = {
        id: newConvId,
        listingId: params.listingId,
        listingTitle: params.listingTitle,
        listingCover: params.listingCover,
        listingPrice: params.listingPrice,
        listingCurrency: params.listingCurrency,
        participantId: `usr-guest-${Date.now()}`,
        participantName: params.senderName,
        lastMessage: params.messageText,
        lastMessageTime: now,
        unreadCount: 1,
        messages: [newMsg]
      };
      setConversations(prev => [newConv, ...prev]);
      return newConvId;
    }
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const now = new Date().toISOString();
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: currentUser.role,
          messageText: text.trim(),
          timestamp: now,
          isRead: true
        };
        return {
          ...c,
          lastMessage: text.trim(),
          lastMessageTime: now,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  const markConversationRead = (conversationId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map(m => ({ ...m, isRead: true }))
        };
      }
      return c;
    }));
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Saved searches (Sprint 3)
  const saveSearch = (title: string, filtersToSave: SearchFilters, frequency: 'instant' | 'daily' | 'weekly' = 'instant') => {
    const newSaved: SavedSearch = {
      id: `save-${Date.now()}`,
      userId: currentUser.id,
      title: title.trim() || 'Kërkim i Ruajtur',
      filters: { ...filtersToSave },
      frequency,
      newMatchesCount: 0,
      createdAt: new Date().toISOString()
    };
    setSavedSearches(prev => [newSaved, ...prev]);
  };

  const deleteSavedSearch = (id: string) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
  };

  const applySavedSearch = (savedSearch: SavedSearch) => {
    setFilters({ ...savedSearch.filters });
    setActiveView('search');
  };

  // Property reports (Sprint 3)
  const addReport = (params: {
    listingId: string;
    listingTitle: string;
    reporterEmail: string;
    reason: PropertyReport['reason'];
    details: string;
  }) => {
    const newReport: PropertyReport = {
      id: `rep-${Date.now()}`,
      listingId: params.listingId,
      listingTitle: params.listingTitle,
      reporterEmail: params.reporterEmail,
      reason: params.reason,
      details: params.details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setReports(prev => [newReport, ...prev]);
  };

  const updateReportStatus = (id: string, status: PropertyReport['status']) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Platform settings (Sprint 3)
  const updatePlatformSettings = (newSettings: Partial<PlatformSettings>) => {
    setPlatformSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Sprint 5: Bank Offers, Neighborhoods, Diaspora & Currency
  const [bankOffers] = useState<BankOffer[]>(INITIAL_BANK_OFFERS);
  const [neighborhoodGuides] = useState<NeighborhoodGuide[]>(INITIAL_NEIGHBORHOODS);
  
  const [diasporaInquiries, setDiasporaInquiries] = useState<DiasporaInquiry[]>(() => {
    const saved = localStorage.getItem('pronat_diaspora_inquiries');
    return saved ? JSON.parse(saved) : [
      {
        id: 'diasp-001',
        name: 'Arben Berisha',
        residenceCountry: 'Zvicër 🇨🇭 (Zürich)',
        phone: '+41 79 123 45 67',
        email: 'arben.b@bluewin.ch',
        preferredCity: 'Prishtinë',
        budgetRange: '€180,000 - €250,000',
        propertyType: 'Penthouse / Banesë 3+1',
        needsPowerOfAttorneyHelp: true,
        needsRemoteInspection: true,
        message: 'Kërkoj një apartament modern në Dragodan ose Mati 1 me pamje të hapur dhe garazh nëntokësor.',
        createdAt: '2026-03-12T14:30:00Z'
      },
      {
        id: 'diasp-002',
        name: 'Elira Kastrati',
        residenceCountry: 'Gjermani 🇩🇪 (München)',
        phone: '+49 170 9876543',
        email: 'elira.kastrati@web.de',
        preferredCity: 'Vlorë',
        budgetRange: '€120,000 - €180,000',
        propertyType: 'Apartament 2+1 në Vijën e Parë të Detit',
        needsPowerOfAttorneyHelp: true,
        needsRemoteInspection: true,
        message: 'Dua të investoj në Lungomare për qira turistike verore dhe pushime familjare.',
        createdAt: '2026-03-15T09:15:00Z'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('pronat_diaspora_inquiries', JSON.stringify(diasporaInquiries));
  }, [diasporaInquiries]);

  const addDiasporaInquiry = (params: Omit<DiasporaInquiry, 'id' | 'createdAt'>): string => {
    const newInquiry: DiasporaInquiry = {
      ...params,
      id: `diasp-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setDiasporaInquiries(prev => [newInquiry, ...prev]);
    return newInquiry.id;
  };

  const [currency, setCurrency] = useState<DisplayCurrency>(() => {
    const saved = localStorage.getItem('pronat_currency');
    return (saved as DisplayCurrency) || 'EUR';
  });

  useEffect(() => {
    localStorage.setItem('pronat_currency', currency);
  }, [currency]);

  const convertPrice = (priceInEur: number) => {
    const rates: Record<DisplayCurrency, { rate: number; symbol: string }> = {
      EUR: { rate: 1, symbol: '€' },
      CHF: { rate: 0.96, symbol: 'CHF' },
      USD: { rate: 1.09, symbol: '$' },
      GBP: { rate: 0.85, symbol: '£' },
      ALL: { rate: 100, symbol: 'Lek' },
    };
    const { rate, symbol } = rates[currency] || rates.EUR;
    const amount = Math.round(priceInEur * rate);
    let formatted = '';
    if (symbol === '€') {
      formatted = `€${amount.toLocaleString()}`;
    } else if (symbol === 'CHF') {
      formatted = `${amount.toLocaleString()} CHF`;
    } else if (symbol === '$') {
      formatted = `$${amount.toLocaleString()}`;
    } else if (symbol === 'Lek') {
      formatted = `${amount.toLocaleString()} Lek`;
    } else {
      formatted = `£${amount.toLocaleString()}`;
    }
    return { amount, formatted, symbol };
  };

  // Sprint 8: Real-Time Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('pronat_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('pronat_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Sprint 8: 360° Virtual Tour Experience
  const [virtualTours] = useState<Record<string, VirtualTourData>>(INITIAL_VIRTUAL_TOURS);
  const [activeVirtualTour, setActiveVirtualTour] = useState<VirtualTourData | null>(null);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState<boolean>(false);

  const openVirtualTour = (listingId: string) => {
    const tour = virtualTours[listingId] || virtualTours['prop-001'];
    setActiveVirtualTour(tour);
    setIsVirtualTourOpen(true);
  };

  const closeVirtualTour = () => {
    setIsVirtualTourOpen(false);
    setActiveVirtualTour(null);
  };

  // Sprint 8: Agent CRM Lead Pipeline
  const [crmLeads, setCrmLeads] = useState<CrmLead[]>(() => {
    const saved = localStorage.getItem('pronat_crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_CRM_LEADS;
  });

  useEffect(() => {
    localStorage.setItem('pronat_crm_leads', JSON.stringify(crmLeads));
  }, [crmLeads]);

  const updateLeadStage = (leadId: string, newStage: LeadStage) => {
    setCrmLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          stage: newStage,
          updatedAt: new Date().toISOString()
        };
      }
      return lead;
    }));
  };

  const addLeadNote = (leadId: string, noteText: string, authorName: string = 'Kreshnik Krasniqi') => {
    const newNote: LeadNote = {
      id: `note-${Date.now()}`,
      text: noteText,
      createdAt: new Date().toISOString(),
      authorName
    };
    setCrmLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          notes: [newNote, ...lead.notes],
          updatedAt: new Date().toISOString()
        };
      }
      return lead;
    }));
  };

  const addCrmLead = (lead: Omit<CrmLead, 'id' | 'createdAt' | 'updatedAt' | 'notes'> & { initialNote?: string }) => {
    const initialNotes: LeadNote[] = lead.initialNote ? [{
      id: `note-${Date.now()}`,
      text: lead.initialNote,
      createdAt: new Date().toISOString(),
      authorName: 'Sistemi / Agjenti'
    }] : [];

    const newLead: CrmLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      notes: initialNotes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCrmLeads(prev => [newLead, ...prev]);
  };

  const updateLead = (leadId: string, updates: Partial<CrmLead>) => {
    setCrmLeads(prev => prev.map(l => l.id === leadId ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l));
  };

  // Sprint 8: Closing Costs Calculator Modal
  const [isClosingCostsOpen, setIsClosingCostsOpen] = useState<boolean>(false);
  const [closingCostsPrice, setClosingCostsPrice] = useState<number>(100000);

  const openClosingCosts = (price: number) => {
    setClosingCostsPrice(price || 100000);
    setIsClosingCostsOpen(true);
  };

  const openClosingCostsModal = (price?: number, _country?: 'Kosovo' | 'Albania') => {
    setClosingCostsPrice(price || 100000);
    setIsClosingCostsOpen(true);
  };

  const closeClosingCosts = () => {
    setIsClosingCostsOpen(false);
  };

  // Sprint 09: Legal Contracts & Document Hub
  const [contracts, setContracts] = useState<LegalContractData[]>(() => {
    const saved = localStorage.getItem('pronat_contracts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SAVED_CONTRACTS;
  });

  useEffect(() => {
    localStorage.setItem('pronat_contracts', JSON.stringify(contracts));
  }, [contracts]);

  const saveContract = (contract: LegalContractData) => {
    setContracts(prev => {
      const exists = prev.some(c => c.id === contract.id);
      if (exists) {
        return prev.map(c => c.id === contract.id ? { ...contract, updatedAt: new Date().toISOString() } : c);
      }
      return [contract, ...prev];
    });
  };

  const deleteContract = (contractId: string) => {
    setContracts(prev => prev.filter(c => c.id !== contractId));
  };

  const updateContractStatus = (contractId: string, status: LegalContractData['status']) => {
    setContracts(prev => prev.map(c => c.id === contractId ? { ...c, status, updatedAt: new Date().toISOString() } : c));
  };

  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [contractModalListing, setContractModalListing] = useState<Listing | null>(null);

  const openContractBuilder = (listing?: Listing | null) => {
    setContractModalListing(listing || null);
    setIsContractModalOpen(true);
  };

  const closeContractBuilder = () => {
    setIsContractModalOpen(false);
    setContractModalListing(null);
  };

  // Sprint 09: Open House & Virtual Live Events
  const [openHouses, setOpenHouses] = useState<OpenHouseEvent[]>(() => {
    const saved = localStorage.getItem('pronat_open_houses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_OPEN_HOUSES;
  });

  useEffect(() => {
    localStorage.setItem('pronat_open_houses', JSON.stringify(openHouses));
  }, [openHouses]);

  const rsvpOpenHouse = (eventId: string, guest: { name: string; email: string; phone: string }) => {
    setOpenHouses(prev => prev.map(oh => {
      if (oh.id === eventId) {
        const currentList = oh.rsvpList || [];
        return {
          ...oh,
          currentRsvps: oh.currentRsvps + 1,
          rsvpList: [...currentList, { ...guest, timestamp: new Date().toISOString() }]
        };
      }
      return oh;
    }));

    // Also trigger notification
    addNotification({
      type: 'viewing_confirmed',
      title: 'RSVP për Open House u konfirmua!',
      message: `Jeni regjistruar me sukses për vizitën e hapur.`,
      actionView: 'open_houses'
    });
  };

  const scheduleOpenHouse = (event: Omit<OpenHouseEvent, 'id' | 'currentRsvps' | 'rsvpList'>) => {
    const newEvent: OpenHouseEvent = {
      ...event,
      id: `oh-${Date.now()}`,
      currentRsvps: 1,
      rsvpList: [{
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        timestamp: new Date().toISOString()
      }]
    };
    setOpenHouses(prev => [newEvent, ...prev]);

    addNotification({
      type: 'new_listing',
      title: 'Open House i ri u publikua!',
      message: `Ngjarja e hapur për "${event.listingTitle}" u planifikua me sukses.`,
      actionView: 'open_houses'
    });
  };

  // Sprint 10: Digital Escrow & Safe Transactions
  const [activeTransactions, setActiveTransactions] = useState<SafeTransactionData[]>(() => {
    const saved = localStorage.getItem('pronat_transactions');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVE_TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem('pronat_transactions', JSON.stringify(activeTransactions));
  }, [activeTransactions]);

  const [isTransactionTrackerOpen, setIsTransactionTrackerOpen] = useState<boolean>(false);
  const [activeTransactionId, setActiveTransactionId] = useState<string | null>(null);

  const openTransactionTracker = (txId?: string) => {
    if (txId) {
      setActiveTransactionId(txId);
    } else if (activeTransactions.length > 0) {
      setActiveTransactionId(activeTransactions[0].id);
    }
    setIsTransactionTrackerOpen(true);
  };

  const closeTransactionTracker = () => {
    setIsTransactionTrackerOpen(false);
  };

  const updateTransactionMilestone = (txId: string, milestoneId: string, status: TransactionStepStatus) => {
    setActiveTransactions(prev => prev.map(tx => {
      if (tx.id === txId) {
        const updatedMilestones = tx.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status,
              completedAt: status === 'completed' ? new Date().toISOString().split('T')[0] : m.completedAt
            };
          }
          return m;
        });

        // Find next step index
        const nextIncompleteIdx = updatedMilestones.findIndex(m => m.status !== 'completed');
        const nextStepIndex = nextIncompleteIdx === -1 ? updatedMilestones.length - 1 : nextIncompleteIdx;

        return {
          ...tx,
          milestones: updatedMilestones,
          currentStepIndex: nextStepIndex,
          updatedAt: new Date().toISOString()
        };
      }
      return tx;
    }));

    addNotification({
      type: 'legal_verified',
      title: 'Hap i Verifikuar në Transaksion!',
      message: `Statusi i transaksionit u përditësua me sukses.`,
      actionView: 'dashboard'
    });
  };

  // Sprint 10: AI Matchmaker Modal
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState<boolean>(false);
  const openMatchmaker = () => setIsMatchmakerOpen(true);
  const closeMatchmaker = () => setIsMatchmakerOpen(false);

  // Sprint 11: Rental Management State & Handlers
  const [tenantApplications, setTenantApplications] = useState<TenantApplication[]>(() => {
    const saved = localStorage.getItem('pronat_tenant_apps');
    return saved ? JSON.parse(saved) : INITIAL_TENANT_APPLICATIONS;
  });

  const [isTenantApplicationModalOpen, setIsTenantApplicationModalOpen] = useState(false);
  const [tenantApplicationModalListing, setTenantApplicationModalListing] = useState<Listing | null>(null);

  const openTenantApplicationModal = (listing?: Listing | null) => {
    if (listing) setTenantApplicationModalListing(listing);
    else setTenantApplicationModalListing(activeListing || listings[0] || null);
    setIsTenantApplicationModalOpen(true);
  };

  const closeTenantApplicationModal = () => {
    setIsTenantApplicationModalOpen(false);
    setTenantApplicationModalListing(null);
  };

  const submitTenantApplication = (appData: Omit<TenantApplication, 'id' | 'createdAt' | 'status' | 'screeningScore'>) => {
    // Calculate intelligent screening score based on income-to-rent ratio and employment
    const rentRatio = appData.monthlyIncome / (appData.listingPrice || 1);
    let calculatedScore = 70;
    if (rentRatio >= 3.5) calculatedScore += 20;
    else if (rentRatio >= 2.5) calculatedScore += 15;
    else if (rentRatio >= 2.0) calculatedScore += 5;
    else calculatedScore -= 10;

    if (appData.employmentStatus === 'employed' || appData.employmentStatus === 'diaspora_income') calculatedScore += 10;
    if (appData.occupantsCount <= 2) calculatedScore += 5;
    if (!appData.hasPets) calculatedScore += 5;

    const newApp: TenantApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      screeningScore: Math.min(99, Math.max(45, calculatedScore)),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTenantApplications(prev => [newApp, ...prev]);

    addNotification({
      type: 'inquiry_received',
      title: 'Aplikacion i Ri për Qira!',
      message: `${appData.tenantName} sapo aplikoi për "${appData.listingTitle}". Screening Score: ${newApp.screeningScore}/100.`,
      listingId: appData.listingId,
      actionView: 'property_management'
    });
  };

  useEffect(() => {
    localStorage.setItem('pronat_tenant_apps', JSON.stringify(tenantApplications));
  }, [tenantApplications]);

  const updateTenantApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setTenantApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    addNotification({
      type: 'legal_verified',
      title: 'Statusi i Aplikacionit u Përditësua',
      message: `Aplikacioni i qirasë u shënua si "${status.toUpperCase()}".`,
      actionView: 'property_management'
    });
  };

  const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceTicket[]>(() => {
    const saved = localStorage.getItem('pronat_maintenance_tickets');
    return saved ? JSON.parse(saved) : INITIAL_MAINTENANCE_TICKETS;
  });

  useEffect(() => {
    localStorage.setItem('pronat_maintenance_tickets', JSON.stringify(maintenanceTickets));
  }, [maintenanceTickets]);

  const addMaintenanceTicket = (ticketData: Omit<MaintenanceTicket, 'id'>) => {
    const newTicket: MaintenanceTicket = {
      ...ticketData,
      id: `tkt-${Date.now()}`
    };
    setMaintenanceTickets(prev => [newTicket, ...prev]);
    addNotification({
      type: 'price_drop',
      title: 'Tiketë e Re Mirëmbajtjeje!',
      message: `Tiketa "${newTicket.title}" u regjistrua me sukses.`,
      actionView: 'property_management'
    });
  };

  const updateMaintenanceStatus = (ticketId: string, status: MaintenanceStatus) => {
    setMaintenanceTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  const [rentPayments] = useState<RentPaymentRecord[]>(INITIAL_RENT_PAYMENTS);

  return (
    <AppContext.Provider value={{
      listings,
      favorites,
      toggleFavorite,
      isFavorite,
      comparedIds,
      toggleCompare,
      removeCompare,
      clearCompare,
      filters,
      setFilters,
      resetFilters,
      activeListing,
      setActiveListing,
      currentUser,
      addListing,
      updateListingStatus,
      updateListingPrice,
      deleteListing,
      activeView,
      setActiveView,
      
      // Sprint 3
      conversations,
      sendInquiry,
      sendMessage,
      markConversationRead,
      unreadMessagesCount,
      savedSearches,
      saveSearch,
      deleteSavedSearch,
      applySavedSearch,
      reports,
      addReport,
      updateReportStatus,
      platformSettings,
      updatePlatformSettings,

      // Sprint 4
      agencies,
      agents,
      selectedAgencyId,
      setSelectedAgencyId,
      marketStats,
      viewingRequests,
      scheduleViewing,
      updateViewingStatus,
      valuationPrefill,
      setValuationPrefill,

      // Sprint 5
      bankOffers,
      neighborhoodGuides,
      diasporaInquiries,
      addDiasporaInquiry,
      currency,
      setCurrency,
      convertPrice,

      // Sprint 7
      developments,
      selectedDevelopmentId,
      setSelectedDevelopmentId,
      investmentPrefill,
      setInvestmentPrefill,

      // Sprint 8
      notifications,
      unreadNotificationsCount,
      markNotificationRead,
      markAllNotificationsRead,
      deleteNotification,
      addNotification,
      virtualTours,
      activeVirtualTour,
      isVirtualTourOpen,
      openVirtualTour,
      closeVirtualTour,
      crmLeads,
      updateLeadStage,
      addLeadNote,
      addCrmLead,
      updateLead,
      isClosingCostsOpen,
      closingCostsPrice,
      openClosingCosts,
      openClosingCostsModal,
      closeClosingCosts,

      // Sprint 09
      contracts,
      saveContract,
      deleteContract,
      updateContractStatus,
      isContractModalOpen,
      contractModalListing,
      openContractBuilder,
      closeContractBuilder,
      openHouses,
      rsvpOpenHouse,
      scheduleOpenHouse,

      // Sprint 10
      activeTransactions,
      updateTransactionMilestone,
      isTransactionTrackerOpen,
      activeTransactionId,
      openTransactionTracker,
      closeTransactionTracker,
      isMatchmakerOpen,
      openMatchmaker,
      closeMatchmaker,

      // Sprint 11
      tenantApplications,
      submitTenantApplication,
      updateTenantApplicationStatus,
      isTenantApplicationModalOpen,
      tenantApplicationModalListing,
      openTenantApplicationModal,
      closeTenantApplicationModal,
      maintenanceTickets,
      addMaintenanceTicket,
      updateMaintenanceStatus,
      rentPayments
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

