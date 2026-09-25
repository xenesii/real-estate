import React, { useState, useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { LocationSelector } from '../components/LocationSelector';
import { PropertyTypeSelector } from '../components/PropertyTypeSelector';
import { 
  Search, Filter, RotateCcw, MapPin, Building, ArrowUpDown, 
  Map as MapIcon, Grid, X, ExternalLink, Bookmark, Columns 
} from 'lucide-react';
import { PROPERTY_CATEGORIES_CONFIG } from '../data/constants';
import { SaveSearchModal } from '../components/SaveSearchModal';
import { InteractivePropertyMap } from '../components/InteractivePropertyMap';
import { CommuteFilterWidget } from '../components/CommuteFilterWidget';
import { COMMUTE_HUBS, calculateCommuteTime } from '../data/mockCommuteHubs';
import { Radio, Calendar, Clock, Sparkles } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { locale, t } = useLocale();
  const { listings, filters, setFilters, resetFilters, setActiveListing, setActiveView } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'split' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedMapListingId, setSelectedMapListingId] = useState<string | null>(null);
  const [saveSearchModalOpen, setSaveSearchModalOpen] = useState(false);

  // Accent-tolerant normalizer for search (shtepi -> shtëpi, etc.)
  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ë/g, 'e')
      .replace(/ç/g, 'c');
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // Must be published unless previewed
      if (item.status !== 'published') return false;

      // Category filter (Sprint 2)
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Country filter (Sprint 2)
      if (filters.country && item.location.country !== filters.country) {
        return false;
      }

      // Transaction
      if (filters.transaction && item.transaction !== filters.transaction) {
        return false;
      }

      // Property Type
      if (filters.propertyType && filters.propertyType !== 'all' && item.propertyType !== filters.propertyType) {
        return false;
      }

      // City
      if (filters.city && filters.city !== 'all') {
        const itemCity = normalize(item.location.city);
        const filterCity = normalize(filters.city);
        if (!itemCity.includes(filterCity)) return false;
      }

      // Neighborhood
      if (filters.neighborhood) {
        const itemNeigh = normalize(item.location.neighborhood);
        const filterNeigh = normalize(filters.neighborhood);
        if (!itemNeigh.includes(filterNeigh)) return false;
      }

      // Price bounds
      if (filters.minPrice !== undefined && item.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && item.price > filters.maxPrice) return false;

      // Bedrooms
      if (filters.bedrooms && filters.bedrooms !== 'any') {
        if (item.bedrooms !== undefined && item.bedrooms < Number(filters.bedrooms)) return false;
      }

      // Text query
      if (filters.query && filters.query.trim() !== '') {
        const q = normalize(filters.query);
        const titleSq = normalize(item.titleSq);
        const titleEn = normalize(item.titleEn);
        const descSq = normalize(item.descriptionSq);
        const loc = normalize(item.displayAddress + ' ' + item.location.city + ' ' + item.location.neighborhood);
        
        // Search synonyms: 'banese' = 'apartament'
        const isBanesaOrApt = (q.includes('banes') || q.includes('apartam')) && (item.propertyType === 'apartment' || item.propertyType === 'duplex' || item.propertyType === 'penthouse');
        const isShtepi = (q.includes('shte') || q.includes('shpi')) && (item.propertyType === 'house' || item.propertyType === 'villa');
        const isLokal = (q.includes('lokal') || q.includes('zyre') || q.includes('magazin')) && item.category === 'commercial';

        const matchesText = titleSq.includes(q) || titleEn.includes(q) || descSq.includes(q) || loc.includes(q);
        if (!matchesText && !isBanesaOrApt && !isShtepi && !isLokal) {
          return false;
        }
      }

      // Commute Isochrone Filter (Sprint 09)
      if (filters.commuteHubId && filters.maxCommuteMinutes && item.location.lat && item.location.lng) {
        const hub = COMMUTE_HUBS.find(h => h.id === filters.commuteHubId);
        if (hub) {
          const commuteTime = calculateCommuteTime(
            item.location.lat,
            item.location.lng,
            hub.lat,
            hub.lng,
            filters.commuteMode || 'car'
          );
          if (commuteTime > filters.maxCommuteMinutes) {
            return false;
          }
        }
      }

      // Open House Filter (Sprint 09)
      if (filters.hasOpenHouse && !item.openHouse) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'area_desc') return b.areaSqm - a.areaSqm;
      if (filters.sortBy === 'most_viewed') return b.viewsCount - a.viewsCount;
      // newest default
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [listings, filters]);

  // Selected listing for map preview
  const activeMapListing = useMemo(() => {
    if (selectedMapListingId) {
      return filteredListings.find(l => l.id === selectedMapListingId) || filteredListings[0];
    }
    return filteredListings[0];
  }, [selectedMapListingId, filteredListings]);

  // Check how many filters are active
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.country) count++;
    if (filters.city && filters.city !== 'all') count++;
    if (filters.neighborhood) count++;
    if (filters.propertyType && filters.propertyType !== 'all') count++;
    if (filters.transaction) count++;
    if (filters.minPrice !== undefined) count++;
    if (filters.maxPrice !== undefined) count++;
    if (filters.bedrooms && filters.bedrooms !== 'any') count++;
    if (filters.query) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              {t.nav.properties}
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Gjetur <span className="font-semibold text-stone-900">{filteredListings.length}</span> prona sipas kritereve tuaja
            </p>
          </div>

          {/* Controls Bar: Sort, View Switch, Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-700 shadow-xs cursor-pointer"
            >
              <Filter className="w-4 h-4 text-stone-500" />
              <span>{t.common.filter}</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 shadow-xs">
              <ArrowUpDown className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
              <select
                value={filters.sortBy || 'newest'}
                onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-transparent focus:outline-none text-xs sm:text-sm font-medium cursor-pointer"
              >
                <option value="newest">Më të rejat së pari</option>
                <option value="price_asc">Çmimi: nga më i ulëti</option>
                <option value="price_desc">Çmimi: nga më i larti</option>
                <option value="area_desc">Sipërfaqja më e madhe</option>
                <option value="most_viewed">Më të shikuarat</option>
              </select>
            </div>

            {/* Save Search Button (Sprint 3) */}
            <button
              onClick={() => setSaveSearchModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF5EB] hover:bg-[#F3E9D5] text-[#916E34] border border-[#EADBBE] rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-xs cursor-pointer"
              title="Ruaj këtë kërkim dhe merr njoftime"
            >
              <Bookmark className="w-4 h-4 text-[#B89758]" />
              <span className="hidden sm:inline">Ruaj Kërkimin</span>
            </button>

            {/* Grid / Map toggle */}
            <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#ECE7DE]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#142C20] text-white shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
                title={t.common.list}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'map' ? 'bg-[#142C20] text-white shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
                title={t.common.map}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* CATEGORY SELECTOR BAR (Sprint 2) */}
        <div className="mb-6 bg-white p-2 rounded-2xl border border-[#ECE7DE] shadow-xs flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              !filters.category
                ? 'bg-[#142C20] text-white shadow-xs'
                : 'text-stone-600 hover:bg-[#FAF8F5]'
            }`}
          >
            <span>{locale === 'sq' ? 'Të Gjitha Pronat' : 'All Properties'}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${!filters.category ? 'bg-[#234A36] text-[#DFBE89]' : 'bg-stone-100 text-stone-700'}`}>
              {listings.filter(l => l.status === 'published').length}
            </span>
          </button>

          {PROPERTY_CATEGORIES_CONFIG.map(cat => {
            const count = listings.filter(l => l.status === 'published' && l.category === cat.slug).length;
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilters(prev => ({ 
                  ...prev, 
                  category: isSelected ? undefined : cat.slug,
                  propertyType: undefined
                }))}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#142C20] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{locale === 'sq' ? cat.nameSq : cat.nameEn}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-[#234A36] text-[#DFBE89]' : 'bg-stone-100 text-stone-700'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE FILTERS CHIPS */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-stone-500">Filtrat aktivë:</span>

            {filters.country && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium">
                <span>{filters.country === 'Kosovo' ? '🇽🇰 Kosovë' : '🇦🇱 Shqipëri'}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, country: undefined }))} className="hover:text-stone-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.city && filters.city !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium">
                <span>Qyteti: {filters.city}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, city: undefined, neighborhood: undefined }))} className="hover:text-stone-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.neighborhood && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium">
                <span>Lagjja: {filters.neighborhood}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, neighborhood: undefined }))} className="hover:text-stone-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.propertyType && filters.propertyType !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium">
                <span>Lloji: {(t.types as any)[filters.propertyType] || filters.propertyType}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, propertyType: undefined }))} className="hover:text-stone-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.transaction && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium">
                <span>{filters.transaction === 'sale' ? t.common.forSale : t.common.forRent}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, transaction: undefined }))} className="hover:text-stone-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.maxPrice && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium">
                <span>Deri €{filters.maxPrice.toLocaleString()}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, maxPrice: undefined }))} className="hover:text-stone-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.query && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium">
                <span>"{filters.query}"</span>
                <button onClick={() => setFilters(prev => ({ ...prev, query: undefined }))} className="hover:text-stone-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.commuteHubId && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Koha: ≤ {filters.maxCommuteMinutes} min ({COMMUTE_HUBS.find(h => h.id === filters.commuteHubId)?.city})</span>
                <button onClick={() => setFilters(prev => ({ ...prev, commuteHubId: undefined, maxCommuteMinutes: undefined, commuteMode: undefined }))} className="hover:text-emerald-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.hasOpenHouse && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 font-medium">
                <Radio className="w-3.5 h-3.5 text-purple-600" />
                <span>Open House</span>
                <button onClick={() => setFilters(prev => ({ ...prev, hasOpenHouse: undefined }))} className="hover:text-purple-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-stone-500 hover:text-stone-900 font-bold underline ml-1 cursor-pointer"
            >
              {locale === 'sq' ? 'Pastro të gjitha' : 'Clear all'}
            </button>
          </div>
        )}

        {/* Layout: Sidebar Filter + Listings Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* FILTER SIDEBAR (Desktop + Mobile overlay) */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="bg-white rounded-2xl border border-stone-200 p-5 sticky top-24 space-y-6 shadow-xs">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-600" />
                  {t.common.filter}
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  {t.common.reset}
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Kërko me Fjalë Kyçe
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="p.sh. banesë me qira, rruga c..."
                    value={filters.query || ''}
                    onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Transaction Switcher */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Transaksioni
                </label>
                <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-lg text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, transaction: undefined }))}
                    className={`py-1.5 rounded-md cursor-pointer ${!filters.transaction ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    {t.common.all}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, transaction: 'sale' }))}
                    className={`py-1.5 rounded-md cursor-pointer ${filters.transaction === 'sale' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    {t.common.sale}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, transaction: 'rent' }))}
                    className={`py-1.5 rounded-md cursor-pointer ${filters.transaction === 'rent' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    {t.common.rent}
                  </button>
                </div>
              </div>

              {/* Country Selection (Sprint 2) */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Shteti
                </label>
                <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-lg text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, country: undefined }))}
                    className={`py-1.5 rounded-md cursor-pointer ${!filters.country ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600'}`}
                  >
                    Të dyja
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, country: 'Kosovo' }))}
                    className={`py-1.5 rounded-md cursor-pointer ${filters.country === 'Kosovo' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600'}`}
                  >
                    🇽🇰 Kosovë
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, country: 'Albania' }))}
                    className={`py-1.5 rounded-md cursor-pointer ${filters.country === 'Albania' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600'}`}
                  >
                    🇦🇱 Shqipëri
                  </button>
                </div>
              </div>

              {/* Smart Location Selector (Sprint 2) */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  {t.common.location}
                </label>
                <LocationSelector
                  selectedCity={filters.city !== 'all' ? filters.city : undefined}
                  selectedNeighborhood={filters.neighborhood}
                  selectedCountry={filters.country}
                  compact
                  onSelect={({ city, neighborhood, country }) => {
                    setFilters(prev => ({ 
                      ...prev, 
                      city: city || undefined, 
                      neighborhood: neighborhood || undefined,
                      country: country || prev.country
                    }));
                  }}
                />
              </div>

              {/* Smart Property Type Selector (Sprint 2) */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  {t.common.propertyType}
                </label>
                <PropertyTypeSelector
                  selectedCategory={filters.category}
                  selectedType={filters.propertyType !== 'all' ? filters.propertyType : undefined}
                  compact
                  onSelect={({ category, propertyType }) => {
                    setFilters(prev => ({ ...prev, category, propertyType }));
                  }}
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  {t.common.price} (€)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
                    className="w-full px-2.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
                    className="w-full px-2.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Commute Isochrone Widget (Sprint 09) */}
              <div className="pt-2 border-t border-stone-100">
                <CommuteFilterWidget isCompact />
              </div>

              {/* Open House & Events Quick Toggle (Sprint 09) */}
              <div className="pt-2 border-t border-stone-100">
                <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 hover:bg-purple-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-purple-600 animate-pulse" />
                    <div>
                      <span className="text-xs font-bold text-purple-950 block">Vetëm me Open House</span>
                      <span className="text-[10px] text-purple-700">Vizita të hapura fizike ose live</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={!!filters.hasOpenHouse}
                    onChange={(e) => setFilters(prev => ({ ...prev, hasOpenHouse: e.target.checked || undefined }))}
                    className="w-4 h-4 text-purple-600 rounded-md focus:ring-purple-500 accent-purple-600"
                  />
                </label>
              </div>

              {/* Bedrooms (Relevant if residential) */}
              {(!filters.category || filters.category === 'residential') && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    {t.common.bedrooms}
                  </label>
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    {['any', 1, 2, 3, 4].map(num => (
                      <button
                        key={String(num)}
                        type="button"
                        onClick={() => setFilters(prev => ({ ...prev, bedrooms: num as any }))}
                        className={`py-1.5 rounded-md border text-center font-medium cursor-pointer ${
                          filters.bedrooms === num 
                            ? 'bg-stone-900 text-white border-stone-900' 
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {num === 'any' ? 'Çdo' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Close Button */}
              {mobileFilterOpen && (
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-stone-900 text-white py-2.5 rounded-lg text-sm font-semibold lg:hidden cursor-pointer"
                >
                  Apliko Filtrat ({filteredListings.length})
                </button>
              )}

            </div>
          </aside>

          {/* MAIN RESULTS AREA */}
          <main className="lg:col-span-3">
            
            {viewMode === 'map' ? (
              /* Interactive Map View with Property Markers & Sidebar preview */
              <div className="space-y-4">
                <InteractivePropertyMap
                  listings={filteredListings}
                  onSelectListing={(listing) => {
                    setActiveListing(listing);
                    setActiveView('detail');
                  }}
                />
              </div>
            ) : (
              /* Grid View */
              <div>
                {filteredListings.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400 mb-4">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mb-1">
                      {t.common.noResults}
                    </h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                      {t.common.noResultsSub}
                    </p>
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-stone-800 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {t.common.reset}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredListings.map(listing => (
                      <PropertyCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                )}
              </div>
            )}

          </main>

        </div>

        {/* Save Search Modal (Sprint 3) */}
        <SaveSearchModal
          isOpen={saveSearchModalOpen}
          onClose={() => setSaveSearchModalOpen(false)}
          currentFilters={filters}
          resultsCount={filteredListings.length}
        />

      </div>
    </div>
  );
};
