import Image from "next/image";
import Link from "next/link";
import { bookingHref, clinic, nav, services } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { MaskLines } from "@/components/ui/MaskLines";

const linkClass = "text-paper/65 transition-colors hover:text-paper";

export function Footer() {
  return (
    <footer data-motion="footer" className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
      <div className="mx-auto max-w-[90rem] rounded-[2rem] bg-ink px-6 pb-8 pt-16 text-paper sm:px-10 lg:rounded-[3.5rem] lg:px-14 lg:pt-24">
        {/* CTA band */}
        <div className="flex flex-col gap-10 border-b border-paper/12 pb-14 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]">
            <MaskLines lines={["Ready for a healthier,", <span key="l2" className="font-light italic">brighter smile?</span>]} />
          </h2>
          <div data-intro className="flex flex-wrap gap-3">
            <ButtonLink href={bookingHref} variant="inverse" arrow>
              Request an Appointment
            </ButtonLink>
            <ButtonLink href={clinic.phoneHref} variant="ghost-inverse">
              {clinic.phoneDisplay}
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pt-20">
          <div data-footer-col className="sm:col-span-2 lg:col-span-5 lg:pr-12">
            <a href="#top" className="inline-flex items-center gap-3 rounded-full" aria-label={`${clinic.name} — back to top`}>
              <Image src="/brand/tdc-logo-white.png" alt="" width={544} height={622} className="h-12 w-auto" />
              <span className="font-display text-lg font-medium tracking-tight">
                TDC <span className="font-light">Dental Clinic</span>
              </span>
            </a>
            <p className="mt-6 max-w-md leading-relaxed text-paper/65">
              Exceptional dental care built on trust, compassion and excellence. From your first consultation to your
              final result, we are with you every step of the way.
            </p>
          </div>

          <nav data-footer-col aria-label="Services" className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-paper/45">Services</h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.title}>
                  <Link href={s.href} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav data-footer-col aria-label="Footer" className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-paper/45">Explore</h3>
            <ul className="mt-5 space-y-3">
              {nav.slice(1).map((item) => (
                <li key={item.label}>
                  {"external" in item ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                      {item.label}
                      <ArrowUpRightIcon className="size-3" />
                    </a>
                  ) : (
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div data-footer-col className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-paper/45">Contact</h3>
            <address className="mt-5 space-y-3 not-italic">
              <a href={clinic.mapsHref} target="_blank" rel="noopener noreferrer" className={`${linkClass} block`}>
                {clinic.address}
              </a>
              <a href={clinic.phoneHref} className={`${linkClass} block`}>
                {clinic.phoneDisplay}
              </a>
              <a href={`mailto:${clinic.email}`} className={`${linkClass} block break-all`}>
                {clinic.email}
              </a>
            </address>
            <ul className="mt-6 flex gap-2">
              {clinic.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center rounded-full border border-paper/20 px-4 text-sm transition-colors hover:bg-paper hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/12 pt-8 text-sm text-paper/45 sm:flex-row sm:justify-between">
          <p>
            © <CurrentYear /> {clinic.name}. All rights reserved.
          </p>
          <p>Office 408, Warba Center, Deira, Dubai</p>
        </div>
      </div>
    </footer>
  );
}
