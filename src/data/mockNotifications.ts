import { AppNotification } from '../types';

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-001',
    type: 'price_drop',
    title: 'Ulje Çmimi: Banesë 2+1 në Bregu i Diellit',
    message: 'Çmimi ra nga €125,000 në €118,000 (-5.6%). Kjo pronë është në listën tuaj të preferuarave.',
    listingId: 'prop-002',
    listingTitle: 'Banesë Moderne 2+1 në Bregu i Diellit',
    listingImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    priceOld: 125000,
    priceNew: 118000,
    timestamp: '2026-09-21T08:30:00Z',
    isRead: false,
    actionView: 'detail'
  },
  {
    id: 'notif-002',
    type: 'viewing_update',
    title: 'Termini i Vizitës u Konfirmua!',
    message: 'Agjenti Kreshnik Krasniqi konfirmoi vizitën tuaj për nesër, 22 Shtator në orën 14:00 për Vilën në Marigona Hill.',
    listingId: 'prop-001',
    listingTitle: 'Penthouse Ekskluziv në Marigona Hill',
    listingImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    timestamp: '2026-09-21T07:15:00Z',
    isRead: false,
    actionView: 'dashboard'
  },
  {
    id: 'notif-003',
    type: 'new_match',
    title: '3 Prona të Reja që përputhen me kërkimin tuaj',
    message: 'U shtuan prona të reja në Prishtinë (Dragodan & Qendër) me buxhet nën €150,000.',
    timestamp: '2026-09-20T18:45:00Z',
    isRead: false,
    actionView: 'search'
  },
  {
    id: 'notif-004',
    type: 'legal_verified',
    title: 'Verifikim Kadastral i Miratuar 🛡️',
    message: 'Fleta Poseduese dhe Certifikata e Pronësisë për pronën tuaj në Lakrishte u verifikuan me sukses nga Noteri Partner.',
    listingId: 'prop-003',
    listingTitle: 'Lokal Afarist në Lakrishtë',
    timestamp: '2026-09-20T12:00:00Z',
    isRead: true,
    actionView: 'detail'
  },
  {
    id: 'notif-005',
    type: 'inquiry_received',
    title: 'Kërkesë e Re nga Diaspora (Zvicër 🇨🇭)',
    message: 'Valon Berisha dërgoi interesim për blerje me financim bankar për projektin rezidenciale.',
    timestamp: '2026-09-19T16:20:00Z',
    isRead: true,
    actionView: 'dashboard'
  }
];
