import { journeySteps } from "@/content/services";
import { Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

// "Get in touch" uses the clinic's verified contact channels; the rest is the clinic's described approach.
const steps = [{ title: "Get in touch", body: "Call, WhatsApp or send an enquiry to arrange a consultation." }, ...journeySteps];

/** Horizontal timeline on desktop, vertical list on mobile. */
export function PatientExperience() {
  return (
    <section id="experience" data-motion="about-experience" aria-labelledby="experience-title" className="px-4 pb-28 sm:px-6 lg:px-10 lg:pb-44">
      <div className="mx-auto max-w-[84rem]">
        <div className="max-w-3xl">
          <div data-intro>
            <Eyebrow>The patient experience</Eyebrow>
          </div>
          <h2 id="experience-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
            <MaskLines lines={["What to expect", <span key="l2" className="font-light italic">when you visit.</span>]} />
          </h2>
          <p data-intro className="mt-6 max-w-lg leading-relaxed text-muted">
            Based on how TDC Dental describes its approach to care. Your dentist will explain the steps for your own treatment.
          </p>
        </div>

        <ol data-steps className="relative mt-14 grid gap-10 lg:mt-20 lg:grid-cols-5 lg:gap-8">
          <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block" />
          <span aria-hidden data-steps-line className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-ink lg:block" />
          {steps.map((s, i) => (
            <li key={s.title} data-step className="relative grid grid-cols-[3rem_1fr] gap-5 lg:block">
              <span className="relative z-10 grid size-12 place-items-center rounded-full border border-ink bg-paper font-display text-sm tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-8">
                <h3 className="font-display text-xl font-medium tracking-[-0.01em] lg:text-[1.375rem]">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
