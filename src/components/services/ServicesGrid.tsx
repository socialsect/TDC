import Link from "next/link";
import { services } from "@/content/site";
import { treatmentLeads } from "@/content/services";
import { Eyebrow } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

/**
 * Treatment directory: every treatment listed on tdcdental.ae/our-services, one line each,
 * linking to its detail page (app/service/[slug]). Deliberately plain so it scans quickly.
 */
export function ServicesGrid() {
  return (
    <section id="all-treatments" data-motion="svc-grid" aria-labelledby="grid-title" className="px-4 pb-28 sm:px-6 lg:px-10 lg:pb-40">
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div data-intro>
              <Eyebrow>All treatments</Eyebrow>
            </div>
            <h2 id="grid-title" className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              <MaskLines lines={["Every treatment,", <span key="l2" className="font-light italic">in one place.</span>]} />
            </h2>
            <p data-intro className="mt-6 max-w-sm leading-relaxed text-muted">
              Each treatment has its own page with the details. Not sure which is right for you? A consultation is the best
              place to start.
            </p>
          </div>
        </div>

        <ol data-directory className="border-t border-line lg:col-span-8">
          {services.map((s, i) => (
            <li key={s.slug} id={`treatment-${s.slug}`} data-directory-row className="scroll-mt-28 border-b border-line">
              <div className="grid gap-x-8 gap-y-3 py-8 sm:grid-cols-[3rem_1fr_auto] sm:items-start lg:py-10">
                <span className="font-display text-sm tabular-nums text-muted sm:pt-2">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-[1.75rem]">{s.title}</h3>
                  <p className="mt-2 max-w-[34rem] leading-relaxed text-muted">{treatmentLeads[s.slug]}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium sm:flex-col sm:items-end sm:pt-1">
                  <Link
                    href={s.href}
                    className="inline-flex min-h-11 items-center gap-2 underline decoration-ink/20 underline-offset-[6px] transition-[text-decoration-color] hover:decoration-ink"
                  >
                    Learn more
                    <ArrowIcon className="size-3.5" />
                    <span className="sr-only">about {s.title}</span>
                  </Link>
                  <a href="#book" className="group/link inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink">
                    Book
                    <ArrowIcon className="size-3.5 transition-[translate] group-hover/link:translate-x-0.5" />
                    <span className="sr-only">a consultation for {s.title}</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
