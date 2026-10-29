import gsap from "gsap";
import { all, inset, lines, one, type Recipe } from "./recipes";
import { entrance } from "./services-recipes";

/**
 * Contact page motion: deliberately quieter than the other pages. Hero plays once on load;
 * details replay on re-entry from above; the form/map entrance plays once so a form being
 * filled in never animates away. Fast arrivals finish instantly (see `entrance`).
 */

/** Typographic hero: headline lines rise, then the description and actions follow. */
export const contactHero: Recipe = (section) => {
  document.documentElement.classList.add("motion-ready");
  gsap
    .timeline({ defaults: { ease: "expo.out" } })
    .add(lines(section, { duration: 1.2, stagger: 0.12 }), 0.1)
    .fromTo(all(section, "[data-hero-item]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.25);
};

/** Hairline rules draw across, then each detail group slides in. */
const contactInfo: Recipe = (section) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-info-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut", stagger: 0.08 })
    .fromTo(all(section, "[data-info-body]"), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.2);
};

/** Form opens from the left and the map from the right (top/bottom when stacked); fields settle in. */
const contactForm: Recipe = (section, { desktop }) => {
  gsap
    .timeline({ scrollTrigger: entrance(section) })
    .fromTo(all(section, "[data-intro]"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 })
    .add(lines(section), 0.05);

  const form = one(section, "[data-contact-form]");
  const map = one(section, "[data-contact-map]");
  if (!form || !map) return;
  gsap
    .timeline({ scrollTrigger: entrance(form, "top 88%", "play none none none") })
    .fromTo(
      form,
      { clipPath: desktop ? inset(form, 0, 100, 0, 0) : inset(form, 0, 0, 100, 0) },
      { clipPath: inset(form, 0, 0, 0, 0), duration: 0.9, ease: "power3.out", clearProps: "clipPath" },
    )
    .fromTo(
      map,
      { clipPath: desktop ? inset(map, 0, 0, 0, 100) : inset(map, 100, 0, 0, 0) },
      { clipPath: inset(map, 0, 0, 0, 0), duration: 0.9, ease: "power3.out", clearProps: "clipPath" },
      0.1,
    )
    .fromTo(all(form, "[data-field], form > h3, form > p"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.04 }, 0.2);
};

export const contactRecipes: Record<string, Recipe> = {
  "contact-info": contactInfo,
  "contact-form": contactForm,
};
