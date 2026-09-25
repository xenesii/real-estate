import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'sale' | 'rent' | 'exclusive' | 'verified' | 'neutral' | 'gold' | 'success' | 'danger' | 'warning';
  size?: 'xs' | 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1 font-bold uppercase tracking-wider rounded-lg select-none whitespace-nowrap transition-colors';

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-[11px]',
    md: 'px-3 py-1.5 text-xs',
  };

  const variantStyles = {
    sale: 'bg-[#142C20] text-white border border-[#27533C] shadow-2xs',
    rent: 'bg-[#B89758] text-[#12291E] border border-[#DFBE89] shadow-2xs font-extrabold',
    exclusive: 'bg-gradient-to-r from-[#DFBE89] via-[#CBB084] to-[#B89758] text-[#10241A] font-black border border-[#EADBBD] shadow-2xs',
    verified: 'bg-[#10241A]/90 backdrop-blur-md text-[#DFBE89] border border-[#244A36] shadow-2xs',
    neutral: 'bg-white/95 backdrop-blur-md text-stone-800 border border-stone-200/80 shadow-2xs',
    gold: 'bg-[#FAF5EC] text-[#8B6E39] border border-[#E9DCBE]',
    success: 'bg-emerald-600 text-white shadow-2xs',
    danger: 'bg-rose-600 text-white shadow-2xs',
    warning: 'bg-amber-500 text-[#12291E] shadow-2xs',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
