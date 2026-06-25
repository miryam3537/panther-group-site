import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "צור קשר" };

export default function ContactPage() {
  return <ContactForm />;
}
