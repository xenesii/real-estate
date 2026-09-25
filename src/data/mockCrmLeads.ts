import { CrmLead } from '../types';

export const INITIAL_CRM_LEADS: CrmLead[] = [
  {
    id: 'lead-001',
    clientName: 'Dr. Valon Berisha',
    clientPhone: '+41 79 123 4567',
    clientEmail: 'valon.berisha@hin.ch',
    clientLocation: 'Zvicër 🇨🇭 (Zürich)',
    listingId: 'prop-001',
    listingTitle: 'Penthouse Ekskluziv në Marigona Hill',
    dealValue: 285000,
    stage: 'negotiation',
    source: 'diaspora_form',
    nextFollowUpDate: '2026-09-23',
    lastContactedAt: '2026-09-20',
    notes: [
      {
        id: 'note-1',
        text: 'Klienti kërkoi zbritje në €275,000 nëse paguan me transfer të menjëhershëm bankar nga Zvicra.',
        createdAt: '2026-09-20T14:30:00Z',
        authorName: 'Kreshnik Krasniqi'
      },
      {
        id: 'note-2',
        text: 'U dërgua draft-kontrata preliminare dhe fleta poseduese e noterizuar.',
        createdAt: '2026-09-18T10:15:00Z',
        authorName: 'Kreshnik Krasniqi'
      }
    ],
    createdAt: '2026-09-15T09:00:00Z',
    updatedAt: '2026-09-20T14:30:00Z'
  },
  {
    id: 'lead-002',
    clientName: 'Arbenita & Besart Gashi',
    clientPhone: '+383 49 888 777',
    clientEmail: 'arbenita.gashi@gmail.com',
    clientLocation: 'Prishtinë 🇽🇰',
    listingId: 'prop-002',
    listingTitle: 'Banesë Moderne 2+1 në Bregu i Diellit',
    dealValue: 118000,
    stage: 'viewing_scheduled',
    source: 'web_inquiry',
    nextFollowUpDate: '2026-09-22',
    lastContactedAt: '2026-09-21',
    notes: [
      {
        id: 'note-3',
        text: 'Caktuar vizita në vend të ngjarjes për të Martën në ora 17:30. Klientët kanë parakualifikim kredie nga NLB Banka.',
        createdAt: '2026-09-21T08:00:00Z',
        authorName: 'Kreshnik Krasniqi'
      }
    ],
    createdAt: '2026-09-19T11:20:00Z',
    updatedAt: '2026-09-21T08:00:00Z'
  },
  {
    id: 'lead-003',
    clientName: 'Kastriot Rama (Investitor)',
    clientPhone: '+49 176 555 4321',
    clientEmail: 'k.rama@albinvest.de',
    clientLocation: 'Gjermani 🇩🇪 (Frankfurt)',
    listingId: 'dev-001',
    listingTitle: '3 Njësi Apartamente në Kompleksin Rezidencial',
    dealValue: 360000,
    stage: 'under_notary',
    source: 'whatsapp',
    nextFollowUpDate: '2026-09-24',
    lastContactedAt: '2026-09-19',
    notes: [
      {
        id: 'note-4',
        text: 'Palët ranë dakord. Noteri po përgatit aktin noterial të shitblerjes me 4 këste periodike.',
        createdAt: '2026-09-19T16:45:00Z',
        authorName: 'Kreshnik Krasniqi'
      }
    ],
    createdAt: '2026-09-10T15:00:00Z',
    updatedAt: '2026-09-19T16:45:00Z'
  },
  {
    id: 'lead-004',
    clientName: 'Elira Kastrati',
    clientPhone: '+49 170 9876543',
    clientEmail: 'elira.kastrati@web.de',
    clientLocation: 'Gjermani 🇩🇪 (München)',
    listingId: 'prop-004',
    listingTitle: 'Vilë Ekskluzive me Pishinë në Palasë',
    dealValue: 480000,
    stage: 'new_inquiry',
    source: 'diaspora_form',
    nextFollowUpDate: '2026-09-22',
    notes: [
      {
        id: 'note-5',
        text: 'Kërkoi video 360 tour live me agjentin dhe sqarim mbi taksën e pasurisë në Shqipëri.',
        createdAt: '2026-09-21T07:10:00Z',
        authorName: 'Kreshnik Krasniqi'
      }
    ],
    createdAt: '2026-09-21T07:10:00Z',
    updatedAt: '2026-09-21T07:10:00Z'
  },
  {
    id: 'lead-005',
    clientName: 'Mergim Thaqi',
    clientPhone: '+383 44 332 211',
    clientEmail: 'mergim.t@techks.com',
    clientLocation: 'Prishtinë 🇽🇰',
    listingId: 'prop-003',
    listingTitle: 'Lokal Afarist në Qendër',
    dealValue: 195000,
    stage: 'closed_won',
    source: 'phone_call',
    notes: [
      {
        id: 'note-6',
        text: 'Kontrata u nënshkrua me sukses te Noteri. Komisioni i agjencisë u arkëtua.',
        createdAt: '2026-09-14T11:00:00Z',
        authorName: 'Kreshnik Krasniqi'
      }
    ],
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-14T11:00:00Z'
  }
];
