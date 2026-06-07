import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  children,
  onClick,
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles =
    'w-full min-h-[52px] rounded-xl font-semibold transition-all flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1E40AF]',
    secondary: 'bg-white text-[#64748B] border border-[#E2E8F0]',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles[variant]} ${isDisabled ? disabledStyles : ''} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
}
