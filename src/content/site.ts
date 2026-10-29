/**
 * Single source of truth for homepage content.
 *
 * Every fact here was taken from https://tdcdental.ae/ (checked 29 Oct 2026).
 * Do not add phone numbers, hours, credentials, statistics, reviews or articles
 * that cannot be traced to the clinic. See README "Content dependencies".
 */

const LIVE_SITE = "https://tdcdental.ae";

export const clinic = {
  name: "TDC Dental Clinic",
  shortName: "TDC Dental",
  siteUrl: LIVE_SITE,
  address: "Office 408, Warba Center, Al-Muraqqabat, Deira, Dubai",
  email: "Info@tdcdental.ae",
  phoneDisplay: "+971 4 881 0034",
  phoneHref: "tel:+97148810034",
  // Same number the live site uses for its WhatsApp button.
  whatsappHref: "https://api.whatsapp.com/send?phone=%2B97148810034",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("TDC Dental Clinic, Warba Center, Al-Muraqqabat, Deira, Dubai"),
  /**
   * The live site publishes three conflicting schedules
   * ("Every day 1–10 PM, Wednesday closed", "Mon–Sat 1–10 PM", "Mon–Sat 7 AM–7 PM").
   * Leave this null until the clinic confirms; the UI then asks patients to call.
   */
  openingHours: null as null | { label: string; value: string }[],
  social: [{ label: "Facebook", href: "https://www.facebook.com/tdc.uae/" }],
} as const;

/** Path-qualified so every link works from any page; "/#…" targets are homepage sections. */
export const nav = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/our-services" },
  { label: "Smile Gallery", href: `${LIVE_SITE}/smile-gallery/`, external: true },
  { label: "FAQs", href: "/#faqs" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

/** Where every "Book an Appointment" action on other pages leads: the homepage contact panel (call / WhatsApp). */
export const bookingHref = "/#contact";

export const pillars = [
  {
    title: "Our Commitment",
    body: "Care built on trust, compassion and respect. Every patient receives personal attention, and we keep investing in modern equipment, ongoing training and a calm environment so each visit feels comfortable.",
    tone: "dark",
    icon: "shield",
  },
  {
    title: "Why Choose Us?",
    body: "We go beyond routine check-ups. Modern technology meets a warm, welcoming atmosphere, so treatment is precise, comfortable and explained clearly before anything begins.",
    tone: "light",
    icon: "spark",
  },
  {
    title: "Our Doctors",
    body: "Our dentists are qualified professionals across the fields of modern dentistry, chosen for their clinical skill and for how carefully they look after people in the chair.",
    tone: "dark",
    icon: "people",
  },
] as const;

export type Service = {
  slug: "implants" | "restorative" | "veneers" | "hollywood-smile" | "whitening" | "invisible-braces";
  title: string;
  summary: string;
  /** Detail page path, same as the live site (tdcdental.ae/service/…) so existing links carry over. */
  href: `/service/${string}`;
  icon: "implant" | "restore" | "veneer" | "smile" | "whiten" | "aligner";
};

/** The six treatments the clinic lists on tdcdental.ae/our-services/. Each has a detail page (app/service/[slug]). */
export const services: Service[] = [
  {
    slug: "implants",
    title: "Dental Implants",
    summary: "A fixed, natural-looking replacement for missing teeth, planned around your bite and bone health.",
    href: "/service/dental-implants",
    icon: "implant",
  },
  {
    slug: "restorative",
    title: "Restorative Dentistry",
    summary: "Fillings, crowns and bridges that repair damaged teeth and bring back comfortable everyday function.",
    href: "/service/restorative-dentistry",
    icon: "restore",
  },
  {
    slug: "veneers",
    title: "Porcelain Veneers",
    summary: "Thin porcelain shells that refine the shape, shade and alignment of visible front teeth.",
    href: "/service/porcelain-veneers",
    icon: "veneer",
  },
  {
    slug: "hollywood-smile",
    title: "Hollywood Smile",
    summary: "A complete cosmetic smile design, planned with you from first consultation to final fitting.",
    href: "/service/hollywood-smile",
    icon: "smile",
  },
  {
    slug: "whitening",
    title: "Teeth Whitening",
    summary: "Professional whitening under dental supervision for a brighter, even shade.",
    href: "/service/teeth-whitening",
    icon: "whiten",
  },
  {
    slug: "invisible-braces",
    title: "Invisible Braces",
    summary: "Clear aligners that gradually straighten teeth with minimal impact on how you look day to day.",
    href: "/service/invisible-braces",
    icon: "aligner",
  },
];

/**
 * Options for the enquiry form's treatment select. "Check-up & cleaning" is included
 * because patients' Google reviews describe cleaning appointments at the clinic.
 */
export const enquiryServices: readonly string[] = [
  "Check-up & cleaning",
  ...services.map((s) => s.title),
  "Other / not sure yet",
];

/** Google Maps embed for the clinic listing (supplied by the clinic). */
export const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0445226701227!2d55.32742827538411!3d25.269087677664757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f435bf68c34db%3A0xceee29a963b96d71!2sTDC%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1793272211181!5m2!1sen!2sin";

/**
 * Google reviews as shown (via Trustindex) on the live homepage, quoted verbatim.
 * Ratings and the total review count are omitted because they change over time
 * and were not independently verified.
 */
export const testimonials = [
  {
    author: "Yaroslav Kozlov",
    quote:
      "Had an appointment today and I’m fully satisfied. The clinic is top-level — clean, modern, and welcoming. The doctor is a true professional: clear, respectful, and attentive. Service was perfect, and you can really feel they care about patients. …",
  },
  {
    author: "Raghu Koosam",
    quote:
      "I had a great experience at TDC Dental Clinic for my teeth cleaning and polishing. The staff were welcoming, and the dentist was professional and gentle throughout the procedure. The clinic was clean and modern, and everything was explained clearly before starting. …",
  },
  {
    author: "Amr Samy",
    quote:
      "Thanks for TDC Clinic for the perfect treatment. Starting from the Reception you feel yourself as at home, where everyone care about your comfort. The team is great. I highly recommend TDC for everyone looking for GREAT care.",
  },
  {
    author: "Nahla Zidan",
    quote: "Amazing experience. Great doctors and staff",
  },
  {
    author: "Shorouk Mokhtar",
    quote: "Great service and very professional staff",
  },
  {
    author: "Ahmed Samir",
    quote: "Amazing service and very satisfying results",
  },
] as const;

export const faqs = [
  {
    q: "How often should I visit the dentist?",
    a: "Most people benefit from a check-up and professional cleaning every six months, unless your dentist recommends a different schedule.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: `Call the clinic straight away on ${clinic.phoneDisplay}. Our team will advise you on the next steps and arrange care as quickly as possible.`,
  },
  {
    q: "Do you accept insurance or offer payment plans?",
    a: "We accept many insurance providers and offer flexible payment plans for uninsured patients. Contact us with your provider details and we will confirm your cover.",
  },
  {
    q: "Is teeth whitening safe, and how long does it last?",
    a: "Professional whitening is safe when carried out under dental supervision. Results typically last from six months to two years, depending on habits such as coffee, tea and smoking.",
  },
  {
    q: "What are the options for replacing missing teeth?",
    a: "Common options include dental implants, bridges and dentures. The right choice depends on your oral health and preferences, which your dentist will discuss with you.",
  },
] as const;

/**
 * Featured News and Insights.
 * The live homepage only shows unrelated template posts (whales, kidney disease,
 * sickle cell, blood pressure). The section stays hidden until real dental
 * articles are supplied.
 */
export const articles: {
  title: string;
  excerpt: string;
  href: string;
  image: string;
  imageAlt: string;
  date: string;
}[] = [];
