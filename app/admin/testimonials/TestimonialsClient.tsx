"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { Testimonial } from "@/lib/testimonials";

type Draft = {
  name: string;
  role: string;
  body: string;
  rating: number;
};

const emptyDraft: Draft = { name: "", role: "", body: "", rating: 5 };

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30";

export function TestimonialsClient({
  initialItems,
  loadError,
}: {
  initialItems: Testimonial[];
  loadError: string | null;
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(loadError);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  function startEdit(item: Testimonial) {
    setEditingId(item.id);
    setDraft({
      name: item.name,
      role: item.role ?? "",
      body: item.body,
      rating: item.rating,
    });
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(emptyDraft);
  }

  async function save() {
    const name = draft.name.trim();
    const body = draft.body.trim();
    if (!name || !body) {
      setError("שם וטקסט ההמלצה הם שדות חובה");
      return;
    }

    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = {
      name,
      role: draft.role.trim() || null,
      body,
      rating: draft.rating,
    };

    if (editingId) {
      const { error: updateError } = await supabase
        .from("testimonials")
        .update(payload)
        .eq("id", editingId);
      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }
      setItems((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...payload } : item)),
      );
      cancelEdit();
      showSuccess("ההמלצה עודכנה");
    } else {
      const nextOrder = items.reduce((max, item) => Math.max(max, item.display_order), 0) + 1;
      const { data, error: insertError } = await supabase
        .from("testimonials")
        .insert({ ...payload, display_order: nextOrder })
        .select("id, name, role, body, rating, display_order")
        .single();
      if (insertError || !data) {
        setError(insertError?.message ?? "השמירה נכשלה");
        setSaving(false);
        return;
      }
      setItems((prev) => [...prev, data]);
      setDraft(emptyDraft);
      showSuccess("ההמלצה נוספה");
    }

    setSaving(false);
  }

  async function remove(item: Testimonial) {
    if (!window.confirm(`למחוק את ההמלצה של ${item.name}?`)) return;
    setBusyId(item.id);
    setError(null);
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("testimonials").delete().eq("id", item.id);
    if (deleteError) {
      setError(deleteError.message);
    } else {
      setItems((prev) => prev.filter((row) => row.id !== item.id));
      if (editingId === item.id) cancelEdit();
      showSuccess("ההמלצה נמחקה");
    }
    setBusyId(null);
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const current = items[index];
    const other = items[target];
    setBusyId(current.id);
    setError(null);
    const supabase = createClient();
    const [first, second] = await Promise.all([
      supabase.from("testimonials").update({ display_order: other.display_order }).eq("id", current.id),
      supabase.from("testimonials").update({ display_order: current.display_order }).eq("id", other.id),
    ]);
    if (first.error || second.error) {
      setError(first.error?.message ?? second.error?.message ?? "שינוי הסדר נכשל");
    } else {
      const next = [...items];
      next[index] = { ...other, display_order: current.display_order };
      next[target] = { ...current, display_order: other.display_order };
      setItems(next);
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
            <span className="text-sm font-medium text-white/60">ניהול המלצות</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {loadError && error === loadError
              ? "טבלת ההמלצות עדיין לא קיימת. הריצי ב-SQL Editor את הקובץ supabase/testimonials.sql, ואז רענני את הדף."
              : error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
            {successMsg}
          </div>
        )}

        <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="mb-6 text-lg font-black text-white">
            {editingId ? "עריכת המלצה" : "המלצה חדשה"}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/50">שם</span>
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="שם הלקוח או הארגון"
                className={fieldClass}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/50">תפקיד</span>
              <input
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                placeholder="לא חובה"
                className={fieldClass}
              />
            </label>
          </div>
          <label className="mt-5 block">
            <span className="mb-2 block text-xs font-semibold text-white/50">טקסט ההמלצה</span>
            <textarea
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              rows={4}
              className={fieldClass}
            />
          </label>
          <div className="mt-5">
            <span className="mb-2 block text-xs font-semibold text-white/50">דירוג</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setDraft({ ...draft, rating: star })}
                  className={`text-2xl ${star <= draft.rating ? "text-accent" : "text-white/20"}`}
                  aria-label={`${star} כוכבים`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-accent/20 transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "שומר..." : editingId ? "שמירת שינויים" : "הוספת המלצה"}
            </button>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="rounded-xl border border-white/10 px-5 py-3.5 text-sm text-white/60 hover:text-white"
              >
                ביטול
              </button>
            )}
          </div>
        </div>

        <h2 className="mb-5 text-lg font-black text-white">
          המלצות באתר{" "}
          <span className="text-sm font-normal text-white/30">({items.length})</span>
        </h2>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/3 py-16 text-center">
            <p className="text-sm text-white/30">אין המלצות עדיין</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item, index) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 text-right">
                    <p className="text-accent">{"★".repeat(item.rating)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
                    <p className="mt-3 text-sm font-bold">{item.name}</p>
                    {item.role && <p className="text-xs text-white/40">{item.role}</p>}
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <button
                      onClick={() => move(index, -1)}
                      disabled={index === 0 || busyId === item.id}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/50 disabled:opacity-30"
                    >
                      למעלה
                    </button>
                    <button
                      onClick={() => move(index, 1)}
                      disabled={index === items.length - 1 || busyId === item.id}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/50 disabled:opacity-30"
                    >
                      למטה
                    </button>
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:text-white"
                    >
                      עריכה
                    </button>
                    <button
                      onClick={() => remove(item)}
                      disabled={busyId === item.id}
                      className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 disabled:opacity-40"
                    >
                      מחיקה
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
