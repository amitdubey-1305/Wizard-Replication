import { useRef, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false,
  autoFocus = true,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into array of characters, padded with empty strings
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Extract only digits
    const cleaned = rawVal.replace(/\D/g, "");

    if (!cleaned) {
      // User cleared the input
      const newDigits = [...digits];
      newDigits[index] = "";
      onChange(newDigits.join(""));
      return;
    }

    // Take the last entered character if multiple were typed
    const singleChar = cleaned.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = singleChar;
    const newOtp = newDigits.join("");
    onChange(newOtp);

    // Auto-focus next input if available
    if (index < length - 1 && singleChar) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Current is empty, focus and clear previous box
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
      } else {
        // Clear current box
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, length);
    if (!pastedData) return;

    onChange(pastedData);
    // Focus the box corresponding to pasted length (or last box)
    const focusIndex = Math.min(pastedData.length, length) - 1;
    if (focusIndex >= 0 && inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => {
        const isFilled = !!digits[index];
        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digits[index]}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of verification code`}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`
              h-12 w-11 sm:h-14 sm:w-13
              rounded-xl
              border
              text-center
              text-lg sm:text-xl
              font-semibold
              transition-all
              duration-150
              outline-none
              ${
                error
                  ? "border-red-500 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : isFilled
                  ? "border-indigo-600 bg-indigo-50/30 text-indigo-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                  : "border-gray-200 bg-white text-gray-900 hover:border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              }
              ${disabled ? "cursor-not-allowed bg-gray-100 opacity-60" : ""}
            `}
          />
        );
      })}
    </div>
  );
}

export default OTPInput;
