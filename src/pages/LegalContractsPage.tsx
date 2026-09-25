import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  CONTRACT_TEMPLATES, 
  ContractTemplateDefinition 
} from '../data/mockContracts';
import { 
  LegalContractData, 
  ContractTemplateType, 
  ContractParty, 
  ContractArticle 
} from '../types';
import { 
  FileText, ShieldCheck, Download, Printer, Plus, Check, 
  Sparkles, FileEdit, Trash2, Copy, Building2, User, 
  DollarSign, Calendar, Scale, HelpCircle, ChevronRight, AlertCircle, Share2,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { NotaryCalculatorModal } from '../components/NotaryCalculatorModal';

export const LegalContractsPage: React.FC = () => {
  const { contracts, saveContract, deleteContract, updateContractStatus, convertPrice } = useApp();
  const { locale } = useLocale();

  const [activeTab, setActiveTab] = useState<'generator' | 'catalog' | 'saved' | 'guide'>('generator');
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplateDefinition>(CONTRACT_TEMPLATES[0]);
  
  // Wizard active contract state
  const [contractTitle, setContractTitle] = useState('Kontratë Qiraje Banesore - Prishtinë');
  const [jurisdiction, setJurisdiction] = useState<'Kosovo' | 'Albania'>('Kosovo');
  
  // Party A (Landlord / Seller)
  const [partyA, setPartyA] = useState<ContractParty>({
    fullName: 'Kreshnik Krasniqi',
    personalId: '1019283746',
    address: 'Rruga Ahmet Krasniqi Nr. 15',
    city: 'Prishtinë',
    phone: '+383 44 123 456',
    email: 'kreshnik.krasniqi@gmail.com'
  });

  // Party B (Tenant / Buyer)
  const [partyB, setPartyB] = useState<ContractParty>({
    fullName: 'Arbenita Hoxha',
    personalId: '2028394019',
    address: 'Rruga Agim Ramadani Nr. 88',
    city: 'Prishtinë',
    phone: '+383 49 888 999',
    email: 'arbenita.hoxha@outlook.com'
  });

  // Property Details
  const [propertyTitle, setPropertyTitle] = useState('Banesë 2+1 në Arbëri');
  const [propertyAddress, setPropertyAddress] = useState('Rruga Ahmet Krasniqi, Ndërtesa C, Kati 3');
  const [propertyCity, setPropertyCity] = useState('Prishtinë');
  const [cadastralZone, setCadastralZone] = useState('Zona Kadastrale Prishtinë 71914');
  const [parcelNumber, setParcelNumber] = useState('Parcela 1420/5 - Njësia B-12');
  const [areaSqm, setAreaSqm] = useState(85);

  // Financial terms
  const [priceOrRent, setPriceOrRent] = useState(550);
  const [depositAmount, setDepositAmount] = useState(1100);
  const [paymentDay, setPaymentDay] = useState(5);
  const [handoverDate, setHandoverDate] = useState('2026-04-01');
  const [durationMonths, setDurationMonths] = useState(12);
  const [bankIban, setBankIban] = useState('XK05 1501 0010 9876 5432');
  const [bankName, setBankName] = useState('NLB Banka Prishtinë');
  const [utilitiesText, setUtilitiesText] = useState('Qiramarrësi paguan energjinë elektrike (KEDS), ujin, ngrohjen dhe mirëmbajtjen e hyrjes.');
  const [customClause, setCustomClause] = useState('');
  const [customClausesList, setCustomClausesList] = useState<string[]>([
    'Pirja e duhanit brenda ambienteve të mbyllura të banesës është e ndaluar.',
    'Vizitat e Qiradhënësit për inspektim bëhen vetëm me njoftim paraprak prej 24 orësh.'
  ]);

  const [copiedNotification, setCopiedNotification] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [notaryModalOpen, setNotaryModalOpen] = useState(false);

  // Switch template
  const handleSelectTemplate = (template: ContractTemplateDefinition) => {
    setSelectedTemplate(template);
    setJurisdiction(template.jurisdiction);
    setContractTitle(`${template.titleSq} - ${propertyCity}`);
    setActiveTab('generator');
  };

  const handleAddCustomClause = () => {
    if (!customClause.trim()) return;
    setCustomClausesList([...customClausesList, customClause.trim()]);
    setCustomClause('');
  };

  const handleRemoveClause = (index: number) => {
    setCustomClausesList(customClausesList.filter((_, i) => i !== index));
  };

  const handleSaveToDashboard = () => {
    const newContract: LegalContractData = {
      id: `cnt-${Date.now()}`,
      templateType: selectedTemplate.type,
      title: contractTitle,
      jurisdiction,
      governingLaw: selectedTemplate.governingLawSq,
      status: 'ready_to_sign',
      partyA,
      partyB,
      property: {
        title: propertyTitle,
        address: propertyAddress,
        city: propertyCity,
        municipality: propertyCity,
        cadastralZone,
        parcelNumber,
        areaSqm,
      },
      financialTerms: {
        priceOrRent,
        currency: 'EUR',
        depositAmount,
        paymentDayOfMonth: paymentDay,
        paymentMethod: 'bank_transfer',
        bankIban,
        bankName,
        handoverDate,
        contractDurationMonths: durationMonths,
        utilitiesResponsibility: utilitiesText
      },
      customClauses: customClausesList,
      articles: selectedTemplate.defaultArticles,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveContract(newContract);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyText = () => {
    const docElement = document.getElementById('printable-contract-document');
    if (docElement) {
      navigator.clipboard.writeText(docElement.innerText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-24 bg-[#FBFBFA]">
      
      {/* Hero Header - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
                <Scale className="w-4 h-4 text-[#B89758]" />
                <span>Standardet Ligjore të Kosovës (LMD) & Shqipërisë (Kodi Civil)</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white mb-3 leading-tight">
                Qendra e Kontratave & <span className="text-[#DFBE89]">Dokumenteve Ligjore</span>
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Gjeneroni, personalizoni dhe shkarkoni kontrata zyrtare qiraje, parakontrata shitblerjeje, procesverbale pranim-dorëzimi dhe autorizime noteriale për diasporën.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                variant="gold"
                size="md"
                onClick={() => setNotaryModalOpen(true)}
                icon={<Scale className="w-4 h-4 text-[#10241A]" />}
              >
                Kalkulatori Noterial
              </Button>
              <Button
                variant={activeTab === 'generator' ? 'gold' : 'secondary'}
                size="md"
                onClick={() => setActiveTab('generator')}
                icon={<FileEdit className="w-4 h-4" />}
              >
                Gjeneruesi Interaktiv
              </Button>
              <Button
                variant={activeTab === 'saved' ? 'gold' : 'secondary'}
                size="md"
                onClick={() => setActiveTab('saved')}
                icon={<FileText className="w-4 h-4" />}
              >
                Kontratat e Mia ({contracts.length})
              </Button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-8 border-b border-[#2B543D] pb-0 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('generator')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'generator'
                  ? 'border-[#DFBE89] text-[#DFBE89]'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>Gjenero Kontratë të Re</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'catalog'
                  ? 'border-[#DFBE89] text-[#DFBE89]'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Katalogu i Modeleve ({CONTRACT_TEMPLATES.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'saved'
                  ? 'border-[#DFBE89] text-[#DFBE89]'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Dokumentet e Ruajtura ({contracts.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'guide'
                  ? 'border-[#DFBE89] text-[#DFBE89]'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Udhëzuesi Noterial & Ligjor</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* TAB 1: INTERACTIVE CONTRACT GENERATOR & LIVE PREVIEW */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form Controls (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Template Selector Card */}
              <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif font-bold text-xs flex items-center justify-center border border-[#2B543D]">
                      1
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#10241A]">
                      Zgjedhja e Modelit
                    </span>
                  </div>
                  <Badge variant="neutral" size="xs">
                    {jurisdiction === 'Kosovo' ? '🇽🇰 Kosovë' : '🇦🇱 Shqipëri'}
                  </Badge>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Lloji i Kontratës / Dokumentit Zyrtar:
                  </label>
                  <select
                    value={selectedTemplate.type}
                    onChange={(e) => {
                      const found = CONTRACT_TEMPLATES.find(t => t.type === e.target.value);
                      if (found) handleSelectTemplate(found);
                    }}
                    className="w-full text-xs sm:text-sm bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3.5 py-2.5 font-bold text-[#10241A] focus:bg-white focus:outline-none"
                  >
                    {CONTRACT_TEMPLATES.map(tmpl => (
                      <option key={tmpl.type} value={tmpl.type}>
                        {tmpl.titleSq} ({tmpl.badge})
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#ECE7DE]">
                  {selectedTemplate.descriptionSq}
                </p>
              </div>

              {/* Parties Details Card */}
              <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif font-bold text-xs flex items-center justify-center border border-[#2B543D]">
                      2
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#10241A]">
                      Palët Kontraktuese
                    </span>
                  </div>
                  <User className="w-4 h-4 text-[#B89758]" />
                </div>

                {/* Party A */}
                <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE]">
                  <span className="text-xs font-bold text-[#10241A] uppercase tracking-wider block">
                    Pala A (Qiradhënësi / Shitësi / Pronari)
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Emri & Mbiemri</label>
                      <input
                        type="text"
                        value={partyA.fullName}
                        onChange={(e) => setPartyA({ ...partyA, fullName: e.target.value })}
                        className="w-full text-xs bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Nr. Personal / NIPT</label>
                      <input
                        type="text"
                        value={partyA.personalId}
                        onChange={(e) => setPartyA({ ...partyA, personalId: e.target.value })}
                        className="w-full text-xs bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Adresa & Qyteti</label>
                      <input
                        type="text"
                        value={partyA.address}
                        onChange={(e) => setPartyA({ ...partyA, address: e.target.value })}
                        className="w-full text-xs bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Telefon / Email</label>
                      <input
                        type="text"
                        value={partyA.phone}
                        onChange={(e) => setPartyA({ ...partyA, phone: e.target.value })}
                        className="w-full text-xs bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Party B */}
                <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE]">
                  <span className="text-xs font-bold text-[#8B6E39] uppercase tracking-wider block">
                    Pala B (Qiramarrësi / Blerësi / Përfaqësuesi)
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Emri & Mbiemri</label>
                      <input
                        type="text"
                        value={partyB.fullName}
                        onChange={(e) => setPartyB({ ...partyB, fullName: e.target.value })}
                        className="w-full text-xs bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Nr. Personal / NIPT</label>
                      <input
                        type="text"
                        value={partyB.personalId}
                        onChange={(e) => setPartyB({ ...partyB, personalId: e.target.value })}
                        className="w-full text-xs bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Adresa & Qyteti</label>
                      <input
                        type="text"
                        value={partyB.address}
                        onChange={(e) => setPartyB({ ...partyB, address: e.target.value })}
                        className="w-full text-xs bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Telefon / Email</label>
                      <input
                        type="text"
                        value={partyB.phone}
                        onChange={(e) => setPartyB({ ...partyB, phone: e.target.value })}
                        className="w-full text-xs bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Property & Cadastral Details Card */}
              <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif font-bold text-xs flex items-center justify-center border border-[#2B543D]">
                      3
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#10241A]">
                      Të Dhënat e Pronës & Kadastrit
                    </span>
                  </div>
                  <Building2 className="w-4 h-4 text-[#B89758]" />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">Përshkrimi i Pronës</label>
                    <input
                      type="text"
                      value={propertyTitle}
                      onChange={(e) => setPropertyTitle(e.target.value)}
                      className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A] focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">Sipërfaqja (m²)</label>
                    <input
                      type="number"
                      value={areaSqm}
                      onChange={(e) => setAreaSqm(Number(e.target.value))}
                      className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-bold text-[#10241A] focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Adresa e Saktë & Kati</label>
                  <input
                    type="text"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">Zona Kadastrale</label>
                    <input
                      type="text"
                      value={cadastralZone}
                      onChange={(e) => setCadastralZone(e.target.value)}
                      className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">Nr. i Parcelës / Njësisë</label>
                    <input
                      type="text"
                      value={parcelNumber}
                      onChange={(e) => setParcelNumber(e.target.value)}
                      className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Financial & Tenancy Terms Card */}
              <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif font-bold text-xs flex items-center justify-center border border-[#2B543D]">
                      4
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#10241A]">
                      Kushtet Financiare & Afatet
                    </span>
                  </div>
                  <DollarSign className="w-4 h-4 text-[#B89758]" />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">
                      {selectedTemplate.category === 'sale' ? 'Çmimi i Plotë (€)' : 'Qiraja Mujore (€)'}
                    </label>
                    <input
                      type="number"
                      value={priceOrRent}
                      onChange={(e) => setPriceOrRent(Number(e.target.value))}
                      className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-extrabold text-[#10241A] focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">
                      {selectedTemplate.category === 'sale' ? 'Kapari / Kaparia (€)' : 'Depozita e Garancisë (€)'}
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-bold text-[#10241A] focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">Data e Dorëzimit / Fillimit</label>
                    <input
                      type="date"
                      value={handoverDate}
                      onChange={(e) => setHandoverDate(e.target.value)}
                      className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A] focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">Kohëzgjatja (Muaj)</label>
                    <input
                      type="number"
                      value={durationMonths}
                      onChange={(e) => setDurationMonths(Number(e.target.value))}
                      className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A] focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">IBAN Bankar i Pagesës</label>
                  <input
                    type="text"
                    value={bankIban}
                    onChange={(e) => setBankIban(e.target.value)}
                    className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-mono text-[#10241A] focus:outline-none focus:bg-white"
                  />
                </div>

                {/* Custom Clauses */}
                <div className="pt-2 border-t border-[#ECE7DE]">
                  <label className="text-[11px] font-bold text-stone-700 block mb-1.5">
                    Klauzola Shtesë të Personalizuara
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="p.sh. Kafshët shtëpiake lejohen me miratim paraprak..."
                      value={customClause}
                      onChange={(e) => setCustomClause(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCustomClause()}
                      className="flex-1 text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none focus:bg-white"
                    />
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleAddCustomClause}
                      icon={<Plus className="w-4 h-4 text-[#DFBE89]" />}
                    >
                      Shto
                    </Button>
                  </div>

                  <div className="space-y-1.5">
                    {customClausesList.map((clause, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-[#FAF8F5] text-[11px] text-stone-700 border border-[#ECE7DE]">
                        <span className="leading-snug">• {clause}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveClause(idx)}
                          className="text-stone-400 hover:text-rose-600 shrink-0 mt-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Printable Document Preview (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Document Actions Bar */}
              <div className="sticky top-20 z-20 bg-[#10241A] text-white p-4 sm:p-5 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-3 border border-[#2B543D]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#163324] text-[#DFBE89] border border-[#2B543D] flex items-center justify-center font-bold text-xs shadow-xs font-serif">
                    DOC
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-serif text-white">Pamja Paraprake Ligjore</h3>
                    <p className="text-[11px] text-stone-400">Gati për nënshkrim dhe noterizim zyrtar</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopyText}
                    icon={<Copy className="w-3.5 h-3.5 text-[#B89758]" />}
                  >
                    {copiedNotification ? 'U Kopjua!' : 'Kopjo Tekstin'}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSaveToDashboard}
                    icon={<Check className="w-3.5 h-3.5 text-[#0E6C38]" />}
                  >
                    {savedSuccess ? 'U Ruajt!' : 'Ruaj Draft'}
                  </Button>

                  <Button
                    variant="gold"
                    size="sm"
                    onClick={handlePrint}
                    icon={<Printer className="w-3.5 h-3.5 text-[#10241A]" />}
                  >
                    Printo / PDF
                  </Button>
                </div>
              </div>

              {/* Printable Legal Sheet (Paper Mockup) */}
              <div
                id="printable-contract-document"
                className="bg-white rounded-3xl border border-[#ECE7DE] shadow-xl p-8 sm:p-12 text-[#10241A] font-serif leading-relaxed text-sm space-y-6 select-text"
              >
                {/* Official Header */}
                <div className="text-center border-b-2 border-[#10241A] pb-5 space-y-1">
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
                    {jurisdiction === 'Kosovo' ? 'REPUBLIKA E KOSOVËS' : 'REPUBLIKA E SHQIPËRISË'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10241A] uppercase font-serif">
                    {selectedTemplate.titleSq}
                  </h2>
                  <p className="text-xs italic text-stone-600 font-sans mt-1">
                    Mbështetur në: {selectedTemplate.governingLawSq}
                  </p>
                </div>

                {/* Introductory Statement */}
                <div className="text-xs sm:text-sm text-stone-800 space-y-3 font-sans">
                  <p>
                    Kjo Marrëveshje lidhet dhe hyn në fuqi më datë <strong>{new Date(handoverDate).toLocaleDateString('sq-AL', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>, në mes të palëve:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] text-xs">
                    <div>
                      <span className="font-bold text-[#10241A] block mb-1">1. QIRADHËNËSI / SHITËSI (PALA A):</span>
                      <p><strong>Emri:</strong> {partyA.fullName || '________________'}</p>
                      <p><strong>Nr. Personal:</strong> {partyA.personalId || '________________'}</p>
                      <p><strong>Adresa:</strong> {partyA.address || '________________'}, {partyA.city}</p>
                      <p><strong>Tel:</strong> {partyA.phone}</p>
                    </div>

                    <div>
                      <span className="font-bold text-[#8B6E39] block mb-1">2. QIRAMARRËSI / BLERËSI (PALA B):</span>
                      <p><strong>Emri:</strong> {partyB.fullName || '________________'}</p>
                      <p><strong>Nr. Personal:</strong> {partyB.personalId || '________________'}</p>
                      <p><strong>Adresa:</strong> {partyB.address || '________________'}, {partyB.city}</p>
                      <p><strong>Tel:</strong> {partyB.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Property Specification */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] text-xs space-y-1 font-sans">
                  <span className="font-bold text-[#10241A] block mb-1 uppercase">Përshkrimi i Patundshmërisë:</span>
                  <p><strong>Përshkrimi:</strong> {propertyTitle} ({areaSqm} m²)</p>
                  <p><strong>Vendndodhja:</strong> {propertyAddress}, Qyteti {propertyCity}</p>
                  <p><strong>Regjistrimi Kadastral:</strong> {cadastralZone}, {parcelNumber}</p>
                </div>

                {/* Articles List */}
                <div className="space-y-4 pt-2">
                  {selectedTemplate.defaultArticles.map((art) => (
                    <div key={art.number} className="space-y-1">
                      <h4 className="font-bold text-[#10241A] text-sm font-sans">
                        {art.titleSq}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {art.contentSq}
                      </p>
                    </div>
                  ))}

                  {/* Financial Terms Section */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#10241A] text-sm font-sans">
                      Neni {selectedTemplate.defaultArticles.length + 1}: Pagesat, Llogaria Bankare & Shpenzimet
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      Shuma e dakorduar është <strong>{convertPrice(priceOrRent).formatted}</strong> ({selectedTemplate.category === 'sale' ? 'çmimi i plotë' : 'në muaj'}). 
                      Depozita e sigurisë / Kapari është <strong>{convertPrice(depositAmount).formatted}</strong>. 
                      Pagesat transferohen në llogarinë bankare me IBAN: <strong>{bankIban}</strong> pranë <strong>{bankName}</strong> deri më datën {paymentDay} të çdo muaji.
                    </p>
                    <p className="text-xs text-stone-600 italic mt-1">
                      {utilitiesText}
                    </p>
                  </div>

                  {/* Custom Clauses */}
                  {customClausesList.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#10241A] text-sm font-sans">
                        Neni {selectedTemplate.defaultArticles.length + 2}: Dispozita të Veçanta të Dakorduara
                      </h4>
                      <ul className="list-disc list-inside text-xs sm:text-sm text-stone-700 space-y-1">
                        {customClausesList.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Signatures & Notary Stamp Section */}
                <div className="pt-8 border-t-2 border-[#10241A] space-y-8">
                  <div className="grid grid-cols-2 gap-8 text-center text-xs font-sans">
                    <div className="space-y-12">
                      <p className="font-bold text-[#10241A]">PALA A (Qiradhënësi / Shitësi)</p>
                      <div className="border-b border-[#10241A] w-3/4 mx-auto" />
                      <p className="text-stone-500 font-mono">Nënshkrimi: {partyA.fullName}</p>
                    </div>

                    <div className="space-y-12">
                      <p className="font-bold text-[#10241A]">PALA B (Qiramarrësi / Blerësi)</p>
                      <div className="border-b border-[#10241A] w-3/4 mx-auto" />
                      <p className="text-stone-500 font-mono">Nënshkrimi: {partyB.fullName}</p>
                    </div>
                  </div>

                  {/* Notary Certification Stamp Mock */}
                  <div className="border border-dashed border-[#ECE7DE] rounded-2xl p-4 text-center text-[10px] text-stone-400 font-sans space-y-1 bg-[#FAF8F5]">
                    <span className="font-bold uppercase tracking-wider block text-stone-600">
                      Hapësirë e Rezervuar për Vërtetimin Noterial / Vulën Zyrtare
                    </span>
                    <p>Numri i Regjistrit Noterial: LRP. Nr. ______ / 2026 | Vendi: {propertyCity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTRACT TEMPLATES CATALOG */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8 bg-white p-6 rounded-3xl border border-[#ECE7DE] shadow-2xs">
              <h2 className="text-2xl font-bold font-serif text-[#10241A] mb-2">
                Katalogu i Modeleve Zyrtare të Kontratave
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Të gjitha modelet janë hartuar nga juristë të licencuar të pasurive të paluajtshme në Kosovë dhe Shqipëri, të gatshme për përdorim të menjëhershëm.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONTRACT_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.type}
                  className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-2xs hover:shadow-xl hover:border-[#DFBE89] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8B6E39] bg-[#FAF5EC] border border-[#E9DCBE] px-2.5 py-1 rounded-full">
                        {tmpl.badge}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">
                        {tmpl.jurisdiction === 'Kosovo' ? '🇽🇰 Kosovë' : '🇦🇱 Shqipëri'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-serif text-[#10241A] leading-snug">
                      {tmpl.titleSq}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {tmpl.descriptionSq}
                    </p>

                    <div className="pt-2 border-t border-[#ECE7DE] text-[11px] text-stone-600 space-y-1">
                      <p><strong>Baza Ligjore:</strong> {tmpl.governingLawSq}</p>
                      <p><strong>Numri i Neneve:</strong> {tmpl.defaultArticles.length} nene standarde</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#ECE7DE]">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => handleSelectTemplate(tmpl)}
                      icon={<FileEdit className="w-3.5 h-3.5 text-[#DFBE89]" />}
                    >
                      Hap në Gjenerues
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SAVED CONTRACTS */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-[#ECE7DE]">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#10241A]">Kontratat e Ruajtura</h2>
                <p className="text-xs text-stone-500">Menaxhoni dokumentet e gjeneruara dhe draftet tuaja</p>
              </div>

              <Button
                variant="gold"
                size="sm"
                onClick={() => setActiveTab('generator')}
                icon={<Plus className="w-4 h-4 text-[#10241A]" />}
              >
                Krijo Kontratë të Re
              </Button>
            </div>

            {contracts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#ECE7DE] p-12 text-center shadow-2xs">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex items-center justify-center text-[#B89758] mx-auto mb-3 shadow-2xs">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold font-serif text-[#10241A] mb-1">Nuk keni asnjë kontratë të ruajtur</h3>
                <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">Gjeneroni një kontratë të re nga katalogu i modeleve tona ligjore.</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('generator')}
                >
                  Fillo Gjenerimin
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {contracts.map((cnt) => (
                  <div
                    key={cnt.id}
                    className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-2xs hover:border-[#DFBE89] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#8B6E39] bg-[#FAF5EC] border border-[#E9DCBE] px-2 py-0.5 rounded-full">
                          {cnt.jurisdiction === 'Kosovo' ? '🇽🇰 Kosovë' : '🇦🇱 Shqipëri'}
                        </span>
                        <span className="text-xs text-stone-400">
                          Krijuar më {new Date(cnt.createdAt).toLocaleDateString('sq-AL')}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-serif text-[#10241A]">{cnt.title}</h3>
                      <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span><strong>Pala A:</strong> {cnt.partyA.fullName}</span>
                        <span><strong>Pala B:</strong> {cnt.partyB.fullName}</span>
                        <span><strong>Vlera:</strong> {convertPrice(cnt.financialTerms.priceOrRent).formatted}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setContractTitle(cnt.title);
                          setPartyA(cnt.partyA);
                          setPartyB(cnt.partyB);
                          setPropertyTitle(cnt.property.title);
                          setPropertyAddress(cnt.property.address);
                          setPropertyCity(cnt.property.city);
                          setPriceOrRent(cnt.financialTerms.priceOrRent);
                          setDepositAmount(cnt.financialTerms.depositAmount || 0);
                          setActiveTab('generator');
                        }}
                        icon={<FileEdit className="w-3.5 h-3.5 text-[#B89758]" />}
                      >
                        Hap & Edito
                      </Button>

                      <button
                        type="button"
                        onClick={() => deleteContract(cnt.id)}
                        className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-rose-50 text-stone-400 hover:text-rose-600 border border-[#ECE7DE] transition-colors cursor-pointer"
                        title="Fshij"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: LEGAL & NOTARY GUIDES */}
        {activeTab === 'guide' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#ECE7DE] pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif flex items-center justify-center font-bold text-xs border border-[#2B543D]">
                  KS
                </div>
                <h3 className="text-base font-bold font-serif text-[#10241A]">Udhëzuesi Ligjor për Kosovë</h3>
              </div>

              <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE]">
                  <h4 className="font-bold text-[#10241A] mb-1">1. Noterizimi i Detyrueshëm i Shitblerjes</h4>
                  <p>Sipas Ligjit për Noterinë në Kosovë, të gjitha kontratat e shitblerjes së patundshmërive DUHET të përpilohen në formën e aktit noterial para Noterit kompetent.</p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE]">
                  <h4 className="font-bold text-[#10241A] mb-1">2. Kontratat e Qirasë & Tatimi (9%)</h4>
                  <p>Qiradhënësi është i obliguar të deklarojë të ardhurat nga qiraja pranë ATK-së dhe të paguajë tatimin në burim prej 9%.</p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE]">
                  <h4 className="font-bold text-[#10241A] mb-1">3. Verifikimi Kadastral (AKK)</h4>
                  <p>Kërkoni gjithmonë Certifikatën e Pronësisë jo më të vjetër se 5 ditë për të verifikuar nëse prona është e ngarkuar me hipotekë apo masë sigurimi.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#ECE7DE] pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif flex items-center justify-center font-bold text-xs border border-[#2B543D]">
                  AL
                </div>
                <h3 className="text-base font-bold font-serif text-[#10241A]">Udhëzuesi Ligjor për Shqipëri</h3>
              </div>

              <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE]">
                  <h4 className="font-bold text-[#10241A] mb-1">1. Llogaria e Garancisë Noteriale (Escrow)</h4>
                  <p>Në Shqipëri, pagesa e çmimit të pronës kalon përmes llogarisë bankare të Noterit (Escrow), duke mbrojtur blerësin derisa të regjistrohet titulli në ASHK.</p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE]">
                  <h4 className="font-bold text-[#10241A] mb-1">2. Tatimi mbi Kalimin e së Drejtës (15%)</h4>
                  <p>Tatimi mbi fitimin kapital nga shitja e pronës është 15% mbi diferencën midis çmimit të blerjes dhe çmimit të shitjes.</p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE]">
                  <h4 className="font-bold text-[#10241A] mb-1">3. Regjistrimi në ASHK (Kadastër)</h4>
                  <p>Pas nënshkrimit të aktit noterial, Noteri ngarkon aplikimin elektronik në e-Albania pranë Agjencisë Shtetërore të Kadastrës.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Notary Calculator Modal */}
      <NotaryCalculatorModal
        isOpen={notaryModalOpen}
        onClose={() => setNotaryModalOpen(false)}
        defaultCountry={jurisdiction}
        defaultPrice={priceOrRent}
      />
    </div>
  );
};
