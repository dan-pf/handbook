---
title: How do we ship code?
description: Trunk-based development, small PRs, deploy on merge, progressive rollout.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jun 25, 2026
readTime: 6 min read
---

Trunk-based, small PRs, deploy on merge. Anything riskier than a copy change goes out behind a flag. The goal is that shipping feels boring — excitement belongs in the product, not the deploy. Trunk-based development means: keep the trunk stable at all times, work in small batches and merge frequently, review PRs quickly, and treat pipeline failures as drop-everything ([full branching strategy](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4830560265) in Confluence).[^branching]

:::caution[Unverified]
The specific thresholds below — first-response within 4 working hours, PRs under ~400 lines, one-approval / two-for-billing, and the Jan 1–7 deploy freeze — are carried over from the initial design mock-up and have no confirmed source of truth. The trunk-based workflow, CI gates, and pipeline stages are sourced; these numbers are not. Confirm with the team before treating them as policy.
:::

## The loop

1. Branch off `main` as `<user>/<jira-key>-slug`. Branches live days, not weeks.
2. Open the PR early as a draft. CI runs on every push.
3. One approval merges it. Two for anything touching billing or auth.
4. Merging to `main` kicks off the [delivery pipeline](/shipping/pipeline/): automated stages run on every merge; releasing to production is a deliberate, manually triggered step.

## Review expectations

First response within **4 working hours** — unblocking a teammate outranks your own feature work. Review the approach and the blast radius, not the formatting (linters own formatting). Keep PRs under ~400 lines; if it's bigger, the review will be worse and slower, and that's on the author.

## What CI gates

Type check, lint, and unit tests block on every push; services also run CDC contract tests and frontends the join-flow Playwright path, with Veracode scanning throughout. The authoritative, stage-by-stage list of what runs where lives on the [delivery pipeline](/shipping/pipeline/) page; the [testing](/shipping/testing/) page owns the test strategy behind it.

## How a deploy actually happens

Every merge runs the pipeline's automated stages — commit (build, static analysis, unit/component/integration tests), functional tests, and non-functional tests. When a build contains features worth examining, it's released to Staging for the time-boxed manual test stage. Production release is its own manually triggered stage, gated on all of the above and finishing with smoke tests. The full walkthrough is on the [delivery pipeline](/shipping/pipeline/) page.

:::note
Deploy freeze: Jan 1–7. New-year join volume is our Super Bowl; we don't ship anything we don't have to.
:::

[^branching]: [Branching & Environment Strategy](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4830560265), PF Software Engineering Team space (Confluence). CI gates and pipeline stages: [Engineering Practices and Conventions](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4788453439).
