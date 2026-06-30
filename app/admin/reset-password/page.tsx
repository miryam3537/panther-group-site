"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/admin/update-password`,
    });

    if (error) {
      console.error("Supabase resetPasswordForEmail error:", error);
      setErrorMsg(`שגיאה: ${error.message}`);
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/4 p-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="text-3xl font-black tracking-wide text-accent">פנתר</span>
          <p className="mt-1 text-xs text-white/40">איפוס סיסמה</p>
        </div>

        {status === "sent" ? (
          /* Success state */
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 text-emerald-400" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">המייל נשלח!</p>
            <p className="mt-2 text-xs leading-relaxed text-white/40">
              בדקי את תיבת הדואר שלך ולחצי על הקישור לאיפוס הסיסמה.
            </p>
            <Link
              href="/admin/login"
              className="mt-6 inline-block text-xs text-accent hover:underline"
            >
              חזרה להתחברות
            </Link>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-right text-xs leading-relaxed text-white/50">
              הכניסי את כתובת האימייל שלך ונשלח לך קישור לאיפוס הסיסמה.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-right text-xs font-medium text-white/60">
                אימייל
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
                placeholder="admin@example.com"
                dir="ltr"
              />
            </div>

            {status === "error" && errorMsg && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-center text-xs text-red-400">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-1 rounded-xl bg-accent py-3 text-sm font-bold text-white transition-all hover:bg-accent-hover active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? "שולח..." : "שלח קישור איפוס"}
            </button>

            <Link
              href="/admin/login"
              className="text-center text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              חזרה להתחברות
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
