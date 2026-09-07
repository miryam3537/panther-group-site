"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { services } from "@/lib/site";
import { useToast } from "@/components/ui/Toast";

type Status = "idle" | "loading" | "success" | "error";

// ── Confetti pieces (pure CSS, no library) ────────────────────
const CONFETTI_COLORS = ["#f97316", "#fbbf24", "#ef4444", "#3b82f6", "#22c55e", "#ec4899", "#a855f7"];
const CONFETTI_PIECES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${3 + (i * 3.4) % 94}%`,
  delay: `${(i * 0.045) % 0.9}s`,
  size: `${6 + (i % 5) * 2}px`,
  isCircle: i % 3 === 0,
}));

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
      {CONFETTI_PIECES.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute top-4"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? "50%" : "2px",
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { toast } = useToast();

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast("הועתק ללוח!", "success");
    } catch {
      toast("ההעתקה נכשלה", "error");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? "שגיאה בשליחה");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("שגיאת רשת — נסי שוב");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-accent py-20 lg:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── RIGHT: Text ── */}
          <div className="text-right">
            <h2 className="text-4xl font-black text-white lg:text-5xl">
              מוכנים לזינוק?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              השאירו פרטי קשר
              <br />
              ואנחנו נחזור אליכם בהקדם
            </p>
            <p className="mt-2 text-lg font-bold text-white">
              להצעת מחיר מושלמת עבורכם!
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <a href="tel:0527180241" className="transition-colors hover:text-white">
                  📞 052-718-0241
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard("0527180241")}
                  aria-label="העתק מספר טלפון"
                  className="rounded p-1 text-white/40 transition-colors hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <a href="mailto:panther4183774@gmail.com" className="transition-colors hover:text-white">
                  ✉ panther4183774@gmail.com
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard("panther4183774@gmail.com")}
                  aria-label="העתק כתובת אימייל"
                  className="rounded p-1 text-white/40 transition-colors hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── LEFT: Form ── */}
          <div>
            {status === "success" ? (
              <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/15 px-8 py-14 text-center">
                {/* Confetti rain */}
                <Confetti />

                {/* Animated checkmark */}
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/25 ring-4 ring-white/20 animate-[scale-in_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10"
                    aria-hidden="true"
                    style={{ animation: "stroke-in 0.5s ease 0.2s both" }}
                  >
                    <path d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>

                <p className="text-2xl font-black text-white">🎉 ההודעה נשלחה!</p>
                <p className="mt-2 text-base text-white/75">
                  קיבלנו את זה — נחזור אליך בהקדם!
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-7 rounded-xl border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  שלח הודעה נוספת
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="שם מלא *"
                    required
                    dir="rtl"
                    className="rounded-xl bg-white/25 px-4 py-3.5 text-right text-white placeholder:text-white/60 outline-none ring-0 transition focus:bg-white/35 focus:ring-2 focus:ring-white/40"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="טלפון *"
                    required
                    dir="rtl"
                    className="rounded-xl bg-white/25 px-4 py-3.5 text-right text-white placeholder:text-white/60 outline-none ring-0 transition focus:bg-white/35 focus:ring-2 focus:ring-white/40"
                  />
                </div>

                {/* Row 2: Email */}
                <input
                  type="email"
                  name="email"
                  placeholder="אימייל"
                  dir="rtl"
                  className="rounded-xl bg-white/25 px-4 py-3.5 text-right text-white placeholder:text-white/60 outline-none ring-0 transition focus:bg-white/35 focus:ring-2 focus:ring-white/40"
                />

                {/* Row 3: Service dropdown */}
                <select
                  name="service"
                  dir="rtl"
                  className="rounded-xl bg-white/25 px-4 py-3.5 text-right text-white/80 outline-none ring-0 transition focus:bg-white/35 focus:ring-2 focus:ring-white/40"
                >
                  <option value="" className="bg-gray-900 text-white">
                    שירות מבוקש (אופציונלי)
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id} className="bg-gray-900 text-white">
                      {s.title}
                    </option>
                  ))}
                </select>

                {/* Row 4: Message */}
                <textarea
                  name="message"
                  placeholder="הודעה"
                  rows={4}
                  dir="rtl"
                  className="resize-none rounded-xl bg-white/25 px-4 py-3.5 text-right text-white placeholder:text-white/60 outline-none ring-0 transition focus:bg-white/35 focus:ring-2 focus:ring-white/40"
                />

                {/* Honeypot */}
                <input
                  type="text"
                  name="_honeypot"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {errorMsg && (
                  <p className="rounded-xl bg-black/20 px-4 py-3 text-center text-sm text-white">
                    ⚠ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-cta w-full rounded-xl bg-black py-4 text-center text-base font-bold text-white disabled:opacity-50"
                >
                  {status === "loading" ? "שולח..." : "שלח הודעה"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
