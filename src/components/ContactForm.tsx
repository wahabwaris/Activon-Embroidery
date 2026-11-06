"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const er: Record<string, string> = {};
    if (!String(fd.get("name")).trim()) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(fd.get("email")))) er.email = "Please enter a valid email.";
    if (String(fd.get("message")).trim().length < 5) er.message = "Please write a short message.";
    setErrors(er);
    if (Object.keys(er).length) return;
    fd.set("elapsed", String(Date.now() - startedAt.current));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact/", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.message || "Something went wrong.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMsg((err as Error).message);
    }
  }

  if (status === "done")
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-400" />
        <h3 className="h-display mt-5 text-3xl text-white">Message sent</h3>
        <p className="mt-3 text-silver-300">Thank you! We&apos;ve emailed you a confirmation and will reply soon.</p>
      </motion.div>
    );

  const err = (k: string) => errors[k] && <p className="mt-1.5 text-xs text-brand-400" role="alert">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="card relative grid gap-5 p-6 sm:grid-cols-2 md:p-8">
      <div className="absolute -left-[9999px]" aria-hidden>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="c-name" className="label">Name <span className="text-brand-400">*</span></label>
        <input id="c-name" name="name" className="field" autoComplete="name" />
        {err("name")}
      </div>
      <div>
        <label htmlFor="c-email" className="label">Email <span className="text-brand-400">*</span></label>
        <input id="c-email" name="email" type="email" className="field" autoComplete="email" />
        {err("email")}
      </div>
      <div>
        <label htmlFor="c-phone" className="label">WhatsApp / Phone</label>
        <input id="c-phone" name="phone" type="tel" className="field" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="c-subject" className="label">Subject</label>
        <input id="c-subject" name="subject" className="field" placeholder="Wholesale, OEM, general question…" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="label">Message <span className="text-brand-400">*</span></label>
        <textarea id="c-message" name="message" rows={5} className="field resize-y" />
        {err("message")}
      </div>
      {status === "error" && <p className="text-sm text-brand-400 sm:col-span-2" role="alert">{msg}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto disabled:opacity-60">
          {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send Message"}
        </button>
      </div>
    </form>
  );
}
