---
title: How do we observe our systems?
description: Traces, metrics, and logs in Datadog; errors in Sentry; pages via PagerDuty.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jun 28, 2026
readTime: 3 min read
stub: true
tableOfContents: false
facts:
  - label: Metrics, traces, logs
    value: Datadog — dd-trace on Node apps, Datadog Java agent baked into service images
  - label: Error tracking
    value: Sentry — release-tagged, linked to PRs
  - label: Alerting
    value: PagerDuty — SLO burn-rate alerts, not CPU alerts
  - label: SLOs
    value: Per-service, reviewed monthly in ops sync
---

If it is not on a dashboard, it is not in production. Traces, metrics, and logs all land in Datadog; errors land in Sentry; pages land on your phone via PagerDuty.
