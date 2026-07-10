"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin/login");
      else setChecking(false);
    });
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* Top bar */}
      <header className="border-b border-white/8 bg-black/80 px-6 py-4 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-white/50 transition-colors hover:border-white/30 hover:text-white"
          >
            יציאה
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-accent">פנתר</span>
            <span className="text-xs text-white/30">|</span>
            <span className="text-sm font-medium text-white/60">ממשק ניהול</span>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Image
            src="https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/LOGO5.png"
            alt="פנתר"
            width={160}
            height={96}
            className="h-16 w-auto object-contain opacity-80"
          />
        </div>

        <h1 className="mb-3 text-center text-2xl font-black text-white">
          ברוכה הבאה
        </h1>
        <p className="mb-12 text-center text-sm text-white/40">
          בחרי את הפעולה שברצונך לבצע
        </p>

        {/* Action cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Leads */}
          <Link
            href="/admin/leads"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-8 text-right transition-all duration-300 hover:border-accent/40 hover:bg-white/7"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 transition-all duration-300 group-hover:bg-accent/25">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-7 w-7 text-accent"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-black text-white">ניהול פניות</h2>
            <p className="text-sm leading-relaxed text-white/40">
              צפייה בפניות שנשלחו דרך האתר, סימון טיפול וניהול לידים
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-accent">
              <span>כניסה לניהול פניות</span>
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>

          {/* Gallery */}
          <Link
            href="/admin/gallery"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-8 text-right transition-all duration-300 hover:border-accent/40 hover:bg-white/7"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 transition-all duration-300 group-hover:bg-accent/25">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-7 w-7 text-accent"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-black text-white">ניהול גלריה</h2>
            <p className="text-sm leading-relaxed text-white/40">
              העלאה ומחיקה של תמונות לגלריה לפי קטגוריות
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-accent">
              <span>כניסה לניהול גלריה</span>
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
