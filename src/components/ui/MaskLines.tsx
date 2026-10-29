import type { ReactNode } from "react";

/**
 * Renders a heading as explicit lines, each inside an overflow mask, so the motion
 * system can slide lines up from behind the mask without splitting DOM at runtime.
 * Lines still wrap naturally on narrow screens; the mask moves as a block.
 */
export function MaskLines({ lines }: { lines: ReactNode[] }) {
  return lines.map((line, i) => (
    <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em] pr-[0.08em]">
      <span data-line className="block">
        {line}
      </span>
    </span>
  ));
}
