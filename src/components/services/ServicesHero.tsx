import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

export function ServicesHero() {
  return (
    <section id="top" data-motion="services-hero" data-hero aria-labelledby="services-title" className="px-4 pt-6 sm:px-6 lg:px-10 lg:pt-10">
      <div className="mx-auto grid max-w-[84rem] gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-6 lg:pb-10 xl:col-span-6">
          <nav data-hero-item aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="rounded-full underline-offset-4 hover:text-ink hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                Our services
              </li>
            </ol>
          </nav>
          <div data-hero-item className="mt-10 lg:mt-16">
            <Eyebrow>TDC Dental services</Eyebrow>
          </div>
          <h1
            id="services-title"
            className="mt-6 font-display text-[2.75rem] font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[5rem]"
          >
            <MaskLines lines={["Dental care,", "planned around", <span key="l3" className="font-light italic">your smile.</span>]} />
          </h1>
          <p data-hero-item className="mt-7 max-w-[32rem] text-[1.0625rem] leading-relaxed text-muted">
            From replacing a missing tooth to designing a complete smile, every treatment at our Deira clinic begins
            with an assessment and a plan explained clearly before anything starts.
          </p>
          <div data-hero-item className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#book" arrow>
              Book an Appointment
            </ButtonLink>
            <ButtonLink href="#treatments" variant="secondary">
              Explore treatments
            </ButtonLink>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div
            data-hero-frame
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[calc(100svh-9rem)] lg:rounded-[2.75rem]"
          >
            <div data-hero-media className="absolute inset-0">
              <Image
                src="/images/clinic-corridor.jpg"
                alt="Waiting area and corridor at TDC Dental Clinic, with the TDC logo on a timber wall"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[35%_50%]"
              />
            </div>
          </div>

          {/* Summary card overlapping the photo */}
          <div
            data-hero-item
            data-hero-card
            className="relative -mt-14 ml-4 mr-10 rounded-[1.75rem] bg-ink p-6 text-paper shadow-lift sm:-mt-20 sm:ml-8 sm:mr-auto sm:max-w-sm lg:absolute lg:-left-12 lg:bottom-10 lg:m-0 lg:p-7"
          >
            <p className="font-display text-5xl font-light leading-none tracking-tight">{String(services.length).padStart(2, "0")}</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/70">
              Treatments across restorative care, cosmetic dentistry and teeth straightening.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
