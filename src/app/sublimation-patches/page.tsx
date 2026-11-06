import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { getProduct } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

const p = getProduct("sublimation");

export const metadata: Metadata = pageMetadata({
  title: p.metaTitle,
  description: p.metaDescription,
  path: `/${p.slug}/`,
  keywords: p.keywords,
});

export default function Page() {
  return <ProductPage productKey="sublimation" />;
}
