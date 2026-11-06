import type { Metadata } from "next";
import { site } from "./site";
import { seoKeywords } from "./catalog";

type PageSeo = {
  title: string;
  description: string;
  path: string; // e.g. "/about-us/"
  keywords?: string[];
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, keywords = [], noindex }: PageSeo): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    keywords: Array.from(new Set([...keywords, ...seoKeywords.shortTail.slice(0, 6)])),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      locale: "en_US",
      images: [{ url: "/opengraph-image/", width: 1200, height: 630, alt: `${site.name} – ${site.tagline}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: ["/opengraph-image/"] },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    email: site.email,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
    knowsAbout: seoKeywords.shortTail,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}
