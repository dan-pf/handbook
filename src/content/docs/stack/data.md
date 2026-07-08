---
title: How do we store and move data?
description: Per-service PostgreSQL, Kafka events, and a Snowflake warehouse built with dbt.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jun 22, 2026
readTime: 3 min read
stub: true
tableOfContents: false
facts:
  - label: Operational store
    value: Aurora PostgreSQL 16 or DynamoDB single-table, one database per service
  - label: Event backbone
    value: SQS FIFO queues between services; Kinesis data-platform streams for analytics
  - label: Warehouse
    value: Snowflake, fed from the Kinesis data-platform streams
  - label: Transformations
    value: dbt — models reviewed like code
---

Operational data lives in per-service Aurora PostgreSQL or DynamoDB; analytics events flow over Kinesis data-platform streams into Snowflake, where dbt builds the models that analytics and finance run on.
