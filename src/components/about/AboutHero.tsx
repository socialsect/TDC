import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

export function AboutHero() {
  return (
    <section id="top" data-motion="about-hero" data-hero aria-labelledby="about-title" className="px-4 pt-6 sm:px-6 lg:px-10 lg:pt-10">
      <div className="mx-auto max-w-[84rem]">
        <nav data-hero-item aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="rounded-full underline-offset-4 hover:text-ink hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              About us
            </li>
          </ol>
        </nav>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 lg:pt-10">
            <div data-hero-item>
              <Eyebrow>About TDC Dental</Eyebrow>
            </div>
            <h1 id="about-title" className="mt-6 font-display text-[2.75rem] font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[5rem]">
              <MaskLines lines={["A calm, modern clinic", <span key="l2" className="font-light italic">in the heart of Deira.</span>]} />
            </h1>
            <p data-hero-item className="mt-8 max-w-[32rem] text-[1.0625rem] leading-relaxed text-muted">
              High-quality, affordable and compassionate dental care for families and individuals in the UAE — in a comfortable,
              friendly setting where every patient is treated like part of the family.
            </p>
            <div data-hero-item className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact-us#enquiry" arrow>
                Book an Appointment
              </ButtonLink>
              <ButtonLink href="#approach" variant="secondary">
                Explore our approach
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              data-hero-frame
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[calc(100svh-9rem)] lg:rounded-[2.75rem]"
            >
              <div data-hero-media className="absolute inset-0">
                <Image
                  src="/images/clinic-treatment-room-2.jpg"
                  alt="A treatment room at TDC Dental Clinic with a dental chair and soft linear lighting"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[45%_50%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
