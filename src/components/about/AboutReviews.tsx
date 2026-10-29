import { clinic, testimonials } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

/** Three of the verified Google reviews already shown on the homepage, quoted as published. */
export function AboutReviews() {
  return (
    <section id="reviews" data-motion="about-reviews" aria-labelledby="reviews-title" className="px-4 pb-28 sm:px-6 lg:px-10 lg:pb-40">
      <div className="mx-auto max-w-[84rem]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-intro>
              <Eyebrow>Patient reviews</Eyebrow>
            </div>
            <h2 id="reviews-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
              <MaskLines lines={["Kind words", <span key="l2" className="font-light italic">from our patients.</span>]} />
            </h2>
          </div>
          <div data-intro className="flex max-w-sm flex-col items-start gap-5">
            <p className="leading-relaxed text-muted">Reviews posted by patients on Google. Longer reviews are shortened; nothing is reworded.</p>
            <ButtonLink href={`${clinic.siteUrl}/testimonials/`} variant="secondary" arrow>
              More reviews
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-12">
          {testimonials.slice(0, 3).map((t) => (
            <figure key={t.author} data-review className="flex flex-col border-t border-ink pt-8">
              <blockquote className="font-display text-xl font-light leading-snug tracking-[-0.01em]">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium">{t.author}</span>
                <span className="text-muted"> · Google review</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
