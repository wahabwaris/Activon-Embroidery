import nodemailer from "nodemailer";
import { site } from "./site";

function transport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 465);
  return nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function table(rows: [string, string][]) {
  return `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee;color:#666;white-space:nowrap"><b>${esc(k)}</b></td><td style="border-bottom:1px solid #eee">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
}

function shell(title: string, body: string) {
  return `<div style="background:#f5f5f3;padding:24px"><div style="max-width:620px;margin:auto;background:#fff;border-radius:12px;overflow:hidden">
<div style="background:#101010;padding:20px 24px;border-bottom:4px solid #d4af72"><span style="color:#fff;font:700 20px Arial;letter-spacing:2px">ACTIVON EMBROIDERY</span><br><span style="color:#c5c5c5;font:12px Arial">${esc(site.tagline)}</span></div>
<div style="padding:24px;font-family:Arial,sans-serif;color:#222"><h2 style="margin-top:0">${esc(title)}</h2>${body}</div></div></div>`;
}

export async function sendInquiryEmails(opts: {
  kind: "quote" | "contact";
  reference: string;
  customerName: string;
  customerEmail: string;
  rows: [string, string][];
  attachment?: { filename: string; content: Buffer };
}) {
  const t = transport();
  if (!t) {
    console.warn("[mailer] SMTP not configured – inquiry saved to dashboard only.");
    return { sent: false };
  }
  const to = process.env.INQUIRY_TO || site.email;
  const from = `"${site.name}" <${process.env.SMTP_USER}>`;
  const label = opts.kind === "quote" ? "quotation request" : "message";

  await t.sendMail({
    from,
    to,
    replyTo: opts.customerEmail,
    subject: `New ${label} ${opts.reference} – ${opts.customerName}`,
    html: shell(`New ${label} – ${opts.reference}`, table(opts.rows)),
    attachments: opts.attachment ? [opts.attachment] : undefined,
  });

  await t.sendMail({
    from,
    to: opts.customerEmail,
    replyTo: to,
    subject: `We received your ${label} – ${opts.reference} | ${site.name}`,
    html: shell(
      `Thank you, ${opts.customerName}!`,
      `<p>We have received your ${label} and our team will get back to you shortly${opts.kind === "quote" ? " with a quotation and artwork guidance" : ""}.</p>
<p>Your reference number is <b>${esc(opts.reference)}</b>.</p>${table(opts.rows)}
<p style="margin-top:24px">Questions? Simply reply to this email or write to <a href="mailto:${site.email}">${site.email}</a>.</p>
<p>— ${site.name}</p>`
    ),
  });
  return { sent: true };
}
