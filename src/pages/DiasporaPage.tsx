import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe2, ShieldCheck, Video, FileCheck, DollarSign, 
  ArrowRight, Phone, Mail, Building, MapPin, CheckCircle2, 
  HelpCircle, Award, Sparkles, Scale, Send, Check, MessageSquare
} from 'lucide-react';
import { NotaryCalculatorModal } from '../components/NotaryCalculatorModal';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DisplayCurrency } from '../types';

export const DiasporaPage: React.FC = () => {
  const { 
    listings, setActiveListing, setActiveView, 
    addDiasporaInquiry, currency, setCurrency, convertPrice 
  } = useApp();

  const [notaryModalOpen, setNotaryModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    residenceCountry: 'Zvicër 🇨🇭',
    phone: '',
    email: '',
    preferredCity: 'Prishtinë',
    budgetRange: '€150,000 - €250,000',
    propertyType: 'Banesë e Re / Penthouse',
    needsPowerOfAttorneyHelp: true,
    needsRemoteInspection: true,
    message: ''
  });

  const residenceOptions = [
    'Zvicër 🇨🇭',
    'Gjermani 🇩🇪',
    'Austri 🇦🇹',
    'SHBA 🇺🇸',
    'Mbretëria e Bashkuar (UK) 🇬🇧',
    'Suedi 🇸🇪',
    'Norvegji 🇳🇴',
    'Itali 🇮🇹',
    'Tjetër'
  ];

  const cityOptions = [
    'Prishtinë',
    'Tiranë',
    'Vlorë (Bregdet)',
    'Durrës (Gjiri i Lalzit / Plazh)',
    'Prizren',
    'Sarandë'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const id = addDiasporaInquiry({
      name: formData.name,
      residenceCountry: formData.residenceCountry,
      phone: formData.phone,
      email: formData.email,
      preferredCity: formData.preferredCity,
      budgetRange: formData.budgetRange,
      propertyType: formData.propertyType,
      needsPowerOfAttorneyHelp: formData.needsPowerOfAttorneyHelp,
      needsRemoteInspection: formData.needsRemoteInspection,
      message: formData.message
    });

    setInquiryId(id);
    setFormSubmitted(true);
  };

  // Filter turnkey and luxury listings suited for diaspora
  const diasporaPicks = listings
    .filter(l => l.status === 'published' && l.price >= 90000)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24">
      
      {/* Header Banner - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
              <Globe2 className="w-4 h-4 text-[#B89758]" />
              <span>Shërbimi Ekskluziv për Diasporën Shqiptare</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white mb-4 leading-tight">
              Bli Pronë në Atdhe me <span className="text-[#DFBE89]">Siguri të Plotë Ligjore</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
              Për bashkatdhetarët tanë në Zvicër, Gjermani, Austri, SHBA dhe Europë. Blini pa udhëtuar përmes prokurës noteriale konsullore, inspektimit teknik me video-thirrje dhe transaksioneve të sigurta bankare escrow.
            </p>

            {/* Currency Switcher Pill */}
            <div className="inline-flex items-center gap-2 bg-[#163324]/80 backdrop-blur-md p-1.5 rounded-2xl border border-[#2B543D]">
              <span className="text-xs font-bold text-stone-300 px-2.5">
                Shiko Çmimet në:
              </span>
              {(['EUR', 'CHF', 'USD', 'GBP'] as DisplayCurrency[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currency === curr
                      ? 'bg-[#B89758] text-[#10241A] font-extrabold shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-[#1E4731]'
                  }`}
                >
                  {curr === 'EUR' ? 'EUR (€)' : curr === 'CHF' ? 'CHF (Fr)' : curr === 'USD' ? 'USD ($)' : 'GBP (£)'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* Value Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          
          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ECE7DE] shadow-2xs flex items-start gap-3.5 hover:border-[#DFBE89] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-sm text-[#10241A]">Verifikim 100% Kadastral</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Kontroll i plotë i fletës poseduese, hipoteka & pa barrë tatimore.</p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ECE7DE] shadow-2xs flex items-start gap-3.5 hover:border-[#DFBE89] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-sm text-[#10241A]">Prokura e Posaçme</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Udhëzues për autorizimin noterial në konsullata ose me vulë Apostille.</p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ECE7DE] shadow-2xs flex items-start gap-3.5 hover:border-[#DFBE89] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-sm text-[#10241A]">Inspektim me Video Live</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Inxhinieri ynë hyn në pronë dhe ju tregon çdo cep me video live.</p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ECE7DE] shadow-2xs flex items-start gap-3.5 hover:border-[#DFBE89] transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-sm text-[#10241A]">Llogari Escrow Noteriale</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Paratë lirohen te shitësi vetëm pasi prona të regjistrohet në emrin tuaj.</p>
            </div>
          </div>

        </div>

        {/* 4-Step Remote Acquisition Guide */}
        <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-10 shadow-2xs mb-14">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Procesi i Certifikuar Hap Pas Hapi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#10241A]">
              Si të Blini një Banesë apo Vilë nga Largësia
            </h2>
            <p className="text-xs text-stone-500 mt-1.5">
              Një rrugëtim transparent dhe i mbrojtur ligjërisht nga përzgjedhja deri te çelësat në dorë
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] flex flex-col justify-between hover:border-[#DFBE89] transition-all">
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif font-extrabold text-sm flex items-center justify-center mb-3 border border-[#2B543D]">
                  1
                </div>
                <h3 className="text-sm font-bold font-serif text-[#10241A] mb-2">
                  Përzgjedhja & Inspektimi Virtual
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Zgjidhni pronën e dëshiruar dhe rezervoni një video-thirrje live ku agjenti dhe inxhinieri kontrollojnë cilësinë e ndërtimit, pamjen dhe instalimet.
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-[#0E6C38] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Raport teknik i detajuar</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] flex flex-col justify-between hover:border-[#DFBE89] transition-all">
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif font-extrabold text-sm flex items-center justify-center mb-3 border border-[#2B543D]">
                  2
                </div>
                <h3 className="text-sm font-bold font-serif text-[#10241A] mb-2">
                  Prokura e Posaçme (Power of Attorney)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Nëse nuk udhëtoni dot, lëshoni një prokurë në Ambasadën/Konsullatën më të afërt të Kosovës ose Shqipërisë (ose te noteri lokal me vulë Apostille) për personin tuaj të besuar apo avokatin.
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-[#0E6C38] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tekst i gatshëm autorizimi</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] flex flex-col justify-between hover:border-[#DFBE89] transition-all">
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif font-extrabold text-sm flex items-center justify-center mb-3 border border-[#2B543D]">
                  3
                </div>
                <h3 className="text-sm font-bold font-serif text-[#10241A] mb-2">
                  Kontrata & Depozitimi Escrow
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Aktnoteriali i shitblerjes hartohet nga noteri zyrtar. Pagesa transferohet direkt nga llogaria juaj bankare në Zvicër/BE në llogarinë mirëbesore (escrow) të noterit.
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-[#0E6C38] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero rrezik transaksioni</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] flex flex-col justify-between hover:border-[#DFBE89] transition-all">
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif font-extrabold text-sm flex items-center justify-center mb-3 border border-[#2B543D]">
                  4
                </div>
                <h3 className="text-sm font-bold font-serif text-[#10241A] mb-2">
                  Regjistrimi Kadastral & Çelësat
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Noteri regjistron pronësinë në Kadastër (AKK/ASHK). Fleta poseduese lëshohet në emrin tuaj dhe fondet lirohen vetëm pas përfundimit të plotë.
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-[#0E6C38] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Titull i padiskutueshëm</span>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-[#ECE7DE] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500">
              Dëshironi të llogarisni tarifat noteriale dhe taksat komunale për pronën tuaj?
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setNotaryModalOpen(true)}
              icon={<Scale className="w-4 h-4 text-[#B89758]" />}
            >
              Hap Llogaritësin e Noterit
            </Button>
          </div>
        </div>

        {/* Form & Advisory Consultation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-8 shadow-2xs">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Këshillim Falas për Mërgatën</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#10241A]">
                Kërkoni Asistencë për Blerje nga Diaspora
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Plotësoni kërkesën dhe specialisti ynë për marrëdhënie me diasporën do t&apos;ju kontaktojë në WhatsApp brenda pak orëve.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#FAF5EC] rounded-2xl border border-[#E9DCBE] p-6 text-center py-10 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-white text-[#B89758] flex items-center justify-center mx-auto mb-4 border border-[#E9DCBE] shadow-xs">
                  <CheckCircle2 className="w-8 h-8 text-[#B89758]" />
                </div>
                <h3 className="text-xl font-bold font-serif text-[#10241A] mb-1">
                  Kërkesa Juaj u Pranua me Sukses!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto mb-3">
                  Numri i referencës suaj është <span className="font-mono font-bold text-[#10241A]">{inquiryId}</span>. Këshilltari ynë ligjor dhe i investimeve do t&apos;ju kontaktojë direkt në WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <a
                    href={`https://wa.me/38344123456?text=Përshëndetje,%20kam%20dorëzuar%20kërkesën%20për%20diasporë%20me%20ID:%20${inquiryId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="primary" size="md" icon={<MessageSquare className="w-4 h-4 text-[#DFBE89]" />}>
                      Kontakto Tani në WhatsApp
                    </Button>
                  </a>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        residenceCountry: 'Zvicër 🇨🇭',
                        phone: '',
                        email: '',
                        preferredCity: 'Prishtinë',
                        budgetRange: '€150,000 - €250,000',
                        propertyType: 'Banesë e Re / Penthouse',
                        needsPowerOfAttorneyHelp: true,
                        needsRemoteInspection: true,
                        message: ''
                      });
                    }}
                  >
                    Dërgo Kërkesë Tjetër
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Emri dhe Mbiemri:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="p.sh. Agim Krasniqi"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Shteti i Vendbanimit Aktual:
                    </label>
                    <select
                      value={formData.residenceCountry}
                      onChange={e => setFormData({ ...formData, residenceCountry: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-semibold text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                    >
                      {residenceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Numri i Telefonit (WhatsApp):
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+41 79 123 4567 ose +49..."
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Adresa:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="agim@shembull.ch"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Qyteti i Preferuar:
                    </label>
                    <select
                      value={formData.preferredCity}
                      onChange={e => setFormData({ ...formData, preferredCity: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800"
                    >
                      {cityOptions.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Buxheti i Synuar:
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800"
                    >
                      <option value="€80,000 - €150,000">€80,000 - €150,000</option>
                      <option value="€150,000 - €250,000">€150,000 - €250,000</option>
                      <option value="€250,000 - €400,000">€250,000 - €400,000</option>
                      <option value="Mbi €400,000 (Vila & Penthouse)">Mbi €400,000 (Vila & Penthouse)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Lloji i Pronës:
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800"
                    >
                      <option value="Banesë e Re / Penthouse">Banesë e Re / Penthouse</option>
                      <option value="Vilë në Rezidencë Private">Vilë në Rezidencë Private</option>
                      <option value="Apartament Bregdetar (Investim)">Apartament Bregdetar</option>
                      <option value="Tokë Ndërtimore / Truall">Tokë Ndërtimore / Truall</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#ECE7DE]">
                  <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needsPowerOfAttorneyHelp}
                      onChange={e => setFormData({ ...formData, needsPowerOfAttorneyHelp: e.target.checked })}
                      className="w-4 h-4 rounded text-[#142C20] focus:ring-[#142C20]"
                    />
                    <span>Dëshiroj ndihmë me formularin e Prokurës së Posaçme në Ambasadë/Konsullatë</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needsRemoteInspection}
                      onChange={e => setFormData({ ...formData, needsRemoteInspection: e.target.checked })}
                      className="w-4 h-4 rounded text-[#142C20] focus:ring-[#142C20]"
                    />
                    <span>Kërkoj inspektim me video-thirrje live dhe raport inxhinierik para blerjes</span>
                  </label>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Pyetje specifike apo kërkesa të veçanta për lokacionin..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="gold"
                    fullWidth
                    size="md"
                    icon={<Send className="w-4 h-4 text-[#10241A]" />}
                  >
                    Dërgo Kërkesën për Këshillim Falas
                  </Button>
                  <p className="text-[11px] text-stone-400 text-center mt-2">
                    Shërbimi këshillues është plotësisht pa pagesë dhe i garantuar me konfidencialitet.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            <div className="bg-gradient-to-br from-[#10241A] to-[#163324] rounded-3xl p-6 sm:p-7 text-white border border-[#2B543D] shadow-lg">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DFBE89] uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-[#B89758]" />
                <span>Pse Mbi 450 Bashkatdhetarë na Besuan</span>
              </div>
              <h3 className="text-xl font-bold font-serif mb-4 leading-snug">
                Blerje me Çelësa në Dorë pa Rreziqe Fshehura
              </h3>
              
              <ul className="space-y-3 text-xs text-stone-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DFBE89] shrink-0 mt-0.5" />
                  <span><strong>Pagesë me Transaksion Bankar Ndërkombëtar:</strong> Paratë dërgohen nga banka juaj (UBS, Credit Suisse, Sparkasse) direkt në llogari noteriale.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DFBE89] shrink-0 mt-0.5" />
                  <span><strong>Verifikim i Plotë Kadastral (AKK/ASHK):</strong> Asnjë pronë nuk rekomandohet pa fletë poseduese të pastër dhe leje ndërtimi.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DFBE89] shrink-0 mt-0.5" />
                  <span><strong>Menaxhimi i Qirasë pas Blerjes:</strong> Mundësi e plotë administrimi dhe qiradhënieje për kthim të garantuar të investimit.</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-[#2B543D] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-stone-400">Kontakti i Drejtpërdrejtë:</div>
                  <div className="text-sm font-bold text-[#DFBE89]">+383 44 123 456</div>
                </div>
                <a
                  href="https://wa.me/38344123456?text=Përshëndetje,%20po%20ju%20shkruaj%20nga%20diaspora%20për%20këshillim%20prona."
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="gold" size="sm" icon={<MessageSquare className="w-3.5 h-3.5" />}>
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#ECE7DE] flex items-center justify-between">
              <div>
                <div className="font-bold font-serif text-xs text-[#10241A]">Llogaritësi i Tarifave Noteriale</div>
                <div className="text-[11px] text-stone-500">Mësoni saktësisht kostot e aktnoterialit dhe taksës komunale.</div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setNotaryModalOpen(true)}
              >
                Llogarit
              </Button>
            </div>

          </div>

        </div>

        {/* Diaspora Recommended Properties */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Përzgjedhje Ekskluzive</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#10241A]">
                Prona me Çelësa në Dorë të Rekomanduara për Mërgatën
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveView('search')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Shiko të Gjitha Pronat
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {diasporaPicks.map(listing => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

      </div>

      {/* Notary Calculator Modal */}
      <NotaryCalculatorModal
        isOpen={notaryModalOpen}
        onClose={() => setNotaryModalOpen(false)}
      />

    </div>
  );
};
