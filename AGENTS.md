# Planet Fitness Engineering Handbook

Astro Starlight site for PF engineering's internal handbook. Content is Markdown in `src/content/docs/`; the PF look and feel is a theme layered on Starlight — no framework components, no client JS of our own.

## Commands

- `astro dev --background` — start the dev server (manage with `astro dev stop` / `status` / `logs`)
- `npm run build` — static build to `dist/`; must pass before considering a change done
- `npm run changelog` — regenerate `CHANGELOG.md` from commits since the last tag
- `npm run release` — bump `version`, tag, and push (changelogen)

## Commits & versioning

Conventional Commits, versioned with [changelogen](https://github.com/unjs/changelogen). Prefix every commit: `feat:`, `fix:`, `docs:`, `content:` (handbook copy), `refactor:`, `chore:`. Use a scope where it helps (`content(stack): …`). `feat`/`fix` drive the version bump; `content` is our own type for page edits (configured in `changelog.config.json`). A `!` suffix or `BREAKING CHANGE:` footer forces a major bump.

## Map

| Path | What it is |
| --- | --- |
| `src/content/docs/<section>/*.md` | Handbook pages (10 section dirs incl. `reference/`) |
| `astro.config.mjs` | Sidebar (every page is registered here), edit link, title |
| `src/content.config.ts` | Extended frontmatter schema (owner, byline, stub, facts) |
| `src/styles/custom.css` | Entire PF theme: light/dark palettes, type, all `pf-*` classes |
| `src/components/` | Starlight overrides: SiteTitle (brand lockup), PageTitle (breadcrumb/byline/stub banner), MarkdownContent (facts list) |

## Before you work on…

- **Adding or editing a content page** → read `docs/authoring.md` (frontmatter fields, stub-page conventions, callout/pill patterns, **citation style** — cite every Confluence/Jira/GitHub/vendor fact with a superscript footnote; mark untraceable claims `:::caution[Unverified]`).
- **Styling or theme changes** → read `docs/design.md` (design provenance, palette mapping, the alternate "Purple Dark" theme, font caveats).
- Starlight reference: https://starlight.astro.build

## Constraints

- The GitHub org (`github.com/planetfitness`) is real, but the handbook repo name in `astro.config.mjs` (`planetfitness/handbook`) is assumed — confirm before deploy.
- Section numbering in the sidebar is CSS counters over config order — reordering sidebar groups renumbers them.
