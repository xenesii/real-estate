import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  X, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, 
  Layers, MapPin, Eye, Compass, Info, Check, Sparkles,
  ArrowRight, ShieldCheck, HelpCircle, Ruler, Smartphone,
  Move, Camera, Home
} from 'lucide-react';
import { VirtualTourRoom } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export const VirtualTourModal: React.FC = () => {
  const { isVirtualTourOpen, activeVirtualTour, closeVirtualTour, setActiveListing, listings, setActiveView } = useApp();
  const { locale } = useLocale();

  const [currentRoomId, setCurrentRoomId] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [activeFeature, setActiveFeature] = useState<{ label: string; detail: string } | null>(null);
  const [isVrMode, setIsVrMode] = useState(false);
  const [measurementMode, setMeasurementMode] = useState(false);
  const [measuredPoints, setMeasuredPoints] = useState<{ x: number; y: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeVirtualTour && activeVirtualTour.rooms.length > 0) {
      setCurrentRoomId(activeVirtualTour.rooms[0].id);
      setPanOffset({ x: 0, y: 0 });
      setZoomLevel(1);
      setActiveFeature(null);
      setMeasuredPoints([]);
    }
  }, [activeVirtualTour]);

  if (!isVirtualTourOpen || !activeVirtualTour) return null;

  const currentRoom: VirtualTourRoom = activeVirtualTour.rooms.find(r => r.id === currentRoomId) || activeVirtualTour.rooms[0];
  const relatedListing = listings.find(l => l.id === activeVirtualTour.listingId);

  const getRoomName = (room: VirtualTourRoom) => {
    return locale === 'en' ? (room.nameEn || room.nameSq) : room.nameSq;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (measurementMode) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        if (measuredPoints.length >= 2) {
          setMeasuredPoints([{ x, y }]);
        } else {
          setMeasuredPoints(prev => [...prev, { x, y }]);
        }
      }
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || measurementMode) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setMeasuredPoints([]);
  };

  const calculateDistance = () => {
    if (measuredPoints.length < 2) return null;
    const dx = measuredPoints[1].x - measuredPoints[0].x;
    const dy = measuredPoints[1].y - measuredPoints[0].y;
    const distancePercent = Math.sqrt(dx * dx + dy * dy);
    // Scale: 100% width ≈ 6.5 meters in 360 panoramic projection
    const estimatedMeters = (distancePercent * 0.065).toFixed(2);
    return estimatedMeters;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      
      {/* Main Tour Viewport Container */}
      <div 
        className={`relative w-full h-full flex flex-col bg-[#0A120D] text-white select-none ${
          isFullscreen ? 'fixed inset-0' : 'max-w-7xl max-h-[92vh] rounded-3xl overflow-hidden border border-[#2B543D] shadow-2xl'
        }`}
      >
        
        {/* Top Floating Glass Header Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-5 flex items-center justify-between bg-gradient-to-b from-[#10241A]/95 via-[#10241A]/70 to-transparent">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#163324] border border-[#2B543D] flex items-center justify-center text-[#DFBE89] shadow-md">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DFBE89]">
                  360° Virtual Tour
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#163324] border border-[#2B543D] text-[10px] text-emerald-400 font-bold">
                  Ultra HD
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold font-serif text-white truncate max-w-xs sm:max-w-md">
                {currentRoom ? getRoomName(currentRoom) : 'Dhoma'} • {relatedListing?.titleSq || activeVirtualTour.listingTitle}
              </h3>
            </div>
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-2">
            
            {/* Direct Listing Details button */}
            {relatedListing && (
              <button
                type="button"
                onClick={() => {
                  setActiveListing(relatedListing);
                  setActiveView('detail');
                  closeVirtualTour();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#163324] hover:bg-[#B89758] hover:text-[#10241A] text-stone-200 text-xs font-bold border border-[#2B543D] transition-all cursor-pointer shadow-2xs"
              >
                <span>Shiko Kartelën e Pronës</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Toggle Fullscreen */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-[#10241A]/80 hover:bg-[#163324] border border-[#2B543D] text-stone-300 hover:text-white transition-colors cursor-pointer"
              title={isFullscreen ? 'Mbyll ekranin e plotë' : 'Ekran i plotë'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeVirtualTour}
              className="p-2 rounded-xl bg-[#10241A]/80 hover:bg-rose-900/80 border border-[#2B543D] text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Mbyll Turneun"
            >
              <X className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* 360° Canvas Viewport */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing bg-[#0A120D] ${
            measurementMode ? 'cursor-crosshair' : ''
          }`}
        >
          {/* Pan & Zoom Image Wrapper */}
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`
            }}
          >
            {isVrMode ? (
              <div className="w-full h-full flex">
                <div className="w-1/2 h-full border-r border-black/50 overflow-hidden relative">
                  <img 
                    src={currentRoom?.panoramaUrl} 
                    alt="VR Left" 
                    className="w-full h-full object-cover scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-1/2 h-full overflow-hidden relative">
                  <img 
                    src={currentRoom?.panoramaUrl} 
                    alt="VR Right" 
                    className="w-full h-full object-cover scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ) : (
              <img 
                src={currentRoom?.panoramaUrl} 
                alt={currentRoom ? getRoomName(currentRoom) : '360 Room'} 
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Interactive Navigation Hotspots (Navigate between rooms) */}
            {currentRoom?.hotspots?.map(hs => (
              <div
                key={hs.id}
                style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (hs.targetRoomId) {
                    setCurrentRoomId(hs.targetRoomId);
                  }
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#DFBE89] text-[#10241A] flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                    <Compass className="w-4 h-4" />
                  </div>
                  
                  {/* Tooltip on Hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-[#10241A]/95 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg border border-[#2B543D] whitespace-nowrap shadow-xl">
                    {locale === 'en' ? hs.labelEn : hs.labelSq}
                    <span className="text-[#DFBE89] ml-1">→ Shko</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Interactive Feature Tags (Show detailed specs) */}
            {currentRoom?.features?.map(feat => (
              <div
                key={feat.id}
                style={{ top: `${feat.y}%`, left: `${feat.x}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFeature({ label: feat.label, detail: feat.detail });
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#10241A] text-[#DFBE89] border-2 border-[#DFBE89] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  
                  {/* Tooltip on Hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-[#10241A]/95 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg border border-[#2B543D] whitespace-nowrap shadow-xl">
                    {feat.label}
                  </div>
                </div>
              </div>
            ))}

            {/* Measurement Line Overlay */}
            {measurementMode && measuredPoints.length === 2 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <line 
                  x1={`${measuredPoints[0].x}%`} 
                  y1={`${measuredPoints[0].y}%`} 
                  x2={`${measuredPoints[1].x}%`} 
                  y2={`${measuredPoints[1].y}%`} 
                  stroke="#DFBE89" 
                  strokeWidth="3" 
                  strokeDasharray="6 4"
                />
                <circle cx={`${measuredPoints[0].x}%`} cy={`${measuredPoints[0].y}%`} r="6" fill="#10241A" stroke="#DFBE89" strokeWidth="2" />
                <circle cx={`${measuredPoints[1].x}%`} cy={`${measuredPoints[1].y}%`} r="6" fill="#10241A" stroke="#DFBE89" strokeWidth="2" />
              </svg>
            )}

          </div>

          {/* Interactive Feature Info Popover */}
          {activeFeature && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 max-w-sm w-full bg-[#10241A]/95 backdrop-blur-md border border-[#2B543D] p-4 rounded-2xl shadow-2xl text-white">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#DFBE89]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeFeature.label}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveFeature(null)}
                  className="text-stone-400 hover:text-white text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeFeature.detail}
              </p>
            </div>
          )}

          {/* Measurement Helper Toast */}
          {measurementMode && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-[#163324]/95 backdrop-blur-md border border-[#2B543D] px-4 py-2 rounded-2xl text-xs font-medium text-white flex items-center gap-3 shadow-xl">
              <Ruler className="w-4 h-4 text-[#DFBE89]" />
              <span>
                {measuredPoints.length === 0 && 'Klikoni pikën e parë në mur / dysheme për matje'}
                {measuredPoints.length === 1 && 'Klikoni pikën e dytë për distancën'}
                {measuredPoints.length === 2 && (
                  <strong>Distanca e Përllogaritur: ≈ {calculateDistance()} metra</strong>
                )}
              </span>
              {measuredPoints.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMeasuredPoints([])}
                  className="text-xs text-[#DFBE89] underline hover:text-white ml-2 cursor-pointer"
                >
                  Pastro
                </button>
              )}
            </div>
          )}

          {/* Floor Plan Overlay Card */}
          {showFloorPlan && activeVirtualTour.floorPlanUrl && (
            <div className="absolute top-20 right-4 z-30 w-64 bg-[#10241A]/90 backdrop-blur-md border border-[#2B543D] p-3 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#DFBE89] uppercase tracking-wider">
                  Planimetria e Banesës
                </span>
                <button 
                  type="button"
                  onClick={() => setShowFloorPlan(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="h-40 bg-black/40 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-[#2B543D]">
                <img 
                  src={activeVirtualTour.floorPlanUrl} 
                  alt="Floor Plan" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

        </div>

        {/* Bottom Floating Control Bar */}
        <div className="relative z-30 p-4 bg-[#10241A]/95 border-t border-[#2B543D] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Room Switcher Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {activeVirtualTour.rooms.map(room => (
              <button
                key={room.id}
                type="button"
                onClick={() => {
                  setCurrentRoomId(room.id);
                  setPanOffset({ x: 0, y: 0 });
                  setMeasuredPoints([]);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  currentRoomId === room.id
                    ? 'bg-[#DFBE89] text-[#10241A] shadow-md scale-105'
                    : 'bg-[#163324] hover:bg-[#2B543D] text-stone-300 border border-[#2B543D]'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{getRoomName(room)}</span>
              </button>
            ))}
          </div>

          {/* Navigation & Zoom Tools */}
          <div className="flex items-center gap-2">
            
            {/* Zoom In/Out */}
            <div className="flex items-center bg-[#163324] rounded-xl border border-[#2B543D] p-0.5">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-2 text-stone-300 hover:text-white hover:bg-[#2B543D] rounded-lg transition-colors cursor-pointer"
                title="Zmadho (Zoom Out)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-[10px] font-mono text-[#DFBE89]">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-2 text-stone-300 hover:text-white hover:bg-[#2B543D] rounded-lg transition-colors cursor-pointer"
                title="Zmadho (Zoom In)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reset View */}
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-xl bg-[#163324] hover:bg-[#2B543D] border border-[#2B543D] text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Rivendos Pamjen Fillestare"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Measurement Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                setMeasurementMode(!measurementMode);
                setMeasuredPoints([]);
              }}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                measurementMode
                  ? 'bg-[#DFBE89] text-[#10241A] border-[#DFBE89]'
                  : 'bg-[#163324] hover:bg-[#2B543D] text-stone-300 border-[#2B543D]'
              }`}
              title="Vegla e Matjes së Hapësirës"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Matës</span>
            </button>

            {/* Floor Plan Toggle */}
            {activeVirtualTour.floorPlanUrl && (
              <button
                type="button"
                onClick={() => setShowFloorPlan(!showFloorPlan)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  showFloorPlan
                    ? 'bg-[#DFBE89] text-[#10241A] border-[#DFBE89]'
                    : 'bg-[#163324] hover:bg-[#2B543D] text-stone-300 border-[#2B543D]'
                }`}
                title="Shfaq Planimetrinë"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Planimetria</span>
              </button>
            )}

            {/* VR Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsVrMode(!isVrMode)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isVrMode
                  ? 'bg-[#DFBE89] text-[#10241A] border-[#DFBE89]'
                  : 'bg-[#163324] hover:bg-[#2B543D] text-stone-300 border-[#2B543D]'
              }`}
              title="Mënyra VR Cardboard"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">VR</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
