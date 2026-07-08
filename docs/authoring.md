# Authoring handbook pages

## Adding a page

1. Create `src/content/docs/<section>/<slug>.md` (sections: `handbook`, `organization`, `working`, `stack`, `shipping`, `production`, `runbooks`, `onboarding`, `culture`).
2. Register it in the `sidebar` array in `astro.config.mjs` — pages are not auto-discovered. Item order there is display order; group order drives the `01`–`09` numbering.

## Frontmatter

Schema lives in `src/content.config.ts`. Beyond Starlight's `title`/`description`:

| Field | Example | Notes |
| --- | --- | --- |
| `owner` | `Dan Lourenço` | Renders the byline under the h1 |
| `initials` | `DL` | Avatar chip text |
| `avatarColor` | `'#470A68'` | Avatar chip background (quote hex values — YAML comments start with `#`) |
| `updated` | `Jun 30, 2026` | Display string, not a date type |
| `readTime` | `3 min read` | |
| `stub` | `true` | Shows the yellow "Stub" banner |
| `facts` | list of `{label, value}` | Optional "At a glance" table rendered after the body |

Owners: pages derived from a source keep that source's author as owner (James Gimourginas, JG, `#470A68` — tenets/testing/pipeline; Shaun Connor, SC, `#026700` — dev-environment; Jeremiah Dow, JD, `#8845C8` — feature-flags); everything else is owned by Dan Lourenço (DL, `#AD43DB`) as a placeholder until real owners are assigned. Give each owner a distinct `avatarColor` and keep it consistent across their pages.

## Page conventions

- **Full pages**: lead paragraph (auto-styled larger), then `##` sections. Keep h2s short — they render uppercase.
- **Stub pages**: `stub: true`, `tableOfContents: false`, a one-paragraph blurb as the whole body, optionally `facts`.
- **Callouts**: `:::note` renders as the purple PF callout, `:::caution` as the yellow one.
- **Severity pills**: inline HTML, e.g. `<span class="pf-sev pf-sev--1">SEV1</span>` (variants `--1` red, `--2` amber, `--3` gray). Defined in `src/styles/custom.css`.
- **Diagrams**: fenced ` ```mermaid ` code blocks render as diagrams via `astro-mermaid` (client-side, follows the light/dark theme automatically). See `stack/frontend.md` and `stack/backend.md` for examples.
