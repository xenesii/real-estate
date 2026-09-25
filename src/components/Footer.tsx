import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { 
  Building2, ShieldCheck, Mail, Phone, MapPin, Globe, 
  Banknote, Compass, Scale, Send, CheckCircle2, ArrowRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLocale();
  const { setActiveView, setFilters } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleLocationClick = (city: string) => {
    setFilters(prev => ({ ...prev, city }));
    setActiveView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: any) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
  };

  return (
    <footer className="bg-[#0C1E14] text-stone-300 pt-16 pb-12 border-t border-[#1C3B2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Bar */}
        <div className="bg-[#122A1D] rounded-2xl border border-[#234A36] p-6 sm:p-8 mb-14 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#DFBE89] block mb-1">
                ABONOHUNI PËR PRONAT E REJA
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Merrni të Parët Njoftime për Pronat Ekskluzive
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Njoftime javore për zbritje çmimesh, penthouse të reja dhe mundësi investimi me kthim të lartë kapitali.
              </p>
            </div>

            {newsletterSuccess ? (
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A3D2A] text-[#DFBE89] text-xs font-bold border border-[#2E5C44]">
                <CheckCircle2 className="w-4 h-4 text-[#DFBE89]" />
                <span>Faleminderit! U regjistruat me sukses.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full lg:w-auto">
                <input
                  type="email"
                  required
                  placeholder="Shkruani email-in tuaj..."
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="px-4 py-3 bg-[#0C1E14] border border-[#27533C] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#DFBE89] w-full sm:w-72 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#B89758] hover:bg-[#DFBE89] text-[#0C1E14] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Regjistrohu
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Column 1: Brand Info */}
          <div>
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 mb-4 cursor-pointer group"
            >
              {/* SP Gold Badge */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFBE89] via-[#C5A880] to-[#997B4D] flex items-center justify-center text-white shadow-md border border-[#FFF2DE]/30">
                <span className="font-serif font-black text-lg text-[#10241A]">SP</span>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block leading-tight font-serif">
                  SHITJE PRONASH
                </span>
                <span className="text-[9px] tracking-[0.22em] uppercase text-[#DFBE89] font-bold block">
                  PREMIUM REAL ESTATE
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed mb-5">
              Platforma kryesore e pasurive të paluajtshme luksoze dhe të certifikuara kadastralisht në Kosovë dhe Shqipëri. Partner i mbi 85+ agjencive dhe noterëve të licencuar.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#DFBE89] bg-[#122A1D] p-3 rounded-xl border border-[#234A36]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#DFBE89]" />
              <span className="font-medium text-[11px]">Transaksione të garantuara me verifikim noterial dhe Escrow.</span>
            </div>
          </div>

          {/* Column 2: Popular Locations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#DFBE89] mb-4">
              Destinacionet Kryesore
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => handleLocationClick('Prishtinë')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Prishtinë – Qendra & Veternik</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLocationClick('Prishtinë')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Prishtinë – Dragodan & Marigona</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLocationClick('Tiranë')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Tiranë – Ish-Blloku & Liqeni</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLocationClick('Tiranë')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Tiranë – Rolling Hills & Rezidencat</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLocationClick('Durrës')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Durrës – Shkëmbi i Kavajës & Plazhi</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLocationClick('Vlorë')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Vlorë – Lungomare & Radhimë</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Features & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#DFBE89] mb-4">
              Shërbimet & Veglat
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => handleNavClick('developments')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left font-medium text-white"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Projektet e Reja Rezidenciale</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('investments')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left font-medium text-white"
                >
                  <Banknote className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Llogaritësi i Investimit (ROI)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('diaspora')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <Globe className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Shërbimi për Mërgatën (Diaspora)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('financing')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <Banknote className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Normat e Kredive Bankare</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('valuation')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <Compass className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Vlerësimi i Pronës me AI</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('legal_contracts')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <Scale className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Hartuesi i Kontratave & Noterët</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('agencies')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Agjencitë & Brokerët e Licencuar</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('market_insights')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <Compass className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Statistikat & Indeksi i Çmimeve</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#DFBE89] mb-4">
              Zyrat & Kontakti
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89758] shrink-0 mt-0.5" />
                <span>Prishtinë: Bulevardi Nënë Tereza, VIP Tower, Kati 4</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89758] shrink-0 mt-0.5" />
                <span>Tiranë: Bulevardi Dëshmorët e Kombit, Twin Towers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89758] shrink-0" />
                <a href="tel:+38344123456" className="text-white hover:text-[#DFBE89] transition-colors font-medium">
                  +383 44 123 456 / +355 69 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89758] shrink-0" />
                <a href="mailto:info@shitjepronash.com" className="text-white hover:text-[#DFBE89] transition-colors">
                  info@shitjepronash.com
                </a>
              </li>
            </ul>

            <div className="mt-5">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#142C20] hover:bg-[#1A3D2A] text-[#DFBE89] border border-[#27533C] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Hap Formën e Kontaktit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-[#1C3B2B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © 2026 <strong className="text-white">SHITJE PRONASH</strong> – Premium Real Estate. Të gjitha të drejtat të rezervuara.
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-stone-400">
              Licencuar sipas ligjeve të patundshmërisë në Kosovë & Shqipëri
            </span>
            <button 
              onClick={() => handleNavClick('legal_contracts')}
              className="hover:text-white transition-colors"
            >
              Termat & Kushtet
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
