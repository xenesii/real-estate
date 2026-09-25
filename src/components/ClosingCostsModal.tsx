import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  X, ShieldCheck, Scale, Calculator, Printer, CheckCircle2, 
  HelpCircle, AlertCircle, FileText, Landmark, ArrowRight,
  Info, Download, Coins
} from 'lucide-react';
import { ClosingCostBreakdown } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ModalShell } from './ui/ModalShell';

export const ClosingCostsModal: React.FC = () => {
  const { isClosingCostsOpen, closeClosingCosts, closingCostsPrice, currency, convertPrice } = useApp();
  const { locale } = useLocale();

  const [price, setPrice] = useState<number>(closingCostsPrice || 120000);
  const [country, setCountry] = useState<'Kosovo' | 'Albania'>('Kosovo');
  const [isFirstHome, setIsFirstHome] = useState(true);
  const [isNewConstruction, setIsNewConstruction] = useState(false);
  const [hasMortgage, setHasMortgage] = useState(true);
  const [legalAssistance, setLegalAssistance] = useState(true);

  if (!isClosingCostsOpen) return null;

  // Official Notary & Cadastral calculation rules for Kosovo & Albania
  const calculateCosts = (): ClosingCostBreakdown => {
    let notaryContractFee = 0;
    let cadastralRegistrationFee = 0;
    let municipalStampDuty = 0;
    let titleDeedVerificationFee = 25; // standard notary registry check
    let bankMortgagePledgeFee = hasMortgage ? (country === 'Kosovo' ? 150 : 180) : 0;
    let legalDueDiligenceFee = legalAssistance ? 250 : 0;

    if (country === 'Kosovo') {
      // Kosovo Official Notary Tariff (Administrative Instruction No. 02/2015)
      if (price <= 10000) notaryContractFee = 60;
      else if (price <= 25000) notaryContractFee = 120;
      else if (price <= 50000) notaryContractFee = 200;
      else if (price <= 100000) notaryContractFee = 350;
      else if (price <= 250000) notaryContractFee = 500;
      else if (price <= 500000) notaryContractFee = 750;
      else notaryContractFee = 1000;

      // Kosovo Cadastral Agency (AKK) Registration Fee
      cadastralRegistrationFee = Math.max(50, Math.round(price * 0.0015)); // approx 0.15% (min €50, max €300)
      if (cadastralRegistrationFee > 300) cadastralRegistrationFee = 300;

      // Municipal Administrative Stamp & Verification
      municipalStampDuty = 35;
    } else {
      // Albania (Udhëzimi i Përbashkët për Tarifat Noteriale)
      if (price <= 20000) notaryContractFee = 100;
      else if (price <= 50000) notaryContractFee = 250;
      else if (price <= 100000) notaryContractFee = 450;
      else if (price <= 250000) notaryContractFee = 700;
      else notaryContractFee = 1100;

      // ASHK (Agjencia Shtetërore e Kadastrës) Registration Tax
      cadastralRegistrationFee = Math.round(price * 0.002); // ~0.20%
      municipalStampDuty = 40;
    }

    // Annual Property Tax estimate (approx 0.05% - 0.15% depending on zone)
    const propertyTaxAnnual = Math.round(price * 0.0008);

    const totalClosingCost = 
      notaryContractFee + 
      cadastralRegistrationFee + 
      municipalStampDuty + 
      titleDeedVerificationFee + 
      bankMortgagePledgeFee + 
      legalDueDiligenceFee;

    const effectivePercent = Number(((totalClosingCost / price) * 100).toFixed(2));

    const legalChecklist = [
      {
        title: 'Verifikimi i Fletës Poseduese (Certifikata e Pronësisë)',
        desc: 'Konfirmimi i pronarit të ligjshëm dhe vërtetimi që prona nuk ka barrë hipotekare, sekuestro apo kontest gjyqësor.',
        mandatory: true
      },
      {
        title: 'Kopja e Planit Kadastral & Koordinatat Gjeodezike',
        desc: 'Verifikimi i kufijve të parcelës dhe sipërfaqes së saktë në metra katrorë.',
        mandatory: true
      },
      {
        title: 'Vërtetimi mbi Pagesën e Taksës në Pronë nga Komuna',
        desc: 'Dokument që vërteton se shitësi nuk ka borxhe të prapambetura të tatimit në pronë.',
        mandatory: true
      },
      {
        title: 'Pëlqimi Bashkëshortor (nëse prona është blerë gjatë martesës)',
        desc: 'Nënshkrimi i bashkëshortit/es për shitjen sipas Ligjit mbi Familjen.',
        mandatory: true
      },
      {
        title: 'Leja e Ndërtimit dhe Pranimi Teknik (për ndërtime të reja)',
        desc: 'Për ndërtimet e reja, kërkoni aktin e pranimit teknik para regjistrimit përfundimtar.',
        mandatory: isNewConstruction
      }
    ];

    return {
      propertyPrice: price,
      country,
      isFirstHomeBuyer: isFirstHome,
      isNewConstruction,
      hasMortgage,
      notaryContractFee,
      cadastralRegistrationFee,
      municipalStampDuty,
      titleDeedVerificationFee,
      propertyTaxAnnual,
      bankMortgagePledgeFee,
      legalDueDiligenceFee,
      totalClosingCost,
      effectivePercent,
      legalChecklist
    };
  };

  const costs = calculateCosts();

  const handlePrint = () => {
    window.print();
  };

  return (
    <ModalShell
      isOpen={isClosingCostsOpen}
      onClose={closeClosingCosts}
      title="Llogaritësi i Shpenzimeve të Noterit & Kadastrës"
      subtitle={`Tarifat zyrtare të Ministrisë së Drejtësisë & Agjencisë Kadastrale (${country === 'Kosovo' ? 'Kosovë' : 'Shqipëri'})`}
      icon={<Scale className="w-5 h-5 text-[#DFBE89]" />}
      maxWidth="xl"
      headerTheme="dark"
    >
      <div className="space-y-6">
        
        {/* Controls Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF8F5] p-5 rounded-2xl border border-[#ECE7DE]">
          
          {/* Price Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Çmimi i Blerjes së Pronës
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Math.max(1000, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE7DE] bg-white font-bold text-[#10241A] focus:outline-none focus:ring-1 focus:ring-[#10241A] text-sm"
              step="5000"
            />
            <span className="text-[11px] text-stone-500 mt-1 block">
              {convertPrice(price).formatted}
            </span>
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Juridiksioni Ligjor
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCountry('Kosovo')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  country === 'Kosovo' 
                    ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs' 
                    : 'bg-white text-stone-700 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
                }`}
              >
                🇽🇰 Kosovë
              </button>
              <button
                type="button"
                onClick={() => setCountry('Albania')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  country === 'Albania' 
                    ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs' 
                    : 'bg-white text-stone-700 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
                }`}
              >
                🇦🇱 Shqipëri
              </button>
            </div>
          </div>

          {/* Options Checkboxes */}
          <div className="flex flex-col justify-center gap-2 pt-1 text-xs text-stone-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasMortgage}
                onChange={(e) => setHasMortgage(e.target.checked)}
                className="rounded text-[#10241A] focus:ring-[#10241A] w-4 h-4 accent-[#10241A]"
              />
              <span className="font-semibold text-[#10241A]">Blerje me Kredi Bankare (Hipotekë)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isNewConstruction}
                onChange={(e) => setIsNewConstruction(e.target.checked)}
                className="rounded text-[#10241A] focus:ring-[#10241A] w-4 h-4 accent-[#10241A]"
              />
              <span className="font-semibold text-[#10241A]">Ndërtim i Ri (nga Ndërtuesi)</span>
            </label>
          </div>
        </div>

        {/* Results Summary Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE]">
            <span className="text-[11px] font-bold text-[#8B6E39] uppercase tracking-wider">Total Shpenzime Mbyllëse</span>
            <div className="text-2xl sm:text-3xl font-black text-[#10241A] mt-1 font-serif">
              {convertPrice(costs.totalClosingCost).formatted}
            </div>
            <span className="text-xs text-[#0E6C38] font-bold mt-1 block">
              ≈ {costs.effectivePercent}% e vlerës së pronës
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE]">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Tarifa e Noterit (Akt Noterial)</span>
            <div className="text-2xl font-bold font-serif text-[#10241A] mt-1">
              {convertPrice(costs.notaryContractFee).formatted}
            </div>
            <span className="text-xs text-stone-500 mt-1 block">
              Përfshin hartimin e kontratës dhe solemnizimin
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE]">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Regjistrimi në Kadastër</span>
            <div className="text-2xl font-bold font-serif text-[#10241A] mt-1">
              {convertPrice(costs.cadastralRegistrationFee).formatted}
            </div>
            <span className="text-xs text-stone-500 mt-1 block">
              Bartja e pronësisë në emër të blerësit
            </span>
          </div>
        </div>

        {/* Detailed Line-by-Line Breakdown Table */}
        <div className="bg-white rounded-2xl border border-[#ECE7DE] overflow-hidden shadow-2xs">
          <div className="p-4 bg-[#FAF8F5] border-b border-[#ECE7DE] flex items-center justify-between">
            <h3 className="text-xs font-bold font-serif text-[#10241A] uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#B89758]" />
              <span>Ndarja e Hollësishme e Shpenzimeve Zyrtare</span>
            </h3>
            <Badge variant="verified" size="xs">Transaksion Shitblerje</Badge>
          </div>

          <div className="divide-y divide-[#ECE7DE] text-xs sm:text-sm">
            <div className="p-4 flex items-center justify-between">
              <div>
                <strong className="text-[#10241A]">Tarifa e Kontratës Noteriale të Shitblerjes</strong>
                <p className="text-xs text-stone-500">Sipas shkallës zyrtare të vlerës ({convertPrice(price).formatted})</p>
              </div>
              <span className="font-bold text-[#10241A]">{convertPrice(costs.notaryContractFee).formatted}</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <strong className="text-[#10241A]">Taksa Kadastrale e Regjistrimit të Pronësisë</strong>
                <p className="text-xs text-stone-500">Agjencia Kadastrale e Kosovës (AKK) / ASHK Shqipëri</p>
              </div>
              <span className="font-bold text-[#10241A]">{convertPrice(costs.cadastralRegistrationFee).formatted}</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <strong className="text-[#10241A]">Verifikimi Paraprak i Titullit & Barrës Hipotekare</strong>
                <p className="text-xs text-stone-500">Kontrolli i regjistrit të pengjeve dhe fletës poseduese</p>
              </div>
              <span className="font-bold text-[#10241A]">{convertPrice(costs.titleDeedVerificationFee).formatted}</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <strong className="text-[#10241A]">Pullat Komunale & Tarifat Administrative</strong>
                <p className="text-xs text-stone-500">Vulosja e dokumenteve dhe certifikimi i pagesave komunale</p>
              </div>
              <span className="font-bold text-[#10241A]">{convertPrice(costs.municipalStampDuty).formatted}</span>
            </div>

            {hasMortgage && (
              <div className="p-4 flex items-center justify-between bg-[#FAF5EC]/70">
                <div>
                  <strong className="text-[#10241A]">Akti Noterial i Vendosjes së Hipotekës Bankare</strong>
                  <p className="text-xs text-stone-500">Regjistrimi i kolateralit në favor të bankës kredituese</p>
                </div>
                <span className="font-bold text-[#8B6E39]">{convertPrice(costs.bankMortgagePledgeFee).formatted}</span>
              </div>
            )}

            {legalAssistance && (
              <div className="p-4 flex items-center justify-between">
                <div>
                  <strong className="text-[#10241A]">Asistenca Ligjore / Due Diligence</strong>
                  <p className="text-xs text-stone-500">Rishikimi i kontratës nga jurist/avokat i licencuar i patundshmërive</p>
                </div>
                <span className="font-bold text-[#10241A]">{convertPrice(costs.legalDueDiligenceFee).formatted}</span>
              </div>
            )}

            <div className="p-4 flex items-center justify-between bg-[#FAF8F5] font-bold text-sm sm:text-base">
              <span className="text-[#10241A] font-serif uppercase tracking-wider">TOTALI PËRFUNDIMTAR PËR PAGESË</span>
              <span className="text-[#0E6C38] font-extrabold font-serif text-lg">{convertPrice(costs.totalClosingCost).formatted}</span>
            </div>
          </div>
        </div>

        {/* Legal Checklist (Due Diligence) */}
        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#ECE7DE] space-y-4">
          <div className="flex items-center gap-2 text-[#10241A] font-bold text-sm font-serif">
            <ShieldCheck className="w-5 h-5 text-[#B89758]" />
            <span>Lista e Verifikimit Ligjor Para Nënshkrimit (Checklist)</span>
          </div>

          <div className="space-y-3">
            {costs.legalChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#ECE7DE]">
                <CheckCircle2 className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#10241A]">{item.title}</h5>
                  <p className="text-[11px] text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-[#ECE7DE] flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <span>
            * Shënim: Llogaritja bazohet në normat zyrtare noteriale në fuqi në {country === 'Kosovo' ? 'Kosovë (2026)' : 'Shqipëri (2026)'}.
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-4 h-4 text-[#B89758]" />}
            >
              Printo / PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={closeClosingCosts}
            >
              Mbyll Dritaren
            </Button>
          </div>
        </div>

      </div>
    </ModalShell>
  );
};
