"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site, whatsappLink, whatsappMessage } from "@/lib/site";
import { WhatsAppIcon } from "./SocialIcons";

/**
 * Floating WhatsApp button. Clicking it opens a small chat preview that shows
 * the exact message (which says it comes from the Activon Embroidery website)
 * before the visitor continues to WhatsApp.
 */
export default function WhatsAppFloat() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const message = whatsappMessage(pathname);
  const href = whatsappLink(message);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!href) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 print:hidden sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Chat with Activon Embroidery on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(calc(100vw-2rem),340px)] origin-bottom-right overflow-hidden rounded-xl border border-white/10 bg-ink-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-ink ring-1 ring-brand/40">
                <Image src="/brand/activon-mark-512.png" alt="" width={40} height={40} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-white">{site.name}</span>
                <span className="block text-[11px] text-white/80">WhatsApp · {site.whatsappDisplay}</span>
              </span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 bg-[#0b141a] px-4 py-4">
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2 text-[13px] leading-snug text-white">
                Hello! 👋 Welcome to Activon Embroidery. Tap below and we&apos;ll reply on WhatsApp.
              </div>
              <div>
                <p className="mb-1 text-right text-[10px] uppercase tracking-wider text-white/50">Your message</p>
                <div className="ml-auto max-w-[92%] whitespace-pre-line rounded-lg rounded-tr-none bg-[#005c4b] px-3 py-2 text-[13px] leading-snug text-white">
                  {message}
                </div>
              </div>
              <p className="text-center text-[11px] text-white/50">This message tells us it comes from your visit to our website.</p>
            </div>

            <div className="bg-ink-800 p-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#0b141a] transition hover:bg-[#1fb757]"
              >
                <Send className="h-4 w-4" /> Continue to WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp chat" : "Chat with Activon Embroidery on WhatsApp"}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)]"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />}
        {open ? <X className="relative h-6 w-6" /> : <WhatsAppIcon className="relative h-7 w-7" />}
      </motion.button>
    </div>
  );
}
