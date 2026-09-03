# PurpleDevs API Specification

## 1. Scope

V1 exposes one public application endpoint for project inquiries. Framework-generated asset and page routes are outside this API specification.

## 2. Endpoint

### `POST /api/inquiries`

Validates a project inquiry, performs abuse checks, and requests delivery through Resend.

### Request headers

| Header | Required | Purpose |
| --- | --- | --- |
| `Content-Type` | Yes | `application/json` or supported form encoding |
| `Idempotency-Key` | Recommended | UUID generated per deliberate submission attempt |
| `Origin` | Browser requests | Checked against configured site origins |

The server must not trust forwarding headers unless they are provided by the configured deployment platform.

### Request body

```json
{
  "name": "Sam Rivera",
  "email": "sam@example.com",
  "company": "Example Studio",
  "website": "https://example.com",
  "projectType": "marketing-website",
  "services": ["ui-ux", "development"],
  "budget": "10k-25k",
  "timing": "one-to-three-months",
  "summary": "We need to reposition the business and replace an outdated site.",
  "referral": "search",
  "privacyAccepted": true,
  "companyFax": "",
  "turnstileToken": "provider-token"
}
```

Budget keys are examples and must match the configured content and validation schema. Public UI copy can localize or reword labels without changing stable API keys.

### Successful response

Status: `202 Accepted`

```json
{
  "ok": true,
  "submissionId": "inq_01...",
  "message": "Your inquiry was sent."
}
```

`202` means the configured email provider accepted the delivery request. The UI must not promise that a human has read the message.

### Validation response

Status: `422 Unprocessable Content`

```json
{
  "ok": false,
  "code": "VALIDATION_FAILED",
  "message": "Check the highlighted fields and try again.",
  "fieldErrors": {
    "email": ["Enter a valid email address."],
    "summary": ["Tell us a little more about the project."]
  },
  "correlationId": "req_01..."
}
```

### Other responses

| Status | Code | Meaning | Client behavior |
| --- | --- | --- | --- |
| `400` | `INVALID_REQUEST` | Malformed payload | Show general correction message |
| `403` | `SUBMISSION_REJECTED` | Origin or abuse verification rejected | Refresh verification; offer email fallback |
| `413` | `PAYLOAD_TOO_LARGE` | Request exceeds size limit | Ask user to shorten content |
| `415` | `UNSUPPORTED_MEDIA_TYPE` | Body encoding is unsupported | Report generic technical issue |
| `422` | `VALIDATION_FAILED` | Field rules failed | Render field errors |
| `429` | `TOO_MANY_REQUESTS` | Rate limit exceeded | Honor `Retry-After` and wait |
| `502` | `DELIVERY_FAILED` | Provider rejected or failed delivery | State message was not confirmed; allow retry |
| `503` | `SERVICE_UNAVAILABLE` | Verification or email service temporarily unavailable | Offer retry and direct email |
| `500` | `INTERNAL_ERROR` | Unexpected server failure | Show safe fallback with correlation ID |

Errors never include stack traces, provider response bodies, environment data, spam scoring, or other users' information.

## 3. Validation and normalization

The route parses through the shared schema described in `13-validation-rules.md`. It trims normal text, lowercases the email domain where safe, normalizes enum keys, rejects unknown service keys, and enforces a strict request-size ceiling before expensive work.

Do not “sanitize” invalid data into meaningfully different values. Reject it with a field-level error.

## 4. Abuse controls

Controls execute in this order to reduce cost:

1. Method, content type, origin, and size checks.
2. Safe parsing and schema validation.
3. Honeypot evaluation.
4. Privacy-preserving network rate limit.
5. Turnstile server verification.
6. Idempotency lookup.
7. Email delivery.

The public response should not identify the exact spam signal. Suspicious requests may receive the same neutral rejection shape.

## 5. Turnstile verification

The server sends the visitor token and server secret to Cloudflare's verification endpoint. Verification must check success and, when configured, expected hostname and action. Tokens are single-use and expire; the client refreshes the widget after retryable failure.

Provider timeouts are bounded. A provider outage does not silently bypass verification in production.

## 6. Email delivery contract

- From: a verified address on the PurpleDevs sending domain.
- To: configured inquiry mailbox.
- Reply-To: validated visitor email.
- Subject: controlled prefix plus normalized project type and company/name.
- Body: a fixed template containing escaped text fields.
- Plain-text alternative: required.

Header values are constructed from allowlisted or safely encoded fields. Visitor content never controls recipients or the From address.

## 7. Idempotency

The client supplies a UUID idempotency key for a submission attempt. The server validates its format and binds it to a keyed fingerprint of normalized submission data for a short period.

- Repeating the same key and same fingerprint returns the original accepted result when available.
- Reusing a key with different content returns `409 Conflict` with `IDEMPOTENCY_CONFLICT`.
- Failure before provider acceptance does not permanently consume the key.

If the key-value provider is unavailable, fail according to the documented reliability policy rather than allowing unbounded duplicate sends.

## 8. CORS and CSRF posture

The endpoint is intended for same-site browser use. It does not enable permissive CORS. It validates allowed origins and uses `SameSite` cookie defaults if cookies are introduced. Because v1 has no authenticated session, classic account-action CSRF risk is limited, but cross-site spam remains relevant and is addressed with origin checks and Turnstile.

## 9. Logging

Allowed structured fields:

- correlation ID
- submission ID after acceptance
- route and method
- response code and internal outcome code
- duration
- deployment environment
- provider request ID where safe
- privacy-preserving rate-limit key prefix if essential for debugging

Prohibited logging:

- request bodies and form values
- full email or network address
- Turnstile tokens and provider secrets
- email HTML or plain-text body
- authorization or cookie headers

## 10. API acceptance tests

- Accepts a complete valid request and calls the mail adapter once.
- Returns stable field errors for invalid input without calling external providers.
- Rejects over-sized and unsupported requests before body processing.
- Rejects non-empty honeypot, invalid Turnstile, disallowed origin, and exceeded limits.
- Prevents duplicate delivery for a repeated idempotency key.
- Escapes malicious-looking strings in both HTML and plain text.
- Maps provider timeout and rejection to safe, retryable errors.
- Does not expose or log personal content.

