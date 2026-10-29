import { journeySteps } from "@/content/services";
import { Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

type Step = { title: string; body: string };

/**
 * Numbered steps with a scroll-linked progress line ("svc-journey" recipe). Defaults to the
 * clinic's general approach on the Services page; service detail pages pass their own steps.
 */
export function TreatmentJourney({
  steps = journeySteps,
  eyebrow = "What to expect",
  heading = ["How your treatment", "is planned."],
  note = "Based on how TDC Dental describes its approach to care. Your dentist will explain the exact steps for your treatment.",
}: {
  steps?: readonly Step[];
  eyebrow?: string;
  heading?: [string, string];
  note?: string;
}) {
  return (
    <section data-motion="svc-journey" aria-labelledby="journey-title" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div data-intro>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h2 id="journey-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl">
              <MaskLines lines={[heading[0], <span key="l2" className="font-light italic">{heading[1]}</span>]} />
            </h2>
            <p data-intro className="mt-6 max-w-sm leading-relaxed text-muted">
              {note}
            </p>
          </div>
        </div>

        <ol data-journey className="relative lg:col-span-6 lg:col-start-7">
          {/* Track + scroll-linked progress line */}
          <span aria-hidden className="absolute bottom-6 left-[1.4375rem] top-6 w-px bg-line" />
          <span aria-hidden data-journey-line className="absolute bottom-6 left-[1.4375rem] top-6 w-px origin-top bg-ink" />
          {steps.map((step, i) => (
            <li key={step.title} data-journey-step className="relative grid grid-cols-[3rem_1fr] gap-6 pb-14 last:pb-0">
              <span
                data-journey-dot
                className="relative z-10 grid size-12 place-items-center rounded-full border border-ink bg-paper font-display text-sm tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-2">
                <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
