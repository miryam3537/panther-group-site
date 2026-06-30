import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, phone, email, service, message, _honeypot } = body;

  // Block bots
  if (_honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Basic validation
  if (!name || !phone) {
    return NextResponse.json(
      { error: "שם וטלפון הם שדות חובה" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("leads").insert({
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: email ? String(email).trim() : null,
    message: [service ? `שירות: ${service}` : null, message]
      .filter(Boolean)
      .join("\n") || null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "שגיאה בשמירה" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
