import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { CrmLeadsManager } from '../components/CrmLeadsManager';
import { Button, Badge, ModalShell } from '../components/ui';
import { 
  Building, Heart, Bookmark, MessageSquare, PlusCircle, 
  Trash2, Edit3, Eye, Send, CheckCircle2, TrendingDown, 
  ExternalLink, Search, Clock, ArrowRight, ShieldCheck, Tag,
  Calendar, Video, MapPin, UserCheck, XCircle, Phone, Mail, Users,
  Sparkles, Check
} from 'lucide-react';
import { Conversation, Listing } from '../types';

export const DashboardPage: React.FC = () => {
  const { t } = useLocale();
  const { 
    listings, currentUser, favorites, setActiveView, setActiveListing,
    conversations, sendMessage, markConversationRead, unreadMessagesCount,
    savedSearches, deleteSavedSearch, applySavedSearch,
    updateListingStatus, updateListingPrice, deleteListing,
    viewingRequests, updateViewingStatus, crmLeads,
    convertPrice, currency
  } = useApp();

  const [activeTab, setActiveTab] = useState<'my_listings' | 'crm_leads' | 'messages' | 'saved_searches' | 'favorites' | 'viewings'>('my_listings');
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [viewingStatusFilter, setViewingStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  
  // Price reduction modal state
  const [priceModalListing, setPriceModalListing] = useState<Listing | null>(null);
  const [newPriceValue, setNewPriceValue] = useState<number>(0);
  const [priceNote, setPriceNote] = useState('');

  const myListings = listings.filter(l => l.userId === currentUser.id);
  const favoriteListings = listings.filter(l => favorites.includes(l.id));

  const activeConversation = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConvId(conv.id);
    if (conv.unreadCount > 0) {
      markConversationRead(conv.id);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, replyText);
    setReplyText('');
  };

  const handleOpenPriceModal = (listing: Listing) => {
    setPriceModalListing(listing);
    setNewPriceValue(listing.price);
    setPriceNote('Zbritje promovuese');
  };

  const handleConfirmPriceReduction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!priceModalListing || newPriceValue <= 0) return;
    updateListingPrice(priceModalListing.id, newPriceValue, priceNote);
    setPriceModalListing(null);
  };

  const quickReplies = [
    'Po, prona është e lirë për vizitë.',
    'Mund të takohemi nesër rreth orës 17:00.',
    'Dokumentet kadastrale janë gati te noteri.',
    'Çmimi është pak i negociueshëm për pagesë të menjëhershme.'
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Header */}
        <div className="bg-white rounded-2xl border border-[#ECE7DE] p-6 mb-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10241A] to-[#163324] text-[#DFBE89] text-2xl font-bold flex items-center justify-center font-serif border border-[#234F37] shadow-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#12291E] font-serif">{currentUser.name}</h1>
                <Badge variant="gold" size="sm">
                  {currentUser.role}
                </Badge>
                {currentUser.isVerified && (
                  <Badge variant="verified" size="sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Identitet i Verifikuar</span>
                  </Badge>
                )}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {currentUser.agencyName || 'Pronar Privat'} • {currentUser.email} • {currentUser.phone}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setActiveView('property_management')}
              icon={<Building className="w-4 h-4 text-[#B89758]" />}
            >
              <span>Portal Qirash & Mirëmbajtje</span>
            </Button>
            <Button
              variant="primary"
              onClick={() => setActiveView('publish')}
              icon={<PlusCircle className="w-4 h-4 text-[#DFBE89]" />}
            >
              <span>{t.common.publishProperty}</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[#ECE7DE] mb-8 overflow-x-auto space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('my_listings')}
            className={`pb-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'my_listings' 
                ? 'border-[#163324] text-[#12291E] font-extrabold' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Building className="w-4 h-4 text-[#B89758]" />
            <span>{t.nav.myProperties} ({myListings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('crm_leads')}
            className={`pb-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'crm_leads' 
                ? 'border-[#163324] text-[#12291E] font-extrabold' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4 text-[#163324]" />
            <span>Klientët & CRM Leads</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#FAF5EC] text-[#947132] border border-[#EADBBE] text-[10px] font-bold">
              {crmLeads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer relative ${
              activeTab === 'messages' 
                ? 'border-[#163324] text-[#12291E] font-extrabold' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#B89758]" />
            <span>{t.nav.messages}</span>
            {unreadMessagesCount > 0 && (
              <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-2xs">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved_searches')}
            className={`pb-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'saved_searches' 
                ? 'border-[#163324] text-[#12291E] font-extrabold' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#B89758]" />
            <span>Kërkimet e Ruajtura ({savedSearches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'favorites' 
                ? 'border-[#163324] text-[#12291E] font-extrabold' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>{t.nav.favorites} ({favoriteListings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('viewings')}
            className={`pb-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'viewings' 
                ? 'border-[#163324] text-[#12291E] font-extrabold' 
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#B89758]" />
            <span>Vizitat & Terminet ({viewingRequests.length})</span>
          </button>
        </div>

        {/* TAB 0: CRM LEADS PIPELINE */}
        {activeTab === 'crm_leads' && (
          <CrmLeadsManager />
        )}

        {/* TAB 1: MY PROPERTIES */}
        {activeTab === 'my_listings' && (
          <div>
            {myListings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <Building className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-800 mb-1">Nuk keni asnjë pronë të listuar</h3>
                <p className="text-xs text-stone-500 mb-4">Filloni duke listuar pronën tuaj të parë në pak minuta.</p>
                <button
                  onClick={() => setActiveView('publish')}
                  className="bg-stone-900 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {t.common.publishProperty}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myListings.map(listing => (
                  <div key={listing.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
                    
                    {/* Left details */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img
                        src={listing.media[0]?.thumbnailUrl || listing.media[0]?.url}
                        alt="thumb"
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            listing.status === 'published' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : listing.status === 'reserved'
                              ? 'bg-amber-100 text-amber-800'
                              : listing.status === 'sold'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-stone-100 text-stone-600'
                          }`}>
                            {listing.status === 'published' && 'Publikuar'}
                            {listing.status === 'reserved' && 'E Rezervuar'}
                            {listing.status === 'sold' && 'E Shitur'}
                            {listing.status === 'pending' && 'Në Shqyrtim'}
                            {listing.status === 'archived' && 'E Arkivuar'}
                          </span>
                          {listing.priceReduced && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-0.5">
                              <TrendingDown className="w-3 h-3" />
                              Çmim i Zbritur
                            </span>
                          )}
                          <span className="text-[11px] text-stone-400 font-mono">ID: {listing.id}</span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 line-clamp-1">{listing.titleSq}</h4>
                        <div className="text-xs text-stone-500 mt-1">
                          <strong className="text-stone-900">{convertPrice(listing.price).formatted}</strong> • {listing.areaSqm} m² • {listing.location.city} ({listing.location.neighborhood})
                        </div>
                      </div>
                    </div>

                    {/* Right actions */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                      
                      {/* View Button */}
                      <button
                        onClick={() => { setActiveListing(listing); setActiveView('detail'); }}
                        className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer border border-stone-200"
                        title="Shiko Pronën"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Shiko</span>
                      </button>

                      {/* Reduce Price Button (Sprint 3) */}
                      <button
                        onClick={() => handleOpenPriceModal(listing)}
                        className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer border border-emerald-200"
                        title="Ule Çmimin dhe Njofto Blerësit"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        <span>Ndrysho Çmimin</span>
                      </button>

                      {/* Status Dropdown */}
                      <select
                        value={listing.status}
                        onChange={e => updateListingStatus(listing.id, e.target.value as any)}
                        className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 cursor-pointer focus:outline-none"
                      >
                        <option value="published">Publikuar</option>
                        <option value="reserved">E Rezervuar</option>
                        <option value="sold">E Shitur / Dhënë</option>
                        <option value="archived">Arkivo</option>
                      </select>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm('A jeni të sigurt që dëshironi ta fshini këtë pronë?')) {
                            deleteListing(listing.id);
                          }
                        }}
                        className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Fshij Pronën"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MESSAGING SYSTEM (Sprint 3) */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl border border-[#ECE7DE] shadow-xs overflow-hidden">
            {conversations.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF5EC] text-[#B89758] mx-auto flex items-center justify-center mb-4 border border-[#EADBBE]">
                  <MessageSquare className="w-8 h-8 text-[#163324]" />
                </div>
                <h3 className="text-lg font-bold text-[#12291E] font-serif mb-1">Kutia e Mesazheve është e Zbrazët</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Këtu do të shfaqen pyetjet, bisedat dhe kërkesat e blerësve të interesuar për pronat tuaja.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
                
                {/* Left Pane: Conversation List (5 cols) */}
                <div className="md:col-span-5 border-r border-[#ECE7DE] flex flex-col bg-white">
                  <div className="p-4 border-b border-[#ECE7DE] bg-[#FAF8F5] flex items-center justify-between">
                    <div className="text-xs font-bold text-[#12291E] uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#B89758]" />
                      <span>Bisedat e Drejtpërdrejta</span>
                    </div>
                    <Badge variant="neutral" size="sm">
                      {conversations.length}
                    </Badge>
                  </div>
                  
                  <div className="divide-y divide-[#ECE7DE] overflow-y-auto max-h-[540px]">
                    {conversations.map(conv => {
                      const isSelected = activeConversation?.id === conv.id;
                      return (
                        <div
                          key={conv.id}
                          onClick={() => handleSelectConversation(conv)}
                          className={`p-4 transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected 
                              ? 'bg-[#FAF5EC] border-l-4 border-[#B89758] shadow-2xs' 
                              : 'hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <img
                            src={conv.listingCover}
                            alt="thumb"
                            className="w-13 h-13 rounded-xl object-cover shrink-0 border border-[#ECE7DE] shadow-2xs"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className={`text-xs truncate ${isSelected ? 'font-black text-[#12291E]' : 'font-bold text-stone-900'}`}>
                                {conv.participantName}
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono whitespace-nowrap">
                                {new Date(conv.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-[11px] font-semibold text-[#947132] line-clamp-1">
                              {conv.listingTitle}
                            </p>
                            <p className="text-xs text-stone-500 truncate mt-0.5">
                              {conv.lastMessage}
                            </p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0 mt-1.5 shadow-2xs animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Pane: Message Thread (7 cols) */}
                <div className="md:col-span-7 flex flex-col justify-between bg-[#FAF8F5]">
                  
                  {activeConversation ? (
                    <>
                      {/* Thread Top Header */}
                      <div className="p-4 bg-white border-b border-[#ECE7DE] flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={activeConversation.listingCover}
                            alt="thumb"
                            className="w-11 h-11 rounded-xl object-cover border border-[#ECE7DE]"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#12291E] truncate">
                              {activeConversation.listingTitle}
                            </div>
                            <div className="text-[11px] text-stone-500 flex items-center gap-1.5 flex-wrap">
                              <span>Bisedë me: <strong className="text-[#163324]">{activeConversation.participantName}</strong></span>
                              <span>•</span>
                              <span className="font-bold text-[#947132]">Çmimi: {convertPrice(activeConversation.listingPrice).formatted}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const target = listings.find(l => l.id === activeConversation.listingId);
                            if (target) {
                              setActiveListing(target);
                              setActiveView('detail');
                            }
                          }}
                        >
                          <span className="flex items-center gap-1">
                            <span>Shiko Pronën</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#B89758]" />
                          </span>
                        </Button>
                      </div>

                      {/* Messages Stream */}
                      <div className="p-5 space-y-3.5 overflow-y-auto max-h-[380px] flex-1">
                        {activeConversation.messages.map(msg => {
                          const isMe = msg.senderId === currentUser.id;
                          return (
                            <div
                              key={msg.id}
                              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                            >
                              <div className="text-[10px] text-stone-400 mb-1 px-1 font-medium">
                                {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                              <div
                                className={`max-w-[82%] rounded-2xl px-4.5 py-3 text-xs leading-relaxed ${
                                  isMe
                                    ? 'bg-gradient-to-r from-[#10241A] to-[#163324] text-white rounded-br-xs shadow-xs border border-[#234F37]'
                                    : 'bg-white text-[#12291E] border border-[#ECE7DE] rounded-bl-xs shadow-2xs'
                                }`}
                              >
                                {msg.messageText}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Quick Reply Suggestions */}
                      <div className="px-4 py-2.5 bg-white border-t border-[#ECE7DE] flex items-center gap-2 overflow-x-auto">
                        <span className="text-[10px] text-[#947132] font-bold uppercase shrink-0">Përgjigje të shpejta:</span>
                        {quickReplies.map((q, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setReplyText(q)}
                            className="text-[11px] bg-[#FAF8F5] hover:bg-[#FAF5EC] text-stone-700 hover:text-[#12291E] border border-[#ECE7DE] hover:border-[#DFBE89] px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium"
                          >
                            {q}
                          </button>
                        ))}
                      </div>

                      {/* Reply Input Bar */}
                      <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-[#ECE7DE] flex gap-2.5">
                        <input
                          type="text"
                          placeholder="Shkruani përgjigjen tuaj..."
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-[#12291E] focus:bg-white focus:border-[#B89758] focus:outline-none transition-colors"
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          icon={<Send className="w-3.5 h-3.5 text-[#DFBE89]" />}
                        >
                          <span>Dërgo</span>
                        </Button>
                      </form>
                    </>
                  ) : (
                    <div className="p-16 text-center text-stone-400 text-xs">
                      Zgjidhni një bisedë në të majtë për të lexuar mesazhet.
                    </div>
                  )}

                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED SEARCHES (Sprint 3) */}
        {activeTab === 'saved_searches' && (
          <div className="space-y-4">
            {savedSearches.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#ECE7DE] p-16 text-center shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF5EC] text-[#B89758] mx-auto flex items-center justify-center mb-4 border border-[#EADBBE]">
                  <Bookmark className="w-8 h-8 text-[#163324]" />
                </div>
                <h3 className="text-lg font-bold text-[#12291E] font-serif mb-1">Nuk keni asnjë kërkim të ruajtur</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5 leading-relaxed">
                  Shkoni te faqja e kërkimit dhe klikoni &quot;Ruaj Kërkimin&quot; për të marrë njoftime automatike në email sapo të publikohet një pronë e re.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setActiveView('search')}
                  icon={<Search className="w-4 h-4 text-[#DFBE89]" />}
                >
                  <span>Eksploro Pronat</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedSearches.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#ECE7DE] p-5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-bold text-[#12291E] font-serif">{item.title}</h4>
                        <Badge variant="gold" size="sm">
                          {item.frequency === 'instant' ? 'Njoftim i menjëhershëm' : item.frequency === 'daily' ? 'Përditshëm' : 'Javor'}
                        </Badge>
                      </div>

                      {/* Criteria Badges */}
                      <div className="flex flex-wrap gap-1.5 my-3">
                        {item.filters.city && item.filters.city !== 'all' && (
                          <span className="text-[11px] bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] px-2.5 py-1 rounded-lg font-medium">
                            Qyteti: <strong>{item.filters.city}</strong>
                          </span>
                        )}
                        {item.filters.category && (
                          <span className="text-[11px] bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] px-2.5 py-1 rounded-lg font-medium">
                            Kategoria: <strong>{item.filters.category}</strong>
                          </span>
                        )}
                        {item.filters.propertyType && item.filters.propertyType !== 'all' && (
                          <span className="text-[11px] bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] px-2.5 py-1 rounded-lg font-medium">
                            Lloji: <strong>{item.filters.propertyType}</strong>
                          </span>
                        )}
                        {item.filters.transaction && (
                          <span className="text-[11px] bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] px-2.5 py-1 rounded-lg font-medium">
                            Statusi: <strong>{item.filters.transaction === 'sale' ? 'Në Shitje' : 'Me Qira'}</strong>
                          </span>
                        )}
                        {item.filters.maxPrice && (
                          <span className="text-[11px] bg-[#FAF5EC] text-[#947132] border border-[#EADBBE] px-2.5 py-1 rounded-lg font-bold">
                            Max: {convertPrice(item.filters.maxPrice).formatted}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#ECE7DE] mt-3">
                      <div className="text-[11px] text-stone-400 font-mono">
                        Krijuar më {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteSavedSearch(item.id)}
                          className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          title="Fshij këtë kërkim"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => applySavedSearch(item)}
                          icon={<Search className="w-3.5 h-3.5 text-[#B89758]" />}
                        >
                          <span>Shiko Pronat</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FAVORITES (Pronat e Ruajtura) */}
        {activeTab === 'favorites' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-black text-[#12291E] font-serif">Pronat Tuaja të Ruajtura</h3>
                <p className="text-xs text-stone-500 mt-0.5">Krahasoni dhe ndiqni ecurinë e çmimeve për pronat e zgjedhura</p>
              </div>

              {favoriteListings.length > 0 && (
                <button
                  onClick={() => setActiveView('search')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] text-xs font-bold text-[#142C20] hover:bg-[#F3EFE8] transition-colors self-start"
                >
                  <Search className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Kërko Prona të Tjera</span>
                </button>
              )}
            </div>

            {favoriteListings.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#ECE7DE] p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm">
                <div className="w-20 h-20 rounded-full bg-[#FAF5EB] border border-[#EADBBE] text-[#B89758] flex items-center justify-center mx-auto mb-5 shadow-xs">
                  <Heart className="w-10 h-10 text-[#C5A880]" />
                </div>
                <h3 className="text-2xl font-black text-[#12291E] font-serif mb-2">
                  Nuk Keni Ruajtur Ende Asnjë Pronë
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-6 max-w-md mx-auto">
                  Eksploroni katalogun tonë të pronave luksoze dhe ruani të preferuarat tuaja duke klikuar mbi ikonën e zemrës për t'i parë dhe krahasuar në çdo kohë.
                </p>
                <button
                  onClick={() => setActiveView('search')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#163324] hover:bg-[#10241A] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer border border-[#27533C]"
                >
                  <span>Eksploro Pronat</span>
                  <ArrowRight className="w-4 h-4 text-[#DFBE89]" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteListings.map(listing => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROPERTY VIEWINGS & TOURS (Sprint 4) */}
        {activeTab === 'viewings' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B89758] uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Kalendari i Interesimit & Rezervimeve</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-[#10241A]">Terminet & Vizitat në Prona</h3>
                <p className="text-xs text-stone-500">Menaxhoni vizitat fizike dhe video-thirrjet live të rezervuara për pronat tuaja</p>
              </div>

              {/* Status Filter Segmented Controls */}
              <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#ECE7DE] text-xs">
                {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(filterKey => {
                  const labelMap = {
                    all: 'Të Gjitha',
                    pending: 'Në Pritje',
                    confirmed: 'Konfirmuar',
                    completed: 'Përfunduar',
                    cancelled: 'Anuluar'
                  };
                  return (
                    <button
                      key={filterKey}
                      type="button"
                      onClick={() => setViewingStatusFilter(filterKey)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        viewingStatusFilter === filterKey
                          ? 'bg-[#142C20] text-[#DFBE89] shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {labelMap[filterKey]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#ECE7DE]">
                <div className="text-[11px] text-stone-500 font-medium">Gjithsej Kërkesa</div>
                <div className="text-xl font-bold font-serif text-[#10241A]">{viewingRequests.length}</div>
              </div>
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#ECE7DE]">
                <div className="text-[11px] text-amber-700 font-medium">Në Pritje Konfirmimi</div>
                <div className="text-xl font-bold font-serif text-amber-700">
                  {viewingRequests.filter(r => r.status === 'pending').length}
                </div>
              </div>
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#ECE7DE]">
                <div className="text-[11px] text-[#0E6C38] font-medium">Të Konfirmuara</div>
                <div className="text-xl font-bold font-serif text-[#0E6C38]">
                  {viewingRequests.filter(r => r.status === 'confirmed').length}
                </div>
              </div>
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#ECE7DE]">
                <div className="text-[11px] text-[#B89758] font-medium">Të Përfunduara me Sukses</div>
                <div className="text-xl font-bold font-serif text-[#B89758]">
                  {viewingRequests.filter(r => r.status === 'completed').length}
                </div>
              </div>
            </div>

            {/* Viewings List */}
            {viewingRequests.filter(req => viewingStatusFilter === 'all' || req.status === viewingStatusFilter).length === 0 ? (
              <div className="bg-[#FAF8F5] rounded-3xl border border-[#ECE7DE] p-12 text-center">
                <div className="w-14 h-14 bg-white rounded-2xl border border-[#ECE7DE] flex items-center justify-center mx-auto mb-3 text-[#B89758] shadow-2xs">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-serif text-[#10241A] mb-1">
                  Nuk ka asnjë vizitë {viewingStatusFilter !== 'all' ? `me status "${viewingStatusFilter}"` : 'të planifikuar'}
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  Kërkesat e blerësve të interesuar për të parë pronat do të paraqiten këtu me njoftim të menjëhershëm.
                </p>
                {viewingStatusFilter !== 'all' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setViewingStatusFilter('all')}
                  >
                    Shiko të Gjitha Terminet
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {viewingRequests
                  .filter(req => viewingStatusFilter === 'all' || req.status === viewingStatusFilter)
                  .map(req => {
                    const matchedListing = listings.find(l => l.id === req.listingId);

                    return (
                      <div
                        key={req.id}
                        className="bg-white rounded-3xl border border-[#ECE7DE] p-5 sm:p-6 shadow-2xs hover:border-[#DFBE89] transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
                      >
                        <div className="flex items-start gap-4 sm:gap-5">
                          <img
                            src={req.listingCover}
                            alt={req.listingTitle}
                            onClick={() => {
                              if (matchedListing) {
                                setActiveListing(matchedListing);
                                setActiveView('detail');
                              }
                            }}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#ECE7DE] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              {req.status === 'pending' && <Badge variant="warning">Në Pritje të Konfirmimit</Badge>}
                              {req.status === 'confirmed' && <Badge variant="success">E Konfirmuar</Badge>}
                              {req.status === 'completed' && <Badge variant="verified">E Përfunduar me Sukses</Badge>}
                              {req.status === 'cancelled' && <Badge variant="danger">E Anuluar</Badge>}

                              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-[#FAF8F5] text-[#142C20] border border-[#ECE7DE] flex items-center gap-1.5">
                                {req.type === 'in_person' ? <MapPin className="w-3.5 h-3.5 text-[#0E6C38]" /> : <Video className="w-3.5 h-3.5 text-[#B89758]" />}
                                {req.type === 'in_person' ? 'Në Vendngjarje' : 'Video-Thirrje Live'}
                              </span>
                            </div>

                            <h4 
                              onClick={() => {
                                if (matchedListing) {
                                  setActiveListing(matchedListing);
                                  setActiveView('detail');
                                }
                              }}
                              className="font-bold font-serif text-base text-[#10241A] hover:text-[#B89758] transition-colors cursor-pointer"
                            >
                              {req.listingTitle}
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
                              <span className="flex items-center gap-1 font-bold text-[#10241A] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#ECE7DE]">
                                <Calendar className="w-3.5 h-3.5 text-[#B89758]" />
                                {req.date} në {req.timeSlot}
                              </span>
                              <span>• {req.listingCity}</span>
                              <span className="font-extrabold text-[#10241A]">• {convertPrice(req.listingPrice).formatted}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-600 mt-3 bg-[#FAF8F5] py-2 px-3 rounded-xl border border-[#ECE7DE]">
                              <span className="font-bold text-[#10241A] flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-[#B89758]" />
                                {req.clientName}
                              </span>
                              <a 
                                href={`https://wa.me/${req.clientPhone.replace(/[^0-9]/g, '')}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-[#0E6C38] font-bold hover:underline flex items-center gap-1"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                WhatsApp
                              </a>
                              <a href={`tel:${req.clientPhone}`} className="hover:text-stone-900 flex items-center gap-1 font-medium">
                                <Phone className="w-3.5 h-3.5 text-stone-400" />
                                {req.clientPhone}
                              </a>
                              <a href={`mailto:${req.clientEmail}`} className="hover:text-stone-900 flex items-center gap-1 font-medium">
                                <Mail className="w-3.5 h-3.5 text-stone-400" />
                                {req.clientEmail}
                              </a>
                            </div>

                            {req.notes && (
                              <p className="text-xs text-stone-500 mt-2 italic bg-stone-50/50 p-2 rounded-lg border border-dashed border-[#ECE7DE]">
                                &ldquo;{req.notes}&rdquo;
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Status Action Buttons */}
                        <div className="flex flex-wrap lg:flex-col gap-2 w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#ECE7DE]">
                          {req.status === 'pending' && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => updateViewingStatus(req.id, 'confirmed')}
                              icon={<CheckCircle2 className="w-3.5 h-3.5 text-[#DFBE89]" />}
                            >
                              Konfirmo Vizitën
                            </Button>
                          )}
                          {req.status === 'confirmed' && (
                            <Button
                              variant="gold"
                              size="sm"
                              onClick={() => updateViewingStatus(req.id, 'completed')}
                              icon={<UserCheck className="w-3.5 h-3.5 text-[#10241A]" />}
                            >
                              Shëno si të Kryer
                            </Button>
                          )}
                          {req.status !== 'cancelled' && req.status !== 'completed' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => updateViewingStatus(req.id, 'cancelled')}
                              icon={<XCircle className="w-3.5 h-3.5 text-rose-600" />}
                            >
                              Anulo Terminin
                            </Button>
                          )}
                          {matchedListing && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setActiveListing(matchedListing);
                                setActiveView('detail');
                              }}
                              icon={<ExternalLink className="w-3.5 h-3.5" />}
                            >
                              Shiko Pronën
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* Price Reduction Modal (Sprint 3) */}
        {priceModalListing && (
          <ModalShell
            isOpen={!!priceModalListing}
            onClose={() => setPriceModalListing(null)}
            title="Ndrysho ose Zbrit Çmimin e Pronës"
            subtitle={priceModalListing.titleSq}
            icon={<Tag className="w-5 h-5 text-[#DFBE89]" />}
            maxWidth="md"
            headerTheme="dark"
          >
            <form onSubmit={handleConfirmPriceReduction} className="space-y-4">
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#ECE7DE] text-xs flex items-center justify-between">
                <span className="text-stone-500 font-medium">Çmimi Aktual në Sistem:</span>
                <span className="font-black text-[#12291E] font-serif text-sm">{convertPrice(priceModalListing.price).formatted}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12291E] mb-1.5 uppercase tracking-wider">
                  Çmimi i Ri ({currency}):
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  value={newPriceValue}
                  onChange={e => setNewPriceValue(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs font-black text-[#12291E] focus:bg-white focus:border-[#B89758] focus:outline-none transition-colors"
                />
                {newPriceValue > 0 && newPriceValue < priceModalListing.price && (
                  <div className="mt-2 p-2.5 bg-[#FAF5EC] border border-[#EADBBE] rounded-xl text-[11px] text-[#947132] font-bold flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-[#B89758] shrink-0" />
                    <span>Zbritje prej {convertPrice(priceModalListing.price - newPriceValue).formatted} — të gjithë përdoruesit që e kanë ruajtur do të marrin njoftim të menjëhershëm!</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12291E] mb-1.5">
                  Arsyeja / Shënimi i ndryshimit:
                </label>
                <input
                  type="text"
                  value={priceNote}
                  onChange={e => setPriceNote(e.target.value)}
                  placeholder="p.sh. Zbritje sezoni, shitje e ngutshme"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-[#12291E] focus:bg-white focus:border-[#B89758] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#ECE7DE]">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setPriceModalListing(null)}
                >
                  Anulo
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<Check className="w-3.5 h-3.5 text-[#DFBE89]" />}
                >
                  Konfirmo Ndryshimin
                </Button>
              </div>
            </form>
          </ModalShell>
        )}

      </div>
    </div>
  );
};
