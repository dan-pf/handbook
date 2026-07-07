---
title: How do we ship code?
description: Trunk-based development, small PRs, deploy on merge, progressive rollout.
owner: Dev Patel
initials: DP
avatarColor: '#8845C8'
updated: Jun 25, 2026
readTime: 6 min read
---

Trunk-based, small PRs, deploy on merge. Anything riskier than a copy change goes out behind a flag. The goal is that shipping feels boring — excitement belongs in the product, not the deploy.

## The loop

1. Branch off `main` as `<user>/<linear-id>-slug`. Branches live days, not weeks.
2. Open the PR early as a draft. CI runs on every push.
3. One approval merges it. Two for anything touching billing or auth.
4. Merge to `main` deploys to staging automatically; production follows via progressive rollout.

## Review expectations

First response within **4 working hours** — unblocking a teammate outranks your own feature work. Review the approach and the blast radius, not the formatting (linters own formatting). Keep PRs under ~400 lines; if it's bigger, the review will be worse and slower, and that's on the author.

## What CI gates

- Type check + lint (blocking), unit tests (blocking)
- Join-flow Playwright happy path (blocking for frontend apps)
- Contract tests against pinned OpenAPI specs (blocking for services)
- Bundle-size and image-size budgets (blocking), Snyk scan (advisory, blocking on critical)

## How a deploy actually happens

ArgoCD watches `main` and syncs the new image. Istio shifts traffic in steps — **5% → 25% → 100%** — with automated analysis on error rate and p99 latency between steps. A failed step rolls back without a human.

```sh
# watch your rollout
pf rollout status billing-svc
# canary 25% · error 0.02% · p99 210ms · promoting in 4m
```

:::note
Deploy freeze: Jan 1–7. New-year join volume is our Super Bowl; we don't ship anything we don't have to.
:::
