---
title: What runs underneath everything?
description: Containers on Kubernetes, meshed with Istio, defined in Terraform, delivered by CD pipelines.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
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
    value: Continuous Delivery pipelines — see the delivery pipeline page
---

Everything ships as a container to Kubernetes, meshed with Istio, defined in Terraform, and delivered through our Continuous Delivery pipelines. Nobody SSHes into anything.
