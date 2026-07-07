# Planet Fitness Engineering Handbook

Astro Starlight site for PF engineering's internal handbook. Content is Markdown in `src/content/docs/`; the PF look and feel is a theme layered on Starlight — no framework components, no client JS of our own.

## Commands

- `astro dev --background` — start the dev server (manage with `astro dev stop` / `status` / `logs`)
- `npm run build` — static build to `dist/`; must pass before considering a change done

## Map

| Path | What it is |
| --- | --- |
| `src/content/docs/<section>/*.md` | Handbook pages (9 section dirs) |
| `astro.config.mjs` | Sidebar (every page is registered here), edit link, title |
| `src/content.config.ts` | Extended frontmatter schema (owner, byline, stub, facts) |
| `src/styles/custom.css` | Entire PF theme: light/dark palettes, type, all `pf-*` classes |
| `src/components/` | Starlight overrides: SiteTitle (brand lockup), PageTitle (breadcrumb/byline/stub banner), MarkdownContent (facts list) |

## Before you work on…

- **Adding or editing a content page** → read `docs/authoring.md` (frontmatter fields, stub-page conventions, callout/pill patterns).
- **Styling or theme changes** → read `docs/design.md` (design provenance, palette mapping, the alternate "Purple Dark" theme, font caveats).
- Starlight reference: https://starlight.astro.build

## Constraints

- The GitHub URLs (`pf-eng/handbook`) in `astro.config.mjs` are placeholders from the design — don't treat them as real; flag before deploy.
- Section numbering in the sidebar is CSS counters over config order — reordering sidebar groups renumbers them.
