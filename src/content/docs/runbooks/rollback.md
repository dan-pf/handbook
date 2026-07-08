---
title: How do I roll back a deploy?
description: Re-release the last known-good build via the pipeline's release stage; full runbook in progress.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jul 1, 2026
readTime: 2 min read
stub: true
tableOfContents: false
---

Short version: roll back by re-deploying the last known-good release candidate through the [delivery pipeline's](/shipping/pipeline/) release stage. Step-by-step rollback runbooks — application, edge-lb, and caching/Cloudflare — live in the [runbooks repo](https://github.com/planetfitness/runbooks) under `in-case-of-production-issues/rollback/`, published via Backstage TechDocs.
