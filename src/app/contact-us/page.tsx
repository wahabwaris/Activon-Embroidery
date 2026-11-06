import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import SocialIcons, { WhatsAppIcon } from "@/components/SocialIcons";
import { Reveal } from "@/components/motion";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us – Custom Patch Inquiries",
  description: "Contact Activon Embroidery by email or WhatsApp for custom patch quotations, wholesale orders and OEM / private-label inquiries. activonembroidery@gmail.com",
  path: "/contact-us/",
  keywords: ["contact custom patch manufacturer", "custom patch inquiry", "patch supplier contact", "custom patches WhatsApp"],
});

export default function Contact() {
  const wa = whatsappLink();
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk patches"
        lead="Questions about patch types, backing, wholesale pricing or private label? Reach us by email, WhatsApp or the form below."
        crumbs={[{ name: "Contact Us", path: "/contact-us/" }]}
      />
      <section className="pb-24">
        <div className="container grid gap-8 lg:grid-cols-12">
          <div className="grid content-start gap-5 lg:col-span-5">
            <Reveal>
              <div className="card p-7">
                <p className="text-xs uppercase tracking-[0.25em] text-silver-500">Business name</p>
                <p className="mt-2 font-display text-2xl uppercase text-white">{site.name}</p>
                <p className="text-sm text-silver-500">{site.tagline}</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <a href={`mailto:${site.email}`} className="card group flex items-center gap-5 p-7 transition hover:border-brand/50">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand/10 text-brand-400 ring-1 ring-brand/30"><Mail className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.25em] text-silver-500">Email</span>
                  <span className="block break-all font-semibold text-white">{site.email}</span>
                </span>
              </a>
            </Reveal>
            {wa && (
              <Reveal delay={0.1}>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="card group flex items-center gap-5 p-7 transition hover:border-[#25D366]/60">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#25D366]/10 text-[#25D366] ring-1 ring-[#25D366]/30"><WhatsAppIcon /></span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.25em] text-silver-500">WhatsApp</span>
                    <span className="block font-semibold text-white">{site.whatsappDisplay}</span>
                    <span className="block text-xs text-silver-500">Tap to chat on WhatsApp</span>
                  </span>
                </a>
              </Reveal>
            )}
            <Reveal delay={0.15}>
              <div className="card p-7">
                <p className="text-xs uppercase tracking-[0.25em] text-silver-500">Follow us</p>
                <SocialIcons className="mt-4" />
                <Link href="/get-a-quote/" className="btn-primary mt-6 w-full">
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
