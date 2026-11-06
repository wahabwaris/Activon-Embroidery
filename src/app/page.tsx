import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import PatchArt from "@/components/PatchArt";
import SectionHeading from "@/components/SectionHeading";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { Float, Reveal } from "@/components/motion";
import { BackingOptions, CheckList, CtaBanner, Marquee, ProcessSteps, ProductCards, Testimonials, WhyChoose } from "@/components/sections";
import { pageMetadata, faqJsonLd } from "@/lib/seo";
import { seoKeywords } from "@/lib/catalog";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Custom Patch Manufacturer | Embroidered, Sublimation & Woven Patches",
    description:
      "Activon Embroidery is a custom patch manufacturer for brands worldwide. Wholesale embroidered, sublimation and woven patches with iron-on, sew-on or Velcro backing. OEM & private label. Get a quote.",
    path: "/",
    keywords: [...seoKeywords.shortTail, ...seoKeywords.longTail.slice(0, 6)],
  }),
  title: { absolute: "Custom Patch Manufacturer | Embroidered, Sublimation & Woven Patches | Activon Embroidery" },
};

const homeFaqs = [
  { q: "What types of custom patches does Activon Embroidery manufacture?", a: "We manufacture three main patch types: embroidered patches, sublimation patches and woven patches. Each can be customized in shape, size, colours, border and backing." },
  { q: "Are iron-on, sew-on and Velcro patches separate products?", a: "No. Iron-on, sew-on and Velcro (hook-and-loop) are backing options you can choose for any of our three patch types – embroidered, sublimation or woven – subject to technical compatibility." },
  { q: "Do you accept wholesale, bulk and OEM / private-label orders?", a: "Yes. Activon Embroidery focuses on wholesale and bulk production for brands, clothing manufacturers, uniform suppliers, teams, clubs, promotional companies and distributors, including OEM and private-label projects." },
  { q: "Do you ship custom patches internationally?", a: "Yes. We work with customers worldwide and ship orders internationally. Shipping options and costs are included with your quotation." },
  { q: "How do I get a quote for custom patches?", a: "Use our Get a Quote form to share your design, patch type, size, quantity and backing preference. Our team will review it and reply by email or WhatsApp." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero />
      <Marquee items={["Custom Embroidered Patches", "Sublimation Patches", "Woven Patches", "Iron-On Backing", "Sew-On Backing", "Velcro Backing", "Wholesale", "OEM & Private Label", "Worldwide Shipping"]} />

      {/* 2 – About */}
      <section id="about" className="section relative overflow-hidden">
        <div className="container grid items-center gap-16 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-gradient-to-br from-ink-700 to-ink-900" />
              <div className="stitch-line absolute inset-x-10 top-10 h-[2px] opacity-50" />
              <div className="stitch-line absolute inset-x-10 bottom-10 h-[2px] opacity-50" />
              <Float className="absolute inset-[14%]" parallax={30}>
                <PatchArt type="embroidered" shape="shield" palette={["#e1251b", "#151518", "#f2f3f5"]} title="CRAFT" className="w-full" ariaLabel="Custom embroidered shield patch" />
              </Float>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="About Activon Embroidery"
              title="Your trusted custom patch manufacturing partner"
            />
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

      {/* 3 – Products */}
      <section className="section relative border-t border-white/10 bg-ink-900">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Our Products" title="Our main product categories" text="Three patch manufacturing methods – each fully customizable and available with iron-on, sew-on or Velcro backing." />
            <Reveal>
              <Link href="/products/" className="btn-ghost">All products</Link>
            </Reveal>
          </div>
          <div className="mt-14">
            <ProductCards />
          </div>
        </div>
      </section>

      {/* 4 – Backing */}
      <section className="section">
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

      {/* 5 – Why choose */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="Why Activon" title="Why choose Activon Embroidery?" />
          <div className="mt-14">
            <WhyChoose />
          </div>
        </div>
      </section>

      {/* 6 – Process */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="How It Works" title="Your design. Your requirements. Our craft." text="A clear, seven-step process from your artwork to patches delivered at your door." />
          <div className="mt-16">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* 7 – OEM */}
      <section className="section relative overflow-hidden border-y border-white/10 bg-ink-900">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(225,37,27,0.18),transparent_60%)] lg:block" />
        <div className="container relative grid items-center gap-14 lg:grid-cols-2">
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
          <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-5">
            {(
              [
                ["embroidered", "circle", ["#e1251b", "#0d0d0f", "#f2f3f5"], "YOUR"],
                ["woven", "rounded", ["#0d0d0f", "#a9adb5", "#e1251b"], "BRAND"],
                ["sublimation", "hexagon", ["#ff4a3d", "#7a0b06", "#ffd1cc"], "HERE"],
                ["embroidered", "shield", ["#a9adb5", "#1d1d21", "#ffffff"], "OEM"],
              ] as const
            ).map(([t, s, p, title], i) => (
              <Float key={i} duration={6 + i} distance={10} rotate={3} className={i % 2 ? "mt-10" : ""}>
                <PatchArt type={t} shape={s} palette={[...p] as [string, string, string]} title={title} subtitle="PRIVATE LABEL" className="w-full" ariaLabel="Private label custom patch example" />
              </Float>
            ))}
          </div>
        </div>
      </section>

      {/* 8 – Gallery */}
      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Gallery" title="Product gallery" text="Embroidered, sublimation and woven patches, backing options, custom shapes and production. Click any image to enlarge." />
            <Reveal>
              <Link href="/gallery/" className="btn-ghost">View full gallery</Link>
            </Reveal>
          </div>
          <div className="mt-12">
            <Gallery withFilters={false} limit={8} />
          </div>
        </div>
      </section>

      {/* 9 – Testimonials */}
      <Testimonials />

      {/* SEO FAQ */}
      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Custom patch questions" text="Quick answers about our patch types, backing options, wholesale orders and worldwide shipping." />
          </div>
          <div className="lg:col-span-8">
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* 10 – Final CTA */}
      <CtaBanner />
    </>
  );
}
