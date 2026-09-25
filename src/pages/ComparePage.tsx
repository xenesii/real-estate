import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { 
  Scale, X, ArrowLeft, Check, Minus, Printer, ShieldCheck, 
  TrendingUp, Compass, Sparkles, Building, MapPin, Eye, ArrowRight,
  CheckCircle2, AlertCircle, Coins, FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ComparePage: React.FC = () => {
  const { locale, t } = useLocale();
  const { 
    listings, comparedIds, removeCompare, clearCompare, 
    setActiveView, setActiveListing, openVirtualTour, 
    setInvestmentPrefill, openClosingCosts, currency, convertPrice 
  } = useApp();

  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const comparedListings = listings.filter(l => comparedIds.includes(l.id));

  if (comparedListings.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-[#ECE7DE] p-10 text-center max-w-md w-full shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#10241A] mb-2">Nuk keni zgjedhur prona për krahasim</h2>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            Klikoni ikonën e peshores mbi kartat e pronave (deri në 4 prona paralelisht) për t&apos;i analizuar dhe krahasuar krah për krah sipas çmimit/m², statusit kadastral dhe specifikave teknike.
          </p>
          <Button
            variant="primary"
            onClick={() => setActiveView('search')}
            fullWidth
            icon={<ArrowRight className="w-4 h-4 text-[#DFBE89]" />}
            iconPosition="right"
          >
            Eksploro Katalogun e Pronave
          </Button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const hasVariation = (getter: (l: typeof comparedListings[0]) => any) => {
    if (!highlightDifferences || comparedListings.length <= 1) return false;
    const firstVal = JSON.stringify(getter(comparedListings[0]));
    return comparedListings.some(l => JSON.stringify(getter(l)) !== firstVal);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => setActiveView('search')}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#10241A] mb-2 font-bold cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#B89758]" />
              <span>Kthehu te kërkimi i pronave</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#10241A]">
              Matrica e Krahasimit të Pronave ({comparedListings.length}/4)
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Krahasim teknik, financiar dhe ligjor krah për krah i pronave të përzgjedhura
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Highlight Differences Switch */}
            <button
              type="button"
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                highlightDifferences
                  ? 'bg-[#10241A] text-[#DFBE89] border-[#10241A] shadow-sm'
                  : 'bg-white text-stone-700 border-[#ECE7DE] hover:bg-[#FAF8F5]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
              <span>{highlightDifferences ? 'Vetëm Ndryshimet (Aktive)' : 'Thekso Ndryshimet'}</span>
            </button>

            {/* Print Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-4 h-4" />}
            >
              Printo / PDF
            </Button>

            {/* Clear All */}
            <Button
              variant="danger"
              size="sm"
              onClick={clearCompare}
            >
              Pastro të Gjitha
            </Button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-[#ECE7DE] shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#ECE7DE] bg-[#FAF8F5]">
                <th className="p-5 w-52 text-xs font-bold uppercase font-serif text-[#10241A] tracking-wider">
                  Karakteristika Teknike
                </th>
                {comparedListings.map(l => (
                  <th key={l.id} className="p-5 min-w-[270px] align-top">
                    <div className="relative group">
                      <button
                        onClick={() => removeCompare(l.id)}
                        className="absolute -top-2 -right-2 p-1.5 bg-[#10241A] hover:bg-rose-700 text-white rounded-full transition-colors cursor-pointer shadow-md z-10"
                        title="Hiq nga krahasimi"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      
                      <div className="relative h-40 rounded-2xl overflow-hidden mb-3 bg-stone-100 border border-[#ECE7DE]">
                        <img
                          src={l.media[0]?.thumbnailUrl || l.media[0]?.url}
                          alt={l.titleSq}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => { setActiveListing(l); setActiveView('detail'); }}
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <Badge variant={l.transaction === 'sale' ? 'sale' : 'rent'} size="xs">
                            {l.transaction === 'sale' ? 'Në Shitje' : 'Me Qira'}
                          </Badge>
                        </div>
                      </div>

                      <h3 
                        onClick={() => { setActiveListing(l); setActiveView('detail'); }}
                        className="font-bold font-serif text-[#10241A] text-sm line-clamp-1 hover:text-[#B89758] cursor-pointer transition-colors"
                      >
                        {locale === 'en' ? l.titleEn : l.titleSq}
                      </h3>

                      <div className="text-lg font-bold font-serif text-[#10241A] mt-1">
                        {convertPrice(l.price).formatted}
                      </div>

                      <div className="text-[11px] text-stone-500 font-medium mt-0.5">
                        ≈ {convertPrice(Math.round(l.price / l.areaSqm)).formatted} / m²
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="mt-3 flex items-center gap-1.5">
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          onClick={() => { setActiveListing(l); setActiveView('detail'); }}
                        >
                          Shiko Detajet
                        </Button>
                        <button
                          type="button"
                          onClick={() => openVirtualTour(l.id)}
                          className="p-2 rounded-xl bg-[#FAF5EC] text-[#B89758] hover:bg-[#E9DCBE] border border-[#E9DCBE] transition-colors cursor-pointer"
                          title="Hap 360° Virtual Tour"
                        >
                          <Compass className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#ECE7DE] text-xs sm:text-sm">
              
              {/* SECTION: FINANCIALS */}
              <tr className="bg-[#FAF8F5]/80">
                <td colSpan={comparedListings.length + 1} className="p-3.5 text-xs font-bold uppercase font-serif text-[#10241A] tracking-wider">
                  1. Treguesit Financiarë & Çmimi
                </td>
              </tr>

              <tr className={hasVariation(l => l.price) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Çmimi Total</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 font-extrabold text-[#10241A]">
                    {convertPrice(l.price).formatted}
                    {l.priceNegotiable && <span className="block text-[10px] text-[#0E6C38] font-normal">Negociueshëm</span>}
                  </td>
                ))}
              </tr>

              <tr className={hasVariation(l => Math.round(l.price / l.areaSqm)) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Çmimi për m²</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 font-bold text-[#10241A]">
                    {convertPrice(Math.round(l.price / l.areaSqm)).formatted} / m²
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-semibold text-stone-600">Kësti Mujor me Kredi (≈20 vite)</td>
                {comparedListings.map(l => {
                  const loan = l.price * 0.8;
                  const r = 0.0389 / 12;
                  const n = 240;
                  const payment = Math.round((loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
                  return (
                    <td key={l.id} className="p-4 font-semibold text-stone-800">
                      ≈ {convertPrice(payment).formatted} / muaj
                    </td>
                  );
                })}
              </tr>

              {/* SECTION: LEGAL & CADASTRAL */}
              <tr className="bg-[#FAF8F5]/80">
                <td colSpan={comparedListings.length + 1} className="p-3.5 text-xs font-bold uppercase font-serif text-[#10241A] tracking-wider">
                  2. Statusi Ligjor & Kadastral
                </td>
              </tr>

              <tr className={hasVariation(l => l.titleDeedStatus) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Fleta Poseduese / Titulli</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4">
                    <Badge variant={l.titleDeedStatus === 'clean_title' ? 'verified' : 'neutral'}>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#DFBE89]" />
                      <span>{l.titleDeedStatus === 'clean_title' ? 'Titull i Pastër (E Verifikuar)' : 'Në Proces Regjistrimi'}</span>
                    </Badge>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-semibold text-stone-600">Shpenzimet e Noterit (Est.)</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4">
                    <button
                      type="button"
                      onClick={() => openClosingCosts(l.price)}
                      className="text-xs text-[#B89758] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Llogarit Shpenzimet</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                ))}
              </tr>

              {/* SECTION: PHYSICAL & TECHNICAL SPECS */}
              <tr className="bg-[#FAF8F5]/80">
                <td colSpan={comparedListings.length + 1} className="p-3.5 text-xs font-bold uppercase font-serif text-[#10241A] tracking-wider">
                  3. Specifikat Teknike & Hapësira
                </td>
              </tr>

              <tr className={hasVariation(l => l.areaSqm) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Sipërfaqja</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 font-bold text-[#10241A]">
                    {l.areaSqm} m²
                  </td>
                ))}
              </tr>

              <tr className={hasVariation(l => l.bedrooms) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Dhomat e Gjumit</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 text-stone-800">{l.bedrooms || '-'}</td>
                ))}
              </tr>

              <tr className={hasVariation(l => l.bathrooms) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Banja / Tualete</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 text-stone-800">{l.bathrooms || '-'}</td>
                ))}
              </tr>

              <tr className={hasVariation(l => l.floor) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Kati / Gjithsej Kate</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 text-stone-800">
                    Kati {l.floor || 0} {l.totalFloors ? `(nga ${l.totalFloors})` : ''}
                  </td>
                ))}
              </tr>

              <tr className={hasVariation(l => l.heating) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Sistemi i Ngrohjes</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 text-stone-800">{t.heatings[l.heating] || l.heating}</td>
                ))}
              </tr>

              <tr className={hasVariation(l => l.furnished) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Mobilimi</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 text-stone-800">{t.furnishings[l.furnished] || l.furnished}</td>
                ))}
              </tr>

              <tr className={hasVariation(l => l.energyClass) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Klasa e Efiçiencës</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4">
                    <Badge variant="exclusive" size="xs">
                      {l.energyClass || 'A+'}
                    </Badge>
                  </td>
                ))}
              </tr>

              <tr className={hasVariation(l => l.location.neighborhood) ? 'bg-[#FAF5EC]/70 font-bold' : ''}>
                <td className="p-4 font-semibold text-stone-600">Vendndodhja</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4 text-stone-800">
                    <div className="font-bold text-[#10241A]">{l.location.city}</div>
                    <div className="text-xs text-stone-500">{l.location.neighborhood}</div>
                  </td>
                ))}
              </tr>

              {/* SECTION: INVESTMENT & TOOLS */}
              <tr className="bg-[#FAF8F5]/80">
                <td colSpan={comparedListings.length + 1} className="p-3.5 text-xs font-bold uppercase font-serif text-[#10241A] tracking-wider">
                  4. Analiza e Investimit (ROI)
                </td>
              </tr>

              <tr>
                <td className="p-4 font-semibold text-stone-600">Simulim Kthimi (ROI)</td>
                {comparedListings.map(l => (
                  <td key={l.id} className="p-4">
                    <Button
                      variant="gold"
                      size="sm"
                      onClick={() => {
                        setInvestmentPrefill({
                          price: l.price,
                          city: l.location.city,
                          title: l.titleSq,
                          areaSqm: l.areaSqm
                        });
                        setActiveView('investments');
                      }}
                      icon={<TrendingUp className="w-3.5 h-3.5" />}
                    >
                      Analizo ROI
                    </Button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
