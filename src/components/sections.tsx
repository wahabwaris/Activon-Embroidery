import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Boxes,
  Check,
  Factory,
  FileCheck,
  Flame,
  Globe,
  Grip,
  Headphones,
  Layers,
  Package,
  Palette,
  Ruler,
  Scissors,
  Shapes,
  ShieldCheck,
  Tag,
  Upload,
} from "lucide-react";
import PatchArt from "./PatchArt";
import SectionHeading from "./SectionHeading";
import { Reveal, Stagger, StaggerItem, Tilt } from "./motion";
import { activeProducts, backings, type BackingKey } from "@/lib/catalog";
import { testimonials } from "@/lib/testimonials";
import { site } from "@/lib/site";

/* ---------- Product category cards ---------- */
export function ProductCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const shapesFor = { embroidered: "circle", sublimation: "shield", woven: "rounded" } as const;
  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {activeProducts.map((p, i) => (
        <StaggerItem key={p.slug}>
          <Tilt className="h-full">
            <Link
              href={`/${p.slug}/`}
              className="group card relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-500 hover:border-brand/50"
            >
              <span className="absolute right-6 top-6 font-display text-6xl text-white/5">0{i + 1}</span>
              <div className="relative mx-auto aspect-square w-full max-w-[260px]">
                <div className="absolute inset-8 rounded-full bg-brand/0 blur-3xl transition duration-700 group-hover:bg-brand/30" />
                <PatchArt
                  type={p.key}
                  shape={shapesFor[p.key]}
                  palette={p.art.palette}
                  title="ACTIVON"
                  subtitle={p.name.split(" ")[0].toUpperCase()}
                  className="relative h-full w-full transition-transform duration-700 group-hover:rotate-[-6deg] group-hover:scale-105"
                  ariaLabel={`Example of custom ${p.name.toLowerCase()}`}
                />
              </div>
              <H className="mt-6 font-display text-2xl uppercase text-white">{p.name}</H>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-silver-300">{p.cardText}</p>
              <p className="mt-4 text-[11px] uppercase tracking-wider text-silver-500">Iron-On · Sew-On · Velcro backing</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-400">
                Explore {p.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </span>
            </Link>
          </Tilt>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------- Backing options ---------- */
const backingIcon: Record<BackingKey, typeof Flame> = { "iron-on": Flame, "sew-on": Scissors, velcro: Grip };

export function BackingOptions({ detailed = false, productName }: { detailed?: boolean; productName?: string }) {
  return (
    <Stagger className="grid gap-5 md:grid-cols-3">
      {backings.map((b) => {
        const Icon = backingIcon[b.key];
        return (
          <StaggerItem key={b.key}>
            <div className="card group relative h-full overflow-hidden p-7 transition hover:-translate-y-1 hover:border-white/25">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand-400 ring-1 ring-brand/30">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {productName ? `${b.name.replace(" Backing", "")} ${productName}` : b.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-300">{detailed ? b.detail : b.short}</p>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/* ---------- Why choose us ---------- */
const reasons = [
  { icon: Palette, title: "Custom Design Solutions", text: "Your logo or artwork turned into a production-ready patch design with a proof before production." },
  { icon: Layers, title: "Three Patch Manufacturing Options", text: "Embroidered, sublimation and woven – choose the method that suits your artwork." },
  { icon: Tag, title: "Multiple Backing Options", text: "Iron-on, sew-on and Velcro backing available across all three patch types." },
  { icon: BadgeDollarSign, title: "Competitive Wholesale Pricing", text: "Volume-based pricing for wholesalers, distributors and brands." },
  { icon: Boxes, title: "Bulk Order Support", text: "Production planning for bulk and repeat orders." },
  { icon: Factory, title: "OEM & Private Label Services", text: "Patches produced under your brand with your packaging requirements." },
  { icon: Globe, title: "Worldwide Shipping", text: "We serve international customers and ship orders worldwide." },
  { icon: Headphones, title: "Customer-Focused Support", text: "Direct communication by email and WhatsApp from inquiry to delivery." },
];

export function WhyChoose() {
  return (
    <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {reasons.map((r) => (
        <StaggerItem key={r.title} className="group bg-ink-800 p-7 transition-colors duration-500 hover:bg-ink-700">
          <r.icon className="h-7 w-7 text-brand-400 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
          <h3 className="mt-5 font-semibold text-white">{r.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-silver-500">{r.text}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------- Customization process ---------- */
export const processSteps = [
  { icon: Upload, title: "Share Your Design", text: "Send your logo, sketch or artwork in JPG, PNG, PDF, AI, EPS or SVG." },
  { icon: Layers, title: "Select Patch Type", text: "Embroidered, sublimation or woven – we advise on the best fit." },
  { icon: Ruler, title: "Choose Size, Shape & Backing", text: "Dimensions, outline, border and iron-on, sew-on or Velcro backing." },
  { icon: FileCheck, title: "Review Quotation & Artwork", text: "Receive your quotation and digital artwork proof for approval." },
  { icon: Factory, title: "Production", text: "Your patches are produced to the approved specification." },
  { icon: ShieldCheck, title: "Quality Inspection", text: "Patches are checked for colour, stitching, edges and backing." },
  { icon: Package, title: "Packaging & Shipping", text: "Packed to your requirements and shipped to your address." },
];

export function ProcessSteps() {
  return (
    <div className="relative">
    <div aria-hidden className="stitch-line absolute left-0 right-0 top-8 hidden h-[2px] opacity-40 lg:block" />
    <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-7 lg:gap-3">
      {processSteps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.08} className="relative">
          <div className="card h-full p-5 lg:bg-transparent lg:border-0 lg:p-0 lg:backdrop-blur-0">
            <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-ink-800 text-brand-400 shadow-lg">
              <s.icon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-brand text-[11px] font-bold text-white">{i + 1}</span>
            </div>
            <h3 className="mt-5 font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-silver-500">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
    </div>
  );
}

/* ---------- CTA banner ---------- */
export function CtaBanner({
  title = "Ready to create your custom patches?",
  text = "Share your design and requirements with us. Our team will help you find the right patch type and customization options for your project.",
  primary = { label: "Get a Quote", href: "/get-a-quote/" },
  secondary = { label: "Contact Us", href: "/contact-us/" },
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-16 text-center sm:px-12 md:py-24">
            <div className="grid-lines absolute inset-0 opacity-60" />
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-ink/40 blur-3xl" />
            <div className="relative">
              <h2 className="h-display mx-auto max-w-4xl text-4xl text-white md:text-6xl">{title}</h2>
              <p className="mx-auto mt-6 max-w-2xl text-white/85 md:text-lg">{text}</p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link href={primary.href} className="btn bg-white text-ink hover:bg-ink hover:text-white">
                  {primary.label} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={secondary.href} className="btn border border-white/50 text-white hover:bg-white/10">
                  {secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Testimonials (genuine only) ---------- */
export function Testimonials() {
  return (
    <section className="section border-t border-white/10">
      <div className="container">
        <SectionHeading eyebrow="Customer Feedback" title="What our clients say" center />
        {testimonials.length ? (
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="card h-full p-7">
                  <blockquote className="text-silver-200">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold text-white">{t.name}</span>
                    {t.company && <span className="text-silver-500"> — {t.company}</span>}
                    {t.country && <span className="block text-xs text-silver-500">{t.country}</span>}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal>
            <div className="card mx-auto mt-12 max-w-2xl p-8 text-center">
              <p className="text-silver-300">
                We publish only genuine feedback shared by our customers with their permission. Worked with us? We&apos;d love to hear about your order.
              </p>
              <a href={`mailto:${site.email}?subject=Customer%20feedback`} className="btn-ghost mt-6">
                Share your feedback
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- Simple check list ---------- */
export function CheckList({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 | 3 }) {
  const c = cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul className={`grid gap-3 ${c}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-silver-200">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-400">
            <Check className="h-3 w-3" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Keyword marquee ---------- */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink-800 py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl uppercase tracking-wider text-silver-500">
            {t}
            <Shapes className="h-4 w-4 text-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Hashtags ---------- */
export function Hashtags({ tags, title = "Popular tags" }: { tags: string[]; title?: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-silver-500">{title}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-silver-300">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
