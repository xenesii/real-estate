import React, { useState } from 'react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  MapPin, Home, Building2, Sparkles, Plus, Minus, 
  RotateCcw, Eye, Heart, CheckCircle2, ChevronRight, X
} from 'lucide-react';

interface InteractivePropertyMapProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
}

export const InteractivePropertyMap: React.FC<InteractivePropertyMapProps> = ({
  listings,
  onSelectListing
}) => {
  const { isFavorite, toggleFavorite, convertPrice } = useApp();
  const { locale } = useLocale();

  const [selectedMapListing, setSelectedMapListing] = useState<Listing | null>(null);
  const [activeRegion, setActiveRegion] = useState<'all' | 'kosovo' | 'albania'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Region center bounds approximations for visual pin placement
  // Coordinates mapping from lat/lng to container %
  const getCoordinatesPercent = (lat: number, lng: number) => {
    // Normalization box for Balkan region (Lat: 39.5 to 43.5, Lng: 19.0 to 22.0)
    const minLat = 39.5;
    const maxLat = 43.2;
    const minLng = 19.1;
    const maxLng = 21.8;

    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;

    // Clamp within 5% to 95%
    return {
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(8, Math.min(92, y))
    };
  };

  const filteredPins = listings.filter(l => {
    if (activeRegion === 'kosovo') return l.location?.country === 'Kosovo';
    if (activeRegion === 'albania') return l.location?.country === 'Albania';
    return true;
  });

  return (
    <div className="relative w-full h-[620px] rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl select-none">
      
      {/* Background Stylized Topographic / Cartographic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      
      {/* Stylized Coastal Line & Geo Outlines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" xmlns="http://www.w3.org/2000/svg">
        <path d="M 120,600 Q 180,450 220,380 T 300,200 Q 420,100 650,80" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" />
        <path d="M 80,500 Q 140,320 280,240 T 550,150" fill="none" stroke="#525252" strokeWidth="1.5" />
      </svg>

      {/* Top Map Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Region Switcher */}
        <div className="inline-flex p-1 bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-700 pointer-events-auto shadow-lg">
          <button
            type="button"
            onClick={() => { setActiveRegion('all'); setZoomLevel(1); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRegion === 'all' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Të Gjitha ({listings.length})
          </button>
          <button
            type="button"
            onClick={() => { setActiveRegion('kosovo'); setZoomLevel(1.2); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRegion === 'kosovo' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'text-stone-300 hover:text-white'
            }`}
          >
            🇽🇰 Kosovë
          </button>
          <button
            type="button"
            onClick={() => { setActiveRegion('albania'); setZoomLevel(1.2); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRegion === 'albania' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'text-stone-300 hover:text-white'
            }`}
          >
            🇦🇱 Shqipëri
          </button>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5 bg-stone-900/90 backdrop-blur-md p-1 rounded-2xl border border-stone-700 pointer-events-auto shadow-lg">
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition-all cursor-pointer"
            title="Zmadho"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition-all cursor-pointer"
            title="Zvogëlo"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => { setZoomLevel(1); setActiveRegion('all'); }}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition-all cursor-pointer"
            title="Rivendos Hartën"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Major City Anchors & Landmarks on Map */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[28%] left-[70%] text-stone-500 font-bold text-[11px] tracking-wider uppercase opacity-70">
          📍 Prishtinë
        </div>
        <div className="absolute top-[38%] left-[62%] text-stone-500 font-bold text-[11px] tracking-wider uppercase opacity-70">
          📍 Prizren
        </div>
        <div className="absolute top-[52%] left-[42%] text-stone-500 font-bold text-[11px] tracking-wider uppercase opacity-70">
          📍 Tiranë
        </div>
        <div className="absolute top-[54%] left-[34%] text-stone-500 font-bold text-[11px] tracking-wider uppercase opacity-70">
          📍 Durrës
        </div>
        <div className="absolute top-[72%] left-[38%] text-stone-500 font-bold text-[11px] tracking-wider uppercase opacity-70">
          📍 Vlorë
        </div>
        <div className="absolute top-[86%] left-[45%] text-stone-500 font-bold text-[11px] tracking-wider uppercase opacity-70">
          📍 Sarandë
        </div>
      </div>

      {/* Interactive Property Map Pins */}
      <div 
        className="absolute inset-0 transition-transform duration-300 origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {filteredPins.map(listing => {
          const lat = listing.location?.lat || 42.66;
          const lng = listing.location?.lng || 21.16;
          const pos = getCoordinatesPercent(lat, lng);
          const isSelected = selectedMapListing?.id === listing.id;

          const priceLabel = listing.transaction === 'rent'
            ? `€${listing.price}/m`
            : listing.price >= 1000000 
              ? `€${(listing.price / 1000000).toFixed(1)}M`
              : `€${Math.round(listing.price / 1000)}k`;

          return (
            <div
              key={listing.id}
              className="absolute z-10 transition-all duration-200"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedMapListing(listing)}
                className={`group px-2.5 py-1.5 rounded-full font-black text-xs transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-500 text-white scale-125 ring-4 ring-emerald-400/40 z-30' 
                    : 'bg-stone-900/90 text-white hover:bg-emerald-600 hover:scale-110 border border-stone-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white animate-pulse' : 'bg-emerald-400'}`} />
                <span>{priceLabel}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Property Overlay Preview Drawer/Card */}
      {selectedMapListing && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-2xl relative">
            
            <button
              type="button"
              onClick={() => setSelectedMapListing(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-3.5">
              {/* Photo */}
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-stone-100 shrink-0 relative">
                <img
                  src={selectedMapListing.media?.[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400'}
                  alt={selectedMapListing.titleSq}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {selectedMapListing.verified && (
                  <div className="absolute top-1.5 left-1.5 p-1 rounded-full bg-emerald-600 text-white shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
                    {selectedMapListing.location?.neighborhood ? `${selectedMapListing.location.neighborhood}, ` : ''}{selectedMapListing.location?.city}
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-tight">
                    {locale === 'en' ? selectedMapListing.titleEn : selectedMapListing.titleSq}
                  </h4>
                  <div className="text-sm font-black text-emerald-700 mt-1 font-serif">
                    €{selectedMapListing.price.toLocaleString()}
                    {selectedMapListing.transaction === 'rent' && <span className="text-xs font-normal text-stone-500">/muaj</span>}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                  <span>{selectedMapListing.areaSqm} m² • {selectedMapListing.bedrooms || 2} Dhoma</span>
                  <button
                    type="button"
                    onClick={() => onSelectListing(selectedMapListing)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Detajet</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Bottom Map Legend */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-3 bg-stone-900/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-stone-800 text-[11px] text-stone-300">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Pronë në Shitje / Qira</span>
        </div>
        <span>•</span>
        <span>Kliko mbi çmimin për të parë detajet</span>
      </div>

    </div>
  );
};
