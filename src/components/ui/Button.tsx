import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer select-none rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeStyles = {
    sm: 'h-9 px-3.5 text-xs gap-1.5',
    md: 'h-11 px-5 text-xs sm:text-sm gap-2',
    lg: 'h-13 px-7 text-sm sm:text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#142C20] hover:bg-[#1C3E2D] active:bg-[#0F2218] text-white border border-[#142C20] shadow-sm hover:shadow-md focus:ring-[#142C20]',
    gold: 'bg-[#B89758] hover:bg-[#DFBE89] active:bg-[#A38345] text-[#10241A] font-extrabold border border-[#C5A880] shadow-sm hover:shadow-md focus:ring-[#B89758]',
    secondary: 'bg-[#FAF8F5] hover:bg-[#F2ECE1] active:bg-[#EAE2D3] text-[#142C20] border border-[#ECE7DE] hover:border-[#D5CEBF] shadow-2xs focus:ring-[#ECE7DE]',
    outline: 'bg-transparent hover:bg-[#FAF8F5] text-[#142C20] border border-[#142C20] hover:border-[#1C3E2D] focus:ring-[#142C20]',
    ghost: 'bg-transparent hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-transparent focus:ring-stone-300',
    danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white border border-rose-600 shadow-sm focus:ring-rose-500',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
