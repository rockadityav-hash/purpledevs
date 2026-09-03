# PurpleDevs Requirements

## 1. Purpose

This document defines the functional and non-functional requirements for the PurpleDevs website. Requirements use stable IDs for implementation, testing, and change tracking.

## 2. Approved assumptions

The owner approved proceeding with the defaults proposed during clarification. The implementation baseline is Next.js App Router, TypeScript, Tailwind CSS, repository-managed content, Vercel, a warm vintage palette, and a database-free inquiry workflow using Resend and Cloudflare Turnstile.

## 3. User roles

- **Visitor:** views public content and may submit an inquiry.
- **Content maintainer:** edits typed content or MDX through the source repository.
- **Site operator:** manages deployments, environment variables, email delivery, spam controls, and analytics.

There are no authenticated application roles in v1.

## 4. Functional requirements

### Navigation and discovery

- **FR-001:** The site shall provide global navigation to Work, Services, About, and Start a Project.
- **FR-002:** The site shall provide a recognizable home link through the logo or wordmark.
- **FR-003:** The mobile navigation shall be keyboard-operable, trap focus while open, close with Escape, and restore focus to its trigger.
- **FR-004:** The footer shall include navigation, contact information, available social links, copyright information, and legal links when legal pages exist.
- **FR-005:** Unknown public routes shall display a branded 404 page with routes back to Home, Work, and Contact.

### Home page

- **FR-010:** The hero shall state what PurpleDevs builds, who it helps, and offer primary and secondary calls to action without requiring scrolling.
- **FR-011:** The home page shall present services, selected work, process, personality-led studio information, social proof, and a final inquiry CTA.
- **FR-012:** Selected work shall link to complete case-study pages.
- **FR-013:** Decorative interactive elements shall not block navigation, selection, form use, or assistive technology.

### Services

- **FR-020:** The site shall describe marketing websites, web applications, UI/UX design, brand systems, e-commerce, and ongoing optimization.
- **FR-021:** Each service description shall identify typical problems, deliverables, and relevant outcomes.
- **FR-022:** The services page shall set expectations about fit and direct qualified visitors to the inquiry form.
- **FR-023:** Copy shall avoid guarantees, invented statistics, and unexplained technical jargon.

### Portfolio and case studies

- **FR-030:** The work index shall display project previews with title, industry, service tags, short summary, and visual.
- **FR-031:** Each case study shall include the context, problem, approach, selected solution, and outcomes.
- **FR-032:** When verified metrics are unavailable, a case study shall use qualitative outcomes and shall not fabricate numerical results.
- **FR-033:** Case studies shall support multiple media items with meaningful alternative text or intentionally empty alt text for decorative images.
- **FR-034:** Draft case studies shall not be included in production navigation, sitemap, or static route generation.
- **FR-035:** Case-study slugs shall be unique and stable.

### Process and about

- **FR-040:** The process shall explain discovery, direction, design, build, launch, and optional improvement in simple language.
- **FR-041:** The process shall identify typical client inputs and decision points.
- **FR-042:** The about page shall present the studio's beliefs and team personality using approved factual content.
- **FR-043:** Team entries shall include name, role, short introduction, and accessible image where supplied.
- **FR-044:** Placeholder team content shall be visibly marked in non-production environments and shall block a production release if still present.

### Testimonials and trust

- **FR-050:** Testimonials shall include approved quotation text, client name, role, and organization when permission exists.
- **FR-051:** The site shall not invent testimonials, client logos, awards, or partnerships.
- **FR-052:** Client logos shall include accessible names and preserve required brand treatment.

### Inquiry workflow

- **FR-060:** Visitors shall be able to submit a project inquiry from a dedicated contact page.
- **FR-061:** Required fields shall be name, email, project type, budget range, desired timing, project summary, privacy acknowledgement, and a valid spam-protection token.
- **FR-062:** Optional fields shall include company, current website, referral source, and selected services.
- **FR-063:** The form shall validate on the client for quick feedback and independently on the server for security.
- **FR-064:** Validation errors shall be associated with fields and summarized near the top of the form after a failed submission.
- **FR-065:** A valid submission shall generate an email to the configured PurpleDevs mailbox through Resend.
- **FR-066:** The visitor shall receive an on-page success confirmation; an automatic acknowledgement email may be enabled only after copy and sender configuration are approved.
- **FR-067:** Repeated submission shall be constrained through Turnstile, rate limiting, a honeypot, and idempotency protection.
- **FR-068:** The application shall not persist inquiry details in its own database in v1.
- **FR-069:** Failed email delivery shall return a safe retryable response without claiming the inquiry was received.
- **FR-070:** Form submission shall work without relying on client-side JavaScript where practical; enhanced inline behavior may require JavaScript.

### Search engines and sharing

- **FR-080:** Every indexable page shall provide a unique title, description, canonical URL, and social-sharing metadata.
- **FR-081:** The application shall generate sitemap and robots metadata appropriate to each environment.
- **FR-082:** Non-production deployments shall be marked noindex.
- **FR-083:** Structured data shall describe the organization and website without unsupported ratings or claims.

### Analytics

- **FR-090:** The site shall expose events for primary CTA clicks, case-study opens, form starts, form validation failures, successful inquiries, and outbound social clicks.
- **FR-091:** Analytics events shall not include free-text inquiry content, names, email addresses, or other personal data.
- **FR-092:** Analytics shall respect consent requirements applicable to the selected provider and target regions.

## 5. Content requirements

- **CR-001:** Voice shall be confident, concise, playful, and specific.
- **CR-002:** Meme-aware language shall remain understandable without niche context and shall not date essential instructions.
- **CR-003:** Calls to action shall describe their result, such as “Start a project” or “See the work.”
- **CR-004:** All claims, metrics, client names, testimonials, and logos require owner approval.
- **CR-005:** Headings shall preserve a logical hierarchy.
- **CR-006:** Important meaning shall not appear only inside images, textures, or animation.
- **CR-007:** Repository content shall pass its schema validation during the build.

## 6. Non-functional requirements

### Performance

- **NFR-001:** At the 75th percentile on production field data, pages should target LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1.
- **NFR-002:** Above-the-fold decorative textures shall use CSS or optimized assets and shall not delay primary content.
- **NFR-003:** Images shall use responsive sizing, modern formats where supported, explicit dimensions, and lazy loading below the fold.
- **NFR-004:** Client JavaScript shall be limited to components that genuinely require interaction.
- **NFR-005:** Fonts shall be self-hosted where licensing permits, subset appropriately, and configured to minimize layout shift.

### Accessibility

- **NFR-010:** The site shall target WCAG 2.2 Level AA.
- **NFR-011:** All functionality shall be available from a keyboard with visible focus states.
- **NFR-012:** Text and meaningful graphical elements shall meet applicable contrast requirements.
- **NFR-013:** Motion shall honor `prefers-reduced-motion`; essential information shall never depend on motion.
- **NFR-014:** Pointer trails, parallax, sticker peels, and hover wiggles shall be disabled or simplified for reduced motion and coarse pointers.
- **NFR-015:** Form status and errors shall be announced appropriately to assistive technology.
- **NFR-016:** Content shall remain usable at 200% zoom and at 320 CSS pixels wide without two-dimensional scrolling, except for genuinely exempt content.

### Security and privacy

- **NFR-020:** Secrets shall remain server-only and shall never be committed or exposed through public environment variables.
- **NFR-021:** All external input shall be validated, normalized, length-limited, and safely encoded.
- **NFR-022:** Security headers shall include an environment-appropriate Content Security Policy and protections against framing, MIME sniffing, and unnecessary referrer leakage.
- **NFR-023:** The system shall minimize collection and retention of personal information.
- **NFR-024:** Logs shall not store inquiry bodies, spam tokens, or full email addresses.

### Reliability and compatibility

- **NFR-030:** The production site shall degrade gracefully when analytics, animation, or third-party embeds fail.
- **NFR-031:** Inquiry failures shall be observable and shall give visitors a safe alternative contact route.
- **NFR-032:** The site shall support the latest two stable versions of Chrome, Edge, Firefox, and Safari at release time, plus current mobile Safari and Chrome.
- **NFR-033:** The production build shall be deterministic from the lockfile and documented environment variables.

### Maintainability

- **NFR-040:** TypeScript strict mode shall be enabled.
- **NFR-041:** Reusable primitives and patterns shall be documented and tested rather than copied between pages.
- **NFR-042:** Content, presentation, server integrations, and analytics shall have clear module boundaries.
- **NFR-043:** Automated checks shall cover formatting, linting, types, unit tests, accessibility smoke tests, and the production build.

## 7. Constraints

- V1 content changes require a code review and deployment.
- No first-party lead database exists; the configured mailbox is the system of record for inquiries.
- Third-party services are limited initially to Vercel, Resend, Turnstile, and an approved analytics provider.
- Signature visual effects must fit the performance and accessibility budgets.
- The launch cannot use unapproved placeholder claims or customer proof.

## 8. Acceptance gates

The site is ready for production only when:

- All production routes render and pass the agreed browser matrix.
- The inquiry workflow succeeds and failure modes are verified.
- No placeholder client, metric, testimonial, team, legal, or contact content remains.
- Keyboard and screen-reader smoke tests pass.
- Automated accessibility scans report no serious or critical issues on primary routes.
- Performance tests meet the agreed lab budget and no known regression threatens field targets.
- Metadata, canonical URLs, sitemap, robots behavior, and share images are verified.
- Production secrets, DNS, sender domain, monitoring, and rollback procedures are configured.

## 9. Traceability

Features in `03-feature-specification.md`, validation rules in `13-validation-rules.md`, and tests in `15-testing-strategy.md` reference the requirement IDs above. Any change to a requirement should update those documents in the same pull request.

