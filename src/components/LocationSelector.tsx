import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { LOCATIONS_DATA } from '../data/constants';
import { Location } from '../types';
import { MapPin, Search, X, Check, Globe } from 'lucide-react';

interface LocationSelectorProps {
  selectedCity?: string;
  selectedNeighborhood?: string;
  selectedCountry?: string;
  onSelect: (location: { country?: string; city?: string; neighborhood?: string }) => void;
  className?: string;
  compact?: boolean;
}

// Normalize strings for accent-insensitive search
const normalizeStr = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ë/g, 'e')
    .replace(/ç/g, 'c');
};

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedCity,
  selectedNeighborhood,
  selectedCountry,
  onSelect,
  className = '',
  compact = false
}) => {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState<'all' | 'Kosovo' | 'Albania'>(
    (selectedCountry as 'Kosovo' | 'Albania') || 'all'
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter locations
  const filteredLocations = useMemo(() => {
    const qNorm = normalizeStr(query.trim());
    return LOCATIONS_DATA.filter(loc => {
      if (countryFilter !== 'all' && loc.country !== countryFilter) return false;
      if (!qNorm) return true;
      const cityNorm = normalizeStr(loc.city);
      const neighNorm = normalizeStr(loc.neighborhood);
      const munNorm = normalizeStr(loc.municipality);
      const regNorm = loc.region ? normalizeStr(loc.region) : '';
      return cityNorm.includes(qNorm) || neighNorm.includes(qNorm) || munNorm.includes(qNorm) || regNorm.includes(qNorm);
    });
  }, [query, countryFilter]);

  // Group locations by city
  const groupedByCity = useMemo(() => {
    const groups: { [city: string]: { country: string; locations: Location[] } } = {};
    filteredLocations.forEach(loc => {
      if (!groups[loc.city]) {
        groups[loc.city] = { country: loc.country, locations: [] };
      }
      groups[loc.city].locations.push(loc);
    });
    return groups;
  }, [filteredLocations]);

  // Display label for current selection
  const displayValue = useMemo(() => {
    if (selectedNeighborhood && selectedCity) {
      return `${selectedCity} • ${selectedNeighborhood}`;
    }
    if (selectedCity) {
      return selectedCity;
    }
    if (selectedCountry) {
      return selectedCountry === 'Kosovo' ? 'Kosovë' : 'Shqipëri';
    }
    return '';
  }, [selectedCity, selectedNeighborhood, selectedCountry]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect({ country: undefined, city: undefined, neighborhood: undefined });
    setQuery('');
  };

  const handleSelectCity = (city: string, country: string) => {
    onSelect({ city, country, neighborhood: undefined });
    setIsOpen(false);
  };

  const handleSelectNeighborhood = (city: string, neighborhood: string, country: string) => {
    onSelect({ city, neighborhood, country });
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button / Input Bar */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`w-full flex items-center justify-between gap-2 border bg-white rounded-xl transition-all cursor-pointer ${
          isOpen 
            ? 'border-[#142C20] ring-2 ring-[#142C20]/10 shadow-sm' 
            : 'border-[#ECE7DE] hover:border-[#DFBE89]'
        } ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'}`}
      >
        <div className="flex items-center gap-2.5 truncate flex-1">
          <MapPin className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-[#B89758] shrink-0`} />
          <span className={`truncate ${displayValue ? 'font-bold text-[#10241A]' : 'text-stone-400'}`}>
            {displayValue || (locale === 'sq' ? 'Zgjidh Qytetin ose Lagjen...' : 'Select City or Neighborhood...')}
          </span>
        </div>

        {displayValue && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-[#FAF8F5] rounded-md text-stone-400 hover:text-stone-700"
            title="Pastro lokacionin"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#ECE7DE] shadow-xl z-50 p-4 max-h-[460px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={locale === 'sq' ? 'Kërko qytet, lagje (p.sh. Blloku, Rruga C, Veternik)...' : 'Search city, area (e.g. Blloku, Rruga C)...'}
              className="w-full pl-9 pr-8 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-medium text-[#10241A] focus:outline-none focus:border-[#142C20] focus:ring-1 focus:ring-[#142C20] focus:bg-white transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Country Tabs */}
          <div className="flex items-center gap-1.5 pb-3 border-b border-[#ECE7DE] mb-3 text-xs">
            <button
              type="button"
              onClick={() => setCountryFilter('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                countryFilter === 'all'
                  ? 'bg-[#142C20] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-stone-600 hover:bg-[#F2ECE1] border border-[#ECE7DE]'
              }`}
            >
              {locale === 'sq' ? 'Të Gjitha' : 'All Regions'}
            </button>
            <button
              type="button"
              onClick={() => setCountryFilter('Kosovo')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                countryFilter === 'Kosovo'
                  ? 'bg-[#142C20] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-stone-600 hover:bg-[#F2ECE1] border border-[#ECE7DE]'
              }`}
            >
              <span>🇽🇰 Kosovë</span>
            </button>
            <button
              type="button"
              onClick={() => setCountryFilter('Albania')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                countryFilter === 'Albania'
                  ? 'bg-[#142C20] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-stone-600 hover:bg-[#F2ECE1] border border-[#ECE7DE]'
              }`}
            >
              <span>🇦🇱 Shqipëri</span>
            </button>
          </div>

          {/* Locations Results List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {Object.keys(groupedByCity).length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-400">
                {locale === 'sq' ? 'Nuk u gjet asnjë lokacion për këtë kërkim' : 'No locations found'}
              </div>
            ) : (
              Object.entries(groupedByCity).map(([city, data]) => {
                const isCitySelected = selectedCity === city && !selectedNeighborhood;
                return (
                  <div key={city} className="border-b border-[#F5F2EC] pb-2 last:border-b-0">
                    {/* City Header Button */}
                    <button
                      type="button"
                      onClick={() => handleSelectCity(city, data.country)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs font-bold transition-colors cursor-pointer ${
                        isCitySelected
                          ? 'bg-[#FAF5EC] text-[#142C20] font-extrabold border border-[#E9DCBE]'
                          : 'text-[#10241A] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{data.country === 'Kosovo' ? '🇽🇰' : '🇦🇱'}</span>
                        <span className="font-serif">{city}</span>
                        <span className="text-[10px] font-normal text-stone-400">
                          ({data.locations.length} {locale === 'sq' ? 'zona' : 'areas'})
                        </span>
                      </div>
                      {isCitySelected && <Check className="w-3.5 h-3.5 text-[#B89758]" />}
                    </button>

                    {/* Neighborhoods Tags */}
                    <div className="flex flex-wrap gap-1 mt-1 pl-6">
                      {data.locations.map(loc => {
                        const isNeighSelected = selectedCity === city && selectedNeighborhood === loc.neighborhood;
                        return (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => handleSelectNeighborhood(city, loc.neighborhood, data.country)}
                            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border ${
                              isNeighSelected
                                ? 'bg-[#142C20] text-white border-[#142C20] font-bold shadow-2xs'
                                : 'bg-[#FAF8F5] text-stone-600 border-[#ECE7DE] hover:bg-[#F2ECE1] hover:text-[#10241A]'
                            }`}
                          >
                            {loc.neighborhood}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}
    </div>
  );
};
