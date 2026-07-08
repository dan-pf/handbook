---
title: How do I set up my dev environment?
description: Staging links, test data, and how to generate a staging test user with Playwright.
owner: Shaun Connor
initials: SC
avatarColor: '#026700'
updated: Jun 26, 2026
readTime: 3 min read
---

There's no single setup script — each repo documents its own local run (`remix-run` and the service repos all follow `npm i` / `make`-style flows with LocalStack or mocks). What trips people up is the surrounding stuff: staging access, test data, and test users. Start here.

## Useful links

- **PF Staging (nonprod)** — [staging.planetfitness.com](https://staging.planetfitness.com/). Behind HTTP basic auth (enforced at the edge) — get the credentials from your team.
- **Staging test data for the join flow** — [Confluence: Staging Test Data for Join flow](https://planetfitness.atlassian.net/wiki/spaces/engg/pages/1936883723).
- **DataTrak (ABC UI)** — [staging.planetfitness.com/member-services/datatrak](https://staging.planetfitness.com/member-services/datatrak).
- **ABC API documentation** — [abcfinancial.3scale.net/docs](https://abcfinancial.3scale.net/docs/).
- **PFX dynamic configuration / config-server** (service feature flags) — [Confluence: Usage of dynamic configuration](https://planetfitness.atlassian.net/wiki/spaces/PFX/pages/3846733866).
- **Legacy PFX architecture diagram** — [Confluence: PFX-Platform Services](https://planetfitness.atlassian.net/wiki/spaces/PFX/pages/69566465).

## Generate a staging test user (~30 seconds)

The join happy-path Playwright test in [remix-run](https://github.com/planetfitness/remix-run) doubles as a test-user factory:

1. Clone `remix-run`, then `npm i` and `npx playwright install`.
2. Edit `tests/e2e/remix-run/en-US/join-happy-path.spec.ts` with your desired email, first name, last name, and club (Raymond, NH is a good pick).
3. Delete the `skip` on the test.
4. Run it against staging:

```sh
HTTP_AUTH_USERNAME='<staging user>' \
HTTP_AUTH_PASSWORD='<staging password>' \
PLAYWRIGHT_BASE_URL='staging.planetfitness.com' \
npx playwright test tests/e2e/remix-run/en-US/join-happy-path.spec.ts --ui
```

:::caution
This flow requires **Node 25.0.0** — newer versions cause it to fail.
:::

:::note
Source of truth: [Useful Links](https://planetfitness.atlassian.net/wiki/spaces/PFX/pages/5918654508) in the PFX Digital Solutions Confluence space. Propose changes there first, then sync this page.
:::
