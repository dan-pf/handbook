# EKS + Vault developer-experience proposal

**Date:** Jul 8, 2026 · **Audience:** DI / platform + eng leadership · **Scope:** the local developer flow for authenticating to EKS clusters and Vault, as documented in [`eks_usage.md`](https://github.com/planetfitness/runbooks/blob/master/business-as-usual/kubernetes/eks_usage.md) and [`environment_setup.md`](https://github.com/planetfitness/runbooks/blob/master/docs/dev/environment_setup.md).

**TL;DR:** We do the hard security thing right — short-lived, dynamic credentials, no long-lived AWS keys on laptops. The friction is in *packaging* (copy-pasted shell glue, a deprecated tool, expiring creds) plus two config choices that are outright security smells (`VAULT_SKIP_VERIFY=true`, a stored GitHub PAT). The DX win is mostly consolidation, not a rebuild. Owner of the decision is DI, since it touches identity and cost.

---

## The flow today

To touch a cluster, every developer: installs a five-tool chain (`awscli`, `aws-iam-authenticator`, `kubectl`, `vault`, `jq`) → pastes `login-vault` / `login-aws` / `login-eks` shell functions and per-env aliases into their profile → exports a **GitHub PAT** and **`VAULT_SKIP_VERIFY=true`** → runs an alias that logs into Vault (OIDC → Auth0), reads *dynamic* AWS credentials, writes them to `~/.aws`, and updates kubeconfig. Credentials expire → re-run the alias. Application secrets live in a *second, in-cluster* Vault reached via `kubectl port-forward`.

## What we're doing right (keep)

- **No long-lived AWS keys on laptops** — Vault issues dynamic, short-lived, auto-expiring credentials, exactly per [AWS EKS IAM best practices](https://aws.github.io/aws-eks-best-practices/security/docs/iam/).
- **Federated identity, RBAC by GitHub team** — unauthorized cluster login fails with a 403.
- **PCI (CDE) clusters isolated** with separate credentials.
- **Backstage is already deployed** — the foundation for a golden path exists.

## Findings

### Security (fix regardless of any larger change)

1. **`VAULT_SKIP_VERIFY=true` in every shell profile** disables TLS verification to Vault — a standing MITM exposure, and it normalizes "skip the cert" as a team habit. Fix: proper CA trust so verification stays on.
2. **A long-lived GitHub PAT in plaintext `~/.zshrc`** — a static secret on every laptop, broad scope, painful to rotate/revoke. `login-vault` already supports browser OIDC (`-method=oidc`), which stores nothing; the PAT is the weaker of the two paths we already ship.

### Developer experience

3. **Copy-pasted shell functions drift.** The two runbooks already disagree — `eks_usage.md` defines `nonprod_eks_developer`; `environment_setup.md` says run `eks-developer nonprod`. Unversioned setup guarantees this.
4. **We install the deprecated `aws-iam-authenticator`.** Modern EKS authenticates via the built-in `aws eks get-token` exec plugin that `aws eks update-kubeconfig` wires up; the `aws-auth` ConfigMap is deprecated in favor of [EKS Access Entries](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html). We carry a tool we no longer need (and a common source of `v1alpha1` breakage).
5. **Credentials expire mid-task → manual re-run.** No auto-renewal.
6. **Two Vaults + `port-forward`** is real cognitive load, especially for newcomers.

## What other enterprises do

| Approach | What it buys | Cost |
| --- | --- | --- |
| **AWS IAM Identity Center (SSO) + EKS Access Entries** | `aws sso login` (browser) → short-lived creds; `aws eks update-kubeconfig` wires kubectl. Removes the PAT, skip-verify, `aws-iam-authenticator`, and most shell glue *for cluster access*. Keep Vault for dynamic app/DB secrets. [AWS: cluster access management](https://docs.aws.amazon.com/eks/latest/best-practices/cluster-access-management.html) | Identity/SSO setup; low ongoing |
| **Access proxy — Teleport / StrongDM / Boundary** | One SSO login → short-lived *certs* for k8s + AWS + DB together, JIT least-privilege, full audit/session recording (strong for PCI/CDE). [Teleport](https://goteleport.com/compare/hashicorp-boundary-alternative/) · [StrongDM](https://www.strongdm.com/blog/alternatives-to-hashicorp-vault) | New product + license |
| **Platform golden path — Backstage Scaffolder + one CLI** | Onboarding "from days to minutes"; one versioned command instead of a copy-paste checklist. We already run Backstage. [Golden paths](https://platformengineering.org/blog/what-are-golden-paths-a-guide-to-streamlining-developer-workflows) | Platform-team effort |
| **Vault Agent auto-auth + token renewal** (if staying on Vault) | Kills the expire-and-re-run friction | Config only |

## Recommendation

### Quick wins — do regardless, days not quarters
1. **Remove `VAULT_SKIP_VERIFY`** — trust Vault's CA properly.
2. **Default to browser OIDC**, drop the stored GitHub PAT.
3. **Drop `aws-iam-authenticator`** — rely on `aws eks get-token`.
4. **Ship the shell functions as one versioned, `source`-able script (or a tiny `pf` CLI)** instead of copy-paste — ends the drift.
5. **A `Brewfile` / `mise` / devcontainer** so the toolchain is one command.

### Strategic — higher payoff
Migrate **human** cluster/AWS access to **IAM Identity Center + EKS Access Entries**, keeping Vault for dynamic secrets (its strength). That one change deletes the PAT, the skip-verify, the deprecated authenticator, and most of the shell glue — `aws sso login` becomes the whole story. If unified k8s + DB + AWS access with JIT and audit is a priority (plausible for PCI), evaluate **Teleport/StrongDM** instead. Either way, wrap the end state in a **Backstage golden path** so a new dev is productive in minutes.

## Caveats

- Assessed from the runbooks, not from running the flow here — some edges may already be smoother in practice.
- The SSO-vs-access-proxy-vs-polish-Vault call depends on cost and who owns identity. **This is DI's decision to make; this doc is input, not a mandate.**

*Compiled Jul 8, 2026 from the two runbook docs above and current AWS/industry guidance (linked inline). Share with DI before acting.*
