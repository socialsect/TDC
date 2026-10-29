import Image from "next/image";
import { serviceBySlug, treatmentGroups } from "@/content/services";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";
import { TreatmentArt } from "./TreatmentArt";

/**
 * One calm section per area of care: a single image beside one grouped block of text.
 * Individual treatment details live in the directory below and on each treatment's page.
 */
export function FeaturedTreatments() {
  return (
    <div className="space-y-28 px-4 pb-28 sm:px-6 lg:space-y-48 lg:px-10 lg:pb-48">
      {treatmentGroups.map((group, i) => {
        const imageRight = i % 2 === 1;
        return (
          <section
            key={group.id}
            id={group.id}
            data-motion="svc-feature"
            data-side={imageRight ? "right" : "left"}
            aria-labelledby={`${group.id}-title`}
            className="mx-auto grid max-w-[84rem] items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-20"
          >
            <div className={`lg:col-span-6 ${imageRight ? "lg:order-2 lg:col-start-7" : ""}`}>
              <div data-feature-frame className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5] lg:rounded-[2.75rem]">
                <div data-feature-media className="absolute inset-0">
                  {group.visual.kind === "photo" ? (
                    <Image src={group.visual.src} alt={group.visual.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  ) : (
                    <TreatmentArt slug={group.slugs[0]} className="size-full" />
                  )}
                </div>
              </div>
            </div>

            <div data-feature-text className={`lg:col-span-5 ${imageRight ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
              <div data-feature-item>
                <Eyebrow>
                  {group.index} · {group.kicker}
                </Eyebrow>
              </div>
              <h2 id={`${group.id}-title`} className="mt-6 font-display text-4xl font-medium leading-[1.06] tracking-[-0.03em] sm:text-5xl">
                <MaskLines lines={[group.title]} />
              </h2>
              <p data-feature-item className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink/80">
                {group.intro}
              </p>
              <p data-feature-item className="mt-4 max-w-[34rem] leading-relaxed text-muted">
                {group.detail}
              </p>

              <div data-feature-item className="mt-8 border-t border-line pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Treatments</p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                  {group.slugs.map((slug) => (
                    <li key={slug}>
                      <a
                        href={`#treatment-${slug}`}
                        className="group/link inline-flex min-h-11 items-center gap-2 font-medium underline decoration-ink/20 underline-offset-[6px] transition-[text-decoration-color] hover:decoration-ink"
                      >
                        {serviceBySlug[slug].title}
                        <ArrowIcon className="size-3.5 rotate-90 transition-[translate] group-hover/link:translate-y-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div data-feature-item className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#book" arrow>
                  Book a consultation
                </ButtonLink>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
