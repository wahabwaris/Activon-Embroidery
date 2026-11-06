import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { activeProducts } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/products/", 0.9, "weekly"],
    ...activeProducts.map((p) => [`/${p.slug}/`, 0.9, "weekly"] as [string, number, "weekly"]),
    ["/custom-patch-manufacturing/", 0.8, "monthly"],
    ["/oem-private-label/", 0.8, "monthly"],
    ["/get-a-quote/", 0.8, "monthly"],
    ["/gallery/", 0.7, "weekly"],
    ["/about-us/", 0.6, "monthly"],
    ["/contact-us/", 0.6, "yearly"],
  ];
  return pages.map(([path, priority, changeFrequency]) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority }));
}
