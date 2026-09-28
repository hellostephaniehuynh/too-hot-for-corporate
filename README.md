# too hot for corporate. — website

A static site: no build step, no framework. Just open `index.html` or serve the folder.

## Pages

- `index.html` — home: hero, manifesto, product teasers, movement-wide waitlist
- `products.html` — full list of pending drops
- `product-hat.html` — the dad hat, specs + waitlist
- `moments.html` — "the record": anonymous story submissions + the public wall
- `privacy-policy.html` / `terms.html` — legal
- `404.html` — custom not-found page (Netlify serves this automatically for any unmatched route)

## Turning on the waitlist / record forms (Formspree)

Forms submit via [Formspree](https://formspree.io). Most already have a real
form ID (`xgawlzzl`); the one exception is the "file a report" form on
`moments.html`, which is still pointed at the placeholder `YOUR_FORM_ID` (see
below).

1. Create a free account at [formspree.io](https://formspree.io) if you
   haven't, or reuse the existing form.
2. To wire up the record form specifically: create a new Formspree form (a
   separate one keeps story submissions out of your waitlist inbox), copy its
   ID, and in `moments.html` find:
   ```html
   <form class="waitlist-form" data-formspree-id="YOUR_FORM_ID" data-product="moment" ...>
   ```
   and swap in the real ID.
3. Reload and submit a test entry — it lands in your Formspree dashboard.

Every form includes a hidden honeypot field (`_gotcha`) — Formspree's
built-in spam trap. Real visitors never see or fill it; simple bots do, and
Formspree silently discards those submissions server-side. No setup needed,
it just works once the form ID is real.

Each form also carries a hidden `product` (or similar) field so you can tell
which form an entry came from, even sharing one Formspree form across
several.

## "The record" — moderation workflow

Story submissions do **not** auto-publish. They land in your Formspree inbox
for review. To add an approved one to the live page, copy the
`.record-card` block in `moments.html`, fill in the moment text and whatever
optional details the submitter included, and bump the report number. It's
manual by design — there's no database behind this, just hand-edited HTML.

## Editing content

- **Product specs** (material, price, sizing) in `product-hat.html` are
  placeholder drafts — search for "not finalized" and "TBD" and swap in real
  numbers when you have them.
- **Brand assets** live in `images/` — `smiley-yellow.png` (mark) and
  `wordmark-cream.png` (wordmark), pulled from your original files.
- **Colors/fonts** are all defined as CSS variables at the top of
  `css/style.css` under `:root` — change them once, they update everywhere.
- **Ticker text** (the scrolling strip at the top of every page) is repeated
  twice in each HTML file for the seamless loop — edit both copies to match.
- **Favicons** (`favicon.ico`, `images/favicon-*.png`, `apple-touch-icon.png`,
  `icon-192.png`, `icon-512.png`) are all generated from `images/smiley-yellow.png`.
  Regenerate them from that source if the mark ever changes.

## SEO / launch basics already in place

- `sitemap.xml` and `robots.txt` at the site root
- Unique `<title>` and meta description per page
- Open Graph + Twitter Card tags with a shared 1200×630 share image
  (`images/og-image.png`) on every page
- No cookies, no analytics, nothing tracked — which is also why there's no
  cookie-consent banner; if that ever changes, update `privacy-policy.html`
  first
- HTTPS is enforced automatically by Netlify (HTTP redirects to HTTPS) —
  nothing to configure

## Deploying to toohotfor.com

The site is deployed via Netlify, connected to a GitHub repo for
continuous deployment: every push to `main` triggers an automatic rebuild,
usually live within a minute. No manual drag-and-drop needed once that
connection exists.

If you're setting this up fresh instead:

1. Drag the `website` folder onto Netlify's deploy page (or connect it as a
   GitHub repo and deploy from there) — no build settings needed, it's static.
2. Once deployed, go to the project's domain settings and add `toohotfor.com`
   as a custom domain, then update your DNS records at your domain registrar
   per their instructions.

GitHub Pages or Vercel work the same way if you'd rather host it there.
