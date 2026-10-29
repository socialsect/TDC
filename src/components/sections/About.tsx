import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

export function About() {
  return (
    <section id="about" data-motion="about" aria-labelledby="about-title" className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-36">
      <div className="mx-auto grid max-w-[84rem] items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-7">
          <div data-about-frame className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-mist lg:rounded-[3rem]">
            <Image
              data-about-image
              src="/images/clinic-treatment-room.jpg"
              alt="A treatment room at TDC Dental Clinic with a modern dental chair and floor-to-ceiling windows"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
          {/* Brand mark tile overlapping the photograph */}
          <div
            data-about-tile
            className="absolute -bottom-8 right-4 grid size-28 place-items-center rounded-[1.75rem] bg-ink shadow-lift sm:size-36 sm:rounded-[2.25rem] lg:-bottom-10 lg:-right-8 lg:size-44"
          >
            <Image src="/brand/tdc-logo-white.png" alt="" width={544} height={622} className="h-[58%] w-auto" />
          </div>
        </div>

        <div data-about-text className="lg:col-span-5 lg:pl-8">
          <div>
            <div data-intro>
              <Eyebrow>About TDC Dental</Eyebrow>
            </div>
            <h2 id="about-title" className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              <MaskLines lines={["Advanced technology.", <span key="l2" className="font-light italic">Expert care.</span>]} />
            </h2>
          </div>
          <div data-about-copy className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-muted">
            <p>
              TDC Dental Clinic was founded with one mission: to provide high-quality, affordable and compassionate
              dental care for families and individuals in the UAE.
            </p>
            <p>
              We combine modern technology with a team of trained professionals who are passionate about oral health,
              in a warm setting where you are treated like part of the family.
            </p>
          </div>
          <div data-about-cta className="mt-10">
            <ButtonLink href="#services" variant="secondary" arrow>
              View All Services
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
