import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { PROPERTY_CATEGORIES_CONFIG, PROPERTY_TYPES_CONFIG } from '../data/constants';
import { PropertyCategory, PropertyTypeSlug } from '../types';
import { 
  Building, Home, Castle, Box, Sparkles, Layers, Briefcase, 
  Store, Boxes, Building2, MapPin, Trees, Factory, Warehouse, 
  HelpCircle, ChevronDown, Check, X
} from 'lucide-react';

interface PropertyTypeSelectorProps {
  selectedCategory?: PropertyCategory;
  selectedType?: PropertyTypeSlug | string;
  onSelect: (selection: { category?: PropertyCategory; propertyType?: string }) => void;
  className?: string;
  compact?: boolean;
}

// Map icon string to Lucide icon component
export const getPropertyTypeIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'Building': return <Building className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Castle': return <Castle className={className} />;
    case 'Box': return <Box className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Store': return <Store className={className} />;
    case 'Boxes': return <Boxes className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    case 'Trees': return <Trees className={className} />;
    case 'Factory': return <Factory className={className} />;
    case 'Warehouse': return <Warehouse className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

export const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  selectedCategory,
  selectedType,
  onSelect,
  className = '',
  compact = false
}) => {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PropertyCategory | 'all'>(
    selectedCategory || 'all'
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute display label
  const selectedConfig = PROPERTY_TYPES_CONFIG.find(t => t.slug === selectedType);
  const categoryConfig = PROPERTY_CATEGORIES_CONFIG.find(c => c.slug === selectedCategory);

  const displayLabel = selectedConfig 
    ? (locale === 'sq' ? selectedConfig.nameSq : selectedConfig.nameEn)
    : categoryConfig
    ? (locale === 'sq' ? categoryConfig.nameSq : categoryConfig.nameEn)
    : (locale === 'sq' ? 'Çdo lloj prone' : 'Any Property Type');

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect({ category: undefined, propertyType: undefined });
  };

  const handleSelectType = (slug: PropertyTypeSlug, category: PropertyCategory) => {
    onSelect({ propertyType: slug, category });
    setIsOpen(false);
  };

  const handleSelectCategoryOnly = (cat: PropertyCategory) => {
    onSelect({ category: cat, propertyType: undefined });
    setIsOpen(false);
  };

  const filteredTypes = activeTab === 'all' 
    ? PROPERTY_TYPES_CONFIG 
    : PROPERTY_TYPES_CONFIG.filter(t => t.category === activeTab);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Selector Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 border bg-white rounded-xl transition-all cursor-pointer ${
          isOpen 
            ? 'border-[#142C20] ring-2 ring-[#142C20]/10 shadow-sm' 
            : 'border-[#ECE7DE] hover:border-[#DFBE89]'
        } ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'}`}
      >
        <div className="flex items-center gap-2.5 truncate flex-1">
          {selectedConfig ? (
            getPropertyTypeIcon(selectedConfig.iconName, `${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-[#B89758] shrink-0`)
          ) : (
            <Building className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-[#B89758] shrink-0`} />
          )}
          <span className={`truncate ${(selectedType || selectedCategory) ? 'font-bold text-[#10241A]' : 'text-stone-400'}`}>
            {displayLabel}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {(selectedType || selectedCategory) && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-[#FAF8F5] rounded-md text-stone-400 hover:text-stone-700"
              title="Pastro llojin e pronës"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
        </div>
      </div>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#ECE7DE] shadow-xl z-50 p-4 max-h-[460px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 min-w-[280px]">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-[#ECE7DE] mb-3 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#142C20] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-stone-600 hover:bg-[#F2ECE1] border border-[#ECE7DE]'
              }`}
            >
              {locale === 'sq' ? 'Të Gjitha' : 'All'}
            </button>
            {PROPERTY_CATEGORIES_CONFIG.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.slug)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === cat.slug
                    ? 'bg-[#142C20] text-white shadow-2xs'
                    : 'bg-[#FAF8F5] text-stone-600 hover:bg-[#F2ECE1] border border-[#ECE7DE]'
                }`}
              >
                <span>{locale === 'sq' ? cat.nameSq : cat.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Quick Select Category Option */}
          {activeTab !== 'all' && (
            <div className="mb-2 pb-2 border-b border-[#ECE7DE] flex items-center justify-between">
              <span className="text-xs text-stone-500">
                {locale === 'sq' ? 'Kërko çdo lloj në këtë kategori:' : 'Search all in this category:'}
              </span>
              <button
                type="button"
                onClick={() => handleSelectCategoryOnly(activeTab)}
                className="text-xs font-bold text-[#8B6E39] hover:text-[#142C20] underline transition-colors cursor-pointer"
              >
                {locale === 'sq' ? 'Të gjitha' : 'All types'}
              </button>
            </div>
          )}

          {/* Types Grid */}
          <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {filteredTypes.map(typeConfig => {
              const isSelected = selectedType === typeConfig.slug;
              return (
                <button
                  key={typeConfig.slug}
                  type="button"
                  onClick={() => handleSelectType(typeConfig.slug, typeConfig.category)}
                  className={`p-2.5 text-left rounded-xl text-xs transition-colors flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF5EC] text-[#142C20] font-bold border-[#DFBE89] shadow-2xs'
                      : 'border-[#F0EDE6] bg-white text-stone-700 hover:bg-[#FAF8F5] hover:border-[#ECE7DE]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getPropertyTypeIcon(typeConfig.iconName, `w-4 h-4 ${isSelected ? 'text-[#8B6E39]' : 'text-stone-400'} shrink-0`)}
                    <span className="truncate">{locale === 'sq' ? typeConfig.nameSq : typeConfig.nameEn}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#8B6E39] shrink-0" />}
                </button>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};
