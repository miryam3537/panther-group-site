import { createServerSupabaseClient } from "@/lib/supabase-server";
import { fallbackSubcategories, type SubcategoryRow } from "@/lib/subcategories";
import { CategoriesClient, type CategoryRow } from "./CategoriesClient";

function friendlyLoadError(servicesMessage: string | null, subcategoriesMessage: string | null) {
  if (subcategoriesMessage && /schema cache|does not exist|relation/i.test(subcategoriesMessage)) {
    return "תתי המחלקות עדיין לא נשמרו בסופאבייס. צריך להריץ פעם אחת את הקובץ supabase/subcategories.sql, ואז אפשר לערוך שם ורקע.";
  }
  return servicesMessage ?? subcategoriesMessage;
}

export default async function AdminCategoriesPage() {
  const supabase = await createServerSupabaseClient();
  const [{ data, error }, { data: subcategories, error: subcategoriesError }] = await Promise.all([
    supabase.from("services").select("id, slug, title, image_url, sort_order").order("sort_order", { ascending: true }),
    supabase
      .from("service_subcategories")
      .select("id, service_slug, slug, title, image_url, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  const storedSubcategories = (subcategories ?? []) as SubcategoryRow[];

  return (
    <CategoriesClient
      initialItems={(data ?? []) as CategoryRow[]}
      initialSubcategories={storedSubcategories.length > 0 ? storedSubcategories : fallbackSubcategories()}
      loadError={friendlyLoadError(error?.message ?? null, subcategoriesError?.message ?? null)}
    />
  );
}
