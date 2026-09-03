# PurpleDevs System Architecture

## 1. Architecture summary

PurpleDevs is a mostly static Next.js application deployed to Vercel. Content is validated at build time and rendered through Server Components. Small Client Components handle menu state, optional filters, motion enhancement, analytics hooks, and form interaction. One server endpoint processes project inquiries and sends transactional email through Resend.

```text
Browser
  |
  +-- Static/streamed pages and optimized assets
  |       |
  |       +-- Next.js App Router
  |       +-- Typed content / MDX
  |       +-- Server Components by default
  |
  +-- POST /api/inquiries
          |
          +-- Request validation
          +-- Rate limiting + honeypot
          +-- Cloudflare Turnstile verification
          +-- Idempotency check
          +-- Resend email delivery

Vercel hosts the application and server function.
No first-party application database is used in v1.
```

## 2. Technology baseline

- Next.js App Router on the current project-approved stable version.
- React and TypeScript with strict mode.
- Tailwind CSS plus semantic CSS custom properties.
- Zod for content, environment, and request schemas.
- MDX only for case-study narratives that need structured long-form composition.
- React Hook Form is optional; use it only if it materially simplifies accessible form state.
- Motion One or CSS transitions preferred for small effects; Framer Motion requires bundle justification.
- Resend for inquiry delivery.
- Cloudflare Turnstile for bot verification.
- A Vercel-compatible rate-limit store such as Upstash Redis when production abuse risk requires distributed enforcement.
- Vitest and Testing Library for unit/component tests.
- Playwright for end-to-end and browser accessibility smoke tests.

Package versions belong in `package.json` and the lockfile, not hard-coded in these documents.

## 3. Rendering strategy

- Home, Services, About, Contact, and Work index are statically generated where possible.
- Published case studies are generated from validated slugs.
- Draft content is filtered before route generation.
- Metadata is generated server-side.
- The inquiry endpoint runs in the Node.js runtime unless all selected dependencies are verified for Edge.
- Dynamic rendering is not introduced merely for decorative personalization.

## 4. Suggested source structure

```text
src/
  app/
    (marketing)/
      page.tsx
      work/
      services/
      about/
      contact/
      privacy/
    api/inquiries/route.ts
    layout.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
  components/
    ui/
    layout/
    sections/
    work/
    forms/
    effects/
  content/
    projects/
    services.ts
    people.ts
    testimonials.ts
    site.ts
  lib/
    analytics/
    content/
    email/
    env/
    security/
    validation/
  styles/
    globals.css
    effects.css
  emails/
    project-inquiry.tsx
public/
  images/
  textures/
  fonts/
```

## 5. Component boundaries

- **UI primitives:** low-level Button, Link treatment, Field, Tag, Surface, and Heading patterns.
- **Layout:** Header, MobileNav, Footer, Container, Section, and grid utilities.
- **Sections:** page-level compositions that accept typed content rather than fetching it.
- **Work:** project preview variants and constrained MDX components.
- **Forms:** inquiry view, field groups, error summary, and submission state.
- **Effects:** isolated progressive enhancements with reduced-motion and pointer capability checks.

Components do not read arbitrary global content internally. Page or section composition supplies explicit props, making content dependencies testable.

## 6. Content architecture

Structured content is exported from TypeScript or JSON-compatible modules and parsed through Zod. Case-study bodies may use local MDX. Images remain in `public` or use approved remote hosts configured explicitly.

The build enforces:

- Unique project IDs and slugs.
- Valid publish state and dates.
- Known service and layout keys.
- Required alt-text decisions.
- No development placeholder marker in production.
- No draft route in generated navigation or sitemap.

## 7. Inquiry architecture

The browser posts JSON or form data to `/api/inquiries`. The route handler owns all trust boundaries. Client validation improves usability but conveys no authority.

The endpoint performs schema validation, request-size enforcement, basic origin validation, abuse controls, Turnstile verification, and controlled email rendering. User strings are inserted only as escaped text. Reply-to may use the validated visitor email, while the From address always uses the verified PurpleDevs domain.

The email provider response ID and an internally generated correlation ID may be logged. Inquiry content is not logged.

## 8. Rate limiting and idempotency

Distributed rate limiting is recommended for production. The key should be an HMAC of the normalized network identifier rather than a raw IP. Retention is short and documented. Local development may use a memory adapter, but tests and production must not mistake it for distributed enforcement.

An idempotency fingerprint derived from normalized non-secret fields plus a short time bucket prevents accidental duplicate email. Store only a keyed hash with a short expiration.

## 9. Environment configuration

Expected server-only variables:

- `RESEND_API_KEY`
- `INQUIRY_FROM_EMAIL`
- `INQUIRY_TO_EMAIL`
- `TURNSTILE_SECRET_KEY`
- Rate-limit provider credentials when enabled
- `IP_HASH_SECRET` for privacy-preserving rate-limit keys

Expected public variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Approved analytics site ID if required by the provider

All variables are validated at startup or build time with clear server-side errors. Secrets never use the `NEXT_PUBLIC_` prefix.

## 10. Observability

- Structured logs contain event name, outcome, duration, environment, and correlation ID.
- Logs exclude request bodies, tokens, and personal fields.
- Inquiry delivery failures and elevated endpoint errors trigger alerts.
- Vercel runtime metrics and provider dashboards are used for health investigation.
- Analytics measures product behavior, not operational errors; operational monitoring remains separate.

## 11. Security boundaries

- All browser data is untrusted.
- MDX is trusted repository content only; no runtime user-authored MDX.
- Remote media domains are explicitly allowlisted.
- Third-party scripts are minimized and constrained by Content Security Policy.
- Email templates render plain controlled markup and do not accept HTML from form input.
- Preview deployments use noindex and protected secrets appropriate to preview scope.

## 12. Evolution path

A CMS can be introduced later behind a content repository interface without rewriting presentation components. A CRM can receive validated inquiries through a queue or integration after consent and retention requirements are defined. Neither extension is part of v1.

