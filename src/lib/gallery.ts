import type { ProductKey, ShapeKey } from "./catalog";
import { media, type Photo } from "./media";

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
  /** Real photo – preferred. */
  src?: string;
  /** Vector illustration, used only where no photo exists yet. */
  art?: { type: ProductKey; shape: ShapeKey; palette: [string, string, string]; title: string; subtitle: string };
};

const ph = (id: string, photo: Photo, title: string, tags: GalleryFilter[]): GalleryItem => ({ id, title, alt: photo.alt, tags, src: photo.src });

/**
 * Add more photos by dropping files into /public/media/photos/ and adding them
 * to src/lib/media.ts – then list them here with the right tags.
 */
export const galleryItems: GalleryItem[] = [
  ph("p1", media.production.line, "Multi-head embroidery production", ["production", "embroidered"]),
  ph("p2", media.detail.starLaurel, "Fine-detail embroidery", ["embroidered", "finished"]),
  ph("p3", media.bulk.three, "Bulk order – finished patches", ["finished"]),
  ph("p4", media.production.head, "Stitching in the hoop", ["production"]),
  ph("p5", media.detail.merrowed, "Merrowed border finishing", ["embroidered", "finished"]),
  ph("p6", media.detail.rays, "Precise satin-stitch lines", ["embroidered", "finished"]),
  ph("p7", media.production.headAlt, "Needle bar & thread tension", ["production"]),
  ph("p8", media.detail.stripes, "Fill stitching with merrowed edge", ["embroidered", "finished"]),
  ph("p9", media.bulk.one, "Mixed bulk production run", ["finished"]),
  ph("p10", media.detail.checker, "Dense fill-stitch detail", ["embroidered"]),
  ph("p11", media.production.lineWide, "Production line", ["production"]),
  ph("p12", media.detail.anchor, "Embroidered motif on twill", ["embroidered", "finished"]),
  ph("p13", media.detail.maple, "Satin border & twill texture", ["embroidered"]),
  ph("p14", media.bulk.two, "Finished patches ready for packing", ["finished"]),
  ph("p15", media.production.hoop, "Embroidery head at work", ["production"]),
  // Design illustrations until photos of these types/backings are added:
  { id: "i1", title: "Sublimation team crest (illustration)", alt: "Illustration of a custom sublimation shield patch with full-colour gradient artwork", tags: ["sublimation", "sew-on"], art: { type: "sublimation", shape: "shield", palette: ["#ff4a3d", "#7a0b06", "#ffd1cc"], title: "TEAM", subtitle: "FOOTBALL CLUB" } },
  { id: "i2", title: "Woven brand label (illustration)", alt: "Illustration of a custom woven patch with fine lettering for a fashion brand", tags: ["woven", "sew-on"], art: { type: "woven", shape: "rounded", palette: ["#0d0d0f", "#a9adb5", "#e1251b"], title: "BRAND", subtitle: "PREMIUM APPAREL" } },
  { id: "i3", title: "Hook-and-loop patch (illustration)", alt: "Illustration of a custom embroidered hexagon patch with Velcro backing", tags: ["embroidered", "velcro"], art: { type: "embroidered", shape: "hexagon", palette: ["#a9adb5", "#1d1d21", "#f2f3f5"], title: "UNIT", subtitle: "" } },
  { id: "i4", title: "Iron-on sublimation badge (illustration)", alt: "Illustration of a round sublimation patch with iron-on backing", tags: ["sublimation", "iron-on"], art: { type: "sublimation", shape: "circle", palette: ["#ffb347", "#3a0a5c", "#fff3d6"], title: "TOUR", subtitle: "2026 EDITION" } },
  { id: "i5", title: "Woven Velcro name tag (illustration)", alt: "Illustration of a woven rectangle patch with Velcro backing", tags: ["woven", "velcro"], art: { type: "woven", shape: "rectangle", palette: ["#1f3a2b", "#c9ccd2", "#e1251b"], title: "CREW", subtitle: "UNIFORM" } },
  { id: "i6", title: "Iron-on woven badge (illustration)", alt: "Illustration of a round woven patch with iron-on backing", tags: ["woven", "iron-on"], art: { type: "woven", shape: "circle", palette: ["#5b0f0b", "#e1e3e7", "#ffffff"], title: "CRAFT", subtitle: "HANDMADE" } },
];
