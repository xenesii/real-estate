import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  Building2, ShieldCheck, Star, MapPin, Phone, Mail, 
  Globe, Users, Award, ExternalLink, ArrowRight, CheckCircle2,
  Search, Briefcase, Calendar, Clock, MessageSquare, Sparkles, X,
  Filter, Check
} from 'lucide-react';
import { Agency, Agent } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ModalShell } from '../components/ui/ModalShell';

export const AgenciesPage: React.FC = () => {
  const { agencies, agents, listings, setActiveListing, setActiveView, convertPrice } = useApp();
  const { locale } = useLocale();

  const [activeTab, setActiveTab] = useState<'agencies' | 'agents'>('agencies');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Consultation booking state
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationAgency, setConsultationAgency] = useState<Agency | null>(null);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '11:00',
    topic: 'investim',
    notes: ''
  });

  // Filter agencies
  const filteredAgencies = agencies.filter(agency => {
    if (selectedCity !== 'all' && agency.city !== selectedCity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = agency.name.toLowerCase().includes(q);
      const matchCity = agency.city.toLowerCase().includes(q);
      const matchSpec = agency.specialties.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchSpec) return false;
    }
    return true;
  });

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = agent.name.toLowerCase().includes(q);
      const matchAgency = agent.agencyName.toLowerCase().includes(q);
      const matchBio = agent.bioSq.toLowerCase().includes(q);
      const matchLang = agent.languages.some(l => l.toLowerCase().includes(q));
      if (!matchName && !matchAgency && !matchBio && !matchLang) return false;
    }
    return true;
  });

  const cities = ['all', 'Prishtinë', 'Tiranë', 'Prizren', 'Vlorë'];

  const handleOpenConsultation = (agency: Agency) => {
    setConsultationAgency(agency);
    setConsultationSuccess(false);
    setIsConsultationOpen(true);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSuccess(true);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#FBFBFA]">
      
      {/* Header Banner - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-12 pb-18 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#B89758]" />
              <span>Agjenci & Brokerë të Licencuar nga Oda dhe Ministria</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif text-white mb-3 leading-tight">
              Agjencitë & Agjentët e <span className="text-[#DFBE89]">Patundshmërive</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Zbuloni profesionistët më të besueshëm të pronave në Kosovë dhe Shqipëri. Partnerë të certifikuar për blerje, qira, investime dhe asistencë të plotë kadastrale e juridike.
            </p>
          </div>

          {/* Search & Mode Selector Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-3 bg-[#163324]/80 backdrop-blur-md p-2.5 rounded-2xl border border-[#2B543D]/60 shadow-lg">
            
            {/* Tab switch */}
            <div className="flex bg-[#10241A] p-1 rounded-xl border border-[#2B543D] shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('agencies')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'agencies'
                    ? 'bg-[#DFBE89] text-[#10241A] shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Agjencitë ({agencies.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('agents')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'agents'
                    ? 'bg-[#DFBE89] text-[#10241A] shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Agjentët ({agents.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-[#B89758] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'agencies' ? "Kërko agjenci me emër, qytet ose specializim..." : "Kërko agjent me emër, agjenci apo gjuhë..."}
                className="w-full pl-10 pr-4 py-2 bg-[#10241A]/70 border border-[#2B543D] rounded-xl text-white placeholder-stone-400 text-xs focus:outline-none focus:ring-1 focus:ring-[#B89758]"
              />
            </div>

            {/* City Buttons for Agencies Tab */}
            {activeTab === 'agencies' && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCity === city
                        ? 'bg-[#B89758] text-[#10241A] font-extrabold shadow-sm'
                        : 'bg-[#10241A]/50 text-stone-300 hover:bg-[#1E4731] hover:text-white border border-transparent hover:border-[#2B543D]'
                    }`}
                  >
                    {city === 'all' ? 'Të Gjitha' : city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-8">
        
        {/* Quick Highlights Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE7DE] shadow-2xs flex items-center gap-3.5">
            <div className="p-3 bg-[#FAF5EC] text-[#B89758] rounded-xl border border-[#E9DCBE]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-[#10241A]">{agencies.length}</div>
              <div className="text-[11px] text-stone-500 font-medium">Agjenci Partnere</div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE7DE] shadow-2xs flex items-center gap-3.5">
            <div className="p-3 bg-[#FAF5EC] text-[#B89758] rounded-xl border border-[#E9DCBE]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-[#10241A]">{agents.length * 8}+</div>
              <div className="text-[11px] text-stone-500 font-medium">Agjentë Aktivë</div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE7DE] shadow-2xs flex items-center gap-3.5">
            <div className="p-3 bg-[#FAF5EC] text-[#B89758] rounded-xl border border-[#E9DCBE]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-[#10241A]">100%</div>
              <div className="text-[11px] text-stone-500 font-medium">Të Licencuar</div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE7DE] shadow-2xs flex items-center gap-3.5">
            <div className="p-3 bg-[#FAF5EC] text-[#B89758] rounded-xl border border-[#E9DCBE]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-[#10241A]">850+</div>
              <div className="text-[11px] text-stone-500 font-medium">Transaksione të Mbyllura</div>
            </div>
          </div>
        </div>

        {/* Selected Agency Detail Drawer View */}
        {selectedAgency && (
          <div className="bg-white rounded-3xl border border-[#B89758]/40 shadow-xl p-6 sm:p-8 animate-in fade-in duration-200 relative">
            <button
              onClick={() => setSelectedAgency(null)}
              className="absolute top-6 right-6 px-3.5 py-1.5 bg-[#FAF8F5] hover:bg-[#ECE7DE] text-[#142C20] rounded-xl text-xs font-bold border border-[#ECE7DE] cursor-pointer transition-colors"
            >
              Mbyll Profilin ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={selectedAgency.logo}
                alt={selectedAgency.name}
                className="w-24 h-24 rounded-2xl object-cover border border-[#ECE7DE] shadow-xs"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#10241A]">{selectedAgency.name}</h2>
                  <Badge variant="verified">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DFBE89]" />
                    {selectedAgency.licenseNumber}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                    {selectedAgency.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#B89758] text-[#B89758]" />
                    <strong className="text-stone-900">{selectedAgency.rating}</strong> ({selectedAgency.reviewsCount} vlerësime)
                  </span>
                  <span>Themeluar: <strong>{selectedAgency.foundedYear}</strong></span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl mb-4">
                  {selectedAgency.descriptionSq}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedAgency.specialties.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-[#FAF8F5] text-[#142C20] border border-[#ECE7DE] rounded-lg text-xs font-semibold">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${selectedAgency.phone}`}>
                    <Button variant="primary" size="sm" icon={<Phone className="w-3.5 h-3.5 text-[#DFBE89]" />}>
                      {selectedAgency.phone}
                    </Button>
                  </a>
                  <a href={`mailto:${selectedAgency.email}`}>
                    <Button variant="secondary" size="sm" icon={<Mail className="w-3.5 h-3.5" />}>
                      Dërgo Email
                    </Button>
                  </a>
                  {selectedAgency.website && (
                    <a href={selectedAgency.website} target="_blank" rel="noreferrer">
                      <Button variant="secondary" size="sm" icon={<Globe className="w-3.5 h-3.5" />}>
                        Uebsajti Zyrtar
                        <ExternalLink className="w-3 h-3 ml-1 text-stone-400" />
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="gold"
                    size="sm"
                    icon={<Calendar className="w-3.5 h-3.5 text-[#10241A]" />}
                    onClick={() => handleOpenConsultation(selectedAgency)}
                  >
                    Rezervo Konsultë Falas
                  </Button>
                </div>
              </div>
            </div>

            {/* Agency Team Members */}
            <div className="mt-8 pt-6 border-t border-[#ECE7DE]">
              <h3 className="text-sm font-bold text-[#10241A] mb-4 flex items-center gap-2 font-serif">
                <Users className="w-4 h-4 text-[#B89758]" />
                Agjentët e Licencuar në {selectedAgency.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {agents
                  .filter(a => a.agencyId === selectedAgency.id)
                  .map(agent => (
                    <div key={agent.id} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] flex gap-3.5 items-center">
                      <img
                        src={agent.photo}
                        alt={agent.name}
                        className="w-14 h-14 rounded-full object-cover border border-[#DFBE89]"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#10241A] truncate">{agent.name}</div>
                        <div className="text-[11px] text-stone-500 truncate mb-1">{agent.titleSq}</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-600 font-medium">
                          <Star className="w-3 h-3 fill-[#B89758] text-[#B89758]" />
                          <span className="font-bold text-stone-900">{agent.rating}</span>
                          <span className="text-stone-400">• {agent.dealsClosed} shitje</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Properties from this Agency */}
            <div className="mt-8 pt-6 border-t border-[#ECE7DE]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#10241A] font-serif">
                  Pronat Aktive nga {selectedAgency.name}
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  {listings.filter(l => l.location.city === selectedAgency.city).length} prona të disponueshme
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings
                  .filter(l => l.location.city === selectedAgency.city)
                  .slice(0, 3)
                  .map(listing => (
                    <PropertyCard
                      key={listing.id}
                      listing={listing}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: AGENCIES DIRECTORY */}
        {activeTab === 'agencies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAgencies.map(agency => (
              <div
                key={agency.id}
                className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between hover:border-[#DFBE89] group"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={agency.logo}
                      alt={agency.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#ECE7DE]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold font-serif text-[#10241A] group-hover:text-[#B89758] transition-colors truncate">
                          {agency.name}
                        </h3>
                        {agency.isVerified && (
                          <span title="Agjenci e Verifikuar">
                            <ShieldCheck className="w-4 h-4 text-[#B89758] shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                        <span>{agency.city}, {agency.country === 'Kosovo' ? 'Kosovë' : 'Shqipëri'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-1.5">
                        <Star className="w-3.5 h-3.5 fill-[#B89758] text-[#B89758]" />
                        <span className="font-bold text-stone-900">{agency.rating}</span>
                        <span className="text-stone-400">({agency.reviewsCount} vlerësime)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                    {agency.descriptionSq}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agency.specialties.slice(0, 3).map(spec => (
                      <span
                        key={spec}
                        className="px-2.5 py-0.5 bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] rounded-md text-[11px] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#FAF8F5] rounded-xl mb-4 text-center border border-[#ECE7DE]">
                    <div>
                      <div className="text-xs font-bold text-[#10241A] font-serif">{agency.activeListingsCount}</div>
                      <div className="text-[10px] text-stone-500 font-medium">Prona Aktive</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#10241A] font-serif">{agency.soldCount}+</div>
                      <div className="text-[10px] text-stone-500 font-medium">Të Shitura</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#10241A] font-serif">{agency.foundedYear}</div>
                      <div className="text-[10px] text-stone-500 font-medium">Themeluar</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#ECE7DE] gap-2">
                  <a
                    href={`tel:${agency.phone}`}
                    className="p-2.5 text-stone-700 hover:text-stone-900 bg-[#FAF8F5] hover:bg-[#FAF5EC] rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-[#ECE7DE]"
                    title="Telefono"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B89758]" />
                    <span className="hidden sm:inline">{agency.phone}</span>
                  </a>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedAgency(agency)}
                    icon={<ArrowRight className="w-3.5 h-3.5 text-[#DFBE89]" />}
                    iconPosition="right"
                  >
                    Shiko Profilin & Pronat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: AGENTS DIRECTORY */}
        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map(agent => (
              <div
                key={agent.id}
                className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between hover:border-[#DFBE89] group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#DFBE89] shadow-2xs"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-base text-[#10241A] font-serif group-hover:text-[#B89758] transition-colors truncate">
                        {agent.name}
                      </h4>
                      <p className="text-xs text-[#8B6E39] font-medium truncate">{agent.titleSq}</p>
                      <span className="text-[11px] text-stone-500 block truncate font-medium">{agent.agencyName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] mb-3 text-xs">
                    <div className="flex items-center gap-1 text-[#8B6E39] font-bold font-serif">
                      <Star className="w-3.5 h-3.5 fill-[#B89758]" />
                      <span>{agent.rating} / 5.0</span>
                    </div>
                    <span className="text-stone-500 font-medium">{agent.dealsClosed} Shitje të Mbyllura</span>
                  </div>

                  <p className="text-xs text-stone-600 mb-3.5 leading-relaxed line-clamp-3">
                    {agent.bioSq}
                  </p>

                  <div className="text-[11px] text-stone-500 mb-4 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#ECE7DE]">
                    <strong className="text-stone-700">Gjuhët e komunikimit:</strong> {agent.languages.join(', ')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#ECE7DE]">
                  <a href={`tel:${agent.phone}`}>
                    <Button variant="primary" size="sm" fullWidth icon={<Phone className="w-3.5 h-3.5 text-[#DFBE89]" />}>
                      Telefono
                    </Button>
                  </a>
                  <a href={`mailto:${agent.email}`}>
                    <Button variant="secondary" size="sm" fullWidth icon={<Mail className="w-3.5 h-3.5" />}>
                      Email
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Booking Consultation Modal */}
      {consultationAgency && (
        <ModalShell
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
          title="Rezervo Konsultim me Agjencinë"
          subtitle={`${consultationAgency.name} • ${consultationAgency.city}`}
          icon={<Briefcase className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="md"
          headerTheme="dark"
        >
          {consultationSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#FAF5EC] text-[#B89758] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E9DCBE]">
                <CheckCircle2 className="w-8 h-8 text-[#B89758]" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#10241A] mb-1">
                Kërkesa për Konsultim u Regjistrua!
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                Ekipi i {consultationAgency.name} do t&apos;ju kontaktojë brenda ditës së punës për të konfirmuar takimin këshillues.
              </p>
              <Button
                variant="primary"
                onClick={() => setIsConsultationOpen(false)}
                fullWidth
              >
                Në Rregull
              </Button>
            </div>
          ) : (
            <form onSubmit={handleConsultationSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tema e Konsultimit:
                </label>
                <select
                  value={consultationForm.topic}
                  onChange={e => setConsultationForm({ ...consultationForm, topic: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-medium text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                >
                  <option value="investim">Këshillim për Investim & Rendiment Qiraje</option>
                  <option value="blerje">Blerje e Banesës / Shtëpisë së Parë</option>
                  <option value="shitje">Shitje apo Qiradhënie e Pronës Sime</option>
                  <option value="kadaster">Asistencë Juridike & Verifikim Kadastral</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Data e Preferuar:
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={consultationForm.date}
                    onChange={e => setConsultationForm({ ...consultationForm, date: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-medium text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Orari:
                  </label>
                  <select
                    value={consultationForm.timeSlot}
                    onChange={e => setConsultationForm({ ...consultationForm, timeSlot: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-medium text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  >
                    <option value="09:30">09:30 - Mëngjes</option>
                    <option value="11:00">11:00 - Paradite</option>
                    <option value="14:00">14:00 - Pasdite</option>
                    <option value="16:30">16:30 - Pasdite e vonë</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#ECE7DE]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Emri dhe Mbiemri"
                    value={consultationForm.name}
                    onChange={e => setConsultationForm({ ...consultationForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Numri i Telefonit (WhatsApp)"
                    value={consultationForm.phone}
                    onChange={e => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder="Email Adresa"
                  value={consultationForm.email}
                  onChange={e => setConsultationForm({ ...consultationForm, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                />

                <textarea
                  rows={2}
                  placeholder="Shënime apo kërkesa specifike (opsionale)..."
                  value={consultationForm.notes}
                  onChange={e => setConsultationForm({ ...consultationForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  fullWidth
                  icon={<Calendar className="w-4 h-4 text-[#10241A]" />}
                >
                  Konfirmo Rezervimin e Konsultës
                </Button>
                <p className="text-[11px] text-stone-400 text-center mt-2">
                  Konsultimi fillestar është pa pagesë dhe pa asnjë obligim.
                </p>
              </div>
            </form>
          )}
        </ModalShell>
      )}

    </div>
  );
};
