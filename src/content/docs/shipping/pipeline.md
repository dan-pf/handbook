---
title: What does our delivery pipeline look like?
description: The Continuous Delivery stages every change moves through, from commit to release.
owner: James Gimourginas
initials: JG
avatarColor: '#470A68'
updated: Jul 7, 2026
readTime: 4 min read
---

Our [testing strategy](/shipping/testing/) only works because it's wired into a Continuous Delivery pipeline. Pipeline design varies by what's being built (mobile app vs. backend service), but every pipeline moves through the same notional stages.

## Commit stage

Everything needed to build the product or service, triggered on every merge:

- **Compile / transpile** — per the language in play.
- **Static code analysis** — syntax, security, and other issues.
- **Tests** — unit, component, and integration.
- **Package** — produce the build artifact deployed by later stages.

## Functional test stage

All functional tests, against a test environment production-like enough to support them:

- **API tests** — system-level tests against programmatic interfaces to catch functional regressions.
- **E2E tests** — system-level tests against user and programmatic interfaces.

## Non-functional test stage

Non-functional tests against an environment as production-like as possible:

- **Load tests** — pre-defined load profiles to catch performance regressions.
- **Security tests** — system-level checks for security regressions.

## Manual test stage

Unlike the stages before it, this one is **manually triggered**: we release to the Staging environment once a build contains a set of features worth examining. It covers what we can't automate — exploratory tests, scenario tests, and usability tests with a small set of real users. Defects and feedback from all test stages are logged, prioritized, and addressed before production release. This stage is time-boxed and executed by designated QA.

## Release stage

Also manually triggered. Once a release candidate is vetted — all automated tests pass, necessary manual tests pass — it deploys to production and releases to users, typically with **smoke tests**: lightweight checks that endpoints and landing pages are operational without changing production state.

## Pipeline chaining

When two dependent applications or services are changing at once, pipelines chain: a merge to Service A triggers its pipeline, which on success triggers the pipelines of the services and applications that depend on it, each testing against the latest successful artifacts of its dependencies. Teams that prefer stability can pin to stable release candidates via dependency versioning instead.

**Primary source:** [Engineering Practices and Conventions](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4788453439) in Confluence,[^practices] including the pipeline diagrams this page summarizes.

[^practices]: [Engineering Practices and Conventions](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4788453439), PF Software Engineering Team space (Confluence) — Continuous Delivery section.
