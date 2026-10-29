import type { Service } from "@/content/site";
import { serviceIcons } from "@/components/ui/icons";

const icons: Record<Service["slug"], (typeof serviceIcons)[keyof typeof serviceIcons]> = {
  implants: serviceIcons.implant,
  restorative: serviceIcons.restore,
  veneers: serviceIcons.veneer,
  "hollywood-smile": serviceIcons.smile,
  whitening: serviceIcons.whiten,
  "invisible-braces": serviceIcons.aligner,
};

/**
 * Quiet placeholder visual for a treatment without genuine TDC photography: a light panel
 * with a single line icon. Purely decorative; replace with real photography when available.
 */
export function TreatmentArt({ slug, className = "" }: { slug: Service["slug"]; className?: string }) {
  const Icon = icons[slug];
  return (
    <div aria-hidden className={`grid place-items-center bg-mist ${className}`}>
      <span className="grid size-28 place-items-center rounded-full bg-paper sm:size-36">
        <Icon className="size-12 sm:size-16" />
      </span>
    </div>
  );
}
