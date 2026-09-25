import React, { useState, useMemo } from 'react';
import { Calculator, Percent, Calendar, ShieldCheck, CheckCircle2, ArrowRight, Building2 } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface MortgageCalculatorProps {
  initialPrice: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ initialPrice }) => {
  const { locale } = useLocale();
  const { currency, convertPrice } = useApp();
  
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice || 100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.2);
  const [appliedBank, setAppliedBank] = useState<string | null>(null);

  // Down payment amount
  const downPaymentAmount = useMemo(() => {
    return Math.round((propertyPrice * downPaymentPercent) / 100);
  }, [propertyPrice, downPaymentPercent]);

  // Loan amount
  const loanPrincipal = useMemo(() => {
    return Math.max(0, propertyPrice - downPaymentAmount);
  }, [propertyPrice, downPaymentAmount]);

  // Monthly installment calculation
  const { monthlyPayment, totalPayment, totalInterest } = useMemo(() => {
    if (loanPrincipal <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanYears * 12;

    if (monthlyRate === 0) {
      const payment = loanPrincipal / totalMonths;
      return { monthlyPayment: Math.round(payment), totalPayment: loanPrincipal, totalInterest: 0 };
    }

    const monthly = loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const total = monthly * totalMonths;
    const interest = total - loanPrincipal;

    return {
      monthlyPayment: Math.round(monthly),
      totalPayment: Math.round(total),
      totalInterest: Math.round(interest)
    };
  }, [loanPrincipal, interestRate, loanYears]);

  const principalPercent = totalPayment > 0 ? Math.round((loanPrincipal / totalPayment) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  const banks = [
    { name: 'BKT Bank', apr: '3.99% - 4.5%', note: 'Financim deri në 80% me afat deri në 25 vite' },
    { name: 'TEB Banka', apr: '4.10% - 4.8%', note: 'Procedurë e përshpejtuar për klientë me pagë' },
    { name: 'Raiffeisen Bank', apr: '4.20% - 4.9%', note: 'Mundësi për norma fikse në 5 vitet e para' },
    { name: 'NLB Banka', apr: '3.95% - 4.6%', note: 'Paketë speciale me sigurim prone të përfshirë' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#ECE7DE] p-6 sm:p-8 shadow-xs" id="mortgage-calculator">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#ECE7DE]">
        <div>
          <div className="flex items-center gap-2 text-[#947132] text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4 text-[#B89758]" />
            <span>Kalkulatori Financiar i Kredisë Hipotekare</span>
          </div>
          <h3 className="text-xl font-bold text-[#12291E] font-serif">
            Llogarit Këstin Mujor për këtë Pronë
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Vlerësim i përafërt sipas kushteve standarde bankare në Kosovë dhe Shqipëri ({currency})
          </p>
        </div>

        {/* Monthly Payment Hero Box */}
        <div className="bg-gradient-to-br from-[#10241A] to-[#163324] text-white p-4.5 rounded-2xl text-center sm:text-right shrink-0 border border-[#234F37] shadow-sm">
          <div className="text-[11px] text-[#DFBE89] font-semibold uppercase tracking-wider">Kësti Mujor i Vlerësuar</div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-0.5 tracking-tight font-serif">
            {convertPrice(monthlyPayment).formatted}
            <span className="text-xs font-normal text-stone-300 font-sans"> / muaj</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Property Price */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-[#12291E] mb-2">
              <span>Çmimi i Pronës</span>
              <span className="font-bold text-[#163324] text-sm">{convertPrice(propertyPrice).formatted}</span>
            </div>
            <input
              type="range"
              min={20000}
              max={1000000}
              step={5000}
              value={propertyPrice}
              onChange={e => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-[#FAF5EC] rounded-lg appearance-none cursor-pointer accent-[#163324]"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
              <span>{convertPrice(20000).formatted}</span>
              <span>{convertPrice(500000).formatted}</span>
              <span>{convertPrice(1000000).formatted}</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-[#12291E] mb-2">
              <span>Pjesëmarrja Vetjake ({downPaymentPercent}%)</span>
              <span className="font-bold text-[#947132] text-sm">{convertPrice(downPaymentAmount).formatted}</span>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[10, 20, 30, 40].map(pct => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    downPaymentPercent === pct
                      ? 'bg-[#163324] text-[#DFBE89] border-[#163324] shadow-xs'
                      : 'bg-[#FAF8F5] text-stone-700 border-[#ECE7DE] hover:bg-[#FAF5EC]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={downPaymentPercent}
              onChange={e => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-[#FAF5EC] rounded-lg appearance-none cursor-pointer accent-[#163324]"
            />
          </div>

          {/* Loan Term & Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Term */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#12291E] mb-2">
                <span>Afati i Kredisë</span>
                <span className="font-bold text-[#163324]">{loanYears} Vite</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={loanYears}
                onChange={e => setLoanYears(Number(e.target.value))}
                className="w-full h-2 bg-[#FAF5EC] rounded-lg appearance-none cursor-pointer accent-[#163324]"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>5 vite</span>
                <span>20 vite</span>
                <span>30 vite</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#12291E] mb-2">
                <span>Norma e Interesit</span>
                <span className="font-bold text-[#163324]">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={2.5}
                max={8.5}
                step={0.1}
                value={interestRate}
                onChange={e => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-[#FAF5EC] rounded-lg appearance-none cursor-pointer accent-[#163324]"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>2.5%</span>
                <span>4.5%</span>
                <span>8.5%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Breakdown & Summary (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-[#ECE7DE] flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase font-bold text-[#947132] tracking-wider mb-4">
              Përmbledhja e Financimit
            </div>

            <div className="space-y-3 text-xs mb-5">
              <div className="flex justify-between py-1.5 border-b border-[#ECE7DE]">
                <span className="text-stone-600">Shuma e Kredisë (Kryegjëja):</span>
                <span className="font-bold text-[#12291E]">{convertPrice(loanPrincipal).formatted}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#ECE7DE]">
                <span className="text-stone-600">Pjesëmarrja e Paguar:</span>
                <span className="font-bold text-[#12291E]">{convertPrice(downPaymentAmount).formatted}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#ECE7DE]">
                <span className="text-stone-600">Interesi Total Bankar:</span>
                <span className="font-bold text-[#947132]">{convertPrice(totalInterest).formatted}</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-bold border-t border-[#DFBE89]">
                <span className="text-[#12291E]">Kostoja Totale e Kthimit:</span>
                <span className="text-[#163324] font-black">{convertPrice(totalPayment).formatted}</span>
              </div>
            </div>

            {/* Visual Ratio Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-stone-500 mb-1.5 font-medium">
                <span>Kredia Bazë ({principalPercent}%)</span>
                <span>Interesi ({interestPercent}%)</span>
              </div>
              <div className="w-full h-3 bg-[#EADBBE] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#163324] transition-all duration-300"
                  style={{ width: `${principalPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3.5 border-t border-[#ECE7DE] text-[11px] text-stone-500 leading-relaxed flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B89758] shrink-0" />
            <span>Normat e interesit janë orientuese. Bankat partnere kryejnë vlerësim individual financiar.</span>
          </div>

        </div>

      </div>

      {/* Bank Partner Offers */}
      <div className="mt-8 pt-6 border-t border-[#ECE7DE]">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs uppercase font-bold text-[#947132] tracking-wider">
            Ofertat e Bankave Partnere për Financim
          </div>
          <span className="text-[11px] text-stone-400">Përditësuar për {new Date().getFullYear()}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {banks.map(bank => {
            const isSelected = appliedBank === bank.name;
            return (
              <div
                key={bank.name}
                className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#FAF5EC] border-[#B89758] shadow-xs' 
                    : 'bg-white border-[#ECE7DE] hover:border-[#DFBE89]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#12291E]">{bank.name}</span>
                    <Badge variant="gold" size="sm">
                      {bank.apr}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug mb-3">
                    {bank.note}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant={isSelected ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => setAppliedBank(isSelected ? null : bank.name)}
                >
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-[#DFBE89]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Kërkesa u Dërgua</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span>Apliko për Konsultë</span>
                      <ArrowRight className="w-3 h-3 text-[#B89758]" />
                    </span>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
