import { Conversation, SavedSearch, PropertyReport, PlatformSettings } from '../types';

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-001',
    listingId: 'prop-001',
    listingTitle: 'Banesë moderne 2+1 me pamje të hapur në Qendër të Prishtinës',
    listingCover: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
    listingPrice: 135000,
    listingCurrency: 'EUR',
    participantId: 'usr-buyer-01',
    participantName: 'Arben Berisha',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    lastMessage: 'Përshëndetje, a është e mundur të caktojmë një vizitë nesër rreth orës 17:00?',
    lastMessageTime: '2026-09-20T14:32:00Z',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-101',
        senderId: 'usr-buyer-01',
        senderName: 'Arben Berisha',
        senderRole: 'user',
        messageText: 'Përshëndetje! Jam i interesuar për këtë banesë në qendër. A ka fletë poseduese të gatshme për bartje?',
        timestamp: '2026-09-20T10:15:00Z',
        isRead: true
      },
      {
        id: 'msg-102',
        senderId: 'usr-agent-01',
        senderName: 'Kreshnik Krasniqi',
        senderRole: 'agent',
        messageText: 'Përshëndetje z. Berisha. Po, prona ka dokumentacion të rregullt kadastral 1/1, pa ngarkesa hipotekare dhe gati për kontratë te noteri.',
        timestamp: '2026-09-20T11:40:00Z',
        isRead: true
      },
      {
        id: 'msg-103',
        senderId: 'usr-buyer-01',
        senderName: 'Arben Berisha',
        senderRole: 'user',
        messageText: 'Përshëndetje, a është e mundur të caktojmë një vizitë nesër rreth orës 17:00?',
        timestamp: '2026-09-20T14:32:00Z',
        isRead: false
      }
    ]
  },
  {
    id: 'conv-002',
    listingId: 'prop-002',
    listingTitle: 'Vilë luksoze me pishinë dhe kopsht në Kodrën e Diellit, Tiranë',
    listingCover: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    listingPrice: 420000,
    listingCurrency: 'EUR',
    participantId: 'usr-buyer-02',
    participantName: 'Besnik Kastrati',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    lastMessage: 'Faleminderit për informacionin, do të konsultohem me bankën time për financimin.',
    lastMessageTime: '2026-09-18T16:20:00Z',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-201',
        senderId: 'usr-buyer-02',
        senderName: 'Besnik Kastrati',
        senderRole: 'user',
        messageText: 'Përshëndetje, a pranohet pagesa pjesërisht me këste ose me kredi bankare në Shqipëri?',
        timestamp: '2026-09-18T15:00:00Z',
        isRead: true
      },
      {
        id: 'msg-202',
        senderId: 'usr-agent-01',
        senderName: 'Kreshnik Krasniqi',
        senderRole: 'agent',
        messageText: 'Po, vila është e përshtatshme për financim hipotekar në të gjitha bankat e nivelit të dytë në Tiranë (BKT, Credins, Intesa).',
        timestamp: '2026-09-18T15:45:00Z',
        isRead: true
      },
      {
        id: 'msg-203',
        senderId: 'usr-buyer-02',
        senderName: 'Besnik Kastrati',
        senderRole: 'user',
        messageText: 'Faleminderit për informacionin, do të konsultohem me bankën time për financimin.',
        timestamp: '2026-09-18T16:20:00Z',
        isRead: true
      }
    ]
  }
];

export const INITIAL_SAVED_SEARCHES: SavedSearch[] = [
  {
    id: 'save-001',
    userId: 'usr-agent-01',
    title: 'Banesa në Shitje në Prishtinë (deri 150k €)',
    filters: {
      transaction: 'sale',
      category: 'residential',
      city: 'Prishtinë',
      maxPrice: 150000,
      sortBy: 'newest'
    },
    frequency: 'instant',
    newMatchesCount: 3,
    createdAt: '2026-09-15T09:00:00Z'
  },
  {
    id: 'save-002',
    userId: 'usr-agent-01',
    title: 'Vila & Shtëpi në Tiranë',
    filters: {
      transaction: 'sale',
      category: 'residential',
      city: 'Tiranë',
      sortBy: 'price_desc'
    },
    frequency: 'daily',
    newMatchesCount: 1,
    createdAt: '2026-09-12T14:30:00Z'
  }
];

export const INITIAL_REPORTS: PropertyReport[] = [
  {
    id: 'rep-001',
    listingId: 'prop-001',
    listingTitle: 'Banesë moderne 2+1 me pamje të hapur në Qendër të Prishtinës',
    reporterEmail: 'blerim.k@gmail.com',
    reason: 'wrong_info',
    details: 'Çmimi në shpallje është 135,000 € por agjenti më tha në telefon se çmimi i padiskutueshëm është 140,000 €.',
    status: 'pending',
    createdAt: '2026-09-20T16:15:00Z'
  }
];

export const INITIAL_SETTINGS: PlatformSettings = {
  brandName: 'PRONAT',
  taglineSq: 'Platformë profesionale e patundshmërive për Kosovë dhe Shqipëri',
  taglineEn: 'Professional real estate marketplace for Kosovo and Albania',
  supportEmail: 'mbeshtetja@pronat-ks-al.com',
  supportPhone: '+383 38 700 800',
  defaultCurrency: 'EUR',
  eurToAllRate: 101.5, // 1 EUR = 101.5 ALL
  requireListingModeration: true,
  allowGuestContacts: true
};
