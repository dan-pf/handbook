---
title: How do we store and move data?
description: Per-service PostgreSQL, Kafka events, and a Snowflake warehouse built with dbt.
owner: Priya Nair
initials: PN
avatarColor: '#340059'
updated: Jun 22, 2026
readTime: 3 min read
stub: true
tableOfContents: false
facts:
  - label: Operational store
    value: PostgreSQL 16 (Aurora), one database per service
  - label: Event backbone
    value: Kafka (MSK) — versioned topics, schema registry
  - label: Warehouse
    value: Snowflake, loaded via Kafka Connect + Fivetran
  - label: Transformations
    value: dbt — models reviewed like code
---

Operational data lives in per-service PostgreSQL; events flow over Kafka into Snowflake, where dbt builds the models that analytics and finance run on.
