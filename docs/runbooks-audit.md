# Runbooks repo audit

**Date:** Jul 8, 2026 · **Scope:** [`planetfitness/runbooks`](https://github.com/planetfitness/runbooks) (126 markdown docs, published via Backstage TechDocs). Reviewed a representative sample across the incident process, rollback, alarm runbooks, prod-release, support-remediation scripts, and website SEV1 doc. Owning team: `services-developers`.

**TL;DR:** The best material is strong — the incident process and the alarm runbooks are genuinely good patterns. But quality is uneven: severity is admittedly undefined, several docs lead with narrative instead of steps, dashboard links are frozen to 2022, and there's no per-doc owner/review metadata. None of this is a fire; together it's the drift that makes an on-call engineer distrust the docs at 3am. The handbook now owns two of the gaps (severity taxonomy, a runbook-writing convention); the rest are upstream cleanup for the owning team.

---

## What's good (keep and copy)

- **Incident process** (`in-case-of-production-issues/on-call/on_call_activities.md`) — clear Point role, RED/GREEN channel status, announce-before-you-change, side-conversations-discouraged. This is the model.
- **Alarm runbooks** (`.../pfx-services/on-call/*.md`) — consistent *Alert → likely cause → numbered steps* shape. This is the template other runbooks should adopt.
- **Rollback** (`.../rollback/application.md`) — real copy-paste `kubectl rollout` commands, with the "also rerun the CircleCI workflow to revert infra" caveat.

## Findings

### 1. Severity is undefined (highest impact)
`on_call_activities.md` says, verbatim, "update the channel status to RED with the Severity *(I plan to write a Wiki entry to classify severity)*." `website/on-call/join.md` then uses "severity-1 / severy 1" ad hoc. There is no shared taxonomy. → **Handbook action taken:** a proposed SEV1/2/3 table now lives on the incidents page, marked pending ratification. Ratify it with on-call and link the runbooks to it.

### 2. Narrative-first instead of procedure-first
`.../support/purge_sqs_queue.md` opens with a paragraph about a 2019 performance test (300k messages) before the 4 actual steps. Runbooks should lead with *when this applies* and *steps*; backstory goes last.

### 3. Frozen dashboard links
`website/on-call/join.md` pastes Datadog URLs with hardcoded `from_ts`/`to_ts` from Feb 2022 — every "click here" opens a three-year-old window. Link the monitor/dashboard itself or use relative ranges.

### 4. Console click-throughs over automation
`purge_sqs_queue.md` is a screenshot-driven walk through the AWS console. Brittle (drifts with every console redesign) and in tension with the team's own tenet ("prefer automation; write runbooks only where automation isn't possible").

### 5. Symptom-first fixes with no escalation path
`.../on-call/events_not_published_to_kinesis.md` ends at "delete the pod." No "confirm root cause / if it recurs, escalate or open a COE" — so the same page can fire nightly with the same band-aid.

### 6. No owner / last-reviewed metadata; visible staleness
No per-doc owner or review date (only a repo-level Backstage `catalog-info.yaml`). Staleness shows: scattered `*needs review` markers, hardcoded 2018 examples, and typos in bodies *and filenames* — `regenarate_waiver.md`, `udpate_crowd_metter_spreadsheet.md`, "Post Morterms," "Comunicate," "inturrupeted." A malformed Confluence link (`...Incident+Response+Process]>`) in `on_call_activities.md`.

### 7. Inconsistent structure & scattered channels
Three different heading conventions across the docs sampled. Slack channels appear as raw archive URLs under different names (`#tw-oncall-ops`, the SEV1 channel, `#system-issue-observations`), with no single "where do I go" list beyond `on_call_quick_links.md` (which the per-doc links then duplicate/diverge from).

## Recommendations for the runbooks owners (`services-developers`)

1. **Adopt one template.** The handbook's [Writing a runbook](../src/content/docs/runbooks/writing-runbooks.md) page codifies it (title = alert text · when it applies · likely cause · parameterized steps · escalation · owner + last-reviewed). Converge the alarm-runbook shape across the repo.
2. **Ratify the severity taxonomy** (handbook incidents page) and reference it from `on_call_activities.md`, replacing the "I plan to write a Wiki entry" note.
3. **De-freeze dashboard links** — a find/replace pass for hardcoded `from_ts`/`to_ts`.
4. **Add owner + last-reviewed front matter** to each runbook; retire `*needs review` markers.
5. **Fix the filename/body typos** (also fixes any inbound links relying on the misspellings).
6. **Convert the highest-traffic console click-paths to checked-in scripts** (start with `purge_sqs_queue`).

*Compiled from a sample review on Jul 8, 2026. Not a line-by-line audit of all 126 docs — findings are representative, not exhaustive. Share with `services-developers` before acting on the upstream items.*
