import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  ShieldCheck, X, Check, Clock, AlertCircle, FileText, 
  Upload, ChevronRight, User, Phone, Landmark, Lock,
  Building, CheckCircle2, ArrowRight, Award, HelpCircle,
  Sparkles, Download, Printer, Coins
} from 'lucide-react';
import { SafeTransactionData, SafeTransactionMilestone, TransactionStepStatus } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ModalShell } from './ui/ModalShell';

interface SafeTransactionTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId?: string;
}

export const SafeTransactionTrackerModal: React.FC<SafeTransactionTrackerModalProps> = ({
  isOpen,
  onClose,
  transactionId
}) => {
  const { activeTransactions, updateTransactionMilestone, convertPrice } = useApp();
  const { locale } = useLocale();

  const activeTx = activeTransactions.find(t => t.id === transactionId) || activeTransactions[0];

  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    activeTx?.milestones[activeTx.currentStepIndex]?.id || activeTx?.milestones[0]?.id || 'm-1'
  );

  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string[]>>({});
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);

  if (!isOpen || !activeTx) return null;

  const currentMilestone = activeTx.milestones.find(m => m.id === selectedMilestoneId) || activeTx.milestones[0];

  const handleSimulateDocUpload = (docName: string) => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      setUploadedDocs(prev => ({
        ...prev,
        [currentMilestone.id]: [...(prev[currentMilestone.id] || []), `${docName}_scan_notarized.pdf`]
      }));
      setIsSimulatingUpload(false);
    }, 700);
  };

  const handleAdvanceStep = (milestoneId: string) => {
    updateTransactionMilestone(activeTx.id, milestoneId, 'completed');
  };

  const completedCount = activeTx.milestones.filter(m => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / activeTx.milestones.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#ECE7DE] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header - Forest Green Theme */}
        <div className="bg-[#10241A] p-5 sm:p-6 text-white flex items-center justify-between shrink-0 border-b border-[#2B543D]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#163324] border border-[#2B543D] flex items-center justify-center text-[#DFBE89] shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#163324] text-[#DFBE89] px-2.5 py-0.5 rounded-full border border-[#2B543D]">
                  PRONAT Escrow & Safe Deal Protocol
                </span>
                <span className="text-xs text-stone-400 font-mono">ID: {activeTx.id}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-serif mt-0.5">
                Ndjekësi i Sigurt i Blerjes (Safe Transaction Pipeline)
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl transition-colors cursor-pointer bg-[#163324] border border-[#2B543D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property & Escrow Summary Strip */}
        <div className="bg-[#163324] p-4 px-6 text-white text-xs border-b border-[#2B543D] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={activeTx.listingCover}
              alt={activeTx.listingTitle}
              className="w-12 h-12 rounded-xl object-cover border border-[#2B543D]"
            />
            <div>
              <span className="font-bold font-serif text-sm block text-white">{activeTx.listingTitle}</span>
              <span className="text-stone-300">Vlera e Pronës: <strong className="text-[#DFBE89] font-serif">{convertPrice(activeTx.listingPrice).formatted}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Blerësi</span>
              <span className="font-semibold text-stone-200">{activeTx.buyerName}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Noteri Publik</span>
              <span className="font-semibold text-[#DFBE89]">{activeTx.notaryName}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Kapara në Mirëbesim (Escrow)</span>
              <span className="font-bold text-[#DFBE89] font-serif text-sm">{convertPrice(activeTx.escrowAmount).formatted}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-[#FAF8F5] px-6 py-3 border-b border-[#ECE7DE] flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <span className="font-bold text-stone-700">Progresi i Transaksionit:</span>
            <div className="flex-1 bg-[#ECE7DE] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0E6C38] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-extrabold text-[#0E6C38]">{progressPercent}%</span>
          </div>

          <span className="text-stone-500 text-[11px] hidden sm:inline">
            Hapi {activeTx.currentStepIndex + 1} nga {activeTx.milestones.length}: <strong className="text-[#10241A]">{currentMilestone.titleSq}</strong>
          </span>
        </div>

        {/* Main Content: Left Steps Timeline + Right Step Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left Timeline (5 cols) */}
          <div className="md:col-span-5 border-r border-[#ECE7DE] p-4 space-y-2 overflow-y-auto bg-[#FAF8F5]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 px-2 block mb-2 font-serif">
              7 Hapat Ligjorë të Blerjes
            </span>

            {activeTx.milestones.map((m) => {
              const isSelected = m.id === selectedMilestoneId;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMilestoneId(m.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected 
                      ? 'bg-white border-[#B89758] shadow-sm ring-1 ring-[#B89758]/30' 
                      : 'bg-white/60 border-[#ECE7DE] hover:bg-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    m.status === 'completed'
                      ? 'bg-[#0E6C38] text-white'
                      : m.status === 'in_progress'
                      ? 'bg-[#DFBE89] text-[#10241A] font-black animate-pulse'
                      : 'bg-stone-200 text-stone-600'
                  }`}>
                    {m.status === 'completed' ? '✓' : m.stepNumber}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-[#10241A]' : 'text-stone-700'}`}>
                        {m.titleSq}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        m.status === 'completed' 
                          ? 'bg-[#E8F8EE] text-[#0E6C38] border border-[#C2E8D0]' 
                          : m.status === 'in_progress'
                          ? 'bg-[#FAF5EC] text-[#8B6E39] border border-[#E9DCBE]'
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        {m.status === 'completed' ? 'Përfunduar' : m.status === 'in_progress' ? 'Në Proces' : 'Në Pritje'}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1 font-medium">
                      {m.descriptionSq}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Step Detail Panel (7 cols) */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-6 bg-white flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Step Header */}
              <div className="border-b border-[#ECE7DE] pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF5EC] text-[#8B6E39] px-2.5 py-0.5 rounded-full border border-[#E9DCBE]">
                    Hapi {currentMilestone.stepNumber} nga 7
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    Përgjegjës: <strong className="text-[#10241A]">{currentMilestone.assignedParty.toUpperCase()}</strong>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#10241A] font-serif">
                  {currentMilestone.titleSq}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {currentMilestone.descriptionSq}
                </p>
              </div>

              {/* Legal Tips Box */}
              <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B6E39]">
                  <HelpCircle className="w-4 h-4 text-[#B89758]" />
                  <span>Udhëzim Ligjor & Noterial:</span>
                </div>
                <p className="text-xs text-[#10241A] leading-relaxed">
                  {currentMilestone.tipsSq}
                </p>
              </div>

              {/* Required Documents Checklist & Upload Simulation */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#10241A] uppercase tracking-wider font-serif">
                  Dokumentet e Kërkuara për këtë Hap:
                </h4>

                <div className="space-y-2">
                  {currentMilestone.requiredDocuments.map((doc, dIdx) => {
                    const isUploaded = uploadedDocs[currentMilestone.id]?.some(d => d.startsWith(doc)) || currentMilestone.status === 'completed';

                    return (
                      <div
                        key={dIdx}
                        className="p-3 rounded-2xl border border-[#ECE7DE] bg-[#FAF8F5] flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className={`w-4 h-4 ${isUploaded ? 'text-[#0E6C38]' : 'text-stone-400'}`} />
                          <span className="font-semibold text-stone-800">{doc}</span>
                        </div>

                        {isUploaded ? (
                          <span className="inline-flex items-center gap-1 text-[#0E6C38] font-bold text-[11px] bg-[#E8F8EE] px-2.5 py-1 rounded-full border border-[#C2E8D0]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verifikuar</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            disabled={isSimulatingUpload}
                            onClick={() => handleSimulateDocUpload(doc)}
                            className="px-3 py-1.5 bg-[#10241A] hover:bg-[#163324] text-[#DFBE89] rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 border border-[#2B543D]"
                          >
                            <Upload className="w-3 h-3" />
                            <span>{isSimulatingUpload ? 'Po ngarkohet...' : 'Ngarko Dokumentin'}</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Step Action Bottom Bar */}
            <div className="pt-6 border-t border-[#ECE7DE] flex items-center justify-between gap-3">
              <div className="text-xs text-stone-400">
                Statusi: <strong className="text-[#10241A] font-bold">{currentMilestone.status.toUpperCase()}</strong>
              </div>

              {currentMilestone.status !== 'completed' ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleAdvanceStep(currentMilestone.id)}
                  icon={<Check className="w-4 h-4 text-[#DFBE89]" />}
                >
                  Shëno këtë Hap si të Përfunduar
                </Button>
              ) : (
                <span className="text-xs text-[#0E6C38] font-bold flex items-center gap-1.5 bg-[#E8F8EE] px-3.5 py-1.5 rounded-full border border-[#C2E8D0]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ky hap është verifikuar me sukses nga noteri</span>
                </span>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
