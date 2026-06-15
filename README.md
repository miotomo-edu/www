# Miotomo — Design System (`miotomo-purple`)

Miotomo is a **voice-first AI learning companion for children aged ~6–12**. A child listens to a short story "episode," talks with topic-native AI characters, and then **teaches what they learned to Tomo** — a friendly alien from the planet Motara who knows nothing about Earth and depends entirely on the child to make sense of it. The loop builds critical thinking, storytelling, debate, public speaking, English proficiency and diplomacy through real spoken conversation.

This project holds **two related but deliberately different design systems** for the same brand:

| System | Surface world | Voice | Lives in | Use for |
|---|---|---|---|---|
| **Web / Marketing** | Deep-purple **night sky**, cinematic, full-bleed illustration | **Fraunces** serif display | `web/`, `styles.css`, `Miotomo Landing.html` | The marketing site, landing pages, brand/launch material |
| **App / Product** | Warm **cream** + immersive **black**, tactile | **Satoshi** bold sans | `colors_and_type.css`, `components.css`, `ui_kits/miotomo-app/` | The mobile app product UI |

> Same brand, two moods. The **website sells the idea** — so it's dark, serif and cinematic, leaning on hand-illustrated scenes and a serif voice. The **app is the experience** — so it's warm, bold-sans and direct, leaning on a golden-yellow primary action. Don't mix the two vocabularies within one surface.

---

## 1. Web / Marketing system (this landing page)

The system derived from **Miotomo Landing.html** — the page you're most likely looking at.

### Files
| File | Purpose |
|---|---|
| `web/web-tokens.css` | All web tokens (CSS custom properties) — surfaces, ink, accents, radii, shadows, spacing, type families & scale, semantic aliases. |
| `web/web-components.css` | Reusable marketing primitives: brand wordmark + dot, buttons, waitlist form, scene cards, skill tiles, definition lists, scene tags, ticker, media frame, reveal. |
| `web/preview/` | One `@dsCard` HTML per spec topic, grouped **Web · Color / Type / Space / Components**. |
| `styles.css` | The live landing-page stylesheet (and the design-system entry point — it `@import`s `web/web-tokens.css`). |
| `Miotomo Landing.html` | The full, canonical marketing surface. The living reference for how it all composes. |

### Load order (consumers)
```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="web/web-tokens.css">
<link rel="stylesheet" href="web/web-components.css">
```

### Content fundamentals (web)
Warm, second-person, parent-reassuring, never clinical or babyish. The headline is a **real, plain promise a kid would understand** — "Teach Tomo about Earth." Body copy is concrete and a little wry ("He notices everything and asks wonderfully odd questions"). Microcopy reassures parents directly and tersely ("No spam, just one launch note"). Numbers/labels are set in **mono, uppercase, wide-tracked** as if stamped by an instrument ("CLOSED BETA · FALL 2026", "AGES 6–12"). Sentence case for headings; lowercase character names ("lucius is talking…"). No emoji in marketing chrome.

### Visual foundations (web)
- **Surfaces** — a deep indigo/purple *night sky* ladder (`--paper #2A2440` → `--paper-2` → `--paper-3`), with a `--navy` for cinematic media panels. The final CTA **inverts** to a warm cream "daylight" surface (`--paper-inverse #F0E6CF`) with near-black ink — the one moment of contrast.
- **Ink** — warm **cream**, never pure white: `--ink #F0E6CF` / `--ink-soft` / `--ink-mute`.
- **Accents** — storybook, all roughly equal chroma: **ochre** `#D9A83C` is the *single action color* (buttons, play, number pills); **coral** `#D9836A` for bullets/pips/highlights; **green** `#8FA05C` is Tomo and the brand dot; terracotta/rose/leaf/sky as seasoning. Italic emphasis in headings is tinted (green-deep on dark, terracotta on cream).
- **Type** — **Fraunces** (opsz serif) for all display, weight 500, tight `-0.018em`, `text-wrap: balance`, italics for emphasis. **Nunito Sans** for lede/body. **JetBrains Mono** for eyebrows, tags, meta, ticker. **Satoshi** is reserved for the "MioTomo" wordmark only.
- **Backgrounds** — a tiled paper **texture** (`assets/texture-bg.png`, ~600px, overlay blend) sits over the purple on every surface. Imagery is **hand-illustrated**, warm, storybook — Tomo poses and full-scene art, never photography, never stock.
- **Layout** — center column `min(1240px, 92vw)`; generous section rhythm `clamp(64px,12vh,140px)`. A **sticky/pinned hero** where Tomo "flies in" on scroll (disabled under `prefers-reduced-motion` and on small viewports).
- **Shape** — radii are gentle: `14` (tiles/fields), `22` (scene cards & art frames), `999` (every button, tag and form is a full pill). The brand dot is an intentionally *imperfect* blob radius, not a circle.
- **Elevation** — almost flat. One soft shadow (`--shadow-soft`) on media frames; copy floating over full-bleed art gets a layered **text-shadow** (`--text-float`) instead of a scrim.
- **Motion** — slow, settled fades + rise on scroll (`.w-reveal`, 900ms, `cubic-bezier(0.2,0.7,0.2,1)`); a gentle bob/twinkle on decorative stars. Hover = a 1px lift on pills; nothing bouncy on the web side. Honors reduced-motion.
- **Hairlines** — borders are `color-mix` of ink at 12–20% over the surface, never opaque grey.

### Iconography (web)
The marketing site is **near icon-free** by design — meaning comes from illustration and type, not UI glyphs. The only recurring marks are: the **brand dot** (a soft green blob with a cream "eye" — Tomo abstracted, in `.w-brand-dot`), **coral pips** as list/ticker bullets, and a single CSS-drawn **play triangle** on the media frame. Number "pills" (01–06) stand in for icons on scene tags. No icon font, no emoji in chrome.

---

## 2. App / Product system

The in-app product system. **Cream + black surfaces, Satoshi headings, a golden `#F2C53D` primary action**, signature *Dot/Circle* episode nodes, a gold play button, lavender recap cards and a floating black tab bar.

### Files
| File | Purpose |
|---|---|
| `colors_and_type.css` | App tokens + semantic type classes (`.t-display`, `.t-h1`, `.t-body`, `.t-eyebrow`, …). |
| `components.css` | App primitives: `.btn`, `.input`, `.chip`, `.badge`, `.card`, `.dot-node`, `.play-btn`, `.tab-nav`. |
| `preview/` | `@dsCard` cards grouped **Type / Colors / Spacing / Components / Brand**. |
| `ui_kits/miotomo-app/` | Click-through prototype of the full journey + the React screens behind it. |

The app system reuses the **shared brand assets** (Tomo, the dot mark, scene art) but speaks in a warmer, more tactile voice. See `preview/` and the prototype `ui_kits/miotomo-app/index.html`.

---

## 3. Shared brand assets (`assets/`)

Hand-illustrated, warm, storybook. Tomo poses (`tomo-flying`, `tomo-meet`, `tomo-head`, `tomo-question`, `tomo-sit`, `tomo-tablet`, `tomo-celebrate`), scene art (`scene-egypt`, `scene-rome`, `scene-arctic`, `scene-space`, `scene-classroom`, `role-reversal`), and the tiling `texture-bg.png`. Used full-bleed in scene cards and floating over the night sky in the hero. Brand `Brand`-group cards in `preview/` show the wordmark, dot glyph, Tomo and imagery treatment.

---

## 4. Index / manifest

- **Web tokens** → `web/web-tokens.css` · **Web components** → `web/web-components.css` · **Web cards** → `web/preview/*.html`
- **App tokens** → `colors_and_type.css` · **App components** → `components.css` · **App cards** → `preview/*.html`
- **App prototype** → `ui_kits/miotomo-app/index.html`
- **Live marketing page** → `Miotomo Landing.html` (+ `styles.css`, `script.js`)
- **Brand assets** → `assets/`
- **Agent skill** → `SKILL.md`
