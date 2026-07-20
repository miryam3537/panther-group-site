import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "הצהרת נגישות" };

const features = [
  { title: "ניווט במקלדת", text: "ניתן לנווט בכל האתר באמצעות מקלדת בלבד, ללא שימוש בעכבר." },
  { title: "תאימות לקוראי מסך", text: 'האתר תואם לתוכנות קריאת מסך מובילות כגון NVDA ,JAWS ו-VoiceOver.' },
  { title: "ניגודיות צבעים", text: "יחסי הניגודיות בין הטקסט לרקע עומדים בדרישות WCAG 2.1 ברמה AA." },
  { title: "שינוי גודל טקסט", text: "ניתן להגדיל את הטקסט עד 200% ללא פגיעה בתוכן או בפונקציונליות." },
  { title: "תוסף נגישות UserWay", text: "האתר מצויד בתוסף נגישות מתקדם המאפשר התאמות נוספות לפי צורך המשתמש." },
  { title: "טקסט חלופי לתמונות", text: "כל התמונות המשמעותיות באתר מלוות בטקסט חלופי (alt text) תיאורי." },
];

export default function AccessibilityPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="relative overflow-hidden bg-black py-20 text-right lg:py-28">
        <div className="pointer-events-none absolute -top-32 left-0 h-[400px] w-[400px] rounded-full bg-accent/8 blur-3xl" />
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            נגישות
          </p>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            הצהרת <span className="text-accent">נגישות</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/45">
            פנתר פרסום מחויבת להנגשת האתר לכלל המשתמשים, לרבות אנשים עם מוגבלויות.
          </p>
        </Container>
      </section>

      {/* ── Content ── */}
      <section className="bg-white py-16 lg:py-24" dir="rtl">
        <Container>
          <div className="mx-auto max-w-3xl space-y-14">

            {/* מחויבות */}
            <div>
              <h2 className="text-2xl font-black text-black">מחויבות לנגישות</h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <p className="mt-5 text-base leading-relaxed text-black/60">
                פנתר פרסום רואה חשיבות עליונה בהנגשת שירותיה לכלל הציבור, לרבות אנשים עם מוגבלויות. אנו פועלים להתאים את האתר לתקן הנגישות הבינלאומי{" "}
                <strong className="text-black">WCAG 2.1 ברמה AA</strong>
                , בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות (התשנ"ח–1998) ותקנות הנגישות לשירות.
              </p>
              <p className="mt-4 text-base leading-relaxed text-black/60">
                אנו ממשיכים לשפר את הנגישות באופן שוטף ומקבלים בברכה כל משוב שיסייע לנו להתקדם בתחום זה.
              </p>
            </div>

            {/* רמת תאימות */}
            <div>
              <h2 className="text-2xl font-black text-black">רמת תאימות</h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <p className="mt-5 text-base leading-relaxed text-black/60">
                האתר עומד ברמה <strong className="text-black">AA</strong> של תקן{" "}
                <strong className="text-black">WCAG 2.1</strong> (Web Content Accessibility Guidelines). עמידה בתקן זה מבטיחה שהאתר נגיש לאנשים עם מגוון מוגבלויות, כולל לקויות ראייה, שמיעה, מוטוריקה וקוגניציה.
              </p>
            </div>

            {/* תכונות נגישות */}
            <div>
              <h2 className="text-2xl font-black text-black">תכונות הנגישות באתר</h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl border border-black/8 bg-[#fafafa] p-5"
                  >
                    <div className="mb-2 h-[2px] w-6 rounded-full bg-accent/60" />
                    <h3 className="text-sm font-black text-black">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/50">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* קשר */}
            <div>
              <h2 className="text-2xl font-black text-black">יצירת קשר בנושא נגישות</h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <p className="mt-5 text-base leading-relaxed text-black/60">
                נתקלתם בבעיית נגישות באתר? אנו מזמינים אתכם לפנות אלינו ונטפל בפנייה בהקדם האפשרי:
              </p>
              <ul className="mt-4 space-y-2 text-base text-black/60">
                <li>
                  <strong className="text-black">רכז נגישות:</strong> פנתר פרסום
                </li>
                <li>
                  <strong className="text-black">טלפון:</strong>{" "}
                  <a href="tel:0527180241" className="text-accent hover:underline">
                    052-718-0241
                  </a>
                </li>
                <li>
                  <strong className="text-black">אימייל:</strong>{" "}
                  <a href="mailto:panther4183774@gmail.com" className="text-accent hover:underline">
                    panther4183774@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* תאריך */}
            <div className="border-t border-black/8 pt-8">
              <p className="text-sm text-black/35">
                הצהרת נגישות זו עודכנה לאחרונה ב־<strong className="text-black/50">יולי 2025</strong>.
              </p>
              <p className="mt-2 text-sm text-black/35">
                לחזרה לדף הבית:{" "}
                <Link href="/" className="text-accent hover:underline">
                  לחצו כאן
                </Link>
              </p>
            </div>

          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
