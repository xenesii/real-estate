import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { 
  Building2, Phone, Mail, Clock, MapPin, Send, CheckCircle2, 
  MessageSquare, ShieldCheck, Sparkles, ArrowRight, HelpCircle 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLocale();
  const { setActiveView } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'purchase',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFE6] border border-[#E3D6C2] text-[#916E34] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Zyrat Tona & Shërbimi ndaj Klientit</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#12291E] tracking-tight font-serif mb-4">
            Na Kontaktoni
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Keni pyetje rreth një prone, dëshironi të shisni pasurinë tuaj, apo kërkoni asistencë ligjore dhe noteriale? Ekipi ynë i specializuar është në dispozicionin tuaj.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Prishtina Office */}
            <div className="bg-white rounded-2xl border border-[#ECE7DE] p-6 shadow-sm hover:border-[#D8CCBA] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#142C20] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <MapPin className="w-6 h-6 text-[#DFBE89]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#916E34]">Zyra Qendrore • Kosovë</span>
                    <span className="text-xs">🇽🇰</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#12291E] font-serif mb-1">Prishtinë</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Bulevardi Nënë Tereza, Ndërtesa VIP Tower, Kati 4, 10000 Prishtinë
                  </p>
                </div>
              </div>
            </div>

            {/* Tirana Office */}
            <div className="bg-white rounded-2xl border border-[#ECE7DE] p-6 shadow-sm hover:border-[#D8CCBA] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#142C20] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Building2 className="w-6 h-6 text-[#DFBE89]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#916E34]">Zyra Rajonale • Shqipëri</span>
                    <span className="text-xs">🇦🇱</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#12291E] font-serif mb-1">Tiranë</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Bulevardi Dëshmorët e Kombit, Twin Towers, Kulla 1, Kati 6, Tiranë
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & Direct Hotline */}
            <div className="bg-white rounded-2xl border border-[#ECE7DE] p-6 shadow-sm hover:border-[#D8CCBA] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#142C20] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Phone className="w-6 h-6 text-[#DFBE89]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#916E34] block mb-1">Linja Direkte & WhatsApp</span>
                  <h3 className="text-base font-bold text-[#12291E] mb-1">
                    <a href="tel:+38344123456" className="hover:text-[#B89758] transition-colors block">
                      +383 44 123 456 (Kosovë)
                    </a>
                    <a href="tel:+355691234567" className="hover:text-[#B89758] transition-colors block text-stone-700">
                      +355 69 123 4567 (Shqipëri)
                    </a>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Asistencë e shpejtë në shqip, anglisht dhe gjermanisht.
                  </p>
                </div>
              </div>
            </div>

            {/* Email & Work Hours */}
            <div className="bg-white rounded-2xl border border-[#ECE7DE] p-6 shadow-sm hover:border-[#D8CCBA] transition-all">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#916E34] mb-1">
                    <Mail className="w-4 h-4 text-[#B89758]" />
                    <span>Email Zyrtar</span>
                  </div>
                  <p className="text-sm font-semibold text-[#12291E]">info@shitjepronash.com</p>
                  <p className="text-xs text-stone-500">partner@shitjepronash.com</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#916E34] mb-1">
                    <Clock className="w-4 h-4 text-[#B89758]" />
                    <span>Orari i Punës</span>
                  </div>
                  <p className="text-sm font-semibold text-[#12291E]">Hënë – Premte: 08:30 – 19:30</p>
                  <p className="text-xs text-stone-500">E Shtunë: 09:00 – 16:00</p>
                </div>
              </div>
            </div>

            {/* Trust Banner */}
            <div className="bg-[#12291E] text-white rounded-2xl p-6 shadow-md border border-[#234533]">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-6 h-6 text-[#DFBE89]" />
                <h4 className="text-base font-bold text-white font-serif">Certifikim & Siguri Ligjore</h4>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Të gjitha transaksionet shoqërohen me mbikëqyrje noteriale, verifikim të fletës poseduese dhe sistem mbrojtës Escrow.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#ECE7DE] p-8 sm:p-10 shadow-lg">
              
              <div className="border-b border-[#ECE7DE] pb-6 mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#916E34] block mb-1">
                  KOMUNIKIM DIREKT
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#12291E] font-serif">
                  Dërgoni një Mesazh
                </h2>
                <p className="text-sm text-stone-600 mt-2">
                  Plotësoni të dhënat tuaja dhe një agjent i dedikuar do t'ju kontaktojë brenda disa orëve.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-[#F4F9F5] border border-[#CCE4D3] rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-[#163324] text-[#DFBE89] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#12291E] font-serif mb-2">
                    Mesazhi u Dërgua me Sukses!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
                    Faleminderit që na kontaktuat, <strong>{form.name}</strong>. Kërkesa juaj është regjistruar dhe agjenti ynë do t'ju telefonojë në numrin <strong>{form.phone || form.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', topic: 'purchase', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#163324] text-white font-semibold text-sm hover:bg-[#10241A] transition-all cursor-pointer"
                  >
                    <span>Dërgo Mesazh Tjetër</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                        Emri & Mbiemri <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="p.sh. Agron Berisha"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-sm text-[#12291E] focus:bg-white focus:border-[#163324] focus:ring-1 focus:ring-[#163324] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                        Numri i Telefonit <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+383 44 000 000"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-sm text-[#12291E] focus:bg-white focus:border-[#163324] focus:ring-1 focus:ring-[#163324] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                        Email Adresa <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="agron@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-sm text-[#12291E] focus:bg-white focus:border-[#163324] focus:ring-1 focus:ring-[#163324] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                        Tema e Interesimit
                      </label>
                      <select
                        value={form.topic}
                        onChange={e => setForm({ ...form, topic: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-sm text-[#12291E] focus:bg-white focus:border-[#163324] focus:ring-1 focus:ring-[#163324] focus:outline-none transition-all"
                      >
                        <option value="purchase">Blerje e një Prone</option>
                        <option value="selling">Dua të Shes Pronë</option>
                        <option value="rent">Marrje me Qira</option>
                        <option value="diaspora">Blerje nga Diaspora & Konsultë</option>
                        <option value="legal">Verifikim Kadastral & Noter</option>
                        <option value="agency">Bashkëpunim si Agjenci</option>
                        <option value="other">Tjetër</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Mesazhi Juaj <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Përshkruani kërkesën tuaj, qytetin ose lagjen e preferuar, buxhetin apo çfarëdo detaji tjetër..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-sm text-[#12291E] focus:bg-white focus:border-[#163324] focus:ring-1 focus:ring-[#163324] focus:outline-none transition-all resize-y"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#163324] hover:bg-[#10241A] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer group"
                    >
                      <Send className="w-4 h-4 text-[#DFBE89] group-hover:translate-x-0.5 transition-transform" />
                      <span>Dërgo Mesazhin Tani</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
