# PurpleDevs Deployment Guide

## 1. Target platform

The application deploys to Vercel from the protected source repository. Pull requests receive preview deployments; the default branch deploys to production after required checks pass.

## 2. Environments

| Environment | Purpose | Indexing | Data/integrations |
| --- | --- | --- | --- |
| Local | Development and automated tests | Not public | Test/stub providers |
| Preview | Review each change | `noindex` | Preview-scoped keys and mailbox |
| Production | Public site | Indexable as configured | Production keys and mailbox |

Unpublished client work may require protected preview deployments. Production personal data must not be sent to preview systems.

## 3. Provisioning checklist

- Connect the correct Git repository to Vercel.
- Set framework and package-manager settings from committed configuration.
- Pin the supported Node runtime.
- Configure production and preview environment variables separately.
- Verify the Resend sending domain with required DNS records.
- Configure the inquiry recipient mailbox and operational ownership.
- Register production/preview hostnames in Turnstile as appropriate.
- Provision the rate-limit store and narrow its credentials.
- Configure custom domain, redirects, and canonical origin.
- Select analytics and error-monitoring providers before enabling their scripts.

## 4. Environment configuration

Server secrets are configured only in the environments that need them. Public values are reviewed as shipped application data. Changing environment variables should create a new deployment so validation and behavior are reproducible.

Preview deployments must not use the production inquiry destination unless deliberately testing end-to-end and clearly labeled. Prefer a dedicated preview mailbox.

## 5. CI/CD pipeline

```text
Pull request
  -> locked dependency install
  -> format + lint + types
  -> content/schema tests
  -> unit/component/API tests
  -> production build
  -> browser/accessibility smoke
  -> Vercel preview
  -> visual/content review
  -> approval and merge
  -> production deployment
  -> smoke checks and monitoring
```

No deployment should depend on uncommitted generated files.

## 6. Production release checklist

### Content

- Final logo, team, projects, testimonials, contact details, and socials are approved.
- No placeholder markers or unverified statistics remain.
- Privacy notice matches the actual providers and recipient process.
- Case-study permissions and asset licenses are confirmed.

### Technical

- Required CI checks pass on the release commit.
- Production build uses the canonical domain.
- Sitemap, robots, canonical, JSON-LD, and social images are verified.
- Inquiry success, invalid input, rate limit, Turnstile failure, and Resend failure are tested.
- Sender and reply-to behavior is correct.
- Security headers and HTTPS are verified externally.
- Primary routes pass keyboard and mobile smoke tests.
- Analytics contains no personal form content.
- Monitoring and alert recipients are active.

## 7. DNS and domain

- Use the chosen canonical host consistently, redirecting the alternate `www`/apex form.
- Preserve email DNS records while adding hosting verification records.
- Enable HTTPS before redirect enforcement.
- Add HSTS only after confirming all included hosts support HTTPS.
- Update `NEXT_PUBLIC_SITE_URL`, Turnstile allowed hostnames, Resend domain configuration, and analytics origin when the domain changes.

## 8. Post-deployment smoke test

Immediately verify:

1. Home and all navigation routes return successful responses.
2. A representative case study renders its media and metadata.
3. The contact form completes using a controlled production test identity.
4. The configured mailbox receives one correctly formatted message.
5. Duplicate submission does not create duplicate email.
6. 404 returns a 404 status with functional navigation.
7. Sitemap and robots use the production origin and policy.
8. No client console, server, provider, or CSP errors indicate a release regression.

Delete or label controlled test inquiries according to mailbox procedure.

## 9. Rollback

Vercel's previous known-good deployment is the primary rollback. Roll back when a release breaks navigation, inquiry delivery, security policy, indexing, or major page rendering.

1. Identify the last verified production deployment.
2. Promote/restore it through the platform.
3. Verify domain routing and critical smoke tests.
4. Keep the faulty commit intact for diagnosis; fix forward through a reviewed change.
5. Rotate secrets if the incident involves exposure rather than code behavior.

Content that creates legal or confidentiality risk may require immediate removal even while a broader rollback is evaluated.

## 10. Monitoring and operations

- Observe deployment/function errors and latency.
- Alert on elevated inquiry failures and provider rejections.
- Track rate-limit and Turnstile trends without storing raw personal identifiers.
- Review Core Web Vitals when representative traffic exists.
- Check broken links, sitemap health, and search-console issues regularly.
- Review dependency and platform security notices.
- Confirm inquiry mailbox ownership and response routing after team changes.

## 11. Disaster and continuity considerations

Source history and provider deployment history support recovery of the site. Document domain registrar, DNS, Vercel, Resend, Cloudflare, source host, and analytics ownership in the studio's secure operations record. Ensure at least two authorized owners exist for critical business accounts where practical.

