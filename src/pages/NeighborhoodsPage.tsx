import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NeighborhoodGuide } from '../types';
import { 
  MapPin, Compass, Sparkles, TrendingUp, ShieldCheck, 
  Trees, GraduationCap, Footprints, Bus, Coffee, 
  ArrowRight, Search, Building2, CheckCircle2, ChevronRight, Euro,
  Award, School, HeartHandshake, ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ModalShell } from '../components/ui/ModalShell';

export const NeighborhoodsPage: React.FC = () => {
  const { neighborhoodGuides, setActiveView, setFilters, convertPrice } = useApp();

  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGuide, setSelectedGuide] = useState<NeighborhoodGuide | null>(null);

  const cities = ['all', 'Prishtinë', 'Tiranë', 'Vlorë', 'Durrës', 'Prizren'];

  const filteredGuides = neighborhoodGuides.filter(guide => {
    const matchesCity = selectedCity === 'all' || guide.city === selectedCity;
    const matchesQuery = searchQuery === '' || 
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesQuery;
  });

  const handleExploreListings = (guide: NeighborhoodGuide) => {
    setFilters(prev => ({
      ...prev,
      city: guide.city,
      country: guide.country
    }));
    setActiveView('search');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24">
      
      {/* Header Banner - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
              <Compass className="w-4 h-4 text-[#B89758]" />
              <span>Guida e Lagjeve & Zonave Rezidenciale</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white mb-4 leading-tight">
              Eksploroni Lagjet më të Kërkuara në <span className="text-[#DFBE89]">Kosovë & Shqipëri</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              Zbuloni çmimet mesatare për m², infrastrukturën shkollore, hapësirat e gjelbra, sigurinë dhe projektet e ardhshme zhvillimore përpara se të vendosni të blini ose merrni me qira.
            </p>

            {/* City Filters & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 bg-[#163324]/80 backdrop-blur-md p-2 rounded-2xl border border-[#2B543D]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#B89758] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kërkoni lagje (p.sh. Dragodan, Ish-Blloku, Lungomare, Arbëri)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#10241A]/70 border border-[#2B543D] text-white placeholder-stone-400 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B89758]"
                />
              </div>

              <div className="inline-flex p-1 bg-[#10241A]/60 rounded-xl border border-[#2B543D] shrink-0 overflow-x-auto">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCity === city
                        ? 'bg-[#B89758] text-[#10241A] font-extrabold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-[#1E4731]'
                    }`}
                  >
                    {city === 'all' ? 'Të Gjitha Qytetet' : city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Neighborhood Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl border border-[#ECE7DE] overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#DFBE89] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={guide.coverImage}
                    alt={guide.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#10241A]/90 backdrop-blur-md text-[#DFBE89] border border-[#2B543D] text-xs font-bold font-serif">
                      {guide.city}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#10241A] text-[11px] font-bold">
                      {guide.country === 'Kosovo' ? 'Kosovë 🇽🇰' : 'Shqipëri 🇦🇱'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold font-serif text-white drop-shadow-sm">
                      {guide.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {guide.descriptionSq}
                  </p>

                  {/* Price Statistics */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] mb-4">
                    <div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Çmimi / m²</div>
                      <div className="text-xs sm:text-sm font-extrabold text-[#10241A] truncate">
                        {convertPrice(guide.priceRangePerSqm.min).formatted} - {convertPrice(guide.priceRangePerSqm.max).formatted}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Qiraja Mesatare</div>
                      <div className="text-xs sm:text-sm font-extrabold text-[#10241A]">
                        {convertPrice(guide.avgRentMonthly).formatted}/muaj
                      </div>
                    </div>
                  </div>

                  {/* Liveability Score Indicators */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-500 flex items-center gap-1.5">
                        <Footprints className="w-3.5 h-3.5 text-[#B89758]" />
                        Ecje në Këmbë (Walk Score):
                      </span>
                      <strong className="text-[#10241A] font-bold">{guide.ratings.walkability} / 100</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-500 flex items-center gap-1.5">
                        <Trees className="w-3.5 h-3.5 text-[#0E6C38]" />
                        Hapësira të Gjelbra:
                      </span>
                      <strong className="text-[#10241A] font-bold">{guide.ratings.greenSpaces} / 100</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-500 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-sky-700" />
                        Shkolla & Çerdhe:
                      </span>
                      <strong className="text-[#10241A] font-bold">{guide.ratings.schoolsAndDaycare} / 100</strong>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#ECE7DE]">
                    {guide.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 sm:p-6 pt-0 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => setSelectedGuide(guide)}
                >
                  Shiko Guidën
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => handleExploreListings(guide)}
                  icon={<ChevronRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  Pronat
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detailed Neighborhood Guide Modal */}
      {selectedGuide && (
        <ModalShell
          isOpen={!!selectedGuide}
          onClose={() => setSelectedGuide(null)}
          title={`${selectedGuide.name}, ${selectedGuide.city}`}
          subtitle="Profili i Plotë i Lagjes dhe Jetesa"
          icon={<Compass className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="lg"
          headerTheme="dark"
        >
          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden border border-[#ECE7DE]">
              <img
                src={selectedGuide.coverImage}
                alt={selectedGuide.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#B89758] text-[#10241A] font-bold text-xs">
                    {selectedGuide.city}
                  </span>
                  <span className="text-xs text-stone-300 font-medium">
                    {selectedGuide.country === 'Kosovo' ? 'Republika e Kosovës' : 'Republika e Shqipërisë'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold font-serif">{selectedGuide.name}</h2>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#10241A] uppercase tracking-wider mb-2">
                Përshkrimi dhe Karakteristikat e Zonës
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {selectedGuide.descriptionSq}
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] text-center">
                <div className="text-[11px] text-stone-500 font-medium">Çmimi / m²</div>
                <div className="text-xs sm:text-sm font-extrabold text-[#10241A] mt-0.5">
                  {convertPrice(selectedGuide.priceRangePerSqm.min).formatted} - {convertPrice(selectedGuide.priceRangePerSqm.max).formatted}
                </div>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] text-center">
                <div className="text-[11px] text-stone-500 font-medium">Qiraja Mesatare</div>
                <div className="text-xs sm:text-sm font-extrabold text-[#10241A] mt-0.5">
                  {convertPrice(selectedGuide.avgRentMonthly).formatted}/muaj
                </div>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] text-center">
                <div className="text-[11px] text-stone-500 font-medium">Ecje në Këmbë</div>
                <div className="text-base font-extrabold text-[#10241A] mt-0.5">
                  {selectedGuide.ratings.walkability}/100
                </div>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] text-center">
                <div className="text-[11px] text-stone-500 font-medium">Gjelbërimi</div>
                <div className="text-base font-extrabold text-[#0E6C38] mt-0.5">
                  {selectedGuide.ratings.greenSpaces}/100
                </div>
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-3 pt-2 border-t border-[#ECE7DE]">
              <h4 className="text-xs font-bold text-[#10241A] uppercase tracking-wider">
                Pse Zgjidhet kjo Lagje:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                <div className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE]">
                  <CheckCircle2 className="w-4 h-4 text-[#0E6C38] shrink-0" />
                  <span>Qasje e shpejtë në arteriet kryesore të transportit</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE]">
                  <CheckCircle2 className="w-4 h-4 text-[#0E6C38] shrink-0" />
                  <span>Prani e lartë e shërbimeve mjekësore, bankave dhe marketeve</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE]">
                  <CheckCircle2 className="w-4 h-4 text-[#0E6C38] shrink-0" />
                  <span>Likuiditet i lartë dhe kërkesë e vazhdueshme me qira</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE]">
                  <CheckCircle2 className="w-4 h-4 text-[#0E6C38] shrink-0" />
                  <span>Siguri e lartë dhe komunitet i qetë familjar</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#ECE7DE] flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => setSelectedGuide(null)}
              >
                Mbyll
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleExploreListings(selectedGuide);
                  setSelectedGuide(null);
                }}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Shiko Pronat e Lira në {selectedGuide.name}
              </Button>
            </div>
          </div>
        </ModalShell>
      )}

    </div>
  );
};
