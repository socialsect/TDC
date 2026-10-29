import Image from "next/image";
import { storyParagraphs } from "@/content/about";
import { Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

export function OurStory() {
  return (
    <section id="story" data-motion="about-story" aria-labelledby="story-title" className="px-4 py-28 sm:px-6 lg:px-10 lg:py-44">
      <div className="mx-auto grid max-w-[84rem] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div data-story-frame className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:rounded-[2.75rem]">
            <div data-story-image className="absolute inset-[-6%]">
              <Image
                src="/images/clinic-view-deira.jpg"
                alt="The view over Al-Muraqqabat, Deira, from TDC Dental Clinic"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[30%_50%]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-intro>
            <Eyebrow>Our story</Eyebrow>
          </div>
          <h2 id="story-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
            <MaskLines lines={["Founded with", <span key="l2" className="font-light italic">one mission.</span>]} />
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-[1.0625rem] leading-relaxed text-muted">
            {storyParagraphs.map((p, i) => (
              <p key={i} data-story-copy className={i === 0 ? "text-ink/85" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
