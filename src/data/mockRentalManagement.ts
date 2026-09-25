import { TenantApplication, MaintenanceTicket, RentPaymentRecord } from '../types';

export const INITIAL_TENANT_APPLICATIONS: TenantApplication[] = [
  {
    id: 'app-001',
    listingId: 'list-4',
    listingTitle: 'Apartament 1+1 Lux në Peptonë',
    listingPrice: 450,
    listingCover: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    tenantName: 'Drenusha Hoxha',
    tenantEmail: 'drenusha.h@gmail.com',
    tenantPhone: '+383 49 111 222',
    employmentStatus: 'employed',
    employerName: 'Raiffeisen Bank Kosova',
    monthlyIncome: 1450,
    occupantsCount: 1,
    hasPets: false,
    moveInDate: '2026-10-01',
    proposedLeaseMonths: 12,
    screeningScore: 94,
    status: 'approved',
    createdAt: '2026-09-18T11:00:00Z'
  },
  {
    id: 'app-002',
    listingId: 'list-6',
    listingTitle: 'Banesë Moderne në Lakrishtë',
    listingPrice: 550,
    listingCover: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    tenantName: 'Ardit Morina',
    tenantEmail: 'ardit.morina@techks.com',
    tenantPhone: '+383 44 333 444',
    employmentStatus: 'self_employed',
    employerName: 'Software Engineering Freelancer',
    monthlyIncome: 2200,
    occupantsCount: 2,
    hasPets: true,
    moveInDate: '2026-10-15',
    proposedLeaseMonths: 24,
    screeningScore: 88,
    status: 'pending',
    createdAt: '2026-09-20T09:30:00Z'
  }
];

export const INITIAL_MAINTENANCE_TICKETS: MaintenanceTicket[] = [
  {
    id: 'tkt-101',
    propertyId: 'list-4',
    propertyTitle: 'Apartament 1+1 Lux në Peptonë',
    tenantName: 'Drenusha Hoxha',
    tenantPhone: '+383 49 111 222',
    category: 'heating',
    title: 'Sistemi i Ngrohjes Termokos ka presion të ulët',
    description: 'Radiatori në dhomën e gjumit nuk nxehet mjaftueshëm gjatë orëve të mbrëmjes.',
    urgency: 'medium',
    status: 'in_progress',
    reportedDate: '2026-09-19'
  },
  {
    id: 'tkt-102',
    propertyId: 'list-6',
    propertyTitle: 'Banesë Moderne në Lakrishtë',
    tenantName: 'Kujtim Gashi',
    tenantPhone: '+383 45 555 666',
    category: 'plumbing',
    title: 'Rrjedhje uji në lavamanin e banjos',
    description: 'Gypi fleksibil nën lavaman pikëron ngadalë.',
    urgency: 'high',
    status: 'open',
    reportedDate: '2026-09-21'
  }
];

export const INITIAL_RENT_PAYMENTS: RentPaymentRecord[] = [
  {
    id: 'pay-801',
    propertyTitle: 'Apartament 1+1 Lux në Peptonë',
    tenantName: 'Drenusha Hoxha',
    amount: 450,
    dueDate: '2026-09-05',
    paidDate: '2026-09-03',
    status: 'paid'
  },
  {
    id: 'pay-802',
    propertyTitle: 'Banesë Moderne në Lakrishtë',
    tenantName: 'Kujtim Gashi',
    amount: 550,
    dueDate: '2026-09-10',
    paidDate: '2026-09-09',
    status: 'paid'
  },
  {
    id: 'pay-803',
    propertyTitle: 'Shtëpi me Kopsht në Marigona Residence',
    tenantName: 'Luan Selimi',
    amount: 1200,
    dueDate: '2026-09-15',
    status: 'overdue'
  }
];
