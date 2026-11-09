import { createServerSupabaseClient } from "@/lib/supabase-server";
import { CategoriesClient, type CategoryRow } from "./CategoriesClient";

export default async function AdminCategoriesPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("services")
    .select("id, slug, title, image_url, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <CategoriesClient
      initialItems={(data ?? []) as CategoryRow[]}
      loadError={error?.message ?? null}
    />
  );
}
