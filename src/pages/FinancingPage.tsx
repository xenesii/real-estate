import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BankOffer } from '../types';
import { 
  Building2, Calculator, Percent, Clock, ShieldCheck, 
  HelpCircle, ArrowRight, CheckCircle2, AlertCircle, Phone, 
  Mail, ExternalLink, Check, Sparkles, X, Send, Coins, FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ModalShell } from '../components/ui/ModalShell';

export const FinancingPage: React.FC = () => {
  const { bankOffers, convertPrice } = useApp();

  // Country filter for banks
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'Kosovo' | 'Albania'>('all');

  // Calculator State
  const [propertyPrice, setPropertyPrice] = useState<number>(120000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(3.89);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(1800);

  // Modal State for Bank Pre-Approval Application
  const [selectedBank, setSelectedBank] = useState<BankOffer | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicantData, setApplicantData] = useState({
    name: '',
    phone: '',
    email: '',
    employmentStatus: 'I Punësuar me Kontratë të Rregullt',
    residence: 'Kosovë',
    notes: ''
  });

  // Calculate Loan Parameters
  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const loanPrincipal = Math.max(0, propertyPrice - downPaymentAmount);
  
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyInstallment = loanPrincipal > 0 && monthlyRate > 0 && totalMonths > 0
    ? Math.round((loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
    : 0;

  const totalRepayment = monthlyInstallment * totalMonths;
  const totalInterest = Math.max(0, totalRepayment - loanPrincipal);

  // Debt-to-Income (DTI) Ratio check
  const dtiRatio = monthlyIncome > 0 ? Math.round((monthlyInstallment / monthlyIncome) * 100) : 0;

  const filteredBanks = bankOffers.filter(bank => {
    if (selectedCountry === 'all') return true;
    return bank.country === selectedCountry;
  });

  const handleOpenBankApply = (bank: BankOffer) => {
    setSelectedBank(bank);
    setApplicationSubmitted(false);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantData.name || !applicantData.phone) return;
    setApplicationSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24">
      
      {/* Header Banner - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
              <Calculator className="w-4 h-4 text-[#B89758]" />
              <span>Qendra e Financimit & Kredive Hipotekare</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white mb-4 leading-tight">
              Krahasoni Ofertat e Bankave për <span className="text-[#DFBE89]">Blerjen e Shtëpisë</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Gjeni kushtet më të favorshme për kredi banesore në Kosovë dhe Shqipëri. Normat reale të interesit duke filluar nga 3.79%, afate kthimi deri në 30 vite dhe financim deri në 85%.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* Interactive Loan Simulator */}
        <div className="bg-white rounded-3xl border border-[#ECE7DE] shadow-xl p-6 sm:p-10 mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#ECE7DE] gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Llogaritësi Inteligjent i Kredisë</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#10241A]">
                Simuloni Këstin Mujor dhe Aftësinë Paguese
              </h2>
            </div>
            
            <div className="px-4 py-2 bg-[#FAF8F5] border border-[#ECE7DE] rounded-2xl flex items-center gap-2 text-xs font-semibold text-stone-700">
              <Coins className="w-4 h-4 text-[#B89758]" />
              <span>Norma mesatare e tregut: <strong className="text-[#10241A]">3.89% - 4.50%</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Input Sliders & Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Property Price */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-2">
                  <span>Çmimi i Pronës:</span>
                  <span className="text-base font-extrabold font-serif text-[#10241A]">
                    {convertPrice(propertyPrice).formatted}
                  </span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={600000}
                  step={5000}
                  value={propertyPrice}
                  onChange={e => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2 bg-[#ECE7DE] rounded-lg appearance-none cursor-pointer accent-[#142C20]"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>{convertPrice(30000).formatted}</span>
                  <span>{convertPrice(300000).formatted}</span>
                  <span>{convertPrice(600000).formatted}</span>
                </div>
              </div>

              {/* Down Payment % */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-2">
                  <span>Pagesa Fillestare (Kësti i parë):</span>
                  <span className="text-base font-extrabold font-serif text-[#10241A]">
                    {downPaymentPercent}% ({convertPrice(downPaymentAmount).formatted})
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={e => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-[#ECE7DE] rounded-lg appearance-none cursor-pointer accent-[#142C20]"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>10% (Minimi ligjor)</span>
                  <span>20% (Standard)</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Loan Term & Interest Rate Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Kohëzgjatja e Kredisë (Vite):
                  </label>
                  <select
                    value={loanTermYears}
                    onChange={e => setLoanTermYears(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-bold text-stone-800 focus:bg-white focus:outline-none"
                  >
                    <option value={5}>5 Vite (60 muaj)</option>
                    <option value={10}>10 Vite (120 muaj)</option>
                    <option value={15}>15 Vite (180 muaj)</option>
                    <option value={20}>20 Vite (240 muaj)</option>
                    <option value={25}>25 Vite (300 muaj)</option>
                    <option value={30}>30 Vite (360 muaj)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Norma e Interesit (% Vjetore):
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="2.5"
                    max="10"
                    value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-bold text-stone-800 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Monthly Income for DTI Check */}
              <div className="pt-2 border-t border-[#ECE7DE]">
                <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-2">
                  <span>Të Ardhurat Mujore Familjare Neto:</span>
                  <span className="text-sm font-extrabold text-[#10241A]">
                    {convertPrice(monthlyIncome).formatted} / muaj
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={8000}
                  step={100}
                  value={monthlyIncome}
                  onChange={e => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2 bg-[#ECE7DE] rounded-lg appearance-none cursor-pointer accent-[#142C20]"
                />
              </div>

            </div>

            {/* Results Presentation Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#10241A] to-[#163324] rounded-2xl p-6 sm:p-7 text-white border border-[#2B543D] shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#DFBE89] font-bold block mb-1">
                  Kësti i Përllogaritur Mujor
                </span>
                <div className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight mb-4">
                  {convertPrice(monthlyInstallment).formatted} <span className="text-sm font-normal text-stone-300">/ muaj</span>
                </div>

                {/* DTI Gauge */}
                <div className="p-3.5 rounded-xl bg-[#142C20] border border-[#2B543D] mb-5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-300">Aftësia Paguese (DTI):</span>
                    <strong className={dtiRatio <= 40 ? 'text-[#DFBE89]' : 'text-amber-400'}>
                      {dtiRatio}% e të ardhurave
                    </strong>
                  </div>
                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        dtiRatio <= 35 ? 'bg-[#0E6C38]' : dtiRatio <= 50 ? 'bg-[#DFBE89]' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, dtiRatio)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1.5 leading-snug">
                    {dtiRatio <= 40
                      ? '✓ E shkëlqyer. Plotësoni standardet e shumicës së bankave pa nevojë për garantues.'
                      : '⚠️ Kësti tejkalon 40% të pagës. Banka mund të kërkojë bashkë-huamarrës ose këst fillestar më të lartë.'}
                  </p>
                </div>

                {/* Parameter summary */}
                <div className="space-y-2 text-xs text-stone-300 border-t border-[#2B543D] pt-3">
                  <div className="flex justify-between">
                    <span>Shuma e Kredisë (Principal):</span>
                    <strong className="text-white">{convertPrice(loanPrincipal).formatted}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interesi gjatë {loanTermYears} viteve:</span>
                    <strong className="text-white">{convertPrice(totalInterest).formatted}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Pagesa (Principal + Interes):</span>
                    <strong className="text-[#DFBE89]">{convertPrice(totalRepayment).formatted}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3">
                <Button
                  variant="gold"
                  fullWidth
                  size="md"
                  onClick={() => {
                    const el = document.getElementById('banks-comparison-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  icon={<ArrowRight className="w-4 h-4 text-[#10241A]" />}
                  iconPosition="right"
                >
                  Krahaso Ofertat e Bankave
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Bank Comparison Table */}
        <div id="banks-comparison-section" className="bg-white rounded-3xl border border-[#ECE7DE] shadow-2xs overflow-hidden mb-14">
          <div className="p-6 sm:p-8 border-b border-[#ECE7DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Partnerët Bankarë Zyrtarë</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#10241A]">
                Ofertat Aktuale të Bankave Partnere (2026)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Kushtet reale të financimit të përditësuara për blerës vendorë dhe nga diaspora
              </p>
            </div>

            {/* Country filter tabs */}
            <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#ECE7DE] text-xs">
              <button
                type="button"
                onClick={() => setSelectedCountry('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedCountry === 'all'
                    ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Të Gjitha
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('Kosovo')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedCountry === 'Kosovo'
                    ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Kosovë 🇽🇰
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('Albania')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedCountry === 'Albania'
                    ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Shqipëri 🇦🇱
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-stone-500 uppercase tracking-wider font-semibold border-b border-[#ECE7DE]">
                <tr>
                  <th className="py-4 px-6">Banka Partnere</th>
                  <th className="py-4 px-6">Norma e Interesit</th>
                  <th className="py-4 px-6">Afati Maksimal</th>
                  <th className="py-4 px-6">Financim deri në</th>
                  <th className="py-4 px-6">Koha e Përgjigjes</th>
                  <th className="py-4 px-6">Për Diasporën</th>
                  <th className="py-4 px-6 text-right">Aplikim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE7DE] font-medium text-stone-700">
                {filteredBanks.map(bank => (
                  <tr key={bank.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={bank.logo}
                          alt={bank.bankName}
                          className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-[#ECE7DE]"
                        />
                        <div>
                          <div className="font-bold font-serif text-sm text-[#10241A]">{bank.bankName}</div>
                          <div className="text-[11px] text-stone-400">
                            {bank.country === 'Kosovo' ? 'Kosovë 🇽🇰' : 'Shqipëri 🇦🇱'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-sm font-extrabold text-[#10241A]">
                        {bank.fixedPeriodYears > 0 ? `${bank.minInterestRate}% (${bank.fixedPeriodYears}v Fikse)` : `${bank.minInterestRate}% - ${bank.maxInterestRate}%`}
                      </div>
                      <div className="text-[10px] text-stone-400">Normë efektive vjetore</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-[#10241A]">{bank.maxTermYears} Vite</div>
                      <div className="text-[10px] text-stone-400">deri në {bank.maxTermYears * 12} këste</div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE]">
                        Deri {bank.maxFinancingPercent}%
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="flex items-center gap-1 text-stone-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        Tarifa: {bank.administrativeFeePercent}%
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-[#0E6C38] font-bold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {bank.earlyRepaymentFee || 'Kushte të Përshtatshme'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleOpenBankApply(bank)}
                      >
                        Apliko për Paramiratim
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guidance for Domestic vs Diaspora Applicants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-7 shadow-2xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-[#10241A]">Kushtet për Punonjësit Rezidentë</h3>
                <p className="text-xs text-stone-500">Për blerësit e punësuar në Kosovë apo Shqipëri</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                <span>Kontratë e rregullt pune me kohë të pacaktuar (së paku 6 muaj tek punëdhënësi aktual).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                <span>Pasqyra e llogarisë bankare të pagës për 6-12 muajt e fundit dhe vërtetimi nga Trusti / Sigurimet.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                <span>Kësti mujor nuk mund të kalojë 50% të të ardhurave të dëshmuara neto të familjes.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-7 shadow-2xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-[#10241A]">Kushtet për Huamarrësit nga Diaspora</h3>
                <p className="text-xs text-stone-500">Për mërgatën në Zvicër, Gjermani, Austri dhe BE</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                <span>Leje qëndrimi e vlefshme (p.sh. Permit C / B në Zvicër ose Aufenthaltstitel në BE).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                <span>Dëshmi nga regjistri i borxheve (Betreibungsauszug në Zvicër ose Schufa në Gjermani).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                <span>3 fletëpagesat e fundit (Lohnabrechnung) dhe deklarata tatimore vjetore.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Pre-Approval Application Modal */}
      {selectedBank && (
        <ModalShell
          isOpen={!!selectedBank}
          onClose={() => setSelectedBank(null)}
          title={`Apliko për Paramiratim Kredie`}
          subtitle={`${selectedBank.bankName} • ${selectedBank.country === 'Kosovo' ? 'Kosovë' : 'Shqipëri'}`}
          icon={<Calculator className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="md"
          headerTheme="dark"
        >
          {applicationSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#FAF5EC] text-[#B89758] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E9DCBE]">
                <CheckCircle2 className="w-8 h-8 text-[#B89758]" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#10241A] mb-1">
                Kërkesa për Paramiratim u Dërgua!
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                Oficeri i kredive nga {selectedBank.bankName} do t&apos;ju kontaktojë brenda 24-48 orëve me vlerësimin paraprak të kredisë.
              </p>
              <Button
                variant="primary"
                onClick={() => setSelectedBank(null)}
                fullWidth
              >
                Në Rregull
              </Button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] text-xs text-stone-700 flex justify-between items-center">
                <span>Shuma e synuar e kredisë:</span>
                <strong className="text-[#10241A] font-bold font-serif text-sm">
                  {convertPrice(loanPrincipal).formatted} ({loanTermYears} vite)
                </strong>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Emri dhe Mbiemri:
                </label>
                <input
                  type="text"
                  required
                  placeholder="p.sh. Valon Berisha"
                  value={applicantData.name}
                  onChange={e => setApplicantData({ ...applicantData, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Numri i Telefonit:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+383 44... ose +41..."
                    value={applicantData.phone}
                    onChange={e => setApplicantData({ ...applicantData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Adresa:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@adresa.com"
                    value={applicantData.email}
                    onChange={e => setApplicantData({ ...applicantData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Statusi i Punësimit:
                  </label>
                  <select
                    value={applicantData.employmentStatus}
                    onChange={e => setApplicantData({ ...applicantData, employmentStatus: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800 focus:bg-white focus:outline-none"
                  >
                    <option value="I Punësuar me Kontratë të Rregullt">Kontratë e Rregullt (Vendor)</option>
                    <option value="I Punësuar në Diasporë">Punësuar në Diasporë (CH/BE/SHBA)</option>
                    <option value="Biznes Privat / Pronar">Biznes Privat / Vetëpunësuar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Vendi i Vendbanimit:
                  </label>
                  <select
                    value={applicantData.residence}
                    onChange={e => setApplicantData({ ...applicantData, residence: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-800 focus:bg-white focus:outline-none"
                  >
                    <option value="Kosovë">Kosovë 🇽🇰</option>
                    <option value="Shqipëri">Shqipëri 🇦🇱</option>
                    <option value="Zvicër">Zvicër 🇨🇭</option>
                    <option value="Gjermani">Gjermani 🇩🇪</option>
                    <option value="Tjetër">Shtet tjetër</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Shënime Shtesë (opsionale):
                </label>
                <textarea
                  rows={2}
                  placeholder="Informata mbi pronën që synoni të blini..."
                  value={applicantData.notes}
                  onChange={e => setApplicantData({ ...applicantData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  fullWidth
                  icon={<Send className="w-4 h-4 text-[#10241A]" />}
                >
                  Dërgo Kërkesën për Paramiratim
                </Button>
                <p className="text-[11px] text-stone-400 text-center mt-2">
                  Aplikimi është falas dhe nuk ka detyrim kontraktual me bankën.
                </p>
              </div>
            </form>
          )}
        </ModalShell>
      )}

    </div>
  );
};
