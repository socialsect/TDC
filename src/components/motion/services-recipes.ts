import gsap from "gsap";
import { REPLAY, all, inset, lines, one, type Recipe } from "./recipes";

/**
 * Scroll speed (px/s) above which an entrance is skipped to its end state. Brisk normal
 * wheel/trackpad scrolling reaches ~3,000 px/s and should still see the animation; a real
 * fling is far faster (measured 26,000–37,000 px/s).
 */
const FLING = 4000;

/**
 * Entrance trigger shared by every Services section. Starts as soon as the element's top
 * enters the viewport, so the reveal is under way before the content is in reading
 * position. If the user arrives fast — a fling, or a jump (anchor link, scrollbar drag)
 * that lands well past the start before the trigger fires — the entrance completes
 * instantly so they never land on a half-revealed section. Replays on re-entry from above.
 */
export const entrance = (trigger: Element, start = "top 88%", toggleActions = REPLAY): ScrollTrigger.Vars => ({
  trigger,
  start,
  toggleActions,
  onEnter: (self) => {
    const overshot = self.scroll() - self.start > window.innerHeight * 0.4;
    if (overshot || Math.abs(self.getVelocity()) > FLING) self.animation?.progress(1);
  },
});

/**
 * Services page motion. Same policy as the homepage (see recipes.ts): hero plays once on
 * load, entrances replay on re-entry from above, scrubbed layers follow scroll both ways.
 * Each section gets its own treatment rather than a shared fade-up.
 */

/* ------------------------------------------------------------- Hero (load) */

/** Text leads here (the homepage hero leads with the image): lines rise, then the photo opens and the card slides in. */
export const servicesHero: Recipe = (section) => {
  const frame = one(section, "[data-hero-frame]");
  const media = one(section, "[data-hero-media]");
  const card = one(section, "[data-hero-card]");
  const items = all(section, "[data-hero-item]").filter((el) => el !== card);
  if (!frame || !media) return;

  document.documentElement.classList.add("motion-ready");

  gsap
    .timeline({ defaults: { ease: "expo.out" } })
    .add(lines(section, { duration: 1.3, stagger: 0.12 }), 0.1)
    .fromTo(items, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.2)
    .fromTo(
      frame,
      { clipPath: inset(frame, 12, 9, 12, 9) },
      { clipPath: inset(frame, 0, 0, 0, 0), duration: 1.7, ease: "expo.inOut", clearProps: "clipPath" },
      0.25,
    )
    .fromTo(media, { scale: 1.32 }, { scale: 1, duration: 2.4 }, 0.25)
    .fromTo(card ?? [], { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 1.2 }, 1.1);

  gsap.to(media, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
  });
};

/* ------------------------------------------------------------ Index (nav) */

/** Category rows slide in from the right like an index being drawn. */
const svcIndex: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 })
    .add(lines(section), 0.05)
    .fromTo(all(section, "[data-index-row]"), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.1, ease: "expo.out", stagger: 0.1 }, 0.2);
};

/* ------------------------------------------------------ Featured section */

/**
 * One area of care per section, each with its own trigger so only the section being
 * read animates. The image unmasks from its outer edge and settles from a slight zoom;
 * the text block follows as one group.
 */
const svcFeature: Recipe = (section, { desktop }) => {
  const frame = one(section, "[data-feature-frame]");
  const media = one(section, "[data-feature-media]");
  const text = one(section, "[data-feature-text]");
  if (!frame || !text) return;
  const imageRight = section.dataset.side === "right";
  const from = desktop ? (imageRight ? inset(frame, 0, 0, 0, 100) : inset(frame, 0, 100, 0, 0)) : inset(frame, 100, 0, 0, 0);

  gsap
    .timeline({ scrollTrigger: entrance(section) })
    // power3.out front-loads the reveal (most of the image is visible within ~0.3s);
    // the text follows almost immediately instead of waiting for the image to finish.
    .fromTo(frame, { clipPath: from }, { clipPath: inset(frame, 0, 0, 0, 0), duration: 0.9, ease: "power3.out", clearProps: "clipPath" })
    .fromTo(media ?? [], { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power3.out" }, 0)
    .add(lines(text, { duration: 0.9 }), 0.1)
    .fromTo(all(text, "[data-feature-item]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, 0.15);
};

/* ------------------------------------------------------------- Directory */

/** Heading lines, then directory rows fade up in reading order. */
const svcGrid: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .add(lines(section))
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0.1);

  const list = one(section, "[data-directory]");
  if (!list) return;
  gsap.fromTo(
    all(list, "[data-directory-row]"),
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06, scrollTrigger: entrance(list) },
  );
};

/* ----------------------------------------------------------------- Trust */

/** Text-led: heading and quote first, then the five points cascade from the right. */
const svcTrust: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 })
    .add(lines(section), 0.05)
    .fromTo(all(section, "[data-trust-point]"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.35);
};

/* --------------------------------------------------------------- Journey */

/** A progress line draws with scroll; each step lights up as it is reached. */
const svcJourney: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 })
    .add(lines(section), 0.05);

  const list = one(section, "[data-journey]");
  const line = one(section, "[data-journey-line]");
  if (!list) return;
  if (line) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: 0.5 } },
    );
  }
  all(list, "[data-journey-step]").forEach((step) => {
    gsap
      .timeline({ scrollTrigger: entrance(step) })
      .fromTo(
        one(step, "[data-journey-dot]") ?? [],
        { scale: 0.4, backgroundColor: "#ffffff", color: "#000000" },
        { scale: 1, backgroundColor: "#000000", color: "#ffffff", duration: 0.7, ease: "back.out(1.7)" },
      )
      .fromTo(all(step, "h3, p"), { opacity: 0, x: 36 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.1);
  });
};

/* ------------------------------------------------------------------- FAQ */

/** Same treatment as the homepage FAQ (intro, heading lines, questions cascade), using the Services entrance trigger. */
const svcFaq: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 })
    .add(lines(section), 0.05)
    .fromTo(all(section, "[data-faq-item]"), { opacity: 0, x: -36 }, { opacity: 1, x: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 }, 0.2);
};

/* ------------------------------------------------------------------- CTA */

/** Panel opens from a smaller rounded frame, then heading, copy and actions follow. */
const svcCta: Recipe = (section) => {
  const panel = one(section, "[data-cta-panel]");
  if (!panel) return;
  gsap
    .timeline({ scrollTrigger: entrance(panel) })
    .fromTo(
      panel,
      { clipPath: inset(panel, 8, 6, 8, 6), scale: 0.97 },
      { clipPath: inset(panel, 0, 0, 0, 0), scale: 1, duration: 1.3, ease: "expo.inOut", clearProps: "clipPath" },
    )
    .add(lines(panel, { stagger: 0.12 }), 0.4)
    .fromTo(all(panel, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0.55)
    .fromTo(all(panel, "[data-cta-action]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 }, 0.7);

};

export const serviceRecipes: Record<string, Recipe> = {
  "svc-index": svcIndex,
  "svc-feature": svcFeature,
  "svc-grid": svcGrid,
  "svc-trust": svcTrust,
  "svc-journey": svcJourney,
  "svc-faq": svcFaq,
  "svc-cta": svcCta,
};
