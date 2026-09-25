import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  Calculator, TrendingUp, DollarSign, Building, Percent, 
  ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, 
  HelpCircle, PieChart, Sparkles, Home, Calendar, 
  RefreshCw, MapPin, BarChart3, ChevronRight, Download, Coins, Printer
} from 'lucide-react';
import { InvestmentParams, InvestmentResult } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const InvestmentsPage: React.FC = () => {
  const { 
    listings, setActiveView, setFilters, 
    convertPrice, investmentPrefill, setInvestmentPrefill 
  } = useApp();
  const { locale } = useLocale();

  // Core Calculator Parameters
  const [purchasePrice, setPurchasePrice] = useState<number>(investmentPrefill?.price || 120000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30% standard
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(3.89); // 3.89% average mortgage rate
  const [rentalStrategy, setRentalStrategy] = useState<'long_term' | 'short_term_airbnb'>('long_term');
  
  // Long-Term parameters
  const [monthlyRent, setMonthlyRent] = useState<number>(650);
  const [occupancyRatePercentLongTerm, setOccupancyRatePercentLongTerm] = useState<number>(95);
  
  // Short-Term (Airbnb/Booking) parameters
  const [nightlyRate, setNightlyRate] = useState<number>(75);
  const [occupiedDaysPerYear, setOccupiedDaysPerYear] = useState<number>(160); // approx 44% yearly or summer concentrated
  
  // Expenses & Taxes
  const [monthlyMaintenance, setMonthlyMaintenance] = useState<number>(25); // HOA / mirëmbajtje
  const [managementFeePercent, setManagementFeePercent] = useState<number>(10); // 10% management
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(120); // standard municipal tax
  const [annualInsurance, setAnnualInsurance] = useState<number>(180);
  const [incomeTaxPercent, setIncomeTaxPercent] = useState<number>(10); // 10% legal rent tax in KS & AL
  const [appreciationRatePercent, setAppreciationRatePercent] = useState<number>(5.5); // 5.5% annual capital growth

  // Calculation Results
  const [results, setResults] = useState<InvestmentResult>({
    totalInitialInvestment: 0,
    loanAmount: 0,
    monthlyMortgagePayment: 0,
    annualGrossRentalIncome: 0,
    annualOperatingExpenses: 0,
    annualNetOperatingIncome: 0,
    annualCashFlow: 0,
    grossRentalYield: 0,
    netRentalYield: 0,
    capRate: 0,
    cashOnCashReturn: 0,
    projectedValue5Years: 0,
    projectedValue10Years: 0,
    totalEquityAccumulated10Years: 0
  });

  // Calculate whenever parameters change
  useEffect(() => {
    const downPaymentAmount = (purchasePrice * downPaymentPercent) / 100;
    const loanAmount = Math.max(0, purchasePrice - downPaymentAmount);
    
    // Monthly mortgage payment using standard amortization formula
    let monthlyMortgage = 0;
    if (loanAmount > 0 && interestRate > 0 && loanTermYears > 0) {
      const monthlyRate = interestRate / 100 / 12;
      const totalMonths = loanTermYears * 12;
      monthlyMortgage = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / 
                        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
    const annualDebtService = monthlyMortgage * 12;

    // Gross Rental Income
    let annualGross = 0;
    if (rentalStrategy === 'long_term') {
      const actualOccupiedMonths = (12 * occupancyRatePercentLongTerm) / 100;
      annualGross = monthlyRent * actualOccupiedMonths;
    } else {
      annualGross = nightlyRate * occupiedDaysPerYear;
    }

    // Operating Expenses
    const annualMaintenance = monthlyMaintenance * 12;
    const annualManagement = (annualGross * managementFeePercent) / 100;
    const annualIncomeTax = (annualGross * incomeTaxPercent) / 100;
    const annualOperatingExpenses = annualMaintenance + annualManagement + annualPropertyTax + annualInsurance + annualIncomeTax;

    // Net Operating Income (NOI) = Gross Income - Operating Expenses (before debt)
    const annualNOI = Math.max(0, annualGross - annualOperatingExpenses);

    // Cash Flow after Debt Service
    const annualCashFlow = annualNOI - annualDebtService;

    // Key Ratios
    const grossRentalYield = purchasePrice > 0 ? (annualGross / purchasePrice) * 100 : 0;
    const netRentalYield = purchasePrice > 0 ? (annualNOI / purchasePrice) * 100 : 0;
    const capRate = purchasePrice > 0 ? (annualNOI / purchasePrice) * 100 : 0;
    
    // Cash on Cash Return = (Annual Cash Flow / Total Initial Cash Invested) * 100
    // Initial cash invested = Down payment + estimated 2.5% closing/notary fees
    const closingCosts = purchasePrice * 0.025;
    const totalInitialCash = downPaymentAmount + closingCosts;
    const cashOnCashReturn = totalInitialCash > 0 ? (annualCashFlow / totalInitialCash) * 100 : 0;

    // Future Projections
    const projectedValue5Years = purchasePrice * Math.pow(1 + appreciationRatePercent / 100, 5);
    const projectedValue10Years = purchasePrice * Math.pow(1 + appreciationRatePercent / 100, 10);
    const totalEquityAccumulated10Years = (projectedValue10Years - purchasePrice) + (annualCashFlow * 10);

    setResults({
      totalInitialInvestment: Math.round(totalInitialCash),
      loanAmount: Math.round(loanAmount),
      monthlyMortgagePayment: Math.round(monthlyMortgage),
      annualGrossRentalIncome: Math.round(annualGross),
      annualOperatingExpenses: Math.round(annualOperatingExpenses),
      annualNetOperatingIncome: Math.round(annualNOI),
      annualCashFlow: Math.round(annualCashFlow),
      grossRentalYield: Number(grossRentalYield.toFixed(2)),
      netRentalYield: Number(netRentalYield.toFixed(2)),
      capRate: Number(capRate.toFixed(2)),
      cashOnCashReturn: Number(cashOnCashReturn.toFixed(2)),
      projectedValue5Years: Math.round(projectedValue5Years),
      projectedValue10Years: Math.round(projectedValue10Years),
      totalEquityAccumulated10Years: Math.round(totalEquityAccumulated10Years)
    });
  }, [
    purchasePrice, downPaymentPercent, loanTermYears, interestRate, 
    rentalStrategy, monthlyRent, occupancyRatePercentLongTerm, 
    nightlyRate, occupiedDaysPerYear, monthlyMaintenance, 
    managementFeePercent, annualPropertyTax, annualInsurance, 
    incomeTaxPercent, appreciationRatePercent
  ]);

  const handleApplyPreset = (type: 'prishtina_apartment' | 'tirana_center' | 'albanian_riviera' | 'brezovica_chalet') => {
    if (type === 'prishtina_apartment') {
      setPurchasePrice(95000);
      setRentalStrategy('long_term');
      setMonthlyRent(550);
      setOccupancyRatePercentLongTerm(95);
      setManagementFeePercent(10);
      setAppreciationRatePercent(5.8);
    } else if (type === 'tirana_center') {
      setPurchasePrice(165000);
      setRentalStrategy('long_term');
      setMonthlyRent(900);
      setOccupancyRatePercentLongTerm(95);
      setManagementFeePercent(10);
      setAppreciationRatePercent(6.5);
    } else if (type === 'albanian_riviera') {
      setPurchasePrice(130000);
      setRentalStrategy('short_term_airbnb');
      setNightlyRate(110);
      setOccupiedDaysPerYear(140);
      setManagementFeePercent(18);
      setAppreciationRatePercent(7.2);
    } else if (type === 'brezovica_chalet') {
      setPurchasePrice(115000);
      setRentalStrategy('short_term_airbnb');
      setNightlyRate(130);
      setOccupiedDaysPerYear(120);
      setManagementFeePercent(15);
      setAppreciationRatePercent(6.0);
    }
  };

  const investmentHotspots = [
    {
      name: 'Prishtinë (Mati 1 / Rruga A & C)',
      type: 'Qira Familjare & IT',
      avgPricePerSqm: '€1,150 - €1,350',
      avgGrossYield: '6.8% - 7.5%',
      airbnbPotential: 'Mesatare',
      appreciationRating: 'E Lartë (5.8%/vit)'
    },
    {
      name: 'Tiranë (Blloku / Liqeni / Don Bosko)',
      type: 'Ekspatë, Biznes & Turizëm',
      avgPricePerSqm: '€1,800 - €3,200',
      avgGrossYield: '6.5% - 8.2%',
      airbnbPotential: 'Shumë e Lartë',
      appreciationRating: 'Shumë e Lartë (6.5%/vit)'
    },
    {
      name: 'Vlorë & Lungomare',
      type: 'Sezonal & Bregdet',
      avgPricePerSqm: '€1,400 - €2,200',
      avgGrossYield: '8.5% - 11.2%',
      airbnbPotential: 'Ekskluzive (Verë)',
      appreciationRating: 'Në Rritje të Shpejtë (8.0%/vit)'
    },
    {
      name: 'Sarandë & Himarë / Palasë',
      type: 'Turizëm Luksoz & Qira Ditore',
      avgPricePerSqm: '€1,900 - €3,500',
      avgGrossYield: '9.0% - 12.5%',
      airbnbPotential: 'Maksimal',
      appreciationRating: 'Premium (7.5%/vit)'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24">
      
      {/* Hero Header - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
                <TrendingUp className="w-4 h-4 text-[#B89758]" />
                <span>Kalkulatori Profesional i Investimeve & Kthimit (ROI)</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white mb-4 leading-tight">
                Llogarit Kthimin e Investimit në <span className="text-[#DFBE89]">Patundshmëri</span>
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Analizoni kthimin financiar për qira mujore afatgjatë ose qira ditore (Airbnb/Booking), amortizimin e kredisë bankare, shpenzimet operative dhe rritjen e vlerës së kapitalit në Kosovë & Shqipëri.
              </p>
            </div>

            {/* Quick Prefill Presets */}
            <div className="bg-[#163324]/80 backdrop-blur-md p-4 rounded-2xl border border-[#2B543D] shrink-0">
              <div className="text-xs font-bold text-[#DFBE89] uppercase tracking-wider mb-2.5">
                Modele të Gatshme të Tregut:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('prishtina_apartment')}
                  className="px-3 py-2 rounded-xl bg-[#10241A]/70 hover:bg-[#B89758] hover:text-[#10241A] text-stone-200 text-xs font-bold transition-all text-left cursor-pointer border border-[#2B543D]"
                >
                  🏙️ Prishtinë (Rruga A)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('tirana_center')}
                  className="px-3 py-2 rounded-xl bg-[#10241A]/70 hover:bg-[#B89758] hover:text-[#10241A] text-stone-200 text-xs font-bold transition-all text-left cursor-pointer border border-[#2B543D]"
                >
                  🏛️ Tiranë Qendër
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('albanian_riviera')}
                  className="px-3 py-2 rounded-xl bg-[#10241A]/70 hover:bg-[#B89758] hover:text-[#10241A] text-stone-200 text-xs font-bold transition-all text-left cursor-pointer border border-[#2B543D]"
                >
                  🏖️ Rivierë (Vlorë/Sarandë)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('brezovica_chalet')}
                  className="px-3 py-2 rounded-xl bg-[#10241A]/70 hover:bg-[#B89758] hover:text-[#10241A] text-stone-200 text-xs font-bold transition-all text-left cursor-pointer border border-[#2B543D]"
                >
                  🏔️ Brezovicë / Malësi
                </button>
              </div>
            </div>

          </div>

          {investmentPrefill && (
            <div className="mt-6 p-4 rounded-2xl bg-[#163324] border border-[#2B543D] flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs text-[#DFBE89]">
                <CheckCircle2 className="w-4 h-4 text-[#DFBE89] shrink-0" />
                <span>Duke llogaritur parametrat për pronën e zgjedhur: <strong>{investmentPrefill.title} ({investmentPrefill.city})</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setInvestmentPrefill(null)}
                className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
              >
                Pastro
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Inputs (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Purchase & Financing */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#ECE7DE] shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif flex items-center justify-center font-bold text-xs border border-[#2B543D]">
                    1
                  </div>
                  <h2 className="text-base font-bold font-serif text-[#10241A]">
                    Blerja & Struktura e Financimit
                  </h2>
                </div>
                <span className="text-xs text-stone-500 font-medium">Çmimi & Kredia</span>
              </div>

              {/* Purchase Price */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-stone-700">
                    Çmimi i Blerjes së Pronës:
                  </label>
                  <span className="text-base font-extrabold font-serif text-[#10241A]">
                    {convertPrice(purchasePrice).formatted}
                  </span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={600000}
                  step={5000}
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full accent-[#142C20] h-2 bg-[#ECE7DE] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>{convertPrice(30000).formatted}</span>
                  <span>{convertPrice(300000).formatted}</span>
                  <span>{convertPrice(600000).formatted}+</span>
                </div>
              </div>

              {/* Down Payment & Loan Term Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Down payment % */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Paradhënia / Ekuiteti:
                  </label>
                  <select
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800 focus:outline-none focus:bg-white"
                  >
                    <option value={15}>15% (Min. Bankar)</option>
                    <option value={20}>20% Paradhënie</option>
                    <option value={30}>30% (Rekomanduar)</option>
                    <option value={50}>50% Paradhënie</option>
                    <option value={100}>100% (Para në Dorë)</option>
                  </select>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Afati i Kredisë:
                  </label>
                  <select
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    disabled={downPaymentPercent === 100}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800 focus:outline-none focus:bg-white disabled:bg-stone-100 disabled:text-stone-400"
                  >
                    <option value={10}>10 Vite</option>
                    <option value={15}>15 Vite</option>
                    <option value={20}>20 Vite (Standard)</option>
                    <option value={25}>25 Vite</option>
                    <option value={30}>30 Vite</option>
                  </select>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Norma e Interesit (%):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="2"
                    max="10"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    disabled={downPaymentPercent === 100}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800 focus:outline-none focus:bg-white disabled:bg-stone-100 disabled:text-stone-400"
                  />
                </div>

              </div>

            </div>

            {/* Step 2: Rental Strategy & Income */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#ECE7DE] shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif flex items-center justify-center font-bold text-xs border border-[#2B543D]">
                    2
                  </div>
                  <h2 className="text-base font-bold font-serif text-[#10241A]">
                    Strategjia e Qiradhënies & Të Ardhurat
                  </h2>
                </div>
                
                {/* Toggle Strategy */}
                <div className="inline-flex p-1 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE]">
                  <button
                    type="button"
                    onClick={() => setRentalStrategy('long_term')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      rentalStrategy === 'long_term'
                        ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Qira Mujore
                  </button>
                  <button
                    type="button"
                    onClick={() => setRentalStrategy('short_term_airbnb')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      rentalStrategy === 'short_term_airbnb'
                        ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Airbnb / Ditore
                  </button>
                </div>
              </div>

              {rentalStrategy === 'long_term' ? (
                /* Long Term Inputs */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-stone-700">
                        Qiraja Mujore e Pritur:
                      </label>
                      <span className="text-xs font-extrabold text-[#10241A]">
                        {convertPrice(monthlyRent).formatted}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={25}
                      min={100}
                      max={5000}
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-sm font-bold text-stone-900 focus:outline-none focus:bg-white"
                    />
                    <span className="text-[11px] text-stone-400 mt-1 block">Mesatare: {convertPrice(450).formatted} - {convertPrice(800).formatted}/muaj</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Shkalla e Zënies / Okupimit (%):
                    </label>
                    <select
                      value={occupancyRatePercentLongTerm}
                      onChange={(e) => setOccupancyRatePercentLongTerm(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800 focus:outline-none focus:bg-white"
                    >
                      <option value={100}>100% (12 muaj të plotë)</option>
                      <option value={95}>95% (11.4 muaj - Standard)</option>
                      <option value={90}>90% (10.8 muaj me vakancë)</option>
                      <option value={80}>80% (Konservatore)</option>
                    </select>
                  </div>
                </div>
              ) : (
                /* Short Term Airbnb Inputs */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-stone-700">
                        Çmimi Mesatar për Natë:
                      </label>
                      <span className="text-xs font-extrabold text-[#10241A]">
                        {convertPrice(nightlyRate).formatted} / natë
                      </span>
                    </div>
                    <input
                      type="number"
                      step={5}
                      min={20}
                      max={600}
                      value={nightlyRate}
                      onChange={(e) => setNightlyRate(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-sm font-bold text-stone-900 focus:outline-none focus:bg-white"
                    />
                    <span className="text-[11px] text-stone-400 mt-1 block">Bregdet: {convertPrice(80).formatted} - {convertPrice(150).formatted}/natë</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Netë të Zëna në Vit (Ditë):
                    </label>
                    <input
                      type="number"
                      step={10}
                      min={30}
                      max={330}
                      value={occupiedDaysPerYear}
                      onChange={(e) => setOccupiedDaysPerYear(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-sm font-bold text-stone-900 focus:outline-none focus:bg-white"
                    />
                    <span className="text-[11px] text-stone-400 mt-1 block">120 ditë verore ose 180 ditë urbane</span>
                  </div>
                </div>
              )}

            </div>

            {/* Step 3: Expenses, Management & Taxes */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#ECE7DE] shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] font-serif flex items-center justify-center font-bold text-xs border border-[#2B543D]">
                    3
                  </div>
                  <h2 className="text-base font-bold font-serif text-[#10241A]">
                    Shpenzimet Operative & Tatimet
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Mirëmbajtje / Hyrje (€/muaj):
                  </label>
                  <input
                    type="number"
                    value={monthlyMaintenance}
                    onChange={(e) => setMonthlyMaintenance(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Komision Menaxhimi (%):
                  </label>
                  <input
                    type="number"
                    value={managementFeePercent}
                    onChange={(e) => setManagementFeePercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Tatimi në Qira (%):
                  </label>
                  <input
                    type="number"
                    value={incomeTaxPercent}
                    onChange={(e) => setIncomeTaxPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Tatimi në Pronë (€/vit):
                  </label>
                  <input
                    type="number"
                    value={annualPropertyTax}
                    onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Sigurimi i Pronës (€/vit):
                  </label>
                  <input
                    type="number"
                    value={annualInsurance}
                    onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Rritja e Vlerës (%/vit):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={appreciationRatePercent}
                    onChange={(e) => setAppreciationRatePercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-xs font-bold text-stone-800"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: Financial Results & KPIs (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main KPI Card */}
            <div className="bg-gradient-to-br from-[#10241A] to-[#163324] text-white p-6 sm:p-7 rounded-3xl border border-[#2B543D] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles className="w-32 h-32 text-[#DFBE89]" />
              </div>

              <div className="relative z-10 space-y-6">
                
                <div className="flex items-center justify-between border-b border-[#2B543D] pb-4">
                  <div>
                    <span className="text-xs text-[#DFBE89] font-bold uppercase tracking-wider">
                      Performanca Financiare (ROI)
                    </span>
                    <h3 className="text-xl font-bold font-serif text-white mt-0.5">
                      Përmbledhja e Kthimit
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-bold font-serif">
                    {rentalStrategy === 'long_term' ? 'Qira Afatgjatë' : 'Qira Ditore'}
                  </div>
                </div>

                {/* Big Metric Display: Net Yield & Cash-on-Cash */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#142C20] border border-[#2B543D]">
                    <span className="text-xs text-stone-300 block mb-1">Gross Yield (Bruto)</span>
                    <div className="text-2xl sm:text-3xl font-black text-white font-serif">
                      {results.grossRentalYield}%
                    </div>
                    <span className="text-[10px] text-[#DFBE89] font-medium mt-1 block">Para shpenzimeve</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#142C20] border border-[#B89758]/50">
                    <span className="text-xs text-[#DFBE89] font-bold block mb-1">Net Yield (Cap Rate)</span>
                    <div className="text-2xl sm:text-3xl font-black text-[#DFBE89] font-serif">
                      {results.netRentalYield}%
                    </div>
                    <span className="text-[10px] text-stone-300 font-medium mt-1 block">Pas të gjitha zbritjeve</span>
                  </div>
                </div>

                {/* Cash on Cash & Monthly Flow */}
                <div className="p-4 rounded-2xl bg-[#142C20] border border-[#2B543D] space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-300">Kthimi mbi Paratë e Investuara (Cash-on-Cash):</span>
                    <span className="font-extrabold text-white">{results.cashOnCashReturn}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-300">Të Ardhurat Vjetore Bruto:</span>
                    <span className="font-bold text-white">{convertPrice(results.annualGrossRentalIncome).formatted}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-300">Shpenzimet Vjetore + Tatimet:</span>
                    <span className="font-bold text-rose-300">-{convertPrice(results.annualOperatingExpenses).formatted}</span>
                  </div>
                  {downPaymentPercent < 100 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-300">Kësti Mujor i Kredisë:</span>
                      <span className="font-bold text-[#DFBE89]">{convertPrice(results.monthlyMortgagePayment).formatted}/muaj</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#2B543D] flex justify-between items-center text-sm">
                    <span className="font-bold text-[#DFBE89]">Cash Flow Neto Vjetor:</span>
                    <span className={`font-black ${results.annualCashFlow >= 0 ? 'text-[#DFBE89]' : 'text-rose-300'}`}>
                      {results.annualCashFlow >= 0 ? '+' : ''}{convertPrice(results.annualCashFlow).formatted}
                    </span>
                  </div>
                </div>

                {/* 5 & 10 Year Wealth Accumulation Projection */}
                <div className="p-4 rounded-2xl bg-[#142C20]/90 border border-[#2B543D] space-y-2">
                  <div className="text-xs font-bold text-[#DFBE89] uppercase tracking-wider">
                    📈 Rritja e Pasurisë & Kapitalit (Projeksion)
                  </div>
                  <div className="flex justify-between text-xs text-stone-300 pt-1">
                    <span>Vlera e Pronës pas 5 Viteve (+{appreciationRatePercent}%/vit):</span>
                    <span className="font-bold text-white">{convertPrice(results.projectedValue5Years).formatted}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Vlera e Pronës pas 10 Viteve:</span>
                    <span className="font-bold text-[#DFBE89]">{convertPrice(results.projectedValue10Years).formatted}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Fitimi Total Neto (Qira + Vlerë 10V):</span>
                    <span className="font-black text-[#DFBE89]">{convertPrice(results.totalEquityAccumulated10Years).formatted}</span>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="space-y-3 pt-2">
                  <Button
                    variant="gold"
                    fullWidth
                    size="md"
                    onClick={() => {
                      setFilters(prev => ({ ...prev, minPrice: purchasePrice * 0.8, maxPrice: purchasePrice * 1.2 }));
                      setActiveView('search');
                    }}
                    icon={<Building className="w-4 h-4 text-[#10241A]" />}
                  >
                    Shiko Pronat me këtë Buxhet në Treg
                  </Button>

                  <Button
                    variant="secondary"
                    fullWidth
                    size="md"
                    onClick={() => setActiveView('financing')}
                    icon={<ArrowRight className="w-4 h-4 text-[#B89758]" />}
                    iconPosition="right"
                  >
                    Krahasoni Ofertat e Bankave për Kredi
                  </Button>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Hotspots Section */}
        <div className="mt-16 bg-white p-8 rounded-3xl border border-[#ECE7DE] shadow-xl">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
              <Coins className="w-3.5 h-3.5" />
              <span>Top Destinacionet e Investimit</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#10241A]">
              Zonat më Fitimprurëse për Investim në Kosovë & Shqipëri
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Krahasimi i kthimit mesatar bruto (Gross Yield) dhe kërkesës për qira sipas të dhënave të tregut 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {investmentHotspots.map((spot, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] hover:border-[#DFBE89] transition-all flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                    {spot.type}
                  </div>
                  <h4 className="text-base font-bold font-serif text-[#10241A] mb-3">{spot.name}</h4>
                  
                  <div className="space-y-2 text-xs text-stone-600 mb-4">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Çmimi / m²:</span>
                      <span className="font-bold text-stone-800">{spot.avgPricePerSqm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Gross Yield:</span>
                      <span className="font-extrabold text-[#0E6C38]">{spot.avgGrossYield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Airbnb:</span>
                      <span className="font-semibold text-stone-800">{spot.airbnbPotential}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const cityName = spot.name.includes('Prishtinë') ? 'Prishtinë' : 
                                     spot.name.includes('Tiranë') ? 'Tiranë' : 
                                     spot.name.includes('Vlorë') ? 'Vlorë' : 'Sarandë';
                    setFilters(prev => ({ ...prev, city: cityName }));
                    setActiveView('search');
                  }}
                  className="w-full py-2.5 rounded-xl bg-white border border-[#ECE7DE] hover:bg-[#10241A] hover:text-[#DFBE89] hover:border-[#10241A] text-[#10241A] text-xs font-bold transition-all text-center cursor-pointer shadow-2xs"
                >
                  Eksploro Pronat në Zonë →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
