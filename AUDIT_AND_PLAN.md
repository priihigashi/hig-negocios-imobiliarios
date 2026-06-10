# Hig Negócios Imobiliários — Site Audit & In-Depth Plan
**Repo:** `priihigashi/hig-negocios-imobiliarios` · **Live:** https://priihigashi.github.io/hig-negocios-imobiliarios/
**Author:** Claude (Opus 4.8) · **Date:** 2026-06-10 · **Status:** for Codex audit
**Brand rule:** always `Hig Negócios Imobiliários` / `hig-negocios-imobiliarios` — never `higashi-imoveis` / `Higashi Imóveis`.

> This document is meant to be **audited by Codex**. Every finding and task carries an explicit
> `Verify:` line (a grep/curl/command or observable condition) so the audit is pass/fail, not opinion.
> Run all `Verify:` commands from the repo root unless noted.

---

## A. INVENTORY — what exists right now

### A1. Live site (Version A) — INDEXED, production
| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | hero, stats, featured, grid, sobre, **bairros**, **como funciona**, **depoimentos**, footer |
| Listings | `imoveis.html` | filters + grid (from `js/listings.js`) |
| Detail | `imovel.html` | gallery/lightbox/zoom, specs, features, similar — data-driven by `?id=` |
| About | `sobre.html` | about, values, regions, CTA |
| Contact | `contato.html` | methods, hours, WhatsApp form, FAQ |

### A2. Labs (design-direction prototypes) — NOINDEX
| Version | Files | Style / inspiration |
|---|---|---|
| Hub | `labs.html` | versions menu + inspiration library |
| B (full, 5 pages) | `index-b, imoveis-b, imovel-b, sobre-b, contato-b .html` | Atelier / Architectural Bureau |
| C (home only) | `index-c.html` | Editorial Noir / LMTD Space v2 |
| D (home only) | `index-d.html` | Estilo de Vida / Spot Dev (lifestyle selector) |

### A3. Shared / infra
- `js/listings.js` — single source of truth for all properties (2 real `listed:true`, 4 dummy).
- `images/` — all imagery (reused; **no AI images generated** in this work).
- `sitemap.xml`, `robots.txt`, `favicon.svg` — added 2026-06-10.
- Tracker: **Higashi Imobiliária — Website Tracker** `1qJnILSR_XOgRaPdTHYy1Qx1gnSyzQTj2E04u8kErfYw`
  (tabs: Tasks, SEO, Backend, Photo Catalog, Urbanova Gallery Audit, **🧪 Versões / Labs**, **💡 Inspirações**).

`Verify A:` `ls index.html imoveis.html imovel.html sobre.html contato.html labs.html index-b.html index-c.html index-d.html sitemap.xml robots.txt favicon.svg js/listings.js` → all exist.

---

## B. AUDIT FINDINGS (severity-tagged, with evidence + verify)

### 🔴 B1 — Placeholder contact data sitewide (BLOCKER for go-live)
Fake WhatsApp `5512999999999` (~50×), CRECI `000000` (4×), fake JSON-LD phone `+55-12-99999-9999`.
The site cannot actually contact Alexandra; structured data ships a fake phone.
- **Owner:** needs Priscila to supply real WhatsApp + CRECI number.
- `Verify:` `grep -rho '5512999999999' *.html | wc -l` → must become `0` after fix (replaced by real number).
- `Verify:` `grep -rn '000000' *.html` → none after fix.

### 🟠 B2 — `imovel.html` canonical is identical for all `?id=` listings
All listing detail pages canonicalize to `…/imovel.html` (no `?id=`), so Google collapses every
property into one URL → individual listings cannot rank, and per-listing OG/social previews are wrong.
- `Verify:` `grep 'rel="canonical"' imovel.html` → currently static `…/imovel.html`.
- **Fix target:** canonical + OG set dynamically from `?id=` in the page's JS (see C2), OR pre-render per-listing pages.

### 🟠 B3 — Testimonials are fabricated
`index.html` "O que dizem nossos clientes" has 3 invented quotes (Família Souza / R. Mendes / C. Oliveira).
Acceptable as visual placeholder, **not** acceptable as published social proof.
- `Verify:` `grep -c 'testi-card' index.html` → 3 cards; replace text with real client quotes (Priscila to supply) or remove section until available.

### 🟡 B4 — Cross-version navigation leaks between prototypes
Version C and D have no own listing/detail pages, so they link into **Version B** pages.
- Evidence: `index-c.html` → `imovel-b.html` ×1; `index-d.html` → `imovel-b.html` ×1, `imoveis-b.html` ×4.
- Effect: clicking a property in C/D drops the user into a B-styled page (visual whiplash).
- **Decision needed:** acceptable for a prototype-compare phase? If a direction is chosen, build its own inner pages (see C5).
- `Verify:` `grep -o 'imo[ve][a-z-]*-b.html' index-c.html index-d.html | sort | uniq -c`.

### 🟡 B5 — Prototypes have no Open Graph
B/C/D + labs are correctly `noindex,follow`, but have no `og:*`, so WhatsApp link previews are bare.
Low impact while internal-only; fix before sharing any prototype link externally.
- `Verify:` `grep -L 'property="og:' index-b.html index-c.html index-d.html` → currently all (none have OG).

### 🟢 B6 — Cosmetic / hygiene
- Logo text inconsistent: B = "HIG Negócios Imob.", C/D = "HIG Negócios". Pick one.
  `Verify:` `grep -h 'class="logo"' index-b.html index-c.html index-d.html`.
- Dead JS in `index-c.html`: `getElementById('rows-count').insertAdjacentText('afterend','')` is a no-op.
  `Verify:` `grep -n 'rows-count' index-c.html`.
- Unused CSS var `--green` in `index-d.html`. `Verify:` `grep -c -- '--green' index-d.html` (defined, never used).
- No `404.html`. `Verify:` `ls 404.html` → missing.
- Emoji amenity icons in D not `aria-hidden`/labeled. `Verify:` `grep -c 'class="ico"' index-d.html`.

### 🟢 B7 — Performance / a11y baseline not yet addressed
Large JPEGs, no `width`/`height` on `<img>` (CLS), hero not `preload`ed, no responsive `srcset`.
- `Verify:` `python3 -c "import re;print(sum(len(re.findall(r'<img(?![^>]*\bwidth=)',open(f).read())) for f in ['index.html','imoveis.html','imovel.html','sobre.html','contato.html']))"` → count of imgs missing width (target → 0 after C7).

### ✅ B8 — What PASSED (do not regress)
- All 5 live pages: `title`, `description`, `canonical`, `og:*`, `index`. `Verify:` see C-audit §D.
- All 8 prototypes: `noindex`. `Verify:` `grep -L noindex index-b.html imoveis-b.html imovel-b.html sobre-b.html contato-b.html index-c.html index-d.html labs.html` → empty.
- OG domain bug fixed (no `copy-hig-negocios-imobiliarios`). `Verify:` `grep -rl 'copy-hig-negocios' . --include=*.html` → empty.
- `sitemap.xml` / `robots.txt` / `favicon.svg` live 200. `Verify:` `for u in sitemap.xml robots.txt favicon.svg; do curl -s -o /dev/null -w "%{http_code} $u\n" https://priihigashi.github.io/hig-negocios-imobiliarios/$u; done`.
- No real broken local links (the regex "hits" are JS template literals inside `<script>`). `Verify:` confirm each flagged ref sits inside a `<script>` block.

---

## C. IN-DEPTH PLAN (phased, each task has Acceptance Criteria)

> Phasing principle: **go-live correctness first (P1)**, then **SEO depth (P2)**, then
> **direction lock + build-out (P3)**, then **polish/perf (P4)**. P1 unblocks a real launch.

### PHASE 1 — Correctness & go-live blockers
- **C1. Real contact data.** Replace `5512999999999` → real WhatsApp; `000000` → real CRECI; set real
  JSON-LD `telephone` (or remove the field). Centralize the number so it's edited once.
  - *Acceptance:* `grep -rho '5512999999999' *.html | wc -l` = 0; CRECI shows real value; WhatsApp links open the real chat.
  - *Blocker:* Priscila must supply number + CRECI.
- **C2. Per-listing canonical + OG on `imovel.html`.** In the existing init JS, set
  `<link rel="canonical">` and `og:url/og:title/og:image/og:description` from the resolved `LISTING`
  (`…/imovel.html?id=<slug>`, `LISTING.cover`, `LISTING.title`, `LISTING.desc`).
  - *Acceptance:* viewing `?id=eco-park-cacapava` yields canonical `…?id=eco-park-cacapava` and og:image = that listing's cover (check via DOM after load).
- **C3. Testimonials honesty.** Replace 3 placeholders with real quotes OR hide the section behind a
  comment until supplied. No fabricated names in production.
  - *Acceptance:* testimonials are real, or the `.testi` section is absent from rendered home.

### PHASE 2 — SEO depth (build on the P1 base)
- **C4. Per-listing structured data.** Add JSON-LD (`@type` `Residence`/`Product` with `offers.price`,
  `numberOfRooms`, `floorSize`, `image`) generated from `LISTING` on `imovel.html`.
  - *Acceptance:* Google Rich Results test passes for a listing URL; `grep 'application/ld+json' imovel.html`.
- **C5. Listing URLs in sitemap.** Add the two real `listed:true` listing URLs (with `?id=`) to `sitemap.xml`.
  - *Acceptance:* `curl -s …/sitemap.xml | grep -c '?id='` ≥ 2.
- **C6. Bairros copy review.** Validate the 6-neighborhood copy with Priscila/Alexandra for accuracy
  (Urbanova hillside framing is per the image-rules doc; confirm no over-claims).
  - *Acceptance:* Priscila signs off in the Tasks tab audit row.

### PHASE 3 — Direction lock + build-out
- **C7. Lock a version (A/B/C/D).** Priscila picks the design direction in the Labs hub.
  - *Acceptance:* a `DECISION` row in **🧪 Versões / Labs** marks the chosen version `✅ ESCOLHIDA`.
- **C8. Complete the chosen direction.** If C or D is chosen, build its `imoveis-/imovel-/sobre-/contato-`
  pages so navigation no longer leaks into Version B (fixes B4). If B is chosen, promote `-b` → root.
  - *Acceptance:* `grep -o 'imo[ve][a-z-]*-b.html' index-<chosen>.html` → 0 cross-links; chosen version has all 5 pages.
- **C9. OG on the chosen direction** (only the one going live needs OG; others stay noindex).

### PHASE 4 — Polish, performance, a11y
- **C10. Perf:** add `width`/`height` to all `<img>`, `loading="lazy"` (non-hero), `<link rel="preload">`
  hero, consider `srcset`/WebP. *Acceptance:* imgs-missing-width count (B7) = 0; Lighthouse Perf ≥ 85 mobile.
- **C11. A11y:** `aria-hidden="true"` on decorative emoji/icons, visible focus states, alt text on every
  content image. *Acceptance:* Lighthouse A11y ≥ 95.
- **C12. `404.html`** branded + link home/imóveis. *Acceptance:* `ls 404.html`; GitHub Pages serves it.
- **C13. Cosmetic:** unify logo text; remove dead `rows-count` JS; drop unused `--green`.
  *Acceptance:* B6 verifies clean.

### Inspiration backlog (from OPC tracker cross-log — apply only after C7)
Carousel gallery (Nidal95 / Tripzo double-slider) → `imovel` gallery; numbered showcase slider → bairros
menu; 49 North parallax → signature scroll; osmosupply bg-swap → Version-D lifestyle selector.
All logged in **💡 Inspirações** tab.

---

## D. CODEX AUDIT CHECKLIST (run top-to-bottom, mark PASS/FAIL)

```bash
cd <repo root>
# D1 no legacy/wrong brand name anywhere
grep -rni 'higashi-imoveis\|Higashi Imóveis\|copy-hig-negocios' --include=*.html . ; echo "expect: no matches"
# D2 live pages indexed + full meta
for f in index imoveis imovel sobre contato; do
  echo "== $f =="; grep -o 'rel="canonical"\|property="og:url"\|name="description"' $f.html | sort -u
done
# D3 prototypes noindex
grep -L noindex index-b.html imoveis-b.html imovel-b.html sobre-b.html contato-b.html index-c.html index-d.html labs.html ; echo "expect: empty"
# D4 contact data is real (P1 done?)
grep -rho '5512999999999' *.html | wc -l ; echo "expect: 0 once C1 done"
# D5 imovel per-listing canonical (P1/C2 done?)
grep -c "canonical.*?id=" imovel.html 2>/dev/null ; echo "or dynamic in JS"
# D6 infra live
for u in '' sitemap.xml robots.txt favicon.svg; do curl -s -o /dev/null -w "%{http_code} /$u\n" https://priihigashi.github.io/hig-negocios-imobiliarios/$u; done
# D7 cross-version leakage (B4)
grep -o 'imo[ve][a-z-]*-b.html' index-c.html index-d.html | sort | uniq -c
# D8 tracker alignment
echo "Open tracker 1qJnILSR_XOgRaPdTHYy1Qx1gnSyzQTj2E04u8kErfYw — Tasks tab: SEO row ✅ Feito + audit rows present; Versões/Inspirações tabs populated."
```

**Audit verdict template (Codex fills in):**
- P1 blockers (C1–C3): ☐ pass ☐ fail — notes:
- SEO base (B8 not regressed): ☐ pass ☐ fail — notes:
- Open items by severity: 🔴 __ 🟠 __ 🟡 __ 🟢 __
- Recommended next action: __________

---

## E. OPEN DECISIONS FOR PRISCILA (not Claude/Codex to decide)
1. Real **WhatsApp number** + **CRECI** (unblocks C1, the only true go-live blocker).
2. **Which version** (A/B/C/D) is the direction (unblocks C7/C8).
3. Real **client testimonials** (unblocks C3) — or approve hiding the section.
4. Sign-off on **bairros copy** accuracy (C6).

---

## F. HIGH-DESIGN / UX AUDIT + MOTION (2026-06-10)

### F1. Per-version design/UX read
- **Version B (Atelier):** strongest editorial minimalism; nav goes solid on inner pages (good), transparent
  over the home hero (legibility marginal over bright sky — gradient saves it). Side rails hidden <1024px ✓.
  *Action:* keep; consider darkening hero gradient top by ~8%.
- **Version C (Editorial Noir):** most "high-design" / luxe. Risk: muted body `#9a8a73` on `#100b04` is
  borderline for small text. *Action:* lighten body to ~`#b3a489` (or +1px size) to clear WCAG AA 4.5:1. No hero image → parallax n/a; uses reveal.
- **Version D (Estilo de Vida):** best UX *concept* (lifestyle selector). Emoji amenity icons read less
  premium than the rest. *Action:* swap emoji → thin SVG line icons.
- **Live A:** warm, dense, good info scent now (bairros/steps/depoimentos). Static by choice; apply motion only if promoted.

### F2. Motion layer SHIPPED — `js/anim.js`
Dependency-free; self-injects CSS; **no-JS safe** (markup visible without it) and **prefers-reduced-motion safe**.
Three effects: reveal-on-scroll (staggered), subtle hero parallax (`.hero-bg` translateY), count-up stats
(preserves prefix/suffix e.g. `R$1.2Bi`). Wired into B/C/D + inner `-b` (NOT live A).
- *Acceptance (verified 2026-06-10):* index-b → `reveal:11 in:11 still-hidden:0` after settle; 0 console errors on B/C/D.
- `Verify:` `grep -l 'js/anim.js' index-b.html index-c.html index-d.html imoveis-b.html imovel-b.html sobre-b.html contato-b.html` → all 7.
- `Verify:` load any prototype with DevTools → no element stuck at `opacity:0` after 3s; `prefers-reduced-motion` → everything visible instantly.

### F3. Curated animation/parallax references (source: OPC "🔖 Inspiration Links" sheet `1q0_v9qYDXKURo59xoS-WISFdHbZWIdc9ukdCDbdDaUQ` + prior cross-log) — logged in **💡 Inspirações**
| Ref | Borrow for Hig |
|---|---|
| LUMEN (jerora98) | scroll-reveal pacing, fine particles, radial glow, serif-italic accent — **Version C ambiance** |
| gradient.pages.dev | obsidian→transparent bottom fade on hero/sections |
| creativeocean fluid hover | liquid hover on **property card tiles → detail** |
| 3D Geometric Aura (russell-henderson) | scroll-pin signature moment (heavy; later) |
| 49 North v2 | vertical→horizontal parallax signature scroll |

### F4. Motion/UX backlog (added to Tasks tab)
- ✅ reveal-on-scroll + hero parallax + count-up (`anim.js`) on prototypes — **done 2026-06-10**
- ☐ Fluid/spotlight hover on property cards (LUMEN/creativeocean)
- ☐ Section bottom gradient fades (gradient.pages.dev)
- ☐ Side-dot scroll nav on Version C (LUMEN)
- ☐ Swap emoji → SVG line icons on Version D amenities
- ☐ WCAG AA contrast fix for Version C muted body text
- ☐ (later) scroll-pin signature element + 49 North directional parallax once a direction is locked
