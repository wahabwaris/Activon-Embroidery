# Activon Embroidery – Website

**Your Design. Our Craft.** Next.js 15 + React 19 + Tailwind CSS + Framer Motion.

B2B site for a custom patch manufacturer: **3 product categories** (Embroidered,
Sublimation, Woven) and **3 backing options** (Iron-On, Sew-On, Velcro) that are offered on
every category – never shown as separate products.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| URL | Purpose |
|---|---|
| `/` | Home – hero, about, 3 product cards, backing, why us, process, OEM, gallery, feedback, FAQ, CTA |
| `/products/` | All products + comparison table |
| `/embroidered-patches/` `/sublimation-patches/` `/woven-patches/` | Product pages with SEO content, shapes, borders, backing, applications, FAQ, built-in quote form (category preselected) |
| `/custom-patch-manufacturing/` | Custom manufacturing |
| `/oem-private-label/` | OEM & private label |
| `/gallery/` | Filterable gallery + lightbox |
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

1. **WhatsApp number** → `NEXT_PUBLIC_WHATSAPP_NUMBER` (floating button, contact page, footer appear automatically).
2. **Social links** → `NEXT_PUBLIC_*_URL` (icons appear automatically).
3. **Real product photos** → put them in `public/gallery/` and set `src` in `src/lib/gallery.ts`.
   Until then the site uses vector patch illustrations.
4. **Genuine customer reviews** (with permission) → `src/lib/testimonials.ts`. None are invented.
5. **Domain** → `NEXT_PUBLIC_SITE_URL`.
6. **Google** → `NEXT_PUBLIC_GA_ID` (Analytics 4) and `GOOGLE_SITE_VERIFICATION` (Search Console),
   then submit `https://your-domain/sitemap.xml` in Search Console.

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
