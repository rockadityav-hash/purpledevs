# PurpleDevs AI Development Rules

## 1. Purpose

These rules govern AI-assisted changes to the PurpleDevs codebase. They complement repository instructions, product requirements, and human review. If rules conflict, follow the most specific repository instruction and flag the conflict rather than guessing.

## 2. Before coding

The AI agent must:

1. Read the relevant documentation and existing repository instructions.
2. Inspect current patterns, dependencies, configuration, tests, and uncommitted changes.
3. Preserve user changes and avoid unrelated cleanup.
4. Identify the requirement IDs and acceptance states affected.
5. Ask only when a missing decision would materially change product behavior, security, cost, or architecture; otherwise use documented defaults.
6. Never treat example content as approved client proof.

## 3. Stack conventions

- Use Next.js App Router, React, TypeScript strict mode, and Tailwind CSS.
- Prefer Server Components. Introduce a Client Component only for state, browser APIs, effects, or interaction that cannot remain on the server.
- Use current repository-pinned versions and APIs; do not upgrade frameworks or replace core dependencies without authorization.
- Use Zod schemas as the boundary for content, environment, and external input.
- Use the existing package manager and lockfile.
- Add a dependency only when its value exceeds bundle, security, maintenance, and duplication costs.
- Keep provider integrations behind small typed adapters.

## 4. Component patterns

- Build semantic HTML before styling or motion.
- Prefer composition over prop-heavy “do everything” components.
- UI primitives stay content-agnostic; section components receive explicit typed content.
- Page-specific layouts may remain page-specific when abstraction would hide editorial intent.
- Use one clear interactive element per action. Do not nest links/buttons or simulate controls with `div` elements.
- Keep decorative elements out of the accessibility tree and tab order.
- Provide stable keys from content IDs, never array index when order can change.
- Use framework image and metadata APIs according to current project conventions.

## 5. Styling rules

- Use semantic tokens for colors, typography, spacing, borders, shadows, and layers.
- Tailwind utilities handle routine layout and responsive states.
- Use authored CSS for grain, masks, unusual borders, keyframes, and effects that are clearer in CSS.
- Do not scatter arbitrary colors, magic pixel values, or uncontrolled `z-index` values through components.
- Do not create generic rounded-card grids. Layout should use the documented editorial/scrapbook variants.
- Maintain readable hierarchy even if textures, images, and motion are removed.
- Test every texture over actual text/background combinations.
- Visual changes must work at small mobile, medium, desktop, high zoom, and reduced motion.

## 6. Motion rules

- Motion is progressive enhancement and never gates content.
- Honor `prefers-reduced-motion` in CSS and JavaScript.
- Prefer transform and opacity for short local effects.
- Avoid continuous animation, scroll hijacking, heavy blur, and unthrottled pointer listeners.
- Cursor effects run only on capable fine pointers and must not replace native control feedback.
- A component owns and cleans up its observers, timers, and listeners.
- Do not add a large animation library for one hover effect.

## 7. Accessibility rules

- Target WCAG 2.2 AA.
- Use native elements and landmarks before ARIA.
- Maintain logical source, reading, heading, and focus order regardless of visual overlap.
- Give every control an accessible name and every field a persistent label.
- Implement visible focus, keyboard behavior, error associations, and status announcements.
- Do not rely on color, motion, hover, or imagery alone to communicate meaning.
- Use empty alt text only for truly decorative media; write purposeful alt text for meaningful media.
- Any AI-generated accessibility text is a draft requiring contextual review.

## 8. Content and brand rules

- Voice is confident, concise, playful, and specific—not corporate filler.
- Do not invent client names, logos, testimonials, awards, performance metrics, team facts, response times, pricing, or partnerships.
- Mark missing material with the approved development placeholder token and ensure production validation catches it.
- Preserve the warm palette direction; do not introduce a competing neon theme.
- Do not use generic team stock photography or fake product work.
- Do not copy third-party creative work or unlicensed imagery to mimic the aesthetic.
- Essential instructions and errors use clear language rather than jokes.

## 9. Data and API rules

- Treat all request data as untrusted; server validation is authoritative.
- Never add a database or persist inquiry content without an approved architecture/privacy change.
- Never log request bodies, form values, tokens, secrets, or full identifiers.
- Use fixed From/To email configuration and only a validated Reply-To value.
- Escape by output context; do not accept raw visitor HTML or Markdown.
- Preserve the documented endpoint status and error shapes unless the specification is updated in the same change.
- Maintain bounded timeouts, rate limits, Turnstile verification, and idempotency.
- Analytics must never include personal or free-text inquiry data.

## 10. Security rules

- Secrets remain in server-only environment variables and never use public prefixes.
- Do not weaken CSP, CORS, origin checks, verification, or type rules to make a test pass.
- Do not fetch visitor-submitted URLs.
- Do not expose raw provider errors or stack traces to the browser.
- Use allowlists for enum values, MDX components, remote image hosts, and external script/connect domains.
- Review new dependencies and never execute unknown installation or migration scripts without understanding their effect.

## 11. Testing rules

For each behavior change, the AI agent must add or update the most appropriate test and run checks proportional to risk.

At minimum, verify:

- Formatting/lint and typecheck.
- Content validation when content changes.
- Unit/component/API tests for affected logic.
- Production build for routing, rendering, metadata, or configuration changes.
- Browser flow for navigation, form, or responsive interaction changes.
- Keyboard and reduced-motion behavior for interactive or visual changes.

Tests assert outcomes and contracts, not implementation trivia. Use fictional fixtures and provider adapters; do not send real customer data or live emails from routine tests.

## 12. Change discipline

- Make the smallest coherent change that completes the requested behavior.
- Do not refactor unrelated code, reformat the entire repository, overwrite user work, or remove unexplained configuration.
- Update docs when the route map, content model, API, validation, environment variables, security posture, or deployment workflow changes.
- Report commands run, results, unresolved risks, and intentionally skipped verification.
- Never claim a test passed unless it was actually run and completed successfully.
- Never claim visual correctness without inspecting the rendered result at relevant viewports.

## 13. Prohibited shortcuts

The AI agent must not:

- Disable TypeScript, ESLint, tests, or accessibility checks to achieve a green build.
- Use `any`, unsafe casts, or non-null assertions to bypass an unexplained type problem.
- Put all pages into Client Components.
- Add decorative JavaScript that harms performance or input responsiveness.
- Duplicate a component to avoid understanding the existing pattern.
- Hard-code secrets, production email addresses, analytics IDs, or canonical domains.
- Fabricate fallback testimonials, metrics, or portfolio projects for production.
- Treat client validation, CAPTCHA, or obscurity as a complete security boundary.
- Swallow errors while displaying a false success state.

## 14. Completion report

When handing work back, summarize:

- User-visible outcome.
- Important files and decisions.
- Tests and checks actually run.
- Required configuration or content inputs.
- Known limitations or follow-up work.

Keep the report concise and link to relevant files or routes. Do not paste large generated diffs unless requested.

