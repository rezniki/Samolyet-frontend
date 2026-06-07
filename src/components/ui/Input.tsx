import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  hint?: string;
  error?: string;
  showPasswordToggle?: boolean;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    showPasswordToggle = false,
    type = 'text',
    containerClassName = '',
    id,
    ...props
  },
  ref,
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  const isPasswordField = type === 'password';
  const resolvedType = isPasswordField && showPasswordToggle && isPasswordVisible ? 'text' : type;

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#1E293B]">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          className={`min-h-[52px] w-full rounded-xl border bg-white px-4 text-base text-[#1E293B] placeholder:text-[#94A3B8] outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 ${
            error ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
          } ${showPasswordToggle && isPasswordField ? 'pr-12' : ''}`}
          {...props}
        />

        {showPasswordToggle && isPasswordField && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#64748B] transition-colors hover:text-[#1E293B]"
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            tabIndex={-1}
          >
            {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-[#EF4444]">{error}</p>}
      {!error && hint && <p className="text-sm text-[#94A3B8]">{hint}</p>}
    </div>
  );
});
