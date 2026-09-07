"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { ClientLogo } from "./page";

interface Props {
  initialLogos: ClientLogo[];
}

export function LogosClient({ initialLogos }: Props) {
  const router = useRouter();
  const [logos, setLogos] = useState<ClientLogo[]>(initialLogos);
  const [logoName, setLogoName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth check
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin/login");
    });
  }, [router]);

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  const fetchLogos = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("client_logos")
      .select("*")
      .order("display_order", { ascending: true });
    setLogos(data ?? []);
  }, []);

  function handleFileSelect(file: File) {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    // Auto-fill name from filename (strip extension)
    if (!logoName) {
      setLogoName(file.name.replace(/\.[^.]+$/, ""));
    }
  }

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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFileSelect(file);
  }

  async function uploadLogo() {
    if (!selectedFile) return;
    if (!logoName.trim()) {
      setError("יש להזין שם לוגו");
      return;
    }

    setUploading(true);
    setError(null);
    const supabase = createClient();

    // Step 1: Upload to storage
    const ext = selectedFile.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: storageError } = await supabase.storage
      .from("client-logos")
      .upload(path, selectedFile, { cacheControl: "3600", upsert: false });

    if (storageError) {
      setError(`❌ שגיאת Storage: ${storageError.message}`);
      setUploading(false);
      return;
    }

    // Step 2: Get public URL
    const { data: urlData } = supabase.storage
      .from("client-logos")
      .getPublicUrl(path);

    // Step 3: Insert into DB
    const { error: dbError } = await supabase.from("client_logos").insert({
      name: logoName.trim(),
      image_url: urlData.publicUrl,
      display_order: logos.length + 1,
    });

    if (dbError) {
      setError(`❌ שגיאת DB: ${dbError.message}`);
      setUploading(false);
      return;
    }

    setUploading(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setLogoName("");
    showSuccess("✅ הלוגו הועלה בהצלחה");
    fetchLogos();
  }

  async function deleteLogo(logo: ClientLogo) {
    setDeletingId(logo.id);
    const supabase = createClient();

    // Extract storage path from URL
    const url = new URL(logo.image_url);
    const storagePath = url.pathname.split("/client-logos/")[1];
    if (storagePath) {
      await supabase.storage.from("client-logos").remove([storagePath]);
    }
    await supabase.from("client_logos").delete().eq("id", logo.id);

    setDeletingId(null);
    showSuccess("הלוגו נמחק");
    fetchLogos();
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
            <span className="text-sm font-medium text-white/60">ניהול לוגואים</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* ── Feedback ── */}
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

        {/* ── Upload card ── */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="mb-6 text-lg font-black text-white">העלאת לוגו חדש</h2>

          {/* Drop zone */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`mb-5 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-10 transition-all ${
              dragOver
                ? "border-accent bg-accent/10"
                : "border-white/15 bg-white/3 hover:border-accent/50 hover:bg-accent/5"
            } ${uploading ? "pointer-events-none opacity-60" : ""}`}
          >
            {previewUrl ? (
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="תצוגה מקדימה"
                  className="h-20 w-auto max-w-[200px] object-contain"
                />
                <p className="text-xs text-white/40">לחץ להחלפת קובץ</p>
              </div>
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
                  גרור לוגו לכאן או{" "}
                  <span className="text-accent underline underline-offset-2">לחץ לבחירה</span>
                </p>
                <p className="text-xs text-white/30">PNG, SVG, WEBP</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/svg+xml,image/webp,image/jpeg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </div>

          {/* Name input */}
          <div className="mb-5">
            <label className="mb-2 block text-xs font-semibold text-white/50">
              שם הלקוח / מותג
            </label>
            <input
              type="text"
              value={logoName}
              onChange={(e) => setLogoName(e.target.value)}
              placeholder="לדוגמה: קוקה-קולה"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>

          {/* Upload button */}
          <button
            onClick={uploadLogo}
            disabled={!selectedFile || uploading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-accent/20 transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {uploading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                מעלה...
              </>
            ) : (
              "העלה לוגו"
            )}
          </button>
        </div>

        {/* ── Logos grid ── */}
        <h2 className="mb-5 text-lg font-black text-white">
          לוגואים קיימים{" "}
          <span className="text-sm font-normal text-white/30">({logos.length})</span>
        </h2>

        {logos.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/3 py-16 text-center">
            <p className="text-sm text-white/30">אין לוגואים עדיין — העלה את הראשון!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all hover:border-white/20"
              >
                {/* Logo image */}
                <div className="relative flex h-20 w-full items-center justify-center">
                  <Image
                    src={logo.image_url}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain"
                  />
                </div>

                {/* Name */}
                <p className="text-center text-xs font-semibold text-white/60 transition-colors group-hover:text-white/80">
                  {logo.name}
                </p>

                {/* Delete overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
                  <button
                    onClick={() => deleteLogo(logo)}
                    disabled={deletingId === logo.id}
                    className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/20 px-4 py-2 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/40 disabled:opacity-50"
                  >
                    {deletingId === logo.id ? (
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
      </main>
    </div>
  );
}
