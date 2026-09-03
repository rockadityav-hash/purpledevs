# PurpleDevs User Flows

## 1. Primary conversion flow

```text
Search / referral / social link
            |
            v
      Relevant landing page
            |
            +--> Understand offer and fit
            |
            +--> Inspect selected work
            |          |
            |          v
            |     Read case study
            |          |
            +----------+
            |
            v
      Start a project CTA
            |
            v
       Inquiry form
            |
       Validate input
        /         \
   errors          valid
     |               |
     v               v
Correct fields   Spam/rate checks
                     |
                Send inquiry email
                  /          \
              failure       success
                |              |
                v              v
          Retry/email      Confirmation
```

### Expected path

1. A visitor lands on Home or a relevant service/case-study page.
2. The visible headline explains that PurpleDevs builds websites and web applications for businesses.
3. The visitor scans proof, services, and process in the order most relevant to them.
4. Contextual CTAs consistently use “Start a project” or an equally clear phrase.
5. The visitor completes the inquiry in approximately three to five minutes.
6. Server-side checks pass and Resend accepts the message.
7. The visitor sees a confirmation and an honest response-time expectation configured by the studio.

## 2. Portfolio evaluation flow

```text
Home selected work or /work
        -> Choose project
        -> Read context and challenge
        -> Review approach and output
        -> Evaluate verified outcome
        -> Browse next case study OR start similar project
```

### Design requirements

- The project title and link remain clear even when the layout is visually irregular.
- Service labels help a visitor find relevant proof.
- Every case study includes a CTA after the outcome, where intent is highest.
- Next/previous work prevents dead ends.
- If only one or two real projects are available, the layout adapts without empty cards or fake entries.

## 3. Service-fit flow

1. Visitor opens Services from global navigation or a home preview.
2. Visitor identifies a problem or desired outcome, not merely a technical deliverable.
3. Visitor reviews likely deliverables, related work, and working process.
4. Visitor decides whether the engagement appears suitable.
5. Visitor starts an inquiry with project type preselected only when that preselection is transparent and editable.

## 4. Trust-building flow

```text
Claim -> Evidence -> People -> Process -> Low-friction contact
```

- Claims link or sit adjacent to relevant work.
- Testimonials are attributable and approved.
- Team content makes the studio feel human without forcing visitors through long biographies.
- Process content reduces uncertainty about feedback, decisions, launch, and ongoing support.
- Direct contact details and privacy information reduce form anxiety.

## 5. Mobile navigation flow

1. User focuses and activates the menu control.
2. Menu opens, the control communicates expanded state, and focus moves into the panel when appropriate.
3. Focus remains within a modal-style menu if the background is inert.
4. User selects a route, presses Escape, or activates Close.
5. Menu closes; focus returns to the trigger when no navigation occurs.
6. Scroll locking is removed without shifting page position.

## 6. Inquiry validation recovery flow

1. Visitor submits incomplete or malformed input.
2. No network request is made when client validation can identify the errors.
3. An error summary receives focus and lists human-readable issues.
4. Each summary link moves focus to its corresponding field.
5. Correct values remain intact; only secret/spam tokens may refresh.
6. Errors clear when the value becomes valid, without aggressive announcements on every keystroke.
7. Visitor resubmits once corrections are complete.

Server validation uses the same field names and message keys. A server-only error is rendered through the same accessible error system.

## 7. Delivery failure flow

1. The endpoint validates the request but email delivery fails or times out.
2. The response supplies a safe error code and correlation ID, not provider internals.
3. The page states that the message was not confirmed as received.
4. The visitor can retry after a short wait or use the displayed studio email address.
5. Operators receive an alert when failure volume crosses the configured threshold.

## 8. Rate-limit or spam flow

- The system gives a neutral message that does not reveal which anti-abuse rule fired.
- A `Retry-After` value is supplied for genuine rate limiting when possible.
- Submitted personal details are not echoed into logs.
- Visitors are offered direct email as an alternative, while suspicious input is not forwarded.

## 9. Keyboard-only flow

The expected order is skip link, header/navigation, page content, contextual CTAs, and footer. Decorative objects never enter the tab order. Focus styling is visible against every surface. Custom pointer and motion effects do not change keyboard behavior.

## 10. Reduced-motion flow

When reduced motion is requested:

- Entrance animation becomes immediate or a short opacity change.
- Marquees stop and present readable static content.
- Cursor trails, parallax, jitter, wiggle loops, and sticker-peel transforms are disabled.
- State changes remain clear through color, text, border, or iconography.

## 11. No-JavaScript and degraded-service flow

- Core navigation, page content, case-study links, email link, and legal information remain available.
- The inquiry form should use native form behavior or provide a clearly visible email fallback if progressive submission cannot run.
- Analytics failure never blocks rendering or interaction.
- Missing decorative media leaves a deliberate surface, not broken layout.
- Turnstile failure explains the temporary problem and offers direct email.

## 12. Content maintenance flow

```text
Edit typed data or MDX
      -> Run content validation
      -> Preview locally
      -> Open pull request
      -> Automated checks and preview deployment
      -> Editorial/visual approval
      -> Merge
      -> Production deployment
```

Invalid content, duplicate slugs, unapproved placeholder markers, and missing required media fail before production.

