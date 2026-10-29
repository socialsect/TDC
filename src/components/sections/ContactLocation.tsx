import { clinic } from "@/content/site";
import { Eyebrow } from "@/components/ui/Button";
import { ArrowUpRightIcon, PinIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { EnquiryForm } from "./EnquiryForm";

export function ContactLocation() {
  return (
    <section id="location" data-motion="location" aria-labelledby="location-title" className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-36">
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-intro>
              <Eyebrow>Contact &amp; location</Eyebrow>
            </div>
            <h2 id="location-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
              <MaskLines lines={["Visit us in Deira,", <span key="l2" className="font-light italic">or write to us first.</span>]} />
            </h2>
          </div>
          <p data-intro className="max-w-md text-[1.0625rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Questions about a treatment, or ready to book? Send us a note and our team will get back to you. You’ll find us
            on the fourth floor of Warba Center.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <div data-location-form className="relative rounded-[2rem] bg-mist p-6 sm:p-10 lg:col-span-7 lg:rounded-[2.75rem] lg:p-12">
            <EnquiryForm />
          </div>

          <div data-location-map className="relative flex flex-col gap-4 lg:col-span-5">
            {/* Address card comes first in the DOM so "Get directions" is reached before the map's own
                controls when tabbing. Visually: below the map on mobile, floating over its lower edge on desktop. */}
            <div
              data-location-card
              className="flex items-start gap-4 rounded-[1.75rem] bg-ink p-5 text-paper max-lg:order-last sm:p-6 lg:absolute lg:inset-x-4 lg:bottom-4 lg:z-10 lg:rounded-[2rem] lg:shadow-lift"
            >
              <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-paper/10">
                <PinIcon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-medium leading-snug">{clinic.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-paper/70">{clinic.address}</p>
                <a
                  href={clinic.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-paper/25 px-4 text-sm transition-colors hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
                >
                  Get directions
                  <ArrowUpRightIcon className="size-3.5" />
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
              </div>
            </div>

            {/* Fixed proportions (and a min height on desktop) reserve space, so the lazy iframe never shifts layout */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-mist sm:aspect-[16/10] lg:aspect-auto lg:min-h-[34rem] lg:flex-1 lg:rounded-[2.75rem]">
              <div data-location-map-inner className="absolute inset-0">
                <MapEmbed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
