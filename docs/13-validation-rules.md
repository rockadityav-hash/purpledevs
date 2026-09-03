# PurpleDevs Validation Rules

## 1. Validation model

One shared schema defines inquiry field names, allowed values, limits, and normalized output. The client uses it for helpful early feedback; the server repeats validation and remains authoritative.

Content and environment configuration use separate schemas. Validation failures are explicit and fail early.

## 2. Inquiry field rules

Limits below count Unicode characters after trimming unless otherwise specified.

| Field | Required | Rules | Normalized output |
| --- | --- | --- | --- |
| `name` | Yes | 2–100 characters; no control characters | Trim outer whitespace; collapse excessive internal spaces |
| `email` | Yes | 3–254 characters; syntactically valid; no CR/LF | Trim; preserve local part; lowercase domain |
| `company` | No | 1–120 characters when present; no control characters | Trim and collapse excessive spaces |
| `website` | No | Absolute `http` or `https` URL; max 2048 characters; no credentials | Trim; add `https://` only through clearly tested UI normalization |
| `projectType` | Yes | Exact allowed key | Canonical enum key |
| `services` | No | Array of 0–6 unique allowed keys | Deduplicated canonical key array |
| `budget` | Yes | Exact configured key | Canonical enum key |
| `timing` | Yes | Exact configured key | Canonical enum key |
| `summary` | Yes | 20–3000 characters; no disallowed control characters | Normalize line endings; trim outer blank space |
| `referral` | No | Exact allowed key | Canonical enum key |
| `privacyAccepted` | Yes | Must be boolean `true` | `true` |
| `companyFax` | No | Must be empty | Empty string |
| `turnstileToken` | Yes | Non-empty provider token within conservative length limit | Passed to verification, never persisted/logged |

The schema rejects unexpected object nesting and prototype-related keys. Unknown top-level fields should be stripped only if the behavior is deliberate and tested; strict rejection is preferred for the JSON contract.

## 3. Allowed inquiry keys

Suggested v1 stable keys:

```ts
const projectTypes = [
  "marketing-website",
  "web-application",
  "e-commerce",
  "design-brand",
  "ongoing-optimization",
  "other",
] as const;

const serviceKeys = [
  "strategy",
  "ui-ux",
  "branding",
  "development",
  "e-commerce",
  "optimization",
] as const;

const budgetKeys = [
  "under-5k",
  "5k-10k",
  "10k-25k",
  "25k-50k",
  "50k-plus",
  "not-sure",
] as const;

const timingKeys = [
  "asap",
  "one-to-three-months",
  "three-to-six-months",
  "six-months-plus",
  "flexible",
] as const;
```

Currency and displayed ranges must be confirmed before launch. If PurpleDevs changes market or currency, update content labels while preserving keys when their meaning remains equivalent. Otherwise version the schema deliberately.

## 4. Text safety rules

- Reject null bytes and disallowed C0/C1 control characters; allow line breaks only in multiline fields.
- Do not remove ordinary Unicode names or force ASCII.
- Do not treat HTML stripping as output safety. React/email templates must escape values at their output context.
- Reject CR/LF in any value that can affect an email header.
- Never interpret Markdown, HTML, or template syntax from inquiry text.
- Normalize line endings to `\n` for the email template.
- Do not silently truncate; return a useful length error.

## 5. URL validation

- Accept only `http:` and `https:` schemes.
- Reject embedded username/password credentials.
- Reject malformed hosts and excessively long input.
- The server does not fetch the submitted URL, preventing server-side request forgery.
- Display or email the URL as escaped text. If linked in an internal email, apply safe URL handling and `rel` protection where relevant.

## 6. Request-level rules

- Enforce a request body limit substantially above valid field totals but small enough to deter abuse; 16–32KB is a reasonable initial range.
- Require supported media type.
- Require an allowed production, preview, or local origin according to environment.
- Validate the idempotency key as UUID format and constrain header length.
- Reject incomplete or failed body parsing before external calls.

## 7. Environment validation

Production start/build fails when required variables are absent or malformed:

- Site URL must be absolute HTTPS in production.
- Sender and recipient must be syntactically valid email addresses.
- Resend and Turnstile server keys must be non-empty and server-only.
- Public Turnstile key must be present when the form is enabled.
- Hashing secret must meet the minimum entropy/length policy.
- Rate-limit credentials must be provided together.

Error output names the missing variable but never prints its value.

## 8. Content validation

### Projects

- IDs and slugs are unique.
- Slugs use lowercase ASCII letters, numbers, and single hyphens with no leading/trailing hyphen.
- Published projects include title, summary, industry, year, services, cover media, at least one outcome statement, and SEO fields.
- Featured projects must also be published.
- Service and testimonial references resolve.
- Numerical results require verified status.
- Draft content is excluded from production route generation.

### Media

- Source exists locally or matches an explicitly allowed remote host.
- Width and height are positive integers.
- Decorative media has empty alt text.
- Non-decorative media has purposeful alt text within the editorial guideline.
- Captions and credits are present when licensing requires them.

### Testimonials and team

- Production testimonials require `approved: true` and complete attribution allowed by the client.
- Published people require factual name, role, and approved short biography.
- Any value containing the development placeholder marker blocks production.

### SEO

- Titles and descriptions are present and unique enough to describe the route.
- Canonical paths begin with `/` and remain on the configured site origin.
- Social images meet required dimensions and file constraints.

## 9. Validation messages

Message keys should be stable and human text should live near the form/content layer. The API may return approved public text, but clients must safely handle unknown codes.

Examples:

| Rule | Message |
| --- | --- |
| Name too short | “Enter your name.” |
| Email invalid | “Enter an email address like name@example.com.” |
| Project type missing | “Choose the kind of project you have in mind.” |
| Budget missing | “Choose a budget range, or select ‘Not sure.’” |
| Summary too short | “Tell us a little more about the project.” |
| Privacy unchecked | “Confirm that you've read the privacy notice.” |

## 10. Test requirements

Every boundary has tests immediately below, at, and above the limit. Include Unicode, whitespace, line ending, duplicate array, unknown enum, malformed URL, header-injection, oversized body, extra field, and prototype-shaped payload cases.

