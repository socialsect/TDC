import gsap from "gsap";

/**
 * Per-section motion recipes. Each receives its section element and builds its own
 * timelines/ScrollTriggers; MotionRoot runs them inside a gsap.matchMedia context,
 * so everything is reverted on unmount, breakpoint change or reduced-motion change.
 *
 * Replay policy
 *  - Hero entrance: once, on load.
 *  - Section entrances: `REPLAY` — play when the section enters from below, rewind
 *    only when the user scrolls back above it, so scrolling down again replays it,
 *    while scrolling up through content never makes it vanish.
 *  - Storytelling (About image, Services panel, Dentists stage, hero exit): scrubbed,
 *    so they follow the scroll position in both directions.
 *
 * Section entrances animate `opacity`, not `autoAlpha`: an element at visibility:hidden
 * is skipped by the Tab key, opacity:0 is not. MotionRoot completes any pending entrance
 * when focus lands inside it.
 */

export type MotionEnv = { desktop: boolean };
export type Recipe = (section: HTMLElement, env: MotionEnv) => void;

export const REPLAY = "play none none reverse";

export const all = (scope: Element, sel: string) => gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(sel));
export const one = (scope: Element, sel: string) => scope.querySelector<HTMLElement>(sel);

/** clip-path inset that keeps the element's own corner radius, re-read on refresh. */
export const inset = (el: HTMLElement, t: number, r: number, b: number, l: number) => () =>
  `inset(${t}% ${r}% ${b}% ${l}% round ${getComputedStyle(el).borderTopLeftRadius})`;

/** Masked line reveal for a heading built with <MaskLines>. */
export function lines(scope: Element, opts: gsap.TweenVars = {}) {
  const targets = all(scope, "[data-line]");
  if (!targets.length) return gsap.timeline();
  // `y: 0` on both ends: the tween owns the whole vertical offset, so a transform left over
  // from an earlier init (Strict Mode double mount, breakpoint rebuild) can't be adopted as a
  // base offset and leave the line stuck below its mask.
  // `lazy: false` renders the start state immediately, so a timeline completed in the same tick
  // (arriving at a section via a #hash) isn't overwritten by a deferred start-state render.
  return gsap.fromTo(
    targets,
    { yPercent: 115, y: 0, rotate: 2.5 },
    { yPercent: 0, y: 0, rotate: 0, duration: 1.15, ease: "expo.out", stagger: 0.09, lazy: false, ...opts },
  );
}

/* ------------------------------------------------------------------ Hero */

/** Load-time entrance plus a scrubbed exit. Pre-hidden in CSS (see globals.css) to avoid a flash. */
export const hero: Recipe = (section) => {
  const frame = one(section, "[data-hero-frame]");
  const media = one(section, "[data-hero-media]");
  const panel = one(section, "[data-hero-panel]");
  const title = one(section, "h1");
  const items = all(section, "[data-hero-item]");
  if (!frame || !media || !panel || !title) return;

  // Release the CSS pre-hide first, so GSAP doesn't read the CSS transforms as base
  // offsets. The timeline below applies its start state in this same task, so no
  // frame is painted in between.
  document.documentElement.classList.add("motion-ready");

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.fromTo(
    frame,
    { clipPath: inset(frame, 12, 9, 12, 9) },
    { clipPath: inset(frame, 0, 0, 0, 0), duration: 1.7, ease: "expo.inOut", clearProps: "clipPath" },
    0,
  )
    .fromTo(media, { scale: 1.32 }, { scale: 1, duration: 2.4 }, 0)
    .fromTo(
      panel,
      { autoAlpha: 0, scale: 0.94, transformOrigin: "0% 100%" },
      { autoAlpha: 1, scale: 1, duration: 1.3 },
      0.75,
    )
    .add(lines(title, { duration: 1.3, stagger: 0.12 }), 0.9)
    .fromTo(items, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 1.15);

  // Exit: the photo drifts and the whole stage (photo + notched panel) recedes as the hero scrolls away.
  const exit = { trigger: section, start: "top top", end: "bottom top", scrub: true };
  gsap.to(media, { yPercent: 9, ease: "none", scrollTrigger: exit });
  const stage = one(section, "[data-hero-stage]");
  if (stage) gsap.to(stage, { scale: 0.95, transformOrigin: "50% 0%", ease: "none", scrollTrigger: exit });
};

/* ------------------------------------------------------------ Commitment */

/** Cards converge from alternating sides, then icons and copy arrive in a second phase. */
export const commitment: Recipe = (section, { desktop }) => {
  const head = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 78%", toggleActions: REPLAY } });
  head.add(lines(section)).fromTo(
    all(section, "[data-intro]"),
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
    0.25,
  );

  const cards = all(section, "[data-card]");
  const list = one(section, "[data-cards]");
  if (!list || !cards.length) return;
  const xFrom = desktop ? [-90, 0, 90] : [0, 0, 0];
  const rotFrom = desktop ? [-4, 0, 4] : [0, 0, 0];

  gsap
    .timeline({ scrollTrigger: { trigger: list, start: "top 82%", toggleActions: REPLAY } })
    .fromTo(
      cards,
      {
        opacity: 0,
        x: (i) => xFrom[i % 3],
        y: (i) => (i % 3 === 1 ? 110 : 50),
        rotate: (i) => rotFrom[i % 3],
        transformOrigin: "50% 100%",
      },
      { opacity: 1, x: 0, y: 0, rotate: 0, duration: 1.25, ease: "expo.out", stagger: 0.11 },
    )
    .fromTo(
      all(list, "[data-card-icon]"),
      { scale: 0.3, rotate: -60, opacity: 0 },
      { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(1.6)", stagger: 0.11 },
      0.45,
    )
    .fromTo(
      all(list, "[data-card-text]"),
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 },
      0.6,
    );
};

/* ------------------------------------------------------------------ About */

/** Image is uncovered by scroll progress; copy slides in from the side. */
export const about: Recipe = (section) => {
  const frame = one(section, "[data-about-frame]");
  const image = one(section, "[data-about-image]");
  const tile = one(section, "[data-about-tile]");

  if (frame) {
    gsap.fromTo(
      frame,
      { clipPath: inset(frame, 16, 22, 16, 0) },
      {
        clipPath: inset(frame, 0, 0, 0, 0),
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top 92%", end: "top 35%", scrub: 0.8, invalidateOnRefresh: true },
      },
    );
  }
  if (image) {
    gsap.fromTo(
      image,
      { yPercent: -7, scale: 1.22 },
      {
        yPercent: 7,
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: frame ?? image, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }
  if (tile) {
    gsap.fromTo(
      tile,
      { rotate: -18, scale: 0.55, opacity: 0 },
      {
        rotate: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: frame ?? tile, start: "top 70%", end: "top 25%", scrub: 0.8 },
      },
    );
  }

  const text = one(section, "[data-about-text]");
  if (!text) return;
  gsap
    .timeline({ scrollTrigger: { trigger: text, start: "top 80%", toggleActions: REPLAY } })
    .fromTo(all(text, "[data-intro]"), { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" })
    .add(lines(text), 0.05)
    .fromTo(
      all(text, "[data-about-copy] > *"),
      { opacity: 0, x: 48 },
      { opacity: 1, x: 0, duration: 1.1, ease: "expo.out", stagger: 0.1 },
      0.3,
    )
    .fromTo(
      all(text, "[data-about-cta]"),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      0.6,
    );
};

/* --------------------------------------------------------------- Services */

/** Panel expands with scroll; rows of cards slide in from alternating sides. */
export const services: Recipe = (section, { desktop }) => {
  const panel = one(section, "[data-services-panel]");
  if (panel) {
    gsap.fromTo(
      panel,
      { scale: desktop ? 0.93 : 0.97, transformOrigin: "50% 0%" },
      { scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "top 20%", scrub: 0.6 } },
    );
  }

  gsap
    .timeline({ scrollTrigger: { trigger: section, start: "top 70%", toggleActions: REPLAY } })
    .add(lines(section))
    .fromTo(
      all(section, "[data-intro]"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
      0.3,
    );

  const cards = all(section, "[data-card]");
  const grid = one(section, "[data-cards]");
  if (!grid || !cards.length) return;
  // Row index from the live layout, so 1/2/3-column grids all alternate correctly.
  const row = (el: HTMLElement) => {
    const tops = [...new Set(cards.map((c) => c.offsetTop))].sort((a, b) => a - b);
    return tops.indexOf(el.offsetTop);
  };

  gsap
    .timeline({
      scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: REPLAY, invalidateOnRefresh: true },
    })
    .fromTo(
      cards,
      { opacity: 0, x: (_i, el) => (desktop ? (row(el) % 2 ? 80 : -80) : 0), y: desktop ? 0 : 50 },
      { opacity: 1, x: 0, y: 0, duration: 1.15, ease: "expo.out", stagger: 0.07 },
    )
    .fromTo(
      all(grid, "[data-card-icon]"),
      { clipPath: "inset(100% 0% 0% 0% round 1.25rem)", scale: 1.25 },
      {
        clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
        scale: 1,
        duration: 0.9,
        ease: "power3.inOut",
        stagger: 0.07,
        clearProps: "clipPath",
      },
      0.25,
    );
};

/* --------------------------------------------------------------- Dentists */

/**
 * Desktop: a short sticky stage (CSS position: sticky, no GSAP pin) whose image widens
 * to full bleed while the statement panel rises, scrubbed to scroll.
 * Mobile: the same idea without the sticky stage.
 */
export const dentists: Recipe = (section, { desktop }) => {
  gsap
    .timeline({ scrollTrigger: { trigger: section, start: "top 75%", toggleActions: REPLAY } })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })
    .add(lines(section, { stagger: 0.14 }), 0.1);

  const track = one(section, "[data-dentists-track]");
  const frame = one(section, "[data-dentists-frame]");
  const image = one(section, "[data-dentists-image]");
  const panel = one(section, "[data-dentists-panel]");
  if (!track || !frame || !image || !panel) return;
  const chips = all(panel, "[data-chip]");

  if (desktop) {
    gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: track, start: "top top+=112", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
      })
      .fromTo(frame, { clipPath: inset(frame, 6, 17, 6, 17) }, { clipPath: inset(frame, 0, 0, 0, 0), duration: 1 }, 0)
      .fromTo(image, { scale: 1.32, yPercent: -4 }, { scale: 1.02, yPercent: 4, duration: 1 }, 0)
      // Panel wipes up at full opacity, so its copy is never shown semi-transparent over the photo.
      .fromTo(
        panel,
        { clipPath: inset(panel, 100, 0, 0, 0), yPercent: 35 },
        { clipPath: inset(panel, 0, 0, 0, 0), yPercent: 0, duration: 0.45, ease: "power2.out" },
        0.4,
      )
      .fromTo(chips, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.2, stagger: 0.06 }, 0.65);
    return;
  }

  gsap
    .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: frame, start: "top 95%", end: "top 25%", scrub: 0.6, invalidateOnRefresh: true } })
    .fromTo(frame, { clipPath: inset(frame, 8, 8, 8, 8) }, { clipPath: inset(frame, 0, 0, 0, 0) }, 0)
    .fromTo(image, { scale: 1.25 }, { scale: 1.02 }, 0);
  gsap
    .timeline({ scrollTrigger: { trigger: panel, start: "top 88%", toggleActions: REPLAY } })
    .fromTo(panel, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out" })
    .fromTo(chips, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }, 0.35);
};

/* ----------------------------------------------------------- Testimonials */

/** Featured review wipes open from the left; the rest slide in horizontally from the right. */
export const testimonials: Recipe = (section, { desktop }) => {
  gsap
    .timeline({ scrollTrigger: { trigger: section, start: "top 70%", toggleActions: REPLAY } })
    .add(lines(section))
    .fromTo(all(section, "[data-intro]"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, 0.25);

  const featured = one(section, "[data-featured]");
  const quotes = all(section, "[data-quote]");
  const grid = one(section, "[data-quotes]");
  if (!grid) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: REPLAY } });
  if (featured) {
    tl.fromTo(
      featured,
      { clipPath: inset(featured, 0, 100, 0, 0) },
      { clipPath: inset(featured, 0, 0, 0, 0), duration: 1.3, ease: "expo.inOut", clearProps: "clipPath" },
    ).fromTo(
      all(featured, "[data-featured-body] > *"),
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
      0.55,
    );
  }
  tl.fromTo(
    quotes,
    { opacity: 0, x: desktop ? 120 : 60 },
    { opacity: 1, x: 0, duration: 1.1, ease: "expo.out", stagger: 0.08 },
    0.25,
  );
};

/* ------------------------------------------------------- FAQs and contact */

export const faq: Recipe = (section) => {
  const list = one(section, "[data-faq]");
  if (list) {
    gsap
      .timeline({ scrollTrigger: { trigger: list, start: "top 78%", toggleActions: REPLAY } })
      .fromTo(all(list, "[data-intro]"), { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
      .add(lines(list), 0.05)
      .fromTo(
        all(list, "[data-faq-item]"),
        { opacity: 0, x: -36 },
        { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 },
        0.3,
      );
  }

  const contact = one(section, "[data-contact]");
  if (!contact) return;
  gsap
    .timeline({ scrollTrigger: { trigger: contact, start: "top 80%", toggleActions: REPLAY } })
    .fromTo(
      contact,
      { clipPath: inset(contact, 100, 0, 0, 0) },
      { clipPath: inset(contact, 0, 0, 0, 0), duration: 1.2, ease: "expo.inOut", clearProps: "clipPath" },
    )
    .fromTo(
      all(contact, "[data-contact-head] > *"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07 },
      0.5,
    )
    .fromTo(
      all(contact, "[data-contact-row]"),
      { opacity: 0, x: 28 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 },
      0.7,
    );
};

/* ------------------------------------------------------ Contact & location */

/**
 * Form and map open from opposite sides (top/bottom when stacked on mobile), then the
 * fields and address card settle in. The heading replays like other sections, but the
 * form/map entrance plays once: a form someone may be filling in should never animate away.
 */
export const location: Recipe = (section, { desktop }) => {
  gsap
    .timeline({ scrollTrigger: { trigger: section, start: "top 75%", toggleActions: REPLAY } })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 })
    .add(lines(section), 0.05);

  const form = one(section, "[data-location-form]");
  const map = one(section, "[data-location-map]");
  if (!form || !map) return;
  const grid = form.parentElement ?? form;
  const formFrom = desktop ? inset(form, 0, 100, 0, 0) : inset(form, 0, 0, 100, 0);
  const mapFrom = desktop ? inset(map, 0, 0, 0, 100) : inset(map, 100, 0, 0, 0);

  gsap
    .timeline({ scrollTrigger: { trigger: grid, start: "top 82%", toggleActions: "play none none none" } })
    .fromTo(form, { clipPath: formFrom }, { clipPath: inset(form, 0, 0, 0, 0), duration: 1.3, ease: "expo.inOut", clearProps: "clipPath" })
    .fromTo(map, { clipPath: mapFrom }, { clipPath: inset(map, 0, 0, 0, 0), duration: 1.3, ease: "expo.inOut", clearProps: "clipPath" }, 0.12)
    .fromTo(all(map, "[data-location-map-inner]"), { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.12)
    .fromTo(
      all(form, "[data-field], form > h3, form > p"),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 },
      0.55,
    )
    .fromTo(all(map, "[data-location-card]"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0.8);
};

/* --------------------------------------------------------------- Insights */

export const insights: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: { trigger: section, start: "top 75%", toggleActions: REPLAY } })
    .add(lines(section))
    .fromTo(all(section, "[data-card]"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.1 }, 0.2)
    .fromTo(
      all(section, "[data-card-media]"),
      { clipPath: "inset(100% 0% 0% 0% round 1.75rem)" },
      { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", duration: 1.1, ease: "expo.inOut", stagger: 0.1, clearProps: "clipPath" },
      0.2,
    );
};

/* ----------------------------------------------------------------- Footer */

/** Restrained: headline lines and a soft column cascade, no parallax. */
export const footer: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: { trigger: section, start: "top 85%", toggleActions: REPLAY } })
    .add(lines(section, { stagger: 0.12 }))
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.35)
    .fromTo(
      all(section, "[data-footer-col]"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 },
      0.45,
    );
};

export const recipes: Record<string, Recipe> = {
  commitment,
  about,
  services,
  dentists,
  testimonials,
  faq,
  insights,
  location,
  footer,
};
