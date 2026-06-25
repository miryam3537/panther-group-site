import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-neutral-950 px-8 py-14 text-center lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,85,0,0.15),transparent_55%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              מוכנים לקחת את המותג שלכם
              <span className="block text-accent">שלב קדימה?</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              בואו נבנה יחד קמפיין, מיתוג או נוכחות דיגיטלית שתעמוד מעל
              הרעש.
            </p>
            <div className="mt-8">
              <Button href="/contact">צרו קשר</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
