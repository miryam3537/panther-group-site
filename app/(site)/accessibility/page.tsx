import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "הצהרת נגישות" };

const lastUpdated = "יולי 2026";

const features = [
  "ניווט מלא באמצעות מקלדת בכל רכיבי האתר",
  "תגיות ARIA לתמיכה בקוראי מסך",
  "יחסי ניגודיות צבעים העומדים בדרישות WCAG 2.1 AA",
  "טקסט חלופי (alt) לכל התמונות המשמעותיות",
  "מבנה כותרות היררכי וברור (H1–H6)",
  "קישורים עם תיאור מובן מחוץ להקשר",
  "אין תוכן מהבהב או מתרוצץ שעלול לגרום לפרכוסים",
  "גופן ניתן להגדלה עד 200% ללא אובדן תוכן",
  "תמיכה בתצוגה עם יחס ניגודיות גבוה (High Contrast)",
  "וידג'ט נגישות UserWay זמין בכל עמודי האתר",
];

export default function AccessibilityPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-black py-20 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />

        <Container>
          <div className="text-right" dir="rtl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              מידע משפטי
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">
              הצהרת <span className="text-accent">נגישות</span>
            </h1>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-[3px] w-10 rounded-full bg-accent" />
              <div className="h-[3px] w-6 rounded-full bg-accent/40" />
              <div className="h-[3px] w-3 rounded-full bg-accent/20" />
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50">
              פנתר פרסום מחויבת לנגישות דיגיטלית עבור כלל המשתמשים, כולל אנשים עם
              מוגבלויות. אנו פועלים ללא הרף לשיפור חוויית המשתמש ולהנגשת האתר
              לפי הסטנדרטים הבין-לאומיים.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Content ── */}
      <section className="bg-[#0d0d0d] py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-14 text-right" dir="rtl">

            {/* מחויבות לנגישות */}
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                מחויבות <span className="text-accent">לנגישות</span>
              </h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <p className="mt-5 text-sm leading-loose text-white/55">
                פנתר פרסום מאמינה כי כל אדם זכאי לגישה שווה למידע ולשירות. אנו
                שמים דגש על עיצוב ופיתוח אתר אינטרנט המאפשר לכל משתמש, ללא
                קשר ליכולותיו הפיזיות, לנווט בנוחות ולקבל את המידע המלא. הנגישות
                היא חלק בלתי נפרד מהתרבות הארגונית שלנו ואינה הוספה אחרי עיצוב —
                היא מובנית מהיסוד.
              </p>
            </div>

            {/* רמת תאימות */}
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                רמת <span className="text-accent">תאימות</span>
              </h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <p className="mt-5 text-sm leading-loose text-white/55">
                אתר זה שואף לעמוד בדרישות תקן{" "}
                <span className="font-semibold text-white/80">WCAG 2.1 ברמה AA</span>{" "}
                (Web Content Accessibility Guidelines), שהן ההנחיות הבין-לאומיות
                המקובלות לנגישות תוכן באינטרנט. בנוסף, אנו פועלים בהתאם לדרישות
                חוק שוויון זכויות לאנשים עם מוגבלות (תשנ"ח-1998) ותקנות
                הנגישות לשירות הישראלי.
              </p>
              <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent/70">
                  סטטוס נוכחי
                </p>
                <p className="mt-2 text-sm text-white/60">
                  האתר עומד ברמת תאימות חלקית (Partial Conformance) עם WCAG 2.1 AA.
                  אנו ממשיכים לבחון ולשפר את הנגישות באופן שוטף.
                </p>
              </div>
            </div>

            {/* תכונות נגישות */}
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                תכונות נגישות <span className="text-accent">באתר</span>
              </h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <ul className="mt-5 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="text-sm leading-relaxed text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* UserWay */}
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                וידג&apos;ט <span className="text-accent">UserWay</span>
              </h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <p className="mt-5 text-sm leading-loose text-white/55">
                האתר משלב את וידג&apos;ט הנגישות של{" "}
                <span className="font-semibold text-white/80">UserWay</span>,
                המאפשר לכל משתמש להתאים אישית את חוויית הגלישה: שינוי גודל גופן,
                הגדלת ניגודיות, הפעלת קורא מסך, מצב גווני אפור, הדגשת קישורים
                ועוד. הוידג&apos;ט זמין בכל עמוד ובכל שלב הגלישה.
              </p>
            </div>

            {/* יצירת קשר */}
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                יצירת קשר בנושא <span className="text-accent">נגישות</span>
              </h2>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-accent" />
              <p className="mt-5 text-sm leading-loose text-white/55">
                נתקלתם במחסום נגישות? האתר אינו נגיש בעבורכם בצורה מסוימת?
                אנו מזמינים אתכם לפנות אלינו ישירות ונשתדל לטפל בפנייתכם
                בהקדם האפשרי.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent/70">
                    אימייל
                  </p>
                  <a
                    href="mailto:panther4183774@gmail.com"
                    className="mt-2 block text-sm text-white/70 transition-colors hover:text-white"
                  >
                    panther4183774@gmail.com
                  </a>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent/70">
                    טלפון
                  </p>
                  <a
                    href="tel:0527180241"
                    className="mt-2 block text-sm text-white/70 transition-colors hover:text-white"
                  >
                    052-718-0241
                  </a>
                </div>
              </div>
              <p className="mt-6 text-xs text-white/30">
                עודכן לאחרונה: {lastUpdated}
              </p>
            </div>

          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
