import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";
import { activeProducts, type ProductKey } from "@/lib/catalog";

export const metadata: Metadata = pageMetadata({
  title: "Get a Quote – Custom Patches Wholesale & OEM",
  description:
    "Request a free quotation for custom embroidered, sublimation or woven patches. Upload your design, choose size, shape and iron-on, sew-on or Velcro backing. Wholesale & OEM orders worldwide.",
  path: "/get-a-quote/",
  keywords: ["custom patches quote", "custom patch price", "bulk patch quote", "wholesale patches quote", "custom patches order online"],
});

export default async function GetAQuote({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  const preselect = activeProducts.find((p) => p.key === product)?.key as ProductKey | undefined;
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Request your custom patch quote"
        lead="Tell us about your patches and upload your design. Our team will review your requirements and reply with a quotation and artwork guidance."
        crumbs={[{ name: "Get a Quote", path: "/get-a-quote/" }]}
      />
      <section className="pb-24">
        <div className="container">
          <QuoteForm defaultProduct={preselect} key={preselect || "none"} />
        </div>
      </section>
    </>
  );
}
