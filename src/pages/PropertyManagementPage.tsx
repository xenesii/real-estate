import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  Building, UserCheck, Wrench, CreditCard, Plus, Check, X, 
  AlertCircle, Clock, ShieldCheck, FileText, Filter, Search, Phone, Mail, ArrowUpRight,
  Sparkles, CheckCircle2, ArrowRight, User, Key, Home, DollarSign, Calendar
} from 'lucide-react';
import { TenantApplication, MaintenanceTicket, RentPaymentRecord } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ModalShell } from '../components/ui/ModalShell';

export const PropertyManagementPage: React.FC = () => {
  const { 
    tenantApplications, 
    updateTenantApplicationStatus, 
    maintenanceTickets, 
    addMaintenanceTicket, 
    updateMaintenanceStatus,
    rentPayments,
    openContractBuilder,
    convertPrice,
    setActiveView
  } = useApp();
  const { locale } = useLocale();

  const [activeTab, setActiveTab] = useState<'applications' | 'maintenance' | 'payments'>('applications');
  
  // New Maintenance Ticket Modal state
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    propertyTitle: 'Apartament 1+1 Lux në Pejton',
    tenantName: 'Drenusha Hoxha',
    tenantPhone: '+383 49 111 222',
    category: 'heating' as MaintenanceTicket['category'],
    title: '',
    description: '',
    urgency: 'medium' as MaintenanceTicket['urgency']
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.description) return;

    addMaintenanceTicket({
      propertyId: 'p-custom',
      propertyTitle: newTicket.propertyTitle,
      tenantName: newTicket.tenantName,
      tenantPhone: newTicket.tenantPhone,
      category: newTicket.category,
      title: newTicket.title,
      description: newTicket.description,
      urgency: newTicket.urgency,
      status: 'open',
      reportedDate: new Date().toISOString().split('T')[0]
    });

    setShowNewTicketModal(false);
    setNewTicket({
      propertyTitle: 'Apartament 1+1 Lux në Pejton',
      tenantName: 'Drenusha Hoxha',
      tenantPhone: '+383 49 111 222',
      category: 'heating',
      title: '',
      description: '',
      urgency: 'medium'
    });
  };

  const totalMonthlyCollected = rentPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingApplicationsCount = tenantApplications.filter(a => a.status === 'pending').length;
  const activeTicketsCount = maintenanceTickets.filter(t => t.status !== 'resolved').length;

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24">
      
      {/* Header Banner - Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
                <Building className="w-3.5 h-3.5 text-[#B89758]" />
                <span>Portal Pronarësh & Menaxhim Qirash (Landlord Hub)</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white mb-3 leading-tight">
                Menaxhimi i Pronave & <span className="text-[#DFBE89]">Qiramarrësve</span>
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Platforma e centralizuar për pronarët: Shqyrtimi dhe verifikimi i të ardhurave të qiramarrësve (Screening Score), zgjidhja e tikatave të mirëmbajtjes dhe kontrolli i arkëtimeve mujore.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                variant="gold"
                size="md"
                onClick={() => setShowNewTicketModal(true)}
                icon={<Plus className="w-4 h-4 text-[#10241A]" />}
              >
                Raporto Mirëmbajtje
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setActiveView('legal_contracts')}
                icon={<FileText className="w-4 h-4 text-[#B89758]" />}
              >
                Kontratat e Qirasë
              </Button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#2B543D]">
            <div className="bg-[#163324] p-4 rounded-2xl border border-[#2B543D]">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Aplikime në Shqyrtim</span>
              <span className="text-xl font-bold font-serif text-[#DFBE89]">{pendingApplicationsCount} Aplikantë</span>
            </div>

            <div className="bg-[#163324] p-4 rounded-2xl border border-[#2B543D]">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Tiketa Mirëmbajtjeje Aktive</span>
              <span className="text-xl font-bold font-serif text-white">{activeTicketsCount} Raste të Hapura</span>
            </div>

            <div className="bg-[#163324] p-4 rounded-2xl border border-[#2B543D]">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Arkëtime Qiraje këtë Muaj</span>
              <span className="text-xl font-bold font-serif text-emerald-400">{convertPrice(totalMonthlyCollected).formatted}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-6">
        
        {/* Tab Selector Bar */}
        <div className="bg-white rounded-2xl border border-[#ECE7DE] p-2 flex items-center gap-2 shadow-2xs overflow-x-auto scrollbar-none">
          {[
            { id: 'applications', label: `Aplikacionet e Qirasë (${tenantApplications.length})`, icon: UserCheck },
            { id: 'maintenance', label: `Tiketat e Mirëmbajtjes (${maintenanceTickets.filter(t => t.status !== 'resolved').length})`, icon: Wrench },
            { id: 'payments', label: `Statusi i Pagesave (${rentPayments.length})`, icon: CreditCard }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs'
                    : 'text-stone-600 hover:text-[#10241A] hover:bg-[#FAF8F5]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: TENANT APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tenantApplications.map(app => (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-2xs hover:shadow-xl hover:border-[#DFBE89] transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.listingCover}
                          alt={app.listingTitle}
                          className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#ECE7DE]"
                        />
                        <div>
                          <h4 className="text-base font-bold font-serif text-[#10241A] group-hover:text-[#B89758] transition-colors">{app.tenantName}</h4>
                          <span className="text-xs text-stone-500 font-medium block">{app.listingTitle}</span>
                        </div>
                      </div>

                      <Badge 
                        variant={app.status === 'approved' ? 'verified' : app.status === 'rejected' ? 'danger' : 'gold'}
                        size="xs"
                      >
                        {app.status === 'approved' ? 'Aprovuar' : app.status === 'rejected' ? 'Refuzuar' : 'Në Shqyrtim'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] text-xs">
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Të Ardhurat</span>
                        <span className="font-bold text-[#10241A] font-serif">{convertPrice(app.monthlyIncome).formatted} / muaj</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Mbulimi i Qirasë</span>
                        <span className="font-bold text-[#0E6C38]">
                          {(app.monthlyIncome / app.listingPrice).toFixed(1)}x Rent Cover
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Screening Score</span>
                        <span className="font-extrabold font-serif text-[#8B6E39]">{app.screeningScore} / 100</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2 pt-3 border-t border-[#ECE7DE]">
                    <div className="flex items-center gap-3 font-medium">
                      <span className="flex items-center gap-1 text-stone-500">
                        <Phone className="w-3.5 h-3.5 text-[#B89758]" />
                        {app.tenantPhone}
                      </span>
                    </div>

                    {app.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => updateTenantApplicationStatus(app.id, 'rejected')}
                        >
                          Refuzo
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => updateTenantApplicationStatus(app.id, 'approved')}
                          icon={<Check className="w-3.5 h-3.5 text-[#DFBE89]" />}
                        >
                          Aprovo Aplikacionin
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-stone-400 italic">Vendim i regjistruar</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MAINTENANCE TICKETS */}
        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <div className="space-y-3">
              {maintenanceTickets.map(ticket => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#DFBE89] transition-all"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={ticket.urgency === 'high' || ticket.urgency === 'emergency' ? 'danger' : 'gold'}
                        size="xs"
                      >
                        Urgjenca: {ticket.urgency.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-stone-400">• Raportuar më {ticket.reportedDate}</span>
                    </div>
                    <h4 className="text-base font-bold font-serif text-[#10241A]">{ticket.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{ticket.description}</p>
                    <span className="text-xs font-semibold text-[#8B6E39] block">
                      Prona: {ticket.propertyTitle} (Qiramarrësi: {ticket.tenantName})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {ticket.status !== 'resolved' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateMaintenanceStatus(ticket.id, 'resolved')}
                        icon={<Check className="w-4 h-4 text-[#DFBE89]" />}
                      >
                        Shëno si të Zgjidhur
                      </Button>
                    ) : (
                      <Badge variant="verified" size="sm">
                        Zgjidhur me Sukses ✓
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RENT PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-3xl border border-[#ECE7DE] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#ECE7DE] text-stone-600 font-bold uppercase tracking-wider font-serif">
                  <tr>
                    <th className="p-4">Prona & Qiramarrësi</th>
                    <th className="p-4">Shuma e Qirasë</th>
                    <th className="p-4">Data e Pagesës</th>
                    <th className="p-4">Statusi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE7DE]">
                  {rentPayments.map(pay => (
                    <tr key={pay.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-4">
                        <span className="font-bold text-[#10241A] block">{pay.propertyTitle}</span>
                        <span className="text-stone-500 font-medium">{pay.tenantName}</span>
                      </td>
                      <td className="p-4 font-extrabold font-serif text-[#10241A]">
                        {convertPrice(pay.amount).formatted}
                      </td>
                      <td className="p-4 text-stone-600 font-medium">
                        {pay.dueDate}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={pay.status === 'paid' ? 'verified' : pay.status === 'overdue' ? 'danger' : 'gold'}
                          size="xs"
                        >
                          {pay.status === 'paid' ? 'E Paguar' : pay.status === 'overdue' ? 'Vonesë' : 'Në Pritje'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* NEW MAINTENANCE TICKET MODAL */}
      {showNewTicketModal && (
        <ModalShell
          isOpen={showNewTicketModal}
          onClose={() => setShowNewTicketModal(false)}
          title="Raporto Defekt / Tiketë Mirëmbajtjeje"
          subtitle="Dërgoni kërkesën për intervenim teknik tek ekipi i mirëmbajtjes"
          icon={<Wrench className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="md"
          headerTheme="dark"
        >
          <form onSubmit={handleCreateTicket} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Titulli i Defektit *</label>
              <input
                type="text"
                required
                placeholder="p.sh. Rrjedhje uji në kthinën e larjes"
                value={newTicket.title}
                onChange={e => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] focus:outline-none focus:bg-white font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Kategoria</label>
                <select
                  value={newTicket.category}
                  onChange={e => setNewTicket(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] text-[#10241A] focus:outline-none bg-[#FAF8F5] font-medium"
                >
                  <option value="heating">Ngrohje & Sanitari</option>
                  <option value="plumbing">Gypa & Ujësjellës</option>
                  <option value="electrical">Rrymë & Elektrikë</option>
                  <option value="appliances">Pajisje Shtëpiake</option>
                  <option value="key_lock">Brava & Çelësa</option>
                  <option value="other">Tjetër</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Niveli i Urgjencës</label>
                <select
                  value={newTicket.urgency}
                  onChange={e => setNewTicket(prev => ({ ...prev, urgency: e.target.value as any }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] text-[#10241A] focus:outline-none bg-[#FAF8F5] font-medium"
                >
                  <option value="low">E Ulët</option>
                  <option value="medium">E Mesme</option>
                  <option value="high">E Lartë</option>
                  <option value="emergency">Urgjente (Avari)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Përshkrimi i Detajuar *</label>
              <textarea
                required
                rows={3}
                placeholder="Jepni detaje rreth problemit..."
                value={newTicket.description}
                onChange={e => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] focus:outline-none focus:bg-white font-medium"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowNewTicketModal(false)}
              >
                Anulo
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Dërgo Tiketën
              </Button>
            </div>
          </form>
        </ModalShell>
      )}

    </div>
  );
};
