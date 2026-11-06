import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "./PageHero";
import PatchArt from "./PatchArt";
import Photo from "./Photo";
import { media } from "@/lib/media";
import SectionHeading from "./SectionHeading";
import QuoteForm from "./QuoteForm";
import Faq from "./Faq";
import JsonLd from "./JsonLd";
import { Float, Reveal, Stagger, StaggerItem } from "./motion";
import { BackingOptions, CheckList, CtaBanner, Hashtags } from "./sections";
import { activeProducts, getProduct, shapes, type ProductKey } from "@/lib/catalog";
import { faqJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export default function ProductPage({ productKey }: { productKey: ProductKey }) {
  const p = getProduct(productKey);
  const path = `/${p.slug}/`;
  const others = activeProducts.filter((o) => o.key !== p.key);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Custom ${p.name}`,
    serviceType: `Custom ${p.name} Manufacturing`,
    description: p.metaDescription,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    audience: { "@type": "BusinessAudience", audienceType: "Brands, wholesalers, uniform suppliers, teams and promotional companies" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${p.name} backing options`,
      itemListElement: ["Iron-On", "Sew-On", "Velcro"].map((b) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: `${b} ${p.singular}`, category: p.name },
      })),
    },
  };

  return (
    <>
      <JsonLd data={[serviceLd, faqJsonLd(p.faqs)]} />
      <PageHero
        eyebrow={`Products · ${p.name}`}
        title={p.h1}
        lead={p.lead}
        crumbs={[
          { name: "Products", path: "/products/" },
          { name: p.name, path },
        ]}
        aside={
          p.photo ? (
            <Reveal>
              <div className="relative mx-auto max-w-md pb-10 pl-10">
                <Photo photo={media.production.head} className="aspect-[4/5] rounded-xl" sizes="(max-width:1024px) 90vw, 35vw" priority position="50% 60%" />
                <div className="absolute bottom-0 left-0 w-1/2 overflow-hidden rounded-xl border-4 border-ink shadow-2xl">
                  <Photo photo={p.photo} className="aspect-square" sizes="20vw" />
                </div>
              </div>
            </Reveal>
          ) : (
          <Float parallax={40} className="mx-auto w-full max-w-[420px]">
            <PatchArt type={p.key} shape={p.key === "woven" ? "rounded" : p.key === "sublimation" ? "shield" : "circle"} palette={p.art.palette} subtitle={p.name.split(" ")[0].toUpperCase()} className="w-full" ariaLabel={`Illustration of a custom ${p.singular.toLowerCase()}`} />
          </Float>
          )
        }
      >
        <a href="#customize" className="btn-primary">
          Request a Quote for {p.name} <ArrowRight className="h-4 w-4" />
        </a>
        <Link href="/gallery/" className="btn-ghost">See examples</Link>
      </PageHero>

      {/* Intro */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Introduction" title={`What are custom ${p.name.toLowerCase()}?`} />
          </div>
          <Reveal className="prose-a text-lg lg:col-span-7" delay={0.1}>
            {p.intro.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {p.key === "embroidered" && (
        <section className="pt-20 md:pt-28">
          <div className="container grid grid-cols-2 gap-4 md:grid-cols-4">
            {[media.detail.rays, media.detail.merrowed, media.detail.checker, media.detail.stripes].map((ph, i) => (
              <Reveal key={ph.src} delay={i * 0.08}>
                <Photo photo={ph} className="aspect-square rounded-xl" sizes="(max-width:768px) 50vw, 25vw" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Design customization */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Design Customization" title={`Customize your ${p.name.toLowerCase()}`} />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.design.map((d, i) => (
              <StaggerItem key={d.title}>
                <div className="card h-full p-7">
                  <span className="font-display text-3xl text-brand">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-300">{d.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Shapes */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="Shapes & Dimensions" title="Custom shapes and sizes" text={`${p.name} can be produced in standard shapes or a custom die-cut outline that follows your design. Share your preferred width and height in inches, centimetres or millimetres.`} />
          <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {shapes.map((s) => (
              <StaggerItem key={s.key}>
                <div className="group card flex flex-col items-center p-5 transition hover:border-brand/40">
                  <PatchArt type={p.key} shape={s.key} palette={p.art.palette} title={p.art.label} subtitle={s.name.toUpperCase()} className="w-full transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" ariaLabel={`${s.name} ${p.singular.toLowerCase()}`} />
                  <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wider text-silver-300">{s.name}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="card p-7">
                <h3 className="font-display text-xl uppercase text-white">Border / edge options</h3>
                <p className="mt-2 text-sm text-silver-500">Available for {p.name.toLowerCase()} – we confirm the best option for your shape.</p>
                <div className="mt-5">
                  <CheckList items={p.borders} cols={1} />
                </div>
              </div>
              <div className="card p-7">
                <h3 className="font-display text-xl uppercase text-white">Applications</h3>
                <div className="mt-5">
                  <CheckList items={p.applications} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Backing */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Backing Options"
            title={`Available backing for ${p.name.toLowerCase()}`}
            text={`Choose iron-on, sew-on or Velcro backing for your ${p.name.toLowerCase()}. Backing is a customization option, subject to the size and use of your patch.`}
          />
          <div className="mt-12">
            <BackingOptions detailed productName={p.name} />
          </div>
        </div>
      </section>

      {/* Wholesale & OEM */}
      <section className="section border-y border-white/10 bg-ink-900">
        <div className="container grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <p className="eyebrow">Wholesale</p>
              <h2 className="h-display mt-4 text-3xl text-white">Wholesale &amp; bulk {p.name.toLowerCase()}</h2>
              <p className="mt-4 leading-relaxed text-silver-300">
                We produce {p.name.toLowerCase()} in bulk for wholesalers, distributors, clothing manufacturers, teams and promotional companies, with pricing based on your quantity and specification.
              </p>
              <a href="#customize" className="btn-ghost mt-6">Get bulk pricing</a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-8">
              <p className="eyebrow">OEM / Private Label</p>
              <h2 className="h-display mt-4 text-3xl text-white">OEM &amp; private-label inquiries</h2>
              <p className="mt-4 leading-relaxed text-silver-300">
                Building your own brand? We manufacture private-label {p.name.toLowerCase()} to your design and packaging requirements.
              </p>
              <Link href="/oem-private-label/" className="btn-ghost mt-6">OEM &amp; private label</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Customization system */}
      <section id="customize" className="section scroll-mt-24">
        <div className="container">
          <SectionHeading
            eyebrow="Customize & Quote"
            title={`Request a quote for ${p.name.toLowerCase()}`}
            text="Specify your patch and upload your design. Patch type is preselected – change it any time."
          />
          <div className="mt-12">
            <QuoteForm defaultProduct={p.key} id={`quote-${p.key}`} />
          </div>
        </div>
      </section>

      {/* FAQ + tags */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title={`${p.name} FAQ`} />
            <div className="mt-10">
              <Hashtags tags={p.hashtags} />
            </div>
          </div>
          <div className="lg:col-span-8">
            <Faq items={p.faqs} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Explore More" title="Other patch types" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {others.map((o) => (
              <Reveal key={o.key}>
                <Link href={`/${o.slug}/`} className="group card flex items-center gap-6 p-6 transition hover:border-brand/40">
                  <PatchArt type={o.key} shape="circle" palette={o.art.palette} subtitle={o.name.split(" ")[0].toUpperCase()} className="h-24 w-24 shrink-0 transition-transform duration-500 group-hover:rotate-12" ariaLabel={o.name} />
                  <div>
                    <h3 className="font-display text-2xl uppercase text-white">{o.name}</h3>
                    <p className="mt-1 text-sm text-silver-300">{o.cardText}</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-brand-400 transition group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title={`Ready to order custom ${p.name.toLowerCase()}?`} primary={{ label: `Quote ${p.name}`, href: `/get-a-quote/?product=${p.key}` }} />
    </>
  );
}
