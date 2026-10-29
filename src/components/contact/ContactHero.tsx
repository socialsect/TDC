import Link from "next/link";
import { clinic } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

/** Typographic hero: no imagery, the headline and actions carry the section. */
export function ContactHero() {
  return (
    <section id="top" data-motion="contact-hero" data-hero aria-labelledby="contact-title" className="px-4 pb-20 pt-6 sm:px-6 lg:px-10 lg:pb-28 lg:pt-10">
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
              Contact us
            </li>
          </ol>
        </nav>

        <div className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <div data-hero-item>
              <Eyebrow>Contact TDC Dental</Eyebrow>
            </div>
            <h1 id="contact-title" className="mt-6 font-display text-[2.75rem] font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[5.5rem]">
              <MaskLines lines={["Let’s talk about", <span key="l2" className="font-light italic">your smile.</span>]} />
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-3">
            <p data-hero-item className="max-w-md text-[1.0625rem] leading-relaxed text-muted">
              Questions about a treatment, or ready to book a consultation? Send us a message, call or WhatsApp — our team
              will help you find a time that suits you.
            </p>
            <div data-hero-item className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#enquiry" arrow>
                Book an Appointment
              </ButtonLink>
              <ButtonLink href={clinic.phoneHref} variant="secondary">
                <span className="inline-flex items-center gap-2">
                  <PhoneIcon className="size-[1.125rem]" />
                  Call us
                </span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
