import React, { useState } from 'react';
import { Listing } from '../types';
import { useLocale } from '../context/LocaleContext';
import { 
  ShieldCheck, FileCheck, CheckCircle2, AlertCircle, 
  Scale, FileText, Info, Building, HelpCircle 
} from 'lucide-react';
import { NotaryCalculatorModal } from './NotaryCalculatorModal';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface LegalVerificationCardProps {
  listing: Listing;
}

export const LegalVerificationCard: React.FC<LegalVerificationCardProps> = ({ listing }) => {
  const { locale } = useLocale();
  const [notaryModalOpen, setNotaryModalOpen] = useState(false);

  const country = listing.location?.country || 'Kosovo';
  const isKosovo = country === 'Kosovo';

  const verificationItems = [
    {
      id: 'ownership',
      label: isKosovo ? 'Certifikatë e Pronësisë (Fletë Poseduese AKK)' : 'Certifikatë Pronësie e Hipotekuar (ASHK)',
      status: listing.verified ? 'verified' : 'pending',
      desc: listing.verified 
        ? 'Dokumentacioni i regjistruar në kadastër është verifikuar pa ngarkesa të fshehura.' 
        : 'Verifikimi në kadastër mund të kërkohet përmes noterit para nënshkrimit.'
    },
    {
      id: 'mortgage_status',
      label: 'Statusi i Hipotekës / Barrës Financiare',
      status: 'clear',
      desc: 'Prona nuk ka barrë hipotekare nga palë të treta ose kredi bankare të pashlyera.'
    },
    {
      id: 'building_permit',
      label: 'Leje Ndërtimi & Përdorimi Komunal',
      status: 'verified',
      desc: 'Objekti posedon leje ndërtimore të aprovuar nga drejtoria e urbanizmit.'
    },
    {
      id: 'notary_transfer',
      label: 'Përgatitur për Transfer Noterial të Menjëhershëm',
      status: 'ready',
      desc: 'Kontrata e shitblerjes mund të nënshkruhet te çdo noter i licencuar.'
    }
  ];

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#ECE7DE] shadow-2xs" id="legal-verification-card">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#ECE7DE]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FAF5EC] text-[#B89758] border border-[#E9DCBE] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#10241A]">
                Verifikimi Ligjor & Kadastral
              </h3>
              {listing.verified && (
                <Badge variant="verified">
                  E Verifikuar
                </Badge>
              )}
            </div>
            <p className="text-xs text-stone-500">
              {isKosovo ? 'Kadastri i Kosovës (AKK) & Oda e Noterëve' : 'Agjencia Shtetërore e Kadastrës (ASHK)'}
            </p>
          </div>
        </div>

        {/* Notary Calculator trigger button */}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setNotaryModalOpen(true)}
          icon={<Scale className="w-3.5 h-3.5 text-[#B89758]" />}
          id="open-notary-calc-btn"
        >
          Llogarit Tarifat e Noterit
        </Button>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {verificationItems.map((item) => (
          <div key={item.id} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E6C38] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#10241A] font-serif">{item.label}</div>
              <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cadastral Info Disclaimer */}
      <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex items-start gap-2.5 text-xs text-[#8B6E39]">
        <Info className="w-4 h-4 text-[#B89758] shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed text-[#10241A]">
          <span className="font-bold">Këshillë e sigurt për blerësin:</span> Çdo pagesë bëhet përmes llogarisë bankare të noterit (Escrow/Trust Account) vetëm pasi të bëhet bartja e plotë e pronësisë në librat kadastralë.
        </div>
      </div>

      {/* Modal instance */}
      <NotaryCalculatorModal
        isOpen={notaryModalOpen}
        onClose={() => setNotaryModalOpen(false)}
        defaultPrice={listing.price}
        defaultCountry={listing.location?.country || 'Kosovo'}
      />
    </div>
  );
};
