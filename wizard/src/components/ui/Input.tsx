import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  leftIcon,
  rightIcon,
  required,
  disabled,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;
  const helperId = inputId ? `${inputId}-helper` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-700"
        >
          <span>
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3.5 flex items-center text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          disabled={disabled}
          className={`
            w-full
            rounded-xl
            border
            bg-white
            py-3
            text-sm
            text-gray-900
            placeholder-gray-400
            transition-all
            duration-150
            outline-none
            ${leftIcon ? "pl-11" : "pl-4"}
            ${rightIcon ? "pr-11" : "pr-4"}
            ${
              error
                ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 hover:border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            }
            ${disabled ? "cursor-not-allowed bg-gray-50 text-gray-400" : ""}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 flex items-center text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <span>{error}</span>
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="mt-1.5 text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
