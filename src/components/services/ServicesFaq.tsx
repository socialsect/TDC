import { serviceFaqs } from "@/content/services";
import { Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

/**
 * Reuses the homepage accordion; motion comes from the Services "svc-faq" recipe. Defaults to
 * the general treatment questions on the Services page; service detail pages pass their own.
 */
export function ServicesFaq({
  items = serviceFaqs,
  eyebrow = "Treatment questions",
  heading = ["Good questions", "to ask first."],
}: {
  items?: readonly { q: string; a: string }[];
  eyebrow?: string;
  heading?: [string, string];
}) {
  return (
    <section id="service-faqs" data-motion="svc-faq" aria-labelledby="service-faq-title" className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-36">
      <div data-faq className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div data-intro>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h2 id="service-faq-title" className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            <MaskLines lines={[heading[0], <span key="l2" className="font-light italic">{heading[1]}</span>]} />
          </h2>
          <p data-intro className="mt-6 max-w-sm leading-relaxed text-muted">
            General information only. Whether a treatment suits you is always confirmed by a qualified dentist after an assessment.
          </p>
        </div>
        <div className="lg:col-span-7">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
