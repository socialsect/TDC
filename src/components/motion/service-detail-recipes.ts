import gsap from "gsap";
import { all, inset, lines, one, type Recipe } from "./recipes";
import { entrance } from "./services-recipes";

/**
 * Service detail page sections (components/service-detail/ServiceDetailTemplate.tsx). The hero,
 * process, trust, FAQ and CTA reuse the Services recipes, so every treatment page shares one
 * motion language; these cover the sections only the detail pages have. Same policy and
 * entrance trigger as the Services page.
 */

/** Heading lines, then the lead paragraph and supporting copy rise in reading order. */
const sdAbout: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
    .add(lines(section), 0.05)
    .fromTo(all(section, "[data-about-copy]"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.1 }, 0.2);
};

/** The panel opens from a slightly smaller rounded frame; benefits follow left to right. */
const sdBenefits: Recipe = (section) => {
  const panel = one(section, "[data-benefits-panel]");
  if (!panel) return;
  gsap
    .timeline({ scrollTrigger: entrance(panel) })
    .fromTo(
      panel,
      { clipPath: inset(panel, 6, 4, 6, 4) },
      { clipPath: inset(panel, 0, 0, 0, 0), duration: 1.2, ease: "expo.inOut", clearProps: "clipPath" },
    )
    .fromTo(all(panel, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.3)
    .add(lines(panel), 0.35)
    .fromTo(all(panel, "[data-benefit]"), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.55);
};

/** Intro first, then each list's items slide in from the right. */
const sdSuitability: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 })
    .add(lines(section), 0.05);
  all(section, "[data-suit-list]").forEach((list) => {
    gsap
      .timeline({ scrollTrigger: entrance(list) })
      .fromTo(one(list, "h3") ?? [], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo(all(list, "[data-suit-item]"), { opacity: 0, x: 36 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.1);
  });
};

/** Heading lines, then related rows fade up. */
const sdRelated: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
    .add(lines(section), 0.05)
    .fromTo(all(section, "[data-related-row]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.2);
};

export const serviceDetailRecipes: Record<string, Recipe> = {
  "sd-about": sdAbout,
  "sd-benefits": sdBenefits,
  "sd-suitability": sdSuitability,
  "sd-related": sdRelated,
};
