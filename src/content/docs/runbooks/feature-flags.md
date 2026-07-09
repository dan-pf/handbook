---
title: How do I add a feature flag?
description: Standard toggles ride the pipeline — S3-backed JSON for web, Spring Cloud Config for services. VWO is only for experiments.
owner: Jeremiah Dow
initials: JD
avatarColor: '#8845C8'
updated: Jul 8, 2026
readTime: 4 min read
---

First, the split that confuses everyone: **VWO is only for experiments** (A/B tests — see [How do we run A/B tests?](/stack/experiments/)). Using VWO for all feature flagging would have been nice, but it was cost-prohibitive and the platform had other issues, so standard feature toggles use our own plumbing: **S3-backed JSON for the web apps, Spring Cloud Config for the services.**[^slack]

## Web apps (remix-run)

Toggles live in the repo at [`feature-toggles/`](https://github.com/planetfitness/remix-run/blob/master/feature-toggles/README.md) as per-environment JSON — `prod.json` and `nonprod.json`. Deployed apps initialize from their bundled JSON, then fetch from S3 and **poll every 60 seconds**; the pipeline is what publishes the JSON to S3. TypeScript types are derived automatically from `prod.json`.[^webtoggles]

The rollout workflow:

1. **Add the key** to both JSON files — `false` in `prod.json` until you're ready.
2. **Wire it up**: read it in your route via `getFeatureToggles(context)` and gate the new behavior.
3. **Test in nonprod** — set the value in `nonprod.json`, or override per-request with a cookie: `toggle_<name>=<value>` (works on deployed environments too, handy for QA).
4. **Enable in prod** by updating `prod.json` on `master` and letting the pipeline ship it. **Don't hand-upload the file to S3** — the change should go through CI like any other deploy.
5. **Clean up** once stable: remove the check and the key from both files. Old flags are tech debt.

## Backend services

Services get toggles through **Spring Cloud Config** (the `config-server` / [dynamic configuration service](https://planetfitness.atlassian.net/wiki/spaces/PFX/pages/3846733866)). The common base is [`@PFXToggles`](https://github.com/planetfitness/pfx-commons/blob/master/src/main/java/com/planetfitness/toggles/PFXToggles.java) in `pfx-commons`, which binds `@ConfigurationProperties("pfx.toggles")`; each service defines its own typed toggles class — see [join's `PfxToggles`](https://github.com/planetfitness/join/blob/master/src/main/java/com/planetfitness/join/config/PfxToggles.java) or [offers' `ToggleService`](https://github.com/planetfitness/offers/blob/master/src/main/java/com/planetfitness/offers/service/ToggleService.java) for the pattern.[^svctoggles]

## The process: flipping a flag is a change

Enabling a feature in production normally goes through a **CR (change request)** — arguably a more important one than the deploy that shipped the dormant code, because the flip is the moment behavior actually changes for members. So: no ad-hoc file uploads, no console edits. Change the config in git, raise the CR, ship through the pipeline.[^slack]

[^slack]: Jeremiah Dow, PFX engineering Slack (Jul 2026) — VWO reserved for experiments (full-VWO flagging was cost-prohibitive); standard toggles ride the pipeline; a CR is expected when flipping a feature on.
[^webtoggles]: [remix-run `feature-toggles/README.md`](https://github.com/planetfitness/remix-run/blob/master/feature-toggles/README.md) and `app/middleware/featureToggles.ts`.
[^svctoggles]: [`@PFXToggles` in pfx-commons](https://github.com/planetfitness/pfx-commons/blob/master/src/main/java/com/planetfitness/toggles/PFXToggles.java); examples in [join](https://github.com/planetfitness/join) and [offers](https://github.com/planetfitness/offers). Delivery via [config-server dynamic configuration](https://planetfitness.atlassian.net/wiki/spaces/PFX/pages/3846733866) (Confluence).
