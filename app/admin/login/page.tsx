"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("אימייל או סיסמה שגויים");
      setLoading(false);
      return;
    }

    router.push("/admin/leads");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/4 p-8">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/LOGO5.png"
            alt="פנתר"
            width={200}
            height={120}
            className="h-20 w-auto object-contain"
          />
          <p className="mt-1 text-xs text-white/40">ממשק ניהול</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-right text-xs font-medium text-white/60">
              אימייל
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-right text-sm text-white placeholder:text-white/25 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
              placeholder="admin@example.com"
              dir="ltr"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-right text-xs font-medium text-white/60">
              סיסמה
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-right text-sm text-white placeholder:text-white/25 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-center text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-accent py-3 text-sm font-bold text-white transition-all hover:bg-accent-hover active:scale-95 disabled:opacity-50"
          >
            {loading ? "מתחבר..." : "כניסה"}
          </button>

          <Link
            href="/admin/reset-password"
            className="text-center text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            שכחתי סיסמה
          </Link>
        </form>
      </div>
    </div>
  );
}
