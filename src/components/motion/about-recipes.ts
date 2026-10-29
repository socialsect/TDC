import gsap from "gsap";
import { all, inset, lines, one, type Recipe } from "./recipes";
import { entrance } from "./services-recipes";

/**
 * About page motion. Same policy as the other pages: the hero plays once on load; section
 * entrances replay on re-entry from above and finish instantly on fast arrivals (`entrance`);
 * parallax is scrubbed and limited to photo interiors.
 */

/** Image leads: the photo opens from a smaller rounded frame while the headline lines rise. */
export const aboutHero: Recipe = (section) => {
  const frame = one(section, "[data-hero-frame]");
  const media = one(section, "[data-hero-media]");
  document.documentElement.classList.add("motion-ready");
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  if (frame) {
    tl.fromTo(frame, { clipPath: inset(frame, 12, 9, 12, 9) }, { clipPath: inset(frame, 0, 0, 0, 0), duration: 1.6, ease: "expo.inOut", clearProps: "clipPath" }, 0);
  }
  if (media) tl.fromTo(media, { scale: 1.32 }, { scale: 1, duration: 2.2 }, 0);
  tl.add(lines(section, { duration: 1.3, stagger: 0.12 }), 0.3).fromTo(
    all(section, "[data-hero-item]"),
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 },
    0.45,
  );
};

/** Photo unmasks upward while the copy enters from the opposite side; the photo drifts gently with scroll. */
const aboutStory: Recipe = (section, { desktop }) => {
  const frame = one(section, "[data-story-frame]");
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(frame ?? [], { clipPath: frame ? inset(frame, 100, 0, 0, 0) : "none" }, { clipPath: frame ? inset(frame, 0, 0, 0, 0) : "none", duration: 0.9, ease: "power3.out", clearProps: "clipPath" })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, x: desktop ? 30 : 0, y: desktop ? 0 : 16 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" }, 0.1)
    .add(lines(section, { duration: 0.9 }), 0.15)
    .fromTo(all(section, "[data-story-copy]"), { opacity: 0, x: desktop ? 40 : 0, y: desktop ? 0 : 16 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.3);
  if (frame) {
    gsap.fromTo(all(frame, "[data-story-image]"), { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });
  }
};

/** Heading first, then each principle's rule draws across and its text slides in. */
const aboutApproach: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 })
    .add(lines(section, { duration: 0.9 }), 0.05);
  all(section, "[data-principle]").forEach((row) => {
    gsap
      .timeline({ scrollTrigger: entrance(row, "top 90%") })
      .fromTo(all(row, "[data-principle-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" })
      .fromTo(all(row, ":scope > :not([data-principle-rule])"), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, 0.15);
  });
};

/** Portrait opens from the centre (iris); the text follows as a separate sequence. */
const aboutOwner: Recipe = (section) => {
  const frame = one(section, "[data-owner-frame]");
  const tl = gsap.timeline({ scrollTrigger: entrance(section) });
  if (frame) {
    tl.fromTo(frame, { clipPath: inset(frame, 14, 14, 14, 14) }, { clipPath: inset(frame, 0, 0, 0, 0), duration: 1, ease: "power3.out", clearProps: "clipPath" }).fromTo(
      all(frame, "[data-owner-image]"),
      { scale: 1.1 },
      { scale: 1, duration: 1.4, ease: "power3.out" },
      0,
    );
  }
  tl.add(lines(section, { duration: 0.9 }), 0.35).fromTo(
    all(section, "[data-owner-item]"),
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
    0.4,
  );
};

/** Each photo unmasks from a different edge as it arrives; interiors drift with scroll. */
const aboutClinic: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 })
    .add(lines(section, { duration: 0.9 }), 0.05);
  all(section, "[data-clinic-photo]").forEach((fig, i) => {
    const frame = one(fig, "[data-clinic-frame]");
    if (!frame) return;
    const from = [inset(frame, 0, 100, 0, 0), inset(frame, 100, 0, 0, 0), inset(frame, 0, 0, 0, 100), inset(frame, 0, 0, 100, 0)][i % 4];
    gsap
      .timeline({ scrollTrigger: entrance(fig, "top 92%") })
      .fromTo(frame, { clipPath: from }, { clipPath: inset(frame, 0, 0, 0, 0), duration: 1, ease: "power3.out", clearProps: "clipPath" })
      .fromTo(all(fig, "figcaption"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.5);
    gsap.fromTo(all(frame, "[data-clinic-image]"), { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });
  });
};

/** Steps arrive in order; on desktop a progress line draws across them with scroll. */
const aboutExperience: Recipe = (section, { desktop }) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 })
    .add(lines(section, { duration: 0.9 }), 0.05);
  const list = one(section, "[data-steps]");
  if (!list) return;
  gsap.fromTo(
    all(list, "[data-step]"),
    { opacity: 0, y: desktop ? 0 : 20, x: desktop ? 30 : 0 },
    { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, scrollTrigger: entrance(list) },
  );
  const line = one(list, "[data-steps-line]");
  if (desktop && line) {
    gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 85%", end: "top 35%", scrub: 0.5 } });
  }
};

/** Quotes rise in sequence with their rule. */
const aboutReviews: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 })
    .add(lines(section, { duration: 0.9 }), 0.05)
    .fromTo(all(section, "[data-review]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, 0.25);
};

export const aboutRecipes: Record<string, Recipe> = {
  "about-story": aboutStory,
  "about-approach": aboutApproach,
  "about-owner": aboutOwner,
  "about-clinic": aboutClinic,
  "about-experience": aboutExperience,
  "about-reviews": aboutReviews,
};
