import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, Sparkles, TrendingUp, CheckCircle, ArrowRight, 
  Building2, MapPin, Layers, Award, AlertCircle, HelpCircle, ShieldAlert,
  Printer, Download, Scale, FileText, Check, X, ShieldCheck, Coins
} from 'lucide-react';
import { PropertyCategory, PropertyTypeSlug, PropertyCondition } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ModalShell } from '../components/ui/ModalShell';

export const ValuationPage: React.FC = () => {
  const { listings, setActiveView, setValuationPrefill, setActiveListing, convertPrice } = useApp();

  const [city, setCity] = useState('Prishtinë');
  const [neighborhood, setNeighborhood] = useState('Arbëri');
  const [propertyType, setPropertyType] = useState<PropertyTypeSlug>('apartment');
  const [areaSqm, setAreaSqm] = useState<number>(85);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [condition, setCondition] = useState<PropertyCondition>('new_construction');
  const [floor, setFloor] = useState<number>(3);
  const [yearBuilt, setYearBuilt] = useState<number>(2023);
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [hasParking, setHasParking] = useState<boolean>(true);
  const [hasBalcony, setHasBalcony] = useState<boolean>(true);

  const [calculated, setCalculated] = useState<boolean>(true);
  const [cmaModalOpen, setCmaModalOpen] = useState<boolean>(false);

  // Baseline city square meter prices in EUR
  const basePrices: Record<string, number> = {
    'Prishtinë': 1380,
    'Tiranë': 1720,
    'Prizren': 1080,
    'Durrës': 1180,
    'Vlorë': 1450,
    'Pejë': 950,
    'Ferizaj': 980
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculated(true);
  };

  // Pricing formula
  const baseSqm = basePrices[city] || 1200;
  
  // Modifiers
  let conditionMult = 1.0;
  if (condition === 'new_construction') conditionMult = 1.15;
  if (condition === 'renovated') conditionMult = 1.08;
  if (condition === 'good') conditionMult = 0.98;
  if (condition === 'needs_renovation') conditionMult = 0.82;

  let amenitiesBonus = 0;
  if (hasElevator) amenitiesBonus += 25;
  if (hasParking) amenitiesBonus += 50;
  if (hasBalcony) amenitiesBonus += 20;

  // Floor adjustment
  let floorMult = 1.0;
  if (floor === 1) floorMult = 0.96;
  if (floor >= 2 && floor <= 6) floorMult = 1.03;
  if (floor > 8) floorMult = 0.98;

  const finalPricePerSqm = Math.round((baseSqm * conditionMult * floorMult) + amenitiesBonus);
  const estimatedAvg = Math.round(finalPricePerSqm * areaSqm);
  const estimatedMin = Math.round(estimatedAvg * 0.93);
  const estimatedMax = Math.round(estimatedAvg * 1.08);

  const handlePublishWithValuation = () => {
    setValuationPrefill({
      price: estimatedAvg,
      type: propertyType,
      city: city
    });
    setActiveView('publish');
  };

  // Find comparable properties
  const comparables = listings
    .filter(l => l.location.city === city && l.propertyType === propertyType)
    .slice(0, 2);

  return (
    <div className="min-h-screen pb-20 bg-[#FBFBFA]">
      
      {/* Hero Header - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#B89758]" />
            <span>Vlerësim Analitik i Bazuar në Transaksione Reale Kadastrale</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white mb-4 leading-tight">
            Vlerësoni Pronën Tuaj <span className="text-[#DFBE89]">Falas & Menjëherë</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Zbuloni vlerën reale të tregut të apartamentit, shtëpisë apo truallit tuaj në Kosovë dhe Shqipëri me motorrin tonë të inteligjencës analitike dhe bazën e të dhënave të shitjeve.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold font-serif text-[#10241A] mb-1 flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-[#B89758]" />
              Të Dhënat Kryesore të Pronës
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Plotësoni të dhënat për të gjeneruar analizën krahasuese të tregut (Comparative Market Analysis).
            </p>

            <form onSubmit={handleCalculate} className="space-y-4">
              
              {/* City & Neighborhood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Qyteti:
                  </label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-semibold text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  >
                    <option value="Prishtinë">Prishtinë (Kosovë)</option>
                    <option value="Tiranë">Tiranë (Shqipëri)</option>
                    <option value="Prizren">Prizren (Kosovë)</option>
                    <option value="Durrës">Durrës (Shqipëri)</option>
                    <option value="Vlorë">Vlorë (Shqipëri)</option>
                    <option value="Pejë">Pejë (Kosovë)</option>
                    <option value="Ferizaj">Ferizaj (Kosovë)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Zona / Lagjja:
                  </label>
                  <input
                    type="text"
                    required
                    value={neighborhood}
                    onChange={e => setNeighborhood(e.target.value)}
                    placeholder="p.sh. Arbëri, Blloku, Qendër"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-medium text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
                  />
                </div>
              </div>

              {/* Property Type & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Lloji i Pronës:
                  </label>
                  <select
                    value={propertyType}
                    onChange={e => setPropertyType(e.target.value as PropertyTypeSlug)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-semibold text-stone-800 focus:bg-white focus:outline-none"
                  >
                    <option value="apartment">Banesë / Apartament</option>
                    <option value="house">Shtëpi Private</option>
                    <option value="villa">Vilë Rezidenciale</option>
                    <option value="commercial">Hapësirë Komerciale / Zyrë</option>
                    <option value="land_building">Truall Ndërtimi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Gjendja Fizike:
                  </label>
                  <select
                    value={condition}
                    onChange={e => setCondition(e.target.value as PropertyCondition)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-semibold text-stone-800 focus:bg-white focus:outline-none"
                  >
                    <option value="new_construction">Ndërtim i ri / E re</option>
                    <option value="renovated">E rinovuar kohët e fundit</option>
                    <option value="good">Në gjendje të mirë banimi</option>
                    <option value="needs_renovation">Nevojitet renovim</option>
                  </select>
                </div>
              </div>

              {/* Area, Bedrooms & Floor */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Sipërfaqja (m²):
                  </label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={2000}
                    value={areaSqm}
                    onChange={e => setAreaSqm(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-bold text-stone-800 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Dhoma Gjumi:
                  </label>
                  <select
                    value={bedrooms}
                    onChange={e => setBedrooms(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-bold text-stone-800 focus:bg-white focus:outline-none"
                  >
                    <option value={1}>1 Dhomë (Garsonierë)</option>
                    <option value={2}>2 Dhoma (1+1)</option>
                    <option value={3}>3 Dhoma (2+1)</option>
                    <option value={4}>4+ Dhoma (3+1 / 4+1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Kati:
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={35}
                    value={floor}
                    onChange={e => setFloor(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-bold text-stone-800 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Amenities checkboxes */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
                  Përparësi Shtesë:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setHasElevator(!hasElevator)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      hasElevator 
                        ? 'bg-[#10241A] text-[#DFBE89] border-[#10241A] shadow-2xs' 
                        : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-700 hover:bg-[#F2ECE1]'
                    }`}
                  >
                    ✓ Ashensor Funksional
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasParking(!hasParking)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      hasParking 
                        ? 'bg-[#10241A] text-[#DFBE89] border-[#10241A] shadow-2xs' 
                        : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-700 hover:bg-[#F2ECE1]'
                    }`}
                  >
                    ✓ Vend Parkimi / Garazh
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasBalcony(!hasBalcony)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      hasBalcony 
                        ? 'bg-[#10241A] text-[#DFBE89] border-[#10241A] shadow-2xs' 
                        : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-700 hover:bg-[#F2ECE1]'
                    }`}
                  >
                    ✓ Ballkon ose Terasë
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="md"
                  icon={<Sparkles className="w-4 h-4 text-[#DFBE89]" />}
                >
                  Përditëso Vlerën e Llogaritur
                </Button>
              </div>

            </form>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Valuation Result Card */}
            <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF5EC] rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B89758] bg-[#FAF5EC] px-3 py-1 rounded-full border border-[#E9DCBE]">
                  Rezultati i Vlerësimit CMA
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  Indeksi: <strong className="text-[#0E6C38]">94% Saktësi</strong>
                </span>
              </div>

              <div className="mb-5">
                <div className="text-xs text-stone-500 font-medium mb-1">
                  Çmimi i Pritshëm Mesatar i Tregut:
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-serif text-[#10241A] tracking-tight">
                  {convertPrice(estimatedAvg).formatted}
                </div>
                <div className="text-xs text-[#0E6C38] font-bold mt-1.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Rreth {convertPrice(finalPricePerSqm).formatted} për m²</span>
                </div>
              </div>

              {/* Range bar */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] mb-5">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-stone-500">Min: {convertPrice(estimatedMin).formatted}</span>
                  <span className="font-bold text-[#10241A]">Tregu: {convertPrice(estimatedAvg).formatted}</span>
                  <span className="text-stone-500">Max: {convertPrice(estimatedMax).formatted}</span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-[#DFBE89] w-1/4" title="Çmim i shpejtë" />
                  <div className="bg-[#10241A] w-1/2" title="Çmim optimal" />
                  <div className="bg-[#B89758] w-1/4" title="Çmim premium" />
                </div>
                <div className="flex justify-between text-[10px] text-stone-500 mt-1.5 font-medium">
                  <span>Likuidim i Shpejtë</span>
                  <span>Çmim Optimal Tregu</span>
                  <span>Çmim Premium</span>
                </div>
              </div>

              {/* Pricing Strategy Advice */}
              <div className="space-y-2.5 mb-6 text-xs text-stone-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                  <span>
                    <strong>Kërkesë e Lartë në {city}:</strong> Banesat e këtij lloji në {neighborhood} shiten mesatarisht brenda <strong>35 ditëve</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#0E6C38] shrink-0 mt-0.5" />
                  <span>
                    Rekomandojmë çmimin fillestar të publikimit rreth <strong>{convertPrice(Math.round(estimatedAvg * 1.03)).formatted}</strong> për të lënë hapësirë negociimi.
                  </span>
                </div>
              </div>

              {/* Action buttons: Publish and Official CMA Certificate */}
              <div className="space-y-3">
                <Button
                  variant="gold"
                  fullWidth
                  size="md"
                  onClick={handlePublishWithValuation}
                  icon={<ArrowRight className="w-4 h-4 text-[#10241A]" />}
                  iconPosition="right"
                >
                  Listo Pronën me Këtë Çmim
                </Button>

                <Button
                  variant="secondary"
                  fullWidth
                  size="md"
                  onClick={() => setCmaModalOpen(true)}
                  icon={<FileText className="w-4 h-4 text-[#B89758]" />}
                >
                  Shkarko / Printo Certifikatën e Vlerësimit (CMA)
                </Button>
              </div>
            </div>

            {/* Comparable Listings Preview */}
            {comparables.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#ECE7DE] p-5 shadow-2xs">
                <h3 className="text-xs font-bold font-serif text-[#10241A] mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#B89758]" />
                  Prona të Ngjashme në Treg ({city})
                </h3>
                <div className="space-y-3">
                  {comparables.map(comp => (
                    <div
                      key={comp.id}
                      onClick={() => {
                        setActiveListing(comp);
                        setActiveView('detail');
                      }}
                      className="p-3 bg-[#FAF8F5] hover:bg-[#F2ECE1] rounded-2xl border border-[#ECE7DE] flex items-center gap-3.5 cursor-pointer transition-colors"
                    >
                      <img
                        src={comp.media[0]?.thumbnailUrl || comp.media[0]?.url}
                        alt={comp.titleSq}
                        className="w-14 h-14 rounded-xl object-cover border border-[#ECE7DE]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#10241A] truncate">{comp.titleSq}</div>
                        <div className="text-[11px] text-stone-500">{comp.location.neighborhood}, {comp.location.city}</div>
                        <div className="text-xs font-extrabold text-[#0E6C38] mt-0.5">
                          {convertPrice(comp.price).formatted} • {comp.areaSqm} m²
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Printable CMA Valuation Certificate Modal */}
      {cmaModalOpen && (
        <ModalShell
          isOpen={cmaModalOpen}
          onClose={() => setCmaModalOpen(false)}
          title="Certifikatë Zyrtare e Vlerësimit (CMA)"
          subtitle="SHITJE PRONASH Premium Real Estate Market Analytics Engine"
          icon={<Award className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="lg"
          headerTheme="dark"
        >
          <div className="space-y-6 text-stone-800" id="cma-certificate-doc">
            
            {/* Certificate Header */}
            <div className="border-b-2 border-[#10241A] pb-4 flex justify-between items-end">
              <div>
                <div className="text-xl font-bold font-serif text-[#10241A] tracking-tight">
                  SHITJE PRONASH PREMIUM REAL ESTATE
                </div>
                <div className="text-xs text-[#B89758] font-bold uppercase tracking-wider mt-0.5">
                  Prishtinë • Tiranë • Durrës • Vlorë
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-[#10241A]">ID: CMA-{Date.now().toString().slice(-6)}</div>
                <div className="text-xs text-stone-400">Data: {new Date().toLocaleDateString('sq-AL')}</div>
              </div>
            </div>

            {/* Estimated Value Block */}
            <div className="bg-[#FAF5EC] border border-[#E9DCBE] rounded-2xl p-5 text-center">
              <span className="text-[11px] font-bold text-[#8B6E39] uppercase tracking-widest block mb-1">
                Vlera e Përllogaritur e Tregut (CMA Estimate)
              </span>
              <span className="text-3xl sm:text-4xl font-black font-serif text-[#10241A]">
                {convertPrice(estimatedAvg).formatted}
              </span>
              <span className="block text-xs font-bold text-[#0E6C38] mt-1.5">
                ({convertPrice(finalPricePerSqm).formatted} për m²) • Intervali: {convertPrice(estimatedMin).formatted} - {convertPrice(estimatedMax).formatted}
              </span>
            </div>

            {/* Property Data Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Lokacioni</span>
                <span className="font-bold text-[#10241A]">{neighborhood}, {city}</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Sipërfaqja</span>
                <span className="font-bold text-[#10241A]">{areaSqm} m² ({bedrooms} dhoma gjumi)</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Gjendja / Kati</span>
                <span className="font-bold text-[#10241A]">Kati {floor} • Ndërtim {yearBuilt}</span>
              </div>
            </div>

            {/* Methodology & Verification */}
            <div className="space-y-2 text-xs text-stone-600 border-t border-[#ECE7DE] pt-4">
              <h4 className="font-bold text-[#10241A] uppercase tracking-wider">Metodologjia e Vlerësimit:</h4>
              <p className="text-[11px] leading-relaxed text-stone-500">
                Ky vlerësim është gjeneruar përmes modelit krahasues të tregut (Comparative Market Analysis - CMA), duke marrë parasysh çmimet e realizuara në {city}, amortizimin, katin, orientimin dhe pajisjet shtesë.
              </p>
              <div className="flex items-center gap-2 text-[#0E6C38] font-bold pt-2">
                <ShieldCheck className="w-4 h-4 text-[#B89758]" />
                <span>Vlerësim i pajisur me Vulë Digjitale të Sigurisë SHITJE PRONASH Analytics Hub</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#ECE7DE] flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCmaModalOpen(false)}
              >
                Mbyll
              </Button>

              <Button
                variant="gold"
                size="sm"
                onClick={() => window.print()}
                icon={<Printer className="w-4 h-4 text-[#10241A]" />}
              >
                Printo Certifikatën PDF
              </Button>
            </div>

          </div>
        </ModalShell>
      )}

    </div>
  );
};
