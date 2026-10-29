import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { HashScroll } from "./HashScroll";
import { MotionRoot } from "@/components/motion/MotionRoot";

/** Shared page frame: skip link, header, page content and footer inside the motion boundary. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <MotionRoot>
        <main id="main">{children}</main>
        <Footer />
      </MotionRoot>
      <HashScroll />
    </>
  );
}
