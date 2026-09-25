import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  headerTheme?: 'dark' | 'light';
}

export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = 'md',
  headerTheme = 'dark',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0C1E14]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full ${maxWidthStyles[maxWidth]} rounded-2xl border border-[#ECE7DE] shadow-2xl overflow-hidden my-8 relative animate-in zoom-in-95 duration-200`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 relative ${
          headerTheme === 'dark' 
            ? 'bg-[#10241A] text-white border-b border-[#1E3F2E]' 
            : 'bg-[#FAF8F5] text-stone-900 border-b border-[#ECE7DE]'
        }`}>
          <div className="flex items-center gap-3 pr-10">
            {icon && (
              <div className={`p-2 rounded-xl shrink-0 ${
                headerTheme === 'dark' 
                  ? 'bg-[#1A3D2A] text-[#DFBE89] border border-[#27533C]' 
                  : 'bg-white text-[#142C20] border border-[#ECE7DE] shadow-2xs'
              }`}>
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h3 className={`text-base sm:text-lg font-bold truncate font-serif ${
                headerTheme === 'dark' ? 'text-white' : 'text-[#12291E]'
              }`}>
                {title}
              </h3>
              {subtitle && (
                <p className={`text-xs truncate mt-0.5 ${
                  headerTheme === 'dark' ? 'text-[#DFBE89]' : 'text-stone-500'
                }`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer ${
              headerTheme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800'
            }`}
            aria-label="Mbyll dritaren"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
