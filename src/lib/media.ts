/**
 * Real photography & video from Activon Embroidery.
 * Detail shots are tight crops of finished patches (stitching, borders, twill);
 * production stills come from the factory-floor video.
 */
export type Photo = { src: string; alt: string; w: number; h: number };

const p = (name: string, alt: string, w: number, h: number): Photo => ({ src: `/media/photos/${name}.webp`, alt, w, h });

export const media = {
  heroVideo: "/media/hero-production.mp4",
  heroPoster: "/media/photos/production-f1.webp",

  production: {
    line: p("production-f19", "Row of multi-head embroidery machines running a patch production order", 788, 1400),
    lineAlt: p("production-f1", "Multi-head embroidery machines stitching patches on the production floor", 788, 1400),
    lineWide: p("production-f3", "Embroidery production line with multiple heads stitching patches simultaneously", 788, 1400),
    head: p("production-f9", "Close-up of an embroidery machine head stitching a patch in a hoop", 788, 1400),
    headAlt: p("production-f11", "Embroidery needles and thread tensioners stitching a custom patch", 788, 1400),
    hoop: p("production-f15", "Embroidery head with active needle bar over a framed patch", 788, 1400),
  },

  detail: {
    merrowed: p("detail-merrowed-border", "Close-up of a merrowed border finished around a black twill embroidered patch", 440, 400),
    maple: p("detail-maple-twill", "Detail of satin-stitch embroidery and white border on red twill", 240, 225),
    starLaurel: p("detail-star-laurel", "Fine embroidery detail of a star and laurel wreath stitched on orange twill", 370, 290),
    rays: p("detail-satin-rays", "Precise satin-stitch lines in lavender thread on a black embroidered patch", 490, 400),
    checker: p("detail-checker-fill", "Dense fill stitching in yellow and black thread on an embroidered patch", 290, 260),
    anchor: p("detail-anchor", "Embroidered anchor motif with dense fill stitching on white twill", 290, 290),
    stripes: p("detail-stripes-border", "Red and black fill stitching with a yellow merrowed border on a large embroidered patch", 490, 430),
    tricolor: p("detail-tricolor-band", "Green, white and red satin-stitch band on an embroidered shield patch", 910, 170),
  },

  bulk: {
    one: p("bulk-patches-1", "Assorted finished embroidered patches from bulk production orders", 1200, 430),
    two: p("bulk-patches-2", "Stacks of finished custom embroidered patches ready for packing", 1200, 470),
    three: p("bulk-patches-3", "Large batch of finished embroidered patches in many colours", 1200, 520),
  },
};
