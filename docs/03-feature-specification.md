# PurpleDevs Feature Specification

## 1. Route map

| Route | Purpose | Primary action |
| --- | --- | --- |
| `/` | Communicate the offer, taste, proof, and process | Start a project |
| `/work` | Browse all published projects | Open a case study |
| `/work/[slug]` | Understand a project's problem, thinking, and outcome | Discuss a similar project |
| `/services` | Assess service fit and deliverables | Start a project |
| `/about` | Meet the studio and understand its beliefs | Work with PurpleDevs |
| `/contact` | Submit a qualified project inquiry | Send inquiry |
| `/privacy` | Explain inquiry and analytics data handling | Return to site |

A custom not-found experience handles unmatched routes. Terms may be added when approved by legal counsel or required by commercial practice.

## 2. Global shell

### Header

- Text or approved logo links to Home.
- Desktop navigation shows Work, Services, About, and a distinct Start a Project control.
- Mobile navigation opens as an intentionally styled overlay or panel.
- Header behavior may become compact or sticky after scrolling, but must not obscure anchored content.
- Current-route state is communicated visually and programmatically.

### Footer

- Repeats essential navigation and the primary contact route.
- Displays approved social links and optional email address.
- Includes privacy, copyright, legal entity, and current year.
- May include a playful status message such as studio availability when the claim is maintained as real content.

### Global visual layers

- A light paper-grain overlay may cover the viewport with `pointer-events: none`.
- Scan lines or halftone treatments are sectional, subtle, and never reduce text contrast.
- Optional cursor treatment appears only for fine pointers and never replaces the native cursor on interactive controls.
- Page-transition effects are nonessential and disabled under reduced motion.

## 3. Home page

### Hero

Content:

- Clear eyebrow identifying PurpleDevs as a web design and development studio.
- Short, ownable headline focused on useful, distinctive digital work.
- Supporting sentence naming websites and web applications for businesses.
- Primary CTA to `/contact` and secondary CTA to `/work`.
- A composed visual object made from browser chrome, stickers, stamps, or project fragments.

Behavior:

- Hero copy is server-rendered and immediately readable.
- Decorative pieces may slightly tilt, spring, or react to a fine pointer.
- No looping effect may compete with reading or create a continuous large-area animation.

### Marquee or studio ticker

A short strip may list services or principles. It must expose the text statically to assistive technology, pause on hover/focus when animated, and stop under reduced motion.

### Selected work

- Shows three to four published featured projects.
- Uses an editorial scrapbook layout, not equal repeated cards.
- Each item exposes title, category, short outcome, image, and clear link.
- Visual variety comes from layout variants defined in data, not arbitrary markup per item.

### Services preview

- Groups services into strategy/design, build, and growth where useful.
- Each service provides a one-line customer-centered explanation.
- Links to the complete Services page.

### Process preview

- Presents six compact steps: discover, direct, design, build, launch, improve.
- Uses a physical metaphor such as annotated contact sheet, receipt, or folded instruction card.

### About teaser

- Uses real studio voice, approved team imagery, and a short point of view.
- Avoids a stock-photo team treatment.

### Social proof

- Shows up to three approved testimonials and approved client logos.
- A quotation without approval remains development-only content and blocks production.

### Closing CTA

- Restates who is a good fit.
- Sets a realistic response expectation only when operations can maintain it.
- Links directly to the inquiry form.

## 4. Work index

- Intro copy describes the type of outcomes represented.
- Project collection is rendered from validated content.
- Optional service filters update the visible list without creating inaccessible hidden focus targets.
- Filters are progressive enhancement; all work remains visible and navigable without JavaScript.
- Empty filter state provides a reset action.
- The URL may encode a filter only if this is implemented consistently and tested.

## 5. Case-study page

Required content blocks:

1. Title, client or anonymized label, industry, year, and service tags.
2. Hero media with meaningful description.
3. Project snapshot: challenge, constraints, scope, and role.
4. Approach and key decisions.
5. Selected visual or technical solution modules.
6. Verified outcomes or explicit qualitative impact.
7. Testimonial when approved.
8. Next-project navigation and inquiry CTA.

Flexible MDX components may include image spreads, annotated frames, quote blocks, metric callouts, before/after comparisons, and technical notes. Every component must have responsive and accessible behavior documented before use.

## 6. Services page

Each service entry includes:

- Service name and plain-language promise.
- Problems it is suited to solve.
- Typical deliverables.
- Collaboration expectations.
- Related work when available.

Service set:

- Marketing websites and redesigns.
- Web applications and MVPs.
- UI/UX strategy and product design.
- Lightweight brand and digital identity systems.
- E-commerce experiences.
- Maintenance, measurement, and iterative optimization.

The page should also identify poor-fit engagements candidly, such as requests for deceptive patterns, unsupported guarantees, or work outside current capacity.

## 7. About page

- States why the studio exists and how it thinks about useful design.
- Introduces team members with short, personality-led content.
- Describes working principles and preferred collaboration style.
- May include tools, influences, studio rituals, or a “currently into” strip if maintained.
- Ends with project and collaboration contact options.

## 8. Inquiry form

### Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Name | Text | Yes | Human name or preferred identifier |
| Email | Email | Yes | Business or personal email accepted |
| Company | Text | No | Business or organization |
| Current website | URL | No | Normalized to HTTPS where safe |
| Project type | Select | Yes | Website, web app, e-commerce, design/brand, ongoing work, other |
| Services | Checkbox group | No | Multiple selections allowed |
| Budget | Select | Yes | Configurable ranges plus “Not sure” |
| Timing | Select | Yes | Configurable ranges plus “Flexible” |
| Project summary | Textarea | Yes | Goals, problem, or desired outcome |
| Referral source | Select | No | Privacy-conscious attribution |
| Privacy acknowledgement | Checkbox | Yes | Links to privacy notice |
| Company fax | Hidden honeypot | No | Must remain empty |
| Turnstile token | Widget token | Yes | Verified server-side |

### States

- Pristine: no validation shown before meaningful interaction.
- Editing: touched invalid fields show concise nearby help.
- Submitting: submit control is disabled, state is announced, and duplicate activation is prevented.
- Validation failure: fields retain non-secret values; an error summary links to invalid inputs.
- Spam or rate-limited: neutral response explains that submission could not be completed and suggests waiting or emailing.
- Delivery failure: message is not claimed as received; visitor can retry or use direct email.
- Success: form is replaced or reset with a confirmation and next-step expectation.

### Server sequence

1. Reject unsupported method or media type.
2. Apply origin and request-size checks.
3. Parse the body safely.
4. Validate and normalize against the shared schema.
5. Check honeypot and rate limit.
6. Verify Turnstile with the server secret.
7. Enforce idempotency for a short window.
8. Escape untrusted values and render a controlled email template.
9. Send through Resend.
10. Return a correlation ID and a safe structured result.

## 9. SEO and social sharing

- Use route-level metadata generated from validated content.
- Create a default Open Graph image matching the warm paper visual system.
- Case studies use their approved social image when supplied.
- Include `Organization` and `WebSite` JSON-LD with factual data only.
- Breadcrumb structured data may appear on case studies.
- Ensure only production uses the intended canonical domain and indexable robots policy.

## 10. Analytics events

| Event | Trigger | Allowed properties |
| --- | --- | --- |
| `cta_clicked` | Primary or contextual CTA activated | location, destination, label_key |
| `case_study_opened` | Work item activated | project_slug, location |
| `contact_started` | First meaningful inquiry interaction | entry_route |
| `contact_validation_failed` | Submit attempt has validation errors | error_field_keys only |
| `contact_submitted` | Server confirms email delivery | project_type, budget_key |
| `social_link_clicked` | Footer/about social link | network, location |

Never send names, emails, company values, URLs, summary text, IP addresses, or Turnstile tokens as event properties.

## 11. Content model

Content modules expose typed collections for site settings, navigation, services, projects, people, testimonials, and process steps. Case-study narrative may use MDX constrained to an allowlist of components.

Every record has a stable machine ID. Public records include a `status` or `published` flag. Builds fail for missing required content, duplicate slugs, invalid URLs, placeholder markers in production, or unrecognized layout variants.

## 12. Feature acceptance summary

A feature is complete when it meets its referenced requirements, includes responsive and keyboard behavior, handles empty/loading/error/success states where applicable, has analytics hooks without personal data, and passes the relevant automated and manual tests.

