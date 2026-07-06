"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { services } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

            <div className="mt-8 flex flex-col gap-2 text-sm text-white/70">
              <a href="tel:0527180241" className="transition-colors hover:text-white">
                📞 052-718-0241
              </a>
              <a href="mailto:panther4183774@gmail.com" className="transition-colors hover:text-white">
                ✉ panther4183774@gmail.com
              </a>
            </div>
          </div>

          {/* ── LEFT: Form ── */}
          <div>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/15 px-8 py-14 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-8 w-8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-xl font-black text-white">ההודעה נשלחה!</p>
                <p className="mt-2 text-sm text-white/70">
                  נחזור אליך בהקדם האפשרי.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-xl border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
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
