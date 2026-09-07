import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  // Verify admin is logged in
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { to, subject, body } = await req.json();

  if (!to || !subject || !body) {
    return NextResponse.json({ error: "חסרים שדות" }, { status: 400 });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const fromName = process.env.RESEND_FROM_NAME ?? "PANTER";

  const { error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: [to],
    subject,
    text: body,
    html: `<div dir="rtl" style="font-family:sans-serif;line-height:1.7;white-space:pre-wrap;">${body.replace(/\n/g, "<br/>")}</div>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "שליחת המייל נכשלה" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
