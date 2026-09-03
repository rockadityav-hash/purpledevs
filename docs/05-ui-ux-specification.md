# PurpleDevs UI/UX Specification

## 1. Experience direction

The interface is “warm retro internet studio”: a crafted mixture of early-web chrome, print ephemera, faded materials, and clean contemporary content design. It should look opinionated without feeling chaotic and playful without becoming difficult to use.

The primary compositional idea is an editorial scrapbook laid over a disciplined grid. Elements may overlap, rotate slightly, or break a section boundary, but text alignment, focus order, and responsive structure remain predictable.

## 2. Design tokens

Final values may be tuned during visual design, but token names and semantic roles should remain stable.

### Color palette

| Token | Suggested value | Use |
| --- | --- | --- |
| `paper` | `#F2E7CE` | Main background |
| `paper-light` | `#FFF8E8` | Raised or reading surfaces |
| `ink` | `#24152B` | Primary text and dark borders |
| `purple` | `#5A2A82` | Brand anchor, primary actions |
| `purple-dark` | `#35144E` | Hover/active and dark sections |
| `mustard` | `#D6A62E` | Energetic highlight |
| `rust` | `#B65132` | Warm secondary accent |
| `teal` | `#4F7D78` | Cool contrast and information |
| `success` | `#2F6B45` | Success state |
| `danger` | `#A5302E` | Error state |

All token combinations require measured contrast. Decorative low-contrast inks are not used for essential text.

### Typography

- **Display:** a licensed or open-source expressive grotesk/serif with chunky retro character.
- **Body/UI:** a highly legible modern sans with broad language support.
- **Handwritten accent:** used only for short decorative labels, never body copy or form instructions.
- **Code/micro label:** optional monospace for dates, service tags, and technical annotations.

Use fluid type through `clamp()` and maintain readable line lengths. Suggested maximum prose width is 65–72 characters. Body text should generally not fall below 16 CSS pixels.

### Shape and borders

- Borders: mostly 2–3px, dark ink, occasionally doubled or offset.
- Corners: mixed but intentional; avoid a universal large rounded-card radius.
- Shadows: offset print-like shadows rather than diffuse SaaS shadows.
- Irregular edges: SVG masks or static assets only where rendering cost and accessibility are acceptable.

### Spacing and grid

- Base spacing unit: 4px with a semantic scale.
- Content maximum width: approximately 1200–1280px.
- Mobile gutters: 20px minimum; desktop gutters grow fluidly.
- Core structure uses a 4-column mobile and 12-column desktop grid.
- Visual overlap must not alter reading or focus order.

## 3. Layout behavior

### Breakpoint philosophy

Breakpoints are content-driven, not device-branded. Tailwind defaults may seed the system, but components change layout when their content requires it.

- Small: single-column reading order; overlaps reduced.
- Medium: controlled two-column arrangements and larger collage elements.
- Large: full editorial asymmetry, generous whitespace, and optional pointer-reactive details.

### Section composition

Alternate dense visual moments with quiet reading areas. Limit each viewport to one dominant novelty. A grain layer can be global, while stickers, stamps, tape, and scan-line treatments are distributed selectively.

## 4. Core component patterns

### Buttons and text links

- Primary buttons use purple or ink surfaces with high-contrast text and an offset shadow.
- Hover may move 1–2px and shift the shadow; active returns toward the surface.
- Focus state is independent of hover and uses a clear outer ring.
- Disabled state uses shape, opacity, and cursor together and still meets readable contrast.
- Link text describes its destination; icon-only controls require accessible names.

### Sticker

A decorative or linked label with controlled rotation variants. Decorative stickers are hidden from assistive technology and ignore pointer events. Interactive stickers follow normal link/button semantics and cannot rely on peel animation for meaning.

### Project preview

Data supplies a small variant allowlist such as `poster`, `window`, or `contact-sheet`. All variants expose the same semantic information. The entire visual may not wrap nested links; use one clear project link.

### Window frame

A nostalgic browser or OS-style shell for media. Window controls are decorative unless they perform real actions. Fake controls must not resemble functional buttons to assistive technology.

### Testimonial

Quotation, person, role, and organization use semantic quote markup. Carousels are avoided by default. If introduced later, controls, pause behavior, and full keyboard support are mandatory.

### Form field

Every field has a persistent label, optional description, error slot, required indication, and stable ID relationships. Placeholder text is an example, not a label. Inputs remain visually conventional enough to recognize immediately.

## 5. Motion system

Motion should feel like physical response: quick, slightly springy, and local.

### Motion tokens

- Instant feedback: 80–120ms.
- Hover/press: 120–180ms.
- Small reveal: 180–260ms.
- Larger composition reveal: no more than 400ms and used sparingly.
- Easing: energetic ease-out or controlled spring without excessive bounce.

### Allowed patterns

- Button press and offset-shadow compression.
- Short hover wiggle on a single decorative child.
- Sticker corner lift on fine-pointer hover.
- One-time section annotation reveal.
- Short CRT blink or scan treatment during an intentional state change.

### Restricted patterns

- Continuous cursor trails, parallax, or marquees by default.
- Full-page smooth-scroll hijacking.
- Long stagger sequences that delay content access.
- Large blur animations.
- Animation tied directly to every pointer movement without throttling.

All nonessential transforms stop under `prefers-reduced-motion: reduce`. Coarse pointers receive simple pressed states rather than hover-dependent effects.

## 6. Texture and asset treatment

- Use small, compressed, tileable assets or CSS masks for grain.
- Avoid high-opacity texture over text.
- Halftones should be part of decorative layers or images, not text backgrounds at reading sizes.
- Project screenshots retain legibility and accurate product color.
- Tape and paper assets can be SVG or optimized WebP/AVIF, with transparent PNG only when necessary.
- Decorative assets should not generate extra accessibility noise.

## 7. Imagery

Priority order:

1. Real project work.
2. Real studio/team imagery with candid art direction.
3. Purpose-made illustration, scans, or abstract material.
4. Clearly marked development placeholders.

Do not use generic office stock photos, fake dashboards presented as client work, or unlicensed nostalgic imagery. Images of text require corresponding real text when the words matter.

## 8. Copy direction

Preferred copy is short, concrete, and lightly irreverent. Examples of tone, not final copy:

- “Websites with a pulse.”
- “Useful first. Unforgettable second. Usually both.”
- “No mystery process. No twelve-person email chain.”

Avoid insults, forced slang, inflated claims, fake urgency, and jokes in error messages. Functional copy becomes calmer as user stress increases.

## 9. Accessibility specifications

- Include a visible-on-focus skip link.
- Preserve a single logical `h1` and sequential section headings.
- Use native landmarks and controls before ARIA.
- Maintain minimum 44 by 44 CSS pixel pointer targets where practical.
- Never encode service/category/state only through color.
- Provide visible focus against paper and dark surfaces.
- Test contrast after texture overlays, not only against base tokens.
- Error messaging identifies the issue and correction.
- Announce form submission and result status without moving focus unexpectedly.
- Avoid flashing content; no effect may exceed safe flash thresholds.

## 10. Responsive content rules

- Collages collapse into the semantic document order on small screens.
- Rotation is reduced when it creates clipping or inefficient whitespace.
- Horizontal tickers become wrapped or clipped static lists under reduced motion and small screens.
- Tap interactions never require hover discovery.
- Hero copy and both CTAs remain visible without decorative media forcing excessive scroll.
- Case-study media can bleed to the viewport edge, while captions retain safe gutters.

## 11. Loading and empty states

Most pages are statically rendered and should not show skeletons. Images reserve dimensions and use dominant or paper-colored placeholders. An empty work collection is a release-blocking content error, not a public empty state. Optional testimonial and client-logo sections are omitted cleanly when no approved content exists.

## 12. Visual QA checklist

- The site is recognizable in grayscale through hierarchy and shape.
- Texture does not compromise reading.
- No two adjacent sections rely on the same novelty.
- Layout remains deliberate from 320px through wide desktop sizes.
- Zoom and large text do not clip controls.
- Focus indicators are never hidden under collage layers.
- Reduced-motion mode feels complete, not broken.
- The interface contains no default “rounded card grid” sections.

