import { Amenity, Location, PropertyCategory, PropertyTypeSlug } from '../types';

export interface PropertyCategoryConfig {
  id: PropertyCategory;
  slug: PropertyCategory;
  nameSq: string;
  nameEn: string;
  descriptionSq: string;
  descriptionEn: string;
  iconName: string;
  types: PropertyTypeSlug[];
}

export interface PropertyTypeConfig {
  slug: PropertyTypeSlug;
  category: PropertyCategory;
  nameSq: string;
  nameEn: string;
  unit: 'm²' | 'Ari' | 'Hektar';
  hasBedrooms: boolean;
  hasBathrooms: boolean;
  hasFloors: boolean;
  iconName: string;
}

export const PROPERTY_CATEGORIES_CONFIG: PropertyCategoryConfig[] = [
  {
    id: 'residential',
    slug: 'residential',
    nameSq: 'Banesore',
    nameEn: 'Residential',
    descriptionSq: 'Banesa, shtëpi, vila luksoze dhe garsoniera',
    descriptionEn: 'Apartments, houses, villas, and studios',
    iconName: 'Building2',
    types: ['apartment', 'house', 'villa', 'studio', 'penthouse', 'duplex']
  },
  {
    id: 'commercial',
    slug: 'commercial',
    nameSq: 'Komerciale & Biznes',
    nameEn: 'Commercial & Business',
    descriptionSq: 'Zyra, lokale tregtare, depo dhe ndërtesa afariste',
    descriptionEn: 'Offices, retail spaces, warehouses, and commercial buildings',
    iconName: 'Briefcase',
    types: ['office', 'commercial', 'warehouse', 'building']
  },
  {
    id: 'land',
    slug: 'land',
    nameSq: 'Toka & Troje',
    nameEn: 'Land & Plots',
    descriptionSq: 'Troje ndërtimi, toka bujqësore dhe zona industriale',
    descriptionEn: 'Building plots, agricultural land, and industrial tracts',
    iconName: 'Compass',
    types: ['land_building', 'land_agricultural', 'land_industrial']
  },
  {
    id: 'parking',
    slug: 'parking',
    nameSq: 'Garazha & Parkime',
    nameEn: 'Garages & Parking',
    descriptionSq: 'Garazhe të mbyllura dhe vende parkimi nëntokësor',
    descriptionEn: 'Private lock-up garages and designated underground parking',
    iconName: 'Warehouse',
    types: ['garage']
  },
  {
    id: 'other',
    slug: 'other',
    nameSq: 'Të tjera',
    nameEn: 'Other',
    descriptionSq: 'Lloje të tjera pasurish të paluajtshme',
    descriptionEn: 'Other specialized real estate properties',
    iconName: 'Layers',
    types: ['other']
  }
];

export const PROPERTY_TYPES_CONFIG: PropertyTypeConfig[] = [
  { slug: 'apartment', category: 'residential', nameSq: 'Banesë / Apartament', nameEn: 'Apartment', unit: 'm²', hasBedrooms: true, hasBathrooms: true, hasFloors: true, iconName: 'Building' },
  { slug: 'house', category: 'residential', nameSq: 'Shtëpi', nameEn: 'House', unit: 'm²', hasBedrooms: true, hasBathrooms: true, hasFloors: true, iconName: 'Home' },
  { slug: 'villa', category: 'residential', nameSq: 'Vilë', nameEn: 'Villa', unit: 'm²', hasBedrooms: true, hasBathrooms: true, hasFloors: true, iconName: 'Castle' },
  { slug: 'studio', category: 'residential', nameSq: 'Garsonierë', nameEn: 'Studio', unit: 'm²', hasBedrooms: true, hasBathrooms: true, hasFloors: true, iconName: 'Box' },
  { slug: 'penthouse', category: 'residential', nameSq: 'Penthouse', nameEn: 'Penthouse', unit: 'm²', hasBedrooms: true, hasBathrooms: true, hasFloors: true, iconName: 'Sparkles' },
  { slug: 'duplex', category: 'residential', nameSq: 'Duplex', nameEn: 'Duplex', unit: 'm²', hasBedrooms: true, hasBathrooms: true, hasFloors: true, iconName: 'Layers' },
  { slug: 'office', category: 'commercial', nameSq: 'Zyrë', nameEn: 'Office', unit: 'm²', hasBedrooms: false, hasBathrooms: true, hasFloors: true, iconName: 'Briefcase' },
  { slug: 'commercial', category: 'commercial', nameSq: 'Lokal / Dyqan', nameEn: 'Retail Space', unit: 'm²', hasBedrooms: false, hasBathrooms: true, hasFloors: true, iconName: 'Store' },
  { slug: 'warehouse', category: 'commercial', nameSq: 'Magazinë / Depo', nameEn: 'Warehouse', unit: 'm²', hasBedrooms: false, hasBathrooms: false, hasFloors: false, iconName: 'Boxes' },
  { slug: 'building', category: 'commercial', nameSq: 'Ndërtesë Biznesi', nameEn: 'Commercial Building', unit: 'm²', hasBedrooms: false, hasBathrooms: true, hasFloors: true, iconName: 'Building2' },
  { slug: 'land_building', category: 'land', nameSq: 'Truall Ndërtimi', nameEn: 'Building Plot', unit: 'Ari', hasBedrooms: false, hasBathrooms: false, hasFloors: false, iconName: 'MapPin' },
  { slug: 'land_agricultural', category: 'land', nameSq: 'Tokë Bujqësore', nameEn: 'Agricultural Land', unit: 'Hektar', hasBedrooms: false, hasBathrooms: false, hasFloors: false, iconName: 'Trees' },
  { slug: 'land_industrial', category: 'land', nameSq: 'Tokë Industriale', nameEn: 'Industrial Land', unit: 'Ari', hasBedrooms: false, hasBathrooms: false, hasFloors: false, iconName: 'Factory' },
  { slug: 'garage', category: 'parking', nameSq: 'Garazh / Parkim', nameEn: 'Garage / Parking', unit: 'm²', hasBedrooms: false, hasBathrooms: false, hasFloors: false, iconName: 'Warehouse' },
  { slug: 'other', category: 'other', nameSq: 'Tjetër', nameEn: 'Other', unit: 'm²', hasBedrooms: false, hasBathrooms: false, hasFloors: false, iconName: 'HelpCircle' }
];

export const LOCATIONS_DATA: Location[] = [
  // ================= KOSOVO =================
  // Prishtinë
  { id: 'ks-pr-01', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Qendër', lat: 42.6629, lng: 21.1655, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-02', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Dardania', lat: 42.6521, lng: 21.1542, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-03', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Bregu i Diellit', lat: 42.6558, lng: 21.1782, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-04', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Emshir (Kalabria)', lat: 42.6412, lng: 21.1432, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-05', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Arbëria (Dragodan)', lat: 42.6685, lng: 21.1512, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-06', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Mati 1 (Rruga C)', lat: 42.6450, lng: 21.1750, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-07', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Veternik', lat: 42.6320, lng: 21.1620, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-08', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Ulpiana', lat: 42.6534, lng: 21.1610, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-09', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Aktash', lat: 42.6582, lng: 21.1691, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-10', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Tophane', lat: 42.6710, lng: 21.1662, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-11', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Pejton', lat: 42.6575, lng: 21.1534, postalCode: '10000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-pr-12', country: 'Kosovo', city: 'Prishtinë', municipality: 'Prishtinë', neighborhood: 'Taslixhe', lat: 42.6670, lng: 21.1820, postalCode: '10000', region: 'Rrafshi i Kosovës' },

  // Fushë Kosovë
  { id: 'ks-fk-01', country: 'Kosovo', city: 'Fushë Kosovë', municipality: 'Fushë Kosovë', neighborhood: 'Qendër (Rruga Nënë Tereza)', lat: 42.6341, lng: 21.0967, postalCode: '12000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-fk-02', country: 'Kosovo', city: 'Fushë Kosovë', municipality: 'Fushë Kosovë', neighborhood: 'Kompleksi Eliza', lat: 42.6385, lng: 21.0890, postalCode: '12000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-fk-03', country: 'Kosovo', city: 'Fushë Kosovë', municipality: 'Fushë Kosovë', neighborhood: 'Bresje', lat: 42.6270, lng: 21.1080, postalCode: '12000', region: 'Rrafshi i Kosovës' },

  // Prizren
  { id: 'ks-pz-01', country: 'Kosovo', city: 'Prizren', municipality: 'Prizren', neighborhood: 'Qendër / Shadërvan', lat: 42.2139, lng: 20.7397, postalCode: '20000', region: 'Dukagjini' },
  { id: 'ks-pz-02', country: 'Kosovo', city: 'Prizren', municipality: 'Prizren', neighborhood: 'Ortakoll', lat: 42.2210, lng: 20.7310, postalCode: '20000', region: 'Dukagjini' },
  { id: 'ks-pz-03', country: 'Kosovo', city: 'Prizren', municipality: 'Prizren', neighborhood: 'Kurillë', lat: 42.2080, lng: 20.7480, postalCode: '20000', region: 'Dukagjini' },
  { id: 'ks-pz-04', country: 'Kosovo', city: 'Prizren', municipality: 'Prizren', neighborhood: 'Bazhdarhane', lat: 42.2190, lng: 20.7450, postalCode: '20000', region: 'Dukagjini' },

  // Pejë
  { id: 'ks-pe-01', country: 'Kosovo', city: 'Pejë', municipality: 'Pejë', neighborhood: 'Qendër', lat: 42.6593, lng: 20.2887, postalCode: '30000', region: 'Dukagjini' },
  { id: 'ks-pe-02', country: 'Kosovo', city: 'Pejë', municipality: 'Pejë', neighborhood: 'Fidanishte', lat: 42.6630, lng: 20.3010, postalCode: '30000', region: 'Dukagjini' },
  { id: 'ks-pe-03', country: 'Kosovo', city: 'Pejë', municipality: 'Pejë', neighborhood: 'Karagaç', lat: 42.6520, lng: 20.2810, postalCode: '30000', region: 'Dukagjini' },

  // Ferizaj
  { id: 'ks-fe-01', country: 'Kosovo', city: 'Ferizaj', municipality: 'Ferizaj', neighborhood: 'Qendër', lat: 42.3705, lng: 21.1557, postalCode: '70000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-fe-02', country: 'Kosovo', city: 'Ferizaj', municipality: 'Ferizaj', neighborhood: 'Dardanët', lat: 42.3780, lng: 21.1480, postalCode: '70000', region: 'Rrafshi i Kosovës' },
  { id: 'ks-fe-03', country: 'Kosovo', city: 'Ferizaj', municipality: 'Ferizaj', neighborhood: 'Zona Industriale', lat: 42.3610, lng: 21.1710, postalCode: '70000', region: 'Rrafshi i Kosovës' },

  // Gjilan
  { id: 'ks-gj-01', country: 'Kosovo', city: 'Gjilan', municipality: 'Gjilan', neighborhood: 'Qendër', lat: 42.4635, lng: 21.4694, postalCode: '60000', region: 'Anamorava' },
  { id: 'ks-gj-02', country: 'Kosovo', city: 'Gjilan', municipality: 'Gjilan', neighborhood: 'Dardania', lat: 42.4570, lng: 21.4610, postalCode: '60000', region: 'Anamorava' },

  // Gjakovë
  { id: 'ks-gk-01', country: 'Kosovo', city: 'Gjakovë', municipality: 'Gjakovë', neighborhood: 'Çarshia e Madhe', lat: 42.3800, lng: 20.4300, postalCode: '50000', region: 'Dukagjini' },
  { id: 'ks-gk-02', country: 'Kosovo', city: 'Gjakovë', municipality: 'Gjakovë', neighborhood: 'Blloku i Ri', lat: 42.3890, lng: 20.4220, postalCode: '50000', region: 'Dukagjini' },

  // Mitrovicë
  { id: 'ks-mi-01', country: 'Kosovo', city: 'Mitrovicë', municipality: 'Mitrovicë e Jugut', neighborhood: 'Qendër', lat: 42.8914, lng: 20.8660, postalCode: '40000', region: 'Shala e Bajgorës' },
  { id: 'ks-mi-02', country: 'Kosovo', city: 'Mitrovicë', municipality: 'Mitrovicë e Jugut', neighborhood: 'Bair', lat: 42.8830, lng: 20.8710, postalCode: '40000', region: 'Shala e Bajgorës' },

  // ================= ALBANIA =================
  // Tiranë
  { id: 'al-ti-01', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Ish-Blloku', lat: 41.3195, lng: 19.8188, postalCode: '1001', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-02', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Qendër (Sheshi Skënderbej)', lat: 41.3275, lng: 19.8187, postalCode: '1001', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-03', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Komuna e Parisit', lat: 41.3142, lng: 19.8055, postalCode: '1019', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-04', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Liqeni Artificial', lat: 41.3120, lng: 19.8220, postalCode: '1019', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-05', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Don Bosko', lat: 41.3390, lng: 19.8050, postalCode: '1016', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-06', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Astir (Unaza e Re)', lat: 41.3210, lng: 19.7820, postalCode: '1051', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-07', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Laprakë', lat: 41.3380, lng: 19.7890, postalCode: '1023', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-08', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: '21 Dhjetori', lat: 41.3260, lng: 19.8010, postalCode: '1023', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-09', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Sauk', lat: 41.2980, lng: 19.8370, postalCode: '1000', region: 'Shqipëria e Mesme' },
  { id: 'al-ti-10', country: 'Albania', city: 'Tiranë', municipality: 'Tiranë', neighborhood: 'Kodra e Diellit', lat: 41.3060, lng: 19.8120, postalCode: '1019', region: 'Shqipëria e Mesme' },

  // Durrës
  { id: 'al-du-01', country: 'Albania', city: 'Durrës', municipality: 'Durrës', neighborhood: 'Plazh (Sektori Hekurudha)', lat: 41.3090, lng: 19.4750, postalCode: '2001', region: 'Bregdeti i Mesëm' },
  { id: 'al-du-02', country: 'Albania', city: 'Durrës', municipality: 'Durrës', neighborhood: 'Vollga / Qendër', lat: 41.3125, lng: 19.4440, postalCode: '2001', region: 'Bregdeti i Mesëm' },
  { id: 'al-du-03', country: 'Albania', city: 'Durrës', municipality: 'Durrës', neighborhood: 'Shkëmbi i Kavajës', lat: 41.2720, lng: 19.5080, postalCode: '2003', region: 'Bregdeti i Mesëm' },
  { id: 'al-du-04', country: 'Albania', city: 'Durrës', municipality: 'Durrës', neighborhood: 'Golem', lat: 41.2410, lng: 19.5210, postalCode: '2504', region: 'Bregdeti i Mesëm' },

  // Vlorë
  { id: 'al-vl-01', country: 'Albania', city: 'Vlorë', municipality: 'Vlorë', neighborhood: 'Lungomare', lat: 40.4510, lng: 19.4890, postalCode: '9401', region: 'Riviera Shqiptare' },
  { id: 'al-vl-02', country: 'Albania', city: 'Vlorë', municipality: 'Vlorë', neighborhood: 'Uji i Ftohtë', lat: 40.4280, lng: 19.4880, postalCode: '9402', region: 'Riviera Shqiptare' },
  { id: 'al-vl-03', country: 'Albania', city: 'Vlorë', municipality: 'Vlorë', neighborhood: 'Qendër', lat: 40.4680, lng: 19.4890, postalCode: '9401', region: 'Riviera Shqiptare' },
  { id: 'al-vl-04', country: 'Albania', city: 'Vlorë', municipality: 'Vlorë', neighborhood: 'Radhimë', lat: 40.3850, lng: 19.4820, postalCode: '9400', region: 'Riviera Shqiptare' },

  // Sarandë
  { id: 'al-sa-01', country: 'Albania', city: 'Sarandë', municipality: 'Sarandë', neighborhood: 'Bregdet / Qendër', lat: 39.8750, lng: 20.0050, postalCode: '9701', region: 'Riviera Shqiptare' },
  { id: 'al-sa-02', country: 'Albania', city: 'Sarandë', municipality: 'Sarandë', neighborhood: 'Rruga Butrinti', lat: 39.8620, lng: 20.0150, postalCode: '9701', region: 'Riviera Shqiptare' },
  { id: 'al-sa-03', country: 'Albania', city: 'Sarandë', municipality: 'Sarandë', neighborhood: 'Ksamil', lat: 39.7710, lng: 19.9990, postalCode: '9706', region: 'Riviera Shqiptare' },

  // Shkodër
  { id: 'al-sh-01', country: 'Albania', city: 'Shkodër', municipality: 'Shkodër', neighborhood: 'Qendër / Pedonale', lat: 42.0680, lng: 19.5120, postalCode: '4001', region: 'Shqipëria e Veriut' },
  { id: 'al-sh-02', country: 'Albania', city: 'Shkodër', municipality: 'Shkodër', neighborhood: 'Parrucë', lat: 42.0610, lng: 19.5190, postalCode: '4001', region: 'Shqipëria e Veriut' },

  // Korçë
  { id: 'al-ko-01', country: 'Albania', city: 'Korçë', municipality: 'Korçë', neighborhood: 'Pazari i Vjetër', lat: 40.6170, lng: 20.7760, postalCode: '7001', region: 'Shqipëria Juglindore' },
  { id: 'al-ko-02', country: 'Albania', city: 'Korçë', municipality: 'Korçë', neighborhood: 'Bulevardi Shën Gjergji', lat: 40.6140, lng: 20.7820, postalCode: '7001', region: 'Shqipëria Juglindore' }
];

export const POPULAR_SEARCH_AREAS = [
  { labelSq: 'Prishtinë - Qendër', labelEn: 'Prishtina - City Center', city: 'Prishtinë', neighborhood: 'Qendër', country: 'Kosovo' },
  { labelSq: 'Tiranë - Ish-Blloku', labelEn: 'Tirana - Blloku', city: 'Tiranë', neighborhood: 'Ish-Blloku', country: 'Albania' },
  { labelSq: 'Prishtinë - Rruga C', labelEn: 'Prishtina - Rruga C', city: 'Prishtinë', neighborhood: 'Mati 1 (Rruga C)', country: 'Kosovo' },
  { labelSq: 'Tiranë - Liqeni', labelEn: 'Tirana - Artificial Lake', city: 'Tiranë', neighborhood: 'Liqeni Artificial', country: 'Albania' },
  { labelSq: 'Vlorë - Lungomare', labelEn: 'Vlora - Lungomare', city: 'Vlorë', neighborhood: 'Lungomare', country: 'Albania' },
  { labelSq: 'Prizren - Shadërvan', labelEn: 'Prizren - Shadërvan', city: 'Prizren', neighborhood: 'Qendër / Shadërvan', country: 'Kosovo' },
  { labelSq: 'Durrës - Plazh', labelEn: 'Durrës - Beach', city: 'Durrës', neighborhood: 'Plazh (Sektori Hekurudha)', country: 'Albania' },
  { labelSq: 'Sarandë - Ksamil', labelEn: 'Saranda - Ksamil', city: 'Sarandë', neighborhood: 'Ksamil', country: 'Albania' }
];

export const AMENITIES_DATA: Amenity[] = [
  { id: 'am-1', slug: 'elevator', nameSq: 'Ashensor (Lift)', nameEn: 'Elevator', icon: 'ArrowUpDown', category: 'comfort' },
  { id: 'am-2', slug: 'parking', nameSq: 'Vendparkim', nameEn: 'Parking', icon: 'Car', category: 'comfort' },
  { id: 'am-3', slug: 'balcony', nameSq: 'Ballkon', nameEn: 'Balcony', icon: 'Sun', category: 'exterior' },
  { id: 'am-4', slug: 'terrace', nameSq: 'Terasë', nameEn: 'Terrace', icon: 'Maximize2', category: 'exterior' },
  { id: 'am-5', slug: 'garage', nameSq: 'Garazh e mbyllur', nameEn: 'Enclosed Garage', icon: 'Warehouse', category: 'exterior' },
  { id: 'am-6', slug: 'ac', nameSq: 'Kondicioner / Klimë', nameEn: 'Air Conditioning', icon: 'Wind', category: 'comfort' },
  { id: 'am-7', slug: 'storage', nameSq: 'Depo / Bodrum', nameEn: 'Storage Room', icon: 'Archive', category: 'interior' },
  { id: 'am-8', slug: 'security', nameSq: 'Siguri 24/7 & Kamera', nameEn: '24/7 Security & CCTV', icon: 'ShieldCheck', category: 'security' },
  { id: 'am-9', slug: 'intercom', nameSq: 'Interfon / Video intercom', nameEn: 'Intercom', icon: 'PhoneCall', category: 'security' },
  { id: 'am-10', slug: 'internet', nameSq: 'Internet Optik i Shpejtë', nameEn: 'High-speed Fiber Internet', icon: 'Wifi', category: 'comfort' },
  { id: 'am-11', slug: 'furnished_kitchen', nameSq: 'Kuzhinë e kompletuar', nameEn: 'Equipped Kitchen', icon: 'Utensils', category: 'interior' },
  { id: 'am-12', slug: 'yard', nameSq: 'Kopsht / Oborr privat', nameEn: 'Private Yard / Garden', icon: 'Trees', category: 'exterior' },
  { id: 'am-13', slug: 'sea_view', nameSq: 'Pamje nga Deti', nameEn: 'Sea View', icon: 'Eye', category: 'exterior' },
  { id: 'am-14', slug: 'city_view', nameSq: 'Pamje panoramike e qytetit', nameEn: 'City Skyline View', icon: 'Building', category: 'exterior' },
  { id: 'am-15', slug: 'fireplace', nameSq: 'Kamin me dru', nameEn: 'Fireplace', icon: 'Flame', category: 'interior' },
  { id: 'am-16', slug: 'pool', nameSq: 'Pishinë', nameEn: 'Swimming Pool', icon: 'Waves', category: 'exterior' },
  { id: 'am-17', slug: 'smart_home', nameSq: 'Sistem Smart Home', nameEn: 'Smart Home Automation', icon: 'Cpu', category: 'comfort' },
  { id: 'am-18', slug: 'solar', nameSq: 'Panele Diellore', nameEn: 'Solar Energy Panels', icon: 'SunMedium', category: 'comfort' }
];
