---
title: What powers our frontend?
description: The frontend apps, why we run two frameworks, and the conventions that matter.
owner: Sam Okafor
initials: SO
avatarColor: '#B900AB'
updated: Jun 18, 2026
readTime: 5 min read
---

Two frameworks, one rule: **Remix for anything a member logs into, Next.js for anything Google indexes.** Everything is TypeScript, everything consumes the PF design system package.

## The apps

| App | Framework | What it is |
| --- | --- | --- |
| join-web | Remix | The join flow — plan selection through payment. Our highest-revenue surface. |
| member-web | Remix | Logged-in member portal: billing, check-in history, Crowd Meter. |
| marketing-web | Next.js | planetfitness.com — SSG/ISR marketing pages, club finder, SEO surface. |
| pf-design-system | React lib | Shared components + tokens. If you're styling a raw `<button>`, stop. |

## Why two frameworks?

Honestly: history plus fit. The join flow was rebuilt on Remix because its form-first, progressively-enhanced model matched a checkout that must work on bad club Wi-Fi. The marketing site needs ISR and edge caching for thousands of club pages, where Next.js is stronger. We consolidate opportunistically — new member-facing surfaces default to **Remix**.

## Conventions that matter

- **TypeScript strict mode, no exceptions.** `any` fails CI.
- **Server-first data.** Loaders/actions in Remix, server components in Next. Client state is for UI, not for member data.
- **Design system or nothing.** One-off components need a PR to `pf-design-system` first.
- **Tests:** Vitest for units, Playwright for the join-flow happy path (blocks deploy if red).

```sh
# run any app locally
pnpm i
pnpm --filter join-web dev      # localhost:3000, seeded club data
pnpm --filter join-web test:e2e # playwright against local
```

:::note
Join-flow performance budget: LCP under 2.0s on a mid-tier Android over 4G. The bundle-size check in CI is not a suggestion.
:::
