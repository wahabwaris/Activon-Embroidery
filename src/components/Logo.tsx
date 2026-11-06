import Link from "next/link";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="lm-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f6f8" />
          <stop offset="0.5" stopColor="#8b9099" />
          <stop offset="1" stopColor="#d9dce1" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#151518" stroke="url(#lm-metal)" strokeWidth="3" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#e1251b" strokeWidth="1.6" strokeDasharray="2 2.4" />
      <path d="M20 44 L32 16 L44 44 M25 34 H39" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 50 Q32 40 50 50" fill="none" stroke="#e1251b" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Activon Embroidery – home">
      <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
      <span className="leading-none">
        <span className="block font-display text-xl uppercase tracking-wider text-white">Activon</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-silver">Embroidery</span>
      </span>
    </Link>
  );
}
