"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Wait for Supabase to establish the recovery session from the URL hash/token
  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 8) {
      setErrorMsg("הסיסמה חייבת להכיל לפחות 8 תווים");
      return;
    }
    if (password !== confirm) {
      setErrorMsg("הסיסמאות אינן תואמות");
      return;
    }

    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMsg("שגיאה בעדכון הסיסמה. נסי שוב.");
      setStatus("error");
      return;
    }

    setStatus("success");
    setTimeout(() => router.push("/admin/leads"), 2000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/4 p-8">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <Image
            src="https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/LOGO5.png"
            alt="פנתר"
            width={200}
            height={120}
            className="h-20 w-auto object-contain"
          />
          <p className="mt-1 text-xs text-white/40">הגדרת סיסמה חדשה</p>
        </div>

        {status === "success" ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 text-emerald-400" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">הסיסמה עודכנה!</p>
            <p className="mt-2 text-xs text-white/40">מעביר אותך לממשק הניהול...</p>
          </div>
        ) : !ready ? (
          /* Waiting for recovery session */
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
            <p className="text-xs text-white/40">מאמת קישור...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-right text-xs font-medium text-white/60">
                סיסמה חדשה
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
                placeholder="לפחות 8 תווים"
                dir="ltr"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-right text-xs font-medium text-white/60">
                אימות סיסמה
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
                placeholder="הכניסי שוב את הסיסמה"
                dir="ltr"
              />
            </div>

            {errorMsg && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-center text-xs text-red-400">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-1 rounded-xl bg-accent py-3 text-sm font-bold text-white transition-all hover:bg-accent-hover active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? "מעדכן..." : "עדכן סיסמה"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
