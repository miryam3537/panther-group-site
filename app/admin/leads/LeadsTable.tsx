"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  is_handled: boolean;
};

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<"all" | "pending" | "handled">("all");
  const [toggling, setToggling] = useState<string | null>(null);

  const filtered = leads.filter((l) => {
    if (filter === "pending") return !l.is_handled;
    if (filter === "handled") return l.is_handled;
    return true;
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

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-5 flex gap-2">
        {(["all", "pending", "handled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              filter === f
                ? "bg-accent text-white"
                : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
            }`}
          >
            {f === "all" ? "הכל" : f === "pending" ? "ממתינות" : "טופלו"}
          </button>
        ))}
        <span className="mr-auto text-xs text-white/30 self-center">
          {filtered.length} פניות
        </span>
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
                <th className="px-5 py-3 font-medium">הודעה</th>
                <th className="px-5 py-3 font-medium">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
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
                  <td className="max-w-xs px-5 py-4 text-white/60">
                    <p className="line-clamp-2">{lead.message ?? "—"}</p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
