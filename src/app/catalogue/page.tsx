import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";
import { ArrowRight, Download, Globe, Mail, Phone } from "lucide-react";
import Photo from "@/components/Photo";
import PatchArt from "@/components/PatchArt";
import { LogoMark } from "@/components/Logo";
import JsonLd from "@/components/JsonLd";
import Sheet, { SheetTitle, Spec } from "@/components/catalogue/Sheet";
import PrintButton from "@/components/catalogue/PrintButton";
import { processSteps } from "@/components/sections";
import { activeProducts, backings, getProduct, shapes, type Product } from "@/lib/catalog";
import { media, type Photo as PhotoT } from "@/lib/media";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Product Catalogue 2026 – Custom Patches (PDF Download)",
  description:
    "Download the Activon Embroidery product catalogue: embroidered, sublimation and woven patches, iron-on, sew-on and Velcro backing, customization options, ordering process and contact details.",
  path: "/catalogue/",
  keywords: ["custom patch catalogue", "patch catalog pdf", "embroidered patches catalogue", "wholesale patch catalogue", "custom patch price list request"],
});

const PDF_PATH = "/catalogue/activon-embroidery-catalogue-2026.pdf";
const TOTAL = 7;
const domain = site.url.replace(/^https?:\/\//, "");

async function qr(text: string) {
  return QRCode.toString(text, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#101010", light: "#00000000" } });
}

function ContactLine({ big = false }: { big?: boolean }) {
  const cls = big ? "text-lg sm:text-xl" : "text-[13px]";
  return (
    <ul className={`grid gap-3 ${cls}`}>
      <li className="flex items-center gap-3">
        <Mail className="h-4 w-4 shrink-0 text-brand" />
        <a href={`mailto:${site.email}`} className="break-all text-white hover:text-brand">{site.email}</a>
      </li>
      <li className="flex items-center gap-3">
        <Phone className="h-4 w-4 shrink-0 text-brand" />
        <a href={whatsappLink()} className="text-white hover:text-brand">{site.whatsappDisplay}</a>
        <span className="text-xs text-silver-500">Phone &amp; WhatsApp</span>
      </li>
      <li className="flex items-center gap-3">
        <Globe className="h-4 w-4 shrink-0 text-brand" />
        <a href={site.url} className="text-white hover:text-brand">{domain}</a>
      </li>
    </ul>
  );
}

function ProductSheet({ p, num, page, photos }: { p: Product; num: string; page: number; photos?: PhotoT[] }) {
  const backingNames = backings.filter((b) => p.backings.includes(b.key)).map((b) => b.name);
  return (
    <Sheet page={page} total={TOTAL} label={p.name}>
      <div className="px-8 pt-10 sm:px-12 sm:pt-12">
        <SheetTitle num={num} eyebrow="Product category" title={p.name} />
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-silver-200">{p.lead}</p>
      </div>

      <div className="mt-6 grid h-[240px] grid-cols-3 grid-rows-2 gap-2 px-8 sm:h-[280px] sm:px-12">
        {photos
          ? photos.slice(0, 3).map((ph, i) => (
              <Photo key={ph.src} photo={ph} priority className={`h-full rounded-md ${i === 0 ? "col-span-2 row-span-2" : ""}`} sizes="300px" />
            ))
          : (["circle", "shield", "rounded"] as const).map((sh, i) => (
              <div key={sh} className={`grid h-full min-h-0 place-items-center rounded-md bg-ink-800 p-3 ${i === 0 ? "col-span-2 row-span-2 p-6" : ""}`}>
                <PatchArt type={p.key} shape={sh} palette={p.art.palette} title="ACTIVON" subtitle={p.name.split(" ")[0].toUpperCase()} className="h-full max-h-full w-auto" ariaLabel={`Illustration of a ${sh} ${p.singular.toLowerCase()}`} />
              </div>
            ))}
      </div>
      {!photos && <p className="mt-2 px-8 text-[10px] uppercase tracking-wider text-silver-500 sm:px-12">Design illustrations</p>}

      <div className="mt-6 grid gap-x-8 gap-y-5 px-8 pb-6 sm:grid-cols-2 sm:px-12">
        <p className="text-[12.5px] leading-relaxed text-silver-300 sm:col-span-2">{p.intro[0]}</p>
        <Spec title="Customization" items={p.design.map((d) => d.title)} />
        <Spec title="Border / edge finish" items={p.borders} />
        <Spec title="Backing options" items={backingNames} />
        <Spec title="Applications" items={p.applications.slice(0, 6)} />
      </div>
      <div className="mx-8 mb-6 mt-auto flex flex-wrap items-center justify-between gap-3 rounded-md border border-brand/30 bg-brand/[0.06] px-5 py-4 sm:mx-12">
        <p className="text-[12.5px] text-silver-200">
          Wholesale, bulk &amp; private-label orders · Quote: <span className="text-white">{site.email}</span> · <span className="text-white">{site.whatsappDisplay}</span>
        </p>
        <span className="text-[10px] uppercase tracking-[0.25em] text-brand">{domain}/{p.slug}</span>
      </div>
    </Sheet>
  );
}

export default async function Catalogue() {
  const [qrWhatsApp, qrSite] = await Promise.all([qr(whatsappLink("Hello Activon Embroidery, I saw your catalogue and would like a quote.")), qr(`${site.url}/get-a-quote/`)]);
  const emb = getProduct("embroidered");

  return (
    <div className="bg-ink-900 pb-24 pt-28 print:bg-ink print:p-0">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Catalogue", path: "/catalogue/" }])} />

      {/* Screen-only toolbar */}
      <div className="container mb-10 print:hidden">
        <div className="mx-auto flex max-w-[794px] flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Catalogue</p>
            <h1 className="h-display mt-3 text-4xl text-white sm:text-5xl">Product Catalogue 2026</h1>
            <p className="mt-3 max-w-md text-sm text-silver-300">All patch types, backing and customization options in one document. Read it here or download the PDF to share with your team.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={PDF_PATH} download className="btn-primary">
              <Download className="h-4 w-4" /> Download PDF
            </a>
            <PrintButton />
          </div>
        </div>
      </div>

      <div className="container grid gap-10 print:block print:max-w-none print:p-0">
        {/* 1 · Cover */}
        <Sheet page={1} total={TOTAL} label="Cover" footer={false} className="isolate">
          <Photo photo={media.production.lineAlt} priority className="!absolute inset-0 -z-20" sizes="794px" position="50% 40%" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
          <div className="flex flex-1 flex-col px-8 py-10 sm:px-14 sm:py-14">
            <div className="flex items-center gap-3">
              <LogoMark className="h-12 w-12" />
              <span className="leading-none">
                <span className="block font-display text-2xl font-semibold uppercase tracking-[0.12em] text-white">Activon</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.42em] text-brand">Embroidery</span>
              </span>
            </div>
            <div className="mt-auto pt-40">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand">Product Catalogue · 2026 Edition</p>
              <h2 className="h-display mt-4 text-5xl text-white sm:text-6xl">
                Custom Patch Manufacturing
                <span className="block text-brand">for Brands Worldwide</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-silver-200">
                Embroidered, sublimation and woven patches with iron-on, sew-on or Velcro backing. Wholesale, OEM &amp; private label.
              </p>
              <div className="mt-10 border-t border-brand/40 pt-6">
                <ContactLine />
              </div>
              <p className="mt-6 font-display text-lg uppercase tracking-[0.2em] text-silver-300">{site.tagline}</p>
            </div>
          </div>
        </Sheet>

        {/* 2 · Company */}
        <Sheet page={2} total={TOTAL} label="Company overview">
          <div className="px-8 pt-10 sm:px-12 sm:pt-12">
            <SheetTitle eyebrow="About us" title="Your custom patch manufacturing partner" />
            <div className="mt-6 grid gap-6 sm:grid-cols-5">
              <div className="space-y-3 text-[13px] leading-relaxed text-silver-200 sm:col-span-3">
                <p>Activon Embroidery specializes in custom patch manufacturing for brands, businesses, sports teams, clubs, clothing manufacturers, wholesalers and promotional companies.</p>
                <p>We offer embroidered, sublimation and woven patches with customizable designs, sizes, shapes, colours, borders and backing options.</p>
                <p>We support wholesale orders, bulk production, OEM and private-label requirements for customers worldwide.</p>
              </div>
              <Photo photo={media.production.head} priority className="aspect-square rounded-md sm:col-span-2" sizes="300px" position="50% 60%" />
            </div>
          </div>
          <div className="mx-8 mt-6 grid grid-cols-2 border-y border-white/10 sm:mx-12 sm:grid-cols-4">
            {[["3", "Patch types"], ["3", "Backing options"], ["OEM", "Private label"], ["Global", "Worldwide shipping"]].map(([n, l], i) => (
              <div key={l} className={`py-4 ${i ? "sm:border-l sm:border-white/10 sm:pl-5" : ""}`}>
                <p className="font-display text-4xl text-white">{n}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-brand">{l}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-x-8 gap-y-5 px-8 py-6 sm:grid-cols-2 sm:px-12">
            <Spec title="Our products" items={activeProducts.map((p) => p.name)} />
            <Spec title="Backing options (all products)" items={backings.map((b) => b.name)} />
            <Spec title="Services" items={["Custom patch manufacturing", "Artwork preparation & digital proof", "OEM & private label", "Wholesale & bulk production", "Quality inspection & packing", "International shipping"]} />
            <Spec title="Who we serve" items={["Clothing & fashion brands", "Uniform & workwear suppliers", "Sports teams & clubs", "Promotional product companies", "Wholesale distributors", "E-commerce businesses"]} />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-2 px-8 pb-6 sm:px-12">
            {[media.production.line, media.detail.starLaurel, media.bulk.three].map((ph) => (
              <Photo key={ph.src} photo={ph} priority className="aspect-[16/9] rounded-md" sizes="260px" />
            ))}
          </div>
        </Sheet>

        {/* 3–5 · Products */}
        <ProductSheet p={emb} num="01" page={3} photos={[media.detail.starLaurel, media.detail.rays, media.detail.merrowed]} />
        <ProductSheet p={getProduct("sublimation")} num="02" page={4} />
        <ProductSheet p={getProduct("woven")} num="03" page={5} />

        {/* 6 · Customization */}
        <Sheet page={6} total={TOTAL} label="Customization options">
          <div className="px-8 pt-10 sm:px-12 sm:pt-12">
            <SheetTitle eyebrow="Customization" title="Options for every order" />
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-silver-300">Every patch type can be customized. Backing is a selectable option on all three categories – not a separate product.</p>
          </div>

          <div className="px-8 pt-7 sm:px-12">
            <h3 className="border-b border-white/10 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand">Shapes</h3>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {shapes.map((s) => (
                <div key={s.key} className="text-center">
                  <div className="rounded-md bg-ink-800 p-3">
                    <PatchArt type="embroidered" shape={s.key} palette={emb.art.palette} title="AE" subtitle="" className="w-full" ariaLabel={`${s.name} patch shape`} />
                  </div>
                  <p className="mt-2 text-[10.5px] text-silver-300">{s.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 pt-8 sm:px-12">
            <h3 className="border-b border-white/10 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand">Backing options</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {backings.map((b) => (
                <div key={b.key} className="rounded-md border border-white/10 bg-ink-800 p-4">
                  <p className="text-[13px] font-semibold text-white">{b.name}</p>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-silver-300">{b.short}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 pt-8 sm:px-12">
            <h3 className="border-b border-white/10 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand">At a glance</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-[12px]">
                <thead>
                  <tr className="text-silver-500">
                    <th scope="col" className="py-2 pr-3 font-medium"> </th>
                    {activeProducts.map((p) => <th key={p.key} scope="col" className="py-2 pr-3 font-semibold text-white">{p.name}</th>)}
                  </tr>
                </thead>
                <tbody className="text-silver-200">
                  {[
                    ["Finish", "Raised, textured stitching", "Flat, full-colour print", "Flat, fine woven detail"],
                    ["Best for", "Bold logos & badges", "Gradients & photos", "Small text & fine lines"],
                    ["Borders", emb.borders.join(", "), getProduct("sublimation").borders.join(", "), getProduct("woven").borders.join(", ")],
                    ["Backing", "Iron-on · Sew-on · Velcro", "Iron-on · Sew-on · Velcro", "Iron-on · Sew-on · Velcro"],
                  ].map(([k, ...v]) => (
                    <tr key={k} className="border-t border-white/10 align-top">
                      <th scope="row" className="py-2.5 pr-3 font-medium text-brand">{k}</th>
                      {v.map((c, i) => <td key={i} className="py-2.5 pr-3">{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-6 px-8 py-8 sm:grid-cols-2 sm:px-12">
            <Spec title="Sizes" items={["Any width × height you need", "Specify in inches, cm or mm", "Custom die-cut outlines available"]} />
            <Spec title="Artwork we accept" items={["JPG, JPEG, PNG", "PDF", "AI, EPS, SVG (vector preferred)", "Sketches & reference photos"]} />
          </div>
        </Sheet>

        {/* 7 · Order & contact */}
        <Sheet page={7} total={TOTAL} label="How to order and contact">
          <div className="px-8 pt-10 sm:px-12 sm:pt-12">
            <SheetTitle eyebrow="How to order" title="From your design to your door" />
          </div>
          <ol className="grid gap-x-8 gap-y-3 px-8 pt-7 sm:grid-cols-2 sm:px-12">
            {processSteps.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-sm bg-brand font-display text-sm text-ink">{i + 1}</span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">{s.title}</span>
                  <span className="block text-[11.5px] leading-snug text-silver-300">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="px-8 pt-8 sm:px-12">
            <Spec title="Include in your inquiry" items={["Your logo or design file", "Patch type (embroidered, sublimation or woven)", "Width × height and shape", "Quantity", "Backing: iron-on, sew-on or Velcro", "Delivery country"]} />
          </div>

          <div className="mt-auto bg-ink-800 px-8 py-10 sm:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand">Contact us for a quotation</p>
            <div className="mt-5 grid items-center gap-8 sm:grid-cols-[1fr_auto]">
              <ContactLine big />
              <div className="flex gap-5">
                {[
                  { svg: qrWhatsApp, label: "WhatsApp us" },
                  { svg: qrSite, label: "Get a quote online" },
                ].map((q) => (
                  <figure key={q.label} className="text-center">
                    <div className="h-28 w-28 rounded-md bg-silver-100 p-2.5 [&_svg]:h-full [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: q.svg }} />
                    <figcaption className="mt-2 text-[10px] uppercase tracking-[0.15em] text-silver-300">{q.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <LogoMark className="h-9 w-9" />
              <p className="font-display text-lg uppercase tracking-[0.18em] text-white">
                {site.name} <span className="text-brand">· {site.tagline}</span>
              </p>
            </div>
          </div>
        </Sheet>
      </div>

      <div className="container mt-12 text-center print:hidden">
        <Link href="/get-a-quote/" className="btn-primary">
          Request a Quote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
