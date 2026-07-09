---
title: How do I write a good runbook?
description: The runbook template and the anti-patterns to avoid, so an on-call engineer can act at 3am without guessing.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jul 8, 2026
readTime: 4 min read
---

Operational runbooks live in the [runbooks repo](https://github.com/planetfitness/runbooks) (published via Backstage TechDocs) — that's the source of truth. This page is the **convention** every new runbook should follow, so the person reading it under pressure can act without guessing. A runbook is a script for a tired human, not a story.

## The template

```md
# <Exact alert name or task title>

**Owner:** <team or person> · **Last reviewed:** <YYYY-MM-DD>

## When this applies
The precise trigger — the PagerDuty alert text, or the situation. One or two lines.

## Likely cause
The usual root cause(s), most common first.

## Steps
1. Copy-pasteable commands, parameterized (`<service>`, `<region>`), not hardcoded.
2. Each step says what you should see if it worked.

## If it recurs / escalate
When this isn't a one-off: who to page, and whether it warrants a Correction of Errors.
```

The alarm runbooks under `in-case-of-production-issues/pfx-services/on-call/` are the model — copy their *Alert → cause → steps* shape.

## Do

- **Title the runbook the exact thing it answers** — the literal PagerDuty alert text, so search finds it mid-incident.
- **Lead with the action.** *When this applies* and *Steps* come first; context, if any, goes at the end.
- **Parameterize commands** and show the expected output of each step.
- **Prefer a script to a click-path.** If a procedure is more than a couple of console clicks, it should be a checked-in script — our tenets say write runbooks only where automation isn't possible.
- **Stamp an owner and a last-reviewed date** so readers can judge staleness.

## Don't

- **No narrative preamble.** Don't open with the story of the 2019 incident that motivated the doc — the on-call engineer needs steps, not history. (Move any backstory to the bottom.)
- **No frozen dashboard links.** Datadog URLs with hardcoded `from_ts`/`to_ts` open a stale time window forever. Link the monitor/dashboard itself, or use relative ranges.
- **No console click-throughs with screenshots** where a command or script would do — screenshots rot with every UI redesign.
- **Don't stop at "restart the pod."** Symptom relief is fine to *stabilize*, but the runbook should say how to confirm root cause and when to escalate, so the same page doesn't fire nightly.
- **Don't leave `*needs review` markers** in place of an owner and a date — decide, or delete.

:::note
Found a runbook that breaks these? Fixing it is a great first PR. The consolidated findings from our last audit are in `docs/runbooks-audit.md` (internal).
:::
