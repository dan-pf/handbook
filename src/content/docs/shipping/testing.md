---
title: How do we test our code?
description: The Agile Testing Quadrants, the test pyramid, coverage targets, and who's responsible for what.
owner: James Gimourginas
initials: JG
avatarColor: '#470A68'
updated: Jul 7, 2026
readTime: 5 min read
---

High-quality software is a whole-team responsibility — Product, Design, Infrastructure, and Operations included — but Engineering is ultimately accountable for it. We shape the testing approach for every initiative around the **Agile Testing Quadrants** and the **test pyramid**, and we automate everything that can be automated into the delivery pipeline.[^practices]

## The quadrants

**Tech-facing, supporting the team (automated)** — does the code do what we expect?

- **Unit tests** — the smallest units possible, heavy use of test doubles for isolation and speed.
- **Mutation tests** — tests for our tests: artificial bugs are injected to check that coverage actually catches issues. See [Mutation Testing](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4809588761) for how this runs in the PFX services and CircleCI pipelines.
- **Component tests** — combinations of units, still isolated from external dependencies.
- **Integration tests** — components plus simplified externals (e.g. an in-memory database). Best practices: [Integration Testing](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4841537597).
- **Consumer-driven contract (CDC) tests** — verify producer changes don't break external consumers (e.g. Zuora, SPA). See [Consumer Driven Contract Testing](https://planetfitness.atlassian.net/wiki/spaces/PFX/pages/4798513159).
- **Manual API testing** — calling endpoints in nonprod/prod during development to verify request/response behavior. Runbook: [Manual API Testing](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4809064462).
- **Developer-driven performance tests.**

**Business-facing, supporting the team (automated)** — does the code satisfy functional requirements?

- **API tests** — system-level tests through programmatic interfaces, ideally with production-like dependencies.
- **E2E tests** — through user or programmatic interfaces, covering primary user flows (e.g. the join flow).

**Business-facing, critiquing the product (manual)** — does the product satisfy user needs?

- **Scenario tests** — high-priority business scenarios combining multiple flows (join, cancel, rejoin).
- **Usability tests** — real users evaluating ease of use.
- **Exploratory tests** — unscripted testing that finds defects through creativity and intuition.

**Tech-facing, critiquing the product (automated or tooled)** — does the product satisfy non-functional requirements?

- **Load tests** — rule of thumb: **3× peak traffic from the prior 12 months**.[^practices]
- **Capacity tests** — find the load where latency/throughput start to degrade.
- **Security tests** — confirm security requirements (e.g. pen testing).

## Coverage targets

Coverage is a metric for confirming what we are and aren't testing, not a goal in itself. We generally aim for **90% line, 80% method, and 80% branch coverage**.[^practices]

## Who does what

Engineering creates the automated quadrants and wires them into the Continuous Delivery pipeline — partnering with Product Management on functional requirements and exceptional cases, and with Operations and Security on non-functional requirements. For the manual quadrant, Engineering partners with Product and Design to define scenario tests (doing this up front clarifies requirements fast) and joins sessions where real users exercise pre-release builds. Where full automation isn't viable, Engineering builds tooling to ease manual execution.

**Primary source:** [Engineering Practices and Conventions](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4788453439) in Confluence,[^practices] which also covers [test reports](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/5908955137) and [library vulnerability handling](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4938596354).

[^practices]: [Engineering Practices and Conventions](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4788453439), PF Software Engineering Team space (Confluence). Deep-dives: [Mutation Testing](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4809588761), [Integration Testing](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4841537597), [Consumer Driven Contract Testing](https://planetfitness.atlassian.net/wiki/spaces/PFX/pages/4798513159), [Manual API Testing](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4809064462).
