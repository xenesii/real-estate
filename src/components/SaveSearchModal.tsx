import React, { useState } from 'react';
import { Bookmark, CheckCircle2, Mail } from 'lucide-react';
import { SearchFilters } from '../types';
import { useApp } from '../context/AppContext';
import { ModalShell } from './ui/ModalShell';
import { Button } from './ui/Button';

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: SearchFilters;
  resultsCount: number;
}

export const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  isOpen,
  onClose,
  currentFilters,
  resultsCount
}) => {
  const { saveSearch, currentUser } = useApp();
  
  // Suggest a nice natural default title based on active filters
  const generateDefaultTitle = () => {
    const parts: string[] = [];
    if (currentFilters.propertyType && currentFilters.propertyType !== 'all') {
      parts.push(currentFilters.propertyType === 'apartment' ? 'Banesa' : currentFilters.propertyType);
    } else if (currentFilters.category) {
      parts.push(currentFilters.category === 'residential' ? 'Banesore' : currentFilters.category);
    } else {
      parts.push('Prona');
    }

    if (currentFilters.transaction) {
      parts.push(currentFilters.transaction === 'sale' ? 'në Shitje' : 'me Qira');
    }

    if (currentFilters.city && currentFilters.city !== 'all') {
      parts.push(`në ${currentFilters.city}`);
    }

    if (currentFilters.maxPrice) {
      parts.push(`(deri €${currentFilters.maxPrice.toLocaleString()})`);
    }

    return parts.join(' ');
  };

  const [title, setTitle] = useState(generateDefaultTitle());
  const [frequency, setFrequency] = useState<'instant' | 'daily' | 'weekly'>('instant');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSearch(title, currentFilters, frequency);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Ruaj Kërkimin & Njoftimet"
      subtitle="Merr njoftime sapo të postohen prona të reja"
      icon={<Bookmark className="w-5 h-5 text-[#DFBE89]" />}
      maxWidth="md"
      headerTheme="dark"
    >
      {savedSuccess ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#E8F8EE] text-[#0E6C38] mx-auto flex items-center justify-center border border-[#C2E8D0]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold font-serif text-[#10241A]">Kërkimi u Ruajt me Sukses!</h4>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Mund ta menaxhoni në çdo kohë nga Paneli juaj në skedën &quot;Kërkimet e Ruajtura&quot;.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Filter tags preview */}
          <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#ECE7DE]">
            <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">
              Kriteret aktive ({resultsCount} prona përputhen tani)
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentFilters.country && currentFilters.country !== 'all' && (
                <span className="text-[11px] bg-white border border-[#ECE7DE] px-2 py-0.5 rounded-md font-semibold text-[#142C20]">
                  Shteti: {currentFilters.country}
                </span>
              )}
              {currentFilters.city && currentFilters.city !== 'all' && (
                <span className="text-[11px] bg-white border border-[#ECE7DE] px-2 py-0.5 rounded-md font-semibold text-[#142C20]">
                  Qyteti: {currentFilters.city}
                </span>
              )}
              {currentFilters.neighborhood && (
                <span className="text-[11px] bg-white border border-[#ECE7DE] px-2 py-0.5 rounded-md font-semibold text-[#142C20]">
                  Lagjja: {currentFilters.neighborhood}
                </span>
              )}
              {currentFilters.category && (
                <span className="text-[11px] bg-white border border-[#ECE7DE] px-2 py-0.5 rounded-md font-semibold text-[#142C20]">
                  Kategoria: {currentFilters.category}
                </span>
              )}
              {currentFilters.propertyType && currentFilters.propertyType !== 'all' && (
                <span className="text-[11px] bg-white border border-[#ECE7DE] px-2 py-0.5 rounded-md font-semibold text-[#142C20]">
                  Lloji: {currentFilters.propertyType}
                </span>
              )}
              {currentFilters.transaction && (
                <span className="text-[11px] bg-white border border-[#ECE7DE] px-2 py-0.5 rounded-md font-semibold text-[#142C20]">
                  {currentFilters.transaction === 'sale' ? 'Në Shitje' : 'Me Qira'}
                </span>
              )}
              {currentFilters.maxPrice && (
                <span className="text-[11px] bg-white border border-[#ECE7DE] px-2 py-0.5 rounded-md font-semibold text-[#142C20]">
                  Max: €{currentFilters.maxPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
              Emri i këtij kërkimi të ruajtur:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#142C20]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
              Frekuenca e njoftimeve:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'instant', label: 'Menjëherë', desc: 'Sapo të publikohet' },
                { key: 'daily', label: 'Çdo ditë', desc: 'Përmbledhje në mëngjes' },
                { key: 'weekly', label: 'Çdo javë', desc: 'Përmbledhje të hënave' },
              ].map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFrequency(item.key as any)}
                  className={`p-2.5 rounded-xl text-left border cursor-pointer transition-all ${
                    frequency === item.key
                      ? 'bg-[#FAF5EC] border-[#DFBE89] text-[#142C20] font-bold shadow-2xs'
                      : 'bg-white border-[#ECE7DE] text-stone-600 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-stone-400 leading-tight mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] flex items-center gap-2.5 text-xs text-stone-600">
            <Mail className="w-4 h-4 text-[#B89758] shrink-0" />
            <span>Njoftimet te: <strong className="text-[#10241A]">{currentUser.email}</strong></span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ECE7DE]">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Anulo
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<Bookmark className="w-3.5 h-3.5 text-[#DFBE89]" />}
            >
              Ruaj Kërkimin
            </Button>
          </div>

        </form>
      )}
    </ModalShell>
  );
};
