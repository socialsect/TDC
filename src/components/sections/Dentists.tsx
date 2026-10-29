import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

const values = ["General care", "Cosmetic dentistry", "Complex restorations"];

export function Dentists() {
  return (
    <section data-motion="dentists" aria-labelledby="dentists-title" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[84rem]">
        <div className="mx-auto max-w-4xl text-center">
          <div data-intro className="flex justify-center">
            <Eyebrow>Working together for a healthy smile</Eyebrow>
          </div>
          <h2 id="dentists-title" className="mt-6 font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.75rem]">
            <MaskLines lines={["Expert & professional", <span key="l2" className="font-light italic">dentists.</span>]} />
          </h2>
        </div>

        {/* Track gives the desktop sequence scroll distance (globals.css); the stage sticks while it plays. */}
        <div data-dentists-track data-focus-complete className="relative mt-14 lg:mt-20">
          <div className="relative lg:sticky lg:top-28">
            <div
              data-dentists-frame
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist sm:aspect-[16/10] lg:aspect-[21/9] lg:rounded-[3.5rem]"
            >
              <Image
                data-dentists-image
                src="/images/clinic-reception.jpg"
                alt="TDC Dental Clinic's bright reception area overlooking Deira"
                fill
                sizes="(min-width: 1344px) 1344px, 100vw"
                className="object-cover object-[30%_60%]"
              />
            </div>

            {/* Black statement panel overlapping the photograph */}
            <div
              data-dentists-panel
              className="relative mx-3 -mt-24 rounded-[1.75rem] bg-ink p-7 text-paper shadow-lift sm:mx-8 sm:p-10 lg:absolute lg:-bottom-12 lg:right-12 lg:mx-0 lg:mt-0 lg:w-[30rem] lg:rounded-[2.5rem] lg:p-12"
            >
              <p className="text-[1.0625rem] leading-relaxed text-paper/75">
                Our dentists provide precise, effective and comfortable treatment. Whether you need general care, a
                cosmetic procedure or a complex restoration, you are in the hands of people who care about your smile
                and your health.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {values.map((v) => (
                  <li key={v} data-chip className="rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/85">
                    {v}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="#contact" variant="inverse" arrow>
                  Book an Appointment
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
