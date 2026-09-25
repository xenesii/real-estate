import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  Sparkles, X, ArrowRight, ArrowLeft, Check, Compass, 
  MapPin, Bed, Building2, Euro, ShieldCheck, Heart, Eye,
  Sliders, Award, CheckCircle2, RotateCcw, Coins
} from 'lucide-react';
import { MatchmakerCriteria, MatchedListingResult } from '../types';
import { calculatePropertyMatches } from '../utils/propertyMatchmaker';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ModalShell } from './ui/ModalShell';

interface AiMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiMatchmakerModal: React.FC<AiMatchmakerModalProps> = ({ isOpen, onClose }) => {
  const { listings, setActiveListing, setActiveView, isFavorite, toggleFavorite, convertPrice } = useApp();
  const { locale } = useLocale();

  const [step, setStep] = useState<number>(1);
  const [criteria, setCriteria] = useState<MatchmakerCriteria>({
    purpose: 'living',
    transaction: 'sale',
    targetCities: ['Prishtinë'],
    maxBudget: 150000,
    minBedrooms: 2,
    preferredCategories: ['residential'],
    mustHaves: {
      parking: true,
      elevator: true,
      balcony: true,
      cleanTitle: true,
      bankMortgageEligible: true,
      newConstruction: false,
      furnished: false
    }
  });

  const [matchedResults, setMatchedResults] = useState<MatchedListingResult[]>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRunMatch = () => {
    const results = calculatePropertyMatches(listings, criteria);
    setMatchedResults(results);
    setHasCalculated(true);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setHasCalculated(false);
  };

  const citiesList = ['Prishtinë', 'Tiranë', 'Prizren', 'Durrës', 'Vlorë', 'Pejë', 'Ferizaj'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#ECE7DE] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header Banner - Forest Green & Gold */}
        <div className="bg-[#10241A] p-5 sm:p-6 text-white flex items-center justify-between shrink-0 border-b border-[#2B543D]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#163324] border border-[#2B543D] flex items-center justify-center text-[#DFBE89] shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#163324] text-[#DFBE89] text-[10px] font-bold uppercase tracking-wider mb-0.5 border border-[#2B543D]">
                AI Smart Matchmaker v3.0
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white font-serif">
                Gjetësi Inteligjent i Pronave (AI Profiler)
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl transition-colors cursor-pointer bg-[#163324] border border-[#2B543D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Bar */}
        {!hasCalculated && (
          <div className="px-6 pt-4 pb-3 bg-[#FAF8F5] border-b border-[#ECE7DE] flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-6">
              {[
                { s: 1, label: 'Qëllimi & Buxheti' },
                { s: 2, label: 'Lokacioni & Dhoma' },
                { s: 3, label: 'Prioritetet Kryesore' }
              ].map(st => (
                <button
                  key={st.s}
                  type="button"
                  onClick={() => setStep(st.s)}
                  className={`flex items-center gap-2 font-bold cursor-pointer transition-colors ${
                    step === st.s ? 'text-[#10241A]' : step > st.s ? 'text-[#8B6E39]' : 'text-stone-400'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    step === st.s 
                      ? 'bg-[#10241A] text-[#DFBE89]' 
                      : step > st.s 
                      ? 'bg-[#DFBE89] text-[#10241A]' 
                      : 'bg-stone-200 text-stone-600'
                  }`}>
                    {step > st.s ? '✓' : st.s}
                  </span>
                  <span className="hidden sm:inline font-serif">{st.label}</span>
                </button>
              ))}
            </div>

            <span className="text-stone-500 text-[11px] font-medium">Hapi {step} nga 3</span>
          </div>
        )}

        {/* Step Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Purpose, Transaction & Budget */}
          {step === 1 && !hasCalculated && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-[#10241A] uppercase tracking-wider mb-2 font-serif">
                  1. Cili është qëllimi kryesor i kërkimit tuaj?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'living', title: '🏡 Banim Familjar', desc: 'Për të jetuar afatgjatë' },
                    { id: 'investment', title: '📈 Investim me Qira', desc: 'ROI & Cap Rate i lartë' },
                    { id: 'diaspora_vacation', title: '🌊 Pushime & Diaspora', desc: 'Bregdet / Pamje panoramike' },
                    { id: 'commercial', title: '🏢 Biznes & Zyra', desc: 'Hapësirë me frekuentim' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setCriteria(prev => ({ ...prev, purpose: p.id as any }))}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        criteria.purpose === p.id 
                          ? 'bg-[#FAF5EC] border-[#B89758] ring-1 ring-[#B89758]/30 shadow-2xs' 
                          : 'bg-[#FAF8F5] border-[#ECE7DE] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#10241A] mb-0.5">{p.title}</span>
                      <span className="block text-[11px] text-stone-500">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#10241A] uppercase tracking-wider mb-2 font-serif">
                  2. Lloji i Transaksionit
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setCriteria(prev => ({ ...prev, transaction: 'sale', maxBudget: 150000 }))}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      criteria.transaction === 'sale'
                        ? 'bg-[#10241A] text-[#DFBE89] border-[#10241A] shadow-2xs'
                        : 'bg-[#FAF8F5] text-stone-700 border-[#ECE7DE] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    Blerje (Shitje)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCriteria(prev => ({ ...prev, transaction: 'rent', maxBudget: 600 }))}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      criteria.transaction === 'rent'
                        ? 'bg-[#10241A] text-[#DFBE89] border-[#10241A] shadow-2xs'
                        : 'bg-[#FAF8F5] text-stone-700 border-[#ECE7DE] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    Qiradhënie
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-[#10241A] uppercase tracking-wider font-serif">
                    3. Buxheti Maksimal i Parashikuar
                  </label>
                  <span className="text-sm font-extrabold text-[#10241A] font-serif bg-[#FAF5EC] px-3 py-0.5 rounded-full border border-[#E9DCBE]">
                    {convertPrice(criteria.maxBudget).formatted} {criteria.transaction === 'rent' ? '/ muaj' : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min={criteria.transaction === 'sale' ? 30000 : 150}
                  max={criteria.transaction === 'sale' ? 500000 : 3000}
                  step={criteria.transaction === 'sale' ? 5000 : 25}
                  value={criteria.maxBudget}
                  onChange={e => setCriteria(prev => ({ ...prev, maxBudget: Number(e.target.value) }))}
                  className="w-full accent-[#10241A] h-2 bg-[#ECE7DE] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-semibold">
                  <span>{convertPrice(criteria.transaction === 'sale' ? 30000 : 150).formatted}</span>
                  <span>{convertPrice(criteria.transaction === 'sale' ? 250000 : 1500).formatted}</span>
                  <span>{convertPrice(criteria.transaction === 'sale' ? 500000 : 3000).formatted}+</span>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Location & Bedrooms */}
          {step === 2 && !hasCalculated && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-[#10241A] uppercase tracking-wider mb-2 font-serif">
                  1. Qytetet e Preferuara
                </label>
                <div className="flex flex-wrap gap-2">
                  {citiesList.map(city => {
                    const isSelected = criteria.targetCities.includes(city);
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setCriteria(prev => {
                            const exists = prev.targetCities.includes(city);
                            const updated = exists 
                              ? prev.targetCities.filter(c => c !== city)
                              : [...prev.targetCities, city];
                            return { ...prev, targetCities: updated.length ? updated : [city] };
                          });
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs border border-[#2B543D]'
                            : 'bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                        <span>{city}</span>
                        {isSelected && <span className="text-[10px] bg-[#163324] text-[#DFBE89] px-1 rounded">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#10241A] uppercase tracking-wider mb-2 font-serif">
                  2. Numri Minimal i Dhomave të Gjumit
                </label>
                <div className="grid grid-cols-5 gap-2 max-w-md">
                  {[0, 1, 2, 3, 4].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setCriteria(prev => ({ ...prev, minBedrooms: b }))}
                      className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        criteria.minBedrooms === b
                          ? 'bg-[#10241A] text-[#DFBE89] border-[#10241A] shadow-2xs'
                          : 'bg-[#FAF8F5] text-stone-700 border-[#ECE7DE] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      {b === 0 ? 'Studio / Çdo' : `${b}+ Dhoma`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Must Haves & Priorities */}
          {step === 3 && !hasCalculated && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-[#10241A] uppercase tracking-wider mb-1 font-serif">
                  Zgjidhni Karakteristikat e Domosdoshme (Must-Haves)
                </label>
                <p className="text-xs text-stone-500 mb-3">
                  Algoritmi AI i PRONAT do të peshojë këto kritere për të gjetur përputhjen më të lartë:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { key: 'parking', title: 'Vend Parkimi / Garazh', desc: 'Parkim nëntokësor ose i rezervuar' },
                    { key: 'elevator', title: 'Ashensor Funksional', desc: 'I rëndësishëm për kate të mesme/larta' },
                    { key: 'balcony', title: 'Ballkon ose Terasë', desc: 'Pamje e hapur dhe ajrosje' },
                    { key: 'cleanTitle', title: 'Dokumentacion & Fletë Poseduese', desc: '100% i verifikuar pa ngarkesa' },
                    { key: 'bankMortgageEligible', title: 'Mundësi Financimi Bankar', desc: 'E aprovuar për kredi hipotekare' },
                    { key: 'newConstruction', title: 'Ndërtim i Ri (Pas 2020)', desc: 'Efikasitet energjetik & izolim akustik' },
                    { key: 'furnished', title: 'E Mobiluar Plotësisht', desc: 'E gatshme për banim të menjëhershëm' }
                  ].map(opt => {
                    const isChecked = (criteria.mustHaves as any)[opt.key];
                    return (
                      <label
                        key={opt.key}
                        className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-[#FAF5EC] border-[#B89758] ring-1 ring-[#B89758]/30' 
                            : 'bg-[#FAF8F5] border-[#ECE7DE] hover:bg-[#F2ECE1]'
                        }`}
                      >
                        <div className="pr-2">
                          <span className="text-xs font-bold text-[#10241A] block">{opt.title}</span>
                          <span className="text-[11px] text-stone-500 block">{opt.desc}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setCriteria(prev => ({
                              ...prev,
                              mustHaves: {
                                ...prev.mustHaves,
                                [opt.key]: e.target.checked
                              }
                            }));
                          }}
                          className="w-4 h-4 text-[#10241A] rounded-md focus:ring-[#10241A] accent-[#10241A]"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Matched Listings Results */}
          {hasCalculated && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#10241A] text-[#DFBE89] rounded-xl border border-[#2B543D]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#10241A] font-serif">
                      U gjetën {matchedResults.length} prona të rankuara me AI Match Engine
                    </h4>
                    <p className="text-xs text-stone-600">
                      Përputhjet më të larta për {criteria.purpose === 'living' ? 'banim' : criteria.purpose === 'investment' ? 'investim' : 'pushime'} në {criteria.targetCities.join(', ')}.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-[#ECE7DE] hover:bg-[#FAF8F5] text-[#10241A] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Ndrysho Preferencat</span>
                </button>
              </div>

              {/* Matched Listings Cards List */}
              <div className="space-y-4">
                {matchedResults.slice(0, 5).map((match, idx) => {
                  const item = match.listing;
                  const isFav = isFavorite(item.id);

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] hover:border-[#DFBE89] shadow-2xs hover:shadow-xl transition-all flex flex-col sm:flex-row gap-4 relative overflow-hidden group"
                    >
                      {/* Left Thumbnail */}
                      <div className="w-full sm:w-44 h-40 sm:h-auto rounded-xl overflow-hidden bg-stone-100 shrink-0 relative">
                        <img
                          src={item.media[0]?.thumbnailUrl || item.media[0]?.url}
                          alt={item.titleSq}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-[#10241A]/90 backdrop-blur-xs text-[#DFBE89] text-[10px] font-bold px-2 py-0.5 rounded border border-[#2B543D]">
                          #{idx + 1}
                        </div>
                      </div>

                      {/* Right Details */}
                      <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-[#8B6E39] bg-[#FAF5EC] px-2.5 py-0.5 rounded-full border border-[#E9DCBE]">
                              {match.highlightBadge} • {match.score}% Match
                            </span>

                            <button
                              type="button"
                              onClick={() => toggleFavorite(item.id)}
                              className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                                isFav ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-500 hover:bg-[#F2ECE1]'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
                            </button>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold font-serif text-[#10241A] line-clamp-1">
                            {item.titleSq}
                          </h4>
                          
                          <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                            <span>{item.location.neighborhood}, {item.location.city}</span>
                          </div>

                          {/* Match reasons pills */}
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {match.matchReasons.map((reason, rIdx) => (
                              <span key={rIdx} className="text-[10px] font-medium bg-[#FAF8F5] text-stone-700 px-2 py-0.5 rounded-md flex items-center gap-1 border border-[#ECE7DE]">
                                <CheckCircle2 className="w-3 h-3 text-[#0E6C38] shrink-0" />
                                <span>{reason}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase font-bold block">Çmimi:</span>
                            <span className="text-base font-extrabold font-serif text-[#10241A]">
                              {convertPrice(item.price).formatted}
                              {item.transaction === 'rent' && <span className="text-xs font-normal text-stone-500"> / muaj</span>}
                            </span>
                          </div>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              setActiveListing(item);
                              setActiveView('detail');
                              onClose();
                            }}
                            icon={<ArrowRight className="w-3.5 h-3.5 text-[#DFBE89]" />}
                            iconPosition="right"
                          >
                            Shiko Pronën
                          </Button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#ECE7DE] flex items-center justify-between shrink-0">
          {!hasCalculated ? (
            <>
              {step > 1 ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setStep(step - 1)}
                  icon={<ArrowLeft className="w-4 h-4 text-[#B89758]" />}
                >
                  Kthehu Mbrapa
                </Button>
              ) : <div />}

              {step < 3 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setStep(step + 1)}
                  icon={<ArrowRight className="w-4 h-4 text-[#DFBE89]" />}
                  iconPosition="right"
                >
                  Vazhdo
                </Button>
              ) : (
                <Button
                  variant="gold"
                  size="md"
                  onClick={handleRunMatch}
                  icon={<Sparkles className="w-4 h-4 text-[#10241A]" />}
                >
                  Gjej Pronat e Përshtatura (AI Match)
                </Button>
              )}
            </>
          ) : (
            <div className="w-full flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={onClose}
              >
                Mbyll Dritaren
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
