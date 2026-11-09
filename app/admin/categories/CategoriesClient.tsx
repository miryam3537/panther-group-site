"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { prepareImageForUpload } from "@/lib/prepareImage";
import type { SubcategoryRow } from "@/lib/subcategories";

export type CategoryRow = {
  id: string;
  slug: string;
  title: string;
  image_url: string | null;
  sort_order: number;
};

export function CategoriesClient({
  initialItems,
  initialSubcategories,
  loadError,
}: {
  initialItems: CategoryRow[];
  initialSubcategories: SubcategoryRow[];
  loadError: string | null;
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [subItems, setSubItems] = useState(initialSubcategories);
  const [names, setNames] = useState<Record<string, string>>(
    Object.fromEntries(initialItems.map((item) => [item.id, item.title])),
  );
  const [subNames, setSubNames] = useState<Record<string, string>>(
    Object.fromEntries(initialSubcategories.map((item) => [item.id, item.title])),
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(loadError);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
  const subFileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  async function saveName(item: CategoryRow) {
    const title = (names[item.id] ?? "").trim();
    if (!title) {
      setError("שם הקטגוריה לא יכול להיות ריק");
      return;
    }
    if (title === item.title) return;

    setBusyId(item.id);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("services")
      .update({ title })
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setItems((prev) => prev.map((row) => (row.id === item.id ? { ...row, title } : row)));
      showSuccess("השם נשמר");
    }
    setBusyId(null);
  }

  async function uploadBackground(item: CategoryRow, file: File) {
    setBusyId(item.id);
    setError(null);
    const supabase = createClient();
    const prepared = await prepareImageForUpload(file);
    const ext = prepared.name.split(".").pop() || "webp";
    const path = `backgrounds/${item.slug}/${Date.now()}.${ext}`;

    const { error: storageError } = await supabase.storage
      .from("gallery")
      .upload(path, prepared, { cacheControl: "3600", upsert: false });

    if (storageError) {
      setError(storageError.message);
      setBusyId(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);
    const { error: updateError } = await supabase
      .from("services")
      .update({ image_url: urlData.publicUrl })
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setItems((prev) =>
        prev.map((row) => (row.id === item.id ? { ...row, image_url: urlData.publicUrl } : row)),
      );
      showSuccess("תמונת הרקע נשמרה");
    }
    setBusyId(null);
  }

  function requireStoredSubcategory(item: SubcategoryRow) {
    if (item.id.startsWith("fallback-")) {
      setError("כדי לשמור תת-מחלקה, צריך להריץ פעם אחת את הקובץ supabase/subcategories.sql בסופאבייס.");
      return false;
    }
    return true;
  }

  async function saveSubName(item: SubcategoryRow) {
    const title = (subNames[item.id] ?? "").trim();
    if (!title) {
      setError("שם תת-המחלקה לא יכול להיות ריק");
      return;
    }
    if (title === item.title || !requireStoredSubcategory(item)) return;

    setBusyId(item.id);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("service_subcategories")
      .update({ title })
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSubItems((prev) => prev.map((row) => (row.id === item.id ? { ...row, title } : row)));
      showSuccess("השם נשמר");
    }
    setBusyId(null);
  }

  async function uploadSubBackground(item: SubcategoryRow, file: File) {
    if (!requireStoredSubcategory(item)) return;
    setBusyId(item.id);
    setError(null);
    const supabase = createClient();
    const prepared = await prepareImageForUpload(file);
    const ext = prepared.name.split(".").pop() || "webp";
    const path = `backgrounds/${item.service_slug}/${item.slug}/${Date.now()}.${ext}`;

    const { error: storageError } = await supabase.storage
      .from("gallery")
      .upload(path, prepared, { cacheControl: "3600", upsert: false });

    if (storageError) {
      setError(storageError.message);
      setBusyId(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);
    const { error: updateError } = await supabase
      .from("service_subcategories")
      .update({ image_url: urlData.publicUrl })
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSubItems((prev) =>
        prev.map((row) => (row.id === item.id ? { ...row, image_url: urlData.publicUrl } : row)),
      );
      showSuccess("תמונת הרקע נשמרה");
    }
    setBusyId(null);
  }

  async function clearSubBackground(item: SubcategoryRow) {
    if (!requireStoredSubcategory(item)) return;
    setBusyId(item.id);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("service_subcategories")
      .update({ image_url: null })
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSubItems((prev) =>
        prev.map((row) => (row.id === item.id ? { ...row, image_url: null } : row)),
      );
      showSuccess("תמונת הרקע הוסרה מהאתר");
    }
    setBusyId(null);
  }

  async function clearBackground(item: CategoryRow) {
    setBusyId(item.id);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("services")
      .update({ image_url: null })
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setItems((prev) =>
        prev.map((row) => (row.id === item.id ? { ...row, image_url: null } : row)),
      );
      showSuccess("תמונת הרקע הוסרה מהאתר");
    }
    setBusyId(null);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-black/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-white/50 transition-colors hover:border-white/30 hover:text-white"
            >
              יציאה
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-white/50 transition-colors hover:border-accent/40 hover:text-accent"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              ממשק ניהול
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-accent">פנתר</span>
            <span className="text-xs text-white/30">|</span>
            <span className="text-sm font-medium text-white/60">ניהול קטגוריות</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
            {successMsg}
          </div>
        )}

        <h1 className="mb-2 text-2xl font-black">קטגוריות ותתי מחלקות</h1>
        <p className="mb-8 text-sm text-white/40">
          שינוי השם מופיע באתר. תמונת הרקע של קטגוריה מוצגת בראש העמוד ובכרטיס בגלריה, ותמונת הרקע של תת-מחלקה מוצגת בכרטיס שלה ובראש העמוד שלה.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="relative h-40 bg-zinc-900">
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-white/30">
                    אין תמונת רקע
                  </div>
                )}
              </div>
              <div className="p-5">
                <label className="mb-2 block text-xs font-semibold text-white/50">שם הקטגוריה</label>
                <input
                  value={names[item.id] ?? ""}
                  onChange={(e) => setNames((prev) => ({ ...prev, [item.id]: e.target.value }))}
                  className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => saveName(item)}
                    disabled={busyId === item.id}
                    className="rounded-xl bg-accent px-4 py-2.5 text-xs font-black text-white disabled:opacity-40"
                  >
                    שמירת שם
                  </button>
                  <button
                    onClick={() => fileInputs.current[item.id]?.click()}
                    disabled={busyId === item.id}
                    className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-white/80 disabled:opacity-40"
                  >
                    {item.image_url ? "החלפת רקע" : "העלאת רקע"}
                  </button>
                  {item.image_url && (
                    <button
                      onClick={() => clearBackground(item)}
                      disabled={busyId === item.id}
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/50 disabled:opacity-40"
                    >
                      הסרת רקע
                    </button>
                  )}
                </div>
                <input
                  ref={(node) => {
                    fileInputs.current[item.id] = node;
                  }}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (file) uploadBackground(item, file);
                  }}
                />
              </div>
            </article>
          ))}
        </div>

        <h2 className="mb-2 mt-14 text-2xl font-black">תתי מחלקות</h2>
        <p className="mb-8 text-sm text-white/40">הקישור של כל תת-מחלקה נשאר קבוע, כדי שהתמונות שכבר משויכות אליה יישארו במקום.</p>

        <div className="space-y-10">
          {items.map((category) => {
            const subs = subItems.filter((sub) => sub.service_slug === category.slug);
            if (subs.length === 0) return null;
            return (
              <section key={category.id}>
                <h3 className="mb-4 text-sm font-bold text-accent">{category.title}</h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {subs.map((item) => (
                    <article key={item.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                      <div className="relative h-32 bg-zinc-900">
                        {item.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-white/30">
                            אין תמונת רקע
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <label className="mb-2 block text-xs font-semibold text-white/50">שם תת-המחלקה</label>
                        <input
                          value={subNames[item.id] ?? ""}
                          onChange={(e) => setSubNames((prev) => ({ ...prev, [item.id]: e.target.value }))}
                          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => saveSubName(item)}
                            disabled={busyId === item.id}
                            className="rounded-xl bg-accent px-4 py-2.5 text-xs font-black text-white disabled:opacity-40"
                          >
                            שמירת שם
                          </button>
                          <button
                            onClick={() => subFileInputs.current[item.id]?.click()}
                            disabled={busyId === item.id}
                            className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-white/80 disabled:opacity-40"
                          >
                            {item.image_url ? "החלפת רקע" : "העלאת רקע"}
                          </button>
                          {item.image_url && (
                            <button
                              onClick={() => clearSubBackground(item)}
                              disabled={busyId === item.id}
                              className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/50 disabled:opacity-40"
                            >
                              הסרת רקע
                            </button>
                          )}
                        </div>
                        <input
                          ref={(node) => {
                            subFileInputs.current[item.id] = node;
                          }}
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            e.target.value = "";
                            if (file) uploadSubBackground(item, file);
                          }}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
