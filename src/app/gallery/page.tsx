import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import { CtaBanner } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Custom Patch Gallery – Embroidered, Sublimation & Woven Examples",
  description:
    "Browse custom patch examples by type and backing: embroidered, sublimation and woven patches with iron-on, sew-on and Velcro backing, plus production and finished orders.",
  path: "/gallery/",
  keywords: ["custom patch examples", "embroidered patch gallery", "custom patch ideas", "velcro patch examples", "iron on patch examples"],
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Custom patch gallery"
        lead="Filter by patch type or backing option to explore examples. Click any image to view it larger."
        crumbs={[{ name: "Gallery", path: "/gallery/" }]}
      />
      <section className="pb-24">
        <div className="container">
          <Gallery />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
