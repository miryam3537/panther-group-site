import type { Metadata } from "next";
import { PrivacyContent } from "@/components/sections/PrivacyContent";

export const metadata: Metadata = { title: "מדיניות פרטיות" };

export default function PrivacyPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative bg-black py-16 lg:py-20">
        <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent/70">
            מסמך משפטי
          </p>
          <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">
            מדיניות פרטיות
          </h1>
          <p className="mt-3 text-sm text-white/40">
            עודכן לאחרונה: 16 ביולי 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <PrivacyContent />
        </div>
      </section>
    </>
  );
}
