# PurpleDevs Security Specification

## 1. Security objectives

- Keep deployments and provider accounts under authorized control.
- Prevent the inquiry endpoint from becoming a spam relay.
- Protect visitor personal information throughout submission and delivery.
- Prevent injected content from executing in pages, emails, or operator tools.
- Limit third-party scripts and the impact of a compromised dependency.
- Preserve availability under ordinary automated abuse.

## 2. Trust model

All browser input, URL parameters, headers, cookies, remote responses, and analytics callbacks are untrusted. Repository content is trusted only after code review and schema validation. Environment variables are sensitive configuration; public-prefixed variables must contain no secrets.

There is no authentication or authorization feature in v1. Deployment, Git, domain, Resend, Cloudflare, and analytics access are controlled through their providers and should require individual accounts and multi-factor authentication.

## 3. Threats and controls

| Threat | Primary controls |
| --- | --- |
| Automated inquiry spam | Turnstile, honeypot, rate limit, size limit, allowlisted enums |
| Email relay/header injection | Fixed recipients/from address, validated reply-to, controlled subject template |
| Cross-site scripting | React escaping, no raw visitor HTML, constrained trusted MDX, CSP |
| Cross-site submission abuse | Same-site origin checks, no permissive CORS, Turnstile |
| Secret leakage | Server-only modules, environment validation, secret scanning, redacted logs |
| Personal-data leakage | Data minimization, no request-body logs, short ephemeral keys, privacy notice |
| Supply-chain compromise | Lockfile, dependency review, automated scanning, minimal packages |
| Clickjacking | CSP `frame-ancestors 'none'` unless an explicit embed use case exists |
| Asset or script compromise | Self-hosting where practical, strict allowlists, CSP, integrity where applicable |
| Denial of service/cost abuse | Early rejection, bounded parsing/timeouts, rate limits, provider usage alerts |

## 4. Inquiry endpoint controls

- Accept only documented method and media types.
- Enforce a small total request limit at the platform and application layer.
- Parse through a strict schema that strips or rejects unknown fields as documented.
- Validate all enum values against allowlists.
- Limit strings before normalization and email rendering.
- Reject CR/LF in values that could reach headers.
- Treat honeypot failure as suspicious without echoing the submitted content.
- Verify Turnstile server-side and bind expected hostname/action where possible.
- Use a distributed rate-limit adapter in production.
- Generate unpredictable correlation/submission IDs.
- Use bounded external-request timeouts.
- Render email from controlled components/templates; never insert raw HTML.

## 5. Browser security headers

Configure and verify:

- `Content-Security-Policy` with narrow `default-src`, `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`, `form-action`, `base-uri`, `object-src`, and `frame-ancestors` directives.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin` or stricter where compatible.
- `Permissions-Policy` disabling unused camera, microphone, geolocation, and similar capabilities.
- `Strict-Transport-Security` on production after HTTPS and subdomain implications are verified.

Prefer a nonce-based CSP if framework output and analytics integration require inline scripts. Do not weaken policy broadly to silence deployment errors.

## 6. Secrets and environments

- Local secrets live in ignored environment files.
- Shared preview/production secrets live in Vercel environment configuration.
- Preview and production use separate keys where providers support it.
- Key access is limited to the smallest required team.
- Keys are rotated after suspected exposure, team departure, or provider guidance.
- `.env.example` documents names and safe example shapes only.
- CI scans commits for common secret formats.

## 7. Dependency and source security

- Commit a single package-manager lockfile.
- Use exact or controlled version ranges according to project policy.
- Review installation scripts and dependency purpose before adding packages.
- Run vulnerability checks in CI and triage based on reachability and severity.
- Protect the default branch with required reviews and checks.
- Require multi-factor authentication for source and deployment providers.
- Do not accept runtime MDX, uploaded code, or untrusted component definitions.

## 8. Privacy

The inquiry form collects only information necessary to assess and answer a project request. The privacy notice states:

- Controller/legal contact.
- Fields collected and why.
- Email, hosting, Turnstile, rate-limit, and analytics providers involved.
- Retention approach in the receiving mailbox and providers.
- How to request access or deletion where applicable.
- Any international processing disclosures required for target markets.

Consent wording and legal basis require jurisdiction-appropriate review. The website must not claim compliance certification merely because technical controls exist.

## 9. Analytics security

- Do not send form free text or direct identifiers.
- Audit automatic page URL capture so query strings cannot leak personal data.
- Avoid session replay by default; it requires separate privacy and masking review.
- Load only the approved provider domain.
- Apply consent controls where required.

## 10. Incident response

1. Contain: revoke keys, disable the endpoint or integration, and restrict provider access.
2. Preserve: retain relevant redacted operational evidence without expanding personal-data exposure.
3. Assess: determine affected systems, time range, and data categories.
4. Recover: patch, rotate, redeploy, and verify clean behavior.
5. Notify: follow contractual and legal notification duties.
6. Learn: record root cause and preventive actions.

The site operator must maintain provider ownership and emergency contacts outside the repository.

## 11. Security release checklist

- Production has no debug endpoints or source maps exposed beyond policy.
- Secrets are scoped correctly and absent from client bundles.
- CSP and all required headers are verified on real production responses.
- Inquiry abuse controls are tested against bypass and provider failure.
- Logs have been inspected to confirm personal fields are absent.
- Dependency and secret scans pass.
- Preview deployments are access-controlled when they contain unpublished client work.
- Privacy copy matches actual providers and behavior.

