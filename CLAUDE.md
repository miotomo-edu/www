# Miotomo Landing Page

Marketing landing page for **Miotomo** — a voice-first AI learning companion for children aged 6–12. Children teach an alien character named Tomo about Earth, building critical thinking, storytelling, and spoken confidence.

## File structure

| File | Role |
|------|------|
| `index.html` | Single-page landing page (all sections) |
| `styles.css` | Entry point — imports `web/web-tokens.css` + `web/web-components.css` |
| `landing.css` | Landing-page-specific layout and section styles |
| `script.js` | Vanilla JS: nav scroll state, hero parallax/scroll animation, reveal-on-scroll, waitlist form submission |
| `assets/` | Images (Tomo character, scene illustrations, texture) |
| `web/` | Web design-system token and component partials |

**Do not mix** the web design system (`styles.css`) with the app design system (`colors_and_type.css` + `components.css`) — they share variable names with different values.

## Page sections (top → bottom)

1. **Nav** — sticky brand + "Join the waitlist" CTA link to `#waitlist`
2. **Hero** (`#top`) — full-bleed pinned scroll scene; Tomo character animates in as the user scrolls; email waitlist form (`data-waitlist`, success target `#hero-success`)
3. **Story / Meet Tomo** — introduces the character and the "child as teacher" premise; two bullet traits
4. **Skills** — 6-card grid: Critical thinking, Storytelling, Debating, Public speaking, English proficiency, Diplomacy
5. **Video block** — placeholder for a 16:9 demo video
6. **Scenes** (5 articles inside `.story`):
   - 01 The role reversal
   - 02 Topic-native characters
   - 03 The Circle (five-episode arc)
   - 04 Made to be loved (design, retention, parent dashboard)
   - 05 Safety & privacy (safety layer, no human-mimicry, zero data retention)
7. **CTA / Waitlist** (`#waitlist`) — second email form (`data-waitlist`, success target `#cta-success`); "Closed beta · Fall 2026"
8. **Footer** — brand mark + "Designed by parents, made for kids 7–12"

## Waitlist forms

Both forms carry `data-waitlist` and `data-success="<id>"`. `script.js` handles submission — on success it shows the element with the matching id and hides the form.

## Scroll & animation

- **Hero Tomo** — canvas-less scroll animation driven by `requestAnimationFrame` in `script.js`; Tomo scales from ~18% to 100% and drifts across the viewport as the hero pin scrolls. Respects `prefers-reduced-motion`.
- **Reveal on scroll** — `.reveal` elements animate in via `IntersectionObserver`; staggered with `.delay-1 / .delay-2 / .delay-3`.
- **Parallax** — elements with `data-parallax="<rate>"` shift on scroll; can be toggled via the hidden Tweaks panel.

## Tweaks panel

A hidden `#tweaks-panel` (bottom-right) is wired to postMessage (`__activate_edit_mode` / `__deactivate_edit_mode`). It exposes parallax toggle, accent colour, and paper tone — intended for design review inside an iframe host, not for production users.

## Fonts

- **Fraunces** (display/headings, serif)
- **Nunito Sans** (body)
- **Satoshi** (brand wordmark, via Fontshare)
- **JetBrains Mono** (mono labels)

## Key CSS variables

| Variable | Default |
|----------|---------|
| `--ochre` | `#d9a83c` |
| `--paper` | cream `#efe5cd` |
| `--paper-2` | `#e7dcc0` |
| `--paper-3` | `#ddd0b0` |
| `--ink` | dark ink |
| `--green-deep` | used for success states |
| `--font-display` | Fraunces |
| `--font-body` | Nunito Sans |
| `--font-mono` | JetBrains Mono |

## Accent colour

The button/highlight colour used across CTAs is `rgb(182, 195, 86)` — an olive-green set inline on submit buttons and the hero italic. This overrides `--ochre` for the current design direction.
