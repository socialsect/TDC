"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// All measured from navigation start (performance.now()), not from when React mounts, so the
// bounds hold even when the JavaScript itself is slow to arrive.
const MIN_VISIBLE_MS = 3000; // the preloader stays at least this long before its exit begins
const MAX_WAIT_MS = 6000; // never wait longer than this for loading work, whatever is still pending
const HARD_LIMIT_MS = 8000; // the inline script in layout.tsx removes the overlay by then regardless

/**
 * Full-page logo preloader for the first load of a document.
 *
 * Lifecycle
 * - An inline script in layout.tsx adds `html.preloading` before first paint (never for
 *   reduced-motion users), so the overlay is visible from the first frame without a flash.
 * - The line beneath the logo reflects two measurable tasks: web fonts ready and the page's
 *   `load` event (initial images and styles). It never shows a percentage.
 * - The exit starts once both finish (or MAX_WAIT_MS after navigation start), and never before
 *   MIN_VISIBLE_MS.
 * - Hand-off: `html.preloading` is removed only when the exit animation has fully finished.
 *   MotionRoot watches that class and starts the page hero at that moment, so the hero entrance
 *   never runs behind the overlay or overlaps its exit.
 * - It lives in the root layout, which stays mounted across client-side navigation, so it
 *   runs once per document load — never on internal route changes.
 * - Hard limits if anything fails: the inline script in layout.tsx removes `html.preloading`
 *   HARD_LIMIT_MS after navigation start, and CSS hides the overlay 8s after the stylesheet loads.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el || !root.classList.contains("preloading")) return;

    // Scripts arrived (almost) after the hard limit: the page is being uncovered anyway, just tidy up.
    if (performance.now() >= HARD_LIMIT_MS - 1000) {
      root.classList.remove("preloading");
      return;
    }

    // Scroll lock without touching page overflow (which would shift layout on release):
    // the overlay covers the viewport, so cancelling wheel/touch here is enough.
    const block = (e: Event) => e.preventDefault();
    el.addEventListener("wheel", block, { passive: false });
    el.addEventListener("touchmove", block, { passive: false });

    let cancelled = false;
    const timers: number[] = [];

    const ctx = gsap.context(() => {
      root.classList.add("preloader-ready"); // GSAP owns the start state from here (see CSS)
      const logo = el.querySelector("[data-preloader-logo]");
      const bar = el.querySelector("[data-preloader-bar]");
      const track = el.querySelector("[data-preloader-track]");

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(logo, { autoAlpha: 0, scale: 0.94, clipPath: "inset(100% 0% 0% 0%)" }, { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 })
        .fromTo(track, { autoAlpha: 0, scaleX: 0.6 }, { autoAlpha: 1, scaleX: 1, duration: 0.6 }, 0.35);
      gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });

      // Measurable work, each step advancing the line by an equal share.
      const tasks: Promise<unknown>[] = [
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
      ];
      let done = 0;
      const advance = () => {
        if (cancelled) return;
        done += 1;
        gsap.to(bar, { scaleX: done / tasks.length, duration: 0.5, ease: "power2.out", overwrite: true });
      };
      tasks.forEach((t) => t.then(advance, advance));

      const exit = () => {
        if (cancelled || root.classList.contains("preloader-exiting")) return;
        root.classList.add("preloader-exiting");
        gsap
          .timeline({
            defaults: { ease: "power3.inOut" },
            // Overlay fully gone: removing the class is the hand-off signal for the page hero.
            onComplete: () => root.classList.remove("preloading", "preloader-exiting"),
          })
          .to(bar, { scaleX: 1, duration: 0.25, ease: "power2.out", overwrite: true })
          .to([logo, track], { autoAlpha: 0, y: -16, duration: 0.45, stagger: 0.04 }, 0.15)
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8 }, 0.25);
      };

      const ready = Promise.all(tasks.map((t) => t.catch(() => undefined)));
      const deadline = new Promise((r) => timers.push(window.setTimeout(r, Math.max(0, MAX_WAIT_MS - performance.now()))));
      Promise.race([ready, deadline]).then(() => {
        timers.push(window.setTimeout(exit, Math.max(0, MIN_VISIBLE_MS - performance.now())));
      });
    }, el);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      el.removeEventListener("wheel", block);
      el.removeEventListener("touchmove", block);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className="preloader" role="status" aria-live="polite">
      <span className="sr-only">Loading TDC Dental Clinic</span>
      <div className="flex flex-col items-center gap-10 sm:gap-12">
        <div data-preloader-logo className="preloader-logo">
          <Image src="/brand/tdc-logo-black.png" alt="TDC Dental Clinic" width={544} height={622} preload className="h-36 w-auto sm:h-44 lg:h-48" />
        </div>
        <div data-preloader-track className="preloader-track">
          <span data-preloader-bar className="preloader-bar" />
        </div>
      </div>
    </div>
  );
}
