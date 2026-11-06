"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import PatchArt from "./PatchArt";
import { galleryFilters, galleryItems, type GalleryFilter, type GalleryItem } from "@/lib/gallery";

function Visual({ item, className, large }: { item: GalleryItem; className?: string; large?: boolean }) {
  if (item.src) return <Image src={item.src} alt={item.alt} fill sizes={large ? "90vw" : "(max-width:768px) 50vw, 25vw"} className={large ? "object-contain" : "object-cover"} />;
  return item.art ? <PatchArt {...item.art} className={className} ariaLabel={item.alt} /> : null;
}

export default function Gallery({ withFilters = true, limit }: { withFilters?: boolean; limit?: number }) {
  const [filter, setFilter] = useState<GalleryFilter | "all">("all");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    const list = filter === "all" ? galleryItems : galleryItems.filter((i) => i.tags.includes(filter));
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit]);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const current = index !== null ? items[index] : null;

  return (
    <div>
      {withFilters && (
        <div className="mb-10 flex flex-wrap gap-2" role="toolbar" aria-label="Gallery filters">
          {galleryFilters.filter((f) => f.key === "all" || galleryItems.some((g) => g.tags.includes(f.key as GalleryFilter))).map((f, i) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`relative rounded-full border px-4 py-2 text-sm transition ${
                filter === f.key ? "border-brand text-white" : "border-white/10 text-silver-300 hover:border-white/30 hover:text-white"
              }`}
            >
              {filter === f.key && <motion.span layoutId="gal-pill" className="absolute inset-0 -z-10 rounded-full bg-brand/20" />}
              {f.label}
            </button>
          ))}
        </div>
      )}

      <motion.ul layout className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.li
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ink-700 to-ink-900 text-left"
                aria-label={`View larger: ${item.title}`}
              >
                <div className={`absolute inset-0 grid place-items-center transition-transform duration-700 group-hover:scale-110 ${item.src ? "" : "p-6 group-hover:rotate-[-4deg]"}`}>
                  <Visual item={item} className="h-full w-full" />
                </div>
                <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                </div>
                <Maximize2 className="absolute right-4 top-4 h-4 w-4 text-white opacity-0 transition group-hover:opacity-100" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/95 p-4 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <button type="button" onClick={close} aria-label="Close" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink">
              <X className="h-5 w-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink md:left-8">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink md:right-8">
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative mx-auto w-full ${current.src ? "h-[70vh]" : "aspect-square max-w-[min(70vh,560px)]"}`}>
                <Visual item={current} className="h-full w-full" large />
              </div>
              <figcaption className="mt-6 text-center">
                <p className="font-display text-2xl uppercase text-white">{current.title}</p>
                <p className="mt-1 text-sm text-silver-500">{current.alt}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
