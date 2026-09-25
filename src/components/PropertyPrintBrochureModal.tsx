import React from 'react';
import { Listing } from '../types';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { 
  X, Printer, Building2, MapPin, Bed, Bath, Maximize2, 
  ShieldCheck, Phone, Mail, QrCode, CheckCircle2 
} from 'lucide-react';
import { Button } from './ui/Button';

interface PropertyPrintBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export const PropertyPrintBrochureModal: React.FC<PropertyPrintBrochureModalProps> = ({
  isOpen,
  onClose,
  listing
}) => {
  const { locale, t } = useLocale();
  const { convertPrice } = useApp();

  if (!isOpen) return null;

  const title = locale === 'en' ? listing.titleEn : listing.titleSq;
  const description = locale === 'en' ? listing.descriptionEn : listing.descriptionSq;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#10241A]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:fixed">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-[#ECE7DE] shadow-2xl overflow-hidden my-8 print:my-0 print:shadow-none print:border-none print:max-w-none">
        
        {/* Action Header (Hidden in Print) */}
        <div className="bg-[#10241A] text-white p-4 px-6 flex items-center justify-between border-b border-[#1C3E2D] print:hidden">
          <div className="flex items-center gap-2 text-[#DFBE89] text-xs font-bold uppercase tracking-wider">
            <Printer className="w-4 h-4 text-[#B89758]" />
            <span>Fletëpalosje / Broshurë Zyrtare e Printueshme (PDF)</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="gold"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-4 h-4 text-[#10241A]" />}
            >
              Printo / Ruaj si PDF
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Brochure Body */}
        <div className="p-8 space-y-6 print:p-6" id="printable-brochure-content">
          
          {/* Top Brand Banner */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-[#10241A]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DFBE89] via-[#C5A880] to-[#997B4D] flex items-center justify-center text-white shadow-md border border-[#FFF2DE]/30">
                <span className="font-serif font-black text-xl text-[#10241A]">SP</span>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-[#10241A] font-serif">
                  SHITJE PRONASH
                </div>
                <p className="text-[10px] tracking-[0.24em] uppercase text-[#B89758] font-bold mt-0.5">
                  PREMIUM REAL ESTATE • KOSOVË & SHQIPËRI
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-[#10241A] text-[#DFBE89] text-xs font-bold rounded-lg uppercase tracking-wider">
                {listing.transaction === 'sale' ? 'Në Shitje' : 'Me Qira'}
              </span>
              <div className="text-2xl font-black font-serif text-[#10241A] mt-1">
                {convertPrice(listing.price).formatted}
              </div>
            </div>
          </div>

          {/* Title & Location */}
          <div>
            <h1 className="text-xl font-bold font-serif text-[#10241A] mb-1">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
              <span>{listing.location?.neighborhood ? `${listing.location.neighborhood}, ` : ''}{listing.location?.city || ''}, {listing.location?.country === 'Kosovo' ? 'Kosovë' : 'Shqipëri'}</span>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-3 gap-3">
            {listing.media.slice(0, 3).map((item, idx) => (
              <div key={idx} className="h-44 rounded-xl overflow-hidden border border-[#ECE7DE] bg-stone-100">
                <img 
                  src={item.url} 
                  alt={`Foto ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          {/* Key Specs Matrix */}
          <div className="grid grid-cols-4 gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#ECE7DE] text-center">
            <div>
              <div className="text-xs text-stone-500 font-medium">Sipërfaqja</div>
              <div className="text-sm font-black text-[#10241A] mt-0.5">{listing.areaSqm} m²</div>
            </div>
            {listing.bedrooms !== undefined && (
              <div>
                <div className="text-xs text-stone-500 font-medium">Dhomat</div>
                <div className="text-sm font-black text-[#10241A] mt-0.5">{listing.bedrooms} Gjumi</div>
              </div>
            )}
            {listing.bathrooms !== undefined && (
              <div>
                <div className="text-xs text-stone-500 font-medium">Banjot</div>
                <div className="text-sm font-black text-[#10241A] mt-0.5">{listing.bathrooms} Banjo</div>
              </div>
            )}
            <div>
              <div className="text-xs text-stone-500 font-medium">Gjendja</div>
              <div className="text-sm font-black text-[#10241A] mt-0.5 capitalize">{listing.condition}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#10241A] mb-2">Përshkrimi i Pronës</h3>
            <p className="text-xs text-stone-600 leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>

          {/* Agent & Verification Footer */}
          <div className="pt-6 border-t border-[#ECE7DE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#10241A] text-[#DFBE89] flex items-center justify-center font-serif font-bold text-sm border border-[#2B543D]">
                SP
              </div>
              <div>
                <div className="text-xs font-bold text-[#10241A]">Zyra e Verifikuar e Shitjes & Këshillimit</div>
                <div className="text-[11px] text-stone-500">{listing.userPhone} • info@shitjepronash.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <div className="text-xs font-bold text-[#0E6C38]">Verifikuar Ligjërisht & Kadastralisht</div>
                <div className="text-[10px] text-stone-500 font-mono">ID Pronës: #{listing.id}</div>
              </div>
              <div className="w-12 h-12 bg-[#FAF8F5] p-1 rounded-lg border border-[#ECE7DE] flex items-center justify-center">
                <QrCode className="w-10 h-10 text-[#10241A]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
