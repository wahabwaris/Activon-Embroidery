"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import PatchArt from "./PatchArt";
import { WordsReveal } from "./motion";

export default function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const x1 = useTransform(sx, (v) => v * 30);
  const y1 = useTransform(sy, (v) => v * 30);
  const x2 = useTransform(sx, (v) => v * -20);
  const y2 = useTransform(sy, (v) => v * -20);
  const x3 = useTransform(sx, (v) => v * 45);
  const y3 = useTransform(sy, (v) => v * 45);

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const float = (d: number, delay = 0) =>
    reduce ? {} : { animate: { y: [0, -16, 0], rotate: [-3, 3, -3] }, transition: { duration: d, delay, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <section onMouseMove={onMove} className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      {/* background */}
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <motion.div
        className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-brand/25 blur-[140px]"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-silver/10 blur-[120px]" />
      <div className="grain absolute inset-0" />

      <div className="container relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
            Activon Embroidery · Your Design. Our Craft.
          </motion.p>
          <h1 className="h-display mt-6 text-[2.75rem] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            <WordsReveal text="Custom Patch Manufacturing" />
            <span className="block">
              <WordsReveal text="for Brands" className="metal-text animate-shine" />{" "}
              <WordsReveal text="Worldwide" className="text-brand" />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-silver-300"
          >
            Custom embroidered, sublimation, and woven patches manufactured to bring your designs to life. Quality craftsmanship, flexible customization, and competitive wholesale pricing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="/get-a-quote/" className="btn-primary group">
              Request a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/products/" className="btn-ghost">
              Explore Our Products
            </Link>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              ["3", "Patch types"],
              ["3", "Backing options"],
              ["OEM", "& private label"],
            ].map(([n, l]) => (
              <li key={l}>
                <p className="font-display text-3xl text-white md:text-4xl">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-silver-500">{l}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* patch cluster */}
        <div className="relative mx-auto aspect-square w-full max-w-[540px] lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-[12%] rounded-full border border-dashed border-white/10" />
            <motion.div
              className="absolute inset-[4%] rounded-full border border-white/5"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
            </motion.div>
          </motion.div>

          <motion.div style={{ x: x1, y: y1 }} className="absolute left-[18%] top-[16%] w-[62%]">
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div {...float(7)}>
                <PatchArt type="embroidered" shape="circle" palette={["#e1251b", "#0d0d0f", "#f2f3f5"]} title="ACTIVON" className="w-full drop-shadow-2xl" ariaLabel="Custom embroidered patch example" />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div style={{ x: x2, y: y2 }} className="absolute -left-[2%] bottom-[4%] w-[40%]">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 1 }}>
              <motion.div {...float(8, 1)}>
                <PatchArt type="sublimation" shape="shield" palette={["#ff4a3d", "#7a0b06", "#ffd1cc"]} title="TEAM" subtitle="SUBLIMATION" className="w-full" ariaLabel="Custom sublimation patch example" />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div style={{ x: x3, y: y3 }} className="absolute -right-[2%] bottom-[10%] w-[38%]">
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1 }}>
              <motion.div {...float(6, 0.5)}>
                <PatchArt type="woven" shape="hexagon" palette={["#0d0d0f", "#a9adb5", "#e1251b"]} title="WOVEN" subtitle="FINE DETAIL" className="w-full" ariaLabel="Custom woven patch example" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-silver-500 md:block"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
