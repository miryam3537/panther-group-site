import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "המלצות" };

const testimonials = [
  {
    name: "דוד כהן",
    role: "מנכ\"ל, רשת מסעדות",
    text: "פנתר עשו לנו מיתוג מחדש מושלם. הלוגו, הצבעים, החומרים — הכל עבד בדיוק כמו שרצינו. ממליץ בחום!",
    rating: 5,
  },
  {
    name: "שרה לוי",
    role: "מנהלת שיווק, חברת הייטק",
    text: "הפקת האירוע שלנו יצאה מעבר לציפיות. הצוות של פנתר מקצועי, זמין ויצירתי. בפרויקט הבא — ללא ספק נחזור.",
    rating: 5,
  },
  {
    name: "משה אברהם",
    role: "בעלים, רשת חנויות",
    text: "שילוט מדהים שמשך לקוחות חדשים מהרחוב. ההשקעה החזירה את עצמה תוך חודשיים. שירות אדיר!",
    rating: 5,
  },
  {
    name: "נועה גרין",
    role: "מנהלת, בית ספר",
    text: "החומרי שיווק שעיצבו לנו הרימו את המוסד שלנו לרמה אחרת לגמרי. מקצועיים ואמינים.",
    rating: 5,
  },
  {
    name: "יוסי פרידמן",
    role: "יזם, סטארטאפ",
    text: "ניהלו לנו את הרשתות החברתיות ועזרו לנו לבנות קהילה אמיתית. הצמיחה בעוקבים הייתה מדהימה.",
    rating: 5,
  },
  {
    name: "רחל מזרחי",
    role: "אדריכלית",
    text: "לוחות הפרסום שהפיקו לנו היו ברמה הגבוהה ביותר. איכות ייצור, עיצוב ושירות — 10 מתוך 10.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`דירוג ${count} מתוך 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-accent text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-background py-20 lg:py-28">
        <Container>
          <div className="text-right">
            <p className="text-sm font-medium text-accent">לקוחות מרוצים</p>
            <h1 className="mt-2 text-4xl font-black text-foreground sm:text-5xl">
              מה אומרים <span className="text-accent">עלינו</span>
            </h1>
            <p className="mt-3 text-muted">
              200+ לקוחות בחרו בנו — ולא בכדי
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 text-right"
              >
                <Stars count={t.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
