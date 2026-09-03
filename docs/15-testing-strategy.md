# PurpleDevs Testing Strategy

## 1. Objectives

Testing protects conversion, content credibility, accessibility, visual intent, privacy, and reliable inquiry delivery. The strategy favors deterministic unit and integration coverage, with focused browser tests for critical journeys.

## 2. Test layers

| Layer | Tools | Primary responsibility |
| --- | --- | --- |
| Static checks | TypeScript, ESLint, Prettier | Types, conventions, obvious defects |
| Schema tests | Vitest, Zod | Inquiry, environment, and content boundaries |
| Unit tests | Vitest | Pure transforms, metadata, rate/idempotency logic |
| Component tests | Testing Library | Semantics, states, keyboard behavior |
| API integration tests | Vitest with adapters/mocks | Endpoint sequence and provider mapping |
| Browser tests | Playwright | Critical flows, navigation, responsive behavior |
| Accessibility | axe plus manual checks | Automated violations and real usability |
| Visual regression | Playwright screenshots or approved service | Layout, textures, responsive variants |
| Performance | Lighthouse CI and field monitoring | Performance budgets and regressions |

## 3. Requirement coverage

### Navigation and page content

- `FR-001`–`FR-005`: route links, mobile menu focus, Escape/restore, footer, and true 404 response.
- `FR-010`–`FR-013`: hero content and CTA availability without effect interference.
- `FR-020`–`FR-023`: complete services and prohibited-claim editorial checks.
- `FR-030`–`FR-035`: unique published slugs, work metadata, draft exclusion, and media semantics.
- `FR-040`–`FR-051`: process, team placeholders, testimonial approval, and optional-section behavior.

### Inquiry

- `FR-060`–`FR-070`: required/optional fields, shared validation, error summary, provider success, abuse controls, no persistence, delivery failure, and degraded behavior.

### SEO and analytics

- `FR-080`–`FR-083`: metadata, canonical domain, sitemap, environment robots behavior, and factual JSON-LD.
- `FR-090`–`FR-092`: event shape, required triggers, identifier exclusion, and consent gating.

## 4. Unit and schema cases

- Minimum/maximum values and one step outside each boundary.
- Unicode names and project text.
- Empty, whitespace-only, malformed, and control-character inputs.
- Email header injection attempts.
- URL scheme, credential, host, and length cases.
- Duplicate and unknown enum array values.
- Prototype-shaped and extra-key payloads.
- Content duplicate slugs, broken references, invalid draft/featured state, and placeholder markers.
- Metadata canonical generation for production and preview.
- Privacy-preserving rate-limit key generation is stable but irreversible without the secret.
- Idempotency same-key/same-body and same-key/different-body behavior.

## 5. API integration matrix

| Scenario | Expected result | External calls |
| --- | --- | --- |
| Valid request | `202` and submission ID | Turnstile once, Resend once |
| Invalid schema | `422` field errors | None |
| Oversized payload | `413` | None |
| Unsupported media | `415` | None |
| Non-empty honeypot | Neutral rejection | None or policy-defined verification only |
| Rate limited | `429` with retry guidance | No Resend |
| Invalid Turnstile | `403` neutral response | Turnstile once, no Resend |
| Turnstile unavailable | `503` | No Resend |
| Duplicate accepted attempt | Original accepted result | No second Resend call |
| Idempotency conflict | `409` | No Resend |
| Resend rejection | `502` | Resend once |
| Unexpected adapter failure | Safe `500`/`503` and correlation ID | Bounded |

Tests assert logs contain correlation metadata and do not contain submitted values or tokens.

## 6. Critical browser journeys

1. Home → selected project → case study → Start a project → valid inquiry → success.
2. Services → selected service context → inquiry with editable preselection.
3. Invalid inquiry → focused error summary → correct fields → successful submission.
4. Provider failure → values preserved → email fallback visible → safe retry.
5. Mobile menu open → keyboard traversal → Escape → focus restored.
6. Unknown route → branded 404 → successful navigation home.
7. Reduced-motion mode → no continuous/parallax/cursor effect; all state remains clear.

End-to-end tests use local deterministic adapters, not live email or spam providers in every CI run. A separate controlled smoke test verifies staging integrations.

## 7. Accessibility testing

Automated axe scans run on Home, Work, representative Case Study, Services, About, Contact pristine/error/success states, Privacy, and 404.

Manual release checks include:

- Keyboard-only navigation and focus visibility.
- Mobile menu focus containment and restoration.
- Screen-reader landmarks, headings, link names, form labels, errors, and live status.
- 200% zoom and 320 CSS pixel reflow.
- High-contrast/forced-colors behavior where supported.
- Reduced-motion behavior.
- Contrast measured with textures and overlays active.
- Touch target and coarse-pointer behavior.

Automated results do not replace manual checks.

## 8. Visual regression

Capture stable representative pages at small mobile, tablet/medium, desktop, and wide desktop viewports. Mask only genuinely nondeterministic content. Maintain separate expectations for reduced motion only where the static visual differs.

Review emphasis:

- Hero hierarchy and CTA visibility.
- Scrapbook overlaps and clipping.
- Project variants.
- Form states.
- Long content and long labels.
- Footer and dark/light surface transitions.

Visual updates require intentional baseline approval, not automatic overwrite.

## 9. Performance testing

- Lighthouse CI runs against a production build on primary templates.
- Set budgets for JavaScript, image weight, total transfer, LCP, CLS, and blocking time appropriate to the final implementation.
- Fail or warn according to a documented regression threshold; do not chase lab-score perfection at the cost of usability.
- Monitor production Core Web Vitals at the 75th percentile when enough traffic exists.
- Test on a throttled mid-tier mobile profile, not only a developer desktop.

## 10. Browser matrix

Release testing covers the latest two stable versions of Chrome, Edge, Firefox, and Safari, plus current mobile Safari and Android Chrome. Playwright automation covers its available engines; real-device/manual coverage addresses platform gaps.

## 11. Test data

- Use clearly fictional names, companies, domains, testimonials, and projects.
- Do not copy real inquiry data into fixtures, screenshots, or bug reports.
- Provider test credentials remain scoped to non-production.
- Visual fixtures identify themselves as test content and never ship as customer proof.

## 12. CI gates

Required checks:

- Dependency install from lockfile.
- Format check.
- Lint.
- Typecheck.
- Content and environment validation.
- Unit/component/API tests with coverage report.
- Production build.
- Critical Playwright flows and accessibility smoke.

Performance and full visual suites may run on preview or nightly depending on cost, but release-blocking regressions must be resolved or explicitly approved.

