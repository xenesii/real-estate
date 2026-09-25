import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  X, Check, ShieldCheck, UserCheck, Building, Sparkles, 
  DollarSign, Calendar, Users, Briefcase, FileText, ArrowRight,
  CheckCircle2, AlertCircle, Coins
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ModalShell } from './ui/ModalShell';

export const TenantApplicationModal: React.FC = () => {
  const { 
    isTenantApplicationModalOpen, 
    closeTenantApplicationModal, 
    tenantApplicationModalListing,
    submitTenantApplication,
    convertPrice,
    setActiveView
  } = useApp();
  const { locale } = useLocale();

  const listing = tenantApplicationModalListing;

  const [tenantName, setTenantName] = useState('Valbona Kelmendi');
  const [tenantEmail, setTenantEmail] = useState('valbona.kelmendi@gmail.com');
  const [tenantPhone, setTenantPhone] = useState('+383 49 333 444');
  const [employmentStatus, setEmploymentStatus] = useState<'employed' | 'self_employed' | 'student' | 'diaspora_income' | 'other'>('employed');
  const [employerName, setEmployerName] = useState('Raiffeisen Bank Kosova');
  const [monthlyIncome, setMonthlyIncome] = useState(1400);
  const [occupantsCount, setOccupantsCount] = useState(2);
  const [hasPets, setHasPets] = useState(false);
  const [moveInDate, setMoveInDate] = useState('2026-05-01');
  const [proposedLeaseMonths, setProposedLeaseMonths] = useState(12);

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isTenantApplicationModalOpen || !listing) return null;

  const rentPrice = listing.price || 500;
  const rentCoverageRatio = (monthlyIncome / rentPrice).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName || !tenantEmail || !tenantPhone) return;

    submitTenantApplication({
      listingId: listing.id,
      listingTitle: listing.titleSq,
      listingPrice: rentPrice,
      listingCover: listing.media[0]?.thumbnailUrl || listing.media[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      tenantName,
      tenantEmail,
      tenantPhone,
      employmentStatus,
      employerName,
      monthlyIncome,
      occupantsCount,
      hasPets,
      moveInDate,
      proposedLeaseMonths
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      closeTenantApplicationModal();
    }, 1800);
  };

  return (
    <ModalShell
      isOpen={isTenantApplicationModalOpen}
      onClose={closeTenantApplicationModal}
      title="Aplikim Dixhital për Qira (Tenant Application)"
      subtitle={`${listing.titleSq} • ${convertPrice(rentPrice).formatted} / muaj`}
      icon={<UserCheck className="w-5 h-5 text-[#DFBE89]" />}
      maxWidth="lg"
      headerTheme="dark"
    >
      {submittedSuccess ? (
        <div className="py-10 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-[#E8F8EE] border border-[#C2E8D0] text-[#0E6C38] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-serif text-[#10241A]">
            Aplikacioni u Dërgua me Sukses!
          </h3>
          <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
            Pronari dhe agjenti i pronës janë njoftuar me profilin tuaj të verifikuar. Do të kontaktoheni së shpejti në numrin {tenantPhone}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Quick Property & Rent Coverage Preview */}
          <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-[#8B6E39] uppercase tracking-wider block">Prona e Qirasë</span>
              <strong className="text-sm font-bold font-serif text-[#10241A] block">{listing.titleSq}</strong>
              <span className="text-stone-500 text-[11px]">{listing.location.neighborhood}, {listing.location.city}</span>
            </div>

            <div className="text-right sm:border-l sm:border-[#E9DCBE] sm:pl-4">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Qiraja Mujore</span>
              <span className="text-base font-extrabold font-serif text-[#10241A]">{convertPrice(rentPrice).formatted}</span>
              <span className="text-[10px] font-bold text-[#0E6C38] block mt-0.5">
                Mbulimi: {rentCoverageRatio}x të ardhurat
              </span>
            </div>
          </div>

          {/* Section 1: Tenant Personal Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#10241A] uppercase tracking-wider font-serif flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B89758]" />
              <span>1. Të Dhënat Personale të Aplikantit</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Emri dhe Mbiemri *</label>
                <input
                  type="text"
                  required
                  value={tenantName}
                  onChange={e => setTenantName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={tenantEmail}
                  onChange={e => setTenantEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Numri i Telefonit *</label>
                <input
                  type="tel"
                  required
                  value={tenantPhone}
                  onChange={e => setTenantPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Financial & Employment Screening */}
          <div className="space-y-3 pt-2 border-t border-[#ECE7DE]">
            <h4 className="font-bold text-[#10241A] uppercase tracking-wider font-serif flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#B89758]" />
              <span>2. Punësimi & Të Ardhurat Mujore (Screening)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Statusi i Punësimit</label>
                <select
                  value={employmentStatus}
                  onChange={e => setEmploymentStatus(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium focus:bg-white focus:outline-none"
                >
                  <option value="employed">I / E Punësuar me Kontratë</option>
                  <option value="self_employed">Biznes / Vetëpunësuar</option>
                  <option value="diaspora_income">Të Ardhura nga Diaspora 🇨🇭 🇩🇪</option>
                  <option value="student">Student / Mbështetje Familjare</option>
                  <option value="other">Tjetër</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Punëdhënësi / Kompania</label>
                <input
                  type="text"
                  placeholder="p.sh. Raiffeisen Bank"
                  value={employerName}
                  onChange={e => setEmployerName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Të Ardhurat Neto Mujore (€) *</label>
                <input
                  type="number"
                  required
                  step="50"
                  value={monthlyIncome}
                  onChange={e => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-extrabold focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Tenancy Details */}
          <div className="space-y-3 pt-2 border-t border-[#ECE7DE]">
            <h4 className="font-bold text-[#10241A] uppercase tracking-wider font-serif flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B89758]" />
              <span>3. Kushtet e Qëndrimit & Kohëzgjatja</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Numri i Banorëve</label>
                <select
                  value={occupantsCount}
                  onChange={e => setOccupantsCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium"
                >
                  <option value={1}>1 person (Vetëm)</option>
                  <option value={2}>2 persona (Çift / Shokë)</option>
                  <option value={3}>3 persona (Familje)</option>
                  <option value={4}>4+ persona</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Kafshë Shtëpiake</label>
                <select
                  value={hasPets ? 'yes' : 'no'}
                  onChange={e => setHasPets(e.target.value === 'yes')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium"
                >
                  <option value="no">Jo, nuk kam kafshë</option>
                  <option value="yes">Po, kam qen/mace</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Data e Hyrjes</label>
                <input
                  type="date"
                  value={moveInDate}
                  onChange={e => setMoveInDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Periudha (Muaj)</label>
                <select
                  value={proposedLeaseMonths}
                  onChange={e => setProposedLeaseMonths(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] font-medium"
                >
                  <option value={6}>6 muaj</option>
                  <option value={12}>12 muaj (1 vit standard)</option>
                  <option value={24}>24 muaj (2 vite)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Screening Trust Guarantee Box */}
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] flex items-center gap-2.5 text-stone-600">
            <ShieldCheck className="w-5 h-5 text-[#0E6C38] shrink-0" />
            <p className="text-[11px] leading-snug">
              Të dhënat tuaja trajtohen me konfidencialitet të plotë sipas Ligjit për Mbrojtjen e të Dhënave Personale dhe i dorëzohen vetëm pronarit të verifikuar.
            </p>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={closeTenantApplicationModal}
            >
              Anulo
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={<Check className="w-4 h-4 text-[#DFBE89]" />}
            >
              Dërgo Aplikacionin për Qira
            </Button>
          </div>
        </form>
      )}
    </ModalShell>
  );
};
