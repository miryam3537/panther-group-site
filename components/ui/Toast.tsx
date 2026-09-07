"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// ── Types ─────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

// ── Context ───────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

// ── Provider ──────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++nextId;
    setToasts((prev) => {
      const next = [...prev, { id, message, type }];
      // Max 3 toasts
      return next.length > 3 ? next.slice(next.length - 3) : next;
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastPortal toasts={toasts} />
    </ToastContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ── Left border color by type ─────────────────────────────────

const borderColors: Record<ToastType, string> = {
  success: "border-l-accent",
  error: "border-l-red-500",
  info: "border-l-white",
};

// ── Portal ────────────────────────────────────────────────────

function ToastPortal({ toasts }: { toasts: ToastItem[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="alert"
          className={[
            "toast-slide-in flex min-w-[220px] max-w-xs items-center gap-3 rounded-lg",
            "border border-white/10 border-l-4 bg-zinc-900 px-4 py-3 text-sm text-white shadow-xl",
            borderColors[t.type],
          ].join(" ")}
        >
          {t.message}
        </div>
      ))}
    </div>,
    document.body
  );
}
