import React, { useState } from 'react';
import { calculateNotaryAndLegalFees } from '../utils/legalCalculator';
import { useApp } from '../context/AppContext';
import { 
  Scale, X, CheckCircle2, Info, Building2, 
  FileText, ShieldCheck, DollarSign, Copy, Check, Sparkles
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ModalShell } from './ui/ModalShell';

interface NotaryCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPrice?: number;
  defaultCountry?: 'Kosovo' | 'Albania';
}

export const NotaryCalculatorModal: React.FC<NotaryCalculatorModalProps> = ({
  isOpen,
  onClose,
  defaultPrice = 120000,
  defaultCountry = 'Kosovo'
}) => {
  const { convertPrice } = useApp();
  const [price, setPrice] = useState<number>(defaultPrice || 120000);
  const [country, setCountry] = useState<'Kosovo' | 'Albania'>(defaultCountry);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const estimate = calculateNotaryAndLegalFees(price, country);
  const costPercentage = price > 0 ? ((estimate.totalEstimatedCost / price) * 100).toFixed(2) : '0';

  const quickPresets = [50000, 85000, 120000, 180000, 250000, 400000];

  const handleCopySummary = () => {
    const text = `Llogaritja e Shpenzimeve Noteriale & Kadastrale (${country === 'Kosovo' ? 'Kosovë' : 'Shqipëri'}):
Çmimi i Pronës: ${convertPrice(price).formatted}
- Tarifa Noteriale: ${convertPrice(estimate.notaryFee).formatted}
- Taksa e Regjistrimit Kadastral: ${convertPrice(estimate.cadastralTax).formatted}
- Shpenzime Administrative: ${convertPrice(estimate.administrativeFee).formatted}
TOTALI I SHPENZIMEVE: ${convertPrice(estimate.totalEstimatedCost).formatted} (~${costPercentage}% e vlerës së pronës)
Llogaritur në PRONAT Platformë`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Kalkulatori Zyrtar Noterial & Kadastral"
      subtitle="Llogaritni saktë tarifat e aktit noterial dhe regjistrimit në AKK / ASHK"
      icon={<Scale className="w-5 h-5 text-[#DFBE89]" />}
      maxWidth="lg"
      headerTheme="dark"
    >
      <div className="space-y-5 text-xs">
        
        {/* Country Switcher */}
        <div>
          <label className="block text-xs font-bold text-[#10241A] mb-1.5 uppercase tracking-wider font-serif">
            Zgjidhni Shtetin e Transaksionit:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setCountry('Kosovo')}
              className={`py-3 px-4 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                country === 'Kosovo'
                  ? 'bg-[#FAF5EC] border-[#B89758] text-[#10241A] ring-1 ring-[#B89758]/30 shadow-2xs'
                  : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-600 hover:bg-[#F2ECE1]'
              }`}
            >
              <span>🇽🇰 Kosovë (Oda e Noterëve & AKK)</span>
            </button>

            <button
              type="button"
              onClick={() => setCountry('Albania')}
              className={`py-3 px-4 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                country === 'Albania'
                  ? 'bg-[#FAF5EC] border-[#B89758] text-[#10241A] ring-1 ring-[#B89758]/30 shadow-2xs'
                  : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-600 hover:bg-[#F2ECE1]'
              }`}
            >
              <span>🇦🇱 Shqipëri (Dhoma e Noterisë & ASHK)</span>
            </button>
          </div>
        </div>

        {/* Property Price Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#10241A] font-serif">
              Çmimi i Blerjes së Pronës:
            </label>
            <span className="text-sm font-extrabold font-serif text-[#10241A] bg-[#FAF5EC] px-3 py-0.5 rounded-full border border-[#E9DCBE]">
              {convertPrice(price).formatted}
            </span>
          </div>

          <div className="relative">
            <DollarSign className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              min="5000"
              step="5000"
              value={price || ''}
              onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
              className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-sm font-bold text-[#10241A] focus:outline-none focus:bg-white"
              placeholder="p.sh. 120,000"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-[11px] text-stone-400 self-center mr-1 font-medium">Të shpejta:</span>
            {quickPresets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrice(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  price === p
                    ? 'bg-[#10241A] text-[#DFBE89]'
                    : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-stone-700 border border-[#ECE7DE]'
                }`}
              >
                €{(p / 1000)}k
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Cost Breakdown Card */}
        <div className="bg-[#FAF8F5] border border-[#ECE7DE] rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#ECE7DE]">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#B89758]" />
              Tarifa e Noterit (Aktnoteriali & Përpilimi)
            </span>
            <span className="text-xs font-extrabold font-serif text-[#10241A]">
              {convertPrice(estimate.notaryFee).formatted}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-[#ECE7DE]">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#B89758]" />
              Taksa e Regjistrimit Kadastral ({country === 'Kosovo' ? 'AKK' : 'ASHK'})
            </span>
            <span className="text-xs font-extrabold font-serif text-[#10241A]">
              {convertPrice(estimate.cadastralTax).formatted}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-[#ECE7DE]">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B89758]" />
              Shpenzime Administrative & Pullat
            </span>
            <span className="text-xs font-extrabold font-serif text-[#10241A]">
              {convertPrice(estimate.administrativeFee).formatted}
            </span>
          </div>

          {/* Total Highlight */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#10241A] font-serif">
                Kostoja Totale e Mbylljes:
              </div>
              <div className="text-[11px] text-[#0E6C38] font-semibold">
                Përafërsisht {costPercentage}% e vlerës së patundshmërisë
              </div>
            </div>
            <div className="text-xl font-black font-serif text-[#10241A]">
              {convertPrice(estimate.totalEstimatedCost).formatted}
            </div>
          </div>
        </div>

        {/* Legal Notes & Safeguards */}
        <div className="bg-[#FAF5EC] border border-[#E9DCBE] rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-[#8B6E39] text-xs font-bold mb-2">
            <Info className="w-4 h-4 text-[#B89758]" />
            <span className="font-serif">Këshilla Ligjore Zyrtare:</span>
          </div>
          <ul className="space-y-1.5 text-[11px] text-stone-700 leading-relaxed">
            {estimate.notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6C38] mt-0.5 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopySummary}
            icon={copied ? <Check className="w-3.5 h-3.5 text-[#0E6C38]" /> : <Copy className="w-3.5 h-3.5 text-[#B89758]" />}
          >
            {copied ? 'U Kopjua në Clipboard!' : 'Kopjo Përmbledhjen'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            Mbyll
          </Button>
        </div>

      </div>
    </ModalShell>
  );
};
