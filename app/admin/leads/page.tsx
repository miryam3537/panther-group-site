import { createServerSupabaseClient } from "@/lib/supabase-server";
import { LeadsTable } from "./LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-red-400">שגיאה בטעינת הנתונים: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* Top bar */}
      <header className="border-b border-white/8 bg-black/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <LogoutButton />
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-accent">פנתר</span>
            <span className="text-xs text-white/30">|</span>
            <span className="text-sm font-medium text-white/60">ניהול פניות</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard
            label="סה״כ פניות"
            value={leads?.length ?? 0}
            color="white"
          />
          <StatCard
            label="לא טופלו"
            value={leads?.filter((l) => !l.is_handled).length ?? 0}
            color="accent"
          />
          <StatCard
            label="טופלו"
            value={leads?.filter((l) => l.is_handled).length ?? 0}
            color="green"
          />
        </div>

        <LeadsTable initialLeads={leads ?? []} />
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

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="POST">
      <button
        type="submit"
        className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-white/50 transition-colors hover:border-white/30 hover:text-white"
      >
        יציאה
      </button>
    </form>
  );
}
