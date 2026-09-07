import { createServerSupabaseClient } from "@/lib/supabase-server";
import { LogoMarquee } from "./LogoMarquee";

/** Server Component — fetches logos from Supabase, passes to client marquee */
export async function LogoMarqueeWrapper() {
  const supabase = await createServerSupabaseClient();
  const { data: logos } = await supabase
    .from("client_logos")
    .select("id, name, image_url")
    .order("display_order", { ascending: true });

  return <LogoMarquee logos={logos ?? []} />;
}
