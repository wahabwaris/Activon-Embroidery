export const site = {
  name: "Activon Embroidery",
  tagline: "Your Design. Our Craft.",
  email: "activonembroidery@gmail.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.activonembroidery.com").replace(/\/$/, ""),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923091190715").replace(/\D/g, ""),
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "+92 309 1190715",
  description:
    "Activon Embroidery is a custom patch manufacturer and supplier of embroidered, sublimation and woven patches with iron-on, sew-on and Velcro backing. Wholesale, bulk, OEM and private-label orders shipped worldwide.",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  },
};

const siteDomain = site.url.replace(/^https?:\/\//, "");

/**
 * Pre-filled WhatsApp text. It always states that the chat started on the
 * Activon Embroidery website (and which page), so the team knows the source.
 */
export function whatsappMessage(page?: string, intro = "I'd like a quote for custom patches.") {
  const where = page && page !== "/" ? `${siteDomain}${page}` : siteDomain;
  return [
    "Hello Activon Embroidery! 👋",
    `This message comes from your Activon Embroidery website (${where}).`,
    intro,
  ].join("\n");
}

export function whatsappLink(message = whatsappMessage()) {
  if (!site.whatsapp) return "";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  {
    label: "Products",
    href: "/products/",
    children: [
      { label: "Embroidered Patches", href: "/embroidered-patches/" },
      { label: "Sublimation Patches", href: "/sublimation-patches/" },
      { label: "Woven Patches", href: "/woven-patches/" },
      { label: "Product Catalogue", href: "/catalogue/" },
    ],
  },
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "All Services", href: "/services/" },
      { label: "Custom Manufacturing", href: "/custom-patch-manufacturing/" },
      { label: "OEM & Private Label", href: "/oem-private-label/" },
    ],
  },
  { label: "Industries", href: "/industries/" },
  { label: "Global Presence", href: "/global-presence/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact Us", href: "/contact-us/" },
];
