"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { LeadsTable } from "./LeadsTable";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  is_handled: boolean;
};

export function LeadsClient() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setLeads(data ?? []);
      }
      setLoading(false);
    }

    fetchLeads();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const pending = leads.filter((l) => !l.is_handled).length;
  const handled = leads.filter((l) => l.is_handled).length;

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* Top bar */}
      <header className="border-b border-white/8 bg-black/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-white/50 transition-colors hover:border-white/30 hover:text-white"
          >
            יציאה
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-accent">פנתר</span>
            <span className="text-xs text-white/30">|</span>
            <span className="text-sm font-medium text-white/60">ניהול פניות</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-sm text-red-400">
            שגיאה בטעינת הנתונים: {error}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <StatCard label="סה״כ פניות" value={leads.length} color="white" />
              <StatCard label="לא טופלו" value={pending} color="accent" />
              <StatCard label="טופלו" value={handled} color="green" />
            </div>

            <LeadsTable initialLeads={leads} />
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "white" | "accent" | "green";
}) {
  const colorMap = {
    white: "text-white",
    accent: "text-accent",
    green: "text-emerald-400",
  };
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 px-6 py-5 text-right">
      <p className="text-xs text-white/40">{label}</p>
      <p className={`mt-1 text-3xl font-black ${colorMap[color]}`}>{value}</p>
    </div>
  );
}
