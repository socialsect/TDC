import { clinic, testimonials } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { QuoteIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section id="testimonials" data-motion="testimonials" aria-labelledby="testimonials-title" className="px-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-[90rem] rounded-[2rem] bg-ink px-4 py-20 text-paper sm:px-8 lg:rounded-[3.5rem] lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[80rem]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow inverse>Patient testimonials</Eyebrow>
              <h2 id="testimonials-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
                <MaskLines lines={["In our patients’", <span key="l2" className="font-light italic">own words.</span>]} />
              </h2>
            </div>
            <div data-intro className="flex max-w-sm flex-col items-start gap-6">
              <p className="leading-relaxed text-paper/65">
                Reviews posted by patients on Google. Some longer reviews are shortened; nothing has been reworded.
              </p>
              <ButtonLink href={`${clinic.siteUrl}/testimonials/`} variant="ghost-inverse" arrow>
                More testimonials
              </ButtonLink>
            </div>
          </div>

          <div data-quotes className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
            <figure
              data-featured
              data-featured-body
              className="flex flex-col justify-between rounded-[1.75rem] bg-paper p-8 text-ink lg:col-span-6 lg:row-span-2 lg:rounded-[2.5rem] lg:p-12"
            >
              <QuoteIcon className="h-6 w-8" />
              <blockquote className="mt-10 font-display text-2xl font-light leading-snug tracking-[-0.015em] sm:text-[1.75rem] lg:text-[2rem]">
                {featured.quote}
              </blockquote>
              <Attribution name={featured.author} />
            </figure>

            {rest.map((t, i) => (
              <figure
                key={t.author}
                data-quote
                className={`flex flex-col justify-between rounded-[1.75rem] border border-paper/12 p-7 transition-[background-color,border-color] duration-500 hover:border-paper/25 hover:bg-paper/[0.04] lg:p-8 ${
                  i < 2 ? "lg:col-span-6" : "lg:col-span-4"
                }`}
              >
                <blockquote className="leading-relaxed text-paper/85">“{t.quote}”</blockquote>
                <Attribution name={t.author} inverse />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Attribution({ name, inverse = false }: { name: string; inverse?: boolean }) {
  return (
    <figcaption className="mt-8 flex items-center gap-3">
      <span
        aria-hidden
        className={`grid size-10 place-items-center rounded-full text-xs font-semibold ${inverse ? "bg-paper/10 text-paper" : "bg-ink text-paper"}`}
      >
        {initials(name)}
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-medium">{name}</span>
        <span className={`block text-xs ${inverse ? "text-paper/50" : "text-muted"}`}>Google review</span>
      </span>
    </figcaption>
  );
}
