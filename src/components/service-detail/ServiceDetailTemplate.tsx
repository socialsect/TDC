import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/site";
import type { ServiceDetail } from "@/content/service-details";
import { serviceBySlug, treatmentLeads } from "@/content/services";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";
import { TreatmentJourney } from "@/components/services/TreatmentJourney";
import { WhyChoose } from "@/components/services/WhyChoose";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { BookCta } from "@/components/services/BookCta";

const twoLines = ([a, b]: [string, string]) => [a, <span key="l2" className="font-light italic">{b}</span>];

/**
 * One layout for every treatment page (app/service/[slug]). Only the content from
 * content/service-details.ts changes; the structure and motion stay the same:
 * hero → about → benefits → process → suitability → why TDC → FAQs → related → book.
 *
 * Motion: the hero reuses the Services hero entrance ("services-hero"), process, trust, FAQ and
 * CTA reuse their Services recipes, and the remaining sections use "sd-*" recipes
 * (motion/service-detail-recipes.ts).
 */
export function ServiceDetailTemplate({ service, detail }: { service: Service; detail: ServiceDetail }) {
  return (
    <>
      <Hero service={service} detail={detail} />
      <About detail={detail} />
      <Benefits detail={detail} />
      <TreatmentJourney
        steps={detail.process.steps}
        eyebrow="Treatment process"
        heading={["How treatment", "usually works."]}
        note={detail.process.note}
      />
      <Suitability detail={detail} />
      <WhyChoose />
      {/* ServicesFaq has no top padding of its own (on the Services page it follows a padded section) */}
      <div className="pt-24 lg:pt-36">
        <ServicesFaq items={detail.faqs} eyebrow={`${service.title} FAQs`} heading={["Your questions,", "answered."]} />
      </div>
      <Related slugs={detail.related} />
      <BookCta />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero({ service, detail }: { service: Service; detail: ServiceDetail }) {
  return (
    <section data-motion="services-hero" data-hero aria-labelledby="service-title" className="px-4 pt-6 sm:px-6 lg:px-10 lg:pt-10">
      <div className="mx-auto grid max-w-[84rem] gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-6 lg:pb-10">
          <nav data-hero-item aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="rounded-full underline-offset-4 hover:text-ink hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/our-services" className="rounded-full underline-offset-4 hover:text-ink hover:underline">
                  Our services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {service.title}
              </li>
            </ol>
          </nav>
          <div data-hero-item className="mt-10 lg:mt-16">
            <Eyebrow>{detail.category}</Eyebrow>
          </div>
          <h1
            id="service-title"
            className="mt-6 font-display text-[2.6rem] font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]"
          >
            <MaskLines lines={twoLines(detail.heading)} />
          </h1>
          <p data-hero-item className="mt-7 max-w-[32rem] text-[1.0625rem] leading-relaxed text-muted">
            {detail.intro}
          </p>
          <div data-hero-item className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#book" arrow>
              Book an Appointment
            </ButtonLink>
            <ButtonLink href="#about-treatment" variant="secondary">
              About the treatment
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
                src={detail.image.src}
                alt={detail.image.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                style={detail.image.position ? { objectPosition: detail.image.position } : undefined}
              />
            </div>
          </div>

          {/* The clinic's own description of the treatment, overlapping the photo */}
          <figure
            data-hero-item
            data-hero-card
            className="relative -mt-14 ml-4 mr-10 rounded-[1.75rem] bg-ink p-6 text-paper shadow-lift sm:-mt-20 sm:ml-8 sm:mr-auto sm:max-w-sm lg:absolute lg:-left-12 lg:bottom-10 lg:m-0 lg:p-7"
          >
            <blockquote className="font-display text-lg font-light leading-snug tracking-[-0.01em]">“{detail.clinicLead}”</blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-paper/50">TDC Dental Clinic</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- About */

function About({ detail }: { detail: ServiceDetail }) {
  const [lead, ...rest] = detail.about.paragraphs;
  return (
    <section
      id="about-treatment"
      data-motion="sd-about"
      aria-labelledby="about-treatment-title"
      className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-10 lg:py-36"
    >
      <div className="mx-auto grid max-w-[84rem] gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div data-intro>
            <Eyebrow>About the treatment</Eyebrow>
          </div>
          <h2 id="about-treatment-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl">
            <MaskLines lines={twoLines(detail.about.heading)} />
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
          <p data-about-copy className="font-display text-2xl font-light leading-snug tracking-[-0.01em] sm:text-[1.75rem]">
            {lead}
          </p>
          {rest.map((p) => (
            <p key={p} data-about-copy className="mt-6 max-w-xl leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Benefits */

function Benefits({ detail }: { detail: ServiceDetail }) {
  const cols = detail.benefits.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section data-motion="sd-benefits" aria-labelledby="benefits-title" className="px-3 sm:px-4 lg:px-6">
      <div data-benefits-panel className="mx-auto max-w-[90rem] rounded-[2rem] bg-mist px-5 py-20 sm:px-10 lg:rounded-[3.5rem] lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[80rem]">
          <div data-intro>
            <Eyebrow>Key benefits</Eyebrow>
          </div>
          <h2 id="benefits-title" className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl">
            <MaskLines lines={["What the treatment", <span key="l2" className="font-light italic">can offer.</span>]} />
          </h2>
          <ol className={`mt-14 grid gap-x-8 sm:grid-cols-2 lg:mt-20 ${cols}`}>
            {detail.benefits.map((b, i) => (
              <li key={b.title} data-benefit className="border-t border-ink/15 py-8">
                <span className="font-display text-sm tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.01em] sm:text-2xl">{b.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-muted">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Suitability */

function Suitability({ detail }: { detail: ServiceDetail }) {
  const lists = [
    { title: "You might consider it if", items: detail.suitability.consider },
    { title: "Your assessment will look at", items: detail.suitability.assessment },
  ];
  return (
    <section data-motion="sd-suitability" aria-labelledby="suitability-title" className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-36">
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div data-intro>
            <Eyebrow>Is it right for you?</Eyebrow>
          </div>
          <h2 id="suitability-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl">
            <MaskLines lines={["Suitability starts", <span key="l2" className="font-light italic">with an assessment.</span>]} />
          </h2>
          <p data-intro className="mt-6 max-w-sm leading-relaxed text-muted">
            General guidance only. Whether this treatment suits you is confirmed in person by a qualified dentist, and no result
            can be guaranteed before your teeth have been assessed.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:gap-8">
          {lists.map((list) => (
            <div key={list.title} data-suit-list>
              <h3 className="font-display text-xl font-medium tracking-[-0.01em]">{list.title}</h3>
              <ul className="mt-6 border-t border-line">
                {list.items.map((item) => (
                  <li key={item} data-suit-item className="grid grid-cols-[1.5rem_1fr] gap-2 border-b border-line py-4 leading-relaxed">
                    <span aria-hidden className="mt-[0.7rem] block h-px w-3 bg-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Related */

function Related({ slugs }: { slugs: Service["slug"][] }) {
  return (
    <section data-motion="sd-related" aria-labelledby="related-title" className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
      <div className="mx-auto grid max-w-[84rem] gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div data-intro>
            <Eyebrow>Related treatments</Eyebrow>
          </div>
          <h2 id="related-title" className="mt-6 font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-4xl">
            <MaskLines lines={["Often considered", <span key="l2" className="font-light italic">alongside.</span>]} />
          </h2>
        </div>
        <ul className="border-t border-line lg:col-span-8">
          {slugs.map((slug) => {
            const s = serviceBySlug[slug];
            return (
              <li key={slug} data-related-row className="border-b border-line">
                <Link href={s.href} className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[1fr_auto] sm:items-center lg:py-8">
                  <span>
                    <span className="block font-display text-2xl font-medium tracking-[-0.02em] underline decoration-transparent underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-ink">
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-[34rem] leading-relaxed text-muted">{treatmentLeads[slug]}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    View treatment
                    <ArrowIcon className="size-3.5 transition-[translate] group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
