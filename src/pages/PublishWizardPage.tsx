import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { Listing, PropertyCondition, FurnishedStatus, HeatingType, PropertyCategory, PropertyTypeSlug } from '../types';
import { LOCATIONS_DATA, AMENITIES_DATA, PROPERTY_CATEGORIES_CONFIG, PROPERTY_TYPES_CONFIG } from '../data/constants';
import { LocationSelector } from '../components/LocationSelector';
import { 
  Building, Check, ArrowRight, ArrowLeft, Upload, MapPin, 
  Euro, Sparkles, CheckCircle2, ShieldAlert, Home, Briefcase, Trees, Car
} from 'lucide-react';

export const PublishWizardPage: React.FC = () => {
  const { locale, t } = useLocale();
  const { addListing, currentUser, setActiveView, valuationPrefill, setValuationPrefill, convertPrice } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Listing>>(() => ({
    transaction: 'sale',
    propertyType: (valuationPrefill?.type as any) || 'apartment',
    category: 'residential',
    titleSq: '',
    titleEn: '',
    descriptionSq: '',
    descriptionEn: '',
    price: valuationPrefill?.price || 100000,
    currency: 'EUR',
    priceNegotiable: true,
    areaSqm: 80,
    bedrooms: 2,
    bathrooms: 1,
    floor: 2,
    totalFloors: 6,
    yearBuilt: 2023,
    condition: 'new_construction',
    furnished: 'furnished',
    heating: 'central_electric',
    energyClass: 'A',
    location: {
      ...LOCATIONS_DATA[0],
      city: valuationPrefill?.city || LOCATIONS_DATA[0].city
    },
    exactAddress: '',
    displayAddress: '',
    isApproximateLocation: false,
    amenities: ['elevator', 'balcony', 'ac', 'internet'],
    media: [
      {
        id: 'med-upload-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
        caption: 'Pamja kryesore',
        isCover: true,
        order: 1
      },
      {
        id: 'med-upload-2',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
        caption: 'Hapësira e sallonit',
        isCover: false,
        order: 2
      }
    ],
    enablePhone: true,
    enableWhatsApp: true,
    enableViber: true,
  }));

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 10));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const toggleAmenity = (slug: string) => {
    const list = formData.amenities || [];
    if (list.includes(slug)) {
      setFormData({ ...formData, amenities: list.filter(item => item !== slug) });
    } else {
      setFormData({ ...formData, amenities: [...list, slug] });
    }
  };

  const handleFinalPublish = () => {
    const slug = (formData.titleSq || 'prona-e-re')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const newListing: Listing = {
      id: `prop-${Date.now()}`,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      isVerifiedOwner: currentUser.isVerified,
      agencyName: currentUser.agencyName,
      agencyId: currentUser.agencyId,
      transaction: formData.transaction || 'sale',
      propertyType: formData.propertyType || 'apartment',
      category: formData.category || 'residential',
      titleSq: formData.titleSq || 'Prona e re e publikuar',
      titleEn: formData.titleEn || formData.titleSq || 'Newly listed property',
      descriptionSq: formData.descriptionSq || 'Përshkrim i hollësishëm i pronës.',
      descriptionEn: formData.descriptionEn || formData.descriptionSq || 'Detailed property description.',
      price: Number(formData.price) || 100000,
      currency: formData.currency || 'EUR',
      priceNegotiable: Boolean(formData.priceNegotiable),
      areaSqm: Number(formData.areaSqm) || 80,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      floor: formData.floor,
      totalFloors: formData.totalFloors,
      yearBuilt: formData.yearBuilt,
      condition: formData.condition as PropertyCondition || 'new_construction',
      furnished: formData.furnished as FurnishedStatus || 'furnished',
      heating: formData.heating as HeatingType || 'central_electric',
      energyClass: formData.energyClass,
      location: formData.location || LOCATIONS_DATA[0],
      exactAddress: formData.exactAddress || 'Rruga Kryesore',
      displayAddress: formData.displayAddress || `${formData.location?.city || 'Prishtinë'}, Qendër`,
      isApproximateLocation: Boolean(formData.isApproximateLocation),
      amenities: formData.amenities || [],
      media: formData.media || [],
      status: 'pending', // Moderation required
      viewsCount: 1,
      favoritesCount: 0,
      featured: false,
      verified: false,
      priceReduced: false,
      priceHistory: [{ date: new Date().toISOString().split('T')[0], price: Number(formData.price) || 100000, currency: 'EUR' }],
      enablePhone: Boolean(formData.enablePhone),
      enableWhatsApp: Boolean(formData.enableWhatsApp),
      enableViber: Boolean(formData.enableViber),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 90 * 86400000).toISOString(),
    };

    addListing(newListing);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 font-serif mb-2">
            {t.wizard.successMsg}
          </h2>
          <p className="text-sm text-stone-600 mb-6 leading-relaxed">
            {t.wizard.successSub}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setActiveView('dashboard')}
              className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-sm font-semibold transition-colors"
            >
              Shiko në Panel
            </button>
            <button
              onClick={() => setActiveView('search')}
              className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              Kthehu te Pronat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Wizard Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            <span>Hapi {currentStep} nga 10</span>
            <span className="text-emerald-700 font-bold">{Math.round((currentStep / 10) * 100)}% e përfunduar</span>
          </div>
          <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-stone-900 transition-all duration-300"
              style={{ width: `${(currentStep / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Card Body */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          
          {/* Valuation Prefill Banner */}
          {valuationPrefill && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#B89758] shrink-0" />
                <span className="text-xs font-semibold text-[#10241A]">
                  Çmimi ({convertPrice(valuationPrefill.price).formatted}) dhe qyteti ({valuationPrefill.city}) u vendosën automatikisht nga <strong>Vlerësimi Digjital i Pronës</strong>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setValuationPrefill(null)}
                className="text-xs text-stone-500 hover:text-stone-800 underline font-medium cursor-pointer ml-2 shrink-0"
              >
                Pastro
              </button>
            </div>
          )}

          {/* STEP 1: Transaction Type */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step1Title}</h2>
              <p className="text-sm text-stone-500 mb-6">Përcaktoni nëse prona ofrohet për shitje apo me qira.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, transaction: 'sale' })}
                  className={`p-6 rounded-xl border-2 text-center transition-all ${
                    formData.transaction === 'sale'
                      ? 'border-stone-900 bg-stone-50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="text-2xl font-bold text-stone-900 mb-1">Në Shitje</div>
                  <p className="text-xs text-stone-500">Transferim i përhershëm i pronësisë</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, transaction: 'rent' })}
                  className={`p-6 rounded-xl border-2 text-center transition-all ${
                    formData.transaction === 'rent'
                      ? 'border-stone-900 bg-stone-50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="text-2xl font-bold text-stone-900 mb-1">Me Qira</div>
                  <p className="text-xs text-stone-500">Qiradhënie mujore ose ditore</p>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Category & Property Type (Sprint 2 Enhanced) */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step2Title}</h2>
              <p className="text-sm text-stone-500 mb-6">Zgjidhni kategorinë dhe tipologjinë e saktë të pronës suaj.</p>
              
              {/* Category Selection Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {PROPERTY_CATEGORIES_CONFIG.map(cat => {
                  const isSelected = formData.category === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        const typesForCat = PROPERTY_TYPES_CONFIG.filter(pt => pt.category === cat.slug);
                        setFormData({ 
                          ...formData, 
                          category: cat.slug,
                          propertyType: typesForCat[0]?.slug || 'apartment'
                        });
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                        Kategoria
                      </div>
                      <div className="text-sm font-bold">
                        {locale === 'sq' ? cat.nameSq : cat.nameEn}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Property Types under the chosen Category */}
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Tipologjia e Veçantë
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PROPERTY_TYPES_CONFIG
                  .filter(pt => pt.category === (formData.category || 'residential'))
                  .map(item => {
                    const isSelected = formData.propertyType === item.slug;
                    return (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => setFormData({ ...formData, propertyType: item.slug })}
                        className={`p-4 rounded-xl border text-left font-medium text-sm transition-all cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-200 text-stone-800 hover:bg-stone-50'
                        }`}
                      >
                        <div className="font-bold">{locale === 'sq' ? item.nameSq : item.nameEn}</div>
                        <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          {item.category === 'land' ? 'Matje me Ari & m²' : item.category === 'parking' ? 'Kapaciteti & siguria' : 'Standard'}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* STEP 3: Basic Information & Dynamic Specs */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step3Title}</h2>
              <p className="text-sm text-stone-500 mb-4">Shkruani titullin dhe të dhënat bazë të hapësirës.</p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Titulli në Shqip *
                </label>
                <input
                  type="text"
                  required
                  placeholder="p.sh. Banesë komode 2+1 me qira në Qendër"
                  value={formData.titleSq}
                  onChange={e => setFormData({ ...formData, titleSq: e.target.value })}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Përshkrimi i Detajuar *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const typeLabel = formData.transaction === 'rent' ? 'me qira' : 'në shitje';
                      const catName = formData.category === 'residential' ? 'Rezidenciale' : formData.category === 'commercial' ? 'Komerciale' : 'Trolli / Tokë';
                      const locName = formData.location?.city || 'Prishtinë';
                      const neigh = formData.location?.neighborhood || 'Qendër';
                      const area = formData.areaSqm || 85;
                      const beds = formData.bedrooms ? `${formData.bedrooms} dhoma gjumi` : '';
                      
                      const generatedSq = `Ofrohet ${typeLabel} kjo pronë e shkëlqyer ${catName.toLowerCase()} me sipërfaqe prej ${area} m², e vendosur në një nga zonat më të kërkuara në ${locName} (${neigh}).\n\nProna karakterizohet nga ndriçim natyral gjatë gjithë ditës, organizim mjaft funksional të hapësirave ${beds ? `(${beds})` : ''}, izolim termik cilësor dhe qasje të menjëhershme në transport publik, shkolla dhe qendra tregtare.\n\nPosedon dokumentacion të rregullt kadastral (Fletë Poseduese / Sertifikatë Pronësie) dhe është e gatshme për kalim të menjëhershëm të pronësisë ose hyrje me qira. Për më shumë informata apo për të caktuar një vizitë në pronë, ju lutemi na kontaktoni direkt.`;
                      
                      setFormData(prev => ({
                        ...prev,
                        titleSq: prev.titleSq || `${formData.propertyType === 'apartment' ? 'Banesë' : 'Pronë'} ${typeLabel} në ${locName}, ${neigh} (${area} m²)`,
                        descriptionSq: generatedSq,
                        descriptionEn: `Excellent property for ${formData.transaction} located in ${locName} (${neigh}) with ${area} sqm.`
                      }));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Gjenero me AI (1-Click)</span>
                  </button>
                </div>
                <textarea
                  rows={5}
                  required
                  placeholder="Përshkruani avantazhet, organizimin dhe veçoritë e pronës ose përdorni butonin AI..."
                  value={formData.descriptionSq}
                  onChange={e => setFormData({ ...formData, descriptionSq: e.target.value })}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:outline-none"
                />
              </div>

              {/* DYNAMIC SPECS: LAND CATEGORY */}
              {formData.category === 'land' ? (
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Specifikat e Tokës / Truallit
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Sipërfaqja në Metra Katrorë (m²) *
                      </label>
                      <input
                        type="number"
                        value={formData.areaSqm}
                        onChange={e => setFormData({ ...formData, areaSqm: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm font-bold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Ekuivalenti në Ari (1 Ari = 100 m²)
                      </label>
                      <div className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-extrabold text-emerald-800 flex items-center justify-between">
                        <span>{((formData.areaSqm || 0) / 100).toFixed(2)} Ari</span>
                        <span className="text-[11px] text-emerald-600 font-normal">Kalkuluar automatikisht</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : formData.category === 'parking' ? (
                /* DYNAMIC SPECS: PARKING CATEGORY */
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Specifikat e Parkingut / Garazhit
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Sipërfaqja (m²) *
                      </label>
                      <input
                        type="number"
                        value={formData.areaSqm}
                        onChange={e => setFormData({ ...formData, areaSqm: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Kati / Niveli
                      </label>
                      <input
                        type="number"
                        placeholder="p.sh. -1 ose 0"
                        value={formData.floor}
                        onChange={e => setFormData({ ...formData, floor: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Kapaciteti (Vende veturash)
                      </label>
                      <input
                        type="number"
                        defaultValue={1}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* DYNAMIC SPECS: RESIDENTIAL & COMMERCIAL */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Sipërfaqja (m²) *
                    </label>
                    <input
                      type="number"
                      value={formData.areaSqm}
                      onChange={e => setFormData({ ...formData, areaSqm: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    />
                  </div>
                  {formData.category === 'residential' && (
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Dhoma Gjumi
                      </label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={e => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      {formData.category === 'commercial' ? 'Tualete' : 'Banjo'}
                    </label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={e => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Kati
                    </label>
                    <input
                      type="number"
                      value={formData.floor}
                      onChange={e => setFormData({ ...formData, floor: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Price & Financials */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step4Title}</h2>
              <p className="text-sm text-stone-500 mb-4">Vendosni çmimin real dhe kushtet e pagesës.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Çmimi (€) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm font-bold text-stone-900"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-stone-800">
                    <input
                      type="checkbox"
                      checked={formData.priceNegotiable}
                      onChange={e => setFormData({ ...formData, priceNegotiable: e.target.checked })}
                      className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
                    />
                    <span>Çmimi është i negociueshëm</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Condition & Specs */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step5Title}</h2>
              
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">Gjendja</label>
                <select
                  value={formData.condition}
                  onChange={e => setFormData({ ...formData, condition: e.target.value as any })}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                >
                  <option value="new_construction">{t.conditions.new_construction}</option>
                  <option value="renovated">{t.conditions.renovated}</option>
                  <option value="good">{t.conditions.good}</option>
                  <option value="needs_renovation">{t.conditions.needs_renovation}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">Mobilimi</label>
                <select
                  value={formData.furnished}
                  onChange={e => setFormData({ ...formData, furnished: e.target.value as any })}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                >
                  <option value="furnished">{t.furnishings.furnished}</option>
                  <option value="semi_furnished">{t.furnishings.semi_furnished}</option>
                  <option value="unfurnished">{t.furnishings.unfurnished}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">Ngrohja</label>
                <select
                  value={formData.heating}
                  onChange={e => setFormData({ ...formData, heating: e.target.value as any })}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                >
                  <option value="central_city">{t.heatings.central_city}</option>
                  <option value="central_electric">{t.heatings.central_electric}</option>
                  <option value="air_conditioner">{t.heatings.air_conditioner}</option>
                  <option value="pellet">{t.heatings.pellet}</option>
                  <option value="heat_pump">{t.heatings.heat_pump}</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 6: Amenities */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step6Title}</h2>
              <p className="text-sm text-stone-500 mb-4">Përzgjidhni përparësitë që përmban kjo pronë.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES_DATA.map(am => {
                  const selected = (formData.amenities || []).includes(am.slug);
                  return (
                    <button
                      key={am.id}
                      type="button"
                      onClick={() => toggleAmenity(am.slug)}
                      className={`p-3 rounded-lg border text-left text-xs font-medium flex items-center justify-between transition-colors ${
                        selected 
                          ? 'border-stone-900 bg-stone-900 text-white' 
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{locale === 'en' ? am.nameEn : am.nameSq}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: Location (Sprint 2 Enhanced) */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step7Title}</h2>
              <p className="text-sm text-stone-500 mb-4">Zgjidhni shtetin, qytetin dhe lagjen e saktë të pronës suaj.</p>
              
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Zgjidhni Vendndodhjen (Kosovë / Shqipëri) *
                </label>
                <LocationSelector
                  selectedCity={formData.location?.city}
                  selectedNeighborhood={formData.location?.neighborhood}
                  selectedCountry={formData.location?.country}
                  onSelect={({ city, neighborhood, country }) => {
                    const matchedLoc = LOCATIONS_DATA.find(l => 
                      l.city.toLowerCase() === (city || '').toLowerCase() &&
                      (!neighborhood || l.neighborhood.toLowerCase() === neighborhood.toLowerCase())
                    ) || {
                      id: `loc-custom-${Date.now()}`,
                      country: (country as 'Kosovo' | 'Albania') || 'Kosovo',
                      city: city || 'Prishtinë',
                      municipality: city || 'Prishtinë',
                      neighborhood: neighborhood || 'Qendër',
                      lat: 42.6629,
                      lng: 21.1655
                    };

                    setFormData({
                      ...formData,
                      location: matchedLoc,
                      displayAddress: `${matchedLoc.city}, ${matchedLoc.neighborhood}`
                    });
                  }}
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Adresa e Shfaqur Publikisht
                </label>
                <input
                  type="text"
                  placeholder="p.sh. Prishtinë, Lagjja e Muhaxherëve (afër parkut)"
                  value={formData.displayAddress}
                  onChange={e => setFormData({ ...formData, displayAddress: e.target.value })}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Adresa e Saktë (e fshehur nga publiku, vetëm për verifikim kadastral)
                </label>
                <input
                  type="text"
                  placeholder="p.sh. Rruga Agim Ramadani, Hyrja 3, Nr. 12"
                  value={formData.exactAddress}
                  onChange={e => setFormData({ ...formData, exactAddress: e.target.value })}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:outline-none"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={formData.isApproximateLocation}
                    onChange={e => setFormData({ ...formData, isApproximateLocation: e.target.checked })}
                    className="w-4 h-4 rounded text-stone-900"
                  />
                  <span>Mbrojtje e Privatësisë: Shfaq vetëm lokacion të përafërt në hartë</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 8: Images */}
          {currentStep === 8 && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step8Title}</h2>
              <p className="text-sm text-stone-500 mb-4">
                Fotografi profesionale pa të dhëna private GPS (EXIF hiqet automatikisht).
              </p>

              <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-center bg-stone-50 mb-4">
                <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-stone-800">Tërhiqni fotot këtu ose klikoni për t'i ngarkuar</div>
                <div className="text-xs text-stone-400 mt-1">Mbështeten JPG, PNG dhe WebP deri në 10MB</div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {formData.media?.map(m => (
                  <div key={m.id} className="relative aspect-[16/10] rounded-lg overflow-hidden border border-stone-200">
                    <img src={m.thumbnailUrl} alt="uploaded" className="w-full h-full object-cover" />
                    {m.isCover && (
                      <span className="absolute bottom-1 left-1 bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                        Kopertinë
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 9: Contact Channels */}
          {currentStep === 9 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step9Title}</h2>
              <p className="text-sm text-stone-500 mb-4">Caktoni kanalet e lejuara të kontaktit për blerësit.</p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enablePhone}
                    onChange={e => setFormData({ ...formData, enablePhone: e.target.checked })}
                    className="w-4 h-4 rounded text-stone-900"
                  />
                  <div>
                    <div className="text-sm font-semibold text-stone-900">Shfaq Numrin e Telefonit me klikim</div>
                    <div className="text-xs text-stone-500">Mbrohet nga robotët e spam-it</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enableWhatsApp}
                    onChange={e => setFormData({ ...formData, enableWhatsApp: e.target.checked })}
                    className="w-4 h-4 rounded text-stone-900"
                  />
                  <div>
                    <div className="text-sm font-semibold text-stone-900">Lejo bisedë direkte në WhatsApp</div>
                    <div className="text-xs text-stone-500">Ideale për kontakt të shpejtë nga diaspora</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 10: Review & Publish */}
          {currentStep === 10 && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-serif mb-2">{t.wizard.step10Title}</h2>
              <p className="text-sm text-stone-500 mb-6">Rishikoni përmbledhjen para dorëzimit në moderim.</p>

              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-500">Titulli:</span>
                  <span className="font-bold text-stone-900">{formData.titleSq || 'I papërcaktuar'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Kategoria & Lloji:</span>
                  <span className="font-bold text-stone-900 capitalize">
                    {formData.category} — {formData.propertyType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Transaksioni:</span>
                  <span className="font-bold text-stone-900">
                    {formData.transaction === 'sale' ? 'Në Shitje' : 'Me Qira'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Çmimi:</span>
                  <span className="font-bold text-stone-900">€{Number(formData.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Sipërfaqja:</span>
                  <span className="font-bold text-stone-900">
                    {formData.areaSqm} m²
                    {formData.category === 'land' && ` (${((formData.areaSqm || 0) / 100).toFixed(2)} Ari)`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Lokacioni:</span>
                  <span className="font-bold text-stone-900">
                    {formData.location?.country === 'Kosovo' ? '🇽🇰' : '🇦🇱'} {formData.location?.city}, {formData.location?.neighborhood}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Prona do të kontrollohet nga stafi i moderimit brenda disa minutash.</span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-stone-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.wizard.prev}</span>
              </button>
            ) : <div />}

            {currentStep < 10 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>{t.wizard.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalPublish}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold transition-colors shadow-xs"
              >
                {t.wizard.publishListing}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
