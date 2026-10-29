import Image from "next/image";
import { articles } from "@/content/site";
import { Eyebrow } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { MaskLines } from "@/components/ui/MaskLines";

/** Renders nothing until verified dental articles are added to `articles` in content/site.ts. */
export function Insights() {
  if (articles.length === 0) return null;

  return (
    <section data-motion="insights" aria-labelledby="insights-title" className="px-4 pb-24 sm:px-6 lg:px-10 lg:pb-36">
      <div className="mx-auto max-w-[84rem]">
        <div>
          <Eyebrow>Read our latest news</Eyebrow>
          <h2 id="insights-title" className="mt-6 font-display text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            <MaskLines lines={["Featured news &", <span key="l2" className="font-light italic">insights.</span>]} />
          </h2>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.href} data-card>
              <a href={a.href} className="group block">
                <div data-card-media className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-mist">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-sm text-muted">{a.date}</p>
                <h3 className="mt-2 flex items-start justify-between gap-4 font-display text-xl font-medium tracking-[-0.01em]">
                  {a.title}
                  <ArrowUpRightIcon className="mt-1 size-5 shrink-0 transition-transform group-hover:rotate-45" />
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{a.excerpt}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
