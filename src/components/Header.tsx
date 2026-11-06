"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href.replace(/\/$/, "")));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 print:hidden transition-all duration-500 ${
        open ? "bg-ink py-2.5" : scrolled ? "border-b border-brand/20 bg-ink/95 py-1.5 backdrop-blur-xl" : "border-b border-white/[0.06] bg-ink py-2"
      }`}
    >
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 top-0 h-[2px] origin-left bg-brand" />
      <div className="container flex items-center justify-between gap-6">
        <Logo className={`w-auto transition-all duration-500 ${scrolled && !open ? "h-12 lg:h-14" : "h-14 lg:h-[76px]"}`} />

        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              item.children ? (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMenu(item.href)}
                  onMouseLeave={() => setMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition ${
                      isActive(item.href) || item.children.some((c) => isActive(c.href)) ? "text-white" : "text-silver-300 hover:text-white"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={menu === item.href}
                    onFocus={() => setMenu(item.href)}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition ${menu === item.href ? "rotate-180" : ""}`} />
                  </Link>
                  <AnimatePresence>
                    {menu === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                      >
                        <ul className="card overflow-hidden p-2 shadow-2xl">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className="group flex items-center justify-between rounded-lg px-4 py-3 text-sm text-silver-200 transition hover:bg-white/5 hover:text-white"
                              >
                                {c.label}
                                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100 text-brand-400" />
                              </Link>
                            </li>
                          ))}
                          {item.href === "/products/" && (
                            <li className="mt-1 border-t border-white/10 px-4 py-3 text-[11px] uppercase tracking-wider text-silver-500">
                              Iron-on · Sew-on · Velcro backing on every type
                            </li>
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative rounded-full px-3 py-2 text-[13px] font-medium transition ${
                      isActive(item.href) ? "text-brand" : "text-silver-100/85 hover:text-brand"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />
                    )}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/get-a-quote/" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Get a Quote
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-0 -z-10 overflow-y-auto bg-ink px-6 pb-10 pt-24 xl:hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link href={item.href} className="block border-b border-white/10 py-4 font-display text-3xl uppercase text-white">
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="grid gap-1 py-3 pl-2">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block py-1.5 text-silver-300 hover:text-white">
                              — {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <Link href="/get-a-quote/" className="btn-primary mt-8 w-full">
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
