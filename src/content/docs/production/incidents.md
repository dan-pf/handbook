---
title: What happens when production breaks?
description: Severity levels, the first 10 minutes, incident roles, and blameless postmortems.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jul 8, 2026
readTime: 5 min read
---

PagerDuty pages you, you post in `#tw-oncall-ops`, you stabilize first and diagnose second. Nobody gets blamed for breaking things; people get thanked for declaring early.[^runbooks]

## Severity

:::caution[Proposed — pending team ratification]
PF has never formally defined severity levels — the runbooks repo notes one is still to be written, and on-call docs use "SEV1" ad hoc.[^severity] The table below is a **proposal** to fill that gap, grounded in how the join-flow alerts already behave. Ratify or adjust it with the on-call group before treating it as policy.
:::

Severity sets the response, not blame. Pick the highest level that fits; when unsure, round up.

| Level | Criteria | Response |
| --- | --- | --- |
| <span class="pf-sev pf-sev--1">SEV1</span> | Join or check-in down, payments failing, or member data at risk — a core revenue/access path is broken. | Declare immediately in the SEV1 channel + `#tw-oncall-ops`, page the Point and service owners, exec visibility, stakeholder updates until resolved. |
| <span class="pf-sev pf-sev--2">SEV2</span> | A core surface is degraded but working (elevated errors/latency, a non-critical feature down) with no data risk. | Page the owning team, assign a Point, work it in `#tw-oncall-ops`. |
| <span class="pf-sev pf-sev--3">SEV3</span> | Non-core feature broken with a workaround, or a cosmetic/low-impact issue. | Ticket it; fix in business hours. |

## The first 10 minutes

1. Acknowledge the page in [PagerDuty](https://planetfitness.pagerduty.com).
2. Post in `#tw-oncall-ops` and give other responders a few minutes to join. Set the channel status to **RED** with the severity.
3. Declare a **Point** — the single owner of remediation actions (see Roles).
4. Stabilize before you diagnose: roll back the last deploy, kill the newest flag, or shed load. Root cause is for tomorrow.
5. Say what you see, even if it's "I don't know yet." Silence is the only wrong update.

## Roles

**Point** owns the remediation: they announce every system change in the channel *before* making it, and they're the one voice deciding what happens next. Everyone else keeps the discussion in `#tw-oncall-ops` — side conversations hide state from the room. When it's resolved, the channel status flips back to **GREEN**.

## Correction of Errors

Blameless, captured as a [Correction of Errors](https://planetfitness.atlassian.net/wiki/spaces/QE/pages/4837441592): drafted from the post-mortem template, reviewed, and published to Confluence. We ask "what made this action reasonable at the time?" — never "who did it?". The Judgement Free Zone applies hardest here. Action items get Jira tickets with owners and dates, or they didn't happen. Step-by-step remediation procedures live in the [runbooks repo](https://github.com/planetfitness/runbooks) (Backstage TechDocs).

[^runbooks]: [runbooks](https://github.com/planetfitness/runbooks) — `in-case-of-production-issues/on-call/` (PagerDuty, `#tw-oncall-ops`, RED status, the "Point" role), published via Backstage TechDocs. Post-mortems are drafted from a template and published to Confluence.
[^severity]: [runbooks `on_call_activities.md`](https://github.com/planetfitness/runbooks) states a severity taxonomy is still to be written; `website/on-call/join.md` uses "severity-1" informally. This proposal grounds SEV1 in those existing join/check-in signals.
