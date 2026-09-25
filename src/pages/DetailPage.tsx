import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, ArrowRight, MapPin, Maximize2, Bed, Bath, ShieldCheck, Heart, Scale, 
  Share2, Phone, MessageSquare, ExternalLink, Calendar, Building, TrendingDown, TrendingUp,
  Printer, Check, AlertTriangle, Layers, Car, Trees, Home, Briefcase, Flag, History,
  Compass, Landmark, Calculator, FileText, Radio, Clock, Video, Users, Sparkles
} from 'lucide-react';
import { AMENITIES_DATA, PROPERTY_CATEGORIES_CONFIG, PROPERTY_TYPES_CONFIG } from '../data/constants';
import { MortgageCalculator } from '../components/MortgageCalculator';
import { ReportListingModal } from '../components/ReportListingModal';
import { ScheduleViewingModal } from '../components/ScheduleViewingModal';
import { LegalVerificationCard } from '../components/LegalVerificationCard';
import { ShareModal } from '../components/ShareModal';
import { PropertyPrintBrochureModal } from '../components/PropertyPrintBrochureModal';
import { PropertyCard } from '../components/PropertyCard';
import { COMMUTE_HUBS, calculateCommuteTime } from '../data/mockCommuteHubs';
import { Button, Badge } from '../components/ui';

export const DetailPage: React.FC = () => {
  const { locale, t } = useLocale();
  const { 
    listings,
    activeListing, setActiveView, isFavorite, toggleFavorite, 
    comparedIds, toggleCompare, sendInquiry, setInvestmentPrefill,
    openVirtualTour, openClosingCostsModal, openContractBuilder,
    openHouses, rsvpOpenHouse, openTenantApplicationModal,
    convertPrice, currency
  } = useApp();
  
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [lastConvId, setLastConvId] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });

  if (!activeListing) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-stone-600 mb-4">Nuk u gjet asnjë pronë e përzgjedhur.</p>
          <button
            onClick={() => setActiveView('search')}
            className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Kthehu te Pronat
          </button>
        </div>
      </div>
    );
  }

  const title = locale === 'en' ? activeListing.titleEn : activeListing.titleSq;
  const description = locale === 'en' ? activeListing.descriptionEn : activeListing.descriptionSq;
  const isFav = isFavorite(activeListing.id);
  const isCompared = comparedIds.includes(activeListing.id);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'de-DE').format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    const coverUrl = activeListing.media[0]?.thumbnailUrl || activeListing.media[0]?.url || '';
    const convId = sendInquiry({
      listingId: activeListing.id,
      listingTitle: title,
      listingCover: coverUrl,
      listingPrice: activeListing.price,
      listingCurrency: activeListing.currency,
      messageText: contactForm.message,
      senderName: contactForm.name,
      senderEmail: contactForm.email,
      senderPhone: contactForm.phone
    });

    setLastConvId(convId);
    setMessageSent(true);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-6 print:bg-white print:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Actions Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <button
            onClick={() => setActiveView('search')}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kthehu te kërkimi</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setBrochureModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-200 rounded-xl text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Gjenero Broshurë A4 / PDF"
            >
              <Printer className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Broshurë PDF</span>
            </button>
            <button
              onClick={() => setShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-200 rounded-xl text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Shpërndaj në WhatsApp, Viber, etj."
            >
              <Share2 className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Shpërndaj</span>
            </button>
            <button
              onClick={() => toggleCompare(activeListing.id)}
              className={`p-2 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                isCompared 
                  ? 'bg-stone-900 text-white border-stone-900' 
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 shadow-xs'
              }`}
              title={t.common.compare}
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(activeListing.id)}
              className={`p-2 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                isFav 
                  ? 'bg-rose-50 text-rose-600 border-rose-200' 
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 shadow-xs'
              }`}
              title={t.common.favorite}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* HERO GALLERY */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden bg-stone-900 shadow-md">
            
            {/* Main Featured Photo */}
            <div className="md:col-span-3 aspect-[16/10] relative overflow-hidden bg-stone-800">
              <img
                src={activeListing.media[selectedPhotoIndex]?.url || activeListing.media[0]?.url}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-stone-900/90 text-white text-xs font-bold uppercase px-3 py-1 rounded-md">
                  {activeListing.transaction === 'sale' ? t.common.sale : t.common.rent}
                </span>
                {activeListing.priceReduced && (
                  <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    {t.common.priceReduced}
                  </span>
                )}
              </div>

              {/* 360° Virtual Tour Launch Button */}
              {(activeListing.hasVirtualTour || activeListing.virtualTourUrl) && (
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    type="button"
                    onClick={() => openVirtualTour(activeListing.id)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/95 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Eksploro Tur 360° VR & Matje</span>
                  </button>
                </div>
              )}
            </div>

            {/* Photo Thumbnails Column */}
            <div className="hidden md:flex md:flex-col gap-3 p-3 bg-stone-950 overflow-y-auto max-h-[500px]">
              {activeListing.media.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedPhotoIndex === idx ? 'border-emerald-500 scale-95' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img.thumbnailUrl} alt={img.caption || 'thumbnail'} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* DETAIL CONTENT: 2 Column Layout (Specs + Contact Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header info */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
                <div className="text-3xl font-extrabold text-stone-900 font-serif">
                  €{formatPrice(activeListing.price)}
                  {activeListing.transaction === 'rent' && (
                    <span className="text-base font-normal text-stone-500 ml-1">
                      {t.common.perMonth}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200">
                    {activeListing.category === 'residential' && <Home className="w-3.5 h-3.5 text-stone-600" />}
                    {activeListing.category === 'commercial' && <Briefcase className="w-3.5 h-3.5 text-amber-600" />}
                    {activeListing.category === 'land' && <Trees className="w-3.5 h-3.5 text-emerald-600" />}
                    {activeListing.category === 'parking' && <Car className="w-3.5 h-3.5 text-blue-600" />}
                    <span>
                      {locale === 'sq' 
                        ? PROPERTY_CATEGORIES_CONFIG.find(c => c.slug === activeListing.category)?.nameSq || activeListing.category
                        : PROPERTY_CATEGORIES_CONFIG.find(c => c.slug === activeListing.category)?.nameEn || activeListing.category}
                    </span>
                  </span>

                  {/* Country Flag Badge */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-50 text-stone-700 text-xs font-semibold border border-stone-200">
                    <span>{activeListing.location?.country === 'Kosovo' ? '🇽🇰 Kosovë' : '🇦🇱 Shqipëri'}</span>
                  </span>

                  {activeListing.verified && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Dokumentacion i Verifikuar</span>
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 leading-snug">
                {title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-stone-500 mb-6">
                <MapPin className="w-4 h-4 text-stone-400" />
                <span>{activeListing.displayAddress}</span>
              </div>

              {/* Key Quick Stats Tailored to Category */}
              {activeListing.category === 'land' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-center">
                  <div>
                    <div className="text-xs uppercase text-emerald-800 font-semibold">Sipërfaqja (m²)</div>
                    <div className="text-lg font-bold text-stone-900 mt-0.5">{activeListing.areaSqm} m²</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-emerald-800 font-semibold">Njësia Vendore (Ari)</div>
                    <div className="text-lg font-extrabold text-emerald-700 mt-0.5">
                      {(activeListing.areaSqm / 100).toFixed(2)} Ari
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-emerald-800 font-semibold">Tipologjia</div>
                    <div className="text-sm font-bold text-stone-900 mt-1 capitalize">
                      {PROPERTY_TYPES_CONFIG.find(t => t.slug === activeListing.propertyType)?.nameSq || activeListing.propertyType}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-emerald-800 font-semibold">Shteti</div>
                    <div className="text-sm font-bold text-stone-900 mt-1">
                      {activeListing.location?.country === 'Kosovo' ? '🇽🇰 Kosovë' : '🇦🇱 Shqipëri'}
                    </div>
                  </div>
                </div>
              ) : activeListing.category === 'parking' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 text-center">
                  <div>
                    <div className="text-xs uppercase text-blue-800 font-semibold">Sipërfaqja</div>
                    <div className="text-lg font-bold text-stone-900 mt-0.5">{activeListing.areaSqm} m²</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-blue-800 font-semibold">Kati / Niveli</div>
                    <div className="text-lg font-bold text-stone-900 mt-0.5">{activeListing.floor || 'Niveli -1'}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-blue-800 font-semibold">Aksesi</div>
                    <div className="text-sm font-bold text-stone-900 mt-1">Kartë / Pult</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-blue-800 font-semibold">Siguria</div>
                    <div className="text-sm font-bold text-stone-900 mt-1">24/7 Monitorim</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-center">
                  <div>
                    <div className="text-xs uppercase text-stone-500 font-semibold">{t.common.area}</div>
                    <div className="text-lg font-bold text-stone-900 mt-0.5">{activeListing.areaSqm} m²</div>
                  </div>
                  {activeListing.bedrooms !== undefined && (
                    <div>
                      <div className="text-xs uppercase text-stone-500 font-semibold">{t.common.bedrooms}</div>
                      <div className="text-lg font-bold text-stone-900 mt-0.5">{activeListing.bedrooms}</div>
                    </div>
                  )}
                  {activeListing.bathrooms !== undefined && (
                    <div>
                      <div className="text-xs uppercase text-stone-500 font-semibold">{t.common.bathrooms}</div>
                      <div className="text-lg font-bold text-stone-900 mt-0.5">{activeListing.bathrooms}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs uppercase text-stone-500 font-semibold">{t.common.floor}</div>
                    <div className="text-lg font-bold text-stone-900 mt-0.5">{activeListing.floor || 'Kati 0'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Price History Section */}
            {activeListing.priceHistory && activeListing.priceHistory.length > 1 && (
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  Historiku i Çmimeve të Pronës
                </h3>
                <div className="space-y-3">
                  {activeListing.priceHistory.map((hist, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-stone-100 last:border-0">
                      <div className="flex items-center gap-2 text-stone-600">
                        <Calendar className="w-4 h-4 text-stone-400" />
                        <span>{hist.date}</span>
                        {hist.note && <span className="text-xs text-stone-400 italic">({hist.note})</span>}
                      </div>
                      <div className="font-bold text-stone-900">
                        €{formatPrice(hist.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Description */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-4">
                Përshkrimi i Plotë
              </h3>
              <p className="text-stone-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {description}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-4">
                Specifikat Teknike
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Kategoria:</span>
                  <span className="font-semibold text-stone-900 capitalize">
                    {PROPERTY_CATEGORIES_CONFIG.find(c => c.slug === activeListing.category)?.nameSq || activeListing.category}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Lloji i Pronës:</span>
                  <span className="font-semibold text-stone-900">
                    {PROPERTY_TYPES_CONFIG.find(t => t.slug === activeListing.propertyType)?.nameSq || activeListing.propertyType}
                  </span>
                </div>
                {activeListing.category === 'land' && (
                  <div className="flex justify-between py-2 border-b border-stone-100 bg-emerald-50/50 px-2 rounded">
                    <span className="text-emerald-900 font-medium">Sipërfaqja në Ari:</span>
                    <span className="font-bold text-emerald-800">{(activeListing.areaSqm / 100).toFixed(2)} Ari</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Shteti:</span>
                  <span className="font-semibold text-stone-900">
                    {activeListing.location?.country === 'Kosovo' ? 'Kosovë 🇽🇰' : 'Shqipëri 🇦🇱'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Qyteti & Zona:</span>
                  <span className="font-semibold text-stone-900">
                    {activeListing.location?.city}, {activeListing.location?.neighborhood}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Gjendja:</span>
                  <span className="font-semibold text-stone-900">{t.conditions[activeListing.condition] || activeListing.condition}</span>
                </div>
                {activeListing.category !== 'land' && activeListing.category !== 'parking' && (
                  <>
                    <div className="flex justify-between py-2 border-b border-stone-100">
                      <span className="text-stone-500">Mobilimi:</span>
                      <span className="font-semibold text-stone-900">{t.furnishings[activeListing.furnished] || activeListing.furnished}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-100">
                      <span className="text-stone-500">Ngrohja:</span>
                      <span className="font-semibold text-stone-900">{t.heatings[activeListing.heating] || activeListing.heating}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-100">
                      <span className="text-stone-500">Viti i Ndërtimit:</span>
                      <span className="font-semibold text-stone-900">{activeListing.yearBuilt || 'I papërcaktuar'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-100">
                      <span className="text-stone-500">Klasa Energjetike:</span>
                      <span className="font-semibold text-stone-900">{activeListing.energyClass || 'B'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cadastral & Legal Status Verification (Sprint 5) */}
            <LegalVerificationCard listing={activeListing} />

            {/* Amenities Grid */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-4">
                {t.common.amenities}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES_DATA.map(am => {
                  const hasIt = activeListing.amenities.includes(am.slug);
                  return (
                    <div
                      key={am.id}
                      className={`flex items-center gap-2.5 p-3 rounded-lg text-xs font-medium border ${
                        hasIt 
                          ? 'bg-emerald-50/50 border-emerald-200 text-stone-900' 
                          : 'bg-stone-50/50 border-stone-100 text-stone-400 opacity-60'
                      }`}
                    >
                      <Check className={`w-4 h-4 ${hasIt ? 'text-emerald-600' : 'text-stone-300'}`} />
                      <span>{locale === 'en' ? am.nameEn : am.nameSq}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location Map with Privacy Protection Notice */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider">
                  {t.common.location}
                </h3>
                {activeListing.isApproximateLocation && (
                  <div className="text-xs text-stone-500 italic flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.common.approximateLocation}</span>
                  </div>
                )}
              </div>
              <div className="h-64 rounded-xl overflow-hidden border border-stone-200">
                <iframe
                  title="detail-map"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeListing.location.lng - 0.02}%2C${activeListing.location.lat - 0.02}%2C${activeListing.location.lng + 0.02}%2C${activeListing.location.lat + 0.02}&layer=mapnik&marker=${activeListing.location.lat}%2C${activeListing.location.lng}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Price History & Reduction Tracker (Sprint 3) */}
            {activeListing.priceHistory && activeListing.priceHistory.length > 1 && (
              <div className="bg-white p-6 rounded-2xl border border-[#ECE7DE] shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ECE7DE]">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-[#B89758]" />
                    <h3 className="text-base font-bold text-[#12291E] font-serif uppercase tracking-wider">
                      Historiku & Transparenca e Çmimit
                    </h3>
                  </div>
                  <Badge variant="gold" size="sm">
                    Verifikuar në Kadastër
                  </Badge>
                </div>
                <div className="space-y-2.5">
                  {activeListing.priceHistory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-stone-400 font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#ECE7DE]">{item.date}</span>
                        <span className="font-bold text-[#12291E]">{item.note || 'Përditësim çmimi'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[#163324] font-serif text-sm">{convertPrice(item.price).formatted}</span>
                        {idx > 0 && item.price < activeListing.priceHistory[idx - 1].price && (
                          <span className="text-[10px] bg-[#FAF5EC] text-[#947132] border border-[#EADBBE] px-2 py-0.5 rounded-lg font-bold flex items-center gap-0.5">
                            <TrendingDown className="w-3 h-3 text-[#B89758]" />
                            -{convertPrice(activeListing.priceHistory[idx - 1].price - item.price).formatted}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mortgage & Financial Calculator (Sprint 3) */}
            <MortgageCalculator initialPrice={activeListing.price} />

            {/* SPRINT 07: Investment & Rental ROI Analyzer */}
            {activeListing.transaction === 'sale' && (
              <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 p-6 rounded-2xl border border-stone-800 text-white shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Analizë Investimi & Qiradhënie</span>
                    </div>
                    <h3 className="text-base font-bold text-white font-serif">
                      Llogarit Kthimin nga Investimi (ROI) për këtë Pronë
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 max-w-lg">
                      Simuloni të ardhurat nga qiraja afatgjatë ose ditore (Airbnb), shpenzimet e menaxhimit dhe normën e kthimit të kapitalit (Cap Rate).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setInvestmentPrefill({
                        price: activeListing.price,
                        city: activeListing.location?.city || 'Prishtinë',
                        title: locale === 'en' ? activeListing.titleEn : activeListing.titleSq
                      });
                      setActiveView('investments');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Hap Llogaritësin e ROI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* SPRINT 09: Open House Event Banner if available */}
            {(() => {
              const matchedEvent = openHouses.find(oh => oh.listingId === activeListing.id) || (activeListing.openHouse ? {
                id: `oh-preview`,
                listingId: activeListing.id,
                listingTitle: activeListing.titleSq,
                listingCover: activeListing.media[0]?.url || '',
                listingPrice: activeListing.price,
                city: activeListing.location.city,
                country: activeListing.location.country,
                address: activeListing.displayAddress,
                date: activeListing.openHouse.date,
                startTime: activeListing.openHouse.startTime,
                endTime: activeListing.openHouse.endTime,
                type: activeListing.openHouse.type,
                maxAttendees: activeListing.openHouse.maxAttendees,
                currentRsvps: activeListing.openHouse.currentRsvps,
                agentName: activeListing.userName,
                agentPhone: activeListing.userPhone,
                notes: 'Ju mirëpresim për vizitë të hapur të patundshmërisë.'
              } : null);

              if (!matchedEvent) return null;

              return (
                <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-stone-900 rounded-2xl p-6 text-white border border-purple-800 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
                        <Radio className="w-3.5 h-3.5 animate-pulse text-purple-400" />
                        <span>Ngjarje Open House e Planifikuar</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        Vizitë e Hapur më {new Date(matchedEvent.date).toLocaleDateString('sq-AL', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </h3>
                      <p className="text-xs text-purple-200">
                        Ora: <strong>{matchedEvent.startTime} - {matchedEvent.endTime}</strong> | Formati: {matchedEvent.type === 'live_stream' ? 'Transmetim Online 4K' : 'Vizitë Fizike në Vend'}
                      </p>
                      <p className="text-xs text-purple-300/80">
                        {matchedEvent.currentRsvps} persona tashmë të regjistruar ({matchedEvent.maxAttendees - matchedEvent.currentRsvps} vende të mbetura)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          rsvpOpenHouse(matchedEvent.id, {
                            name: 'Vizitor PRONAT',
                            email: 'vizitor@pronat.com',
                            phone: '+38344123456'
                          });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all shrink-0"
                      >
                        <Users className="w-4 h-4" />
                        <span>Rezervo Vendin Falas (RSVP)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveView('open_houses')}
                        className="px-4 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 text-xs font-semibold transition-colors shrink-0"
                      >
                        Shiko të Gjitha
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* SPRINT 09: Commute & Travel Times to Key City Centers */}
            {activeListing.location.lat && activeListing.location.lng && (
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        Koha e Udhëtimit deri te Pikat Kryesore (Commute Analysis)
                      </h4>
                      <p className="text-xs text-stone-500">
                        Distanca dhe koha mesatare me makinë, autobus dhe në këmbë
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COMMUTE_HUBS
                    .filter(h => h.country === activeListing.location.country || h.city === activeListing.location.city)
                    .slice(0, 3)
                    .map(hub => {
                      const carTime = calculateCommuteTime(activeListing.location.lat, activeListing.location.lng, hub.lat, hub.lng, 'car');
                      const walkTime = calculateCommuteTime(activeListing.location.lat, activeListing.location.lng, hub.lat, hub.lng, 'walking');

                      return (
                        <div key={hub.id} className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-2">
                          <span className="text-xs font-bold text-stone-800 block line-clamp-1">
                            {hub.name}
                          </span>
                          <div className="flex items-center justify-between text-xs text-stone-600">
                            <span className="flex items-center gap-1 font-semibold text-emerald-700">
                              <Car className="w-3.5 h-3.5" />
                              <span>{carTime} min</span>
                            </span>
                            <span className="flex items-center gap-1 text-stone-500">
                              <span>Në këmbë: {walkTime > 60 ? `${Math.round(walkTime / 60)}h` : `${walkTime}m`}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* SPRINT 09: Legal Contracts Hub Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-stone-900 text-emerald-400 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Gjenero Kontratë Zyrtare për këtë Pronë
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Krijoni {activeListing.transaction === 'rent' ? 'kontratë qiraje' : 'parakontratë shitblerjeje'} të personalizuar të mbështetur në ligjet e {activeListing.location?.country === 'Kosovo' ? 'Kosovës (LMD)' : 'Shqipërisë (Kodi Civil)'}.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openContractBuilder(activeListing)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shrink-0 shadow-md shadow-emerald-900/20 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hap Gjeneruesin e Kontratës</span>
              </button>
            </div>

            {/* SPRINT 08: Closing Costs & Legal Fees Estimator */}
            {activeListing.transaction === 'sale' && (
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Tarifat Noteriale & Kadastrale (Closing Costs)
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Llogarit saktë tarifat zyrtare të noterit, regjistrimin në AKK/ASHK dhe tatimet për këtë vlerë prej €{formatPrice(activeListing.price)}.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openClosingCostsModal(activeListing.price, activeListing.location?.country === 'Albania' ? 'Albania' : 'Kosovo')}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Kalkulo Shpenzimet</span>
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Contact & Seller Card */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#ECE7DE] shadow-sm sticky top-24">
              
              {/* Agent / Owner Avatar & Details */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-[#ECE7DE] mb-5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#10241A] to-[#163324] text-[#DFBE89] font-black flex items-center justify-center text-lg font-serif border border-[#234F37] shadow-xs">
                  {activeListing.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#12291E] font-serif">
                    {activeListing.userName}
                  </h4>
                  <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                    <span className="font-medium text-[#947132]">{activeListing.agencyName || 'Pronar i Verifikuar'}</span>
                    <span>•</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">Aktiv</span>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels (Phone, WhatsApp, Viber) */}
              <div className="space-y-2.5 mb-6">
                
                {/* Phone Reveal Button */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setPhoneRevealed(true)}
                  icon={<Phone className="w-4 h-4 text-[#DFBE89]" />}
                >
                  <span>{phoneRevealed ? activeListing.userPhone : t.contact.showPhone}</span>
                </Button>

                {/* Schedule Viewing CTA Button (Sprint 4) */}
                <Button
                  variant="gold"
                  size="md"
                  fullWidth
                  onClick={() => setViewingModalOpen(true)}
                  icon={<Calendar className="w-4 h-4 text-[#10241A]" />}
                >
                  <span>Rezervo Vizitë (Fizike / Virtuale)</span>
                </Button>

                {/* Tenant Application CTA for Rent Listings (Sprint 11) */}
                {activeListing.transaction === 'rent' && (
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => openTenantApplicationModal(activeListing)}
                    icon={<FileText className="w-4 h-4 text-[#DFBE89]" />}
                  >
                    <span>Apliko për Qira (Tenant Screening)</span>
                  </Button>
                )}

                {/* WhatsApp Direct Chat */}
                {activeListing.enableWhatsApp && (
                  <a
                    href={`https://wa.me/${activeListing.userPhone.replace(/\+/g, '')}?text=Përshëndetje,%20jam%20i%20interesuar%20për%20pronën:%20${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#FAF5EC] text-[#12291E] border border-[#ECE7DE] hover:border-[#DFBE89] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bisedo në {t.contact.whatsApp}</span>
                  </a>
                )}

                {/* Viber Direct Chat */}
                {activeListing.enableViber && (
                  <a
                    href={`viber://chat?number=${activeListing.userPhone}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#FAF5EC] text-[#12291E] border border-[#ECE7DE] hover:border-[#DFBE89] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Bisedo në {t.contact.viber}</span>
                  </a>
                )}

              </div>

              {/* In-App Direct Message Form */}
              <form onSubmit={handleSendMessage} className="space-y-3 pt-5 border-t border-[#ECE7DE]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#12291E] mb-2 flex items-center justify-between">
                  <span>{t.contact.sendMessage}</span>
                  <span className="text-[10px] text-stone-400 font-normal">Përgjigje brenda ditës</span>
                </div>

                {messageSent && (
                  <div className="p-3.5 bg-[#FAF5EC] border border-[#EADBBE] text-[#947132] rounded-xl text-xs space-y-2">
                    <p className="font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#163324]" />
                      <span>{t.contact.messageSentSuccess}</span>
                    </p>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => setActiveView('dashboard')}
                      icon={<MessageSquare className="w-3.5 h-3.5 text-[#DFBE89]" />}
                    >
                      <span>Shiko Bisedën te Paneli Im</span>
                    </Button>
                  </div>
                )}

                <input
                  type="text"
                  required
                  placeholder={t.contact.fullName}
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-[#12291E] focus:bg-white focus:border-[#B89758] focus:outline-none transition-colors"
                />

                <input
                  type="email"
                  required
                  placeholder={t.contact.email}
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-[#12291E] focus:bg-white focus:border-[#B89758] focus:outline-none transition-colors"
                />

                <textarea
                  rows={3}
                  required
                  placeholder={t.contact.messagePlaceholder}
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-[#12291E] focus:bg-white focus:border-[#B89758] focus:outline-none transition-colors"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  <span>{t.contact.send}</span>
                </Button>
              </form>

              <div className="mt-4 text-[11px] text-stone-400 text-center leading-relaxed">
                {t.contact.securityNotice}
              </div>

              {/* Report Listing Button (Sprint 3) */}
              <div className="mt-4 pt-4 border-t border-[#ECE7DE] text-center">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Raporto këtë shpallje për pasaktësi</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* SIMILAR PROPERTIES SECTION */}
        {(() => {
          const similarListings = listings
            .filter(l => l.id !== activeListing.id && l.status === 'published' && (l.location.city === activeListing.location.city || l.category === activeListing.category))
            .slice(0, 3);

          if (similarListings.length === 0) return null;

          return (
            <div className="mt-16 pt-12 border-t border-[#ECE7DE]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#916E34] block mb-1">
                    SUGJERIME TË NGJASHME
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#12291E] font-serif">
                    Prona të Ngjashme në këtë Zonë
                  </h3>
                </div>

                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveView('search');
                  }}
                  className="mt-3 sm:mt-0 text-xs font-bold text-[#142C20] hover:text-[#B89758] flex items-center gap-1.5 transition-colors self-start"
                >
                  <span>Shiko të gjitha pronat në {activeListing.location.city}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarListings.map(listing => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          );
        })()}

        {/* Report Modal */}
        <ReportListingModal
          listingId={activeListing.id}
          listingTitle={title}
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
        />

        {/* Schedule Viewing Modal (Sprint 4) */}
        <ScheduleViewingModal
          isOpen={viewingModalOpen}
          onClose={() => setViewingModalOpen(false)}
          listingId={activeListing.id}
          listingTitle={title}
          listingCover={activeListing.media[0]?.thumbnailUrl || activeListing.media[0]?.url || ''}
          listingPrice={activeListing.price}
          listingCity={activeListing.location.city}
        />

        {/* Share Modal (Sprint 5) */}
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          listing={activeListing}
          onOpenPrintBrochure={() => setBrochureModalOpen(true)}
        />

        {/* Print / PDF Brochure Modal (Sprint 5) */}
        <PropertyPrintBrochureModal
          isOpen={brochureModalOpen}
          onClose={() => setBrochureModalOpen(false)}
          listing={activeListing}
        />

      </div>
    </div>
  );
};
