import { CommuteHub } from '../types';

export const COMMUTE_HUBS: CommuteHub[] = [
  // Prishtinë
  {
    id: 'hub-pr-center',
    name: 'Sheshi Nënë Tereza (Qendra e Prishtinës)',
    city: 'Prishtinë',
    country: 'Kosovo',
    category: 'center',
    lat: 42.6629,
    lng: 21.1655,
    description: 'Qendra kryesore administrative, bankare dhe pedonale e Prishtinës.'
  },
  {
    id: 'hub-pr-qkuk',
    name: 'QKUK (Qendra Klinike Universitare e Kosovës)',
    city: 'Prishtinë',
    country: 'Kosovo',
    category: 'hospital',
    lat: 42.6480,
    lng: 21.1620,
    description: 'Qendra më e madhe spitalore dhe fakulteti i mjekësisë.'
  },
  {
    id: 'hub-pr-up',
    name: 'Universiteti i Prishtinës (Kampusi Qendror)',
    city: 'Prishtinë',
    country: 'Kosovo',
    category: 'university',
    lat: 42.6575,
    lng: 21.1690,
    description: 'Biblioteka Kombëtare dhe fakultetet kryesore.'
  },
  {
    id: 'hub-pr-albi',
    name: 'Albi Mall (Veternik & Nyja e Magjistrales)',
    city: 'Prishtinë',
    country: 'Kosovo',
    category: 'mall',
    lat: 42.6280,
    lng: 21.1490,
    description: 'Qendra më e madhe tregtare me lidhje të shpejtë në autostradë.'
  },
  
  // Tiranë
  {
    id: 'hub-ti-center',
    name: 'Sheshi Skënderbej (Qendra e Tiranës)',
    city: 'Tiranë',
    country: 'Albania',
    category: 'center',
    lat: 41.3275,
    lng: 19.8187,
    description: 'Zemra e Tiranës me ministritë, muzeun kombëtar dhe teatrin.'
  },
  {
    id: 'hub-ti-blloku',
    name: 'Ish-Blloku & Parku i Madh i Liqenit',
    city: 'Tiranë',
    country: 'Albania',
    category: 'center',
    lat: 41.3195,
    lng: 19.8170,
    description: 'Zona më elitare e gastronomisë, zyrave diplomatike dhe rekreacionit.'
  },
  {
    id: 'hub-ti-qsut',
    name: 'QSUT Nënë Tereza (Qendra Spitalore)',
    city: 'Tiranë',
    country: 'Albania',
    category: 'hospital',
    lat: 41.3410,
    lng: 19.8380,
    description: 'Qendra universitare dhe mjekësore kryesore në Tiranë.'
  },
  {
    id: 'hub-ti-teg',
    name: 'TEG (Tirana East Gate & Nyja e Autostradës)',
    city: 'Tiranë',
    country: 'Albania',
    category: 'mall',
    lat: 41.2910,
    lng: 19.8590,
    description: 'Qendra kryesore tregtare dhe rezidenciale e zonës juglindore.'
  },

  // Durrës
  {
    id: 'hub-dr-port',
    name: 'Porti i Durrësit & Shëtitorja Taulantia',
    city: 'Durrës',
    country: 'Albania',
    category: 'transport',
    lat: 41.3140,
    lng: 19.4470,
    description: 'Qendra bregdetare me portin e trageteve dhe zonën e marinës së re.'
  },

  // Prizren
  {
    id: 'hub-pz-center',
    name: 'Shadërvani & Kalaja e Prizrenit',
    city: 'Prizren',
    country: 'Kosovo',
    category: 'center',
    lat: 42.2090,
    lng: 20.7410,
    description: 'Qendra historike dhe turistike më e famshme e Prizrenit.'
  }
];

// Helper to estimate commute time in minutes based on distance and mode
export const calculateCommuteTime = (
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  mode: 'car' | 'transit' | 'walking'
): number => {
  // Haversine distance in km
  const R = 6371; // Earth radius in km
  const dLat = ((toLat - fromLat) * Math.PI) / 180;
  const dLng = ((toLng - fromLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((fromLat * Math.PI) / 180) *
      Math.cos((toLat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  // Average urban speeds in km/h considering city traffic
  switch (mode) {
    case 'walking':
      return Math.round((distanceKm / 4.8) * 60); // 4.8 km/h
    case 'transit':
      return Math.round((distanceKm / 18) * 60) + 4; // 18 km/h + 4 min wait
    case 'car':
    default:
      return Math.round((distanceKm / 28) * 60) + 2; // 28 km/h urban speed
  }
};
