import { mapEmbedSrc } from "@/content/site";

/**
 * The clinic's Google Maps embed. Fills its (positioned, fixed-proportion) parent so the
 * lazy-loaded iframe never shifts layout; lightly desaturated to sit in the monochrome UI.
 * Note: once keyboard focus moves into the (cross-origin) map, Chrome matches no focus
 * pseudo-class on the iframe or its ancestors, so focus is shown by Google's own controls.
 */
export function MapEmbed() {
  return (
    <iframe
      src={mapEmbedSrc}
      title="Map showing TDC Dental Clinic at Warba Center, Al-Muraqqabat, Deira, Dubai"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="absolute inset-0 size-full border-0 grayscale-[0.85] contrast-[1.05] transition-[filter] duration-500 hover:grayscale-0 focus-visible:grayscale-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink"
    />
  );
}
