# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

A premium **Indian restaurant** website template — single-page, vanilla HTML5 / CSS3 / JavaScript with no build tools or frameworks. The demo brand is **Zaffran**, a modern Indian fine dining restaurant in New York City. The site is designed to be sold as a template or service to Indian restaurant owners.

**Files:**

| File | Size | Purpose |
|---|---|---|
| `index.html` | ~77 KB | All markup, content, SEO tags, schema |
| `styles.css` | ~47 KB | All styles, CSS variables, responsive layout |
| `script.js` | ~17 KB | All interactivity — no external JS dependencies |

---

## Running the Site

Open `index.html` directly in a browser, or serve locally:

```bash
python -m http.server 8000
# or
npx serve .
```

No build step. No dependencies to install.

---

## Restaurant Information (Demo Data)

All of this lives in `index.html` and the JSON-LD `<script>` block in `<head>`. Replace every field when deploying for a real client.

| Field | Demo Value |
|---|---|
| Name | Zaffran |
| Tagline | Where Ancient Spice Meets Modern Soul |
| Established | 2011 |
| Location | New York City |
| Address | 218 East 58th Street, New York, NY 10022 |
| Phone | +1 (555) 876-5432 |
| Email | reservations@zaffrannyc.com |
| Website | https://zaffrannyc.com |
| WhatsApp | https://wa.me/15558765432 |
| Chef | Chef Arjun Mehta |
| Price Range | $$$ |
| Cuisine | Indian, Modern Indian, Fine Dining |
| Michelin Stars | 2 (since 2017) |
| Google Reviews | 4.9 / 5 · 1,243 reviews |
| Instagram | @zaffrannyc |
| Facebook | /zaffrannyc |

**Opening Hours:**
- Monday: Closed
- Tuesday – Thursday: 5:30 PM – 10:00 PM
- Friday – Saturday: 5:30 PM – 11:00 PM
- Sunday: 12:00 PM – 9:00 PM

**Hero Stats (animated counters):**
- 13 Years of Excellence
- 2 Michelin Stars
- 1,243 Five-Star Reviews
- 149 Spices Mastered

---

## Page Sections (in DOM order)

### 1. Navigation (`#mainNav`)
- Sticky, fixed to top
- Transparent on load; gets `.scrolled` class (frosted glass background) when `window.scrollY > 60`
- Logo: `✦ Zaffran`
- Nav links: Our Story · Signature Dishes · Menu · Experience · Gallery · Contact
- Right side: theme toggle button, "Reserve Table" CTA (`btn--primary btn--sm`), hamburger (mobile only)
- Active link: `.active` class set by `IntersectionObserver` in `initActiveNavLinks()`

### 2. Mobile Menu (`#mobileMenu`)
- Slides in from the right (`translateX(100%)` → `translateX(0)`)
- Same links as desktop nav plus Reviews
- Overlay (`#menuOverlay`) covers the rest of the page with blur
- Closes on: close button, overlay click, Escape key, any link click
- Footer in drawer shows phone + email

### 3. Hero (`#hero`)
- Full-screen (`100dvh`, min 680px)
- Background image: `photo-1585937421612-70a008356fbe` (Indian food spread, Unsplash)
- Dark overlay gradient on image
- CSS `heroZoom` animation: image scales from 1.05 → 1 over 12s
- Eyebrow: "Est. 2011 · New York City"
- `<h1>`: "Zaffran" with animated saffron underline (`heroLineIn` keyframe, fires after 1.4s)
- Tagline: italic, Cormorant Garamond font
- Two CTAs: "Reserve a Table" (`.btn--primary`) and "View Menu" (`.btn--ghost`)
- Glassmorphism stats bar (`.hero__stats`): 4 counters animated via `data-count` attribute
- Scroll indicator: animated pulsing line with "Discover" label

### 4. About (`#about`)
- Two-column grid: images left, text right
- Main image: `photo-1577219491135-ce391730fb2c` (chef)
- Accent image (overlapping bottom-right): `photo-1574484284002-952d92456975` (curry) with "Chef's Pride" badge
- Story: Rajasthan royal kitchens + Paris training → founded 2011
- Chef quote: *"Indian cuisine is not just food. It is memory, ritual, and love — layered in a single bite."*
- Three value cards: Farm to Tandoor · Michelin Starred · 149 Spices
- CTA: "Book Your Experience" → `#reservation`

### 5. Signature Dishes (`#dishes`)
- Background: `section--dark` (`--c-bg-2`)
- 3-column card grid, 6 dishes total:

| Dish | Category | Price | Badge | Tags |
|---|---|---|---|---|
| Galouti Kebab | Starter | $26 | Chef's Pride | ⭐ Most Loved |
| Butter Chicken Royale | Main | $42 | Signature (gold) | 🍛 #1 Ordered |
| Zaffran Dum Biryani | Main | $48 | House Special (gold) | 🌟 Award Winner |
| Rasmalai Tres Leches | Dessert | $16 | Dessert (rose) | 🍮 Guest Favourite |
| Tandoori Jhinga | Starter | $34 | — | 🌟 Tasting Menu |
| Dal Makhani | Main | $28 | Vegetarian (green) | 👨‍🍳 Chef Recommends |

- Cards have hover: `translateY(-8px)` + image zoom
- Badge colours: default (dark glass + gold border) · `--gold` (filled gold) · `--rose` (red) · `--green` (green)
- Footer CTA: "Explore Full Menu" → `#menu`

### 6. Interactive Menu (`#menu`)
- Live search (`#menuSearch`) + category filter tabs (`.menu-filter`)
- **Filter categories:** All · Starters · Mains · Breads & Rice · Desserts · Beverages
- Grid is 2-column; items hidden/shown via `.hidden` class in JS
- `#menuEmpty` shown (via `hidden` attribute removal) when no results match
- Footer note: seasonal menu · house-made spice blends · Jain/Vegan on request · 12.5% service charge

**Full menu items:**

*Starters*
| Name | Tags | Price |
|---|---|---|
| Galouti Kebab | ⭐ Star Dish · 👨‍🍳 Chef's Choice | $26 |
| Tandoori Jhinga | ⭐ Star Dish | $34 |
| Dahi Ke Sholay | 🌿 Vegetarian | $18 |
| Burrah Kebab | 👨‍🍳 Chef's Choice | $32 |
| Mushroom Galouti | 🌿 Vegetarian · ⭐ Star Dish | $24 |
| Mulligatawny Velouté | 🌿 Vegetarian | $16 |

*Mains*
| Name | Tags | Price |
|---|---|---|
| Butter Chicken Royale | ⭐ Star Dish · 👨‍🍳 Chef's Pride | $42 |
| Zaffran Dum Biryani (lamb/chicken/veg) | ⭐ Star Dish | $48 |
| Kashmiri Rogan Josh | 👨‍🍳 Chef's Choice | $46 |
| Malabar Crab Curry | ⭐ Star Dish | $58 |
| Dal Makhani | 🌿 Vegetarian · ⭐ Star Dish | $28 |
| Paneer Tikka Makhana | 🌿 Vegetarian | $32 |

*Breads & Rice*
| Name | Tags | Price |
|---|---|---|
| Warqi Paratha | 🌿 Vegetarian | $8 |
| Peshwari Naan | 🌿 Vegetarian · 👨‍🍳 House Favourite | $9 |
| Zaffrani Pulao | 🌿 Vegetarian | $12 |

*Desserts*
| Name | Tags | Price |
|---|---|---|
| Rasmalai Tres Leches | ⭐ Star Dish · 🌿 Vegetarian | $16 |
| Gulab Jamun Soufflé | 🌿 Vegetarian · 👨‍🍳 Chef's Choice | $18 |
| Shahi Tukda | 🌿 Vegetarian · ⭐ Star Dish | $18 |
| Jalebi & Rabri | 🌿 Vegetarian | $14 |

*Beverages*
| Name | Tags | Price |
|---|---|---|
| Zaffran Signature Lassi (3 flavours) | 🌿 Vegetarian · ⭐ House Special | $12 |
| Masala Chai Ceremony | 🌿 Vegetarian · ☕ Ritual | $14 |
| Spice Route Cocktails | — | $18–26 |
| Curated Wine Selection | 🍷 Sommelier Pick | $16+ |

### 7. Dining Experience (`#experience`)
- Background: `section--dark`
- 3-column CSS grid with `.experience__card--large` spanning 2 columns
- 5 named spaces:

| Space | Description | Image |
|---|---|---|
| The Darbar Hall | Main dining, 65 guests, Mughal miniatures | `photo-1517248135467-4c7edcad34c4` |
| The Zenana Suite | Private dining, up to 18 guests | `photo-1424847651672-bf20a4b0982b` |
| The Spice Route Bar | Indian whisky & craft cocktails | `photo-1510812431401-41d2bd2722f3` |
| Jasmine Terrace | Al fresco, string lights | `photo-1544148103-0773bf10d330` |
| The Maharaja's Table | 9-course open-kitchen tasting | `photo-1550966871-3ed3cdb5ed0c` |

- 4 feature tiles below grid: Private Events · Family Sundays · Festival Menus (Diwali/Eid/Holi) · Proposals

### 8. Testimonials (`#testimonials`)
- Rating summary: ★★★★★ 4.9/5 · 1,243 reviews · link to Google
- Auto-advancing carousel (5s interval), pauses on hover
- 6 reviews from: James Morrison · Priya Krishnamurti · Robert Patel · Lucía Alvarez · Divya Walia · Nina Kowalski
- Per-view: 3 cards (desktop) · 2 (tablet ≤1024px) · 1 (mobile ≤640px)
- Dot navigation generated dynamically; prev/next arrow buttons
- Swipe support on touch devices

### 9. Reservation (`#reservation`)
- Background: `section--dark`
- Two-column: contact details left, form right
- Form fields (all validated client-side):
  - First Name, Last Name (required, min 2 chars)
  - Email (required, regex), Phone (required, min 7 chars)
  - Date (required, min = today), Time select (5:30–9:30 PM slots)
  - Guests select (1–8+), Special Occasion select
  - **Dietary Requirements** select: None · Vegetarian · Vegan · **Jain** · **Halal** · Gluten Free · Other
  - Special Requests textarea
- Submit: disables button, shows loading text (1.2s simulated delay), then hides form and shows `#reservationSuccess`
- Success message: "Shukriya! We'll confirm your table within 2 hours…"
- Inline validation: error on blur, clears on fix; `.error` and `.valid` classes on inputs
- **Note:** form currently only simulates submission. Wire to Formspree, Netlify Forms, or a backend endpoint via the `action` attribute or a `fetch()` call in `initReservationForm()` in `script.js`

### 10. Gallery (`#gallery`)
- Category filter: All · Food · Interior · Events · Chef (`.gallery-filter` / `data-gfilter`)
- Masonry layout: CSS `columns: 3` (2 on mobile, 1 on very small)
- 9 images — items use `data-gcat` for filter matching, hidden via `.g-hidden` class
- Hover: slight scale + magnifier icon overlay
- Each item is a `<button>` that opens the lightbox

**Gallery images (in DOM order):**
1. Butter Chicken Royale — food — `photo-1588166524941-3bf61a9c41db`
2. Darbar Hall (tall) — interior — `photo-1517248135467-4c7edcad34c4`
3. Chef Arjun Mehta — chef — `photo-1577219491135-ce391730fb2c`
4. Dum Biryani — food — `photo-1563379091339-03b21ab4a4f8`
5. Spice Route Bar (wide) — interior — `photo-1510812431401-41d2bd2722f3`
6. Dal Makhani — food — `photo-1574484284002-952d92456975`
7. Zenana Suite / Diwali event (tall) — events — `photo-1424847651672-bf20a4b0982b`
8. Rasmalai Tres Leches — food — `photo-1571171637578-41bc2dd41cd2`
9. Tandoori Jhinga — food — `photo-1567188040759-fb8a883dc6d8`

### 11. Lightbox (`#lightbox`)
- Triggered by clicking any `.gallery__item`
- Full-screen modal with backdrop blur
- Prev/Next arrows (keyboard ← →, touch swipe supported)
- Close: ✕ button, backdrop click, Escape key
- Caption pulls from `<img alt="">`
- Entry animation: `lightboxIn` keyframe (scale 0.95 → 1)

### 12. Awards (`#awards`)
- Background: `section--dark`
- 4-column card grid

| Award | Detail |
|---|---|
| Michelin Guide | Two Stars — 2017–2024 |
| James Beard Award | Best New Restaurant, 2013 |
| World's 50 Best | #38 Best Restaurant, 2023 |
| NY Times | Three Stars, 2022 — Pete Wells |

- Press logos row: The New York Times · Bon Appétit · Food & Wine · Condé Nast Traveller · Eater NY

### 13. Contact (`#contact`)
- Two-column: info left, Google Maps iframe right
- Address: 218 East 58th Street, New York, NY 10022
- Phone: +1 (555) 876-5432
- Email: reservations@zaffrannyc.com
- Hours table (Mon closed, Tue–Thu 5:30–10, Fri–Sat 5:30–11, Sun 12–9)
- Social icons: Instagram · Facebook · Twitter/X · TikTok (all `href="#"` placeholders)
- Google Maps embed: East 58th St, New York (placeholder embed URL — replace with real address)

### 14. Footer
**Top section (`footer__top`):** 4-column grid
- Brand column: logo, tagline, address, phone
- Explore links: Our Story · Signature Dishes · Full Menu · Dining Experience · Gallery · Awards
- Reserve links: Book a Table · Private Dining · The Maharaja's Table · Call Us · Email Us
- Newsletter: email input + Subscribe button (simulated, shows success message for 5s)

**Bottom bar (`footer__bottom`):**
- Copyright with dynamic year (`#currentYear` set by JS)
- Social icons (Instagram · Facebook · Twitter/X)
- Privacy Policy · Terms of Service links

### 15. Floating Action Buttons (`.floating-actions`)
Fixed bottom-right, three FABs stacked:
1. **Reserve** (`.fab--primary`, gold) → `#reservation` — shows "Reserve" label on hover
2. **WhatsApp** (`.fab--whatsapp`, green) → `https://wa.me/15558765432`, `target="_blank"`
3. **Call** (`.fab--call`, card background) → `tel:+15558765432`

### 16. Scroll Progress Bar (`#scrollProgress`)
- Fixed 2px bar at very top of viewport (z-index 9999)
- Width % set inline by `initScrollProgress()` on every scroll event
- Gradient: `--c-gold-dark` → `--c-gold` → `--c-gold-light`

---

## Design System (`styles.css`)

### Color Tokens

```css
/* Dark theme (default, :root) */
--c-bg:          #080808   /* page background */
--c-bg-2:        #0e0e0e   /* alternate section background (section--dark) */
--c-bg-3:        #141414   /* mobile menu background */
--c-card:        #161616   /* card / form background */
--c-card-hover:  #1e1e1e
--c-gold:        #d4962a   /* primary saffron-gold accent */
--c-gold-light:  #f0c060
--c-gold-dark:   #a06818
--c-gold-dim:    rgba(212,150,42,.15)  /* tinted backgrounds */
--c-text:        #f0ebe0   /* primary text */
--c-text-2:      #a09480   /* secondary text */
--c-text-muted:  #5a5248   /* muted / placeholder text */
--c-border:      rgba(212,150,42,.18) /* gold-tinted borders */
--c-border-2:    rgba(255,255,255,.06) /* subtle borders */
--c-glass:       rgba(255,255,255,.04) /* glassmorphism fill */
--c-glass-border:rgba(255,255,255,.08)
--c-success:     #4caf82
--c-error:       #e05c5c

/* Light theme ([data-theme="light"] on <html>) */
--c-gold:        #b8720a
--c-gold-light:  #d4962a
--c-bg:          #f8f5ef
--c-bg-2:        #f0ebe0
--c-card:        #ffffff
--c-text:        #1a1510
```

Theme is toggled by `initThemeToggle()` — adds/removes `data-theme="light"` on `<html>` and persists to `localStorage` under key `eo-theme`.

### Typography

| Role | Font | Weights |
|---|---|---|
| `--font-display` | Playfair Display (serif) | 400, 500, 700, italic |
| `--font-accent` | Cormorant Garamond (serif) | 300, 400, 500, 600, italic |
| `--font-body` | Inter (sans-serif) | 300, 400, 500, 600 |

- Section titles: `font-family: var(--font-display)`, `clamp(2rem, 5vw, 3.5rem)`
- Hero title: `clamp(4rem, 12vw, 9rem)`
- Italic `<em>` inside `.section-title` renders in `--c-gold`
- Quotes / taglines: Cormorant Garamond italic

### Spacing Scale

```
--space-xs:  0.5rem
--space-sm:  1rem
--space-md:  1.5rem
--space-lg:  2.5rem
--space-xl:  4rem
--space-2xl: 6rem
--space-3xl: 8rem   (reduced at tablet/mobile breakpoints)
```

### Button Variants

All buttons share the `.btn` base class. Variants:

| Class | Style |
|---|---|
| `btn--primary` | Gold fill, dark text |
| `btn--ghost` | Transparent, white border (hero only) |
| `btn--outline` | Transparent, gold border |
| `btn--sm` | Smaller padding (nav CTA) |
| `btn--lg` | Larger padding (hero / section CTAs) |
| `btn--full` | `width: 100%` (form submit) |

### Reveal Animation System

Any element with class `reveal` starts at `opacity: 0; transform: translateY(30px)` and transitions to visible when `IntersectionObserver` fires (`threshold: 0.12`). Stagger delays via:
- `reveal--delay-1` → 0.1s
- `reveal--delay-2` → 0.2s
- `reveal--delay-3` → 0.3s
- `reveal--delay-4` → 0.4s

Hero `.reveal` elements are triggered immediately (100ms timeout) rather than on scroll.

### CSS Keyframes

| Name | Used on | Effect |
|---|---|---|
| `heroZoom` | `.hero__img` | scale 1.05→1 over 12s |
| `heroLineIn` | `.hero__title span::after` | saffron underline width 0→60% after 1.4s |
| `scrollPulse` | `.hero__scroll-line` | pulsing vertical line |
| `lightboxIn` | `.lightbox__img` | scale 0.95→1 on open |

### Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤ 1024px` (tablet) | Nav links hidden, hamburger shown; about/awards/experience go 2-col; testimonials show 2 cards |
| `≤ 640px` (mobile) | Most grids go 1-col; hero actions stack; gallery goes 2-col masonry; form rows stack |
| `≤ 400px` | Hero stats hidden; gallery 1-col; awards 1-col |
| `prefers-reduced-motion` | All animations/transitions set to 0.01ms |

---

## JavaScript (`script.js`)

All functions are called from the `DOMContentLoaded` listener. No external libraries.

| Function | What it does |
|---|---|
| `initScrollProgress()` | Updates `#scrollProgress` width on every scroll |
| `initNav()` | Adds `.scrolled` to `#mainNav` when `scrollY > 60` |
| `initMobileMenu()` | Open/close slide-in drawer, overlay, body scroll lock |
| `initThemeToggle()` | Toggles `data-theme` on `<html>`, persists to `localStorage` |
| `initRevealAnimations()` | `IntersectionObserver` on all `.reveal` elements |
| `initCounters()` | Animates `[data-count]` numbers from 0 using ease-out cubic |
| `initTestimonialCarousel()` | Auto-play, prev/next, dots, touch swipe, responsive per-view |
| `initMenuFilter()` | Category buttons + live search on `#menuGrid` items |
| `initGalleryFilter()` | Category buttons on `.gallery__item` via `data-gcat` |
| `initLightbox()` | Opens `#lightbox` on gallery click; keyboard + swipe nav |
| `initReservationForm()` | Client-side validation, loading state, success reveal |
| `initNewsletterForm()` | Email validation, simulated submit, success/reset |
| `initActiveNavLinks()` | `IntersectionObserver` sets `.active` on matching nav link |
| `setCurrentYear()` | Sets `#currentYear` text content |
| `initDateMin()` | Sets `min` attribute on `#date` input to today |

### Menu Filter Data Attributes

Each `.menu-item` requires two attributes that drive filtering and search:

```html
<div class="menu-item"
  data-category="mains"
  data-name="butter chicken royale mains chicken">
```

- `data-category` must exactly match a `data-filter` value on a `.menu-filter` button
- `data-name` is lowercased and searched against the trimmed search input — include ingredient aliases for better discoverability

### Tag Classes

| Class | Colour | Use |
|---|---|---|
| `tag--star` | Gold tint | ⭐ Star Dish |
| `tag--chef` | Orange tint | 👨‍🍳 Chef's Choice / Chef's Pride |
| `tag--veg` | Green tint | 🌿 Vegetarian |

---

## SEO & Meta

All in `<head>` of `index.html`:

- `<meta name="description">` — local Indian restaurant SEO
- `<meta name="keywords">` — includes "Indian restaurant near me", "best Indian restaurant NYC"
- `<link rel="canonical">` → `https://zaffrannyc.com/`
- Open Graph: title, description, image (`photo-1585937421612-70a008356fbe`), url, site_name
- Twitter Card: `summary_large_image`
- JSON-LD `Restaurant` schema: name, address, geo, phone, email, hours, `aggregateRating`, `servesCuisine`, `sameAs`
- Preconnect to `fonts.googleapis.com`, `fonts.gstatic.com`, `images.unsplash.com`
- All images have descriptive `alt` text including dish name and key ingredients
- Heading hierarchy: one `<h1>` (Zaffran in hero) → `<h2>` per section → `<h3>` for cards and menu items

---

## Customising for a Real Client

1. **Brand:** Find-replace `Zaffran` across `index.html`; update tagline, chef name, About story and quote
2. **Contact:** Update phone, email, address, WhatsApp number, and Google Maps iframe `src` — also update the JSON-LD block in `<head>`
3. **Hours:** Update both the Contact section table and the JSON-LD `openingHoursSpecification` array
4. **Menu:** Edit `.menu-item` blocks; keep `data-category` matching a filter button's `data-filter`; include dish keywords in `data-name`
5. **Signature Dishes:** Edit the 6 `.dish-card` articles; update image URLs, prices, badges, descriptions
6. **Gallery:** Replace Unsplash URLs with real photography; update `alt` text; update `data-gcat` if categories change
7. **Hero image:** Replace `photo-1585937421612-70a008356fbe` in both `<img src>` and OG/Twitter meta tags
8. **Awards:** Edit `.award-card` blocks; update press logos
9. **Testimonials:** Edit the 6 `.testimonial-card` articles
10. **Form submission:** In `initReservationForm()` in `script.js`, replace the `await new Promise(r => setTimeout(r, 1200))` simulation with a real `fetch()` POST to Formspree, Netlify Forms, or a custom endpoint
11. **Newsletter:** Same pattern — replace simulation in `initNewsletterForm()`
12. **Social links:** Replace all `href="#"` on `.contact__social-link` and footer social icons
13. **Hero stats:** Update `data-count` values and `.hero__stat-label` text to match the real restaurant
14. **SEO:** Update `<title>`, meta description, keywords, canonical URL, and all OG/Twitter tags
