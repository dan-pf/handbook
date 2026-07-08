---
title: Why does this handbook exist?
description: What the handbook is for, what belongs in it, and how to change it.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jun 30, 2026
readTime: 3 min read
---

This handbook is the single source of truth for how Planet Fitness engineering works: how we're organized, what we build with, how we ship, and what to do when things break.

## The short version

If a decision, process, or system matters for more than one sprint, it gets written down here. Slack threads expire. Tribal knowledge leaves when people do. The handbook doesn't.

- **Default to the handbook.** If your question starts with "how do we…", search here before asking in Slack.
- **Every page has an owner.** The owner keeps it accurate — but anyone can propose a change.
- **Wrong beats missing.** An outdated page gets fixed in minutes. Knowledge that was never written down is gone.

:::note
This is a judgement-free zone in the most literal sense: there are no dumb questions here, only undocumented answers. If you had to ask a human, that's a bug in the handbook — file it.
:::

## What belongs here

Processes ("how do we review code?"), architecture decisions and their reasoning, runbooks, on-call expectations, onboarding paths, and the values we actually operate by. If two engineers have asked the same question, it belongs here.

## What doesn't

Sprint-level status (that lives in Jira), API reference docs (generated from code), anything member-data-sensitive (internal wiki with access controls), and HR policy (People team owns that handbook).

## How to change it

The handbook is a repo. Hit **Suggest an edit** on any page to open a PR against `planetfitness/handbook`. The page owner reviews it like any other PR — usually same day. Typos don't need review; merge them.
