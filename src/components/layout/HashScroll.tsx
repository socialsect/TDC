"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Where a page opens:
 * - With a hash (e.g. "/#faqs" from another page): at that section. Next.js leaves the new
 *   page at the top after a client-side navigation, so scroll to the target once mounted.
 * - Without a hash: always at the top — after a reload (browser scroll restoration is
 *   switched off in layout.tsx) and after a client-side navigation, where Next.js would
 *   otherwise keep the previous scroll position (e.g. arriving from a footer link).
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const go = () => {
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    go();
    // Once more after layout settles, in case anything restored a position in between.
    const frame = requestAnimationFrame(go);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
