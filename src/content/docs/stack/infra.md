---
title: What runs underneath everything?
description: Containers on Kubernetes, meshed with Istio, defined in Terraform, delivered by ArgoCD.
owner: Alex Kim
initials: AK
avatarColor: '#551497'
updated: Jun 28, 2026
readTime: 3 min read
stub: true
tableOfContents: false
facts:
  - label: Orchestration
    value: Kubernetes (EKS), one cluster per environment
  - label: Service mesh
    value: Istio — mTLS, traffic shifting, retries, circuit breaking
  - label: Infra as code
    value: Terraform, PR-reviewed, applied via Atlantis
  - label: Delivery
    value: ArgoCD — GitOps, auto-sync from main
---

Everything ships as a container to Kubernetes, meshed with Istio, defined in Terraform, and delivered by ArgoCD. Nobody SSHes into anything.
