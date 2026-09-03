# PurpleDevs Error Handling

## 1. Principles

Errors should be calm, specific enough to help, and safe enough to expose. Retro styling never turns failure into a joke at the visitor's expense.

- Preserve user effort whenever safe.
- Say what happened, what the visitor can do, and whether data was received.
- Do not expose internal provider, stack, validation-library, or security details.
- Give every operational failure a correlation ID.
- Log outcomes and context, not personal form content.
- Treat decorative failures as non-blocking.

## 2. Error taxonomy

| Category | Example | Owner | Visitor treatment |
| --- | --- | --- | --- |
| Field validation | Invalid email | Visitor-correctable | Inline error and summary |
| Request format | Malformed/oversized body | Client or abuse | General correction message |
| Abuse protection | Rate limit or invalid token | Visitor/system | Neutral retry guidance |
| Dependency | Resend or Turnstile unavailable | System/provider | Retry and email fallback |
| Content/build | Duplicate project slug | Maintainer | Fail build with exact file/key |
| Rendering | Missing optional image | Maintainer/system | Deliberate fallback surface |
| Navigation | Unknown route | Visitor/link | Branded 404 with useful routes |
| Unexpected runtime | Unhandled exception | System | Safe error boundary and correlation ID |

## 3. Form validation errors

- Validate after blur and on submit; avoid scolding while the user is initially typing.
- Place error text adjacent to the field and connect it with `aria-describedby`.
- Set `aria-invalid` only when invalid.
- On failed submit, focus a summary heading or summary container.
- Summary links target the exact field.
- Preserve entered non-secret values.
- Do not clear the whole form after a network error.

Message style:

- Good: “Enter an email address like name@example.com.”
- Good: “Tell us about the project in at least 20 characters.”
- Avoid: “Invalid input.”
- Avoid: “Oopsie! You broke it.”

## 4. Submission errors

### Validation failure

The client renders server-returned field keys using approved message text. Unknown server keys fall back to a form-level message and are logged as a client/server contract mismatch without values.

### Verification failure

Message: “We couldn't verify this submission. Refresh the check and try again, or email us directly.”

Do not disclose whether origin, honeypot, risk scoring, or a specific Turnstile condition failed.

### Rate limit

Message: “That's a few attempts in a short time. Wait a little and try again, or email us directly.”

Disable automatic retries and honor `Retry-After` where supplied.

### Delivery failure

Message: “We couldn't confirm delivery, so your message may not have reached us. Try again or email us at [configured address]. Reference: [correlation ID].”

Never show the success state on a provider rejection or ambiguous timeout unless the idempotency status confirms acceptance.

## 5. Retry rules

- Validation and abuse failures are not automatically retried.
- Network and provider failures may allow manual retry using the same idempotency key until the outcome is known.
- Client fetch logic does not create unbounded retry loops.
- External server calls use short, explicit timeouts.
- If the provider status is ambiguous, idempotency lookup determines whether another send is safe.

## 6. Route and rendering errors

### 404

Use an on-brand message, preserve normal navigation, and provide Home, Work, and Contact links. Return the actual 404 status.

### Segment error boundary

Unexpected render failures show a quiet fallback, retry control when useful, and a correlation/reference value. Global navigation should remain available where the framework permits.

### Missing content

- Missing required published content fails validation during build.
- Missing optional content omits its section.
- Missing media uses an intentional branded placeholder only in development; production project media is a release requirement.

## 7. Third-party degradation

- Analytics: fail silently and never block interaction.
- Decorative remote asset: show the local background/fallback.
- Turnstile: show a retry action and direct email.
- Resend: return delivery failure; do not queue unless a queue is explicitly implemented later.
- Rate-limit store: production policy should fail closed for the public form with a temporary error, while keeping direct email visible.

## 8. Logging and alerting

Each server error record may include timestamp, severity, event, internal error code, HTTP status, correlation ID, provider request ID, duration, environment, and release identifier.

Never log form field values, body payloads, tokens, secrets, cookies, or raw provider bodies. Client errors sent to monitoring must scrub URLs, breadcrumbs, and user-entered DOM values.

Alert on:

- Sustained inquiry 5xx responses.
- Material email provider rejection increases.
- Turnstile/provider outage patterns.
- Deployment-wide render errors.
- Unexpected spikes in 429 responses or function usage.

## 9. Build and CI failures

Build errors should name the content record/file and invalid key without dumping secrets. Formatting, lint, type, schema, test, accessibility smoke, and build failures block merge according to branch policy.

## 10. Acceptance criteria

- Every documented API code maps to an intentional UI state.
- Error messages remain readable with JavaScript disabled where relevant.
- Focus behavior is verified for field, form-level, and route errors.
- Personal information is absent from logs and monitoring payloads.
- A visitor always has a direct contact fallback when form dependencies fail.

