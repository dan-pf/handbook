---
title: How do I rotate a secret?
description: Secrets live in HashiCorp Vault and reach services via Spring Cloud Vault with Kubernetes auth.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jun 15, 2026
readTime: 2 min read
stub: true
tableOfContents: false
---

Secrets live in **HashiCorp Vault** and reach services via Spring Cloud Vault with Kubernetes auth — AWS credentials are dynamically leased rather than stored. Vault access and rotation procedures live in the [runbooks repo](https://github.com/planetfitness/runbooks) (published via Backstage TechDocs); a distilled version will land here.
