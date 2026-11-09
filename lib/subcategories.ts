import { serviceSubcategories } from "@/lib/site";

export type SubcategoryRow = {
  id: string;
  service_slug: string;
  slug: string;
  title: string;
  image_url: string | null;
  sort_order: number;
};

type SubcategorySource = {
  service_slug: string;
  slug: string;
  title: string;
  image_url?: string | null;
  sort_order: number;
};

export function fallbackSubcategories(): SubcategoryRow[] {
  return Object.entries(serviceSubcategories).flatMap(([service_slug, subs]) =>
    subs.map((sub, index) => ({
      id: `fallback-${service_slug}-${sub.slug}`,
      service_slug,
      slug: sub.slug,
      title: sub.title,
      image_url: null,
      sort_order: index + 1,
    })),
  );
}

/** DB rows win after the table is seeded. An empty or failed read keeps the current names. */
export function subcategoriesFor(serviceSlug: string, rows: SubcategorySource[] | null) {
  if (rows && rows.length > 0) {
    return rows
      .filter((row) => row.service_slug === serviceSlug)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((row) => ({
        slug: row.slug,
        title: row.title,
        image_url: row.image_url ?? null,
      }));
  }

  return (serviceSubcategories[serviceSlug] ?? []).map((sub) => ({
    slug: sub.slug,
    title: sub.title,
    image_url: null as string | null,
  }));
}

export function subcategoryTitle(
  serviceSlug: string,
  slug: string,
  row: { title: string } | null,
  failed: boolean,
) {
  if (!failed && row?.title) return row.title;
  return serviceSubcategories[serviceSlug]?.find((sub) => sub.slug === slug)?.title ?? slug;
}
