import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Video, UserCheck, CheckCircle2, MapPin } from 'lucide-react';
import { ModalShell } from './ui/ModalShell';
import { Button } from './ui/Button';

interface ScheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  listingCover: string;
  listingPrice: number;
  listingCity: string;
}

export const ScheduleViewingModal: React.FC<ScheduleViewingModalProps> = ({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  listingCover,
  listingPrice,
  listingCity
}) => {
  const { scheduleViewing, currentUser, setActiveView } = useApp();

  const [visitType, setVisitType] = useState<'in_person' | 'virtual_tour'>('in_person');
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('16:30');
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const timeSlots = ['10:00', '11:30', '14:00', '16:30', '18:00', '19:30'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !selectedDate || !selectedTime) return;

    scheduleViewing({
      listingId,
      listingTitle,
      listingCover,
      listingPrice,
      listingCity,
      type: visitType,
      date: selectedDate,
      timeSlot: selectedTime,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      notes
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title="Rezervo Vizitë në Pronë"
      subtitle={`${listingTitle} • €${listingPrice.toLocaleString()}`}
      icon={<Calendar className="w-5 h-5" />}
      maxWidth="lg"
      headerTheme="dark"
    >
      {isSubmitted ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-[#E8F8EE] text-[#0E6C38] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C2E8D0]">
            <CheckCircle2 className="w-8 h-8 text-[#0E6C38]" />
          </div>
          <h3 className="text-xl font-bold font-serif text-[#10241A] mb-1">
            Kërkesa për Vizitë u Dërgua!
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
            Pronari apo agjenti do t&apos;ju kontaktojë brenda pak orëve për konfirmimin e orarit të përzgjedhur ({selectedDate} në {selectedTime}).
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={handleClose}
            >
              Mbyll Dritaren
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                setActiveView('dashboard');
              }}
            >
              Menaxho Vizitat te Paneli Im
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Visit Type: In-Person vs Virtual Tour */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
              Lloji i Vizitës
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVisitType('in_person')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  visitType === 'in_person'
                    ? 'bg-[#142C20] text-white border-[#142C20] shadow-2xs'
                    : 'bg-[#FAF8F5] text-stone-700 border-[#ECE7DE] hover:bg-[#F2ECE1]'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#DFBE89]" />
                <span>Në Vendngjarje</span>
              </button>

              <button
                type="button"
                onClick={() => setVisitType('virtual_tour')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  visitType === 'virtual_tour'
                    ? 'bg-[#142C20] text-white border-[#142C20] shadow-2xs'
                    : 'bg-[#FAF8F5] text-stone-700 border-[#ECE7DE] hover:bg-[#F2ECE1]'
                }`}
              >
                <Video className="w-4 h-4 text-[#DFBE89]" />
                <span>Video-Thirrje Live</span>
              </button>
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Data e Preferuar:
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-medium text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Orari i Përshtatshëm:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      selectedTime === time
                        ? 'bg-[#142C20] text-[#DFBE89] border-[#142C20] shadow-2xs'
                        : 'bg-[#FAF8F5] text-stone-700 border-[#ECE7DE] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client Contact Info */}
          <div className="space-y-2 pt-2 border-t border-[#ECE7DE]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Emri dhe Mbiemri"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
              />
              <input
                type="tel"
                required
                placeholder="Numri i Telefonit (WhatsApp)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
              />
            </div>

            <input
              type="email"
              required
              placeholder="Adresa e Email-it"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
            />

            <textarea
              rows={2}
              placeholder="Shënime apo pyetje paraprake (opsionale)..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              icon={<UserCheck className="w-4 h-4 text-[#DFBE89]" />}
            >
              Dërgo Kërkesën për Vizitë
            </Button>
            <p className="text-[11px] text-stone-400 text-center mt-2">
              Vizita është pa pagesë dhe pa detyrim blerjeje.
            </p>
          </div>

        </form>
      )}
    </ModalShell>
  );
};
