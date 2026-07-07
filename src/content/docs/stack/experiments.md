---
title: How do we run A/B tests?
description: LaunchDarkly for assignment, Amplitude for analysis, and a written hypothesis before anything ships.
owner: Jordan Reyes
initials: JR
avatarColor: '#026700'
updated: Jul 2, 2026
readTime: 4 min read
---

Assignment happens in **LaunchDarkly**, analysis happens in **Amplitude**, and every experiment on a revenue surface needs a written hypothesis before it ships. No hypothesis, no test.

## When to test (and when not to)

Test when the change plausibly moves a join-flow or retention metric and you'd genuinely act differently on a negative result. Don't test bug fixes, accessibility work, or anything with under ~50k weekly exposures — you won't reach power, you'll just reach false confidence.

## Launching one

1. Write the one-pager: hypothesis, primary metric, guardrails, minimum detectable effect, run length. Template lives in `pf-eng/experiments`.
2. Get a review from the Growth analyst on your pod — they check the power math, not your taste.
3. Create the flag as `exp-<surface>-<slug>` with a 50/50 split, targeting off.
4. Ship dark, verify exposure events fire in Amplitude staging, then ramp: 5% → 50% over two days.

## Guardrail metrics

Every join-flow experiment carries the same guardrails: join completion rate, payment error rate, and p75 page latency. Any guardrail regressing past its threshold auto-pages Growth on-call and the flag gets killed — winners on the primary metric don't get to break checkout.

## Calling a winner

Experiments run their pre-registered length — no peeking-and-stopping. At the end, the analyst posts the readout in `#growth-readouts`: ship it, kill it, or rerun with a bigger MDE. Shipped winners get the flag removed within two weeks; dead flags are tech debt.

:::caution
Lifecycle marketing (email/push journeys in Iterable) has its own experimentation loop owned by the Marketing Eng pod — coordinate before testing on the same audience in the same week.
:::
