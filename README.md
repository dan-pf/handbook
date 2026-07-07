# Planet Fitness Engineering Handbook

The single source of truth for how Planet Fitness engineering works: how we're organized, what we build with, how we ship, and what to do when things break.

Built with [Astro Starlight](https://starlight.astro.build). Pages are Markdown in `src/content/docs/`; every page has an owner and anyone can propose a change.

## Getting started

```sh
npm install
npm run dev       # local dev server at localhost:4321
npm run build     # static build to ./dist/
npm run preview   # serve the build locally
```

## Contributing

- **Fix a page**: use the "Suggest an edit" link on any page, or PR the file in `src/content/docs/` directly. Typos don't need review.
- **Add a page**: see [docs/authoring.md](docs/authoring.md) for frontmatter fields and conventions. New pages must be registered in the sidebar in `astro.config.mjs`.
- **Theme/styling**: see [docs/design.md](docs/design.md) before touching `src/styles/custom.css`.
