import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, CheckCircle2, XCircle, AlertCircle, Eye, 
  Settings, Flag, ShieldAlert, Check, RefreshCw, Layers, DollarSign 
} from 'lucide-react';
import { PropertyReport } from '../types';

export const AdminPage: React.FC = () => {
  const { t } = useLocale();
  const { 
    listings, updateListingStatus, setActiveListing, setActiveView,
    reports, updateReportStatus, platformSettings, updatePlatformSettings 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'moderation' | 'reports' | 'settings'>('moderation');
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [savedSettingsMsg, setSavedSettingsMsg] = useState(false);

  const pendingListings = listings.filter(l => l.status === 'pending');
  const pendingReports = reports.filter(r => r.status === 'pending');
  const allCount = listings.length;
  const publishedCount = listings.filter(l => l.status === 'published').length;

  const handleApprove = (id: string) => {
    updateListingStatus(id, 'published');
  };

  const handleReject = (id: string) => {
    if (!rejectionReason.trim()) {
      alert('Ju lutem shkruani arsyen e refuzimit për përdoruesin.');
      return;
    }
    updateListingStatus(id, 'rejected', rejectionReason);
    setRejectId(null);
    setRejectionReason('');
  };

  const handleTakeDownReportedProperty = (report: PropertyReport) => {
    updateListingStatus(report.listingId, 'rejected', `Shkarkuar pas raportimit: ${report.details}`);
    updateReportStatus(report.id, 'resolved');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettingsMsg(true);
    setTimeout(() => setSavedSettingsMsg(false), 3000);
  };

  const reasonLabels: Record<PropertyReport['reason'], string> = {
    fraud: 'Mashtrim Financiar',
    fake_property: 'Pronë Jo-ekzistente',
    stolen_photos: 'Foto të Vjedhura',
    wrong_info: 'Të Dhëna të Pasakta',
    inappropriate: 'Përmbajtje e Papërshtatshme',
    spam: 'Spam / E Përsëritur'
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Paneli Qendror i Administrimit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              Administrimi & Siguria e Platformës
            </h1>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-semibold uppercase">Prona Gjithsej</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{allCount}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-semibold uppercase">Të Publikuara</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{publishedCount}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-semibold uppercase">Prona në Shqyrtim</div>
            <div className="text-2xl font-bold text-amber-600 mt-1">{pendingListings.length}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-semibold uppercase">Raportime të Hapura</div>
            <div className="text-2xl font-bold text-rose-600 mt-1">{pendingReports.length}</div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-stone-200 mb-8 space-x-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab('moderation')}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'moderation' 
                ? 'border-stone-900 text-stone-900 font-bold' 
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Radha e Moderimit ({pendingListings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reports' 
                ? 'border-stone-900 text-stone-900 font-bold' 
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Raportimet e Përdoruesve ({pendingReports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'settings' 
                ? 'border-stone-900 text-stone-900 font-bold' 
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cilësimet e Platformës</span>
          </button>
        </div>

        {/* TAB 1: LISTING MODERATION QUEUE */}
        {activeTab === 'moderation' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-stone-900 font-serif mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span>Pronat që kërkojnë miratim paraprak ({pendingListings.length})</span>
            </h2>

            {pendingListings.length === 0 ? (
              <div className="p-12 text-center text-stone-500 text-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold text-stone-700">Radha e moderimit është e pastër!</p>
                <p className="text-xs text-stone-400 mt-1">Të gjitha pronat e reja janë shqyrtuar me sukses.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingListings.map(listing => (
                  <div key={listing.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={listing.media[0]?.thumbnailUrl || listing.media[0]?.url} 
                        alt="thumb" 
                        className="w-16 h-16 rounded-xl object-cover shrink-0" 
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                            {listing.category}
                          </span>
                          <span className="text-xs text-stone-400 font-mono">ID: {listing.id}</span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900">{listing.titleSq}</h4>
                        <div className="text-xs text-stone-500 mt-1">
                          Autori: <strong>{listing.userName}</strong> ({listing.userRole}) • Çmimi: €{listing.price.toLocaleString()} • {listing.location.city}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      <button
                        onClick={() => { setActiveListing(listing); setActiveView('detail'); }}
                        className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                      >
                        Inspekto
                      </button>
                      <button
                        onClick={() => handleApprove(listing.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mirato</span>
                      </button>
                      <button
                        onClick={() => setRejectId(listing.id)}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Refuzo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: USER FRAUD & SAFETY REPORTS */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-stone-900 font-serif mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Raportimet e Përdoruesve për Mashtrim ose Shkelje ({reports.length})</span>
            </h2>

            {reports.length === 0 ? (
              <div className="p-12 text-center text-stone-500 text-sm">
                Nuk ka asnjë raportim nga përdoruesit.
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map(report => (
                  <div
                    key={report.id}
                    className={`p-4 rounded-xl border transition-all ${
                      report.status === 'pending' 
                        ? 'bg-rose-50/40 border-rose-200' 
                        : 'bg-stone-50/40 border-stone-200 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase">
                          {reasonLabels[report.reason] || report.reason}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          report.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-700'
                        }`}>
                          Statusi: {report.status === 'pending' ? 'Në Pritje' : report.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-400">
                        Raportuar më {new Date(report.createdAt).toLocaleString()} nga {report.reporterEmail}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900 mt-1">
                      Prona e raportuar: <span className="text-stone-700">{report.listingTitle}</span> (ID: {report.listingId})
                    </h4>

                    <div className="bg-white p-3 rounded-lg border border-stone-200/80 text-xs text-stone-700 my-3">
                      <strong>Arsyeja e raportuesit:</strong> {report.details}
                    </div>

                    {report.status === 'pending' && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-rose-100">
                        <button
                          onClick={() => updateReportStatus(report.id, 'dismissed')}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                        >
                          Refuzo Raportin
                        </button>
                        <button
                          onClick={() => updateReportStatus(report.id, 'resolved')}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Shëno si të Zgjidhur</span>
                        </button>
                        <button
                          onClick={() => handleTakeDownReportedProperty(report)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Blloko & Hiq Pronën</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PLATFORM & MARKET SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs max-w-3xl">
            <h2 className="text-lg font-bold text-stone-900 font-serif mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-stone-700" />
              <span>Cilësimet e Përgjithshme & Politikat e Tregut</span>
            </h2>

            {savedSettingsMsg && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cilësimet e platformës u ruajtën me sukses!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              {/* Moderation Policy Toggle */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Verifikimi Paraprak i Pronave (Moderimi)</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Kur është aktive, të gjitha shpalljet e reja duhet të aprovohen nga administratori para se të shfaqen në kërkim.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={platformSettings.requireListingModeration}
                    onChange={e => updatePlatformSettings({ requireListingModeration: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Currency Exchange Rate (EUR -> ALL) */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Kursi i Këmbimit: 1 EUR në Lekë Shqiptar (ALL)
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <input
                      type="number"
                      step="0.1"
                      value={platformSettings.eurToAllRate}
                      onChange={e => updatePlatformSettings({ eurToAllRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-stone-500">Përdoret për konvertim automatik për blerësit nga Shqipëria</span>
                </div>
              </div>

              {/* Guest Contacts Permission */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Lejo Komunikimin nga Vizitorët (Mysafirët)</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Blerësit mund të dërgojnë mesazhe dhe kërkesa pa pasur nevojë të hapin llogari fillimisht.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={platformSettings.allowGuestContacts}
                    onChange={e => updatePlatformSettings({ allowGuestContacts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Support Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email-i Zyrtar i Mbështetjes:
                  </label>
                  <input
                    type="email"
                    value={platformSettings.supportEmail}
                    onChange={e => updatePlatformSettings({ supportEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Telefoni i Mbështetjes:
                  </label>
                  <input
                    type="text"
                    value={platformSettings.supportPhone}
                    onChange={e => updatePlatformSettings({ supportPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
                >
                  Ruaj Cilësimet
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Rejection Reason Modal */}
        {rejectId && (
          <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200">
              <h3 className="text-base font-bold text-stone-900 mb-2">Arsyetimi i Refuzimit të Pronës</h3>
              <p className="text-xs text-stone-500 mb-4">Shkruani pse prona nuk plotëson kriteret e publikimit:</p>
              
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={e => setRejectionReason(e.target.value)}
                placeholder="p.sh. Foto të paqarta, mungesë e certifikatës së pronësisë ose çmim fiktiv..."
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs mb-4 focus:outline-none"
              />

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setRejectId(null)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Anulo
                </button>
                <button
                  onClick={() => handleReject(rejectId)}
                  className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-rose-700"
                >
                  Konfirmo Refuzimin
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
