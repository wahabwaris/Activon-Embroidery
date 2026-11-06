import { NextResponse } from "next/server";
import { ALLOWED_EXT, MAX_FILE_MB, backingOptions, productOptions, shapeOptions, validateQuote, type QuoteInput } from "@/lib/quote-schema";
import { saveInquiry, storeUpload } from "@/lib/store";
import { sendInquiryEmails } from "@/lib/mailer";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";

export const runtime = "nodejs";

const keys: (keyof QuoteInput)[] = ["fullName", "company", "email", "phone", "country", "product", "quantity", "width", "height", "unit", "shape", "backing", "border", "colours", "message"];

export async function POST(req: Request) {
  const ip = clientIp(req);
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  // Silently accept bot submissions without storing them.
  if (looksLikeBot(form)) return NextResponse.json({ ok: true, reference: "AE-RECEIVED" });
  if (rateLimited(ip)) return NextResponse.json({ message: "Too many requests. Please try again in a few minutes." }, { status: 429 });

  const data = Object.fromEntries(keys.map((k) => [k, String(form.get(k) || "").trim().slice(0, k === "message" ? 4000 : 300)])) as QuoteInput;
  const errors = validateQuote(data);
  if (Object.keys(errors).length) return NextResponse.json({ message: "Please check the highlighted fields.", errors }, { status: 422 });

  const design = form.get("design");
  let stored: Awaited<ReturnType<typeof storeUpload>> | undefined;
  if (design instanceof File && design.size > 0) {
    const ext = design.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXT.includes(ext)) return NextResponse.json({ message: "Unsupported file type.", errors: { file: "Unsupported file type." } }, { status: 422 });
    if (design.size > MAX_FILE_MB * 1024 * 1024) return NextResponse.json({ message: "File too large.", errors: { file: `Max ${MAX_FILE_MB} MB.` } }, { status: 422 });
    stored = await storeUpload(design);
  }

  const label = (opts: { value: string; label: string }[], v: string) => opts.find((o) => o.value === v)?.label || v;
  const readable: Record<string, string> = {
    "Full Name": data.fullName,
    "Company / Brand": data.company,
    Email: data.email,
    "WhatsApp / Phone": data.phone,
    Country: data.country,
    "Product Category": label(productOptions, data.product),
    Quantity: data.quantity,
    Size: `${data.width} × ${data.height} ${data.unit}`,
    Shape: label(shapeOptions, data.shape),
    Backing: label(backingOptions, data.backing),
    "Border / Edge": data.border,
    Colours: data.colours,
    "Additional Requirements": data.message,
    "Design File": stored?.originalName || "",
  };

  const saved = await saveInquiry({
    kind: "quote",
    fields: readable,
    ip,
    file: stored ? { storedName: stored.storedName, originalName: stored.originalName, size: stored.size, type: stored.type } : undefined,
  });

  try {
    await sendInquiryEmails({
      kind: "quote",
      reference: saved.reference,
      customerName: data.fullName,
      customerEmail: data.email,
      rows: Object.entries(readable),
      attachment: stored && stored.size < 10 * 1024 * 1024 ? { filename: stored.originalName, content: stored.buffer } : undefined,
    });
  } catch (err) {
    // Inquiry is already saved in the dashboard – don't fail the customer.
    console.error("[quote] email failed", err);
  }

  return NextResponse.json({ ok: true, reference: saved.reference });
}
