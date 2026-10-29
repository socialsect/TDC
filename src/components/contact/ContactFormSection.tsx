import { clinic } from "@/content/site";
import { Eyebrow } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { MaskLines } from "@/components/ui/MaskLines";
import { EnquiryForm } from "@/components/sections/EnquiryForm";

/**
 * Enquiry form (the same form and Server Action as the homepage) beside the clinic map.
 * The form leads; the map is narrower and secondary.
 */
export function ContactFormSection() {
  return (
    <section id="enquiry" data-motion="contact-form" aria-labelledby="enquiry-title" className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-36">
      <div className="mx-auto max-w-[84rem]">
        <div className="max-w-2xl">
          <div data-intro>
            <Eyebrow>Request an appointment</Eyebrow>
          </div>
          <h2 id="enquiry-title" className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            <MaskLines lines={["Send us a message,", <span key="l2" className="font-light italic">we’ll take it from there.</span>]} />
          </h2>
          <p data-intro className="mt-6 max-w-lg leading-relaxed text-muted">
            Tell us what you need and how to reach you. Please don’t include detailed medical information — we’ll discuss that
            with you in person.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div data-contact-form className="rounded-[2rem] bg-mist p-6 sm:p-10 lg:col-span-7 lg:rounded-[2.75rem] lg:p-12">
            <EnquiryForm />
          </div>

          <div data-contact-map className="flex flex-col lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-mist sm:aspect-[16/10] lg:aspect-auto lg:min-h-[28rem] lg:flex-1 lg:rounded-[2.75rem]">
              <MapEmbed />
            </div>
            <div className="mt-5 flex flex-wrap items-start justify-between gap-x-6 gap-y-2 px-1">
              <p className="max-w-xs text-sm leading-relaxed text-muted">{clinic.address}</p>
              <a
                href={clinic.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-ink/20 underline-offset-[6px] transition-[text-decoration-color] hover:decoration-ink"
              >
                Get directions
                <ArrowUpRightIcon className="size-3.5" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
