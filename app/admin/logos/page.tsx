// ─── Supabase setup (run once in the Supabase SQL editor) ───────────────────
//
// CREATE TABLE client_logos (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   name text NOT NULL,
//   image_url text NOT NULL,
//   display_order integer DEFAULT 0,
//   created_at timestamptz DEFAULT now()
// );
//
// Also create a Storage bucket named "client-logos" (set to Public).
// ─────────────────────────────────────────────────────────────────────────────

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { LogosClient } from "./LogosClient";

export type ClientLogo = {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
  created_at: string;
};

export default async function AdminLogosPage() {
  const supabase = await createServerSupabaseClient();
  const { data: logos } = await supabase
    .from("client_logos")
    .select("*")
    .order("display_order", { ascending: true });

  return <LogosClient initialLogos={logos ?? []} />;
}
