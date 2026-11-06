# Activon Embroidery – Website

**Your Design. Our Craft.** Next.js 15 + React 19 + Tailwind CSS + Framer Motion.

B2B site for a custom patch manufacturer: **3 product categories** (Embroidered,
Sublimation, Woven) and **3 backing options** (Iron-On, Sew-On, Velcro) that are offered on
every category – never shown as separate products.

## Run it locally (Windows, macOS or Linux)

1. Install **Node.js 20 or newer** from https://nodejs.org (LTS).
2. Unzip the project, open a terminal in the `activon-embroidery` folder and run:

```bash
npm install
```

3. Copy `.env.example` to `.env.local` (optional for a first look – the site runs without it).
4. Start the development server:

```bash
npm run dev
```

5. Open **http://localhost:3000** in your browser.

Production mode (faster, what visitors get): `npm run build` then `npm start`.

## Pages

| URL | Purpose |
|---|---|
| `/` | Home – background-video hero, about, products, production, backing, industries, why us, process, global, OEM, gallery, feedback, FAQ, CTA |
| `/products/` | All products + comparison table |
| `/embroidered-patches/` `/sublimation-patches/` `/woven-patches/` | Product pages with SEO content, shapes, borders, backing, applications, FAQ, built-in quote form (category preselected) |
| `/services/` | Services overview |
| `/custom-patch-manufacturing/` | Custom manufacturing |
| `/industries/` | Industries served + recommended patch/backing |
| `/global-presence/` | Ordering from abroad, export steps, international FAQ |
| `/oem-private-label/` | OEM & private label |
| `/gallery/` | Filterable gallery + lightbox |
| `/catalogue/` | 7-page product catalogue (A4) with Download PDF + Print buttons |
| `/contact-us/` | Email, WhatsApp, social, contact form |
| `/get-a-quote/` | Main quote form (`?product=woven` preselects a category) |
| `/admin/` | Inquiry dashboard (password protected) |

## Quote form

- Fields per the brief, incl. file upload (JPG, JPEG, PNG, PDF, AI, EPS, SVG – 15 MB max).
- Live patch preview that reacts to type + shape.
- Emails the inquiry (with attachment) to `INQUIRY_TO` and sends the customer a confirmation.
- Saves every inquiry to `data/inquiries.json` (+ `data/uploads/`) – view, filter, update status,
  download designs and export CSV at `/admin/`.
- Spam protection: honeypot field, minimum fill time, per-IP rate limit.

**Email setup (Gmail):** turn on 2-Step Verification for activonembroidery@gmail.com, create an
App Password, and put it in `SMTP_PASS`. Without SMTP the form still works and saves to the dashboard.

## Things you need to supply

1. **WhatsApp** – already set to +92 309 1190715 (floating button, contact page, footer). To change it,
   set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only) and `NEXT_PUBLIC_WHATSAPP_DISPLAY` in `.env.local`.
2. **Social links** → `NEXT_PUBLIC_*_URL` (icons appear automatically).
3. **More product photos** – especially sublimation and woven patches and each backing type
   (those sections still use vector illustrations). See "Media" below.
4. **Genuine customer reviews** (with permission) → `src/lib/testimonials.ts`. None are invented.
5. **Domain** → `NEXT_PUBLIC_SITE_URL`.
6. **Google** → `NEXT_PUBLIC_GA_ID` (Analytics 4) and `GOOGLE_SITE_VERIFICATION` (Search Console),
   then submit `https://your-domain/sitemap.xml` in Search Console.

## Media

- **Hero video:** `public/media/hero-production-1080.mp4` (~8 MB, desktops/tablets) and
  `hero-production-720.mp4` (~4 MB, phones) – the browser picks the right one. Encoded from the
  45 MB original, no audio. Poster/fallback image: `public/media/photos/hero-poster.webp`. The video
  autoplays muted and looped; on reduced-motion or data-saver devices the poster is shown instead.
- **Photos:** `public/media/photos/*.webp`, registered in `src/lib/media.ts` (with alt text).
  Production stills come from the video; detail shots are tight crops of finished patches.
- **To add photos:** save as WebP/JPG in `public/media/photos/`, add an entry in `src/lib/media.ts`,
  then use it in `src/lib/gallery.ts` (gallery) or set `photo:` on a product in `src/lib/catalog.ts`.
- **Only publish designs you own or are authorized to show.** Photos of patches carrying other
  companies' logos (car makers, sports leagues, clubs, universities, film characters) can trigger
  takedowns, search removal and customs seizures. The supplied photos were cropped so no
  third-party logo is readable.

## Catalogue

- Page: `src/app/catalogue/page.tsx` – 7 A4 sheets (cover, company, 3 product pages, customization,
  how to order + contact with WhatsApp and quote QR codes). Email and phone appear on every page.
- Downloadable PDF: `public/catalogue/activon-embroidery-catalogue-2026.pdf`.
- **After editing catalogue content, regenerate the PDF:** run `npm run build && npm start`, open
  http://localhost:3000/catalogue/, press **Print**, choose **Save as PDF**, paper **A4**, margins
  **None**, enable **Background graphics**, and save over the file above.

## Photo slideshows

Featured photos cross-fade to the next image every **1 second** (`SLIDE_INTERVAL_MS` in
`src/components/PhotoSlideshow.tsx` – change it to e.g. `3000` for a slower pace). Photo sets live in
`slides` in `src/lib/media.ts`. Slideshows pause when off-screen and for visitors who prefer
reduced motion. Gallery tiles appear one by one.

## Brand / logo

The mark is a globe orbited by a running stitch ending in a needle – custom embroidery, delivered worldwide –
drawn in champagne gold on black.

| File | Use |
|---|---|
| `public/brand/activon-logo-dark-bg.svg` | Full logo for dark backgrounds |
| `public/brand/activon-logo-light-bg.svg` | Full logo for light backgrounds / documents |
| `public/brand/activon-logo-on-black.svg` | Full logo with solid black background |
| `public/brand/activon-mark.svg` / `activon-mark-dark.svg` | Symbol only |
| `public/brand/activon-avatar-1024.png` / `-512.png` | Social media profile pictures |
| `src/app/icon.svg`, `src/app/apple-icon.png` | Favicon & iPhone home-screen icon |

Brand colours: Rich Black `#101010`, Graphite `#202124`, Charcoal `#383838`, Platinum Silver `#C5C5C5`,
Champagne Gold `#D4AF72` (accent; use `#7F6033` for gold text on light backgrounds), Off White `#F5F5F3`.
Fonts: Oswald (headings, logo) and Inter (text), both free on Google Fonts. The SVG logo files
reference these fonts by name, so install Oswald when editing them in a design tool.

## SEO built in

Unique title/description/keywords + canonical per page, Open Graph & Twitter cards, generated
OG image, `sitemap.xml`, `robots.txt`, breadcrumbs (visible + schema), Organization, WebSite,
Service and FAQPage JSON-LD, one H1 per page, alt text on all patch images, internal links,
trailing-slash URLs as requested. Keyword & hashtag plan: `SEO-KEYWORDS-AND-HASHTAGS.md`.

## Editing content

- Products, keywords, FAQs, hashtags, border options: `src/lib/catalog.ts`
- Future categories (PVC, Chenille, Leather…): add an entry in `products` with `active: false`,
  switch to `true` when offered, and copy a product route folder.
- Contact details & nav: `src/lib/site.ts`

## Hosting

The dashboard stores data on disk, so use a Node host with a persistent disk (VPS, Hostinger
VPS, DigitalOcean, Railway, Render with disk). SSL via the host / Cloudflare. On Vercel
(serverless) swap `src/lib/store.ts` for a database such as Supabase or Neon. Back up the
`data/` folder regularly.
