import type { ReactNode } from "react";
import { Globe, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

/** One A4 catalogue page. Responsive on screen, exactly 210 × 297 mm when printed. */
export default function Sheet({
  children,
  page,
  total,
  className = "",
  footer = true,
  label,
}: {
  children: ReactNode;
  page: number;
  total: number;
  className?: string;
  footer?: boolean;
  label: string;
}) {
  return (
    <section aria-label={`Catalogue page ${page}: ${label}`} className={`cat-sheet relative mx-auto flex w-full max-w-[794px] flex-col overflow-hidden bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:min-h-[1123px] ${className}`}>
      <div className="flex flex-1 flex-col">{children}</div>
      {footer && (
        <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-brand/30 px-8 py-4 text-[10.5px] text-silver-300 sm:px-12">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-brand">{site.name}</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3 text-brand" />{site.email}</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3 text-brand" />{site.whatsappDisplay}</span>
            <span className="hidden items-center gap-1.5 sm:inline-flex"><Globe className="h-3 w-3 text-brand" />{site.url.replace(/^https?:\/\//, "")}</span>
          </span>
          <span className="tabular-nums text-silver-500">
            {String(page).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </footer>
      )}
    </section>
  );
}

export function SheetTitle({ num, eyebrow, title }: { num?: string; eyebrow: string; title: string }) {
  return (
    <div className="flex items-end gap-5">
      {num && <span className="font-display text-6xl leading-none text-brand/90">{num}</span>}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand">{eyebrow}</p>
        <h2 className="h-display mt-1 text-[2.1rem] text-white sm:text-[2.6rem]">{title}</h2>
      </div>
    </div>
  );
}

export function Spec({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="border-b border-white/10 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand">{title}</h3>
      <ul className="mt-3 grid gap-1.5 text-[12.5px] leading-snug text-silver-200">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-brand" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
