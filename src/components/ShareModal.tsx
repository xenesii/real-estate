import React, { useState } from 'react';
import { Listing } from '../types';
import { useLocale } from '../context/LocaleContext';
import { 
  Copy, Check, Share2, Printer, 
  MessageSquare, Send, Mail, Globe, ExternalLink 
} from 'lucide-react';
import { ModalShell } from './ui/ModalShell';
import { Button } from './ui/Button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
  onOpenPrintBrochure?: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  listing,
  onOpenPrintBrochure
}) => {
  const { locale } = useLocale();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const title = locale === 'en' ? listing.titleEn : listing.titleSq;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://shitjepronash.com';
  const shareText = `Shiko këtë pronë në SHITJE PRONASH: ${title} - €${listing.price.toLocaleString()} (${listing.location?.city || ''})`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`;
  const viberUrl = `viber://forward?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\nLidhja: ${currentUrl}`)}`;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle="Shpërndaj këtë pronë ekskluzive"
      icon={<Share2 className="w-5 h-5" />}
      maxWidth="md"
      headerTheme="dark"
    >
      <div className="space-y-5">
        {/* Direct Link Copy */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
            Lidhja Direkte (URL):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl text-xs text-stone-700 truncate focus:outline-none"
            />
            <Button
              type="button"
              variant={copied ? 'primary' : 'gold'}
              size="sm"
              onClick={handleCopyLink}
              icon={copied ? <Check className="w-4 h-4 text-[#DFBE89]" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? 'Kopjuar' : 'Kopjo'}
            </Button>
          </div>
        </div>

        {/* Quick Social Shares */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
            Dërgo me një Klik:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-[#E8F8EE] text-[#0E6C38] border border-[#C2E8D0] rounded-xl font-bold text-xs hover:bg-[#D5F2DF] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={viberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-[#F4EEFB] text-[#6E3B9B] border border-[#DFCEF5] rounded-xl font-bold text-xs hover:bg-[#EAE0F7] transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Viber</span>
            </a>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-[#EEF6FC] text-[#2275B4] border border-[#CFE5F7] rounded-xl font-bold text-xs hover:bg-[#DFF0FB] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Telegram</span>
            </a>

            <a
              href={emailUrl}
              className="flex items-center justify-center gap-2 p-3 bg-[#FAF8F5] text-stone-700 border border-[#ECE7DE] rounded-xl font-bold text-xs hover:bg-[#F2ECE1] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#B89758]" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Print Brochure Option */}
        {onOpenPrintBrochure && (
          <div className="pt-3 border-t border-[#ECE7DE]">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => {
                onClose();
                onOpenPrintBrochure();
              }}
              icon={<Printer className="w-4 h-4 text-[#B89758]" />}
            >
              Shkarko apo Printo Broshurën PDF
            </Button>
          </div>
        )}
      </div>
    </ModalShell>
  );
};
