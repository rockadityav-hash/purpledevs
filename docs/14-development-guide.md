# PurpleDevs Development Guide

## 1. Prerequisites

- A supported active LTS release of Node.js.
- Corepack-enabled `pnpm` or the package manager committed by the project.
- Git.
- Resend and Turnstile test credentials for integration work.
- Optional local access to the configured rate-limit provider.

Pin runtime and package-manager versions in project configuration. The lockfile is authoritative for dependency resolution.

## 2. Initial setup

After the application scaffold exists:

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

On PowerShell, copy the example with the shell-appropriate command. Never commit `.env.local`.

Suggested scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "format:check": "prettier --check .",
    "content:check": "tsx scripts/validate-content.ts"
  }
}
```

Exact commands may change with the scaffold, but CI and documentation must change together.

## 3. Environment file

`.env.example` lists names and non-secret placeholders:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
RESEND_API_KEY=
INQUIRY_FROM_EMAIL=
INQUIRY_TO_EMAIL=
IP_HASH_SECRET=
RATE_LIMIT_URL=
RATE_LIMIT_TOKEN=
```

Analytics variables are added only when a provider is selected. Environment parsing occurs through one server module; UI components must not access arbitrary `process.env` values.

## 4. Development workflow

1. Create a focused branch from the current default branch.
2. Read the relevant requirement and specification IDs.
3. Implement the smallest complete vertical slice.
4. Add or update tests with the behavior.
5. Run formatting, linting, types, unit tests, content validation, and build.
6. Inspect the feature in small, medium, large, keyboard-only, and reduced-motion modes.
7. Use a preview deployment for content and visual approval.
8. Update documentation in the same change when contracts or decisions change.

## 5. Coding conventions

- TypeScript strict mode is mandatory.
- Prefer Server Components; add `"use client"` at the narrowest interactive boundary.
- Prefer named exports except where Next.js route conventions require defaults.
- Use `import type` for type-only imports.
- Keep domain schemas in `lib/validation` or `content` and reuse inferred types.
- Avoid `any`; use `unknown` and narrow safely.
- Avoid non-null assertions unless an invariant is validated immediately nearby.
- Components accept explicit typed props and do not reach into unrelated content modules.
- Route handlers delegate validation, abuse checks, and email rendering to testable modules.

## 6. Styling workflow

- Semantic color/type/space values live as CSS custom properties.
- Tailwind utilities compose layout and states using those tokens.
- `globals.css` contains reset, tokens, typography, and true global layers only.
- `effects.css` or component-local styles contain complex texture/mask/keyframe rules.
- Do not scatter raw hex colors, arbitrary z-indexes, or nearly identical shadows through JSX.
- Use an allowlisted variant system for project compositions and stickers.
- Test texture overlays on real devices and high zoom.

## 7. Content workflow

- Add structured records through typed modules.
- Use MDX only for case-study narrative composition.
- Import only allowlisted MDX components.
- Store optimized source media with descriptive filenames.
- Provide dimensions, alt decision, caption, and credit metadata.
- Mark unfinished material with the project's explicit placeholder token so production validation catches it.
- Never invent client proof to make a layout appear complete.

## 8. Component workflow

Build in this order:

1. Semantic HTML and content order.
2. Responsive layout.
3. Focus, hover, active, disabled, error, and success states.
4. Texture and visual decoration.
5. Motion enhancement with reduced-motion fallback.
6. Tests and visual review.

New abstractions must represent a repeated product concept, not merely reduce a few lines. Page-specific collage composition may remain local while its primitives stay shared.

## 9. Inquiry development

- Use provider adapters so validation tests never call live services.
- Provide a development mail adapter that prints only safe metadata, not personal body content.
- Use Turnstile test keys or a documented local stub; never bypass verification silently in production.
- Reset/re-render the verification widget after relevant failure.
- Exercise provider timeouts and idempotency locally through test doubles.
- Verify both HTML and plain-text email renderings.

## 10. Quality commands before review

Run the project equivalents of:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm content:check
pnpm test
pnpm build
pnpm test:e2e
```

If a command is intentionally skipped, document why in the change description.

## 11. Pull request expectations

- Explain user-visible change and linked requirements.
- Include screenshots or short recordings for responsive and motion work.
- Show reduced-motion behavior when motion changes.
- Describe test coverage and manual checks.
- Call out environment, migration, privacy, analytics, or dependency changes.
- Avoid combining unrelated refactors with a feature.

## 12. Definition of done

A change is done when implementation, states, accessibility, responsive behavior, automated tests, documentation, and preview review are complete. Passing TypeScript alone is not sufficient.

