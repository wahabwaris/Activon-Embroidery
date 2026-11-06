import type { Metadata } from "next";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import Link from "next/link";
import { ArrowRight, Building2, Dumbbell, Megaphone, Shirt, ShoppingBag, Sparkles, Truck } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { media, slides } from "@/lib/media";
import SectionHeading from "@/components/SectionHeading";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CheckList, CtaBanner } from "@/components/sections";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "OEM Patch Manufacturer & Private Label Patches",
  description:
    "OEM and private-label patch manufacturing for clothing brands, uniform makers, sports teams, promotional companies, wholesalers and e-commerce brands. Custom designs, bulk orders and packaging.",
  path: "/oem-private-label/",
  keywords: ["OEM patch manufacturer", "private label patches", "private label embroidered patches", "OEM custom patches for clothing brands", "white label patches wholesale"],
});

const audiences = [
  { icon: Shirt, title: "Clothing brands" },
  { icon: Sparkles, title: "Fashion brands" },
  { icon: Building2, title: "Uniform manufacturers" },
  { icon: Dumbbell, title: "Sports teams & clubs" },
  { icon: Megaphone, title: "Promotional product companies" },
  { icon: Truck, title: "Wholesale distributors" },
  { icon: ShoppingBag, title: "E-commerce businesses" },
];

const faqs = [
  { q: "What does OEM / private-label patch manufacturing mean?", a: "We manufacture patches to your design and specification, branded as your product. You sell or use them under your own brand name." },
  { q: "Can you follow our packaging requirements?", a: "Yes. Share your packaging and labelling requirements with your inquiry and we will confirm what can be supplied with your quotation." },
  { q: "Which patch types are available for private label?", a: "All three: embroidered, sublimation and woven patches, each with iron-on, sew-on or Velcro backing options." },
  { q: "Do you support repeat and bulk orders?", a: "Yes. We support bulk production and repeat orders, keeping your approved artwork on file for consistent reorders." },
];

export default function Oem() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="OEM & Private Label"
        title="OEM & private label patch manufacturing"
        lead="Your brand. Your design. Our manufacturing. We produce custom patches for businesses that sell, distribute or use them under their own name."
        crumbs={[{ name: "OEM & Private Label", path: "/oem-private-label/" }]}
        aside={
          <Reveal>
            <PhotoSlideshow photos={slides.bulk} className="aspect-[4/3] rounded-xl" sizes="(max-width:1024px) 90vw, 35vw" priority />
          </Reveal>
        }
      >
        <Link href="/get-a-quote/" className="btn-primary">
          Start an OEM Inquiry <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/contact-us/" className="btn-ghost">Talk to us</Link>
      </PageHero>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="Who We Serve" title="Built for B2B partners" />
          <Stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {audiences.map((a) => (
              <StaggerItem key={a.title}>
                <div className="card flex h-full flex-col items-center p-6 text-center transition hover:border-brand/40">
                  <a.icon className="h-8 w-8 text-brand-400" />
                  <p className="mt-4 text-sm font-semibold text-white">{a.title}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-3">
          {[
            { t: "Custom manufacturing", d: "Embroidered, sublimation or woven patches made to your artwork, size, colours, border and backing.", l: ["Approved artwork proof", "Custom shapes & sizes", "Iron-on, sew-on or Velcro"] },
            { t: "Branding", d: "Your logo and brand identity on every patch, ready for your products, uniforms or retail range.", l: ["Your design & colours", "Brand labels with woven patches", "Consistent repeat orders"] },
            { t: "Bulk & packaging", d: "Bulk production with packaging that meets your requirements, shipped worldwide.", l: ["Bulk & repeat production", "Packaging requirements", "International shipping"] },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div className="card h-full p-8">
                <span className="font-display text-4xl text-brand">0{i + 1}</span>
                <h2 className="h-display mt-4 text-3xl text-white">{c.t}</h2>
                <p className="mt-3 text-silver-300">{c.d}</p>
                <div className="mt-6">
                  <CheckList items={c.l} cols={1} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="OEM & private label FAQ" />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBanner title="Discuss your OEM project" text="Tell us about your brand, quantities and packaging requirements – we'll reply with options and a quotation." primary={{ label: "OEM Inquiry", href: "/get-a-quote/" }} />
    </>
  );
}
