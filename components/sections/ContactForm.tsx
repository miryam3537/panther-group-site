import { Container } from "@/components/layout/Container";
import { services } from "@/lib/site";

export function ContactForm() {
  return (
    <section id="contact" className="bg-accent py-20 lg:py-28">
      <Container>
        {/*
          RTL grid:
          — Right column: title + description
          — Left column: form
        */}
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

            {/* Contact details */}
            <div className="mt-8 flex flex-col gap-2 text-sm text-white/70">
              <a
                href="tel:0527180241"
                className="transition-colors hover:text-white"
              >
                📞 052-718-0241
              </a>
              <a
                href="mailto:panther4183774@gmail.com"
                className="transition-colors hover:text-white"
              >
                ✉ panther4183774@gmail.com
              </a>
            </div>
          </div>

          {/* ── LEFT: Form ── */}
          <form
            action="/api/contact"
            method="POST"
            className="flex flex-col gap-4"
            noValidate
          >
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

            {/* Honeypot — hidden from real users, traps bots */}
            <input
              type="text"
              name="_honeypot"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-black py-4 text-center text-base font-bold text-white transition-opacity hover:opacity-75"
            >
              שלח הודעה
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
