# Design & theme notes

## Provenance

The site implements a claude.ai/design handoff bundle (`Planet Fitness Engineering Handbook-handoff.zip`, exported Jul 2026). The design's CSS variables (`--hb-*`) were mapped onto Starlight tokens (`--sl-*`) plus custom `--pf-*` variables in `src/styles/custom.css` — that file is the whole theme. Dark palette values live on `:root`, light on `:root[data-theme='light']`.

## Component overrides

Registered in `astro.config.mjs` → `components`:

- `SiteTitle.astro` — PF gear logo (SVG path extracted from the design system's `PFIconsPFLogoSecondary2` icon, colored via `currentColor`) + stacked "Planet Fitness / Engineering Handbook" lockup.
- `PageTitle.astro` — breadcrumb (derived from the sidebar group), owner byline, stub banner. Wraps Starlight's default title.
- `MarkdownContent.astro` — appends the `facts` "At a glance" table after the body.

The "Suggest an edit" label overrides Starlight's default edit-link text via `src/content/i18n/en.json`.

## Fonts

Headings should ideally be **Hardworking Sans** (licensed foundry font, not on Google Fonts). Per the design system's own tokens, **Barlow** is the sanctioned fallback and is what we self-host via `@fontsource/barlow`. If the font files arrive, add `@font-face` rules and put `'Hardworking Sans'` first in the heading font stack.

## Alternate "Purple Dark" theme

The handoff included a second dark variant (deep purple, yellow accent) that was **not** implemented. To switch, replace the dark values in `custom.css` with:

bg `#2B0148` · sidebar `#22013A` · body text `#E4D2F7` · muted `#BA97DD` · border `#54217B` · accent `#FFE003` · link `#D9B1FF` (hover `#FFE003`) · selected `#551497` / `#FFFFFF` · inline code bg `#37054F` · callout `#551497` / `#E4D2F7` · warn `rgba(255,224,3,.13)` / `#FFF8B3` · hover `rgba(217,177,255,.1)` · card/kbd `#470A68`

Light mode is identical in both variants.

## Pre-deploy checklist

- Replace placeholder `pf-eng/handbook` URLs (`editLink.baseUrl`, GitHub social link) in `astro.config.mjs`.
- Set `site` in `astro.config.mjs` so the sitemap integration activates.
