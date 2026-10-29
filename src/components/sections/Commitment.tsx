import { pillars } from "@/content/site";
import { Eyebrow } from "@/components/ui/Button";
import { pillarIcons } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

export function Commitment() {
  return (
    <section data-motion="commitment" aria-labelledby="commitment-title" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Trusted dental care in the UAE</Eyebrow>
            <h2 id="commitment-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
              <MaskLines
                lines={[
                  "We care for teeth — and for",
                  <span key="l2">
                    <span className="font-light italic">the people</span> they belong to.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <p data-intro className="max-w-md text-[1.0625rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Our values are trust, transparency and complete oral health. Dental visits can feel stressful, so we keep
            the atmosphere calm, explain every step and build treatment plans around your needs.
          </p>
        </div>

        <ul data-cards className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-6">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[p.icon];
            const dark = p.tone === "dark";
            return (
              <li
                key={p.title}
                data-card
                className={`group relative flex flex-col rounded-[2rem] p-8 transition-[translate,box-shadow] duration-500 ease-(--ease-out-soft) hover:-translate-y-1.5 lg:min-h-[26rem] lg:rounded-[2.5rem] lg:p-10 ${
                  dark ? "bg-ink text-paper hover:shadow-lift" : "bg-mist text-ink hover:shadow-soft"
                } ${i === 1 ? "md:translate-y-10 md:hover:translate-y-8.5" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    data-card-icon
                    className={`grid size-14 place-items-center rounded-full ${dark ? "bg-paper/10" : "bg-paper"} transition-[rotate] duration-500 ease-(--ease-out-soft) group-hover:rotate-[-8deg]`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span aria-hidden className={`font-display text-sm tabular-nums ${dark ? "text-paper/40" : "text-ink/35"}`}>
                    0{i + 1}
                  </span>
                </div>
                <h3 data-card-text className="mt-auto pt-16 font-display text-2xl font-medium tracking-[-0.02em] lg:text-[1.75rem]">{p.title}</h3>
                <p data-card-text className={`mt-4 leading-relaxed ${dark ? "text-paper/70" : "text-muted"}`}>{p.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
