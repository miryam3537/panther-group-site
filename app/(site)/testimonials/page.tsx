import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { fallbackTestimonials, type Testimonial } from "@/lib/testimonials";

export const metadata: Metadata = { title: "המלצות" };

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

async function loadTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, role, body, rating, display_order")
      .order("display_order", { ascending: true });

    if (error || !data) return fallbackTestimonials;
    return data;
  } catch {
    return fallbackTestimonials;
  }
}

export default async function TestimonialsPage() {
  const testimonials = await loadTestimonials();

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

          {testimonials.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <blockquote
                  key={t.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 text-right"
                >
                  <Stars count={t.rating} />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    &ldquo;{t.body}&rdquo;
                  </p>
                  <footer className="mt-5 border-t border-border pt-4">
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-right text-sm text-muted">אין המלצות להצגה כרגע.</p>
          )}
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
