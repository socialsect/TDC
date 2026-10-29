import Link from "next/link";
import { services } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { ArrowUpRightIcon, serviceIcons } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

export function Services() {
  return (
    <section id="services" data-motion="services" aria-labelledby="services-title" className="px-3 sm:px-4 lg:px-6">
      <div data-services-panel className="mx-auto max-w-[90rem] rounded-[2rem] bg-mist px-4 py-20 sm:px-8 lg:rounded-[3.5rem] lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[80rem]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Practice areas &amp; expertise</Eyebrow>
              <h2 id="services-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
                <MaskLines lines={["Treatments planned", <span key="l2" className="font-light italic">around you.</span>]} />
              </h2>
            </div>
            <div className="flex max-w-sm flex-col items-start gap-6">
              <p data-intro className="leading-relaxed text-muted">
                From restoring a single tooth to designing a complete smile, every treatment starts with a careful
                consultation and a plan you understand.
              </p>
              <div data-intro>
                <ButtonLink href="/our-services" variant="secondary" arrow>
                  View All Services
                </ButtonLink>
              </div>
            </div>
          </div>

          <ul data-cards className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.icon];
              const dark = i % 2 === 0;
              return (
                <li key={s.title} data-card className="flex">
                  <Link
                    href={s.href}
                    aria-label={`${s.title} — learn more`}
                    className={`group flex min-h-[19rem] w-full flex-col rounded-[1.75rem] p-7 transition-[translate,box-shadow] duration-500 ease-(--ease-out-soft) hover:-translate-y-1.5 focus-visible:outline-offset-4 lg:min-h-[22rem] lg:rounded-[2.25rem] lg:p-9 ${
                      dark ? "bg-ink text-paper hover:shadow-lift focus-visible:outline-ink" : "bg-paper text-ink shadow-soft hover:shadow-lift"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        data-card-icon
                        className={`grid size-16 place-items-center rounded-[1.25rem] transition-[border-radius,scale] duration-500 ease-(--ease-out-soft) group-hover:scale-105 group-hover:rounded-[2rem] ${
                          dark ? "bg-paper/10" : "bg-mist"
                        }`}
                      >
                        <Icon className="size-8" />
                      </span>
                      <span
                        aria-hidden
                        className={`grid size-11 place-items-center rounded-full border transition-[background-color,color,transform] duration-500 ease-(--ease-out-soft) group-hover:rotate-45 ${
                          dark
                            ? "border-paper/25 group-hover:bg-paper group-hover:text-ink"
                            : "border-ink/15 group-hover:bg-ink group-hover:text-paper"
                        }`}
                      >
                        <ArrowUpRightIcon className="size-4" />
                      </span>
                    </div>
                    <h3 className="mt-auto pt-12 font-display text-[1.625rem] font-medium tracking-[-0.02em]">{s.title}</h3>
                    <p className={`mt-3 leading-relaxed ${dark ? "text-paper/65" : "text-muted"}`}>{s.summary}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
