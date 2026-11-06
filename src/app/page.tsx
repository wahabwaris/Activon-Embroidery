import type { Metadata } from "next";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileCheck, MessageSquare, Package, Plane, ScanLine, ShieldCheck } from "lucide-react";
import Hero from "@/components/Hero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { BackingOptions, CheckList, CtaBanner, Marquee, ProcessSteps, ProductCards, Testimonials, WhyChoose } from "@/components/sections";
import { pageMetadata, faqJsonLd } from "@/lib/seo";
import { seoKeywords } from "@/lib/catalog";
import { media, slides } from "@/lib/media";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Custom Patch Manufacturer | Embroidered, Sublimation & Woven Patches",
    description:
      "Activon Embroidery is a custom patch manufacturer and exporter for brands worldwide. Wholesale embroidered, sublimation and woven patches with iron-on, sew-on or Velcro backing. OEM & private label. Get a quote.",
    path: "/",
    keywords: [...seoKeywords.shortTail, ...seoKeywords.longTail.slice(0, 6)],
  }),
  title: { absolute: "Custom Patch Manufacturer & Exporter | Embroidered, Sublimation & Woven Patches | Activon Embroidery" },
};

const homeFaqs = [
  { q: "What types of custom patches does Activon Embroidery manufacture?", a: "We manufacture three main patch types: embroidered patches, sublimation patches and woven patches. Each can be customized in shape, size, colours, border and backing." },
  { q: "Are iron-on, sew-on and Velcro patches separate products?", a: "No. Iron-on, sew-on and Velcro (hook-and-loop) are backing options you can choose for any of our three patch types – embroidered, sublimation or woven – subject to technical compatibility." },
  { q: "Do you accept wholesale, bulk and OEM / private-label orders?", a: "Yes. Activon Embroidery focuses on wholesale and bulk production for brands, clothing manufacturers, uniform suppliers, teams, clubs, promotional companies and distributors, including OEM and private-label projects." },
  { q: "Do you ship custom patches internationally?", a: "Yes. We work with customers worldwide and ship orders internationally. The shipping method and cost are confirmed with your quotation." },
  { q: "How do I get a quote for custom patches?", a: "Use our Get a Quote form to share your design, patch type, size, quantity and backing preference. Our team will review it and reply by email or WhatsApp." },
];

const exportSteps = [
  { icon: MessageSquare, t: "Clear communication", d: "Direct contact by email and WhatsApp throughout your order." },
  { icon: FileCheck, t: "Approved artwork proof", d: "Nothing goes into production before you approve the proof." },
  { icon: Package, t: "Export-ready packing", d: "Patches counted and packed to your requirements." },
  { icon: Plane, t: "International delivery", d: "Shipping method and cost agreed in your quotation." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero />

      {/* About */}
      <section id="about" className="section relative overflow-hidden">
        <div className="container grid items-center gap-14 lg:grid-cols-12">
          <div className="relative order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <div className="relative mx-auto max-w-lg pb-16 pr-10 sm:pr-24">
                <PhotoSlideshow photos={slides.production} className="aspect-[4/5] rounded-xl" sizes="(max-width:1024px) 90vw, 40vw" position="50% 60%" />
                <div className="absolute bottom-0 right-0 w-1/2 overflow-hidden rounded-xl border-4 border-ink shadow-2xl">
                  <PhotoSlideshow photos={slides.details} start={2} className="aspect-square" sizes="25vw" />
                </div>
                <div className="absolute -left-3 top-8 rounded-lg border border-white/10 bg-ink/90 px-5 py-4 shadow-xl backdrop-blur sm:-left-6">
                  <p className="font-display text-3xl text-white">3 + 3</p>
                  <p className="text-[11px] uppercase tracking-wider text-silver-300">Patch types · Backings</p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6">
            <SectionHeading eyebrow="About Activon Embroidery" title="Your trusted custom patch manufacturing partner" />
            <Reveal delay={0.15}>
              <div className="prose-a mt-6">
                <p>
                  Activon Embroidery specializes in custom patch manufacturing for brands, businesses, sports teams, clubs, clothing manufacturers, wholesalers, and promotional companies.
                </p>
                <p>
                  We offer <Link className="text-white underline decoration-brand underline-offset-4" href="/embroidered-patches/">embroidered</Link>,{" "}
                  <Link className="text-white underline decoration-brand underline-offset-4" href="/sublimation-patches/">sublimation</Link>, and{" "}
                  <Link className="text-white underline decoration-brand underline-offset-4" href="/woven-patches/">woven patches</Link> with customizable designs, sizes, shapes, colours, borders, and backing options.
                </p>
                <p>We support wholesale orders, bulk production, OEM, and private-label requirements for customers worldwide.</p>
              </div>
              <Link href="/about-us/" className="btn-ghost mt-4">
                Learn More About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={["Custom Embroidered Patches", "Sublimation Patches", "Woven Patches", "Iron-On Backing", "Sew-On Backing", "Velcro Backing", "Wholesale", "OEM & Private Label", "Worldwide Shipping"]} />

      {/* Products */}
      <section className="section relative bg-ink-900">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Our Products" title="Our main product categories" text="Three patch manufacturing methods – each fully customizable and available with iron-on, sew-on or Velcro backing." />
            <Reveal>
              <div className="flex flex-wrap gap-3">
                <Link href="/catalogue/" className="btn-ghost">View catalogue</Link>
                <Link href="/products/" className="btn-ghost">All products</Link>
              </div>
            </Reveal>
          </div>
          <div className="mt-14">
            <ProductCards />
          </div>
        </div>
      </section>

      {/* Production */}
      <section className="section relative overflow-hidden">
        <div className="container grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Production"
              title="Built on multi-head embroidery production"
              text="Your patches are produced on multi-head embroidery machines that stitch many pieces at once – the setup that makes consistent bulk and repeat orders possible."
            />
            <Reveal delay={0.15}>
              <div className="mt-8">
                <CheckList cols={1} items={["Artwork digitized and proofed before production", "Multi-head machines for bulk volumes", "Consistent colours across repeat orders", "Quality inspection before packing"]} />
              </div>
              <Link href="/custom-patch-manufacturing/" className="btn-ghost mt-9">
                How we manufacture <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <Reveal className="row-span-2">
              <PhotoSlideshow photos={slides.line} className="h-full min-h-[420px] rounded-xl" sizes="(max-width:1024px) 50vw, 30vw" caption="Production line" />
            </Reveal>
            <Reveal delay={0.1}>
              <PhotoSlideshow photos={slides.machines} start={1} className="aspect-square rounded-xl" sizes="(max-width:1024px) 50vw, 30vw" position="50% 35%" caption="Needle bars & tensioners" />
            </Reveal>
            <Reveal delay={0.2}>
              <PhotoSlideshow photos={slides.details} start={1} className="aspect-square rounded-xl" sizes="(max-width:1024px) 50vw, 30vw" caption="Finished stitch detail" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Backing */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading
            eyebrow="Backing Options"
            title="Choose your preferred patch backing"
            text="Customize your embroidered, sublimation, or woven patches with the backing option that best suits your application."
            center
          />
          <div className="mt-14">
            <BackingOptions />
          </div>
          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-silver-500">
              Backings are selectable features – not separate product categories. Choose a backing on any of our three patch types, subject to technical compatibility.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Industries – light */}
      <section className="section section-light">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading light eyebrow="Industries" title="Patches for every industry we serve" text="From fashion labels to uniform suppliers – we match the patch type and backing to how your patches will be used." />
            <Reveal>
              <Link href="/industries/" className="btn border border-ink/20 text-ink hover:bg-ink hover:text-white">
                All industries <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <StaggerItem key={ind.name} className="group bg-[#f4f4f2] p-7 transition-colors duration-500 hover:bg-white">
                <ind.icon className="h-7 w-7 text-brand-700 transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="mt-5 font-semibold text-ink">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-700">{ind.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why choose */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Why Activon" title="Why choose Activon Embroidery?" />
          <div className="mt-14">
            <WhyChoose />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="How It Works" title="Your design. Your requirements. Our craft." text="A clear, seven-step process from your artwork to patches delivered at your door." />
          <div className="mt-16">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Global / export */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Photo photo={media.bulk.three} className="!absolute inset-0 -z-20" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-ink/85" />
        <div className="container grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Global Presence" title="Manufactured for buyers worldwide" text="We work with international customers remotely – from first inquiry to delivery – with clear communication and export-ready packing." />
            <Reveal delay={0.15}>
              <Link href="/global-presence/" className="btn-primary mt-9">
                Ordering from abroad <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {exportSteps.map((s) => (
              <StaggerItem key={s.t}>
                <div className="h-full rounded-xl border border-white/10 bg-ink/60 p-7 backdrop-blur-md">
                  <s.icon className="h-7 w-7 text-brand-400" />
                  <h3 className="mt-5 font-semibold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-300">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* OEM */}
      <section className="section">
        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="OEM & Private Label" title="OEM & private label patch manufacturing" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-silver-300">
                Looking for a reliable custom patch manufacturing partner for your brand or business? Activon Embroidery supports OEM and private-label requirements, including custom designs, branding, bulk orders, and packaging requirements.
              </p>
              <div className="mt-8">
                <CheckList items={["Your brand, your design", "Bulk & repeat production", "Custom packaging requirements", "Clothing, uniform & promo brands"]} />
              </div>
              <Link href="/oem-private-label/" className="btn-primary mt-10">
                Discuss Your Project <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <div className="grid grid-cols-5 gap-4">
              <PhotoSlideshow photos={slides.bulk} className="col-span-5 aspect-[16/7] rounded-xl" sizes="(max-width:1024px) 90vw, 45vw" />
              <Photo photo={media.detail.stripes} className="col-span-2 aspect-square rounded-xl" sizes="20vw" />
              <Photo photo={media.detail.anchor} className="col-span-3 aspect-[3/2] rounded-xl" sizes="25vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Gallery" title="Product gallery" text="Production, stitching detail and finished bulk orders. Click any image to enlarge." />
            <Reveal>
              <Link href="/gallery/" className="btn-ghost">View full gallery</Link>
            </Reveal>
          </div>
          <div className="mt-12">
            <Gallery withFilters={false} limit={8} />
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Custom patch questions" text="Quick answers about our patch types, backing options, wholesale orders and worldwide shipping." />
            <Reveal delay={0.1}>
              <div className="mt-8 flex items-center gap-3 text-sm text-silver-300">
                <ScanLine className="h-5 w-5 text-brand-400" />
                <ShieldCheck className="h-5 w-5 text-brand-400" />
                Artwork proof before every production run.
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
