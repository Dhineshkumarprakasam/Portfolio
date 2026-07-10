import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastContextType {
  showToast: (message: string) => void;
}
const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => setMessage(msg), []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 2200);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          message ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {message && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#161b22] border border-[#30363d] shadow-lg text-[12px] font-mono text-[#e6edf3]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
            {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};