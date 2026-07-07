---
title: What happens when production breaks?
description: Severity levels, the first 10 minutes, incident roles, and blameless postmortems.
owner: Alex Kim
initials: AK
avatarColor: '#551497'
updated: Jul 5, 2026
readTime: 5 min read
---

PagerDuty pages you, you declare in `#incident-room`, you stabilize first and diagnose second. Nobody gets blamed for breaking things; people get thanked for declaring early.

## Severity levels

| Level | Means | Response |
| --- | --- | --- |
| <span class="pf-sev pf-sev--1">SEV1</span> | Join flow or check-in down, payment data at risk | Page IC + exec on-call, all hands, status page |
| <span class="pf-sev pf-sev--2">SEV2</span> | Degraded core surface, no data risk | Page owning team, IC assigned, hourly updates |
| <span class="pf-sev pf-sev--3">SEV3</span> | Non-core feature broken, workaround exists | Ticket + fix in business hours |

## The first 10 minutes

1. Acknowledge the page. Type `/incident declare` in Slack — it spins up the channel, the Datadog dashboard link, and the timeline doc.
2. Stabilize before you diagnose: roll back the last deploy, kill the newest flag, or shed load. Root cause is for tomorrow.
3. Say what you see, even if it's "I don't know yet." Silence is the only wrong update.

## Roles

**Incident Commander** runs the response and makes the calls — they don't debug. **Ops lead** drives the technical work. **Comms** updates stakeholders and the status page every 30 minutes for SEV1/2. One person can hold multiple roles on small incidents; on a SEV1, never.

## Postmortems

Blameless, written within 5 working days, reviewed in the weekly ops sync. We ask "what made this action reasonable at the time?" — never "who did it?". The Judgement Free Zone applies hardest here. Action items get Linear tickets with owners and dates, or they didn't happen.

:::note
Peak load is 5–7am local time in every timezone — treat a 6am SEV2 like a SEV1 until proven otherwise.
:::
