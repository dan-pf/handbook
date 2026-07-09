---
title: How do I get started with Kubernetes & EKS?
description: A first-timer's guide to our clusters — the concepts, the one-time setup, logging in, and the commands you'll actually use.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jul 8, 2026
readTime: 7 min read
---

Every PF service runs as a container on **Kubernetes**, hosted on AWS's managed **EKS** (Elastic Kubernetes Service). If you've never used Kubernetes, this page gets you from zero to `kubectl`-ing into a cluster. For the bigger platform picture, see [what runs underneath everything](/stack/infra/) and [the backend](/stack/backend/).

## Concepts in 60 seconds

You don't need to be a Kubernetes expert to operate our services, but these seven words show up everywhere:

- **Cluster** — one Kubernetes environment. We run one per environment (`nonprod`, `prod`, and PCI-scoped `nonprod-cde` / `prod-cde`).
- **Node** — a VM in the cluster that runs your containers. You rarely touch these directly.
- **Pod** — the smallest unit you *do* touch: one running instance of a service (one or more containers). When something is wrong, you're usually looking at a pod.
- **Deployment** — the desired state ("run 3 pods of `membership` at this image"). Kubernetes reconciles reality to match it; a rollback is just pointing it at the previous image.
- **Service** — a stable in-cluster address that load-balances across a deployment's pods (e.g. `membership.default.svc.cluster.local`).
- **Namespace** — a folder that groups resources. Most of ours live in `default`.
- **Context** — which cluster + user `kubectl` is currently talking to. Switching environments = switching context.

The tool you drive all of this with is **`kubectl`**. It reads your *kubeconfig*, which holds one context per cluster you've logged into.

## One-time setup

Install the toolchain with [Homebrew](https://brew.sh):[^eks]

```sh
# Vault moved off the default formula after HashiCorp's license change:
brew tap hashicorp/tap
brew install hashicorp/tap/vault

# the rest:
brew install awscli aws-iam-authenticator kubectl jq
```

Then add the login helpers to your shell profile (`~/.zshrc` or `~/.bashrc`). These wrap the whole Vault → AWS → kubeconfig dance into one command per cluster:[^eks]

```sh
export VAULT_GITHUB_TOKEN=<your GitHub token>
export VAULT_SKIP_VERIFY=true
export AWS_REGION=us-east-1

# (paste the login-vault / login-aws / login-eks functions and the
# nonprod_eks_developer-style aliases from the Accessing EKS runbook)
```

Reload your shell: `source ~/.zshrc`.

The full, current function definitions live in the runbook — copy them from there rather than from memory, since they change.[^eks]

:::note[We're streamlining this]
This setup works but has known rough edges we're actively improving (see the internal `docs/eks-dx-proposal.md`). While you're here:

- **Prefer the browser login.** `login-vault` uses Vault OIDC (a browser → Auth0 flow), so you can leave `VAULT_GITHUB_TOKEN` unset and skip storing a personal token. Only fall back to a GitHub PAT if the browser flow isn't available to you.
- **`aws-iam-authenticator` is legacy.** Modern EKS authenticates through the `aws eks get-token` plugin that `aws eks update-kubeconfig` wires up automatically — you likely won't need the authenticator binary, even though the runbook still lists it.
- **`VAULT_SKIP_VERIFY=true`** disables Vault's TLS check. It's in the current setup, but it's a flagged issue — don't carry the habit to other tools.
:::

## Logging in

Each cluster has an alias. Run the one for the environment you need:

| Command | Cluster | What it is |
| --- | --- | --- |
| `nonprod_eks_developer` | `nonprod` | Staging — where you'll spend most of your time |
| `prod_eks_developer` | `prod` | Production |
| `cde_nonprod_eks_developer` | `nonprod-cde` | PCI-scoped nonprod (join/payment) |
| `cde_prod_eks_developer` | `prod-cde` | PCI-scoped production |

Each alias logs you into Vault (via GitHub OIDC → Auth0), pulls short-lived AWS credentials, and writes the cluster's context into your kubeconfig. A few things to know:[^eks]

- **Access is role-based.** Roles come from your GitHub team — a login for a cluster you're not authorized on fails with a **403**. If your role looks wrong, ask your tech lead.
- **Developer vs operator.** The `_developer` aliases are read-mostly; `_operator` variants (e.g. `nonprod_eks_operator`) carry elevated permissions. Use developer unless you specifically need operator.
- **Credentials expire.** If a `kubectl` command suddenly says you must be logged in, your credentials lapsed — just re-run the alias.

## The commands you'll actually use

```sh
kubectl config get-contexts          # which clusters am I logged into? (* = current)
kubectl config use-context nonprod   # switch clusters

kubectl get pods                     # list pods in the default namespace
kubectl get pods | grep membership   # find a specific service's pods
kubectl logs <pod>                   # its logs (add -f to follow)
kubectl describe pod <pod>           # events + why it's unhealthy
kubectl exec -it <pod> -- sh         # shell inside a container
```

For most incident work, `get pods` → `logs` → `describe` is the loop. Deleting a pod (`kubectl delete pod <pod>`) makes the deployment recreate it — a common quick mitigation, but treat it as stabilizing the symptom, not a fix (see [incidents](/production/incidents/)).

## Setting up for services development

To build the Java services locally you need AWS keys for Gradle, which are stored in Vault. Once you can reach the `nonprod` cluster:[^devenv]

1. Log in: `nonprod_eks_developer`.
2. From the [runbooks repo](https://github.com/planetfitness/runbooks), source the Vault env: `bash bin/nonprod-vault.env`.
3. Run `bin/setup_pfx_maven_creds.sh` — it writes `AWS_ACCESS_KEY` / `AWS_SECRET_KEY` into `~/.gradle/gradle.properties`. Then `gradle build` should work.

The runbook suggests wrapping steps 1–3 in a shell function (`update_maven_creds`) so refreshing expired keys is one command.[^devenv] For local databases you'll also want Docker (`brew install docker docker-compose colima`) and the [psql repo](https://github.com/planetfitness/psql) for DB access.

## Where the source of truth lives

These are handbook-friendly summaries; the authoritative, current steps (and the exact function definitions) are in the runbooks repo — copy commands from there.

- [Accessing EKS](https://github.com/planetfitness/runbooks/blob/master/business-as-usual/kubernetes/eks_usage.md) — cluster login, tools, aliases.[^eks]
- [Services dev environment setup](https://github.com/planetfitness/runbooks/blob/master/docs/dev/environment_setup.md) — Gradle/Vault/DB.[^devenv]
- [Vault Usage](https://planetfitness.atlassian.net/wiki/spaces/PFX/pages/114884970/Vault+Usage) (Confluence) — first-time Vault login.

[^eks]: [runbooks — `business-as-usual/kubernetes/eks_usage.md`](https://github.com/planetfitness/runbooks/blob/master/business-as-usual/kubernetes/eks_usage.md) ("Accessing EKS").
[^devenv]: [runbooks — `docs/dev/environment_setup.md`](https://github.com/planetfitness/runbooks/blob/master/docs/dev/environment_setup.md) ("Setting up the Development Environment for Services").
