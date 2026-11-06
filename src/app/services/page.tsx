import type { Metadata } from "next";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import Link from "next/link";
import { ArrowRight, Boxes, Factory, Handshake, Package, PenTool, Plane } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CtaBanner, ProcessSteps } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { media, slides } from "@/lib/media";

export const metadata: Metadata = pageMetadata({
  title: "Services – Custom Patch Manufacturing, OEM & Export",
  description:
    "Activon Embroidery services: custom patch manufacturing, artwork & digitizing, OEM and private label, bulk and wholesale production, packaging and international shipping.",
  path: "/services/",
  keywords: ["custom patch services", "patch digitizing service", "OEM patch production", "wholesale patch supplier", "patch export"],
});

const services = [
  { icon: Factory, title: "Custom Patch Manufacturing", text: "Embroidered, sublimation and woven patches made to your design, size, shape, colours, border and backing.", href: "/custom-patch-manufacturing/", photo: media.production.lineAlt },
  { icon: Handshake, title: "OEM & Private Label", text: "Patches produced for your brand, with your packaging requirements, for resale or your own products.", href: "/oem-private-label/", photo: media.bulk.two },
  { icon: PenTool, title: "Artwork & Digitizing", text: "Your logo or sketch prepared for production, with a digital proof for approval before stitching begins.", href: "/get-a-quote/", photo: media.detail.starLaurel },
  { icon: Boxes, title: "Wholesale & Bulk Production", text: "Volume production and repeat orders for distributors, uniform suppliers and brands.", href: "/get-a-quote/", photo: media.bulk.three },
  { icon: Package, title: "Quality Inspection & Packing", text: "Patches checked for colour, stitching, edges and backing, then packed to your requirements.", href: "/custom-patch-manufacturing/", photo: media.detail.merrowed },
  { icon: Plane, title: "International Shipping", text: "Orders shipped worldwide – shipping method and cost confirmed in your quotation.", href: "/global-presence/", photo: media.bulk.one },
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="End-to-end patch manufacturing services"
        lead="From your first sketch to a delivered bulk order – one partner for design, production, packing and international shipping."
        crumbs={[{ name: "Services", path: "/services/" }]}
        aside={
          <Reveal>
            <PhotoSlideshow photos={slides.production} className="aspect-[4/5] rounded-xl" sizes="(max-width:1024px) 90vw, 35vw" priority position="50% 60%" />
          </Reveal>
        }
      >
        <Link href="/get-a-quote/" className="btn-primary">
          Request a Quote <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container">
          <SectionHeading eyebrow="What We Offer" title="Our services" />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <Link href={s.href} className="group card flex h-full flex-col overflow-hidden transition hover:border-brand/40">
                  <Photo photo={s.photo} className="aspect-[16/10]" sizes="(max-width:768px) 100vw, 33vw" />
                  <div className="flex flex-1 flex-col p-7">
                    <s.icon className="h-6 w-6 text-brand-400" />
                    <h2 className="mt-4 text-xl font-semibold text-white">{s.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-300">{s.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-400">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Process" title="How an order works" />
          <div className="mt-16">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
