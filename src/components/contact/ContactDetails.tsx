import type { ReactNode } from "react";
import { clinic } from "@/content/site";
import { ArrowUpRightIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";

const link =
  "inline-flex min-h-11 items-center gap-2 font-medium underline decoration-ink/20 underline-offset-[6px] transition-[text-decoration-color] hover:decoration-ink";

/** Four typographic groups separated by hairlines — no cards. Every detail comes from content/site.ts. */
export function ContactDetails() {
  return (
    <section data-motion="contact-info" aria-labelledby="details-title" className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-36">
      <div className="mx-auto max-w-[84rem]">
        <h2 id="details-title" className="sr-only">
          Contact details
        </h2>
        <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          <Group icon={<PinIcon className="size-5" />} title="Visit">
            <address className="not-italic leading-relaxed text-muted">{clinic.address}</address>
            <a href={clinic.mapsHref} target="_blank" rel="noopener noreferrer" className={`${link} mt-3`}>
              Get directions
              <ArrowUpRightIcon className="size-3.5" />
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
          </Group>

          <Group icon={<PhoneIcon className="size-5" />} title="Call">
            <a href={clinic.phoneHref} className={`${link} font-display text-xl`}>
              {clinic.phoneDisplay}
            </a>
            <a href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${link} mt-1 text-muted`}>
              <WhatsAppIcon className="size-4" />
              Message on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Group>

          <Group icon={<MailIcon className="size-5" />} title="Email">
            <a href={`mailto:${clinic.email}`} className={`${link} break-all font-display text-xl`}>
              {clinic.email}
            </a>
            <p className="mt-2 text-sm leading-relaxed text-muted">For general questions and appointment requests.</p>
          </Group>

          <Group icon={<ClockIcon className="size-5" />} title="Opening hours">
            {clinic.openingHours ? (
              <dl className="space-y-1 text-muted">
                {clinic.openingHours.map((h) => (
                  <div key={h.label} className="flex justify-between gap-4">
                    <dt>{h.label}</dt>
                    <dd>{h.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="leading-relaxed text-muted">Please call us to confirm current opening hours before your visit.</p>
            )}
          </Group>
        </div>
      </div>
    </section>
  );
}

function Group({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div data-info-group className="relative pb-10 pt-8 lg:pb-0">
      <span aria-hidden data-info-rule className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
      <div data-info-body>
        <div className="flex items-center gap-3">
          <span aria-hidden className="grid size-10 place-items-center rounded-full bg-mist">
            {icon}
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{title}</h3>
        </div>
        <div className="mt-6 flex flex-col items-start">{children}</div>
      </div>
    </div>
  );
}
