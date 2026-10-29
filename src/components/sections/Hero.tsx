import Image from "next/image";
import { clinic } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

/** Concave corner that blends the white panel into the photograph. */
function NotchCorner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute size-8 lg:size-11 ${className}`}
      style={{ background: "radial-gradient(circle at 100% 0, transparent 70.5%, var(--color-paper) 71%)" }}
    />
  );
}

export function Hero() {
  return (
    <section id="top" data-motion="hero" data-hero aria-labelledby="hero-title" className="px-3 pt-3 sm:px-4 lg:px-6 lg:pt-4">
      <div data-hero-stage className="relative mx-auto max-w-[90rem]">
        <div data-hero-frame className="relative h-[58svh] min-h-[22rem] overflow-hidden rounded-[2rem] bg-mist sm:h-[62svh] lg:h-[calc(100svh-8rem)] lg:max-h-[54rem] lg:min-h-[38rem] lg:rounded-[2.75rem]">
          <div data-hero-media className="absolute inset-0">
            <Image
              src="/images/clinic-reception.jpg"
              alt="Reception and waiting area at TDC Dental Clinic, with the TDC logo on a timber feature wall"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover object-[62%_50%]"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

          <a
            data-hero-item
            href={clinic.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper/85 px-4 py-2 text-xs font-medium backdrop-blur-md transition-colors hover:bg-paper sm:left-6 sm:top-6 lg:left-auto lg:right-8 lg:top-8"
          >
            <PinIcon className="size-4" />
            Al-Muraqqabat, Deira, Dubai
          </a>
        </div>

        {/* Floating panel: a rounded sheet over the photo's lower edge below lg, notched into its corner from lg up */}
        <div data-hero-panel className="relative -mt-10 rounded-t-[2rem] bg-paper px-4 pt-8 sm:-mt-16 sm:px-8 sm:pt-10 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:w-[min(44rem,56%)] lg:rounded-tl-none lg:rounded-tr-[2.75rem] lg:pl-0 lg:pr-12 lg:pt-12">
          <NotchCorner className="bottom-full left-0 max-lg:hidden" />
          <NotchCorner className="bottom-0 left-full max-lg:hidden" />

          <div>
            <div data-hero-item>
              <Eyebrow>TDC Dental Clinic</Eyebrow>
            </div>
            <h1
              id="hero-title"
              className="mt-5 font-display text-[2.75rem] font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[5.25rem]"
            >
              <MaskLines lines={["Your smile,", <span key="l2" className="font-light italic">our passion.</span>]} />
            </h1>
            <p data-hero-item className="mt-6 max-w-[34rem] text-base leading-relaxed text-muted sm:text-[1.0625rem]">
              Modern, patient-centred dentistry in the heart of Deira. From routine check-ups to complete smile
              transformations, our team makes every visit comfortable, clear and unhurried.
            </p>
            <div data-hero-item className="mt-8 flex flex-wrap items-center gap-3 pb-1">
              <ButtonLink href="#contact" arrow>
                Book an Appointment
              </ButtonLink>
              <ButtonLink href={clinic.whatsappHref} variant="secondary" aria-label="Chat with TDC Dental on WhatsApp (opens in a new tab)">
                <span className="inline-flex items-center gap-2">
                  <WhatsAppIcon className="size-5" />
                  WhatsApp
                </span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
