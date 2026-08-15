import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import type { ToastNotification } from "../../features/signup/signup.types";

interface ToastProps {
  toast: ToastNotification | null;
  onClose: () => void;
  duration?: number;
}

export function Toast({ toast, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, duration, onClose]);

  if (!toast) return null;

  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      border: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
      border: "border-rose-200 bg-rose-50 text-rose-900",
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
      border: "border-blue-200 bg-blue-50 text-blue-900",
    },
  };

  const currentConfig = typeConfig[toast.type];

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm sm:max-w-md w-full px-4 animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-auto">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-sm ${currentConfig.border}`}
        role="alert"
      >
        {currentConfig.icon}
        <div className="flex-1 text-sm font-medium leading-5 pr-1">{toast.message}</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="rounded-lg p-1 text-gray-500 hover:bg-black/5 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
