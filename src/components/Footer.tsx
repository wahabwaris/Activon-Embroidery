import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import SocialIcons, { WhatsAppIcon } from "./SocialIcons";
import { site, whatsappLink } from "@/lib/site";
import { activeProducts } from "@/lib/catalog";

const quick = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Products", href: "/products/" },
  { label: "Services", href: "/services/" },
  { label: "Custom Manufacturing", href: "/custom-patch-manufacturing/" },
  { label: "OEM & Private Label", href: "/oem-private-label/" },
  { label: "Industries", href: "/industries/" },
  { label: "Global Presence", href: "/global-presence/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Product Catalogue", href: "/catalogue/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Get a Quote", href: "/get-a-quote/" },
];

export default function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="relative overflow-hidden print:hidden border-t border-white/10 bg-ink-900">
      <div className="stitch-line h-[2px] w-full opacity-60" />
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="h-20 w-auto" priority={false} />
          <p className="mt-5 font-display text-2xl uppercase text-white">{site.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver-500">
            Custom patch manufacturer and supplier of embroidered, sublimation and woven patches for wholesale, bulk and OEM / private-label customers worldwide.
          </p>
          <SocialIcons className="mt-6" />
        </div>

        <nav aria-label="Quick links" className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-silver-500">Quick Links</h2>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-silver-300 transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products" className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-silver-500">Products</h2>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {activeProducts.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}/`} className="text-silver-300 transition hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-silver-500">Contact</h2>
          <ul className="mt-5 grid gap-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-silver-300 transition hover:text-white">
                <Mail className="h-4 w-4 text-brand" /> {site.email}
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-silver-300 transition hover:text-white">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp {site.whatsappDisplay}
                </a>
              </li>
            )}
          </ul>
          <Link href="/get-a-quote/" className="btn-primary mt-6">
            Request a Quote
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-silver-500 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Custom Embroidered · Sublimation · Woven Patches — Iron-On, Sew-On &amp; Velcro Backing</p>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden whitespace-nowrap pb-2 text-center font-display text-[18vw] uppercase leading-none text-white/[0.03]">
        Activon
      </div>
    </footer>
  );
}
