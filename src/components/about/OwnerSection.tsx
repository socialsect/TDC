import Image from "next/image";
import { owner } from "@/content/about";
import { Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

/**
 * Owner-led section (one owner — not a team grid). Name, role, bio and portrait appear as
 * soon as they are added to `owner` in content/about.ts; until then the section uses a
 * genuine clinic photograph and makes no personal claims.
 */
export function OwnerSection() {
  const photo = owner.photo ?? {
    src: "/images/clinic-treatment-room-3.jpg",
    alt: "A bright treatment room at TDC Dental Clinic with floor-to-ceiling windows",
  };

  return (
    <section id="owner" data-motion="about-owner" aria-labelledby="owner-title" className="px-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-[90rem] rounded-[2rem] bg-mist px-4 py-20 sm:px-8 lg:rounded-[3.5rem] lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[80rem] items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div data-owner-frame className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:rounded-[2.5rem]">
              <div data-owner-image className="absolute inset-0">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover object-[40%_50%]" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div data-owner-item>
              <Eyebrow>Owner-led care</Eyebrow>
            </div>
            <h2 id="owner-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]">
              <MaskLines lines={["One clinic,", <span key="l2" className="font-light italic">one standard of care.</span>]} />
            </h2>

            {owner.name && (
              <p data-owner-item className="mt-8 font-display text-2xl font-medium tracking-[-0.01em]">
                {owner.name}
                {owner.role && <span className="mt-1 block font-sans text-sm font-normal text-muted">{owner.role}</span>}
              </p>
            )}

            <p data-owner-item className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-ink/80">
              {owner.bio ??
                "TDC Dental is an owner-led clinic. The way patients are welcomed, informed and cared for reflects one consistent set of values — comfort, clear communication and treatment plans built around each person."}
            </p>

            <figure data-owner-item className="mt-10 border-l border-ink/20 pl-6">
              <blockquote className="font-display text-2xl font-light leading-snug tracking-[-0.01em] sm:text-[1.75rem]">
                “We don’t just care for teeth — we care for people.”
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">TDC Dental Clinic</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
