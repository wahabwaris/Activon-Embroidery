import Link from "next/link";

/**
 * Activon mark: a globe orbited by a running stitch that ends in a needle –
 * custom embroidery, delivered worldwide.
 */
export function LogoMark({ className = "h-10 w-10", mono = false }: { className?: string; mono?: boolean }) {
  const globe = mono ? "currentColor" : "#c9ccd2";
  const stitch = mono ? "currentColor" : "#e1251b";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <circle cx="30" cy="34" r="22" stroke={globe} strokeWidth="2.6" />
      <ellipse cx="30" cy="34" rx="9.5" ry="22" stroke={globe} strokeWidth="1.6" opacity="0.7" />
      <path d="M8.6 27h42.8M8.6 41h42.8" stroke={globe} strokeWidth="1.6" opacity="0.7" />
      <path d="M4 50c9 9 33 9 45-6 6-7 8.5-17 8.5-26" stroke={stitch} strokeWidth="3" strokeLinecap="round" strokeDasharray="4.2 3.4" />
      <path d="M57.5 18 61 4" stroke={stitch} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="60.4" cy="7.4" rx="1" ry="2.1" transform="rotate(14 60.4 7.4)" fill={mono ? "#0d0d0f" : "#0d0d0f"} />
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Activon Embroidery – home">
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-700 group-hover:rotate-[-12deg]" />
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-white">Activon</span>
          <span className="mt-0.5 block text-[9.5px] font-semibold uppercase tracking-[0.42em] text-silver">Embroidery</span>
        </span>
      )}
    </Link>
  );
}
