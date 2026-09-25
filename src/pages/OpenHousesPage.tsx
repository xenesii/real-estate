import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { OpenHouseEvent } from '../types';
import { 
  Calendar, Clock, Video, Users, MapPin, CheckCircle2, 
  Sparkles, Plus, Radio, ArrowRight, ExternalLink, Share2, 
  Download, Phone, Mail, X, AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ModalShell } from '../components/ui/ModalShell';

export const OpenHousesPage: React.FC = () => {
  const { openHouses, rsvpOpenHouse, scheduleOpenHouse, listings, setActiveListing, setActiveView, convertPrice } = useApp();
  const { locale } = useLocale();

  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'in_person' | 'live_stream' | 'hybrid'>('all');
  
  // RSVP Modal
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<OpenHouseEvent | null>(null);
  const [guestName, setGuestName] = useState('Arben Berisha');
  const [guestEmail, setGuestEmail] = useState('arben.b@gmail.com');
  const [guestPhone, setGuestPhone] = useState('+383 44 111 222');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Host Open House Modal
  const [hostModalOpen, setHostModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(listings[0]?.id || '');
  const [hostDate, setHostDate] = useState('2026-04-18');
  const [hostStartTime, setHostStartTime] = useState('11:00');
  const [hostEndTime, setHostEndTime] = useState('15:00');
  const [hostType, setHostType] = useState<'in_person' | 'live_stream' | 'hybrid'>('hybrid');
  const [hostMaxAttendees, setHostMaxAttendees] = useState(25);
  const [hostNotes, setHostNotes] = useState('Prezantim i plotë me ekspertë financiarë dhe kafe mirëseardhjeje.');

  const filteredEvents = openHouses.filter(event => {
    if (filterCity !== 'all' && event.city !== filterCity) return false;
    if (filterType !== 'all' && event.type !== filterType && event.type !== 'hybrid') return false;
    return true;
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForRsvp) return;

    rsvpOpenHouse(selectedEventForRsvp.id, {
      name: guestName,
      email: guestEmail,
      phone: guestPhone
    });

    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setSelectedEventForRsvp(null);
    }, 2000);
  };

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listing = listings.find(l => l.id === selectedListingId);
    if (!listing) return;

    scheduleOpenHouse({
      listingId: listing.id,
      listingTitle: listing.titleSq,
      listingCover: listing.media[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      listingPrice: listing.price,
      city: listing.location.city,
      country: listing.location.country,
      address: listing.displayAddress,
      date: hostDate,
      startTime: hostStartTime,
      endTime: hostEndTime,
      type: hostType,
      liveStreamPlatform: hostType !== 'in_person' ? 'built_in' : undefined,
      maxAttendees: hostMaxAttendees,
      agentName: listing.userName || 'Agjenti PRONAT',
      agentPhone: listing.userPhone || '+383 44 123 456',
      notes: hostNotes
    });

    setHostModalOpen(false);
  };

  // Helper to generate iCal (.ics) calendar file
  const generateIcsCalendar = (event: OpenHouseEvent) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PRONAT Real Estate//Open House Event//SQ',
      'BEGIN:VEVENT',
      `SUMMARY:Open House: ${event.listingTitle}`,
      `DESCRIPTION:${event.notes || 'Vizitë e hapur e patundshmërisë'}\\nAgjenti: ${event.agentName} (${event.agentPhone})`,
      `LOCATION:${event.address}, ${event.city}`,
      `DTSTART:${event.date.replace(/-/g, '')}T${event.startTime.replace(':', '')}00Z`,
      `DTEND:${event.date.replace(/-/g, '')}T${event.endTime.replace(':', '')}00Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `open-house-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-24 bg-[#FBFBFA]">
      
      {/* Header Banner - Luxury Forest Green & Champagne Gold Theme */}
      <div className="bg-[#10241A] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C3E2D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBE89_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163324] border border-[#2B543D] text-[#DFBE89] text-xs font-semibold mb-4 shadow-2xs">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#DFBE89]" />
                <span>Vizita Fizike & Transmetime Live 4K</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white mb-3 leading-tight">
                Open House & Vizita <span className="text-[#DFBE89]">Live të Hapura</span>
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Zbuloni pronat më ekskluzive në Kosovë dhe Shqipëri pa pasur nevojë për takim individual. Rezervoni vendin tuaj në vizitat fizike ose ndiqni transmetimet live me agjentët tanë.
              </p>
            </div>

            <Button
              variant="gold"
              size="md"
              onClick={() => setHostModalOpen(true)}
              icon={<Plus className="w-4 h-4 text-[#10241A]" />}
            >
              Planifiko Open House
            </Button>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-[#2B543D]">
            <span className="text-xs font-bold text-[#DFBE89] uppercase tracking-wider">Filtro sipas:</span>
            
            {/* City Filter */}
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="text-xs bg-[#163324] border border-[#2B543D] text-white rounded-xl px-3.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-[#B89758]"
            >
              <option value="all">Të gjitha qytetet</option>
              <option value="Prishtinë">Prishtinë 🇽🇰</option>
              <option value="Tiranë">Tiranë 🇦🇱</option>
              <option value="Vlorë">Vlorë 🇦🇱</option>
              <option value="Prizren">Prizren 🇽🇰</option>
            </select>

            {/* Event Type Filter */}
            <div className="flex items-center gap-1.5 bg-[#163324]/80 p-1 rounded-xl border border-[#2B543D]">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'all' ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                Të Gjitha
              </button>
              <button
                type="button"
                onClick={() => setFilterType('in_person')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filterType === 'in_person' ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Në Vend (Fizikisht)</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterType('live_stream')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filterType === 'live_stream' ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-[#DFBE89]" />
                <span>Transmetim Live</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        <div className="bg-white rounded-2xl border border-[#ECE7DE] p-4 px-6 mb-8 flex items-center justify-between shadow-2xs">
          <h2 className="text-lg font-bold font-serif text-[#10241A]">
            Ngjarjet e Ardhshme të Hapura ({filteredEvents.length})
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            Përditësuar në kohë reale • 2026
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#ECE7DE] p-12 text-center max-w-lg mx-auto shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex items-center justify-center text-[#B89758] mx-auto mb-3 shadow-2xs">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#10241A] mb-1">Nuk ka Open House për filtrat e zgjedhur</h3>
            <p className="text-xs text-stone-500 mb-4">Provoni të ndryshoni qytetin ose llojin e eventit.</p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => { setFilterCity('all'); setFilterType('all'); }}
            >
              Shiko të Gjitha Ngjarjet
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map(event => {
              const formattedPrice = convertPrice(event.listingPrice).formatted;
              const isFull = event.currentRsvps >= event.maxAttendees;
              const spotsLeft = Math.max(0, event.maxAttendees - event.currentRsvps);

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl border border-[#ECE7DE] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#DFBE89] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover & Badges */}
                    <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
                      <img
                        src={event.listingCover}
                        alt={event.listingTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10241A]/90 via-transparent to-black/30" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-2xs flex items-center gap-1.5 ${
                          event.type === 'live_stream'
                            ? 'bg-rose-600'
                            : event.type === 'hybrid'
                            ? 'bg-[#10241A] text-[#DFBE89] border border-[#2B543D]'
                            : 'bg-[#0E6C38]'
                        }`}>
                          {event.type === 'live_stream' && <Video className="w-3.5 h-3.5" />}
                          {event.type === 'in_person' && <Users className="w-3.5 h-3.5" />}
                          {event.type === 'hybrid' && <Radio className="w-3.5 h-3.5 animate-pulse text-[#DFBE89]" />}
                          <span>
                            {event.type === 'live_stream' ? 'Live Stream 4K' : event.type === 'hybrid' ? 'Fizikisht + Live' : 'Vizitë Fizike'}
                          </span>
                        </span>

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {event.city} {event.country === 'Kosovo' ? '🇽🇰' : '🇦🇱'}
                        </span>
                      </div>

                      {/* Date & Time pill bottom */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2 text-xs font-bold bg-[#10241A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#2B543D]">
                          <Calendar className="w-3.5 h-3.5 text-[#DFBE89]" />
                          <span>
                            {new Date(event.date).toLocaleDateString('sq-AL', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-stone-400">•</span>
                          <Clock className="w-3.5 h-3.5 text-[#DFBE89]" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>

                        <span className="text-lg font-black text-[#DFBE89] font-serif drop-shadow-md">
                          {formattedPrice}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold font-serif text-[#10241A] group-hover:text-[#B89758] transition-colors leading-snug">
                          {event.listingTitle}
                        </h3>
                        <p className="text-xs text-stone-500 flex items-center gap-1 mt-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                          <span>{event.address}, {event.city}</span>
                        </p>
                      </div>

                      {event.notes && (
                        <p className="text-xs text-stone-600 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#ECE7DE] leading-relaxed">
                          {event.notes}
                        </p>
                      )}

                      {/* Host Agent & RSVP Capacity */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#ECE7DE] text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden border border-[#ECE7DE]">
                            <img
                              src={event.agentAvatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=128&q=80'}
                              alt={event.agentName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-[#10241A] block">{event.agentName}</span>
                            <span className="text-[10px] text-stone-400">{event.agentPhone}</span>
                          </div>
                        </div>

                        {/* Capacity meter */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#10241A]">
                            {event.currentRsvps} / {event.maxAttendees} Vende
                          </span>
                          <span className={`block text-[10px] font-bold ${isFull ? 'text-rose-600' : 'text-[#0E6C38]'}`}>
                            {isFull ? 'Event i Plotësuar' : `Edhe ${spotsLeft} vende të lira`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-6 pt-0 flex items-center gap-2">
                    <Button
                      variant={isFull ? 'secondary' : 'primary'}
                      size="md"
                      fullWidth
                      disabled={isFull}
                      onClick={() => setSelectedEventForRsvp(event)}
                      icon={<CheckCircle2 className="w-4 h-4 text-[#DFBE89]" />}
                    >
                      {isFull ? 'Plotësuar' : 'Rezervo Vendin Falas (RSVP)'}
                    </Button>

                    <button
                      type="button"
                      onClick={() => generateIcsCalendar(event)}
                      className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#ECE7DE] text-stone-700 text-xs font-semibold transition-colors flex items-center gap-1 border border-[#ECE7DE] cursor-pointer"
                      title="Shto në Kalendar (Google / Apple)"
                    >
                      <Calendar className="w-4 h-4 text-[#B89758]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RSVP Booking Modal */}
      {selectedEventForRsvp && (
        <ModalShell
          isOpen={!!selectedEventForRsvp}
          onClose={() => setSelectedEventForRsvp(null)}
          title="Konfirmo Pjesëmarrjen (RSVP)"
          subtitle={selectedEventForRsvp.listingTitle}
          icon={<Calendar className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="md"
          headerTheme="dark"
        >
          {rsvpSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F8EE] border border-[#C2E8D0] text-[#0E6C38] flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold font-serif text-[#10241A]">Rezervimi u Konfirmua me Sukses!</h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                Agjenti {selectedEventForRsvp.agentName} është njoftuar. Detajet dhe ftesa u dërguan në {guestEmail}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] text-xs space-y-1 text-stone-700">
                <p><strong>Data:</strong> {selectedEventForRsvp.date} ({selectedEventForRsvp.startTime} - {selectedEventForRsvp.endTime})</p>
                <p><strong>Adresa:</strong> {selectedEventForRsvp.address}, {selectedEventForRsvp.city}</p>
                <p><strong>Lloji:</strong> {selectedEventForRsvp.type === 'live_stream' ? 'Transmetim Online 4K' : 'Vizitë Fizike në Vend'}</p>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Emri & Mbiemri</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3.5 py-2.5 font-medium text-[#10241A] focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3.5 py-2.5 font-medium text-[#10241A] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Telefon / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3.5 py-2.5 font-medium text-[#10241A] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedEventForRsvp(null)}
                >
                  Anulo
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  Konfirmo Vendin
                </Button>
              </div>
            </form>
          )}
        </ModalShell>
      )}

      {/* Host New Open House Modal */}
      {hostModalOpen && (
        <ModalShell
          isOpen={hostModalOpen}
          onClose={() => setHostModalOpen(false)}
          title="Planifiko një Open House"
          subtitle="Krijoni vizitë të hapur fizike ose live stream për pronën tuaj"
          icon={<Plus className="w-5 h-5 text-[#DFBE89]" />}
          maxWidth="md"
          headerTheme="dark"
        >
          <form onSubmit={handleHostSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Zgjidh Pronën Tënde</label>
              <select
                value={selectedListingId}
                onChange={(e) => setSelectedListingId(e.target.value)}
                className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2.5 font-medium text-[#10241A] focus:outline-none"
              >
                {listings.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.titleSq} ({l.location.city} - {convertPrice(l.price).formatted})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Data e Ngjarjes</label>
                <input
                  type="date"
                  required
                  value={hostDate}
                  onChange={(e) => setHostDate(e.target.value)}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Formati</label>
                <select
                  value={hostType}
                  onChange={(e) => setHostType(e.target.value as any)}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A]"
                >
                  <option value="hybrid">Hibrid (Fizikisht + Live)</option>
                  <option value="in_person">Vetëm Fizikisht</option>
                  <option value="live_stream">Vetëm Live Stream</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Nga Ora</label>
                <input
                  type="text"
                  value={hostStartTime}
                  onChange={(e) => setHostStartTime(e.target.value)}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Deri në Orën</label>
                <input
                  type="text"
                  value={hostEndTime}
                  onChange={(e) => setHostEndTime(e.target.value)}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Kapaciteti Max</label>
                <input
                  type="number"
                  value={hostMaxAttendees}
                  onChange={(e) => setHostMaxAttendees(Number(e.target.value))}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-bold text-[#10241A]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Udhëzime & Shënime për Vizitorët</label>
              <textarea
                rows={2}
                value={hostNotes}
                onChange={(e) => setHostNotes(e.target.value)}
                className="w-full text-xs bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3 py-2 font-medium text-[#10241A]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setHostModalOpen(false)}
              >
                Anulo
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Publiko Open House
              </Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
};
