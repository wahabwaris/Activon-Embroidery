import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Brush, Layers, Palette, Ruler, ShieldCheck, Tag } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { media } from "@/lib/media";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { BackingOptions, CtaBanner, ProcessSteps } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Custom Patch Manufacturing – Your Artwork, Any Shape & Size",
  description:
    "Custom patch manufacturing from your logo or artwork: embroidered, sublimation or woven patches in custom shapes, sizes and colours with iron-on, sew-on or Velcro backing. Bulk production worldwide.",
  path: "/custom-patch-manufacturing/",
  keywords: ["custom patch manufacturing", "make custom patches from logo", "custom logo patches bulk", "custom patch production", "custom shape patches"],
});

const caps = [
  { icon: Brush, title: "Custom artwork & logos", text: "Send your logo or idea – we prepare a production-ready design and digital proof." },
  { icon: Ruler, title: "Custom shapes & sizes", text: "Standard shapes or a custom die-cut outline, in the dimensions you need." },
  { icon: Layers, title: "Embroidered, sublimation & woven", text: "Pick the manufacturing method that best suits your artwork and use." },
  { icon: Tag, title: "Iron-on, sew-on & Velcro backing", text: "Select the attachment method that fits your garments or products." },
  { icon: Palette, title: "Custom colours & finishing", text: "Thread or print colours matched to your brand, with merrowed or cut borders." },
  { icon: Boxes, title: "Bulk production", text: "Planning for bulk orders and repeat production runs." },
  { icon: ShieldCheck, title: "Quality inspection & packaging", text: "Patches are inspected and packed to your requirements before shipping." },
];

export default function CustomManufacturing() {
  return (
    <>
      <PageHero
        eyebrow="Custom Manufacturing"
        title="Custom patch manufacturing"
        lead="Create patches made to your exact requirements – from artwork and patch type to size, shape, colours, border and backing."
        crumbs={[{ name: "Custom Manufacturing", path: "/custom-patch-manufacturing/" }]}
        aside={
          <Reveal>
            <Photo photo={media.production.hoop} className="aspect-[4/5] rounded-[2rem]" sizes="(max-width:1024px) 90vw, 35vw" priority position="50% 55%" />
          </Reveal>
        }
      >
        <Link href="/get-a-quote/" className="btn-primary">
          Start Your Custom Patch Project <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="Capabilities" title="Everything you can customize" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {caps.map((c) => (
              <StaggerItem key={c.title}>
                <div className="card h-full p-7 transition hover:-translate-y-1 hover:border-white/25">
                  <c.icon className="h-7 w-7 text-brand-400" />
                  <h3 className="mt-5 font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-300">{c.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Production" title="Multi-head embroidery production" text="Embroidered orders run on multi-head machines that stitch many patches simultaneously – keeping bulk orders consistent and efficient." />
          </div>
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Photo photo={media.production.line} className="aspect-[3/4] rounded-3xl" sizes="25vw" />
              <Photo photo={media.production.headAlt} className="aspect-[3/4] rounded-3xl" sizes="25vw" position="50% 35%" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="Backing" title="Iron-on, sew-on & Velcro backing" text="Available across embroidered, sublimation and woven patches, subject to compatibility." />
          <div className="mt-12">
            <BackingOptions detailed />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Process" title="From design to delivery" />
          <div className="mt-16">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <CtaBanner title="Start your custom patch project" primary={{ label: "Start Your Project", href: "/get-a-quote/" }} />
    </>
  );
}
