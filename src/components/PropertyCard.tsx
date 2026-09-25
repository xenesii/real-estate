import React from 'react';
import { Listing } from '../types';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { 
  Heart, Scale, MapPin, Maximize2, Bed, Bath, ShieldCheck, 
  TrendingDown, Store, TreePine, Car, Compass, Radio, ArrowUpRight 
} from 'lucide-react';
import { Badge } from './ui/Badge';

interface PropertyCardProps {
  listing: Listing;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ listing }) => {
  const { locale, t } = useLocale();
  const { 
    isFavorite, toggleFavorite, comparedIds, toggleCompare, 
    setActiveListing, setActiveView, openVirtualTour, convertPrice 
  } = useApp();

  const title = locale === 'en' ? listing.titleEn : listing.titleSq;
  const isFav = isFavorite(listing.id);
  const isCompared = comparedIds.includes(listing.id);
  const coverImage = listing.media.find(m => m.isCover)?.url || listing.media[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';

  const converted = convertPrice(listing.price);

  const handleCardClick = () => {
    setActiveListing(listing);
    setActiveView('detail');
  };

  const typeName = (t.types as any)[listing.propertyType] || listing.propertyType;
  const isLand = listing.category === 'land';
  const isCommercial = listing.category === 'commercial';
  const isParking = listing.category === 'parking';
  const countryFlag = listing.location.country === 'Kosovo' ? '🇽🇰' : '🇦🇱';

  return (
    <div 
      className="group bg-white rounded-2xl border border-[#ECE7DE] overflow-hidden hover:border-[#DFBE89] hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
      id={`property-card-${listing.id}`}
      onClick={handleCardClick}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Shadow Overlay for Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          <Badge variant={listing.transaction === 'sale' ? 'sale' : 'rent'}>
            {listing.transaction === 'sale' ? 'NË SHITJE' : 'ME QIRA'}
          </Badge>
          
          <Badge variant="neutral">
            {typeName}
          </Badge>

          {listing.featured && (
            <Badge variant="exclusive" icon={<span>★</span>}>
              EKSKLUZIVE
            </Badge>
          )}

          {listing.priceReduced && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
              <TrendingDown className="w-3 h-3" />
              <span>Çmimi u Ul</span>
            </span>
          )}

          {listing.openHouse && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500 text-[#12291E] flex items-center gap-1 shadow-xs">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Open House</span>
            </span>
          )}
        </div>

        {/* Top Badges Right: Favorite & Compare Action Circle Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => toggleCompare(listing.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
              isCompared 
                ? 'bg-[#142C20] text-[#DFBE89] shadow-md border border-[#27533C]' 
                : 'bg-white/90 text-stone-700 hover:bg-white hover:text-black shadow-md border border-white/40'
            }`}
            title="Krahaso këtë pronë"
            id={`compare-btn-${listing.id}`}
          >
            <Scale className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => toggleFavorite(listing.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
              isFav 
                ? 'bg-rose-50 text-rose-600 shadow-md border border-rose-200' 
                : 'bg-white/90 text-stone-700 hover:bg-white hover:text-rose-600 shadow-md border border-white/40'
            }`}
            title="Ruaj te favoritet"
            id={`fav-btn-${listing.id}`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
          </button>
        </div>

        {/* Bottom Badges: Verification & 360 Tour */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {listing.verified ? (
            <div className="bg-[#10241A]/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-[#244A36]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DFBE89]" />
              <span>Verifikuar</span>
            </div>
          ) : <div />}

          {(listing.hasVirtualTour || listing.virtualTourUrl) && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openVirtualTour(listing.id);
              }}
              className="pointer-events-auto bg-[#163324]/90 hover:bg-[#10241A] backdrop-blur-md text-[#DFBE89] text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 cursor-pointer border border-[#2E5B42]"
              title="Shiko Tur 360° Virtual"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>360° VR</span>
            </button>
          )}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-2xl font-black text-[#12291E] font-serif tracking-tight">
              {converted.symbol}{converted.formatted}
              {listing.transaction === 'rent' && (
                <span className="text-xs font-sans font-medium text-stone-500 ml-1.5">
                  / muaj
                </span>
              )}
            </div>

            {listing.priceNegotiable && (
              <span className="text-[11px] font-semibold text-[#8B6E39] bg-[#FAF5EC] border border-[#E9DCBE] px-2 py-0.5 rounded-md">
                E negociueshme
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-stone-900 group-hover:text-[#163324] transition-colors line-clamp-1 mb-2 font-sans">
            {title}
          </h3>

          {/* Location with Flag */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
            <span className="text-xs">{countryFlag}</span>
            <MapPin className="w-3.5 h-3.5 text-[#B89758] shrink-0" />
            <span className="truncate">{listing.displayAddress}</span>
          </div>
        </div>

        {/* Tailored Specs Strip with Dividers */}
        <div className="pt-3.5 border-t border-[#ECE7DE]">
          <div className="grid grid-cols-3 gap-2 text-xs text-stone-600 mb-3">
            
            {/* Area */}
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="font-semibold text-stone-800">{listing.areaSqm} m²</span>
            </div>

            {/* Middle Feature */}
            {isLand ? (
              <div className="flex items-center gap-1.5">
                <TreePine className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-semibold text-stone-800 truncate">{(listing.areaSqm / 100).toFixed(1)} Ari</span>
              </div>
            ) : isCommercial ? (
              <div className="flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="truncate">{listing.floor ? `Kati ${listing.floor}` : 'Përdhes'}</span>
              </div>
            ) : isParking ? (
              <div className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>Kati {listing.floor ?? -1}</span>
              </div>
            ) : (
              listing.bedrooms !== undefined ? (
                <div className="flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="font-semibold text-stone-800">{listing.bedrooms} {locale === 'en' ? 'beds' : 'dhoma'}</span>
                </div>
              ) : <div />
            )}

            {/* Right Feature */}
            {isLand ? (
              <div className="flex items-center justify-end">
                <span className="text-[10px] font-bold text-[#142C20] bg-[#F1EFEA] px-2 py-0.5 rounded">
                  {listing.propertyType === 'land_building' ? 'Truall' : 'Tokë'}
                </span>
              </div>
            ) : isCommercial ? (
              <div className="flex items-center justify-end">
                <span className="text-[10px] font-semibold text-[#8B6E39] bg-[#FAF5EC] px-2 py-0.5 rounded truncate">
                  {listing.heating ? 'Kondicioner' : 'E gatshme'}
                </span>
              </div>
            ) : (
              listing.bathrooms !== undefined ? (
                <div className="flex items-center justify-end gap-1.5">
                  <Bath className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="font-semibold text-stone-800">{listing.bathrooms} banjo</span>
                </div>
              ) : <div />
            )}

          </div>

          {/* Card Footer with Shiko Detajet */}
          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F5F2EC]">
            <span className="text-[11px] text-stone-400 truncate">
              {listing.location.city}, {listing.location.country}
            </span>

            <span className="inline-flex items-center gap-1 font-bold text-[#142C20] group-hover:text-[#B89758] transition-colors">
              <span>Detajet</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
