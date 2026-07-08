---
title: What happens when production breaks?
description: Severity levels, the first 10 minutes, incident roles, and blameless postmortems.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jul 5, 2026
readTime: 5 min read
---

PagerDuty pages you, you post in `#tw-oncall-ops`, you stabilize first and diagnose second. Nobody gets blamed for breaking things; people get thanked for declaring early.

## Severity

A formal severity taxonomy is still being written. In practice: anything that takes down the join flow or check-in is treated as a <span class="pf-sev pf-sev--1">SEV1</span> — all hands, exec visibility. A degraded-but-working core surface pages the owning team; non-core breakage with a workaround becomes a ticket fixed in business hours.

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

:::note
Peak load is 5–7am local time in every timezone — treat a 6am SEV2 like a SEV1 until proven otherwise.
:::
