/**
 * Single source of truth for the product structure.
 *
 * THREE main patch categories (products) and THREE backing options.
 * Backings are customization options – never product categories.
 * To add a future category (e.g. PVC, Chenille), add an entry to `products`
 * and set `active: true` once it is officially offered.
 */

export type ProductKey = "embroidered" | "sublimation" | "woven";
export type BackingKey = "iron-on" | "sew-on" | "velcro";
export type ShapeKey = "circle" | "shield" | "rectangle" | "rounded" | "hexagon" | "custom";

export const backings: { key: BackingKey; name: string; short: string; detail: string }[] = [
  {
    key: "iron-on",
    name: "Iron-On Backing",
    short: "Heat-seal backing for convenient application.",
    detail:
      "A heat-activated adhesive layer lets the patch be pressed onto cotton, polyester blends and denim with a household iron or heat press. Popular for retail merchandise and promotional runs.",
  },
  {
    key: "sew-on",
    name: "Sew-On Backing",
    short: "Designed to be stitched directly onto garments, bags and other products.",
    detail:
      "The most permanent attachment. Patches are stitched around the border onto uniforms, jackets, caps and bags – ideal for workwear and items that are washed frequently.",
  },
  {
    key: "velcro",
    name: "Velcro Backing",
    short: "Hook-and-loop attachment for removable and interchangeable patches.",
    detail:
      "Hook-and-loop backing (hook side on the patch, loop side supplied on request) so patches can be swapped between garments, tactical gear, bags and team kits.",
  },
];

export const shapes: { key: ShapeKey; name: string }[] = [
  { key: "circle", name: "Round / Circle" },
  { key: "shield", name: "Shield / Badge" },
  { key: "rectangle", name: "Rectangle / Square" },
  { key: "rounded", name: "Rounded Rectangle" },
  { key: "hexagon", name: "Hexagon" },
  { key: "custom", name: "Custom Die-Cut Shape" },
];

export type Product = {
  key: ProductKey;
  active: boolean;
  slug: string;
  name: string;
  singular: string;
  cardText: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  lead: string;
  intro: string[];
  design: { title: string; text: string }[];
  borders: string[];
  backings: BackingKey[];
  applications: string[];
  faqs: { q: string; a: string }[];
  hashtags: string[];
  art: { palette: [string, string, string]; label: string };
};

export const products: Product[] = [
  {
    key: "embroidered",
    active: true,
    slug: "embroidered-patches",
    name: "Embroidered Patches",
    singular: "Embroidered Patch",
    cardText: "Custom embroidered patches featuring stitched designs, vibrant threads and detailed craftsmanship.",
    metaTitle: "Custom Embroidered Patches Manufacturer | Wholesale & OEM",
    metaDescription:
      "Order custom embroidered patches in bulk from Activon Embroidery. Any shape and size, vibrant thread colours, merrowed or cut borders, with iron-on, sew-on or Velcro backing. Worldwide shipping.",
    keywords: [
      "custom embroidered patches",
      "embroidered patches manufacturer",
      "wholesale embroidered patches",
      "bulk embroidered patches for clothing brands",
      "custom embroidered logo patches",
      "iron-on embroidered patches custom",
      "sew-on embroidered patches for uniforms",
      "velcro embroidered patches custom",
      "custom embroidered patches no minimum quote",
      "embroidered patches for jackets and caps",
    ],
    h1: "Custom Embroidered Patches",
    lead: "Stitched, textured and built to last – custom embroidered patches for brands, uniforms, teams and clubs.",
    intro: [
      "Embroidered patches are the classic choice for logos and badges. Your artwork is digitized into a stitch file and sewn with polyester or rayon threads onto a twill base, giving a raised, textured finish that looks premium on apparel, caps, jackets and bags.",
      "Activon Embroidery manufactures custom embroidered patches to your exact specification – shape, dimensions, thread colours, border and backing – for wholesale, bulk-order and private-label customers around the world.",
    ],
    design: [
      { title: "Thread colours", text: "Choose thread shades to match your brand colours. Share Pantone references and we will advise the closest available thread match." },
      { title: "Stitch coverage", text: "Select full embroidery coverage or partial coverage that lets the twill base show through for a lighter, flexible patch." },
      { title: "Custom shapes & sizes", text: "Round, shield, rectangle, hexagon or a fully custom die-cut outline that follows your logo." },
      { title: "Logo digitizing", text: "Our team converts your logo (JPG, PNG, PDF, AI, EPS or SVG) into a production stitch file and shares an artwork proof before production." },
    ],
    borders: ["Merrowed border", "Hot-cut / laser-cut edge"],
    backings: ["iron-on", "sew-on", "velcro"],
    applications: ["Clothing & streetwear", "Corporate uniforms", "Jackets & denim", "Caps & hats", "Bags & backpacks", "Clubs & societies", "Sports teams", "Brand merchandise"],
    faqs: [
      { q: "What is the best backing for custom embroidered patches?", a: "Sew-on is the most durable for uniforms and frequently washed garments, iron-on is fastest for retail and promotional use, and Velcro (hook-and-loop) is best when patches need to be removable or interchangeable. Tell us how the patch will be used and we will recommend an option." },
      { q: "Can you make embroidered patches from my logo?", a: "Yes. Upload your logo in the quote form and we will digitize it into a stitch file and send you an artwork proof for approval before production starts." },
      { q: "Do you supply wholesale and bulk embroidered patches?", a: "Yes. Activon Embroidery focuses on wholesale, bulk-order and OEM / private-label production. Share the quantity you need and we will quote pricing for that volume." },
      { q: "Which border options are available for embroidered patches?", a: "Merrowed (overlocked) borders suit round, square and simple shapes; hot-cut or laser-cut edges are used for detailed custom outlines." },
    ],
    hashtags: ["#CustomEmbroideredPatches", "#EmbroideredPatches", "#EmbroideryPatch", "#CustomPatches", "#PatchManufacturer", "#WholesalePatches", "#IronOnPatches", "#SewOnPatches", "#VelcroPatches", "#LogoPatch"],
    art: { palette: ["#e1251b", "#0d0d0f", "#f2f3f5"], label: "EMB" },
  },
  {
    key: "sublimation",
    active: true,
    slug: "sublimation-patches",
    name: "Sublimation Patches",
    singular: "Sublimation Patch",
    cardText: "Full-colour custom sublimation patches suitable for detailed artwork, gradients and photographic-style designs.",
    metaTitle: "Custom Sublimation Patches | Full-Colour Printed Patch Manufacturer",
    metaDescription:
      "Custom sublimation patches with unlimited colours, gradients and photographic detail. Bulk and wholesale orders, custom shapes, merrowed borders, iron-on, sew-on or Velcro backing. Request a quote.",
    keywords: [
      "custom sublimation patches",
      "sublimated patches manufacturer",
      "full colour custom patches",
      "dye sublimation patches wholesale",
      "photo quality custom patches",
      "sublimation patches for sportswear",
      "custom printed patches with gradients",
      "iron-on sublimation patches bulk",
      "velcro sublimation patches custom",
      "sublimation patches for promotional products",
    ],
    h1: "Custom Sublimation Patches",
    lead: "Unlimited colours, smooth gradients and photographic detail – full-colour custom sublimation patches.",
    intro: [
      "Sublimation patches are produced by transferring your artwork into a polyester fabric with heat and pressure. Because the design is printed rather than stitched, there is no limit on the number of colours – gradients, shading and photo-style artwork reproduce cleanly.",
      "They are a strong fit for sports kits, events, promotional campaigns and any design that would lose detail as embroidery. Activon Embroidery produces custom sublimation patches in bulk with your choice of shape, size, border and backing.",
    ],
    design: [
      { title: "Full-colour artwork", text: "Reproduce gradients, shadows, photographs and complex colour artwork with no thread-colour limits." },
      { title: "Colour customization", text: "Share CMYK or Pantone references so the printed result stays close to your brand colours." },
      { title: "Custom shapes & sizes", text: "From small round badges to large rectangular back patches and custom cut outlines." },
      { title: "Fine detail", text: "Small text, thin lines and intricate illustrations stay crisp because nothing is lost to stitch density." },
    ],
    borders: ["Merrowed border", "Hot-cut / laser-cut edge"],
    backings: ["iron-on", "sew-on", "velcro"],
    applications: ["Sportswear & team kits", "Uniforms", "Promotional products", "Events & tournaments", "Clubs & academies", "Brand merchandise"],
    faqs: [
      { q: "What is the difference between sublimation and embroidered patches?", a: "Embroidered patches are stitched with thread and have a raised texture. Sublimation patches are printed into fabric, so they are flat, lightweight and can show unlimited colours, gradients and photographic detail." },
      { q: "Are sublimation patches durable?", a: "Yes. The ink becomes part of the polyester fibre rather than sitting on top, so the design resists cracking and peeling. Backing choice also affects durability – sew-on is the most permanent." },
      { q: "Can sublimation patches have iron-on or Velcro backing?", a: "Yes. Iron-on, sew-on and Velcro (hook-and-loop) backings are available for sublimation patches, subject to the final size and design." },
      { q: "Do you make sublimation patches in bulk for sports teams?", a: "Yes. We support bulk and wholesale orders for teams, clubs, academies and sportswear brands worldwide." },
    ],
    hashtags: ["#SublimationPatches", "#CustomSublimationPatches", "#FullColorPatches", "#PrintedPatches", "#CustomPatches", "#SportsPatches", "#TeamPatches", "#WholesalePatches", "#PatchManufacturer", "#VelcroPatches"],
    art: { palette: ["#ff4a3d", "#7a0b06", "#ffd1cc"], label: "SUB" },
  },
  {
    key: "woven",
    active: true,
    slug: "woven-patches",
    name: "Woven Patches",
    singular: "Woven Patch",
    cardText: "Custom woven patches designed for fine details, small lettering and clean, precise designs.",
    metaTitle: "Custom Woven Patches Manufacturer | Fine-Detail Woven Badges",
    metaDescription:
      "Custom woven patches for fine detail and small lettering. Ideal for fashion brands, uniforms and accessories. Wholesale, bulk and private-label orders with iron-on, sew-on or Velcro backing.",
    keywords: [
      "custom woven patches",
      "woven patches manufacturer",
      "wholesale woven patches",
      "woven badges for clothing brands",
      "custom woven logo patches with small text",
      "woven patches for fashion brands",
      "iron-on woven patches custom",
      "sew-on woven patches for uniforms",
      "velcro woven patches",
      "private label woven patches bulk",
    ],
    h1: "Custom Woven Patches",
    lead: "Thin, flat and precise – custom woven patches for fine detail, small lettering and clean branding.",
    intro: [
      "Woven patches are produced on a loom using fine threads, creating a flat, smooth surface with a much higher thread density than standard embroidery. That allows small lettering, thin lines and detailed logos to stay sharp.",
      "Their thin, flexible finish makes them ideal for fashion labels, premium apparel, uniforms and accessories. Activon Embroidery manufactures custom woven patches in bulk for brands, wholesalers and private-label customers.",
    ],
    design: [
      { title: "Fine details", text: "High thread density keeps intricate artwork, outlines and small icons clean and readable." },
      { title: "Small lettering", text: "A strong choice when your design includes taglines, small text or detailed wordmarks." },
      { title: "Thread colour customization", text: "Select thread colours to match your brand palette; we will advise on the best colour combination for the weave." },
      { title: "Custom shapes & sizes", text: "Rectangular labels, round badges, shields and custom cut outlines." },
    ],
    borders: ["Merrowed border", "Hot-cut / laser-cut edge", "Folded edge (label style)"],
    backings: ["iron-on", "sew-on", "velcro"],
    applications: ["Clothing labels & brand tags", "Fashion brands", "Uniforms", "Bags & accessories", "Caps & hats", "Private-label apparel"],
    faqs: [
      { q: "When should I choose woven patches instead of embroidered patches?", a: "Choose woven patches when your design has small text, thin lines or fine detail, or when you want a flatter, thinner patch. Choose embroidered patches for a raised, textured look." },
      { q: "Can woven patches be used as clothing labels?", a: "Yes. Woven patches with folded or cut edges are widely used as brand labels on apparel, bags and accessories." },
      { q: "What backing options do woven patches support?", a: "Iron-on, sew-on and Velcro (hook-and-loop) backing are available for woven patches, subject to size and final use." },
      { q: "Do you offer private-label woven patches?", a: "Yes. We support OEM and private-label woven patches for clothing brands, uniform suppliers and wholesalers." },
    ],
    hashtags: ["#WovenPatches", "#CustomWovenPatches", "#WovenLabels", "#WovenBadges", "#ClothingLabels", "#FashionBrand", "#CustomPatches", "#PrivateLabel", "#PatchManufacturer", "#WholesalePatches"],
    art: { palette: ["#0d0d0f", "#a9adb5", "#e1251b"], label: "WVN" },
  },
  // Future categories – keep `active: false` until officially offered.
  // { key: "pvc", active: false, slug: "pvc-patches", ... },
];

export const activeProducts = products.filter((p) => p.active);

export function getProduct(key: ProductKey) {
  return products.find((p) => p.key === key)!;
}

/** Search-engine keyword map (short tail + long tail). */
export const seoKeywords = {
  shortTail: [
    "custom patches",
    "patch manufacturer",
    "custom patch manufacturer",
    "custom patch manufacturing",
    "custom embroidered patches",
    "custom sublimation patches",
    "custom woven patches",
    "wholesale custom patches",
    "custom patch supplier",
    "OEM patch manufacturer",
    "private label patches",
    "iron-on custom patches",
    "sew-on custom patches",
    "velcro custom patches",
  ],
  longTail: [
    "custom patch manufacturer for clothing brands",
    "wholesale custom patches with worldwide shipping",
    "bulk custom embroidered patches for uniforms",
    "OEM and private label patch manufacturing",
    "custom logo patches for businesses and teams",
    "custom patches with iron-on sew-on or velcro backing",
    "where to order custom patches in bulk",
    "custom patch supplier for wholesalers and distributors",
    "custom patches for sports teams and clubs",
    "custom patches for promotional product companies",
    "custom patches for e-commerce brands",
    "international custom patch manufacturer export",
  ],
};

export const brandHashtags = [
  "#ActivonEmbroidery",
  "#YourDesignOurCraft",
  "#CustomPatches",
  "#PatchManufacturer",
  "#CustomEmbroideredPatches",
  "#SublimationPatches",
  "#WovenPatches",
  "#WholesalePatches",
  "#OEMPatches",
  "#PrivateLabelPatches",
  "#IronOnPatches",
  "#SewOnPatches",
  "#VelcroPatches",
  "#BrandPatches",
];
