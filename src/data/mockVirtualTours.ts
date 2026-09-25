import { VirtualTourData } from '../types';

export const INITIAL_VIRTUAL_TOURS: Record<string, VirtualTourData> = {
  'prop-001': {
    id: 'vt-001',
    listingId: 'prop-001',
    listingTitle: 'Penthouse Ekskluziv me Teracë Panoramike në Marigona Hill',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    rooms: [
      {
        id: 'room-living',
        nameSq: 'Salloni & Zona e Ndenjës',
        nameEn: 'Living Room & Lounge',
        roomType: 'living',
        dimensions: '7.8m x 5.6m',
        areaSqm: 43.6,
        panoramaUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
        floorPlanCoords: { x: 35, y: 40 },
        hotspots: [
          {
            id: 'hs-1',
            targetRoomId: 'room-kitchen',
            labelSq: 'Kalo te Kuzhina Ishull',
            labelEn: 'Go to Island Kitchen',
            x: 75,
            y: 52
          },
          {
            id: 'hs-2',
            targetRoomId: 'room-terrace',
            labelSq: 'Eksploro Teracën Panoramike',
            labelEn: 'Explore Panoramic Terrace',
            x: 22,
            y: 48
          }
        ],
        features: [
          {
            id: 'feat-1',
            label: 'Parket Lisi Masiv',
            detail: 'Parket gjerman lisi natyral me ngrohje nën dysheme.',
            x: 45,
            y: 80
          },
          {
            id: 'feat-2',
            label: 'Dritare Panoramike Rehau',
            detail: 'Xhama 3-shtresorë me izolim akustik dhe termik maksimal.',
            x: 18,
            y: 35
          },
          {
            id: 'feat-3',
            label: 'Kamin Modern me Bioetanol',
            detail: 'Kamin i integruar minimalist me telekomandë inteligjente.',
            x: 58,
            y: 42
          }
        ]
      },
      {
        id: 'room-kitchen',
        nameSq: 'Kuzhina Moderne me Ishull',
        nameEn: 'Chef Kitchen & Dining',
        roomType: 'kitchen',
        dimensions: '5.2m x 4.0m',
        areaSqm: 20.8,
        panoramaUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600',
        floorPlanCoords: { x: 65, y: 40 },
        hotspots: [
          {
            id: 'hs-3',
            targetRoomId: 'room-living',
            labelSq: 'Kthehu te Salloni',
            labelEn: 'Back to Living Room',
            x: 25,
            y: 50
          },
          {
            id: 'hs-4',
            targetRoomId: 'room-bedroom',
            labelSq: 'Dhoma Master e Gjumit',
            labelEn: 'Master Bedroom',
            x: 82,
            y: 48
          }
        ],
        features: [
          {
            id: 'feat-4',
            label: 'Pllakë Mermeri Calacatta',
            detail: 'Kuarz dhe mermer natyral rezistent ndaj gërvishtjeve dhe nxehtësisë.',
            x: 50,
            y: 65
          },
          {
            id: 'feat-5',
            label: 'Pajisje Miele të Integruara',
            detail: 'Furra, mikrovala dhe pianura me induksion Miele Class A+++.',
            x: 72,
            y: 40
          }
        ]
      },
      {
        id: 'room-bedroom',
        nameSq: 'Dhoma e Gjumit Master (En-Suite)',
        nameEn: 'Master Suite Bedroom',
        roomType: 'bedroom',
        dimensions: '6.0m x 4.5m',
        areaSqm: 27.0,
        panoramaUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600',
        floorPlanCoords: { x: 70, y: 75 },
        hotspots: [
          {
            id: 'hs-5',
            targetRoomId: 'room-bathroom',
            labelSq: 'Banja Master me Vaskë',
            labelEn: 'Master Bathroom',
            x: 85,
            y: 50
          },
          {
            id: 'hs-6',
            targetRoomId: 'room-living',
            labelSq: 'Kthehu te Salloni',
            labelEn: 'Back to Living Room',
            x: 15,
            y: 52
          }
        ],
        features: [
          {
            id: 'feat-6',
            label: 'Gardërobë Walk-in e Montuar',
            detail: 'Dollap i personalizuar me ndriçim LED sensor.',
            x: 28,
            y: 38
          }
        ]
      },
      {
        id: 'room-bathroom',
        nameSq: 'Banja Kryesore Spa',
        nameEn: 'Master Spa Bathroom',
        roomType: 'bathroom',
        dimensions: '3.8m x 3.2m',
        areaSqm: 12.16,
        panoramaUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600',
        floorPlanCoords: { x: 88, y: 75 },
        hotspots: [
          {
            id: 'hs-7',
            targetRoomId: 'room-bedroom',
            labelSq: 'Kthehu te Dhoma e Gjumit',
            labelEn: 'Back to Bedroom',
            x: 20,
            y: 52
          }
        ],
        features: [
          {
            id: 'feat-7',
            label: 'Sanitari Grohe & Villeroy-Boch',
            detail: 'Bateri të zeza mat me termostat dixhital.',
            x: 52,
            y: 55
          }
        ]
      },
      {
        id: 'room-terrace',
        nameSq: 'Teraca Panoramike me Pamje 360°',
        nameEn: 'Panoramic Terrace',
        roomType: 'balcony',
        dimensions: '9.0m x 4.8m',
        areaSqm: 43.2,
        panoramaUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600',
        floorPlanCoords: { x: 20, y: 20 },
        hotspots: [
          {
            id: 'hs-8',
            targetRoomId: 'room-living',
            labelSq: 'Hyr në Sallon',
            labelEn: 'Enter Living Room',
            x: 50,
            y: 50
          }
        ],
        features: [
          {
            id: 'feat-8',
            label: 'Zonë Pergola & BBQ',
            detail: 'Gatshme për kuzhinë verore dhe jacuzzi të jashtëm.',
            x: 65,
            y: 58
          }
        ]
      }
    ]
  }
};
