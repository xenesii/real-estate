import React, { useState } from 'react';
import { COMMUTE_HUBS } from '../data/mockCommuteHubs';
import { useApp } from '../context/AppContext';
import { Clock, Navigation, Car, Footprints, Bus, X, Sparkles, MapPin } from 'lucide-react';

interface CommuteFilterWidgetProps {
  onClose?: () => void;
  isCompact?: boolean;
}

export const CommuteFilterWidget: React.FC<CommuteFilterWidgetProps> = ({
  onClose,
  isCompact = false
}) => {
  const { filters, setFilters } = useApp();

  const selectedHubId = filters.commuteHubId || '';
  const maxMinutes = filters.maxCommuteMinutes || 20;
  const mode = filters.commuteMode || 'car';

  const selectedHub = COMMUTE_HUBS.find(h => h.id === selectedHubId);

  const handleHubChange = (hubId: string) => {
    if (hubId === '') {
      setFilters(prev => ({
        ...prev,
        commuteHubId: undefined,
        maxCommuteMinutes: undefined,
        commuteMode: undefined
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        commuteHubId: hubId,
        maxCommuteMinutes: maxMinutes,
        commuteMode: mode
      }));
    }
  };

  const handleMinutesChange = (mins: number) => {
    setFilters(prev => ({
      ...prev,
      maxCommuteMinutes: mins
    }));
  };

  const handleModeChange = (newMode: 'car' | 'transit' | 'walking') => {
    setFilters(prev => ({
      ...prev,
      commuteMode: newMode
    }));
  };

  const handleClear = () => {
    setFilters(prev => ({
      ...prev,
      commuteHubId: undefined,
      maxCommuteMinutes: undefined,
      commuteMode: undefined
    }));
  };

  return (
    <div className={`rounded-3xl bg-white border border-[#ECE7DE] shadow-xl p-5 ${isCompact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-center justify-between mb-3 border-b border-[#ECE7DE] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#10241A] text-[#DFBE89] flex items-center justify-center border border-[#2B543D]">
            <Clock className="w-4 h-4 text-[#B89758]" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-serif text-[#10241A]">Koha e Udhëtimit (Commute Search)</h4>
            <p className="text-[11px] text-stone-500">Filtro prona sipas distancës & kohës së arritjes</p>
          </div>
        </div>

        {selectedHubId && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Pastro</span>
          </button>
        )}
      </div>

      {/* Destination Hub Selector */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Destinacioni Kryesor (Punë / Qendër / Spital)</span>
          </label>
          <select
            value={selectedHubId}
            onChange={(e) => handleHubChange(e.target.value)}
            className="w-full text-xs sm:text-sm bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-3.5 py-2.5 text-[#10241A] focus:outline-none focus:bg-white font-bold cursor-pointer"
          >
            <option value="">— Zgjidh pikën referuese —</option>
            <optgroup label="🇽🇰 Kosovë (Prishtinë & Prizren)">
              {COMMUTE_HUBS.filter(h => h.country === 'Kosovo').map(hub => (
                <option key={hub.id} value={hub.id}>
                  {hub.city}: {hub.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="🇦🇱 Shqipëri (Tiranë, Durrës, Vlorë)">
              {COMMUTE_HUBS.filter(h => h.country === 'Albania').map(hub => (
                <option key={hub.id} value={hub.id}>
                  {hub.city}: {hub.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {selectedHubId && (
          <>
            {/* Travel Mode */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Mënyra e Lëvizjes
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleModeChange('car')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === 'car'
                      ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs'
                      : 'bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Makinë</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('transit')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === 'transit'
                      ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs'
                      : 'bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Bus className="w-3.5 h-3.5" />
                  <span>Autobus</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('walking')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === 'walking'
                      ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs'
                      : 'bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Footprints className="w-3.5 h-3.5" />
                  <span>Në Këmbë</span>
                </button>
              </div>
            </div>

            {/* Max Commute Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-stone-700">Maksimumi i Kohës:</span>
                <span className="font-extrabold text-[#10241A] bg-[#FAF5EC] border border-[#E9DCBE] px-2.5 py-0.5 rounded-full">
                  Deri në {maxMinutes} minuta
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="5"
                value={maxMinutes}
                onChange={(e) => handleMinutesChange(Number(e.target.value))}
                className="w-full accent-[#10241A] h-2 bg-[#ECE7DE] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-semibold">
                <span>5 min</span>
                <span>15 min</span>
                <span>30 min</span>
                <span>45 min</span>
              </div>
            </div>

            {/* Active Isochrone Summary Pill */}
            {selectedHub && (
              <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] text-xs text-[#10241A] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#B89758] shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Po shfaqen vetëm pronat brenda <strong>{maxMinutes} minutave</strong> ({mode === 'car' ? 'me makinë' : mode === 'transit' ? 'me transport publik' : 'në këmbë'}) nga <strong>{selectedHub.name}</strong>.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
