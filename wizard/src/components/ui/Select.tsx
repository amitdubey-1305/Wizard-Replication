import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: Option[] | readonly string[];
}

export function Select({
  label,
  error,
  helperText,
  placeholder = "Select an option",
  options,
  id,
  className = "",
  required,
  disabled,
  value,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const errorId = selectId ? `${selectId}-error` : undefined;
  const helperId = selectId ? `${selectId}-helper` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-700"
        >
          <span>
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          disabled={disabled}
          value={value ?? ""}
          className={`
            w-full
            appearance-none
            rounded-xl
            border
            bg-white
            px-4
            py-3
            pr-10
            text-sm
            transition-all
            duration-150
            outline-none
            ${!value ? "text-gray-400" : "text-gray-900"}
            ${
              error
                ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 hover:border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            }
            ${disabled ? "cursor-not-allowed bg-gray-50 text-gray-400" : ""}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>
          {options.map((opt) => {
            if (typeof opt === "string") {
              return (
                <option key={opt} value={opt} className="text-gray-900">
                  {opt}
                </option>
              );
            }
            return (
              <option key={opt.value} value={opt.value} className="text-gray-900">
                {opt.label}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600">
          {error}
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

export default Select;
