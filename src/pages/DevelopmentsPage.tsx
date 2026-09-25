import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  Building2, MapPin, Calendar, CheckCircle2, ShieldCheck, 
  ArrowRight, Phone, Mail, Sparkles, Filter, Search, 
  Layers, Hammer, Home, Download, X, MessageSquare, Percent
} from 'lucide-react';
import { DevelopmentProject, DevelopmentUnit } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ModalShell } from '../components/ui/ModalShell';

export const DevelopmentsPage: React.FC = () => {
  const { developments, setActiveView, convertPrice, setInvestmentPrefill } = useApp();
  const { locale } = useLocale();

  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] = useState<DevelopmentProject | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<DevelopmentUnit | null>(null);
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryPhone, setInquiryPhone] = useState<string>('');
  const [inquiryEmail, setInquiryEmail] = useState<string>('');
  const [inquiryNotes, setInquiryNotes] = useState<string>('');

  const filteredDevelopments = developments.filter(proj => {
    const matchesCity = selectedCity === 'all' || proj.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || proj.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.developerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string, label: string) => {
    switch (status) {
      case 'ready_to_move':
        return (
          <span className="px-3 py-1 rounded-full bg-[#E8F8EE] text-[#0E6C38] border border-[#C2E8D0] text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{label}</span>
          </span>
        );
      case 'facade_finishing':
      case 'interior_works':
        return (
          <span className="px-3 py-1 rounded-full bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
            <Hammer className="w-3.5 h-3.5" />
            <span>{label}</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-[#10241A]/90 text-[#DFBE89] border border-[#2B543D] text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{label}</span>
          </span>
        );
    }
  };

  const handleOpenModal = (project: DevelopmentProject) => {
    setActiveProjectModal(project);
    setSelectedUnit(project.units[0] || null);
    setInquirySent(false);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24">
      
      {/* Hero Header - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
              <Building2 className="w-4 h-4 text-[#B89758]" />
              <span>Komplekset e Reja Rezidenciale & Off-Plan</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white mb-4 leading-tight">
              Projektet & Ndërtimet më të Reja në <span className="text-[#DFBE89]">Kosovë & Shqipëri</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Bleni drejtpërdrejt nga investitorët e licencuar me plane pagese me këste pa kamatë (0%), leje ndërtimore të verifikuara dhe garanci bankare.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#163324]/80 backdrop-blur-md p-3 rounded-2xl border border-[#2B543D]">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#B89758] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kërko projektin ose ndërtuesin..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#10241A]/70 border border-[#2B543D] rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#B89758]"
              />
            </div>

            {/* City */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#10241A]/70 border border-[#2B543D] rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#B89758]"
              >
                <option value="all">Të gjitha Qytetet</option>
                <option value="Prishtinë">Prishtinë & Rrethinë</option>
                <option value="Tiranë">Tiranë</option>
                <option value="Palasë">Riviera Shqiptare (Palasë/Vlorë)</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#10241A]/70 border border-[#2B543D] rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#B89758]"
              >
                <option value="all">Të gjitha Fazat e Ndërtimit</option>
                <option value="ready_to_move">Gati për Banim (Çelësa në Dorë)</option>
                <option value="facade_finishing">Fazë Përfundimtare / Fasadë</option>
                <option value="structure">Në Ndërtim Strukture</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        <div className="bg-white rounded-2xl border border-[#ECE7DE] p-4 px-6 mb-8 flex items-center justify-between shadow-2xs">
          <h2 className="text-lg font-bold font-serif text-[#10241A]">
            {filteredDevelopments.length} Projekte Rezidenciale të Verifikuara
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            Përditësuar: 2026
          </span>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDevelopments.map(project => (
            <div 
              key={project.id}
              className="bg-white rounded-3xl border border-[#ECE7DE] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#DFBE89] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img 
                    src={project.coverImage} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(project.status, project.statusLabelSq)}
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#10241A]/90 backdrop-blur-xs text-[#DFBE89] text-xs font-bold font-serif border border-[#2B543D]">
                    Dorëzimi: {project.expectedCompletionDate}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="bg-[#10241A]/95 backdrop-blur-xs px-4 py-2 rounded-xl border border-[#2B543D] text-white">
                      <span className="text-[10px] text-stone-300 block uppercase tracking-wider font-semibold">Çmimi nga:</span>
                      <span className="text-base font-extrabold font-serif text-[#DFBE89]">
                        nga {convertPrice(project.startingPricePerSqm).formatted} / m²
                      </span>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-[#10241A] text-xs font-bold border border-[#ECE7DE] shadow-xs">
                      {project.availableUnitsCount} Njësi të Lira
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#B89758] mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.neighborhood}, {project.city}</span>
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-[#10241A]">
                      {project.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Zhvilluesi: <strong className="text-stone-800">{project.developerName}</strong>
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {project.descriptionSq}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {project.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6C38] mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Plans Pill */}
                  <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#10241A]">
                      <Percent className="w-4 h-4 text-[#B89758]" />
                      <span>Financim 0% me këste deri {project.paymentPlans[0]?.installmentsCount || 24} muaj</span>
                    </div>
                    <span className="text-[11px] font-extrabold text-[#0E6C38] uppercase">Pa kamatë</span>
                  </div>

                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#ECE7DE] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setInvestmentPrefill({
                      price: project.totalStartingPrice,
                      city: project.city,
                      title: project.name
                    });
                    setActiveView('investments');
                  }}
                  className="text-xs font-bold text-[#B89758] hover:text-[#10241A] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Llogarit Kthimin (ROI)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenModal(project)}
                  icon={<ArrowRight className="w-3.5 h-3.5 text-[#DFBE89]" />}
                  iconPosition="right"
                >
                  Planimetritë & Çmimet
                </Button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail & Floor Plans Modal */}
      {activeProjectModal && (
        <ModalShell
          isOpen={!!activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
          title={activeProjectModal.name}
          subtitle={`${activeProjectModal.neighborhood}, ${activeProjectModal.city} • Ndërtuesi: ${activeProjectModal.developerName}`}
          icon={<Building2 className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="xl"
          headerTheme="dark"
        >
          <div className="space-y-6">
            
            {/* Photo Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeProjectModal.galleryImages.map((img, idx) => (
                <div key={idx} className="h-44 rounded-2xl overflow-hidden bg-stone-100 border border-[#ECE7DE]">
                  <img 
                    src={img} 
                    alt={`Foto ${idx}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            {/* Units & Floor Plans Selector */}
            <div>
              <h3 className="text-xs font-bold text-[#10241A] uppercase tracking-wider mb-3">
                Tipologjitë e Apartamenteve & Planimetritë:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {activeProjectModal.units.map(unit => (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => setSelectedUnit(unit)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedUnit?.id === unit.id 
                        ? 'border-[#B89758] bg-[#FAF5EC] shadow-2xs' 
                        : 'border-[#ECE7DE] bg-[#FAF8F5] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#10241A] font-serif">{unit.type}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{unit.areaSqm} m² • {unit.bedrooms} Dhoma</div>
                    <div className="text-sm font-extrabold text-[#10241A] mt-1">
                      nga {convertPrice(unit.startingPrice).formatted}
                    </div>
                    <span className="text-[10px] text-[#0E6C38] font-bold mt-0.5 block">{unit.availableUnits} të lira</span>
                  </button>
                ))}
              </div>

              {/* Selected Unit Floor Plan Showcase */}
              {selectedUnit && (
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-full sm:w-1/2 h-56 bg-white rounded-xl border border-[#ECE7DE] overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src={selectedUnit.floorPlanImage} 
                      alt="Planimetria" 
                      className="w-full h-full object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 space-y-3">
                    <h4 className="text-lg font-bold font-serif text-[#10241A]">{selectedUnit.type}</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-[#ECE7DE]">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Sipërfaqja:</span>
                        <span className="font-bold text-[#10241A]">{selectedUnit.areaSqm} m²</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#ECE7DE]">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Dhomat:</span>
                        <span className="font-bold text-[#10241A]">{selectedUnit.bedrooms} Gjumi / {selectedUnit.bathrooms} Banjo</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold font-serif text-[#10241A]">
                      Çmimi i Plotë: {convertPrice(selectedUnit.startingPrice).formatted}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verified Legal Permit */}
            <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#B89758] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#10241A]">Leje Ndërtimore e Verifikuar & Miratuar</div>
                <p className="text-[11px] text-stone-600 leading-relaxed mt-0.5">
                  Projekti disponon leje të vlefshme ndërtimi Nr. <strong>{activeProjectModal.permitNumber}</strong> lëshuar nga <strong>{activeProjectModal.permitIssuingAuthority}</strong>.
                </p>
              </div>
            </div>

            {/* Direct Developer Contact Form */}
            <div className="p-5 rounded-2xl bg-[#10241A] text-white space-y-4 border border-[#2B543D]">
              <div>
                <h4 className="text-sm font-bold font-serif text-white">
                  Kërko Informata ose Rezervo Vizitë në Showroom
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Drejtpërdrejt te zyra e autorizuar e shitjeve e {activeProjectModal.developerName}
                </p>
              </div>

              {inquirySent ? (
                <div className="p-4 rounded-xl bg-[#163324] border border-[#2B543D] text-center">
                  <CheckCircle2 className="w-7 h-7 text-[#DFBE89] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-white">Kërkesa u Dërgua me Sukses!</div>
                  <p className="text-[11px] text-stone-300 mt-1">
                    Agjenti i shitjeve do t&apos;ju kontaktojë brenda 30 minutave në numrin e dhënë.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Emri & Mbiemri"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-[#163324] border border-[#2B543D] text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#B89758]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Numri i Telefonit (WhatsApp)"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-[#163324] border border-[#2B543D] text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#B89758]"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="submit"
                      variant="gold"
                      size="sm"
                      fullWidth
                    >
                      Dërgo Kërkesën për Ofertë
                    </Button>
                    <a
                      href={`https://wa.me/${activeProjectModal.contactPhone.replace(/[^0-9]/g, '')}?text=Përshëndetje,%20jam%20i%20interesuar%20për%20kompleksin%20${encodeURIComponent(activeProjectModal.name)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        icon={<MessageSquare className="w-4 h-4 text-[#0E6C38]" />}
                      >
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </form>
              )}

            </div>

          </div>
        </ModalShell>
      )}

    </div>
  );
};
