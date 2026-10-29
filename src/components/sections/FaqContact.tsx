import type { ReactNode } from "react";
import { clinic, faqs } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { FaqAccordion } from "./FaqAccordion";
import { MaskLines } from "@/components/ui/MaskLines";

export function FaqContact() {
  return (
    <section data-motion="faq" aria-label="FAQs and contact" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[84rem] gap-14 lg:grid-cols-12 lg:gap-10">
        <div id="faqs" data-faq className="lg:col-span-6 xl:col-span-7 xl:pr-10">
          <div>
            <div data-intro>
              <Eyebrow>Common questions</Eyebrow>
            </div>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              <MaskLines lines={["Answers before", <span key="l2" className="font-light italic">you ask.</span>]} />
            </h2>
          </div>
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </div>

        <aside
          id="contact"
          aria-labelledby="contact-title"
          data-contact
          className="self-start rounded-[2rem] bg-ink p-7 text-paper sm:p-10 lg:sticky lg:top-32 lg:col-span-6 lg:rounded-[2.75rem] lg:p-12 xl:col-span-5"
        >
          <div data-contact-head>
            <Eyebrow inverse>Book an appointment</Eyebrow>
            <h2 id="contact-title" className="mt-6 font-display text-3xl font-medium leading-[1.08] tracking-[-0.025em] sm:text-4xl">
              Didn’t find your answer? Talk to us.
            </h2>
            <p className="mt-4 leading-relaxed text-paper/65">
              Call or message us on WhatsApp to book a visit or ask about a treatment.
            </p>
          </div>

          <div data-contact-row className="mt-8 grid gap-3 sm:grid-cols-2">
            <ButtonLink href={clinic.phoneHref} variant="inverse">
              <span className="inline-flex items-center gap-2">
                <PhoneIcon className="size-[1.125rem]" />
                Call now
              </span>
            </ButtonLink>
            <ButtonLink href={clinic.whatsappHref} variant="ghost-inverse" aria-label="Chat on WhatsApp (opens in a new tab)">
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon className="size-5" />
                WhatsApp
              </span>
            </ButtonLink>
          </div>

          <dl className="mt-10 divide-y divide-paper/12 border-t border-paper/12">
            <Detail icon={<PinIcon className="size-5" />} label="Address">
              <a href={clinic.mapsHref} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                {clinic.address}
              </a>
            </Detail>
            <Detail icon={<PhoneIcon className="size-5" />} label="Phone">
              <a href={clinic.phoneHref} className="underline-offset-4 hover:underline">
                {clinic.phoneDisplay}
              </a>
            </Detail>
            <Detail icon={<MailIcon className="size-5" />} label="Email">
              <a href={`mailto:${clinic.email}`} className="underline-offset-4 hover:underline">
                {clinic.email}
              </a>
            </Detail>
            <Detail icon={<ClockIcon className="size-5" />} label="Opening hours">
              {clinic.openingHours ? (
                clinic.openingHours.map((h) => (
                  <span key={h.label} className="block">
                    {h.label}: {h.value}
                  </span>
                ))
              ) : (
                <span className="text-paper/75">Please call to confirm current opening hours.</span>
              )}
            </Detail>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div data-contact-row className="flex gap-4 py-5">
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-paper/10">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-[0.18em] text-paper/45">{label}</dt>
        <dd className="mt-1.5 break-words leading-relaxed">{children}</dd>
      </div>
    </div>
  );
}
