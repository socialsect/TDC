"use client";

import { useEffect, useRef } from "react";

/** Pointer hotspot inside the 30px cursor: the tooth's upper-left tip. Keep in sync with globals.css. */
const HOTSPOT = { x: 6, y: 6 };
const INTERACTIVE = 'a[href], button:not(:disabled), [role="button"], select, label[for], summary';
const TEXT_ENTRY =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="range"]), textarea, [contenteditable="true"]';

/**
 * Global molar-tooth cursor (fine pointers with hover only — touch devices keep native behaviour).
 *
 * - Position is written straight to a transform on each pointermove: no React state, no
 *   re-renders, no easing lag.
 * - pointer-events: none, so it never intercepts clicks; keyboard focus is untouched.
 * - Over text fields and embedded iframes (the map) the native cursor is used instead.
 * - If JavaScript never runs, the `tooth-cursor` class is never added and the native cursor stays.
 */
export function ToothCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const setState = (target: EventTarget | null) => {
      const t = target instanceof Element ? target : null;
      el.dataset.state = !t ? "default" : t.closest("iframe") || t.closest(TEXT_ENTRY) ? "native" : t.closest(INTERACTIVE) ? "hover" : "default";
    };
    // Cross-origin iframes (the map) take over the pointer completely: the page gets no further
    // events once the pointer is inside, so the tooth would freeze at the edge. Within EDGE px of
    // an iframe, hand over to the native cursor (html.tooth-cursor-native) so the switch happens
    // before the pointer crosses in, and there is never a moment with no cursor at all.
    const EDGE = 48;
    const nearIframe = (x: number, y: number) =>
      [...document.getElementsByTagName("iframe")].some((f) => {
        const r = f.getBoundingClientRect();
        return r.width > 0 && x > r.left - EDGE && x < r.right + EDGE && y > r.top - EDGE && y < r.bottom + EDGE;
      });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      el.style.transform = `translate3d(${e.clientX - HOTSPOT.x}px, ${e.clientY - HOTSPOT.y}px, 0)`;
      setState(e.target);
      const near = nearIframe(e.clientX, e.clientY);
      root.classList.toggle("tooth-cursor-native", near);
      if (near) el.dataset.state = "native";
      el.dataset.visible = "true";
    };
    const onOver = (e: PointerEvent) => e.pointerType !== "touch" && setState(e.target);
    // Entering a (cross-origin) iframe: the page receives no further moves, so hide the tooth
    // as the pointer crosses into it and let the iframe show its own native cursor.
    const onOut = (e: PointerEvent) => {
      if (e.relatedTarget instanceof Element && e.relatedTarget.closest("iframe")) el.dataset.state = "native";
    };
    const onDown = () => (el.dataset.pressed = "true");
    const onUp = () => (el.dataset.pressed = "false");
    const onLeave = () => (el.dataset.visible = "false");

    // Capture phase: runs before any handler on the page can stop propagation (some
    // pointer events around the map iframe never bubble back up to window).
    const opts = { passive: true, capture: true } as const;
    const enable = () => {
      root.classList.add("tooth-cursor");
      window.addEventListener("pointermove", onMove, opts);
      window.addEventListener("pointerover", onOver, opts);
      window.addEventListener("pointerout", onOut, opts);
      window.addEventListener("pointerdown", onDown, opts);
      window.addEventListener("pointerup", onUp, opts);
      root.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    };
    const disable = () => {
      root.classList.remove("tooth-cursor", "tooth-cursor-native");
      window.removeEventListener("pointermove", onMove, opts);
      window.removeEventListener("pointerover", onOver, opts);
      window.removeEventListener("pointerout", onOut, opts);
      window.removeEventListener("pointerdown", onDown, opts);
      window.removeEventListener("pointerup", onUp, opts);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      el.dataset.visible = "false";
    };
    const sync = () => (fine.matches ? enable() : disable());

    sync();
    fine.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      disable();
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="tooth-cursor-el" data-visible="false" data-state="default" data-pressed="false">
      <span />
    </div>
  );
}
