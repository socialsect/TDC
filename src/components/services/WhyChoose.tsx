import { trustPoints } from "@/content/services";
import { Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

/** Text-led trust section: the clinic's own words on one side, its five stated commitments on the other. */
export function WhyChoose() {
  return (
    <section data-motion="svc-trust" aria-labelledby="trust-title" className="px-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-[90rem] rounded-[2rem] bg-ink px-5 py-20 text-paper sm:px-10 lg:rounded-[3.5rem] lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[80rem] gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div data-intro>
              <Eyebrow inverse>Why choose TDC Dental</Eyebrow>
            </div>
            <h2 id="trust-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl">
              <MaskLines lines={["Honest advice,", <span key="l2" className="font-light italic">careful treatment.</span>]} />
            </h2>
            <p data-intro className="mt-6 max-w-md leading-relaxed text-paper/65">
              Dental visits can be stressful, so we keep the atmosphere comfortable, communicate clearly and build every plan
              around your needs.
            </p>
            {/* From the clinic's About page */}
            <figure data-intro className="mt-12 border-t border-paper/15 pt-8">
              <blockquote className="font-display text-2xl font-light leading-snug tracking-[-0.01em]">
                “We don’t just care for teeth — we care for people.”
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-paper/45">TDC Dental Clinic</figcaption>
            </figure>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {trustPoints.map((p, i) => (
              <li key={p.title} data-trust-point className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-paper/15 py-7 last:border-b">
                <span className="pt-1 font-display text-sm tabular-nums text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-[-0.01em]">{p.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-paper/65">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
