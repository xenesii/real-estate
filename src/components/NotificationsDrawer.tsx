import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { 
  Bell, CheckCircle2, TrendingDown, Calendar, ShieldCheck, 
  Search, MessageSquare, Trash2, CheckCheck, X, ArrowRight,
  ExternalLink, Sparkles
} from 'lucide-react';
import { AppNotification } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, unreadNotificationsCount, markNotificationRead, 
    markAllNotificationsRead, deleteNotification, setActiveView,
    setActiveListing, listings, openClosingCosts, convertPrice
  } = useApp();
  const { locale } = useLocale();

  const [activeTab, setActiveTab] = useState<'all' | 'price_drops' | 'viewings' | 'legal'>('all');
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'price_drops') return n.type === 'price_drop';
    if (activeTab === 'viewings') return n.type === 'viewing_update';
    if (activeTab === 'legal') return n.type === 'legal_verified';
    return true;
  });

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationRead(notif.id);
    if (notif.listingId) {
      const listing = listings.find(l => l.id === notif.listingId);
      if (listing) {
        setActiveListing(listing);
        setActiveView('detail');
        onClose();
        return;
      }
    }
    if (notif.actionView) {
      setActiveView(notif.actionView);
      onClose();
    }
  };

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'price_drop':
        return <TrendingDown className="w-4 h-4 text-rose-500" />;
      case 'viewing_update':
        return <Calendar className="w-4 h-4 text-[#0E6C38]" />;
      case 'legal_verified':
        return <ShieldCheck className="w-4 h-4 text-[#B89758]" />;
      case 'new_match':
        return <Search className="w-4 h-4 text-[#DFBE89]" />;
      case 'inquiry_received':
        return <MessageSquare className="w-4 h-4 text-[#10241A]" />;
      default:
        return <Bell className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        ref={drawerRef}
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col border-l border-[#ECE7DE] animate-slideLeft"
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#2B543D] flex items-center justify-between bg-[#10241A] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#163324] text-[#DFBE89] border border-[#2B543D] flex items-center justify-center shadow-xs">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <span>Njoftimet & Alarmet</span>
                {unreadNotificationsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#B89758] text-[#10241A] text-[10px] font-black">
                    {unreadNotificationsCount} të reja
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-stone-400">Përditësime në kohë reale mbi pronat tuaja</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-[#163324] rounded-xl text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Filters & Quick Actions */}
        <div className="p-3 border-b border-[#ECE7DE] bg-[#FAF8F5] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-[#10241A] text-[#DFBE89] shadow-2xs' 
                  : 'bg-white text-stone-600 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
              }`}
            >
              Të Gjitha
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('price_drops')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'price_drops' 
                  ? 'bg-rose-50 text-rose-800 border border-rose-200' 
                  : 'bg-white text-stone-600 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
              }`}
            >
              <TrendingDown className="w-3 h-3 text-rose-600" />
              <span>Ulje Çmimi</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('viewings')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'viewings' 
                  ? 'bg-[#E8F8EE] text-[#0E6C38] border border-[#C2E8D0]' 
                  : 'bg-white text-stone-600 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
              }`}
            >
              <Calendar className="w-3 h-3 text-[#0E6C38]" />
              <span>Terminet</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('legal')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'legal' 
                  ? 'bg-[#FAF5EC] text-[#8B6E39] border border-[#E9DCBE]' 
                  : 'bg-white text-stone-600 border border-[#ECE7DE] hover:bg-[#F2ECE1]'
              }`}
            >
              <ShieldCheck className="w-3 h-3 text-[#B89758]" />
              <span>Ligjore</span>
            </button>
          </div>

          {unreadNotificationsCount > 0 && (
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-[11px] font-bold text-[#B89758] hover:text-[#10241A] flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
              title="Shëno të gjitha si të lexuara"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lexo të gjitha</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF5EC] border border-[#E9DCBE] flex items-center justify-center text-[#B89758] mb-3 shadow-2xs">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold font-serif text-[#10241A]">Nuk keni njoftime në këtë kategori</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
                Do të njoftoheni sapo të ketë ndryshime çmimesh, konfirmime vizitash ose prona të reja të listuara.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                  !notif.isRead 
                    ? 'bg-[#FAF5EC]/60 border-[#E9DCBE] hover:border-[#B89758] shadow-2xs' 
                    : 'bg-white border-[#ECE7DE] hover:border-stone-300'
                }`}
              >
                {!notif.isRead && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#B89758]" />
                )}

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#ECE7DE] shrink-0 mt-0.5 shadow-2xs">
                    {getNotificationIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#10241A] leading-snug">
                        {notif.title}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {notif.message}
                    </p>

                    {/* Price change badge */}
                    {notif.priceOld && notif.priceNew && (
                      <div className="mt-2 inline-flex items-center gap-2 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg text-xs font-bold">
                        <span className="line-through text-stone-400">{convertPrice(notif.priceOld).formatted}</span>
                        <span className="text-rose-700 font-extrabold">{convertPrice(notif.priceNew).formatted}</span>
                        <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-black">
                          -{convertPrice(notif.priceOld - notif.priceNew).formatted}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#ECE7DE] text-[10px] text-stone-400 font-medium">
                      <span>{new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(notif.timestamp).toLocaleDateString()}</span>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notif.id);
                          }}
                          className="text-stone-400 hover:text-rose-600 p-1"
                          title="Fshij njoftimin"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[#B89758] font-bold flex items-center gap-0.5">
                          Hap <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Drawer Footer */}
        <div className="p-4 border-t border-[#ECE7DE] bg-[#FAF8F5] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveView('dashboard');
              onClose();
            }}
            className="text-[#10241A] hover:text-[#B89758] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Qendra e Kontrollit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              openClosingCosts(150000);
              onClose();
            }}
            className="text-[#B89758] hover:text-[#10241A] font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kalkulatori Noterial</span>
          </button>
        </div>

      </div>
    </div>
  );
};
