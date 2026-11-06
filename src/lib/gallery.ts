import type { ProductKey, ShapeKey } from "./catalog";

export type GalleryFilter =
  | "embroidered"
  | "sublimation"
  | "woven"
  | "iron-on"
  | "sew-on"
  | "velcro"
  | "production"
  | "finished";

export const galleryFilters: { key: GalleryFilter | "all"; label: string; group: "type" | "backing" | "other" | "all" }[] = [
  { key: "all", label: "All", group: "all" },
  { key: "embroidered", label: "Embroidered Patches", group: "type" },
  { key: "sublimation", label: "Sublimation Patches", group: "type" },
  { key: "woven", label: "Woven Patches", group: "type" },
  { key: "iron-on", label: "Iron-On Backing", group: "backing" },
  { key: "sew-on", label: "Sew-On Backing", group: "backing" },
  { key: "velcro", label: "Velcro Backing", group: "backing" },
  { key: "production", label: "Production Process", group: "other" },
  { key: "finished", label: "Finished Orders", group: "other" },
];

export type GalleryItem = {
  id: string;
  title: string;
  alt: string;
  tags: GalleryFilter[];
  /** Real photo in /public/gallery/… – when set it replaces the illustration. */
  src?: string;
  art: { type: ProductKey; shape: ShapeKey; palette: [string, string, string]; title: string; subtitle: string };
};

/**
 * Replace / extend with REAL product photography:
 * put images in /public/gallery/ and set `src: "/gallery/your-photo.jpg"`.
 */
export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Embroidered club badge", alt: "Custom round embroidered patch with merrowed border and iron-on backing", tags: ["embroidered", "iron-on", "finished"], art: { type: "embroidered", shape: "circle", palette: ["#e1251b", "#0d0d0f", "#f2f3f5"], title: "CLUB", subtitle: "EST" } },
  { id: "g2", title: "Full-colour team crest", alt: "Custom sublimation shield patch with full-colour gradient artwork and sew-on backing", tags: ["sublimation", "sew-on", "finished"], art: { type: "sublimation", shape: "shield", palette: ["#ff4a3d", "#7a0b06", "#ffd1cc"], title: "TEAM", subtitle: "FOOTBALL CLUB" } },
  { id: "g3", title: "Woven brand label", alt: "Custom woven patch with fine lettering for a fashion brand label", tags: ["woven", "sew-on", "finished"], art: { type: "woven", shape: "rounded", palette: ["#0d0d0f", "#a9adb5", "#e1251b"], title: "BRAND", subtitle: "PREMIUM APPAREL" } },
  { id: "g4", title: "Tactical hook-and-loop patch", alt: "Custom embroidered hexagon patch with Velcro hook-and-loop backing", tags: ["embroidered", "velcro"], art: { type: "embroidered", shape: "hexagon", palette: ["#a9adb5", "#1d1d21", "#f2f3f5"], title: "UNIT", subtitle: "" } },
  { id: "g5", title: "Event sublimation badge", alt: "Custom round sublimation patch with photographic sunset design and iron-on backing", tags: ["sublimation", "iron-on"], art: { type: "sublimation", shape: "circle", palette: ["#ffb347", "#3a0a5c", "#fff3d6"], title: "TOUR", subtitle: "2026 EDITION" } },
  { id: "g6", title: "Woven Velcro name tag", alt: "Custom woven rectangle patch with Velcro backing for uniforms", tags: ["woven", "velcro"], art: { type: "woven", shape: "rectangle", palette: ["#1f3a2b", "#c9ccd2", "#e1251b"], title: "CREW", subtitle: "UNIFORM" } },
  { id: "g7", title: "Die-cut embroidered logo", alt: "Custom die-cut embroidered patch following a logo outline", tags: ["embroidered", "sew-on", "finished"], art: { type: "embroidered", shape: "custom", palette: ["#e1251b", "#151518", "#ffffff"], title: "LOGO", subtitle: "" } },
  { id: "g8", title: "Artwork proof & digitizing", alt: "Patch artwork being prepared and digitized before production", tags: ["production"], art: { type: "woven", shape: "shield", palette: ["#2a2a30", "#8b9099", "#ff4a3d"], title: "PROOF", subtitle: "ARTWORK STAGE" } },
  { id: "g9", title: "Merrowed border finishing", alt: "Merrowed border being finished on a custom embroidered patch during production", tags: ["production", "embroidered"], art: { type: "embroidered", shape: "rounded", palette: ["#0d0d0f", "#2a2a30", "#e1251b"], title: "QC", subtitle: "" } },
  { id: "g10", title: "Sportswear sleeve patch", alt: "Custom sublimation hexagon patch for sportswear sleeves with Velcro backing", tags: ["sublimation", "velcro"], art: { type: "sublimation", shape: "hexagon", palette: ["#3dc4ff", "#06264a", "#e6f7ff"], title: "SPORT", subtitle: "ACADEMY" } },
  { id: "g11", title: "Iron-on woven badge", alt: "Custom round woven patch with iron-on heat-seal backing", tags: ["woven", "iron-on"], art: { type: "woven", shape: "circle", palette: ["#5b0f0b", "#e1e3e7", "#ffffff"], title: "CRAFT", subtitle: "HANDMADE" } },
  { id: "g12", title: "Bulk order ready to ship", alt: "Finished bulk order of custom patches packed for international shipping", tags: ["finished", "production"], art: { type: "embroidered", shape: "shield", palette: ["#a9adb5", "#0d0d0f", "#e1251b"], title: "SHIP", subtitle: "" } },
];
