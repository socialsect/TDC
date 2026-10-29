import { principles } from "@/content/about";
import { Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

/** Editorial numbered list — large type, hairline rules, no cards. */
export function Philosophy() {
  return (
    <section id="approach" data-motion="about-approach" aria-labelledby="approach-title" className="px-4 pb-28 sm:px-6 lg:px-10 lg:pb-44">
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-intro>
              <Eyebrow>Our philosophy &amp; commitment</Eyebrow>
            </div>
            <h2 id="approach-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
              <MaskLines lines={["Ethical, personal,", <span key="l2" className="font-light italic">unhurried care.</span>]} />
            </h2>
          </div>
          <p data-intro className="max-w-md text-[1.0625rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Our mission is to provide high-quality, ethical and personalised dental care in a comfortable and friendly
            environment — and to make every visit as stress-free as possible.
          </p>
        </div>

        <ol className="mt-16 lg:mt-24">
          {principles.map((p, i) => (
            <li key={p.title} data-principle className="relative grid gap-3 py-8 sm:grid-cols-12 sm:gap-8 lg:py-10">
              <span aria-hidden data-principle-rule className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
              <span className="font-display text-sm tabular-nums text-muted sm:col-span-1 sm:pt-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] sm:col-span-5 sm:text-[2rem] sm:leading-tight">{p.title}</h3>
              <p className="max-w-lg leading-relaxed text-muted sm:col-span-6 sm:pt-1.5">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
