import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  Users, Plus, Search, MessageSquare, Phone, Mail, 
  Calendar, CheckCircle2, Clock, AlertCircle, ArrowRight, 
  MoreVertical, FileText, Send, UserCheck, DollarSign,
  ChevronRight, Sparkles, MapPin, Tag, Coins, ShieldCheck
} from 'lucide-react';
import { CrmLead, LeadStage } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ModalShell } from './ui/ModalShell';

export const CrmLeadsManager: React.FC = () => {
  const { crmLeads, updateLeadStage, addLeadNote, addCrmLead, listings, convertPrice } = useApp();
  const { locale } = useLocale();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Lead Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLocation, setNewLocation] = useState('Zvicër 🇨🇭');
  const [newListingId, setNewListingId] = useState(listings[0]?.id || '');
  const [newDealValue, setNewDealValue] = useState(120000);
  const [newSource, setNewSource] = useState<CrmLead['source']>('web_inquiry');
  const [newInitialNote, setNewInitialNote] = useState('');

  const stages: { key: LeadStage; title: string; color: string; count: number }[] = [
    { 
      key: 'new_inquiry', 
      title: 'Kërkesa të Reja', 
      color: 'border-amber-300 bg-amber-50 text-amber-900',
      count: crmLeads.filter(l => l.stage === 'new_inquiry').length 
    },
    { 
      key: 'viewing_scheduled', 
      title: 'Vizita të Caktuara', 
      color: 'border-sky-300 bg-sky-50 text-sky-900',
      count: crmLeads.filter(l => l.stage === 'viewing_scheduled').length 
    },
    { 
      key: 'negotiation', 
      title: 'Në Negocim / Oferta', 
      color: 'border-[#DFBE89] bg-[#FAF5EC] text-[#10241A]',
      count: crmLeads.filter(l => l.stage === 'negotiation').length 
    },
    { 
      key: 'under_notary', 
      title: 'Kontratë te Noteri', 
      color: 'border-[#C2E8D0] bg-[#E8F8EE] text-[#0E6C38]',
      count: crmLeads.filter(l => l.stage === 'under_notary').length 
    },
    { 
      key: 'closed_won', 
      title: 'E Mbyllur me Sukses', 
      color: 'border-[#10241A] bg-[#10241A] text-white',
      count: crmLeads.filter(l => l.stage === 'closed_won').length 
    }
  ];

  const filteredLeads = crmLeads.filter(lead => {
    const matchesSearch = 
      lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalPipelineValue = crmLeads
    .filter(l => l.stage !== 'lost')
    .reduce((sum, l) => sum + l.dealValue, 0);

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const matchedListing = listings.find(l => l.id === newListingId);

    addCrmLead({
      clientName: newName,
      clientPhone: newPhone,
      clientEmail: newEmail,
      clientLocation: newLocation,
      listingId: newListingId,
      listingTitle: matchedListing ? matchedListing.titleSq : 'Interesim i Përgjithshëm',
      dealValue: newDealValue,
      stage: 'new_inquiry',
      source: newSource,
      initialNote: newInitialNote
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewInitialNote('');
  };

  const handleAddNote = (leadId: string) => {
    if (!newNoteText.trim()) return;
    addLeadNote(leadId, newNoteText);
    setNewNoteText('');
  };

  const openWhatsApp = (phone: string, clientName: string, listingTitle: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Përshëndetje ${clientName}, po ju kontaktoj nga SHITJE PRONASH Premium Real Estate lidhur me interesimin tuaj për: "${listingTitle}". Kur do të ishte koha më e përshtatshme për një bisedë të shkurtër?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & KPI Summary */}
      <div className="bg-white p-6 rounded-3xl border border-[#ECE7DE] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC] text-[#8B6E39] text-xs font-bold uppercase tracking-wider mb-2 border border-[#E9DCBE]">
            <Users className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Broker & Agency CRM Lead Pipeline</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#10241A]">
            Menaxhimi i Klientëve & Marrëveshjeve (CRM)
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Gjurmoni interesimet nga formulari i diasporës, uebfaqja dhe thirrjet telefonike nga kontakti fillestar deri te noteri.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#FAF8F5] px-4 py-2.5 rounded-2xl border border-[#ECE7DE] text-right">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Vlera e Pipeline</span>
            <span className="text-lg font-bold text-[#10241A] font-serif">{convertPrice(totalPipelineValue).formatted}</span>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus className="w-4 h-4 text-[#DFBE89]" />}
          >
            Shto Klient / Lead të Ri
          </Button>
        </div>
      </div>

      {/* Search and Stage Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#ECE7DE]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89758]" />
          <input
            type="text"
            placeholder="Kërko me emër, telefon ose pronë..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] text-xs text-[#10241A] focus:outline-none focus:ring-1 focus:ring-[#10241A] focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {stages.map(stage => (
            <div
              key={stage.key}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${stage.color}`}
            >
              <span>{stage.title}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px] font-black">{stage.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = filteredLeads.filter(l => l.stage === stage.key);

          return (
            <div
              key={stage.key}
              className="bg-[#FAF8F5] rounded-3xl p-3.5 border border-[#ECE7DE] flex flex-col min-h-[480px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ECE7DE]">
                <span className="text-xs font-bold font-serif text-[#10241A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B89758]"></span>
                  {stage.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-[11px] font-bold text-[#10241A] border border-[#ECE7DE] shadow-2xs">
                  {stageLeads.length}
                </span>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageLeads.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-center text-xs text-stone-400 border-2 border-dashed border-[#ECE7DE] rounded-2xl p-2 font-medium">
                    Nuk ka marrëveshje në këtë fazë
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="bg-white p-3.5 rounded-2xl border border-[#ECE7DE] shadow-2xs hover:border-[#DFBE89] hover:shadow-md transition-all cursor-pointer group space-y-2.5"
                    >
                      {/* Top: Client Name & Source */}
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-bold text-[#10241A] group-hover:text-[#B89758] transition-colors">
                            {lead.clientName}
                          </h4>
                          {lead.clientLocation && (
                            <span className="text-[10px] text-stone-500 flex items-center gap-0.5 mt-0.5 font-medium">
                              <MapPin className="w-3 h-3 text-[#B89758]" />
                              {lead.clientLocation}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF5EC] text-[#8B6E39] border border-[#E9DCBE]">
                          {convertPrice(lead.dealValue).formatted}
                        </span>
                      </div>

                      {/* Property Title */}
                      <p className="text-[11px] text-stone-700 line-clamp-1 bg-[#FAF8F5] p-1.5 rounded-xl border border-[#ECE7DE] font-medium">
                        {lead.listingTitle}
                      </p>

                      {/* Notes count & Date */}
                      <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-[#ECE7DE]">
                        <span className="flex items-center gap-1 text-stone-500 font-medium">
                          <FileText className="w-3 h-3 text-[#B89758]" />
                          {lead.notes.length} shënime
                        </span>
                        <span>{new Date(lead.updatedAt).toLocaleDateString()}</span>
                      </div>

                      {/* Stage Mover Selector */}
                      <div className="pt-1 flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.stage}
                          onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
                          className="w-full text-[10px] font-bold py-1.5 px-2 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] text-[#10241A] cursor-pointer focus:outline-none focus:bg-white"
                        >
                          <option value="new_inquiry">1. Kërkesë e Re</option>
                          <option value="viewing_scheduled">2. Vizitë e Caktuar</option>
                          <option value="negotiation">3. Në Negocim</option>
                          <option value="under_notary">4. Te Noteri</option>
                          <option value="closed_won">5. E Mbyllur (Won)</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail & Notes Modal */}
      {selectedLead && (
        <ModalShell
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={selectedLead.clientName}
          subtitle={`${selectedLead.clientLocation} • ${selectedLead.clientPhone} • ${selectedLead.clientEmail}`}
          icon={<Users className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="lg"
          headerTheme="dark"
        >
          <div className="space-y-6">
            
            {/* Quick Contact & WhatsApp Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => openWhatsApp(selectedLead.clientPhone, selectedLead.clientName, selectedLead.listingTitle)}
                icon={<MessageSquare className="w-4 h-4 text-[#DFBE89]" />}
              >
                Kontakto në WhatsApp (Shabllon Shqip)
              </Button>

              <a
                href={`tel:${selectedLead.clientPhone}`}
                className="px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#ECE7DE] text-[#10241A] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#ECE7DE]"
              >
                <Phone className="w-3.5 h-3.5 text-[#B89758]" />
                <span>Telefono</span>
              </a>

              <a
                href={`mailto:${selectedLead.clientEmail}`}
                className="px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#ECE7DE] text-[#10241A] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#ECE7DE]"
              >
                <Mail className="w-3.5 h-3.5 text-[#B89758]" />
                <span>Dërgo Email</span>
              </a>
            </div>

            {/* Property & Deal Info */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#ECE7DE] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Prona e Interesit:</span>
                <strong className="text-[#10241A] font-bold">{selectedLead.listingTitle}</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Vlera e Parashikuar e Transaksionit:</span>
                <strong className="text-[#0E6C38] font-bold font-serif text-sm">{convertPrice(selectedLead.dealValue).formatted}</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Faza Aktuale në Pipeline:</span>
                <select
                  value={selectedLead.stage}
                  onChange={(e) => {
                    const newStage = e.target.value as LeadStage;
                    updateLeadStage(selectedLead.id, newStage);
                    setSelectedLead({ ...selectedLead, stage: newStage });
                  }}
                  className="px-2.5 py-1 rounded-xl bg-white border border-[#ECE7DE] font-bold text-xs text-[#10241A]"
                >
                  <option value="new_inquiry">1. Kërkesë e Re</option>
                  <option value="viewing_scheduled">2. Vizitë e Caktuar</option>
                  <option value="negotiation">3. Në Negocim</option>
                  <option value="under_notary">4. Te Noteri</option>
                  <option value="closed_won">5. E Mbyllur (Won)</option>
                </select>
              </div>
            </div>

            {/* Notes Log */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-serif text-[#10241A] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#B89758]" />
                <span>Historiku i Komunikimit & Shënimet e Agjentit</span>
              </h4>

              {/* Add note input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Shëno detaje të bisedës, ofertës ose vizitës..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddNote(selectedLead.id);
                  }}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] text-xs text-[#10241A] focus:outline-none focus:bg-white font-medium"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddNote(selectedLead.id)}
                >
                  Shto Shënim
                </Button>
              </div>

              {/* Notes list */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedLead.notes.length === 0 ? (
                  <p className="text-xs text-stone-400 italic">Ende nuk ka shënime për këtë klient.</p>
                ) : (
                  selectedLead.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span className="font-bold text-[#10241A]">{note.authorName}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-stone-700 font-medium">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </ModalShell>
      )}

      {/* Add New Lead Modal */}
      {isAddModalOpen && (
        <ModalShell
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Regjistro Klient / Lead të Ri"
          subtitle="Shtoni kërkesën e re në tubacionin tuaj të shitjes"
          icon={<Plus className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="md"
          headerTheme="dark"
        >
          <form onSubmit={handleAddLeadSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Emri dhe Mbiemri i Klientit *</label>
              <input
                type="text"
                required
                placeholder="p.sh. Agron Krasniqi"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] focus:outline-none focus:bg-white font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Numri i Telefonit *</label>
                <input
                  type="text"
                  required
                  placeholder="+41 79 000 0000"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] focus:outline-none focus:bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="email@domain.ch"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] focus:outline-none focus:bg-white font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Vendi i Vendbanimit</label>
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] text-[#10241A] focus:outline-none bg-[#FAF8F5] font-medium"
                >
                  <option value="Zvicër 🇨🇭">Zvicër 🇨🇭</option>
                  <option value="Gjermani 🇩🇪">Gjermani 🇩🇪</option>
                  <option value="Austri 🇦🇹">Austri 🇦🇹</option>
                  <option value="SHBA 🇺🇸">SHBA 🇺🇸</option>
                  <option value="Angli 🇬🇧">Angli 🇬🇧</option>
                  <option value="Prishtinë 🇽🇰">Prishtinë 🇽🇰</option>
                  <option value="Tiranë 🇦🇱">Tiranë 🇦🇱</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Buxheti / Vlera (€)</label>
                <input
                  type="number"
                  value={newDealValue}
                  onChange={(e) => setNewDealValue(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] focus:outline-none focus:bg-white font-bold"
                  step="5000"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Prona e Interesit</label>
              <select
                value={newListingId}
                onChange={(e) => setNewListingId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] text-[#10241A] focus:outline-none bg-[#FAF8F5] font-medium"
              >
                {listings.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.titleSq} ({convertPrice(l.price).formatted})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Shënimi Fillestar</label>
              <textarea
                rows={2}
                placeholder="Kërkesa specifike, koha e dëshiruar e vizitës, etj."
                value={newInitialNote}
                onChange={(e) => setNewInitialNote(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#ECE7DE] bg-[#FAF8F5] text-[#10241A] focus:outline-none focus:bg-white font-medium"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
              >
                Anulo
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Ruaj Klientin
              </Button>
            </div>
          </form>
        </ModalShell>
      )}

    </div>
  );
};
