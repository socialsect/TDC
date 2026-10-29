import { treatmentGroups, serviceBySlug } from "@/content/services";
import { Eyebrow } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

/** In-page navigation: each row jumps to its area-of-care section. */
export function TreatmentIndex() {
  return (
    <section id="treatments" data-motion="svc-index" aria-labelledby="index-title" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div data-intro>
            <Eyebrow>Treatments at a glance</Eyebrow>
          </div>
          <h2 id="index-title" className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            <MaskLines lines={["Find the care", <span key="l2" className="font-light italic">you need.</span>]} />
          </h2>
          <p data-intro className="mt-6 max-w-sm leading-relaxed text-muted">
            Our treatments fall into three areas of care. Choose one to read more, or see every treatment in the directory below.
          </p>
        </div>

        <nav aria-label="Treatment categories" className="lg:col-span-8">
          <ol className="border-t border-line">
            {treatmentGroups.map((g) => (
              <li key={g.id} data-index-row className="border-b border-line">
                <a
                  href={`#${g.id}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-[1.5rem] px-2 py-7 transition-colors duration-300 hover:bg-mist focus-visible:bg-mist sm:gap-8 sm:py-9"
                >
                  <span className="font-display text-sm tabular-nums text-muted">{g.index}</span>
                  <span>
                    <span className="block font-display text-2xl font-medium tracking-[-0.02em] sm:text-[2rem]">{g.kicker}</span>
                    <span className="mt-2 block text-sm text-muted">{g.slugs.map((s) => serviceBySlug[s].title).join(" · ")}</span>
                  </span>
                  <span
                    aria-hidden
                    className="grid size-12 place-items-center rounded-full border border-line transition-[background-color,color,border-color,rotate] duration-500 ease-(--ease-out-soft) group-hover:rotate-90 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                  >
                    <ArrowIcon className="size-4" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
