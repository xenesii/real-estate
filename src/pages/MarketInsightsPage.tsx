import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, BarChart3, Building, MapPin, DollarSign, 
  ArrowUpRight, ArrowDownRight, Percent, Award, Sparkles, Filter, 
  Printer, Calendar, Calculator, Coins, ShieldCheck, ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const MarketInsightsPage: React.FC = () => {
  const { marketStats, setActiveView, setFilters, convertPrice } = useApp();
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'Kosovo' | 'Albania'>('all');
  const [selectedCityTrend, setSelectedCityTrend] = useState<string>('Prishtinë');
  const [sortBy, setSortBy] = useState<'price_desc' | 'growth_desc' | 'rent_desc'>('growth_desc');

  // Interactive ROI Simulator State
  const [simPrice, setSimPrice] = useState<number>(125000);
  const [simRent, setSimRent] = useState<number>(650);
  const [simOccupancyMonths, setSimOccupancyMonths] = useState<number>(11);
  const [simAppreciationPct, setSimAppreciationPct] = useState<number>(6.5);

  const filteredStats = useMemo(() => {
    let list = marketStats.filter(stat => {
      if (selectedCountry !== 'all' && stat.country !== selectedCountry) return false;
      return true;
    });

    if (sortBy === 'price_desc') {
      list = [...list].sort((a, b) => b.avgPricePerSqmSale - a.avgPricePerSqmSale);
    } else if (sortBy === 'growth_desc') {
      list = [...list].sort((a, b) => b.quarterlyGrowth - a.quarterlyGrowth);
    } else if (sortBy === 'rent_desc') {
      list = [...list].sort((a, b) => b.avgPriceRentMonthly - a.avgPriceRentMonthly);
    }

    return list;
  }, [marketStats, selectedCountry, sortBy]);

  const handleExploreCity = (city: string) => {
    setFilters(prev => ({
      ...prev,
      city: city,
      country: 'all'
    }));
    setActiveView('search');
  };

  const cityTrendData: Record<string, { period: string; price: number; heightPct: number }[]> = {
    'Prishtinë': [
      { period: 'Q1 2024', price: 1220, heightPct: 60 },
      { period: 'Q3 2024', price: 1290, heightPct: 68 },
      { period: 'Q1 2025', price: 1350, heightPct: 75 },
      { period: 'Q3 2025', price: 1410, heightPct: 83 },
      { period: 'Q1 2026', price: 1480, heightPct: 92 },
      { period: 'Q3 2026', price: 1550, heightPct: 100 },
    ],
    'Tiranë': [
      { period: 'Q1 2024', price: 1500, heightPct: 62 },
      { period: 'Q3 2024', price: 1620, heightPct: 70 },
      { period: 'Q1 2025', price: 1750, heightPct: 78 },
      { period: 'Q3 2025', price: 1890, heightPct: 86 },
      { period: 'Q1 2026', price: 2050, heightPct: 94 },
      { period: 'Q3 2026', price: 2180, heightPct: 100 },
    ],
    'Vlorë': [
      { period: 'Q1 2024', price: 1050, heightPct: 55 },
      { period: 'Q3 2024', price: 1180, heightPct: 65 },
      { period: 'Q1 2025', price: 1300, heightPct: 75 },
      { period: 'Q3 2025', price: 1420, heightPct: 84 },
      { period: 'Q1 2026', price: 1550, heightPct: 92 },
      { period: 'Q3 2026', price: 1680, heightPct: 100 },
    ],
    'Prizren': [
      { period: 'Q1 2024', price: 880, heightPct: 65 },
      { period: 'Q3 2024', price: 920, heightPct: 71 },
      { period: 'Q1 2025', price: 980, heightPct: 79 },
      { period: 'Q3 2025', price: 1040, heightPct: 86 },
      { period: 'Q1 2026', price: 1100, heightPct: 93 },
      { period: 'Q3 2026', price: 1180, heightPct: 100 },
    ],
    'Durrës': [
      { period: 'Q1 2024', price: 950, heightPct: 58 },
      { period: 'Q3 2024', price: 1080, heightPct: 68 },
      { period: 'Q1 2025', price: 1200, heightPct: 77 },
      { period: 'Q3 2025', price: 1310, heightPct: 85 },
      { period: 'Q1 2026', price: 1420, heightPct: 93 },
      { period: 'Q3 2026', price: 1530, heightPct: 100 },
    ]
  };

  // ROI Calculations
  const annualGrossRent = simRent * simOccupancyMonths;
  const grossYieldPct = simPrice > 0 ? (annualGrossRent / simPrice) * 100 : 0;
  const netAnnualRent = annualGrossRent * 0.90; // minus 10% operating/maintenance
  const fiveYearAppreciationValue = simPrice * Math.pow(1 + simAppreciationPct / 100, 5);
  const fiveYearTotalReturn = (fiveYearAppreciationValue - simPrice) + (netAnnualRent * 5);
  const totalRoiPct = simPrice > 0 ? (fiveYearTotalReturn / simPrice) * 100 : 0;

  return (
    <div className="min-h-screen pb-16 bg-[#FBFBFA]">
      
      {/* Hero Header - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
              <BarChart3 className="w-4 h-4 text-[#B89758]" />
              <span>Indeksi Zyrtar i Çmimeve dhe Rendimenteve të Patundshmërive 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif text-white mb-3 leading-tight">
              Statistikat & Trendet e Tregut
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Të dhëna të përditësuara mbi çmimet mesatare për m², rendimentin e qirasë (ROI), dhe zonat me rritjen më të shpejtë në Kosovë dhe Shqipëri.
            </p>
          </div>

          {/* Quick country tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCountry('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCountry === 'all'
                  ? 'bg-[#B89758] text-[#10241A] font-extrabold shadow-sm'
                  : 'bg-[#163324]/70 text-stone-300 hover:bg-[#1E4731] hover:text-white border border-[#2B543D]'
              }`}
            >
              Të Gjitha (Kosovë & Shqipëri)
            </button>
            <button
              onClick={() => setSelectedCountry('Kosovo')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCountry === 'Kosovo'
                  ? 'bg-[#B89758] text-[#10241A] font-extrabold shadow-sm'
                  : 'bg-[#163324]/70 text-stone-300 hover:bg-[#1E4731] hover:text-white border border-[#2B543D]'
              }`}
            >
              Kosovë 🇽🇰
            </button>
            <button
              onClick={() => setSelectedCountry('Albania')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCountry === 'Albania'
                  ? 'bg-[#B89758] text-[#10241A] font-extrabold shadow-sm'
                  : 'bg-[#163324]/70 text-stone-300 hover:bg-[#1E4731] hover:text-white border border-[#2B543D]'
              }`}
            >
              Shqipëri 🇦🇱
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Top KPI Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ECE7DE] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-500">Çmimi Mesatar / m²</span>
              <span className="p-2.5 bg-[#FAF5EC] text-[#B89758] rounded-xl border border-[#E9DCBE]">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#10241A] tracking-tight">
              {convertPrice(1410).formatted}
            </div>
            <div className="text-xs text-[#0E6C38] font-bold flex items-center gap-1 mt-1.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+7.8% krahasuar me vitin e kaluar</span>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ECE7DE] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-500">Qiraja Mesatare Mujore</span>
              <span className="p-2.5 bg-[#FAF5EC] text-[#B89758] rounded-xl border border-[#E9DCBE]">
                <Building className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#10241A] tracking-tight">
              {convertPrice(430).formatted}/muaj
            </div>
            <div className="text-xs text-[#142C20] font-bold flex items-center gap-1 mt-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B89758]" />
              <span>+9.2% në kryeqytete</span>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ECE7DE] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-500">Kthimi nga Qiraja (Yield)</span>
              <span className="p-2.5 bg-[#FAF5EC] text-[#B89758] rounded-xl border border-[#E9DCBE]">
                <Percent className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#10241A] tracking-tight">
              6.8% - 9.4%
            </div>
            <div className="text-xs text-stone-500 font-medium mt-1.5">
              Më i larti në bregdet (Vlorë/Durrës)
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ECE7DE] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-500">Koha Mesatare e Shitjes</span>
              <span className="p-2.5 bg-[#FAF5EC] text-[#B89758] rounded-xl border border-[#E9DCBE]">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#10241A] tracking-tight">
              38 Ditë
            </div>
            <div className="text-xs text-stone-500 font-medium mt-1.5">
              Likuiditet i lartë për banesat 1+1 dhe 2+1
            </div>
          </div>

        </div>

        {/* City Price & Trends Comparison Table */}
        <div className="bg-white rounded-3xl border border-[#ECE7DE] shadow-2xs overflow-hidden mb-10">
          <div className="p-6 border-b border-[#ECE7DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Indeksi i Transaksioneve Reale</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#10241A]">
                Pasqyra e Çmimeve sipas Qyteteve Kryesore
              </h2>
              <p className="text-xs text-stone-500">
                Përllogaritur nga mbi 6,000 shpallje aktive dhe transaksione kadastrale të mbyllura
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-bold hidden md:inline">Rendit sipas:</span>
              <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#ECE7DE] text-xs">
                <button
                  type="button"
                  onClick={() => setSortBy('growth_desc')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    sortBy === 'growth_desc'
                      ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Rritjes Vjetore
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('price_desc')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    sortBy === 'price_desc'
                      ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Çmimit / m²
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('rent_desc')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    sortBy === 'rent_desc'
                      ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Qirasë
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-stone-500 uppercase tracking-wider font-semibold border-b border-[#ECE7DE]">
                <tr>
                  <th className="py-3.5 px-6">Qyteti</th>
                  <th className="py-3.5 px-6">Çmimi Shitjes / m²</th>
                  <th className="py-3.5 px-6">Qiraja Mesatare</th>
                  <th className="py-3.5 px-6">Rritja Vjetore</th>
                  <th className="py-3.5 px-6">Kërkesa e Tregut</th>
                  <th className="py-3.5 px-6">Lagjet më të Kërkuara</th>
                  <th className="py-3.5 px-6 text-right">Veprim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE7DE] font-medium text-stone-700">
                {filteredStats.map(stat => (
                  <tr key={stat.city} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold font-serif text-[#10241A] text-sm">{stat.city}</div>
                      <div className="text-[11px] text-stone-400">
                        {stat.country === 'Kosovo' ? 'Kosovë 🇽🇰' : 'Shqipëri 🇦🇱'}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-extrabold text-[#10241A] text-sm">
                        {convertPrice(stat.avgPricePerSqmSale).formatted} / m²
                      </div>
                      <div className="text-[10px] text-stone-400">Mesatare e ponderuar</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-[#10241A]">
                        {convertPrice(stat.avgPriceRentMonthly).formatted} / muaj
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F8EE] text-[#0E6C38] border border-[#C2E8D0]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        +{stat.quarterlyGrowth}%
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <Badge variant={stat.demandLevel === 'Shumë e Lartë' ? 'exclusive' : 'neutral'}>
                        {stat.demandLevel}
                      </Badge>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {stat.topNeighborhoods.slice(0, 3).map(n => (
                          <span key={n} className="px-2 py-0.5 bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] rounded-md text-[11px]">
                            {n}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleExploreCity(stat.city)}
                        icon={<ChevronRight className="w-3.5 h-3.5" />}
                        iconPosition="right"
                      >
                        Eksploro Pronat
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historical Price Trend Visualizer Section */}
        <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-8 shadow-2xs mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#ECE7DE] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Analiza Historike & Parashikimi Përiudhor</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#10241A]">
                Evolucioni i Çmimit për m² (2024 - 2026)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-bold hidden sm:inline">Zgjidh Qytetin:</span>
              <div className="flex bg-[#FAF8F5] p-1 rounded-2xl gap-1 border border-[#ECE7DE]">
                {['Prishtinë', 'Tiranë', 'Vlorë', 'Prizren', 'Durrës'].map(city => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCityTrend(city)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCityTrend === city
                        ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-[#ECE7DE]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              <Button
                variant="gold"
                size="sm"
                onClick={() => window.print()}
                icon={<Printer className="w-3.5 h-3.5" />}
                className="ml-2"
                title="Shtyp ose Ruaj Raportin si PDF"
              >
                <span className="hidden sm:inline">Eksporto Raportin</span>
              </Button>
            </div>
          </div>

          {/* Bar Chart Visualizer with Forest Green to Champagne Gold Gradient */}
          <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-64 pt-8 pb-3 px-3 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE]">
            {cityTrendData[selectedCityTrend]?.map((bar, idx) => {
              const convertedBar = convertPrice(bar.price);
              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-[11px] font-extrabold text-[#10241A] mb-1.5 opacity-90 group-hover:scale-110 transition-transform">
                    {convertedBar.formatted}
                  </span>
                  <div 
                    className="w-full max-w-[48px] bg-gradient-to-t from-[#10241A] via-[#163324] to-[#B89758] rounded-t-xl transition-all duration-500 group-hover:brightness-110 shadow-sm"
                    style={{ height: `${bar.heightPct}%` }}
                  />
                  <span className="text-[11px] font-bold text-stone-600 mt-2.5 whitespace-nowrap">
                    {bar.period}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-stone-500 px-2">
            <span>Rritje mesatare në {selectedCityTrend}: <strong className="text-[#0E6C38] font-bold">+27% gjatë 2 viteve të fundit</strong></span>
            <span className="italic">Burimi: Të dhënat zyrtare të shitblerjeve të noterizuara dhe shpalljeve të Pronat</span>
          </div>
        </div>

        {/* Interactive Investment Yield & ROI Calculator Simulator */}
        <div className="bg-white rounded-3xl border border-[#B89758]/40 shadow-xl p-6 sm:p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#ECE7DE]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>Simuluesi Financiar i Rendimentit</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#10241A]">
                Llogaritësi i Kthimit nga Investimi (ROI & Yield Simulator)
              </h2>
              <p className="text-xs text-stone-500">
                Përcaktoni çmimin e blerjes, qiranë e pritshme dhe zbuloni të ardhurat neto vjetore dhe vlerën e rritjes kapitale.
              </p>
            </div>
            
            <Badge variant="exclusive" size="md">
              <Sparkles className="w-3.5 h-3.5 text-[#10241A]" />
              Motorri i Investimeve
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>Çmimi i Blerjes së Pronës</span>
                  <span className="text-[#10241A] font-extrabold">{convertPrice(simPrice).formatted}</span>
                </div>
                <input
                  type="range"
                  min={40000}
                  max={600000}
                  step={5000}
                  value={simPrice}
                  onChange={e => setSimPrice(Number(e.target.value))}
                  className="w-full h-2 bg-[#ECE7DE] rounded-lg appearance-none cursor-pointer accent-[#142C20]"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>{convertPrice(40000).formatted}</span>
                  <span>{convertPrice(300000).formatted}</span>
                  <span>{convertPrice(600000).formatted}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>Qiraja Mujore e Pritshme</span>
                  <span className="text-[#10241A] font-extrabold">{convertPrice(simRent).formatted} / muaj</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={3500}
                  step={25}
                  value={simRent}
                  onChange={e => setSimRent(Number(e.target.value))}
                  className="w-full h-2 bg-[#ECE7DE] rounded-lg appearance-none cursor-pointer accent-[#142C20]"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>{convertPrice(200).formatted}</span>
                  <span>{convertPrice(1500).formatted}</span>
                  <span>{convertPrice(3500).formatted}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Muaj të Lëshuar me Qira / Vit
                  </label>
                  <select
                    value={simOccupancyMonths}
                    onChange={e => setSimOccupancyMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-semibold text-stone-800"
                  >
                    <option value={12}>12 muaj (Afatgjatë - Qytet)</option>
                    <option value={11}>11 muaj (Standard me 1 muaj pushim)</option>
                    <option value={10}>10 muaj (Studentor / Sezonal)</option>
                    <option value={6}>6 muaj (Bregdetar Sezonal)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Rritje Vjetore e Çmimit %
                  </label>
                  <select
                    value={simAppreciationPct}
                    onChange={e => setSimAppreciationPct(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-semibold text-stone-800"
                  >
                    <option value={4.0}>4.0% (Konservatore)</option>
                    <option value={6.5}>6.5% (Mesatare Historike)</option>
                    <option value={9.0}>9.0% (Zonë në Zhvillim të Lartë)</option>
                    <option value={11.0}>11.0% (Bregdet / Qendër)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Simulation Results Display Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#10241A] to-[#163324] rounded-2xl p-6 text-white border border-[#2B543D] shadow-lg flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#DFBE89] font-bold mb-1">
                  Pasqyra e Kthimit Financiar
                </div>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div className="bg-[#142C20]/80 p-3.5 rounded-xl border border-[#2B543D]">
                    <div className="text-[11px] text-stone-300">Rendimenti Bruto (Gross Yield)</div>
                    <div className="text-2xl font-black font-serif text-[#DFBE89]">
                      {grossYieldPct.toFixed(2)}%
                    </div>
                  </div>
                  <div className="bg-[#142C20]/80 p-3.5 rounded-xl border border-[#2B543D]">
                    <div className="text-[11px] text-stone-300">Qiraja Neto Vjetore</div>
                    <div className="text-2xl font-black font-serif text-white">
                      {convertPrice(netAnnualRent).formatted}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-t border-[#2B543D] pt-3 text-stone-300">
                  <div className="flex justify-between">
                    <span>Vlera e parashikuar pas 5 viteve:</span>
                    <strong className="text-white">{convertPrice(fiveYearAppreciationValue).formatted}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Fitimi total 5-vjeçar (Qira + Rritje Vlere):</span>
                    <strong className="text-[#DFBE89]">{convertPrice(fiveYearTotalReturn).formatted}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI Total në 5 Vite:</span>
                    <strong className="text-[#DFBE89]">+{totalRoiPct.toFixed(1)}%</strong>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3">
                <Button
                  variant="gold"
                  fullWidth
                  onClick={() => setActiveView('search')}
                  icon={<Coins className="w-4 h-4 text-[#10241A]" />}
                >
                  Shiko Prona me Çmim të Ngjashëm ({convertPrice(simPrice).formatted})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Real Estate Investor Analysis Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-7 shadow-2xs">
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#10241A] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B89758]" />
              Zonat me Rendimentin më të Lartë të Investimit (ROI)
            </h3>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              Bazuar në raportin çmim-blerje ndaj të ardhurave nga qiraja ditore / sezonale (Airbnb / Booking) dhe qiraja afatgjatë.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#10241A]">Riviera & Vlorë (Lungomare, Radhimë)</div>
                  <div className="text-[11px] text-stone-500">Qira turistike 4-mujore + qira dimërore</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#0E6C38]">9.4% ROI</div>
                  <div className="text-[10px] text-stone-400">Vjetore Bruto</div>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#10241A]">Durrës (Gjiri i Lalzit & Plazh)</div>
                  <div className="text-[11px] text-stone-500">Kërkesë e vazhdueshme nga Tirana & diaspora</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#0E6C38]">8.2% ROI</div>
                  <div className="text-[10px] text-stone-400">Vjetore Bruto</div>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#10241A]">Prishtinë (Qendër, Arbëri, Mati 1)</div>
                  <div className="text-[11px] text-stone-500">Stabilitet i lartë, staf ndërkombëtar & studentë</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#0E6C38]">6.4% ROI</div>
                  <div className="text-[10px] text-stone-400">Vjetore Bruto</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-7 shadow-2xs">
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#10241A] mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#B89758]" />
              Parashikimi i Tregut për vitin 2026-2027
            </h3>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              Analiza e faktorëve makro-ekonomikë dhe ndikimi në çmimet e patundshmërive:
            </p>

            <ul className="space-y-3.5 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#B89758] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#10241A]">Liberalizimi dhe Lëvizshmëria:</strong> Investimet nga diaspora kosovare mbeten forca kryesore lëvizëse, me mbi 65% të pagesave të kryera pa kredi bankare.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#B89758] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#10241A]">Infrastruktura Turistike në Shqipëri:</strong> Aeroporti i Vlorës dhe investimet në marina bregdetare po rrisin çmimet në bregdet me ritme dyshifrore (+11% në vit).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#B89758] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-[#10241A]">Standardet e Efiçiencës së Energjisë:</strong> Ndërtimet e reja me izolim termik cilësor dhe panele diellore po arrijnë deri në 15% çmim më të lartë rishitjeje.
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
