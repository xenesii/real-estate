import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { PropertyReport } from '../types';
import { useApp } from '../context/AppContext';
import { ModalShell } from './ui/ModalShell';
import { Button } from './ui/Button';

interface ReportListingModalProps {
  listingId: string;
  listingTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportListingModal: React.FC<ReportListingModalProps> = ({
  listingId,
  listingTitle,
  isOpen,
  onClose
}) => {
  const { addReport } = useApp();
  const [reason, setReason] = useState<PropertyReport['reason']>('wrong_info');
  const [details, setDetails] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReport({
      listingId,
      listingTitle,
      reporterEmail,
      reason,
      details
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const reasonOptions: { key: PropertyReport['reason']; title: string; desc: string }[] = [
    {
      key: 'fraud',
      title: 'Mashtrim financiar ose kërkesë e dyshimtë',
      desc: 'Shitësi kërkon paradhënie jashtë rrugëve bankare ose pa kontratë'
    },
    {
      key: 'fake_property',
      title: 'Pronë jo-ekzistente ose e shitur',
      desc: 'Prona nuk ekziston në atë adresë ose është e shitur/dhënë me qira'
    },
    {
      key: 'stolen_photos',
      title: 'Fotografi ose të dhëna të vjedhura',
      desc: 'Fotot i përkasin një prone tjetër ose janë marrë pa leje'
    },
    {
      key: 'wrong_info',
      title: 'Çmim, lokacion ose sipërfaqe e pasaktë',
      desc: 'Të dhënat në shpallje ndryshojnë nga realiteti ose komunikimi'
    },
    {
      key: 'spam',
      title: 'Shpallje e dyfishtë ose spam',
      desc: 'E njëjta pronë është postuar disa herë nga persona të paautorizuar'
    }
  ];

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Raporto këtë Shpallje"
      subtitle={listingTitle}
      icon={<ShieldAlert className="w-5 h-5 text-[#DFBE89]" />}
      maxWidth="md"
      headerTheme="dark"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF5EC] text-[#B89758] mx-auto flex items-center justify-center border border-[#EADBBE] shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-[#163324]" />
          </div>
          <h4 className="text-base font-bold text-[#12291E] font-serif">Raportimi u Dërgua me Sukses!</h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Faleminderit që ndihmoni në mbajtjen e tregut <strong className="text-[#163324]">SHITJE PRONASH</strong> të sigurt dhe transparent. Ekipi ynë i verifikimit kadastral dhe moderimit do ta shqyrtojë shpalljen brenda 24 orëve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#12291E] mb-2 uppercase tracking-wider">
              Zgjidhni arsyen kryesore:
            </label>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {reasonOptions.map(opt => (
                <label
                  key={opt.key}
                  className={`block p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    reason === opt.key 
                      ? 'bg-[#FAF5EC] border-[#B89758] text-[#12291E] shadow-2xs' 
                      : 'border-[#ECE7DE] hover:bg-[#FAF8F5] text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="reportReason"
                      value={opt.key}
                      checked={reason === opt.key}
                      onChange={() => setReason(opt.key)}
                      className="accent-[#163324] cursor-pointer"
                    />
                    <span className="font-bold text-xs text-[#12291E]">{opt.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 ml-6 mt-1 leading-snug">{opt.desc}</p>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12291E] mb-1.5">
              Email-i juaj i kontaktit:
            </label>
            <input
              type="email"
              required
              placeholder="shembull@domain.com"
              value={reporterEmail}
              onChange={e => setReporterEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-[#12291E] focus:bg-white focus:border-[#B89758] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12291E] mb-1.5">
              Përshkrim shtesë i problemit:
            </label>
            <textarea
              rows={3}
              required
              placeholder="Shpjegoni me pak fjalë çfarë konstatuat ose përjetuat gjatë komunikimit me shpallësin..."
              value={details}
              onChange={e => setDetails(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-[#12291E] focus:bg-white focus:border-[#B89758] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#ECE7DE]">
            <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89758]" />
              <span>Anonimiteti juaj mbrohet</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                Anulo
              </Button>
              <Button
                type="submit"
                variant="danger"
                size="sm"
              >
                Dërgo Raportin
              </Button>
            </div>
          </div>
        </form>
      )}
    </ModalShell>
  );
};
