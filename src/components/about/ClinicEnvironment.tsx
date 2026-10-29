import Image from "next/image";
import { clinicPhotos } from "@/content/about";
import { Eyebrow } from "@/components/ui/Button";
import { MaskLines } from "@/components/ui/MaskLines";

/**
 * Aligned asymmetric grid — every edge lines up, no offsets:
 *  desktop  feature photo spans both rows on the left; two photos stack on the right and
 *           together match its height exactly (fixed-height two-row grid).
 *  tablet   feature photo full width on top, two equal photos side by side below.
 *  mobile   one column, all 4:3.
 * Frames size from the grid (desktop) or an aspect ratio (smaller), never from offsets.
 */
const layout = [
  { cell: "sm:col-span-2 lg:col-span-7 lg:row-span-2", frame: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto", position: "object-[60%_50%]" },
  { cell: "lg:col-span-5", frame: "aspect-[4/3] lg:aspect-auto", position: "object-center" },
  { cell: "lg:col-span-5", frame: "aspect-[4/3] lg:aspect-auto", position: "object-[35%_50%]" },
];

export function ClinicEnvironment() {
  return (
    <section id="clinic" data-motion="about-clinic" aria-labelledby="clinic-title" className="px-4 py-28 sm:px-6 lg:px-10 lg:py-44">
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-intro>
              <Eyebrow>Our clinic</Eyebrow>
            </div>
            <h2 id="clinic-title" className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
              <MaskLines lines={["Bright, calm spaces", <span key="l2" className="font-light italic">to be cared for in.</span>]} />
            </h2>
          </div>
          <p data-intro className="max-w-md leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Our clinic at Warba Center, Al-Muraqqabat, is designed to feel welcoming from the moment you arrive. These are our
            own rooms — no stock photography.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:h-[clamp(34rem,48vw,44rem)] lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
          {clinicPhotos.map((photo, i) => (
            <figure key={photo.src} data-clinic-photo className={`relative lg:h-full ${layout[i]?.cell ?? ""}`}>
              <div data-clinic-frame className={`relative overflow-hidden rounded-[1.75rem] lg:h-full lg:rounded-[2.5rem] ${layout[i]?.frame ?? "aspect-[4/3]"}`}>
                <div data-clinic-image className="absolute inset-[-6%]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"}
                    className={`object-cover ${layout[i]?.position ?? ""}`}
                  />
                </div>
              </div>
              {/* Caption sits inside the frame so it never adds height or breaks alignment */}
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3.5 py-1.5 text-xs font-medium backdrop-blur lg:bottom-5 lg:left-5">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
