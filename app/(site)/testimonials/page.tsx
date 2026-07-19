import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "המלצות" };

const testimonials = [
  {
    name: "המכון למצוות התלויות בארץ",
    role: "",
    text: "נהנינו מאוד מהשירות, האיכות, הדייקנות של פנתר. החל משלב השליחה לדפוס ועד לתוצר המוגמר של הגליונות וכן של שאר הדפסות מודעות רחוב וכו'. יישר כח לר' אריאל על השירות הנפלא!",
    rating: 5,
  },
  {
    name: "מרכז זרעים",
    role: "",
    text: "יש לציין שגם בזמני לחץ החברה שלכם עמדה להביא את המוצר האיכותי בזמן, ולאורך כל הדרך לתת ייעוץ ועזרה שהלקוח יקבל את המיטב. תודה לכם!",
    rating: 5,
  },
  {
    name: "שושנה עטיה",
    role: "איגוד עמלי תורה",
    text: "ברצוננו להמליץ על פנתר — שירות ואכפתיות לאורך כל הדרך. דאגה כאילו אנחנו הלקוחות היחידים. תודה על שירות נפלא ועל יחס אישי!!",
    rating: 5,
  },
  {
    name: "נחמה פרסום",
    role: "",
    text: "אנחנו מאד מרוצים מהעבודה המדויקת והאכפתית של דפוס פנתר. בכל פעם מחדש ביצעו את העבודה על הצד הטוב ביותר במקצועיות ובאדיבות. יישר כוח!",
    rating: 5,
  },
  {
    name: "לקוח מרוצה",
    role: "",
    text: "ברצוננו להמליץ בחום על הטיפול המסור, המהיר והאדיב של חברת פנתר. רצינו להדגיש שהמחירים מאוד הוגנים. השתמשנו במספר שירותים שונים, ושמחנו מאוד לאורך כל הדרך.",
    rating: 5,
  },
  {
    name: "חברת חכמני 26 בע\"מ",
    role: "",
    text: "אני ממליץ בחום על פנתר — קיבלתי שירות אישי מהיר ומקצועי, בנוסף למחיר ללא תחרות!! רוצו לקבל הצעת מחיר — לא תתחרטו!",
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
