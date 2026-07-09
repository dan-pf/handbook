---
title: How are teams structured?
description: Four Experience Workstreams, each subdivided into pods aligned to a member journey — plus the cross-cutting Constellation program.
owner: Dan Lourenço
initials: DL
avatarColor: '#AD43DB'
updated: Jul 8, 2026
readTime: 6 min read
---

PF Engineering is organized into **four Experience Workstreams**, each aligned to a slice of the member journey and subdivided into **pods** — small cross-functional teams that own a specific outcome.[^topology]

One program cuts across the org: **Constellation Scale Readiness** runs as four pods in three different workstreams (Join, Billing, Account Mgmt, Check In) — highlighted below.

```mermaid
flowchart TD
  ENG["PF Engineering"]
  ENG --> W1["Prospect &amp; Join<br/>Experience"]
  ENG --> W2["Member Lifecycle<br/>Experience"]
  ENG --> W3["Workout &amp; Wellness<br/>Experience"]
  ENG --> W4["App Redesign<br/>Experience"]
  W1 --> P11["Constellation: Join"]
  W1 --> P12["Digital Rejoin"]
  W1 --> P13["Marketing Enablement"]
  W1 --> P14["Intl Support (Mexico)"]
  W2 --> P21["Constellation: Billing"]
  W2 --> P22["Constellation: Account Mgmt"]
  W2 --> P23["Bill on Join"]
  W3 --> P31["Constellation: Check In"]
  W3 --> P32["App Redesign Services"]
  W4 --> P41["iOS Pod"]
  W4 --> P42["Android Pod"]
  W4 --> P43["Core Pod"]
  classDef constellation fill:#E4D2F7,stroke:#470A68,color:#340059;
  class P11,P21,P22,P31 constellation;
```

## Workstream leadership

| Workstream | Solution Lead | Tech Lead | Data Lead | Design Lead |
| --- | --- | --- | --- | --- |
| Prospect & Join | Michelle Cominos | Jeremiah Dow | Joey LaRocca | Jim Joyce |
| Member Lifecycle | Addy Hallowell | Dan Thibault | Colin Proser | Kim Boualavong |
| Workout & Wellness | Hallianna D'Andreti | Kayleigh Mitchell | Ajinth Christudas | Selina Taylor |
| App Redesign | Hallianna D'Andreti | Jamie Hagemeister | Aaron Slocum | Selina Taylor |

**Program Manager** across all four workstreams: Erin Wright. **App Redesign design** is supported by Chrissy Greco + Madeleine Kosheff. **Manual QA** is pooled per workstream rather than per pod:

- **Prospect & Join** — Yury Shpakovsky, Tatiana Bilevich, Daniil Deryabin, Denis Prakharchuk
- **Member Lifecycle** — Svetlana Kot, Alina Butrim, Ksenia Klyavets
- **Workout & Wellness** — Alena Zharina, Pavel Smelovsky
- **App Redesign** — Natalia Smolyarova, Zhanna Kabieva, Ksenia Klyavets, Ilona Khvastiyonok, Alexandra Tkachik

## Prospect & Join Experience

Serves prospects through the join flow. Workstream mobile: Pavlo Lukianets (Android); iOS TBD.

| Pod | Product & delivery | Engineering |
| --- | --- | --- |
| **Constellation: Join** | **PM** Michelle Cominos<br/>**Design** Jim Joyce<br/>**Scrum** Mercedes Blattner<br/>**Assoc. PM** Polina Bolonkina | **Tech lead** Dan Lourenço<br/>**Dev lead** Vlad Kondratenko<br/>Kostya Atashonok · Services<br/>Artem Slednev · Services<br/>Kostya B · Services<br/>Roman Martsenyuk · Web/Services |
| **Digital Rejoin** | **PM** Noah Brown<br/>**Design** Jim Joyce<br/>**Scrum** Theresa Centeno | **Tech lead** Jeremiah Dow<br/>**Dev lead** Joel Frederick<br/>Margarita Kuznetsova · Web/Services<br/>Adrian Luca · Web/Services |
| **Marketing Enablement** | **PM** Caroline Menice<br/>**Design** Chrissy Greco<br/>**Scrum** Theresa Centeno | **Tech lead** Sean Merritt<br/>**Dev lead** Nastya Medvedeva<br/>Dmitry Triput · Services<br/>Eugen Baranov · Web/Services<br/>Claudiu Anghel · Web |
| **Intl Support (Mexico)** | **PM** Noah Brown<br/>**Design** Chrissy Greco<br/>**Scrum** Mercedes Blattner | **Tech lead** TBD<br/>**Dev lead** TBD<br/>Engineering staffing TBD |

## Member Lifecycle Experience

Owns the member account lifecycle and billing. Mobile: Anton Kurasov (Android, shared with App Redesign); iOS TBD.

| Pod | Product & delivery | Engineering |
| --- | --- | --- |
| **Constellation: Billing** | **PM** Addy Hallowell<br/>**Design** Kim Boualavong<br/>**Scrum** Lena Samal<br/>**Assoc. PM** Christian Concha | **Tech lead** Stephen Aguilar<br/>**Dev lead** Lorena Tomagnini<br/>Eduardo Cotta · Services<br/>Diego Santos · Services<br/>Andrei Rotaru · Web<br/>Stan Marudau · Web |
| **Constellation: Account Mgmt** | **PM** Addy Hallowell<br/>**Design** Kim Boualavong<br/>**Scrum** Lena Samal<br/>**Assoc. PM** Christian Concha | **Tech lead** Darshan Gajjar<br/>**Dev lead** Tonya Jiang<br/>Vini Barros · Services<br/>Rajashekar P · Services<br/>Clayton Mendonça · Services<br/>Kaushik Dey · Services<br/>Alex Karaychentsev · Web |
| **Bill on Join** | **PM** Addy Hallowell<br/>**TW PM** Kamille King<br/>**Design** Kim Boualavong<br/>**Scrum** Kamille King | **Tech lead** Shaun Connor<br/>**Dev lead** Inga Farberov<br/>Caroline Ogata · Services<br/>Vibhuti Tagra · Services<br/>Mohini Baramade · Services<br/>Thais Siqueria · Quality Eng<br/>Sudhamsh Kandukuri · DI |

## Workout & Wellness Experience

Owns in-club and workout experiences. Mobile: Dmitry Yaskov (iOS, shared with App Redesign); Android TBD.

| Pod | Product & delivery | Engineering |
| --- | --- | --- |
| **Constellation: Check In** | **PM** Lisa DeBenedictis (→ TBH)<br/>**Design** Cassie Baldwin (→ TBD)<br/>**Scrum** Adam Wiggin | **Tech lead** Kayleigh Mitchell<br/>Manish Yadav · Services<br/>Fernando Soto · Services<br/>Theo Muller · Services<br/>Amanda Saraiva · Services<br/>Matheus Nicolas · Services<br/>Tahir Mirza · Services |
| **App Redesign Services** | **Solution lead** Hallianna D'Andreti (+ Paul Branco →)<br/>**Scrum** Adam Wiggin | **Tech lead** Kayleigh Mitchell<br/>**Dev lead** Jorge Amaro<br/>Jose Alberto Rubalcaba · Services<br/>Luis Ramirez · Services<br/>Benjamin Arce · QA Automation (starts 07/20) |

## App Redesign Experience

Rebuilds the native mobile apps.

| Pod | Product & delivery | Engineering |
| --- | --- | --- |
| **iOS Pod** | **PM** Hallianna D'Andreti (+ Paul Branco →)<br/>**Design** Selina Taylor<br/>**Scrum** Anna Kozhurenko<br/>**Assoc. PM** Mark Sultanov, Haley Brand | **Tech lead** Ilya Usikov<br/>Maksim Zalessky · Mobile<br/>Yury Murashko · Mobile<br/>Rohit Didwania · Mobile<br/>Vladislav Sharandin · Mobile<br/>Andrey Skrigalovsky · Mobile<br/>Nika Tsishkouskaya · Mobile<br/>Dmitry Yaskov · Mobile<br/>Eugen Sazonov · QA Automation<br/>Ksenia Samtsova · QA Automation |
| **Android Pod** | **PM** Hallianna D'Andreti (+ Paul Branco →)<br/>**Design** Selina Taylor<br/>**Scrum** Anna Kozhurenko<br/>**Assoc. PM** Mark Sultanov, Haley Brand | **Tech lead** Anton Kurasov<br/>Timofey Yasyuchenya · Mobile<br/>Dmitry Nikiforov · Mobile<br/>Raman Lebiadzinski · Mobile<br/>Tamara Shevtsova · Mobile<br/>Emel Ahmed · Mobile<br/>Stefan Chiorescu · Mobile<br/>Michael Frenkel · Mobile<br/>Viktor Balabushko · QA Automation<br/>Viktor Tyulikov · QA Automation |
| **Core Pod** | **PM** Hallianna D'Andreti (→ TBH)<br/>**Scrum** Anna Kozhurenko | **Tech lead** Ryan Byrne<br/>Viktor Khmelevsky · Services<br/>Tatiana Mikhailova · Services |

:::note
Arrows (→) mark in-flight transitions (→ TBH = backfill being hired, → TBD = successor not yet named). This page mirrors the quarterly topology sheet — treat that as the source of truth for current membership.
:::

[^topology]: *Team Topology — 2026 Q3 (Alignments)* (internal sheet). <!-- TODO: replace with the Google Sheet / Confluence URL once provided --> Live link pending. Reflects Q3 2026 alignments; re-sync each quarter.
