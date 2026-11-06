import type { Metadata } from "next";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import Link from "next/link";
import { Globe, Handshake, Layers, Palette, Target, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { media, slides } from "@/lib/media";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CtaBanner, ProductCards } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us – Custom Patch Manufacturing Partner",
  description:
    "Learn about Activon Embroidery, a custom patch manufacturer and supplier of embroidered, sublimation and woven patches for wholesale, bulk and OEM / private-label customers worldwide.",
  path: "/about-us/",
  keywords: ["about Activon Embroidery", "custom patch company", "patch manufacturing partner", "international patch supplier"],
});

const pillars = [
  { icon: Layers, title: "Custom patch manufacturing", text: "Embroidered, sublimation and woven patches produced to each customer's specification." },
  { icon: Palette, title: "Customization capabilities", text: "Design, shape, size, colours, border and iron-on, sew-on or Velcro backing." },
  { icon: Handshake, title: "Wholesale & OEM / private label", text: "Bulk production and private-label support for brands, wholesalers and distributors." },
  { icon: Globe, title: "International customer support", text: "We work with customers worldwide by email and WhatsApp, from inquiry to delivery." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Your design. Our craft."
        lead="Activon Embroidery is a custom patch manufacturing partner for brands, businesses, teams and wholesalers around the world."
        crumbs={[{ name: "About Us", path: "/about-us/" }]}
        aside={
          <Reveal>
            <PhotoSlideshow photos={slides.production} className="aspect-[4/5] rounded-xl" sizes="(max-width:1024px) 90vw, 35vw" priority position="50% 40%" />
          </Reveal>
        }
      />

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who We Are" title="A custom patch manufacturer focused on B2B" />
          </div>
          <Reveal className="prose-a text-lg lg:col-span-7" delay={0.1}>
            <p>
              Activon Embroidery specializes in custom patch manufacturing for brands, businesses, sports teams, clubs, clothing manufacturers, wholesalers and promotional companies.
            </p>
            <p>
              Our business is built around three patch types – <Link className="text-white underline decoration-brand underline-offset-4" href="/embroidered-patches/">embroidered patches</Link>,{" "}
              <Link className="text-white underline decoration-brand underline-offset-4" href="/sublimation-patches/">sublimation patches</Link> and{" "}
              <Link className="text-white underline decoration-brand underline-offset-4" href="/woven-patches/">woven patches</Link> – each customizable in design, size, shape, colours, border and backing.
            </p>
            <p>
              We support wholesale orders, bulk production and OEM / private-label projects, and we work with customers internationally, shipping orders worldwide.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="What We Do" title="Services built around your brand" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="card h-full p-7">
                  <p.icon className="h-7 w-7 text-brand-400" />
                  <h3 className="mt-5 font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-300">{p.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="Our Products" title="Three main product categories" />
          <div className="mt-12">
            <ProductCards />
          </div>
        </div>
      </section>

      <section className="pb-4 pt-20 md:pt-28">
        <div className="container grid grid-cols-2 gap-4 md:grid-cols-4">
          {[media.production.head, media.detail.starLaurel, media.detail.merrowed, media.production.hoop].map((ph, i) => (
            <Reveal key={ph.src} delay={i * 0.08}>
              <Photo photo={ph} className="aspect-[3/4] rounded-xl" sizes="(max-width:768px) 50vw, 25vw" position={i % 3 === 0 ? "50% 60%" : "center"} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-9">
              <Target className="h-8 w-8 text-brand-400" />
              <h2 className="h-display mt-5 text-3xl text-white">Our mission</h2>
              <p className="mt-4 leading-relaxed text-silver-300">
                To help brands and businesses turn their designs into quality custom patches – with clear communication, flexible customization and fair wholesale pricing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-9">
              <ShieldCheck className="h-8 w-8 text-brand-400" />
              <h2 className="h-display mt-5 text-3xl text-white">Commitment to quality</h2>
              <p className="mt-4 leading-relaxed text-silver-300">
                Every order follows an approved artwork proof and is checked for colour, edges, stitching and backing before packaging and shipping.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
