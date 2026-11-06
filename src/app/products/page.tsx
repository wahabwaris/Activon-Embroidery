import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import { BackingOptions, CtaBanner, ProductCards } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { activeProducts } from "@/lib/catalog";

export const metadata: Metadata = pageMetadata({
  title: "Custom Patches – Embroidered, Sublimation & Woven",
  description:
    "Explore Activon Embroidery's three custom patch types – embroidered, sublimation and woven – each available with iron-on, sew-on or Velcro backing for wholesale and OEM orders.",
  path: "/products/",
  keywords: ["custom patches", "types of custom patches", "embroidered vs woven patches", "sublimation vs embroidered patches", "wholesale custom patches"],
});

const compare = [
  ["Look & feel", "Raised, textured stitching", "Flat, smooth, printed", "Flat, thin, fine woven texture"],
  ["Best for", "Bold logos & classic badges", "Gradients, photos, many colours", "Fine detail & small lettering"],
  ["Colours", "Thread colours", "Unlimited full colour", "Thread colours"],
  ["Border options", "Merrowed, hot-cut", "Merrowed, hot-cut", "Merrowed, hot-cut, folded"],
  ["Backing", "Iron-on · Sew-on · Velcro", "Iron-on · Sew-on · Velcro", "Iron-on · Sew-on · Velcro"],
];

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Custom patches for every brand"
        lead="Three main patch manufacturing methods. One flexible set of customization options – shape, size, colours, border and backing."
        crumbs={[{ name: "Products", path: "/products/" }]}
      />
      <section className="pb-20">
        <div className="container">
          <ProductCards headingLevel="h2" />
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="Compare" title="Which patch type is right for you?" />
          <Reveal>
            <div className="mt-10 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-ink-800">
                  <tr>
                    <th className="p-5 text-silver-500" scope="col"><span className="sr-only">Feature</span></th>
                    {activeProducts.map((p) => (
                      <th key={p.key} scope="col" className="p-5">
                        <Link href={`/${p.slug}/`} className="font-display text-lg uppercase text-white hover:text-brand-400">{p.name}</Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compare.map(([k, ...v]) => (
                    <tr key={k} className="border-t border-white/10">
                      <th scope="row" className="p-5 font-semibold text-silver-300">{k}</th>
                      {v.map((c, i) => (
                        <td key={i} className="p-5 text-silver-200">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Backing Options" title="Available on every patch type" text="Iron-on, sew-on and Velcro are backing options – not separate products. Select one for any embroidered, sublimation or woven patch." />
          <div className="mt-12">
            <BackingOptions detailed />
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
