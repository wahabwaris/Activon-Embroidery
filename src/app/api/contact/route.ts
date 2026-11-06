import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/store";
import { sendInquiryEmails } from "@/lib/mailer";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  if (looksLikeBot(form)) return NextResponse.json({ ok: true });
  if (rateLimited(ip)) return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });

  const get = (k: string, max = 300) => String(form.get(k) || "").trim().slice(0, max);
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const subject = get("subject");
  const message = get("message", 4000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 5) errors.message = "Please write a short message.";
  if (Object.keys(errors).length) return NextResponse.json({ message: "Please check the highlighted fields.", errors }, { status: 422 });

  const fields = { Name: name, Email: email, "WhatsApp / Phone": phone, Subject: subject, Message: message };
  const saved = await saveInquiry({ kind: "contact", fields, ip });
  try {
    await sendInquiryEmails({ kind: "contact", reference: saved.reference, customerName: name, customerEmail: email, rows: Object.entries(fields) });
  } catch (err) {
    console.error("[contact] email failed", err);
  }
  return NextResponse.json({ ok: true, reference: saved.reference });
}
