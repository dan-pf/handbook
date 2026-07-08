---
title: How does on-call work?
description: One-week rotations per pod, comp time after rough weeks.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jul 5, 2026
readTime: 3 min read
stub: true
tableOfContents: false
---

On-call is a time-limited developer role, not a separate team: the Services team sets the [PagerDuty](https://planetfitness.pagerduty.com) schedule weekly. When paged: acknowledge, post in `#tw-oncall-ops`, and follow [the incident process](/production/incidents/). The on-call and support runbooks — DLQ reprocessing, alarm playbooks, quick links — live in the [runbooks repo](https://github.com/planetfitness/runbooks) (Backstage TechDocs). Full expectations (escalation, handoff, comp time) will be written up here.
