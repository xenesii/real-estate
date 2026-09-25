import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { LocationSelector } from '../components/LocationSelector';
import { PropertyTypeSelector } from '../components/PropertyTypeSelector';
import { 
  Search, MapPin, Building, ShieldCheck, ArrowRight, CheckCircle2, 
  TrendingUp, Users, Home, Briefcase, Trees, Car, BarChart3, 
  Calculator, Award, Globe, Banknote, Compass, Sparkles, Star,
  Phone, ArrowUpRight, Check
} from 'lucide-react';
import { PROPERTY_CATEGORIES_CONFIG } from '../data/constants';
import { PropertyCategory } from '../types';

export const HomePage: React.FC = () => {
  const { locale, t } = useLocale();
  const { listings, filters, setFilters, setActiveView, developments } = useApp();

  const [activeTabCity, setActiveTabCity] = useState<'all' | 'Prishtinë' | 'Tiranë' | 'sale' | 'rent'>('all');

  const featuredListings = listings.filter(l => l.status === 'published' && l.featured);
  
  // Filtered showcase based on quick tab
  const displayedListings = featuredListings.filter(item => {
    if (activeTabCity === 'Prishtinë') return item.location.city.toLowerCase().includes('prishtin');
    if (activeTabCity === 'Tiranë') return item.location.city.toLowerCase().includes('tiran');
    if (activeTabCity === 'sale') return item.transaction === 'sale';
    if (activeTabCity === 'rent') return item.transaction === 'rent';
    return true;
  }).slice(0, 6);

  const recentListings = listings.filter(l => l.status === 'published').slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('search');
  };

  const handleCategorySelect = (cat: PropertyCategory) => {
    setFilters(prev => ({ ...prev, category: cat, propertyType: undefined }));
    setActiveView('search');
  };

  const handleCitySelect = (cityName: string) => {
    setFilters(prev => ({ ...prev, city: cityName }));
    setActiveView('search');
  };

  const categoryImages: Record<string, string> = {
    residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    commercial: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    land: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    parking: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80',
    other: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
  };

  const topCities = [
    { name: 'Prishtinë', country: 'Kosovë', count: 48, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80', tag: 'Kryeqyteti i Kosovës' },
    { name: 'Tiranë', country: 'Shqipëri', count: 36, img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80', tag: 'Metropoli & Qendra' },
    { name: 'Durrës', country: 'Shqipëri', count: 22, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', tag: 'Bregdeti & Turizëm' },
    { name: 'Prizren', country: 'Kosovë', count: 18, img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80', tag: 'Kultura & Trashëgimia' },
    { name: 'Vlorë', country: 'Shqipëri', count: 19, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80', tag: 'Riviera Shqiptare' },
    { name: 'Pejë', country: 'Kosovë', count: 14, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', tag: 'Rezidenca & Mal' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* ============================================================== */}
      {/* LUXURY HERO SECTION */}
      {/* ============================================================== */}
      <section className="relative pt-16 pb-28 md:pt-24 md:pb-36 overflow-hidden">
        
        {/* Background Architectural Photography with Forest Green Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
            alt="Luxury Real Estate Kosovo Albania"
            className="w-full h-full object-cover object-center scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1E14]/94 via-[#122A1D]/88 to-[#0C1E14]/94" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B3E2B]/40 via-transparent to-black/60 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Headlines */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            
            {/* Gold Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#183827]/80 backdrop-blur-md border border-[#C5A880]/50 text-[#E8CFA9] text-xs font-bold uppercase tracking-wider mb-6 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#DFBE89]" />
              <span>Platformë Ekskluzive e Patundshmërive • Kosovë & Shqipëri</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-serif mb-6 leading-[1.15] drop-shadow-sm">
              Eksploroni Pronat më Ekskluzive në Treg
            </h1>

            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Mbi 1,200+ vila luksoze, apartamente moderne, troje dhe komplekse rezidenciale me certifikim të plotë kadastral dhe asistencë noteriale.
            </p>
          </div>

          {/* MAIN SEARCH WIDGET CARD */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#ECE7DE] p-5 sm:p-7 relative z-20">
            
            {/* Transaction Switcher Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#ECE7DE] pb-4">
              <button
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, transaction: undefined }))}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  !filters.transaction 
                    ? 'bg-[#142C20] text-white shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF8F5]'
                }`}
              >
                {!filters.transaction && <span className="w-1.5 h-1.5 rounded-full bg-[#DFBE89]" />}
                <span>{t.common.all}</span>
              </button>

              <button
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, transaction: 'sale' }))}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  filters.transaction === 'sale' 
                    ? 'bg-[#142C20] text-white shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF8F5]'
                }`}
              >
                {filters.transaction === 'sale' && <span className="w-1.5 h-1.5 rounded-full bg-[#DFBE89]" />}
                <span>{t.common.forSale}</span>
              </button>

              <button
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, transaction: 'rent' }))}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  filters.transaction === 'rent' 
                    ? 'bg-[#142C20] text-white shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF8F5]'
                }`}
              >
                {filters.transaction === 'rent' && <span className="w-1.5 h-1.5 rounded-full bg-[#DFBE89]" />}
                <span>{t.common.forRent}</span>
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              
              {/* Location Select with Smart Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#916E34] mb-1.5">
                  {t.common.location}
                </label>
                <LocationSelector
                  selectedCity={filters.city !== 'all' ? filters.city : undefined}
                  selectedCountry={filters.country}
                  onSelect={({ city, country }) => {
                    setFilters(prev => ({ ...prev, city: city || undefined, country: country || undefined }));
                  }}
                />
              </div>

              {/* Property Type Select with Smart Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#916E34] mb-1.5">
                  {t.common.propertyType}
                </label>
                <PropertyTypeSelector
                  selectedCategory={filters.category}
                  selectedType={filters.propertyType !== 'all' ? filters.propertyType : undefined}
                  onSelect={({ category, propertyType }) => {
                    setFilters(prev => ({ ...prev, category, propertyType }));
                  }}
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#916E34] mb-1.5">
                  {t.common.maxPrice} (€)
                </label>
                <input
                  type="number"
                  placeholder="p.sh. 180,000"
                  value={filters.maxPrice || ''}
                  onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-sm text-[#12291E] focus:bg-white focus:border-[#142C20] focus:ring-1 focus:ring-[#142C20] focus:outline-none transition-all"
                  id="search-maxprice-input"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#163324] hover:bg-[#10241A] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer border border-[#27533C]"
                  id="hero-search-submit-btn"
                >
                  <Search className="w-4 h-4 text-[#DFBE89]" />
                  <span className="tracking-wide">{t.common.search}</span>
                </button>
              </div>

            </form>

            {/* Quick Synonyms & Popular Searches */}
            <div className="mt-5 pt-4 border-t border-[#ECE7DE] flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span className="font-bold text-[#142C20]">Kërkime të shpejta:</span>
              <button 
                type="button" 
                onClick={() => { setFilters(prev => ({ ...prev, city: 'Prishtinë', propertyType: 'penthouse' })); setActiveView('search'); }}
                className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-stone-700 hover:text-[#142C20] hover:bg-[#ECE7DE] transition-colors"
              >
                Penthouse Prishtinë
              </button>
              <button 
                type="button" 
                onClick={() => { setFilters(prev => ({ ...prev, city: 'Tiranë', propertyType: 'apartment' })); setActiveView('search'); }}
                className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-stone-700 hover:text-[#142C20] hover:bg-[#ECE7DE] transition-colors"
              >
                Apartamente Tiranë
              </button>
              <button 
                type="button" 
                onClick={() => { setFilters(prev => ({ ...prev, propertyType: 'villa' })); setActiveView('search'); }}
                className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-stone-700 hover:text-[#142C20] hover:bg-[#ECE7DE] transition-colors"
              >
                Vila Luksoze
              </button>
              <button 
                type="button" 
                onClick={() => { setFilters(prev => ({ ...prev, transaction: 'rent' })); setActiveView('search'); }}
                className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-stone-700 hover:text-[#142C20] hover:bg-[#ECE7DE] transition-colors"
              >
                Me Qira
              </button>
              <button 
                type="button" 
                onClick={() => { setFilters(prev => ({ ...prev, category: 'land' })); setActiveView('search'); }}
                className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-stone-700 hover:text-[#142C20] hover:bg-[#ECE7DE] transition-colors"
              >
                Troje Ndërtimi
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* DARK FOREST STATS COUNTER BAR */}
      {/* ============================================================== */}
      <section className="bg-[#10241A] text-white py-12 border-y border-[#1E3F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="border-r border-[#1E3F2E] last:border-none pr-4">
              <div className="text-3xl sm:text-4xl font-black text-[#DFBE89] font-serif">1,250+</div>
              <div className="text-xs uppercase font-bold text-stone-300 tracking-wider mt-1.5">
                Prona të Verifikuara
              </div>
            </div>

            <div className="border-r border-[#1E3F2E] last:border-none pr-4">
              <div className="text-3xl sm:text-4xl font-black text-white font-serif">85+</div>
              <div className="text-xs uppercase font-bold text-stone-300 tracking-wider mt-1.5">
                Agjenci të Licencuara
              </div>
            </div>

            <div className="border-r border-[#1E3F2E] last:border-none pr-4">
              <div className="text-3xl sm:text-4xl font-black text-[#DFBE89] font-serif">€140M+</div>
              <div className="text-xs uppercase font-bold text-stone-300 tracking-wider mt-1.5">
                Vlerë Transaksionesh
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-serif">99.4%</div>
              <div className="text-xs uppercase font-bold text-stone-300 tracking-wider mt-1.5">
                Blerës të Kënaqur
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* EXPLORE BY CATEGORY */}
      {/* ============================================================== */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#916E34] mb-2">
              KATEGORITË E PRONAVE
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#12291E] font-serif">
              Eksploroni sipas Tipologjisë
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mt-2 md:mt-0">
            Zgjidhni kategorinë e përshtatshme për investim, banim familjar apo zgjerim të biznesit tuaj.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {PROPERTY_CATEGORIES_CONFIG.map(cat => {
            const count = listings.filter(l => l.status === 'published' && l.category === cat.slug).length;
            const img = categoryImages[cat.slug] || categoryImages.other;
            
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className="group relative h-64 rounded-2xl overflow-hidden border border-[#ECE7DE] text-left cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-5"
              >
                {/* Background Image with Dark Vignette */}
                <img
                  src={img}
                  alt={cat.nameSq}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E14]/90 via-[#0C1E14]/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 text-white">
                  <div className="text-xs font-bold text-[#DFBE89] uppercase tracking-wider mb-1">
                    {count} Prona
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif mb-1 group-hover:text-[#DFBE89] transition-colors">
                    {locale === 'sq' ? cat.nameSq : cat.nameEn}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-stone-300 font-medium group-hover:translate-x-1 transition-transform">
                    <span>Eksploro katalogun</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </section>

      {/* ============================================================== */}
      {/* FEATURED PROPERTIES WITH TABS */}
      {/* ============================================================== */}
      <section className="py-16 bg-[#F4EFEA]/60 border-y border-[#ECE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#916E34] mb-2">
                PËRZGJEDHJE EKSKLUZIVE
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#12291E] font-serif">
                Pronat më të Kërkuara të Javës
              </h2>
            </div>

            {/* Quick Filter Switcher */}
            <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-[#ECE7DE] text-xs font-bold">
              {[
                { key: 'all', label: 'Të Gjitha' },
                { key: 'Prishtinë', label: 'Prishtinë' },
                { key: 'Tiranë', label: 'Tiranë' },
                { key: 'sale', label: 'Në Shitje' },
                { key: 'rent', label: 'Me Qira' }
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTabCity(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTabCity === tab.key 
                      ? 'bg-[#142C20] text-white shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {displayedListings.map(listing => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setActiveView('search')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#163324] hover:bg-[#10241A] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer border border-[#27533C]"
            >
              <span>Shiko të Gjitha Pronat ({listings.length})</span>
              <ArrowRight className="w-4 h-4 text-[#DFBE89]" />
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* TOP CITY DESTINATIONS GRID */}
      {/* ============================================================== */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#916E34] mb-2">
            DESTINACIONET KRYESORE
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#12291E] font-serif mb-3">
            Qytetet më të Preferuara për Banim & Investim
          </h2>
          <p className="text-sm text-stone-600">
            Nga qendrat urbane me ritëm të lartë te bregdeti joshës dhe resortet malore.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCities.map(city => (
            <div
              key={city.name}
              onClick={() => handleCitySelect(city.name)}
              className="group relative h-64 rounded-2xl overflow-hidden border border-[#ECE7DE] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E14]/90 via-[#0C1E14]/40 to-transparent" />

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#12291E]">
                {city.count} Prona
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-semibold text-[#DFBE89] uppercase tracking-wider block mb-1">
                  {city.country} • {city.tag}
                </span>
                <h3 className="text-2xl font-black font-serif text-white group-hover:text-[#DFBE89] transition-colors mb-2">
                  {city.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium group-hover:text-white">
                  <span>Eksploro pronat në {city.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#DFBE89] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ============================================================== */}
      {/* SPRINT 07: RESIDENTIAL DEVELOPMENTS SPOTLIGHT */}
      {/* ============================================================== */}
      <section className="py-16 bg-[#10241A] text-white border-y border-[#1E3F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183827] border border-[#27533C] text-[#DFBE89] text-xs font-bold uppercase tracking-wider mb-3">
                <Building className="w-3.5 h-3.5" />
                <span>Ndërtime të Reja Rezidenciale</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-white">
                Projektet & Komplekset Ekskluzive
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl">
                Bleni drejtpërdrejt nga ndërtuesit e certifikuar me këste me 0% interes, leje të rregullta ndërtimi dhe arkitekturë moderne.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button
                type="button"
                onClick={() => setActiveView('developments')}
                className="px-5 py-3 rounded-xl bg-[#B89758] hover:bg-[#C5A880] text-[#10241A] text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Të Gjitha Projektet ({developments.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {developments.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                onClick={() => setActiveView('developments')}
                className="bg-[#142C20] rounded-2xl border border-[#234A36] overflow-hidden hover:border-[#B89758]/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-stone-900">
                    <img
                      src={proj.coverImage}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#10241A]/90 backdrop-blur-md text-[#DFBE89] text-[10px] font-black uppercase tracking-wider border border-[#27533C]">
                      {proj.statusLabelSq}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-[#10241A]/95 px-3 py-1.5 rounded-xl text-xs font-bold text-white border border-[#27533C]">
                      nga €{proj.startingPricePerSqm}/m²
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[11px] font-bold text-[#DFBE89] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{proj.neighborhood}, {proj.city}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#DFBE89] transition-colors font-serif">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed font-sans">
                      {proj.descriptionSq}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs text-stone-400 border-t border-[#1E3F2E] mt-3">
                  <span>Ndërtuesi: <strong className="text-white">{proj.developerName}</strong></span>
                  <span className="text-[#DFBE89] font-bold group-hover:translate-x-1 transition-transform">Eksploro →</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* DIASPORA & LEGAL PILLARS */}
      {/* ============================================================== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#916E34] mb-2">
              SIGURIA JUAJ ËSHTË PRIORITET
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#12291E] font-serif mb-3">
              Standardet e Sigurisë & Asistenca Noteriale
            </h2>
            <p className="text-sm text-stone-600">
              Çdo transaksion në platformën tonë mbështetet nga ekspertë ligjorë dhe verifikim të fletës poseduese në Agjencinë Kadastrale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="p-8 rounded-2xl border border-[#ECE7DE] bg-[#FAF8F5] hover:border-[#D5CEBF] transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#142C20] text-[#DFBE89] flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#12291E] font-serif mb-2">
                Verifikim Kadastral & Noter
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Të gjitha pronat e certifikuara kontrollohen për hipoteka ekzistuese, fletë poseduese dhe pastërti ligjore para nënshkrimit të kontratës.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-2xl border border-[#ECE7DE] bg-[#FAF8F5] hover:border-[#D5CEBF] transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#142C20] text-[#DFBE89] flex items-center justify-center mb-6 shadow-sm">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#12291E] font-serif mb-2">
                Blerje nga Diaspora pa Udhëtim
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Shfrytëzoni autorizimin noterial (Power of Attorney), vizita virtuale 360° dhe transaksione të mbrojtura me llogari mirëbesimi (Escrow).
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-2xl border border-[#ECE7DE] bg-[#FAF8F5] hover:border-[#D5CEBF] transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#142C20] text-[#DFBE89] flex items-center justify-center mb-6 shadow-sm">
                <Banknote className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#12291E] font-serif mb-2">
                Partneritet me Bankat Kryesore
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Mundësi kreditimi deri në 85% të vlerës me norma preferenciale interesi përmes NLB, ProCredit, TEB, Raiffeisen, BKT dhe Credins Bank.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* FINAL CALL TO ACTION BANNER */}
      {/* ============================================================== */}
      <section className="py-16 bg-[#142C20] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#10241A] rounded-3xl border border-[#27533C] p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183827] border border-[#27533C] text-[#DFBE89] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Publikim i Menjëhershëm</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-white mb-3">
                Dëshironi të Shisni apo Jepni me Qira Pronën Tuaj?
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                Publikoni sot në SHITJE PRONASH dhe arrini mbi 150,000 blerës potencialë nga Kosova, Shqipëria dhe e gjithë Diaspora.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => setActiveView('publish')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#DFBE89] hover:bg-[#E6C895] text-[#10241A] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
              >
                Publiko Pronë Falas
              </button>
              <button
                type="button"
                onClick={() => setActiveView('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#163324] hover:bg-[#1E4330] text-white font-bold text-xs uppercase tracking-wider transition-all border border-[#2E5C44] cursor-pointer text-center"
              >
                Kontaktoni Ekspertët
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
