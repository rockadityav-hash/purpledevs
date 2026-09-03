# PurpleDevs Database Decision

## 1. Decision

PurpleDevs v1 does not use an application database.

Public content is versioned in the source repository, and project inquiries are delivered to the configured studio mailbox through Resend. This keeps the system small, avoids unnecessary personal-data retention, and fits the expected early-stage content workflow.

## 2. Data ownership

| Data | Storage | Owner | Retention |
| --- | --- | --- | --- |
| Site settings and navigation | Git repository | PurpleDevs | Repository history |
| Projects and case studies | Git repository | PurpleDevs | Repository history |
| Services, people, and testimonials | Git repository | PurpleDevs | Repository history |
| Inquiry content | Email provider and receiving mailbox | PurpleDevs | Per mailbox/privacy policy |
| Turnstile verification data | Cloudflare | Cloudflare/PurpleDevs | Per configured provider terms |
| Rate-limit key hashes | Short-lived rate-limit store | PurpleDevs | Short TTL, normally hours or less |
| Idempotency fingerprints | Short-lived key store | PurpleDevs | Short TTL, normally minutes |
| Product analytics | Approved analytics provider | PurpleDevs | Per analytics policy |

## 3. Repository content schemas

These are logical content schemas, not relational tables.

### Project

```ts
type Project = {
  id: string;
  slug: string;
  title: string;
  clientLabel: string;
  industry: string;
  year: number;
  summary: string;
  services: ServiceId[];
  featured: boolean;
  status: "draft" | "published";
  layout: "poster" | "window" | "contact-sheet";
  cover: MediaAsset;
  socialImage?: MediaAsset;
  outcomes: Outcome[];
  testimonialId?: string;
  seo: SeoFields;
};
```

### Service

```ts
type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  problems: string[];
  deliverables: string[];
  relatedProjectIds: string[];
  enabled: boolean;
};
```

### Person

```ts
type Person = {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  image?: MediaAsset;
  links?: SocialLink[];
  published: boolean;
};
```

### Testimonial

```ts
type Testimonial = {
  id: string;
  quote: string;
  personName: string;
  role?: string;
  organization: string;
  projectId?: string;
  approved: boolean;
};
```

### Shared records

```ts
type MediaAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  decorative?: boolean;
  caption?: string;
};

type Outcome = {
  label: string;
  value?: string;
  description: string;
  verified: boolean;
};

type SeoFields = {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
};
```

If `decorative` is true, `alt` must be empty. Otherwise `alt` must describe the content or purpose. Numerical outcome values require `verified: true` and an internal evidence reference during editorial review.

## 4. Ephemeral key records

The rate-limit provider is a key-value service, not a business-data database.

Suggested key formats:

```text
inquiry:rate:<hmac-network-key> -> count, short TTL
inquiry:idem:<keyed-fingerprint> -> accepted, short TTL
```

The raw IP address, email, form body, and Turnstile token must not be stored as keys or values. Exact limits and TTL values remain environment configuration and may be tuned after observing legitimate traffic.

## 5. Why inquiry persistence is excluded

- Email delivery already meets the v1 operational need.
- A lead database would introduce deletion, export, access-control, backup, and breach-response obligations.
- Traffic volume and CRM needs are not yet known.
- Avoiding storage reduces impact if the endpoint is abused.

Email and provider retention still count as personal-data processing and must be disclosed in the privacy notice.

## 6. Conditions for adding a database

A database or CRM integration requires a new architecture decision when at least one of these becomes true:

- The studio needs assignment, status tracking, reporting, or structured follow-up.
- Reliable delivery requires a queue and retry ledger.
- Consent records must be retained independently.
- A client portal or authenticated workflow is introduced.
- Content editors need a CMS instead of repository changes.

Before adoption, define lawful purpose, fields, access roles, retention, deletion/export procedures, backups, encryption, regional requirements, and migration ownership.

## 7. Future lead entity, not approved for v1

If a persistent lead store is authorized later, use a minimal model rather than copying arbitrary request bodies:

```text
Lead
- id: UUID
- created_at: timestamp
- name: encrypted text
- email: encrypted text
- company: optional encrypted text
- website: optional text
- project_type: enum
- service_keys: enum array
- budget_key: enum
- timing_key: enum
- summary: encrypted text
- referral_key: optional enum
- consent_version: string
- status: controlled enum
- source: fixed enum
- deleted_at: optional timestamp
```

This sketch is informational and must not be implemented without an approved retention and access-control design.

