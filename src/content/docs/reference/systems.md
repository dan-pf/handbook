---
title: Where does the source of truth live?
description: A map of every system we rely on and what it's the authoritative source for — so you never have to guess where to look.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jul 8, 2026
readTime: 4 min read
---

The handbook explains *how* we work; this page tells you *where the authoritative answer lives* for each system. When a handbook page and a system disagree, the system wins — and cites back here.

## Documentation & knowledge

| System | Source of truth for | Where |
| --- | --- | --- |
| Confluence — **PF Software Engineering Team** (`QE` / `engg`) | Engineering practices, guiding tenets, testing conventions, delivery pipeline, Correction of Errors, branching strategy | [wiki/spaces/engg](https://planetfitness.atlassian.net/wiki/spaces/engg) |
| Confluence — **PFX Digital Solutions** (`PFX`) | Useful links, dynamic-configuration usage, legacy PFX architecture | [wiki/spaces/PFX](https://planetfitness.atlassian.net/wiki/spaces/PFX) |
| **Backstage** | Canonical service catalog (owners, lifecycle) + TechDocs (runbooks) | [backstage.planetfitness.com](https://backstage.planetfitness.com) |
| **runbooks** repo (via Backstage TechDocs) | Operational SOPs: on-call, rollback, DLQ reprocessing, alarm playbooks | [github.com/planetfitness/runbooks](https://github.com/planetfitness/runbooks) |
| This handbook | How we work, ship, and run production — pointing at everything above | you're reading it |

## Work tracking & code

| System | Source of truth for | Where |
| --- | --- | --- |
| **Jira** | Work items, sprints, per-team boards (ticket keys like `JOINREVAMP-`, `ACTMGT-`, `BILL-`) | [planetfitness.atlassian.net](https://planetfitness.atlassian.net) |
| **GitHub** (`planetfitness` org) | All source, config, and IaC | [github.com/planetfitness](https://github.com/planetfitness) |
| **CircleCI** | CI/CD pipeline runs and build artifacts | via each repo |
| Feature toggles | Standard flags — S3-backed JSON (web) and `config-server` dynamic config (services) — see [How do I add a feature flag?](/runbooks/feature-flags/) | repo + S3 |
| **VWO FME** | A/B experiments and their assignment — see [How do we run A/B tests?](/stack/experiments/) | VWO console |

## Runtime & operations

| System | Source of truth for | Where |
| --- | --- | --- |
| **AWS** (EKS, ECR, Aurora, DynamoDB, Kinesis, SQS, S3; `us-east-1`) | Where everything runs; per-service data stores | AWS SSO |
| **Datadog** | Metrics, traces, logs, dashboards, SLO monitors | Datadog console |
| **PagerDuty** | On-call schedules and paging | [planetfitness.pagerduty.com](https://planetfitness.pagerduty.com) |
| **HashiCorp Vault** + `config-server` | Secrets and service configuration (Kubernetes auth, leased AWS creds) | in-cluster |
| **Auth0** | Identity and login (member + M2M) | `login.planetfitness.com` / `pf-nonprod.auth0.com` |

## Data & vendors

| System | Source of truth for | Where |
| --- | --- | --- |
| **ABC Financial** | External **system of record** for membership; billing/club data. DataTrak is its UI | [DataTrak](https://staging.planetfitness.com/member-services/datatrak) · [ABC API docs](https://abcfinancial.3scale.net/docs/) |
| **Zuora** | Payments and billing subscriptions (via `billing-zra-proxy` / `payment-zra-proxy`) | vendor console |
| **Contentful** | Web CMS content — the "Website" space is canonical; "Workflow 2X" is legacy being migrated off | Contentful |
| **Snowflake** | Analytics warehouse, fed from Kinesis data-platform streams | Snowflake |

## Communication

| System | Source of truth for | Where |
| --- | --- | --- |
| **Slack** (`planetfitnesscsc.slack.com`) | Async engineering discussion; incident channel `#tw-oncall-ops` | Slack |
| **Microsoft Teams** | Async messaging with non-IT partners; formal write-ups for leadership | Teams |
| **Lucid** | Diagrams | access via `infrasupport@planetcsc.com` |

:::note
Access to most of these is set up during [onboarding](/onboarding/dev-environment/); your buddy files any request that's missing. If a system is missing here, that's a bug in this page — [suggest an edit](https://github.com/planetfitness/handbook).
:::
