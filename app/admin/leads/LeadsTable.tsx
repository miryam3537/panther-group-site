"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { services } from "@/lib/site";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  is_handled: boolean;
};

type StatusFilter = "all" | "pending" | "handled";
type ServiceFilter = "all" | string;

function exportToCsv(leads: Lead[]) {
  const headers = ["תאריך", "שם", "טלפון", "אימייל", "שירות", "הודעה", "סטטוס"];

  const rows = leads.map((l) => {
    const svc = parseService(l.message);
    const msg = stripServiceLine(l.message);
    return [
      new Date(l.created_at).toLocaleString("he-IL"),
      l.name,
      l.phone ?? "",
      l.email ?? "",
      svc ? (SERVICE_LABELS[svc] ?? svc) : "",
      msg ?? "",
      l.is_handled ? "טופל" : "ממתין",
    ];
  });

  const csvContent =
    "\uFEFF" +
    [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `פניות-פנתר-${new Date().toLocaleDateString("he-IL").replace(/\//g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  services.map((s) => [s.id, s.title])
);

function parseService(message: string | null): string | null {
  if (!message) return null;
  const match = message.match(/^שירות:\s*(\S+)/);
  return match ? match[1] : null;
}

function stripServiceLine(message: string | null): string | null {
  if (!message) return null;
  return message.replace(/^שירות:\s*\S+\n?/, "").trim() || null;
}

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>("all");
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = leads.filter((l) => {
    const statusOk =
      statusFilter === "all" ||
      (statusFilter === "pending" && !l.is_handled) ||
      (statusFilter === "handled" && l.is_handled);

    const parsedService = parseService(l.message);
    const serviceOk =
      serviceFilter === "all" ||
      (serviceFilter === "none" && !parsedService) ||
      parsedService === serviceFilter;

    return statusOk && serviceOk;
  });

  async function toggleHandled(lead: Lead) {
    setToggling(lead.id);
    const supabase = createClient();
    const { error } = await supabase
      .from("leads")
      .update({ is_handled: !lead.is_handled })
      .eq("id", lead.id);

    if (!error) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id ? { ...l, is_handled: !l.is_handled } : l,
        ),
      );
    }
    setToggling(null);
  }

  async function deleteLead(lead: Lead) {
    if (!window.confirm(`למחוק את הפנייה של ${lead.name}? לא ניתן לבטל.`)) {
      return;
    }
    setDeleting(lead.id);
    const supabase = createClient();
    const { error } = await supabase.from("leads").delete().eq("id", lead.id);
    if (!error) {
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    } else {
      alert("מחיקה נכשלה. ייתכן שחסרה הרשאת מחיקה ב-Supabase.");
    }
    setDeleting(null);
  }

  const usedServices = [...new Set(leads.map((l) => parseService(l.message)).filter(Boolean))];

  return (
    <div>
      {/* Row 1 — Status filter */}
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="self-center text-xs text-white/30 ml-1">סטטוס:</span>
        {(["all", "pending", "handled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              statusFilter === f
                ? "bg-accent text-white"
                : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
            }`}
          >
            {f === "all" ? "הכל" : f === "pending" ? "ממתינות" : "טופלו"}
          </button>
        ))}
        <span className="mr-auto self-center text-xs text-white/30">
          {filtered.length} פניות
        </span>
        <button
          onClick={() => exportToCsv(filtered)}
          disabled={filtered.length === 0}
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/50 transition-all hover:border-emerald-500/40 hover:text-emerald-400 disabled:pointer-events-none disabled:opacity-30"
          title="ייצוא לקובץ CSV (נפתח ב-Google Sheets)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          ייצוא לגוגל שיטס
        </button>
      </div>

      {/* Row 2 — Service category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="self-center text-xs text-white/30 ml-1">שירות:</span>
        <button
          onClick={() => setServiceFilter("all")}
          className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
            serviceFilter === "all"
              ? "bg-white/15 text-white"
              : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
          }`}
        >
          הכל
        </button>
        {usedServices.map((svc) => (
          <button
            key={svc}
            onClick={() => setServiceFilter(svc!)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              serviceFilter === svc
                ? "bg-white/15 text-white"
                : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
            }`}
          >
            {SERVICE_LABELS[svc!] ?? svc}
          </button>
        ))}
        {leads.some((l) => !parseService(l.message)) && (
          <button
            onClick={() => setServiceFilter("none")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              serviceFilter === "none"
                ? "bg-white/15 text-white"
                : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
            }`}
          >
            ללא שירות
          </button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-white/4 py-16 text-center text-sm text-white/30">
          אין פניות להצגה
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/4 text-xs text-white/40">
                <th className="px-5 py-3 font-medium">תאריך</th>
                <th className="px-5 py-3 font-medium">שם</th>
                <th className="px-5 py-3 font-medium">טלפון</th>
                <th className="px-5 py-3 font-medium">אימייל</th>
                <th className="px-5 py-3 font-medium">שירות</th>
                <th className="px-5 py-3 font-medium">הודעה</th>
                <th className="px-5 py-3 font-medium">סטטוס</th>
                <th className="px-5 py-3 font-medium">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => {
                const svc = parseService(lead.message);
                const msg = stripServiceLine(lead.message);
                return (
                  <tr
                    key={lead.id}
                    className={`border-b border-white/5 transition-colors hover:bg-white/3 ${
                      i % 2 === 0 ? "" : "bg-white/[0.02]"
                    } ${lead.is_handled ? "opacity-50" : ""}`}
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-white/40">
                      {new Date(lead.created_at).toLocaleDateString("he-IL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-4 font-medium text-white">
                      {lead.name}
                    </td>
                    <td className="px-5 py-4 text-white/70" dir="ltr">
                      {lead.phone ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-white/70" dir="ltr">
                      {lead.email ?? "—"}
                    </td>
                    <td className="px-5 py-4">
                      {svc ? (
                        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent whitespace-nowrap">
                          {SERVICE_LABELS[svc] ?? svc}
                        </span>
                      ) : (
                        <span className="text-xs text-white/25">—</span>
                      )}
                    </td>
                    <td className="max-w-xs px-5 py-4 text-white/60">
                      <p className="line-clamp-2">{msg ?? "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleHandled(lead)}
                        disabled={toggling === lead.id}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50 ${
                          lead.is_handled
                            ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                            : "bg-accent/15 text-accent hover:bg-accent/25"
                        }`}
                      >
                        {toggling === lead.id
                          ? "..."
                          : lead.is_handled
                            ? "✓ טופל"
                            : "סמן טופל"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => deleteLead(lead)}
                        disabled={deleting === lead.id}
                        className="rounded-full border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/15 active:scale-95 disabled:opacity-50"
                        title="מחק פנייה"
                      >
                        {deleting === lead.id ? "..." : "מחק"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
