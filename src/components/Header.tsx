import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { 
  Building2, Heart, PlusCircle, ShieldCheck, Scale, Menu, X, 
  Globe, User, Bell, Coins, Sparkles, FileText, Calendar, Lock,
  Phone, Mail, Clock, MessageSquare, ChevronRight
} from 'lucide-react';
import { NotificationsDrawer } from './NotificationsDrawer';
import { DisplayCurrency } from '../types';

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useLocale();
  const { 
    activeView, setActiveView, favorites, comparedIds, 
    unreadMessagesCount, unreadNotificationsCount, 
    currency, setCurrency, openClosingCosts,
    openMatchmaker, openTransactionTracker
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      {/* TOP UTILITY CONTACT BAR */}
      <div className="bg-[#10241A] text-[#D8E2DC] text-xs border-b border-[#1E3F2E] hidden lg:block h-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Direct Contact Info */}
            <div className="flex items-center gap-6">
              <a 
                href="tel:+38344123456" 
                className="flex items-center gap-1.5 hover:text-[#DFBE89] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B89758]" />
                <span className="font-semibold">+383 44 123 456</span>
              </a>

              <a 
                href="mailto:info@shitjepronash.com" 
                className="flex items-center gap-1.5 hover:text-[#DFBE89] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#B89758]" />
                <span>info@shitjepronash.com</span>
              </a>

              <div className="flex items-center gap-1.5 text-stone-400">
                <Clock className="w-3.5 h-3.5 text-[#B89758]" />
                <span>Hën - Sht: 08:30 - 19:30</span>
              </div>
            </div>

            {/* Right Side Utility Actions */}
            <div className="flex items-center gap-5">
              
              {/* Cadastral Certification Tag */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#DFBE89]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-bold tracking-wide uppercase">Prona të Verifikuara Kadastralisht</span>
              </div>

              <div className="h-3 w-px bg-[#264D39]" />

              {/* Currency Selector */}
              <div className="flex items-center gap-1 bg-[#163324] px-1 py-0.5 rounded-lg border border-[#234A36]">
                {(['EUR', 'CHF', 'USD', 'GBP'] as DisplayCurrency[]).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      currency === curr 
                        ? 'bg-[#B89758] text-[#10241A] shadow-xs' 
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-[#163324] px-1 py-0.5 rounded-lg border border-[#234A36]">
                <button
                  onClick={() => setLocale('sq')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    locale === 'sq' 
                      ? 'bg-[#B89758] text-[#10241A] shadow-xs' 
                      : 'text-stone-300 hover:text-white'
                  }`}
                  id="lang-sq-button"
                >
                  AL
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    locale === 'en' 
                      ? 'bg-[#B89758] text-[#10241A] shadow-xs' 
                      : 'text-stone-300 hover:text-white'
                  }`}
                  id="lang-en-button"
                >
                  EN
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#ECE7DE] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* BRAND LOGO AREA */}
            <div className="flex items-center gap-6 xl:gap-8">
              <button
                onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
                id="header-brand-logo"
              >
                {/* SP Gold Badge */}
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E2C38E] via-[#C5A880] to-[#997B4D] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all duration-300 border border-[#FFF2DE]/30">
                  <span className="font-serif font-black text-xl tracking-wider text-[#12291E] drop-shadow-xs">SP</span>
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-[#12291E] block leading-none font-serif">
                    SHITJE PRONASH
                  </span>
                  <span className="text-[9px] tracking-[0.24em] uppercase text-[#A8854D] font-bold block mt-1">
                    PREMIUM REAL ESTATE
                  </span>
                </div>
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden xl:flex items-center gap-1">
                <button
                  onClick={() => setActiveView('home')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                    activeView === 'home' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-home"
                >
                  {t.nav.home}
                  {activeView === 'home' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>
                
                <button
                  onClick={() => setActiveView('search')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                    activeView === 'search' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-properties"
                >
                  {t.nav.properties}
                  {activeView === 'search' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('developments')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                    activeView === 'developments' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-developments"
                >
                  Projektet
                  {activeView === 'developments' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('investments')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                    activeView === 'investments' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-investments"
                >
                  Investime
                  {activeView === 'investments' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('diaspora')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative flex items-center gap-1.5 ${
                    activeView === 'diaspora' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-diaspora"
                >
                  <Globe className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Diaspora</span>
                  {activeView === 'diaspora' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('neighborhoods')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                    activeView === 'neighborhoods' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-neighborhoods"
                >
                  Lagjet
                  {activeView === 'neighborhoods' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('open_houses')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative flex items-center gap-1.5 ${
                    activeView === 'open_houses' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-open-houses"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Open House</span>
                  {activeView === 'open_houses' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('legal_contracts')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative flex items-center gap-1.5 ${
                    activeView === 'legal_contracts' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-contracts"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-500" />
                  <span>Kontrata</span>
                  {activeView === 'legal_contracts' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('agencies')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                    activeView === 'agencies' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-agencies"
                >
                  Agjencitë
                  {activeView === 'agencies' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('market_insights')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                    activeView === 'market_insights' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-market-insights"
                >
                  Statistikat
                  {activeView === 'market_insights' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveView('contact')}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                    activeView === 'contact' 
                      ? 'text-[#12291E] bg-[#FAF5EC] font-extrabold shadow-2xs' 
                      : 'text-stone-600 hover:text-[#12291E] hover:bg-[#FAF8F5]'
                  }`}
                  id="nav-link-contact"
                >
                  Kontakti
                  {activeView === 'contact' && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B89758] rounded-full" />
                  )}
                </button>

              </nav>
            </div>

            {/* RIGHT ACTION BAR */}
            <div className="hidden md:flex items-center gap-2.5">
              
              {/* AI Matchmaker Trigger Button */}
              <button
                type="button"
                onClick={openMatchmaker}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#10241A] to-[#163324] text-[#DFBE89] border border-[#B89758]/40 text-xs font-bold hover:brightness-110 transition-all shadow-xs cursor-pointer"
                title="Gjetësi Inteligjent me Inteligjencë Artificiale"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DFBE89] animate-pulse" />
                <span className="hidden 2xl:inline">AI Matchmaker</span>
                <span className="2xl:hidden">AI</span>
              </button>

              {/* Escrow Safe Deal Tracker */}
              <button
                type="button"
                onClick={() => openTransactionTracker()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE8] text-[#12291E] text-xs font-bold transition-all cursor-pointer border border-[#ECE7DE]"
                title="Ndjekësi i Sigurt i Blerjes (Escrow Pipeline)"
              >
                <Lock className="w-3.5 h-3.5 text-[#163324]" />
                <span className="hidden 2xl:inline">Blerje e Sigurt</span>
              </button>

              {/* Compare Button */}
              <button
                onClick={() => setActiveView('compare')}
                className={`p-2.5 rounded-xl transition-all relative cursor-pointer border ${
                  activeView === 'compare' 
                    ? 'bg-[#FAF6EE] border-[#B89758]/50 text-[#12291E]' 
                    : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-600 hover:text-[#12291E] hover:border-stone-300'
                }`}
                title={t.nav.compare}
                id="header-compare-btn"
              >
                <Scale className="w-4 h-4" />
                {comparedIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#163324] text-[#DFBE89] text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                    {comparedIds.length}
                  </span>
                )}
              </button>

              {/* Real-Time Notification Bell */}
              <button
                type="button"
                onClick={() => setNotificationsOpen(true)}
                className="p-2.5 bg-[#FAF8F5] border border-[#ECE7DE] text-stone-600 hover:text-[#12291E] hover:border-stone-300 rounded-xl transition-colors relative cursor-pointer"
                title="Njoftimet dhe Alarmet në Kohë Reale"
                id="header-notifications-btn"
              >
                <Bell className="w-4 h-4 text-stone-700" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse border border-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Favorites Counter (Navigates to Dashboard Favorites) */}
              <button
                onClick={() => setActiveView('dashboard')}
                className="p-2.5 bg-[#FAF8F5] border border-[#ECE7DE] text-stone-600 hover:text-[#12291E] hover:border-stone-300 rounded-xl transition-colors relative cursor-pointer"
                title="Pronat e Ruajtura (Favoritet)"
                id="header-favorites-btn"
              >
                <Heart className="w-4 h-4 text-stone-700" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B89758] text-[#10241A] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* User Dashboard */}
              <button
                onClick={() => setActiveView('dashboard')}
                className={`p-2.5 rounded-xl transition-colors relative cursor-pointer border ${
                  activeView === 'dashboard' 
                    ? 'bg-[#FAF6EE] border-[#B89758]/50 text-[#12291E]' 
                    : 'bg-[#FAF8F5] border-[#ECE7DE] text-stone-600 hover:text-[#12291E] hover:border-stone-300'
                }`}
                title="Paneli & Mesazhet"
                id="header-user-btn"
              >
                <User className="w-4 h-4" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              {/* Primary Action Button: Publiko Pronë */}
              <button
                onClick={() => setActiveView('publish')}
                className="inline-flex items-center gap-2 bg-[#163324] hover:bg-[#10241A] text-white px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer border border-[#234F37]"
                id="header-publish-btn"
              >
                <PlusCircle className="w-4 h-4 text-[#DFBE89]" />
                <span className="tracking-wide">{t.common.publishProperty}</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setNotificationsOpen(true)}
                className="p-2 text-stone-700 hover:bg-stone-100 rounded-xl relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute 1 top-1 right-1 bg-rose-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-[#12291E] hover:bg-[#FAF8F5] rounded-xl border border-[#ECE7DE]"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#ECE7DE] px-4 pt-3 pb-6 space-y-1 shadow-lg">
            
            {/* Quick Currency & Language */}
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] mb-3">
              <div className="flex items-center gap-1">
                {(['EUR', 'CHF', 'USD', 'GBP'] as DisplayCurrency[]).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      currency === curr ? 'bg-[#163324] text-[#DFBE89]' : 'text-stone-600'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLocale('sq')}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    locale === 'sq' ? 'bg-[#163324] text-[#DFBE89]' : 'text-stone-600'
                  }`}
                >
                  AL
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    locale === 'en' ? 'bg-[#163324] text-[#DFBE89]' : 'text-stone-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <button
              onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => { setActiveView('search'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              {t.nav.properties}
            </button>
            <button
              onClick={() => { setActiveView('developments'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              🏢 Projektet e Reja
            </button>
            <button
              onClick={() => { setActiveView('investments'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              📈 Llogaritësi i Investimeve (ROI)
            </button>
            <button
              onClick={() => { setActiveView('diaspora'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-[#B89758]" />
              <span>Diaspora & Mërgata</span>
            </button>
            <button
              onClick={() => { setActiveView('financing'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              Financimi & Kreditë
            </button>
            <button
              onClick={() => { setActiveView('neighborhoods'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              Lagjet & Qytetet
            </button>
            <button
              onClick={() => { setActiveView('open_houses'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#B89758]" />
              <span>Open House & Vizitat</span>
            </button>
            <button
              onClick={() => { setActiveView('legal_contracts'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              Kontrata & Noterët
            </button>
            <button
              onClick={() => { setActiveView('property_management'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#B89758]" />
              <span>Menaxhimi i Qirave (Landlord)</span>
            </button>
            <button
              onClick={() => { setActiveView('agencies'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              Agjencitë Partnere
            </button>
            <button
              onClick={() => { setActiveView('market_insights'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              📊 Statistikat e Tregut
            </button>
            <button
              onClick={() => { setActiveView('contact'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#12291E] hover:bg-[#FAF8F5] rounded-lg"
            >
              Na Kontaktoni
            </button>

            <div className="pt-3 border-t border-[#ECE7DE] flex flex-col gap-2">
              <button
                onClick={() => { setActiveView('publish'); setMobileMenuOpen(false); }}
                className="w-full bg-[#163324] text-white py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-[#DFBE89]" />
                <span>{t.common.publishProperty}</span>
              </button>
              <button
                onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
                className="w-full bg-[#FAF8F5] text-[#12291E] border border-[#ECE7DE] py-2.5 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Paneli Im</span>
              </button>
            </div>

          </div>
        )}
      </header>

      {/* Notifications Drawer Component */}
      <NotificationsDrawer 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />
    </>
  );
};
