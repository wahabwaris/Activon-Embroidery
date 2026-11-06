import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, FileCheck, Globe, Mail, MessageSquare, Package, Plane, Receipt } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { media } from "@/lib/media";

export const metadata: Metadata = pageMetadata({
  title: "Global Presence – Custom Patches Shipped Worldwide",
  description:
    "Order custom patches from anywhere in the world. Activon Embroidery works with international buyers by email and WhatsApp, with artwork proofs, export packing and worldwide shipping.",
  path: "/global-presence/",
  keywords: ["international custom patch manufacturer", "custom patches worldwide shipping", "patch exporter", "import custom patches", "overseas patch supplier"],
});

const steps = [
  { icon: Mail, t: "Send your inquiry", d: "Share your design, quantity, size and backing through the quote form, email or WhatsApp." },
  { icon: Receipt, t: "Receive your quotation", d: "Pricing for your quantity, plus the shipping method and cost to your country." },
  { icon: FileCheck, t: "Approve the artwork proof", d: "Production starts only after you approve the digital proof." },
  { icon: Package, t: "Production & packing", d: "Patches are produced, inspected and packed to your requirements." },
  { icon: Plane, t: "International delivery", d: "Your order is dispatched to your address with tracking details shared." },
];

const faqs = [
  { q: "Can I order custom patches from outside your country?", a: "Yes. We work with international customers and ship orders worldwide. Every quotation includes the shipping method and cost to your delivery address." },
  { q: "How do we communicate during the order?", a: "By email and WhatsApp. You receive the quotation and artwork proof digitally and can approve or request changes before production." },
  { q: "Who pays import duties and taxes?", a: "Import duties and taxes depend on your country and are normally paid by the importer. We'll confirm the shipping terms in your quotation so there are no surprises." },
  { q: "Can you pack orders for retail or distribution?", a: "Yes. Share your packaging and labelling requirements with your inquiry and we'll confirm what can be supplied." },
];

export default function GlobalPresence() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="Global Presence"
        title="Custom patches, delivered worldwide"
        lead="Wherever your brand is based, you can design, approve and receive your patches without leaving your desk."
        crumbs={[{ name: "Global Presence", path: "/global-presence/" }]}
        aside={
          <Reveal>
            <Photo photo={media.bulk.one} className="aspect-[4/3] rounded-xl" sizes="(max-width:1024px) 90vw, 35vw" priority />
          </Reveal>
        }
      >
        <Link href="/get-a-quote/" className="btn-primary">
          Start an International Order <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            { icon: Globe, t: "Worldwide shipping", d: "We serve customers internationally and ship to your country." },
            { icon: MessageSquare, t: "Remote collaboration", d: "Quotes, proofs and updates by email and WhatsApp." },
            { icon: Clock, t: "Clear timelines", d: "Production and delivery timing confirmed with your quotation." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="card h-full p-8">
                <c.icon className="h-8 w-8 text-brand-400" />
                <h2 className="mt-5 text-xl font-semibold text-white">{c.t}</h2>
                <p className="mt-2 text-silver-300">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="How It Works" title="Ordering from abroad in five steps" />
            <Reveal delay={0.1}>
              <Photo photo={media.production.line} className="mt-10 hidden aspect-[4/5] rounded-xl lg:block" sizes="35vw" />
            </Reveal>
          </div>
          <Stagger className="relative grid gap-4 lg:col-span-7">
            {steps.map((s, i) => (
              <StaggerItem key={s.t}>
                <div className="card flex gap-5 p-6 md:p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand text-ink">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-500">Step {i + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{s.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-silver-300">{s.d}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-900">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="International orders FAQ" />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
