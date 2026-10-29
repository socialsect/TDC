"use client";

import { useId, useState } from "react";
import { PlusIcon } from "@/components/ui/icons";

type Item = { q: string; a: string };

/** Single-open accordion. Content stays in the DOM so it is searchable and readable without JS. */
export function FaqAccordion({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li key={item.q} data-faq-item>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full items-center justify-between gap-6 rounded-2xl py-6 text-left font-display text-lg font-medium tracking-[-0.01em] sm:text-xl"
              >
                {item.q}
                <span
                  aria-hidden
                  className={`grid size-10 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color,transform] duration-500 ease-(--ease-out-soft) ${
                    expanded ? "rotate-45 border-ink bg-ink text-paper" : "border-line group-hover:border-ink"
                  }`}
                >
                  <PlusIcon className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!expanded}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out-soft) ${
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-xl pb-7 pr-14 leading-relaxed text-muted transition-[translate] duration-500 ease-(--ease-out-soft) ${
                    expanded ? "translate-y-0" : "-translate-y-3"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
