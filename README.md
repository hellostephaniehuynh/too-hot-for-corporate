# too hot for corporate. — website

A static site: no build step, no framework. Just open `index.html` or serve the folder.

## Pages

- `index.html` — home: hero, manifesto, product teasers, movement-wide waitlist
- `products.html` — full list of pending drops
- `product-hat.html` — the "Off the Clock" hat, specs + waitlist
- `product-croptop.html` — the "Quietly Quit" crop top, specs + waitlist

## Turning on the waitlist forms (Formspree)

Forms are wired to submit via [Formspree](https://formspree.io), but they need
your form ID before they actually collect emails. Right now they're pointed at
a placeholder (`YOUR_FORM_ID`), so submitting just shows the success state
locally without sending anywhere.

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form (you can use one form for the whole site, or a separate
   one per product if you want separate inboxes/CSV exports — up to you).
3. Copy the form ID Formspree gives you (looks like `xrgwzzzz`).
4. In each HTML file, find the line:
   ```html
   <form class="waitlist-form" data-formspree-id="YOUR_FORM_ID" data-product="hat">
   ```
   and replace `YOUR_FORM_ID` with your real ID. There are 4 forms total
   (general waitlist on `index.html` and `products.html`, plus one on each
   product page).
5. Reload and submit a test entry — it'll land in your Formspree dashboard
   and you can set up an email/Zapier/CSV export from there.

Each product form already includes a hidden `product` field so you can tell
which drop an email came from even if you use one shared Formspree form for
everything.

## Editing content

- **Product specs** (material, price, sizing) in `product-hat.html` and
  `product-croptop.html` are placeholder drafts — search for "not finalized"
  and "TBD" and swap in real numbers when you have them.
- **Brand assets** live in `images/` — `smiley-yellow.png` (mark) and
  `wordmark-cream.png` (wordmark), pulled from your original files.
- **Colors/fonts** are all defined as CSS variables at the top of
  `css/style.css` under `:root` — change them once, they update everywhere.
- **Ticker text** (the scrolling strip at the top of every page) is repeated
  twice in each HTML file for the seamless loop — edit both copies to match.

## Deploying to toohotfor.com

Easiest path is [Netlify](https://netlify.com) or [Vercel](https://vercel.com):

1. Drag the `website` folder onto Netlify's deploy page (or connect it as a
   GitHub repo and deploy from there) — no build settings needed, it's static.
2. Once deployed, go to the project's domain settings and add `toohotfor.com`
   as a custom domain, then update your DNS records at your domain registrar
   per their instructions.

GitHub Pages works the same way if you'd rather host it there.
