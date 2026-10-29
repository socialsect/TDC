# TDC Dental — homepage (Next.js)

New homepage for TDC Dental Clinic, Deira, Dubai. Reference: https://tdcdental.ae/

Stack: Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript, Tailwind CSS 4, GSAP 3.15 + `@gsap/react`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

## Structure

```
src/
  app/
    actions/enquiry.ts  Server Action that validates and delivers enquiries (see "Enquiry form")
    layout.tsx        Fonts (Roboto display, Inter body via next/font, self-hosted), metadata, motion flag script
    page.tsx          Section order + JSON-LD (Dentist schema)
    globals.css       Design tokens (@theme): colours, radii, shadows, easing
  content/site.ts     ALL homepage copy and facts (incl. enquiry options, map embed URL). Edit content here.
  lib/enquiry.ts      Enquiry fields, limits and validation shared by the form and the Server Action
  components/
    layout/           Header (client: sticky nav, info strip scrolls away, accessible mobile menu), Footer
    sections/         Hero, Commitment, About, Services, Dentists, Testimonials, FaqContact (+ FaqAccordion client),
                      Insights, ContactLocation (+ EnquiryForm client)
    motion/           MotionRoot (client GSAP boundary) + recipes.ts (per-section motion)
    ui/               ButtonLink + Eyebrow, MaskLines, inline SVG icons, CurrentYear
public/
  images/             Real clinic photography from tdcdental.ae (reception, treatment room)
  brand/              TDC logo, black and white versions
```

Only `Header`, `FaqAccordion`, `EnquiryForm`, `MotionRoot` and `CurrentYear` are client components. Everything else is a server component.

## Design conventions

- **Colour:** `ink` #000, `paper` #fff, `mist` (section tint), `line`, `muted`. No accent colours. Photos keep their natural colour.
- **Type:** `font-display` (Roboto) for headings, `font-sans` (Inter) for everything else. Headings use a medium/light-italic pairing.
- **Radii:** large on feature media (2.75–3.5rem), medium on cards (1.75–2.5rem), pills only for buttons and chips.
- **Buttons:** `<ButtonLink variant="primary | secondary | inverse | ghost-inverse" arrow>`.
- **Hero:** on `lg` and up, the white panel is "notched" into the photo with concave corners (`NotchCorner`). Below `lg` it becomes a rounded sheet overlapping the photo.

## Motion (GSAP)

One client boundary, [`MotionRoot`](src/components/motion/MotionRoot.tsx), runs per-section recipes from
[`recipes.ts`](src/components/motion/recipes.ts). Sections stay server components and opt in with
`data-motion="<recipe>"`; recipe-specific hooks are plain `data-*` attributes on the markup.
Headings use `<MaskLines>` (server-rendered line masks), so no runtime text splitting touches React's DOM.

| Section | Treatment | Trigger / replay |
|---|---|---|
| Hero | Photo unmasks from an inset clip with a 1.32→1 zoom, panel scales in, headline lines rise from masks, copy/CTAs stagger | Plays once on load. Exit is scrubbed: photo drifts, whole stage recedes to 0.95 |
| Commitment | Headline lines, intro slides from right; cards converge from alternating sides with slight rotation, then icons spin in and copy follows | Entrance, `play none none reverse` |
| About | Image frame uncovered by scroll (clip-path), layered image parallax + zoom, logo tile rotates in; copy slides in from the right | Image/tile scrubbed; text is an entrance |
| Services | Grey panel expands from 0.93 with scroll; headline lines; card rows slide in from alternating sides (computed from live layout), icons clip in | Panel scrubbed; content entrance |
| Dentists | **Desktop storytelling**: short sticky stage (CSS `position: sticky`, no GSAP pin) where the photo widens to full bleed and the statement panel wipes up. Mobile: scrubbed clip + panel entrance | Scrubbed both directions |
| Testimonials | Featured review wipes open from the left, other reviews slide in horizontally | Entrance |
| FAQs / contact | Questions cascade in from the left; contact panel wipes up, then details stagger in. Accordion opens with a height + offset transition | Entrance; accordion is interaction-driven (CSS) |
| Footer | Headline lines, CTA, columns cascade | Entrance |
| Insights | Card stagger + image clip (renders only when articles exist) | Entrance |
| Contact & location | Heading lines; form wipes open from the left and map from the right (top/bottom when stacked), map zooms in, fields and address card settle | Heading replays; form/map entrance plays **once**, so a form being filled in never animates away |

**Replay policy.** Entrances use `toggleActions: "play none none reverse"`. They play when the section enters from
below and rewind only when the user scrolls back above it, so they replay on the next pass down but never vanish while
scrolling up through content. Scrubbed sequences follow scroll position in both directions. The hero never replays.

**Robustness**
- Everything runs inside `gsap.matchMedia`. Reduced motion gets the static page (no inline styles, no sticky scroll
  distance). A breakpoint change across `lg` rebuilds section motion with the right layout values; the hero lives in a
  separate context so it does not replay on resize.
- `useGSAP` scopes and reverts all tweens and ScrollTriggers on unmount, which covers Strict Mode double mounts.
  `ScrollTrigger.refresh()` runs after web fonts load. Function-based clip values and `invalidateOnRefresh` re-measure radii and rows after a resize.
- Pre-hydration: an inline script adds `html.motion-ok`, and CSS draws the hero's first frame (masked lines, clipped
  photo, hidden panel). GSAP adds `html.motion-ready` and takes over. A 2.5s CSS failsafe reveals the hero if scripts
  never load. Nothing below the hero is hidden before JavaScript runs.
- Section entrances animate `opacity`, never `autoAlpha`: `visibility: hidden` would make links and form fields
  unreachable by Tab before their section scrolls in. A `focusin` safety net in `MotionRoot` completes any pending
  entrance around the focused element (and jumps the scrubbed Dentists stage, marked `data-focus-complete`, to its end).
- `MotionRoot` uses `overflow-x: clip`, so elements waiting off to the side never cause horizontal scroll.
- Don't put CSS `transition` on `transform` for elements GSAP animates (it makes tweens lag). Hover effects use the
  separate `translate` / `rotate` / `scale` properties instead.

## Enquiry form

`ContactLocation` (before the footer) holds the enquiry form and the Google Maps embed.

**Status: not connected to a live endpoint yet.** No backend, email service or form provider existed in the project
or on the live site (its form is unedited template content), so none was assumed. The delivery path is fully built:

1. The client validates (name, email, phone required; treatment optional; message 10–2000 chars) with inline, linked
   errors, focus on the first invalid field and a summary alert.
2. `submitEnquiry` (a Server Action) re-validates with the same rules, drops honeypot submissions, then POSTs JSON
   `{ name, email, phone, service, message, source, submittedAt }` to `ENQUIRY_WEBHOOK_URL`, with an optional
   `Authorization: Bearer $ENQUIRY_WEBHOOK_TOKEN`. Both are server-only env vars (see `.env.example`).
3. The visitor sees "sent" **only** when the endpoint returns 2xx. Endpoint failure → "couldn't send, try again or
   call", input kept. No endpoint configured → "online enquiries aren't available yet — call or WhatsApp", input kept.

**To go live:** choose a receiver that accepts a JSON POST (e.g. Formspree, a Make/Zapier webhook that emails the
clinic, or the clinic's CRM), set `ENQUIRY_WEBHOOK_URL` (and the token if needed) in the hosting environment, and
send one test enquiry. Also recommended before launch: rate limiting or a CAPTCHA at the edge, and a privacy notice
for patient data.

The map uses the clinic-supplied Google Maps embed (`mapEmbedSrc` in `content/site.ts`), lazy-loaded inside a
fixed-proportion rounded frame (4:3 mobile, 16:10 tablet, matches the form height on desktop), lightly desaturated
to sit in the monochrome palette (full colour on hover/focus).

## Conversion paths

- "Book an Appointment" CTAs go to `#contact`, the black contact panel with **Call** (`tel:+97148810034`) and **WhatsApp** (the same number the live site uses).
- Service cards, "View All Services", "More testimonials" and "Smile Gallery" link to the existing pages on tdcdental.ae (all checked for HTTP 200 on 29 Oct 2026) until those pages are rebuilt.
- **Enquiry form** in the Contact & location section — built and validated, awaiting a delivery endpoint (see above).

## Content dependencies (need the clinic's input)

1. **Opening hours:** the live site shows three conflicting schedules ("Every day 1–10 PM, Wednesday closed"; "Mon–Sat 1–10 PM"; "Mon–Sat 7 AM–7 PM"). `clinic.openingHours` is `null`, so the UI says "Please call to confirm". Set it once confirmed.
2. **Enquiry delivery endpoint:** the form is built but needs `ENQUIRY_WEBHOOK_URL` (see "Enquiry form"). The live `/make-appointment/` form is unedited template content (doctors "Dr. Alex / Dr. John / Dr. Marry", "10% discount") and was not reused.
3. **WhatsApp number:** the live site points WhatsApp at the landline +971 4 881 0034. Confirm it is a WhatsApp Business number, or provide the correct mobile number.
4. **Photography:** only two genuine clinic photos exist (reception, treatment room), so the reception photo appears twice (hero and dentists section). Needed: doctor portraits, team photos, more interiors, and treatment-specific imagery. The service images on the live site look like they came from other clinics' articles (e.g. a "hollywood-smile-turkey-cost" file), so they were not used.
5. **Doctors:** no verified names, credentials or bios are published. The section makes no individual claims.
6. **News and Insights:** every post on the live homepage is template content (whales, kidney disease, sickle cell, blood pressure). The `Insights` section renders nothing until real dental articles are added to `articles` in `content/site.ts`.
7. **Reviews:** six Google reviews are quoted from the live site's Trustindex widget, with two shortened (marked "…"). Star ratings and the "165 reviews" count were left out because they change over time. A live Google reviews integration would keep them current.
8. **Legal pages:** `/privacy-policy/` and `/terms-and-conditions/` return 404 on the live site, so no legal links are shown.
9. **Social:** only Facebook (`facebook.com/tdc.uae`) is verified.
10. **Analytics:** the live site loads Google tag `GT-KDQ6V7KT` and Meta Pixel `4512186262259811`. They were **not** added (no consent banner or configuration ownership confirmed). Add them via `next/script` once approved.
11. **Canonical domain:** `metadataBase` is `https://tdcdental.ae`. Confirm before launch.
