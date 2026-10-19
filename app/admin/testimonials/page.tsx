import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Testimonial } from "@/lib/testimonials";
import { TestimonialsClient } from "./TestimonialsClient";

export default async function AdminTestimonialsPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, role, body, rating, display_order")
    .order("display_order", { ascending: true });

  return (
    <TestimonialsClient
      initialItems={(data ?? []) as Testimonial[]}
      loadError={error?.message ?? null}
    />
  );
}
