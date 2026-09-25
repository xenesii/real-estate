import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CONTRACT_TEMPLATES } from '../data/mockContracts';
import { LegalContractData, ContractTemplateType } from '../types';
import { 
  X, FileText, Check, Printer, Copy, Building2, 
  Scale, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ModalShell } from './ui/ModalShell';

export const ContractBuilderModal: React.FC = () => {
  const { 
    isContractModalOpen, 
    closeContractBuilder, 
    contractModalListing, 
    saveContract, 
    setActiveView,
    convertPrice 
  } = useApp();

  if (!isContractModalOpen) return null;

  const listing = contractModalListing;
  const isRent = listing ? listing.transaction === 'rent' : true;
  const country = listing?.location?.country || 'Kosovo';

  const defaultTemplateType: ContractTemplateType = isRent ? 'residential_lease' : 'sales_preliminary';
  const [templateType, setTemplateType] = useState<ContractTemplateType>(defaultTemplateType);

  // Form fields
  const [buyerName, setBuyerName] = useState('Arbenita Hoxha');
  const [buyerId, setBuyerId] = useState('2028394019');
  const [buyerPhone, setBuyerPhone] = useState('+383 49 888 999');
  const [buyerAddress, setBuyerAddress] = useState('Rruga Agim Ramadani Nr. 88, Prishtinë');

  const [sellerName, setSellerName] = useState(listing?.userName || 'Kreshnik Krasniqi');
  const [sellerId, setSellerId] = useState('1019283746');
  const [sellerPhone, setSellerPhone] = useState(listing?.userPhone || '+383 44 123 456');

  const [price, setPrice] = useState(listing?.price || (isRent ? 500 : 120000));
  const [deposit, setDeposit] = useState(isRent ? (listing?.price ? listing.price * 2 : 1000) : Math.round((listing?.price || 120000) * 0.1));
  const [handoverDate, setHandoverDate] = useState('2026-04-01');

  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedClauses, setSelectedClauses] = useState<string[]>([]);

  const selectedTemplate = CONTRACT_TEMPLATES.find(t => t.type === templateType) || CONTRACT_TEMPLATES[0];

  const handleToggleClause = (clauseText: string) => {
    if (selectedClauses.includes(clauseText)) {
      setSelectedClauses(selectedClauses.filter(c => c !== clauseText));
    } else {
      setSelectedClauses([...selectedClauses, clauseText]);
    }
  };

  const handleSaveContract = () => {
    const newContract: LegalContractData = {
      id: `cnt-${Date.now()}`,
      templateType,
      title: `${selectedTemplate.titleSq} - ${listing?.titleSq || 'Patundshmëri'}`,
      jurisdiction: country,
      governingLaw: selectedTemplate.governingLawSq,
      status: 'ready_to_sign',
      partyA: {
        fullName: sellerName,
        personalId: sellerId,
        address: listing?.displayAddress || 'Prishtinë',
        city: listing?.location?.city || 'Prishtinë',
        phone: sellerPhone,
        email: listing?.userEmail || 'pronari@pronat.com'
      },
      partyB: {
        fullName: buyerName,
        personalId: buyerId,
        address: buyerAddress,
        city: listing?.location?.city || 'Prishtinë',
        phone: buyerPhone,
        email: 'blerresi@gmail.com'
      },
      property: {
        listingId: listing?.id,
        title: listing?.titleSq || 'Apartament',
        address: listing?.displayAddress || 'Adresë',
        city: listing?.location?.city || 'Prishtinë',
        municipality: listing?.location?.municipality || 'Prishtinë',
        cadastralZone: listing?.cadastralZone || 'Zona Kadastrale 71914',
        parcelNumber: listing?.parcelNumber || 'Parcela 1240/1',
        areaSqm: listing?.areaSqm || 85,
        floor: listing?.floor
      },
      financialTerms: {
        priceOrRent: price,
        currency: 'EUR',
        depositAmount: deposit,
        paymentDayOfMonth: 5,
        paymentMethod: 'bank_transfer',
        bankIban: 'XK05 1501 0010 1234 5678',
        bankName: 'Banka e Pronarit',
        handoverDate,
        contractDurationMonths: 12,
        utilitiesResponsibility: 'Qiramarrësi/Blerësi merr përsipër të gjitha shpenzimet komunale dhe faturat e energjisë.'
      },
      customClauses: selectedClauses,
      articles: selectedTemplate.defaultArticles,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveContract(newContract);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      closeContractBuilder();
      setActiveView('contracts');
    }, 1200);
  };

  return (
    <ModalShell
      isOpen={isContractModalOpen}
      onClose={closeContractBuilder}
      title="Gjeneruesi i Shpejtë i Kontratës Zyrtare"
      subtitle={listing ? `${listing.titleSq} • ${listing.location.city}` : 'Patundshmëri në Kosovë & Shqipëri'}
      icon={<Scale className="w-5 h-5 text-[#DFBE89]" />}
      maxWidth="xl"
      headerTheme="dark"
    >
      <div className="space-y-6">
        
        {step === 'form' ? (
          <>
            {/* Template Selection */}
            <div>
              <label className="block text-xs font-bold text-[#10241A] mb-2 uppercase tracking-wider">
                Zgjidh Modelin e Kontratës Zyrtare
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONTRACT_TEMPLATES.map(tmpl => (
                  <button
                    key={tmpl.type}
                    type="button"
                    onClick={() => setTemplateType(tmpl.type)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      templateType === tmpl.type
                        ? 'border-[#B89758] bg-[#FAF5EC] text-[#10241A] shadow-2xs'
                        : 'border-[#ECE7DE] bg-[#FAF8F5] hover:bg-[#F2ECE1] text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-serif">{tmpl.titleSq}</span>
                      <span className="text-[10px] bg-white border border-[#ECE7DE] text-stone-700 px-2 py-0.5 rounded-md font-semibold">
                        {tmpl.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug line-clamp-2">
                      {tmpl.descriptionSq}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Parties Pre-fill */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#ECE7DE]">
              
              {/* Party A */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE]">
                <span className="text-xs font-bold text-[#10241A] uppercase tracking-wider block">
                  Pala A (Qiradhënësi / Shitësi)
                </span>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Emri & Mbiemri</label>
                  <input
                    type="text"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="w-full text-xs font-medium bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Nr. Personal / NIPT</label>
                  <input
                    type="text"
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                    className="w-full text-xs font-medium bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              {/* Party B */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE]">
                <span className="text-xs font-bold text-[#8B6E39] uppercase tracking-wider block">
                  Pala B (Qiramarrësi / Blerësi)
                </span>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Emri & Mbiemri</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full text-xs font-medium bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Nr. Personal / NIPT</label>
                  <input
                    type="text"
                    value={buyerId}
                    onChange={(e) => setBuyerId(e.target.value)}
                    className="w-full text-xs font-medium bg-white border border-[#ECE7DE] rounded-xl px-3 py-2 text-[#10241A] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Financial Inputs */}
            <div className="grid grid-cols-3 gap-3.5 pt-2 border-t border-[#ECE7DE]">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  {isRent ? 'Qiraja Mujore' : 'Çmimi i Plotë'}
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm font-bold text-[#10241A] bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2"
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">{convertPrice(price).formatted}</span>
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  {isRent ? 'Depozita Garanci' : 'Kapari Paraprak'}
                </label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm font-bold text-[#10241A] bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2"
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">{convertPrice(deposit).formatted}</span>
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Data e Dorëzimit
                </label>
                <input
                  type="date"
                  value={handoverDate}
                  onChange={(e) => setHandoverDate(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-stone-800"
                />
              </div>
            </div>

            {/* Smart Legal Protection Clauses */}
            <div className="pt-3 border-t border-[#ECE7DE]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-[#10241A] flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
                  Klauzola të Posaçme të Mbrojtjes Ligjore
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleToggleClause('Klauzola e Indeksimit të Inflacionit (+3% çdo 12 muaj në përputhje me Ligjin e Detyrimeve).')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    selectedClauses.includes('Klauzola e Indeksimit të Inflacionit (+3% çdo 12 muaj në përputhje me Ligjin e Detyrimeve).')
                      ? 'bg-[#FAF5EC] border-[#B89758] text-[#10241A]'
                      : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-700 hover:bg-[#F2ECE1]'
                  }`}
                >
                  <span>+ Indeksimi i Inflacionit (+3%/vit)</span>
                  <CheckCircle2 className={`w-4 h-4 ${selectedClauses.includes('Klauzola e Indeksimit të Inflacionit (+3% çdo 12 muaj në përputhje me Ligjin e Detyrimeve).') ? 'text-[#0E6C38]' : 'text-stone-300'}`} />
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleClause('Klauzola e Qirasë për Diasporën (Autorizim me Prokurë të Posaçme dhe Pagesa me SWIFT/IBAN).')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    selectedClauses.includes('Klauzola e Qirasë për Diasporën (Autorizim me Prokurë të Posaçme dhe Pagesa me SWIFT/IBAN).')
                      ? 'bg-[#FAF5EC] border-[#B89758] text-[#10241A]'
                      : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-700 hover:bg-[#F2ECE1]'
                  }`}
                >
                  <span>+ Klauzola e Pagesës për Diasporën</span>
                  <CheckCircle2 className={`w-4 h-4 ${selectedClauses.includes('Klauzola e Qirasë për Diasporën (Autorizim me Prokurë të Posaçme dhe Pagesa me SWIFT/IBAN).') ? 'text-[#0E6C38]' : 'text-stone-300'}`} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Live Quick Preview */
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] font-serif text-xs space-y-4">
            <div className="text-center border-b border-[#ECE7DE] pb-3">
              <h4 className="text-base font-bold uppercase text-[#10241A] font-serif">{selectedTemplate.titleSq}</h4>
              <p className="text-[11px] text-stone-500 italic mt-0.5">{selectedTemplate.governingLawSq}</p>
            </div>

            <p className="text-stone-800 leading-relaxed">
              Palët <strong>{sellerName}</strong> (Pala A) dhe <strong>{buyerName}</strong> (Pala B) dakordohen për patundshmërinë në <strong>{listing?.displayAddress || 'Prishtinë'}</strong> me vlerë <strong>{convertPrice(price).formatted}</strong> dhe depozitë <strong>{convertPrice(deposit).formatted}</strong> me datë dorëzimi <strong>{handoverDate}</strong>.
            </p>

            <div className="space-y-3 pt-2">
              {selectedTemplate.defaultArticles.slice(0, 3).map(art => (
                <div key={art.number} className="p-3 bg-white rounded-xl border border-[#ECE7DE]">
                  <p className="font-bold text-[#10241A] font-sans text-xs">{art.number}. {art.titleSq}</p>
                  <p className="text-stone-600 text-[11px] leading-relaxed mt-1">{art.contentSq}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-4 border-t border-[#ECE7DE] flex items-center justify-between gap-3">
          {step === 'preview' ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setStep('form')}
            >
              Kthehu te Ndryshimet
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setStep('preview')}
            >
              Shiko Paraprakisht
            </Button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveContract}
            icon={<Check className="w-4 h-4 text-[#DFBE89]" />}
          >
            {savedSuccess ? 'U Gjenerua & Ruajt!' : 'Gjenero & Ruaj në Qendrën Ligjore'}
          </Button>
        </div>

      </div>
    </ModalShell>
  );
};
