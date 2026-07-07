---
title: What powers our backend?
description: The domain services, the rules of the mesh, and how (not) to start a new service.
owner: Priya Nair
initials: PN
avatarColor: '#340059'
updated: Jun 22, 2026
readTime: 4 min read
---

The backend is a set of **Java 21 / Spring Boot 3** domain services on Kubernetes, meshed with Istio, talking REST at the edge and Kafka between themselves.

## The services

| Service | Owns | Team |
| --- | --- | --- |
| membership-svc | Plans, agreements, member lifecycle | Membership |
| billing-svc | Payments, dunning, annual fees | Billing |
| club-svc | Club data, hours, amenities | Clubs |
| checkin-svc | Check-ins, Crowd Meter counts | Clubs |
| notify-svc | Email, push, SMS fan-out | Platform |

## The rules of the mesh

- **One service, one database.** PostgreSQL (Aurora), schema owned by the service. Cross-service reads go through APIs or Kafka, never JDBC.
- **Events for facts, APIs for questions.** State changes publish to Kafka (`member.checked_in.v2`); synchronous lookups use REST with Istio mTLS.
- **Traffic policy lives in the mesh.** Retries, timeouts, and circuit-breaking are Istio config, not application code.
- **Contract-first.** OpenAPI spec merges before implementation; breaking changes require a new versioned topic or path.

## Starting a new service

Don't. Nine times out of ten your feature belongs in an existing domain. If you can make the case (new domain, new team, or real scaling boundary), scaffold from the template:

```sh
pf new-service --name workouts-svc --team fitness
# generates Spring Boot 3 skeleton, Helm chart, Istio VirtualService,
# Datadog dashboards, and an ArgoCD app pointed at staging
```
