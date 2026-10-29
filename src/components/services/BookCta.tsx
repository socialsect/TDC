import { clinic } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

/**
 * Closing appointment section. There is no online booking system yet, so it offers the
 * clinic's verified channels (phone, WhatsApp) and the homepage enquiry form.
 * Light panel on purpose: the shared footer below is black, so a black CTA here would
 * read as part of the footer.
 */
export function BookCta() {
  return (
    <section id="book" data-motion="svc-cta" aria-labelledby="book-title" className="px-3 pb-24 sm:px-4 lg:px-6 lg:pb-36">
      <div
        data-cta-panel
        className="mx-auto max-w-[90rem] rounded-[2rem] bg-mist px-6 py-20 text-ink sm:px-10 lg:rounded-[3.5rem] lg:px-14 lg:py-28"
      >
        <div className="relative mx-auto grid max-w-[80rem] gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-intro>
              <Eyebrow>Book an appointment</Eyebrow>
            </div>
            <h2 id="book-title" className="mt-6 font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]">
              <MaskLines lines={["Ready to talk about", <span key="l2" className="font-light italic">your smile?</span>]} />
            </h2>
            <p data-intro className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
              Call or message us to arrange a consultation. We’ll assess your smile and talk you through the options before
              any treatment begins.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
            <div data-cta-action>
              <ButtonLink href={clinic.phoneHref} className="w-full sm:w-auto">
                <span className="inline-flex items-center gap-2">
                  <PhoneIcon className="size-[1.125rem]" />
                  Call {clinic.phoneDisplay}
                </span>
              </ButtonLink>
            </div>
            <div data-cta-action>
              <ButtonLink href={clinic.whatsappHref} variant="secondary" className="w-full sm:w-auto" aria-label="Message TDC Dental on WhatsApp (opens in a new tab)">
                <span className="inline-flex items-center gap-2">
                  <WhatsAppIcon className="size-5" />
                  WhatsApp
                </span>
              </ButtonLink>
            </div>
            <div data-cta-action>
              <ButtonLink href="/#location" variant="secondary" arrow className="w-full sm:w-auto">
                Send an enquiry
              </ButtonLink>
            </div>
          </div>
        </div>

        <p data-intro className="relative mx-auto mt-14 max-w-[80rem] border-t border-ink/10 pt-6 text-sm text-muted">
          {clinic.address} ·{" "}
          <a className="-my-3 inline-block py-3 underline-offset-4 hover:text-ink hover:underline" href={`mailto:${clinic.email}`}>
            {clinic.email}
          </a>
        </p>
      </div>
    </section>
  );
}
