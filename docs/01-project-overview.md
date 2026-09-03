# PurpleDevs Project Overview

## Document status

- Product: PurpleDevs marketing and portfolio website
- Version: 1.0
- Status: Approved planning baseline
- Audience: founders, designers, developers, QA, and future content editors

## Product summary

PurpleDevs is a small, opinionated web design and development studio serving small and medium businesses. The website must demonstrate the quality, personality, and commercial thinking that clients can expect from the studio.

This is not a generic agency brochure. It should feel like an artifact from an alternate early internet: tactile, warm, imperfect, playful, and still fast and highly usable. The visual direction combines Y2K interface cues, retro print textures, and scrapbook composition with modern typography, accessibility, responsive behavior, and engineering standards.

## Problem statement

Prospective clients often struggle to distinguish capable small studios from interchangeable agencies. Most agency sites use similar gradients, card grids, stock photography, and vague claims. PurpleDevs needs a memorable site that proves creative range while making the commercial offer immediately understandable.

The site must answer four questions quickly:

1. What does PurpleDevs build?
2. Is the team credible and a good creative fit?
3. How does working together happen?
4. How can a qualified prospect start a conversation?

## Product goals

- Generate qualified project inquiries from small and medium businesses.
- Demonstrate capability through outcome-focused case studies.
- Establish PurpleDevs as a recognizable, personality-led studio.
- Explain services and process without agency jargon.
- Make the inquiry experience quick, trustworthy, and low-friction.
- Create a maintainable platform that can grow into CMS-managed content later.

## Non-goals for v1

- Client accounts, authentication, or client dashboards.
- Online payments or fixed-price checkout.
- A general-purpose blog or publishing platform.
- A persistent lead database or CRM replacement.
- AI-powered site features.
- Localization or multi-currency pricing.
- A full visual page builder.

## Target audiences

### Primary: business decision-maker

An owner, founder, marketing lead, or product lead at a small or medium business who needs a new website, a redesign, an MVP, or a web application. They value quality and speed but may not know technical terminology.

### Secondary: creative or technical evaluator

A designer, marketer, or developer helping choose a partner. They want evidence of strong craft, a clear process, credible implementation details, and accessible production work.

### Tertiary: collaborators and prospective hires

Freelancers, specialists, and future team members evaluating the studio's taste and working style. The site may appeal to them, but recruitment is not a primary conversion goal in v1.

## Brand position

PurpleDevs builds sharp websites and useful web apps for businesses that have outgrown boring. The brand is confident, candid, curious, and internet-native. Humor supports clarity; it never obscures the offer or mocks the visitor.

### Chosen visual direction

The project will use the warm direction consistently:

- Cream and faded paper as primary surfaces.
- Ink purple as the brand anchor and primary text color.
- Mustard and rust for energetic accents.
- Faded teal for contrast and informational states.
- Grain, halftone, scan lines, stamps, tape, and imperfect borders.

Neon-on-grain is intentionally excluded from v1 to avoid splitting the visual identity.

## Product principles

1. **Proof before promises.** Show real work, decisions, and outcomes near the top of the experience.
2. **Personality with purpose.** Every visual flourish must support hierarchy, memory, or feedback.
3. **Fast despite the texture.** Decorative effects must not compromise Core Web Vitals.
4. **Accessible nostalgia.** Retro styling may look imperfect, but interaction and readability must remain modern.
5. **Clear paths to contact.** Every major page should offer a relevant route to the project inquiry form.
6. **Small-studio honesty.** Copy should be specific about capabilities, process, and fit.

## Success indicators

Initial success will be evaluated through:

- Qualified inquiry conversion rate.
- Click-through rate from portfolio previews to case studies.
- Inquiry form completion and error rates.
- Engagement with services and process content.
- Organic traffic to service and case-study pages.
- Core Web Vitals and accessibility audit results.
- Qualitative feedback mentioning memorability, clarity, or personality.

No numerical business targets are invented in this baseline. The owners should set targets after the first 30 days of reliable analytics data.

## Assumptions approved for v1

- Next.js App Router, React, and TypeScript.
- Tailwind CSS with CSS custom properties and limited authored CSS for signature effects.
- Static, repository-managed content with typed content objects or MDX.
- A multipage site with a conversion-focused home page.
- Services include marketing websites, web applications, UI/UX design, brand systems, e-commerce, and ongoing optimization.
- Pricing is handled through a get-a-quote experience; no public fixed packages are required.
- Form submissions are emailed through Resend; they are not stored in a project database.
- Cloudflare Turnstile and server-side rate limiting protect the form.
- Vercel is the deployment target.
- Privacy-friendly analytics is enabled only after configuration and any required consent handling.
- English is the launch language; the audience is geographically open.
- WCAG 2.2 AA and current major browsers are the quality baseline.
- Missing logo, team media, portfolio results, testimonials, and social URLs use clearly marked content placeholders during development, never fabricated claims.

## Primary deliverables

- Responsive public website.
- Home, work index, case study, services, about, and contact routes.
- Validated project inquiry endpoint and email delivery.
- SEO metadata, sitemap, robots configuration, and social-sharing images.
- Analytics event hooks.
- Accessible motion and reduced-motion behavior.
- Automated tests and deployment configuration.

## Open business inputs

These inputs may remain placeholders until supplied, but must be resolved before production launch:

- Final logo and wordmark.
- Team names, roles, photos, and approved personality copy.
- At least three publishable projects with images and outcome evidence.
- Approved client testimonials and attribution.
- Legal entity name, contact email, privacy wording, and service regions.
- Social profile URLs.
- Analytics provider and account identifiers.
- Resend sender domain and destination mailbox.

