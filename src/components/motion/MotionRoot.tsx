"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { hero, recipes as homeRecipes, type Recipe } from "./recipes";
import { serviceRecipes, servicesHero } from "./services-recipes";
import { contactHero, contactRecipes } from "./contact-recipes";
import { aboutHero, aboutRecipes } from "./about-recipes";
import { serviceDetailRecipes } from "./service-detail-recipes";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Development only: a handle for inspecting live triggers (e.g. checking for duplicates).
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  (window as Window & { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
}

/** Load-time hero entrances, keyed by the hero section's data-motion value. */
const heroes: Record<string, Recipe> = { hero, "services-hero": servicesHero, "contact-hero": contactHero, "about-hero": aboutHero };
/** Scroll-driven section recipes from every page. */
const recipes: Record<string, Recipe> = { ...homeRecipes, ...serviceRecipes, ...serviceDetailRecipes, ...contactRecipes, ...aboutRecipes };

/**
 * Single client boundary for page motion. Sections stay server components and opt in
 * with `data-motion="<recipe>"` (recipes.ts, services-recipes.ts, service-detail-recipes.ts, contact-recipes.ts, about-recipes.ts). A page's hero also carries
 * `data-hero` and plays once on load via `heroes`.
 *
 * - Everything runs inside gsap.matchMedia, so reduced-motion users get the static page
 *   and a breakpoint change rebuilds section motion with the right layout values.
 * - The hero lives in its own context that ignores breakpoints, so its entrance never
 *   replays on resize.
 * - useGSAP scopes the work to this subtree and reverts all tweens/ScrollTriggers on
 *   unmount (including React Strict Mode's double mount), so no triggers are duplicated.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        const section = el.querySelector<HTMLElement>("[data-hero][data-motion]");
        const run = section && heroes[section.dataset.motion ?? ""];
        if (!section || !run) return;
        // Named add: returns a function that runs later but stays inside this context (reverted with it).
        const play = context.add("playHero", () => run(section, { desktop: window.matchMedia("(min-width: 1024px)").matches })) as () => void;
        // On a first load the logo preloader covers the page. Hand-off: it removes html.preloading
        // only once its exit animation has fully finished (or its hard limit clears it), so start
        // the hero exactly then. MutationObserver callbacks run before the next paint, so the hero's
        // start state is applied with no visible gap or flash.
        const html = document.documentElement;
        if (!html.classList.contains("preloading")) return play();
        const observer = new MutationObserver(() => {
          if (html.classList.contains("preloading")) return;
          observer.disconnect();
          play();
        });
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
      });

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return;
          el.querySelectorAll<HTMLElement>("[data-motion]").forEach((section) => {
            recipes[section.dataset.motion ?? ""]?.(section, { desktop });
          });
        },
      );

      // Web fonts can change text height after first layout; recalculate trigger positions.
      let active = true;
      document.fonts?.ready.then(() => active && ScrollTrigger.refresh());

      // Keyboard safety net: if focus lands inside content whose entrance hasn't finished
      // (e.g. tabbing ahead of scrolling), finish it now so the focused control is visible.
      // Scrubbed stages that opt in with data-focus-complete jump to their end state.
      const onFocusIn = (e: FocusEvent) => {
        const target = e.target as Node;
        ScrollTrigger.getAll().forEach((st) => {
          const trigger = st.trigger;
          if (!trigger?.contains(target) || !st.animation || st.animation.progress() === 1) return;
          if (!st.vars.scrub) st.animation.progress(1);
          else if (trigger instanceof HTMLElement && "focusComplete" in trigger.dataset) window.scrollTo({ top: st.end, behavior: "instant" });
        });
      };
      el.addEventListener("focusin", onFocusIn);

      return () => {
        active = false;
        el.removeEventListener("focusin", onFocusIn);
        mm.revert();
      };
    },
    { scope: root },
  );

  // overflow-x: clip hides elements waiting off to the side before their entrance,
  // without creating a scroll container (so position: sticky still works inside).
  return (
    <div ref={root} className="overflow-x-clip">
      {children}
    </div>
  );
}
