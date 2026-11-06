"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Globe, Layers, PackageCheck, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WordsReveal } from "./motion";
import { media } from "@/lib/media";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) {
      v.pause();
      setPlaying(false);
      return;
    }
    const show = () => setPlaying(true);
    v.addEventListener("playing", show);
    // The video may already be playing before hydration attaches listeners.
    if (!v.paused && v.readyState >= 3) show();
    // Autoplay can be refused (low-power mode, some in-app browsers) – the poster image stays as fallback.
    else v.play().catch(() => setPlaying(false));
    return () => v.removeEventListener("playing", show);
  }, [reduce]);

  return (
    <section ref={sectionRef} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink pb-14 pt-32 md:items-center md:pb-20">
      {/* Background video + fallback poster */}
      <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { y: videoY }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.heroPoster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={media.heroPoster}
          aria-hidden
        >
          <source src={media.heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      {/* Readability overlays */}
      <div className="absolute inset-0 -z-10 bg-ink/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink to-transparent" />

      <motion.div className="container relative" style={reduce ? undefined : { y: contentY, opacity: fade }}>
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-1.5 pl-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-silver-200 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Custom patch manufacturer · Wholesale · OEM · Export
          </motion.p>

          <h1 className="h-display mt-6 text-[2.6rem] text-white sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
            <WordsReveal text="Custom Patch Manufacturing" />
            <span className="block">
              <WordsReveal text="for Brands" />{" "}
              <WordsReveal text="Worldwide" className="text-brand" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-silver-200 sm:text-lg"
          >
            Custom embroidered, sublimation, and woven patches manufactured to bring your designs to life. Quality craftsmanship, flexible customization, and competitive wholesale pricing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/get-a-quote/" className="btn-primary group">
              Request a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/products/" className="btn border border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white hover:text-ink">
              Explore Our Products
            </Link>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease }}
          className="mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-ink/40 backdrop-blur-md lg:grid-cols-4"
        >
          {[
            { icon: Layers, t: "3 patch types", d: "Embroidered · Sublimation · Woven" },
            { icon: Tag, t: "3 backing options", d: "Iron-on · Sew-on · Velcro" },
            { icon: PackageCheck, t: "Wholesale & OEM", d: "Bulk & private-label orders" },
            { icon: Globe, t: "Worldwide shipping", d: "Serving international buyers" },
          ].map((s, i) => (
            <li key={s.t} className={`flex items-start gap-3 p-4 sm:p-5 ${i % 2 ? "border-l border-white/10" : ""} ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
              <s.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <span>
                <span className="block text-sm font-semibold text-white">{s.t}</span>
                <span className="mt-0.5 block text-xs text-silver-300">{s.d}</span>
              </span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <a href="#about" aria-label="Scroll to content" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-silver-300 transition hover:text-white lg:block">
        <motion.span className="block" animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </a>
    </section>
  );
}
