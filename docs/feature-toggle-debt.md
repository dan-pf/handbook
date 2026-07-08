# Feature-toggle debt audit

**Date:** Jul 8, 2026 · **Scope:** `remix-run` (web toggles), `join` and `offers` (service toggles via `@PFXToggles`), toggle history via GitHub API. Point-in-time snapshot of `master` in each repo — line references will drift.

**TL;DR for leadership:** the toggle *system* is sound (typed, env-split, pipeline-delivered), but hygiene around it is not: a production security gap in the cookie-override mechanism, at least three fully-rolled-out toggles that were never cleaned up, toggle flips bypassing the CR/PR process, and most toggle branches untested on one side. Each item below is small individually; together they're how a nine-toggle file becomes a ninety-toggle swamp.

---

## Critical

### 1. Cookie overrides are active in production

`remix-run/app/middleware/featureToggles.ts` applies `toggle_<name>=<value>` cookie overrides on **every request in every environment** — there is no `HOST_ENV` guard on the override loop (the S3 polling is env-aware; the overrides are not). Consequences, today, in prod:

- Any visitor can set `toggle_bin-validation-enabled=false` and **disable BIN payment validation for their own session** — the exact fraud-prevention control the BIN Filtering experiment is measuring. Same exposure for `stripe-ach-validation`.
- Any visitor who guesses a toggle name can **turn on unreleased features** (`constellation-dgr-enabled`, `rejoin-consolidated-enabled`, `member-portal-freeze-enabled`) in production.
- Values aren't type-checked: any string other than `'true'`/`'false'` is assigned as-is into a boolean toggle and is truthy downstream.

**Remedy:** gate the override loop to nonprod (or require a signed QA cookie), and validate override values against the toggle's type from `prod.json`. This is a ~10-line fix.

## Required

### 2. Fully-rolled-out toggles never cleaned up

The team's own rollout workflow (`feature-toggles/README.md`, step 5) ends with "remove the toggle." That step isn't happening:

| Toggle | Where | Fully on since | Signal |
| --- | --- | --- | --- |
| `passwordless-login` | remix-run | Apr 23, 2026 (~11 weeks) | 1 read site, 0 tests |
| `member-portal-upgrade-enabled` | remix-run | May 14, 2026 (~8 weeks) | commit even says "…and remove transfer routes" — the cleanup habit exists, the toggle survived it |
| `displayMoreThanOneNoCommitmentOffer` | offers | prod + nonprod both `true` | literal `//TODO just a reminder to remove toggle when it is no longer useful` at `MonthlyClassicHeaderLabelRuleset.java:16`; legacy off-branches still shipped |

**Remedy:** retire all three (delete the checks, the keys, and the legacy branches). Suggest a standing rule: a toggle at `true` in prod for >30 days gets a Jira ticket automatically.

### 3. Toggle flips bypass the CR/PR process

`prod.json` history shows direct, PR-less commits flipping production behavior: `toggle on passwordless-login` / `toggle off passwordless-login` (same day, Apr 14), `enable passwordless login` → `toggle off passwordless` (Apr 21), `Enable feature toggle for downgrade flow in production` (Jun 23). The stated process (flip = CR, "arguably more important than the code deploy") is not enforced by anything. The Apr 14–23 flapping is what that looks like in practice.

**Remedy:** branch protection on `feature-toggles/*.json` (require PR + CODEOWNERS review), and reference a CR in the PR description for prod flips.

### 4. Toggle branches are largely untested on one side

- remix-run: `constellation-dgr-enabled` — 8 read sites, **0 test references**. `member-portal-const-transfer-enabled` (5 sites) and `member-portal-freeze-enabled` (3 sites): 0 test references.
- join: both toggles (`routingNumberValidationEnabled`, `abcNachaACHValidationEnabled`) are only ever tested with the toggle **on**; the off-path falls through as a mock default, never asserted.
- offers: `MonthlyClassicNoCommitmentRuleset` only tested with the toggle **off**.

The untested side of a toggle is exactly the side someone will flip during an incident. **Remedy:** both-ways tests as a review requirement for any new toggle read.

### 5. `constellation-dgr-enabled` is scattered across 8 call sites

Eight separate conditionals in non-test code (the audit threshold is 5) — a missing boundary abstraction. Each new DGR-adjacent change adds another `if`. **Remedy:** resolve the toggle once at the route/loader boundary and pass intent (not the flag) downward.

### 6. offers: `ToggleService` is misnamed and hand-threaded through ~10 classes

It's a passive `@PFXToggles` config holder named like a service, living in `service/`, and it's passed through ~10 constructors that never read it to reach 2 real read sites (`OfferSetRulesetFactory` fans it out to 8 factory methods). Compare join's idiomatic `PfxToggles` in `config/` with direct injection. **Remedy:** rename/move to match the join pattern, inject at the two read sites, delete the pass-through parameters — most of this deletes itself when finding #2's toggle is retired.

## Consider

- **7. Dual-system overlap on BIN validation:** the static `bin-validation-enabled` toggle and the VWO `binFiltering` experiment both control the same behavior (`getBinValidationDecision` arbitrates). Fine during the test; once it's called, retire one path and document which system owns the behavior.
- **8. Dormant toggle:** join's `routingNumberValidationEnabled` is `false` in every environment including prod — shipped but never rolled out. Ship it or delete it.
- **9. Legacy cookie shim:** `LEGACY_COOKIE_MAP` (`stripe-test-scenario` → `stripe-ach-validation`) is an undocumented compat path with the same prod exposure as finding #1.
- **10. Naming drift:** web keys mix `*-enabled` suffix and bare names (`passwordless-login`); Java fields mix acronym casing (`abcNachaACHValidationEnabled`); the two services disagree on the holder-class convention. Cheap to standardize while the counts are single-digit.
- **11. Silent staleness:** S3 toggle fetches fail silently (by design, for resilience) — but nothing alerts if prod has been serving stale toggles for hours. A Datadog monitor on toggle-fetch failures would close the gap.

---

## Suggested sequencing

1. **This sprint:** finding #1 (small, real prod exposure). 
2. **Next cleanup window:** findings #2 + #6 together (retiring the offers toggle deletes most of the threading), #3 (branch protection is a settings change).
3. **Adopt as norms:** #4 (both-ways tests) and the >30-day cleanup rule from #2, enforced in review — see `src/content/docs/runbooks/feature-flags.md` for the process page these norms should land in once agreed.

*Compiled from repo analysis on Jul 8, 2026 (five-axis review: correctness, readability, architecture, security, performance). Not yet reviewed by the owning teams — validate findings #1 and #3 with Web and DI before circulating beyond engineering.*
