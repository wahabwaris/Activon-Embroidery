"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Photo } from "@/lib/media";

/** Time each photo stays on screen before the next one fades in. */
export const SLIDE_INTERVAL_MS = 1000;

/**
 * Cross-fading photo slideshow: shows one image, then the next after
 * `interval` ms, looping. Pauses when off-screen or when the visitor prefers
 * reduced motion. The parent controls the aspect ratio via `className`.
 */
export default function PhotoSlideshow({
  photos,
  interval = SLIDE_INTERVAL_MS,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  position = "center",
  caption,
  dots = true,
  start = 0,
}: {
  photos: Photo[];
  interval?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  caption?: string;
  dots?: boolean;
  /** Index of the first photo (offsets neighbouring slideshows). */
  start?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(start % Math.max(photos.length, 1));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduce || photos.length < 2) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), interval);
    return () => window.clearInterval(t);
  }, [visible, reduce, photos.length, interval]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-ink-700 ${className}`} role="group" aria-roledescription="slideshow" aria-label={caption || photos[index]?.alt}>
      {photos.map((ph, i) => {
        const active = i === index;
        return (
          <div
            key={ph.src}
            aria-hidden={!active}
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ opacity: active ? 1 : 0, zIndex: active ? 1 : 0 }}
          >
            <Image
              src={ph.src}
              alt={active ? ph.alt : ""}
              fill
              sizes={sizes}
              priority={priority && i === index}
              className="object-cover"
              style={{
                objectPosition: position,
                transform: active && !reduce ? "scale(1.06)" : "scale(1)",
                transition: `transform ${interval + 600}ms linear`,
              }}
            />
          </div>
        );
      })}
      {caption && (
        <p className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-ink/90 to-transparent px-5 pb-4 pt-12 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          {caption}
        </p>
      )}
      {dots && photos.length > 1 && (
        <div className="absolute right-4 top-4 z-[2] flex gap-1.5" aria-hidden>
          {photos.map((ph, i) => (
            <span key={ph.src} className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-5 bg-brand" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
