import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { industries } from "@/lib/industries";
import { media } from "@/lib/media";

export const metadata: Metadata = pageMetadata({
  title: "Industries – Custom Patches for Brands, Uniforms, Teams & Distributors",
  description:
    "Custom patches for clothing brands, uniform and workwear suppliers, sports teams, schools, promotional companies, wholesale distributors and e-commerce brands. Wholesale & OEM.",
  path: "/industries/",
  keywords: ["custom patches for clothing brands", "uniform patches manufacturer", "sports team patches wholesale", "promotional patches bulk", "patches for e-commerce brands"],
});

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Custom patches for every industry"
        lead="We match the right patch type, border and backing to how your patches will be worn, sold or used."
        crumbs={[{ name: "Industries", path: "/industries/" }]}
        aside={
          <Reveal>
            <Photo photo={media.bulk.three} className="aspect-[4/3] rounded-[2rem]" sizes="(max-width:1024px) 90vw, 35vw" priority />
          </Reveal>
        }
      />

      <section className="section section-light">
        <div className="container">
          <SectionHeading light eyebrow="Who We Serve" title="Industries & recommended options" />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {industries.map((ind) => (
              <StaggerItem key={ind.name}>
                <article className="group flex h-full gap-5 rounded-3xl border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand-600">
                    <ind.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-ink">{ind.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-silver-700">{ind.text}</p>
                    <p className="mt-4 inline-block rounded-full bg-[#f4f4f2] px-3 py-1 text-xs font-medium text-ink">Typical choice: {ind.recommend}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <p className="mt-10 max-w-3xl text-sm text-silver-700">
              Producing patches with a club, school, team or company logo? We manufacture designs for their owners or for buyers who are authorized to use them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Photo photo={media.production.lineWide} className="aspect-[4/3] rounded-[2rem]" sizes="(max-width:1024px) 90vw, 45vw" position="50% 40%" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Not sure what fits?" title="Tell us how the patch will be used" text="Share the product, garment or application and we'll recommend the patch type, border and backing – with a quotation for your quantity." />
            <Reveal delay={0.1}>
              <Link href="/get-a-quote/" className="btn-primary mt-8">
                Get a Recommendation <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
