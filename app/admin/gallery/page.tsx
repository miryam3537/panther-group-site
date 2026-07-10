"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type GalleryImage = {
  id: string;
  category: string;
  storage_path: string;
  url: string;
  display_order: number;
  created_at: string;
};

const CATEGORIES = [
  { slug: "branding", label: "מיתוג ופרסום" },
  { slug: "promotions", label: 'הפקות וקד"מ' },
  { slug: "events", label: "הפקות אירועים" },
  { slug: "signage", label: "שילוט למוסדות" },
  { slug: "digital", label: "מדיה ודיגיטל" },
  { slug: "boards", label: "לוחות פרסום" },
];

export default function AdminGalleryPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].slug);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth check
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin/login");
    });
  }, [router]);

  // Fetch images for active category
  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("category", activeCategory)
      .order("display_order", { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setImages(data ?? []);
    }
    setLoading(false);
  }, [activeCategory]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  // Upload files
  async function uploadFiles(files: FileList | File[]) {
    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (!fileArray.length) return;

    setUploading(true);
    setError(null);
    const supabase = createClient();
    let uploaded = 0;

    for (const file of fileArray) {
      const ext = file.name.split(".").pop();
      const path = `${activeCategory}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      // Step 1: upload to storage
      const storageResult = await supabase.storage
        .from("gallery")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      console.log("📦 Storage upload result:", JSON.stringify(storageResult));

      if (storageResult.error) {
        setError(`❌ שגיאת Storage: ${storageResult.error.message}`);
        setUploading(false);
        return;
      }

      // Step 2: get public URL
      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(path);

      console.log("🔗 Public URL:", urlData.publicUrl);

      // Step 3: insert into DB
      const dbResult = await supabase.from("gallery_images").insert({
        category: activeCategory,
        storage_path: path,
        url: urlData.publicUrl,
        display_order: images.length + uploaded + 1,
      });

      console.log("🗄️ DB insert result:", JSON.stringify(dbResult));

      if (dbResult.error) {
        setError(`❌ שגיאת DB: ${dbResult.error.message}`);
        setUploading(false);
        return;
      }

      uploaded++;
    }

    setUploading(false);
    showSuccess(`✅ ${uploaded} תמונות הועלו בהצלחה`);
    fetchImages();
  }

  // Delete image
  async function deleteImage(img: GalleryImage) {
    setDeletingId(img.id);
    const supabase = createClient();

    await supabase.storage.from("gallery").remove([img.storage_path]);
    await supabase.from("gallery_images").delete().eq("id", img.id);

    setDeletingId(null);
    showSuccess("התמונה נמחקה");
    fetchImages();
  }

  // Drag & drop handlers
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }
  function onDragLeave() {
    setDragOver(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* ── Top bar ── */}
      <header className="border-b border-white/8 bg-black/80 px-6 py-4 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
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
            <span className="text-sm font-medium text-white/60">ניהול גלריה</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* ── Feedback messages ── */}
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

        {/* ── Category tabs ── */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeCategory === cat.slug
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "border border-white/10 text-white/50 hover:border-accent/40 hover:text-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Upload zone ── */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`mb-8 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-10 transition-all ${
            dragOver
              ? "border-accent bg-accent/10"
              : "border-white/15 bg-white/3 hover:border-accent/50 hover:bg-accent/5"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          {uploading ? (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
              <p className="text-sm text-white/60">מעלה תמונות...</p>
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`h-10 w-10 transition-colors ${dragOver ? "text-accent" : "text-white/25"}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm font-medium text-white/60">
                גרור תמונות לכאן או{" "}
                <span className="text-accent underline underline-offset-2">לחץ לבחירה</span>
              </p>
              <p className="text-xs text-white/30">JPG, PNG, WEBP — ללא הגבלת כמות</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          />
        </div>

        {/* ── Images grid ── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
          </div>
        ) : images.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/3 py-16 text-center">
            <p className="text-sm text-white/30">אין תמונות בקטגוריה זו עדיין</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-900"
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                  <button
                    onClick={() => deleteImage(img)}
                    disabled={deletingId === img.id}
                    className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/20 px-4 py-2 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/40 disabled:opacity-50"
                  >
                    {deletingId === img.id ? (
                      <span className="h-3 w-3 animate-spin rounded-full border border-red-400 border-t-transparent" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    )}
                    מחק
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image count */}
        {!loading && images.length > 0 && (
          <p className="mt-4 text-left text-xs text-white/30">
            {images.length} תמונות בקטגוריה זו
          </p>
        )}
      </main>
    </div>
  );
}
