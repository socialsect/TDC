/**
 * Services page content.
 *
 * Sources (checked 29 Oct 2026): the six treatment pages under tdcdental.ae/service/…,
 * tdcdental.ae/about-us/, /smile-gallery/ and /faqs/. Copy is reworded for clarity but
 * makes no claim the clinic does not make. Outcome promises on the live site (e.g. a
 * fixed number of whitening shades) are deliberately left out.
 */
import { clinic, services, type Service } from "./site";

type Slug = Service["slug"];

/**
 * One-sentence description per treatment for the directory. Full explanations live on
 * each treatment's page on tdcdental.ae, which the directory links to.
 */
export const treatmentLeads: Record<Slug, string> = {
  implants: "A permanent way to replace missing teeth without affecting the neighbouring teeth.",
  restorative: "Modern prosthetics for teeth too damaged to rebuild with fillings, or for missing teeth.",
  veneers: "A very thin layer of porcelain that refines the shape, size, colour and symmetry of your teeth.",
  "hollywood-smile": "A complete smile makeover with zirconia or e.max veneers, designed around your features.",
  whitening: "Professional, laser-assisted whitening carried out in the clinic under dental supervision.",
  "invisible-braces": "Clear braces made to fit your mouth, correcting irregularities without metal brackets.",
};

/** One featured section per area of care. */
export const treatmentGroups: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  intro: string;
  detail: string;
  slugs: Slug[];
  visual: { kind: "photo"; src: string; alt: string } | { kind: "art" };
}[] = [
  {
    id: "restore",
    index: "01",
    kicker: "Restorative care",
    title: "Bring back a strong, comfortable bite.",
    intro: "When a tooth is missing, or too damaged to repair with a filling, treatment focuses on restoring chewing, speech and the look of your smile.",
    detail: "Implants replace missing teeth without affecting their neighbours, and can also anchor a fixed bridge or denture.",
    slugs: ["implants", "restorative"],
    visual: {
      kind: "photo",
      src: "/images/clinic-treatment-room.jpg",
      alt: "A treatment room at TDC Dental Clinic with a modern dental chair beside floor-to-ceiling windows",
    },
  },
  {
    id: "enhance",
    index: "02",
    kicker: "Cosmetic dentistry",
    title: "A smile planned around your features.",
    intro: "From a brighter shade to a complete smile makeover, cosmetic treatment starts with understanding the result you have in mind.",
    detail: "A Hollywood smile begins with smile analysis and smile design that consider your facial proportions.",
    slugs: ["veneers", "hollywood-smile", "whitening"],
    visual: { kind: "photo", src: "/images/clinic-reception.jpg", alt: "Reception and waiting area at TDC Dental Clinic, Deira" },
  },
  {
    id: "align",
    index: "03",
    kicker: "Teeth straightening",
    title: "Straighter teeth, without metal.",
    intro: "Clear braces are made specifically to fit your mouth and can treat a range of orthodontic irregularities.",
    detail: "Whether teeth grew in unevenly or moved later in life, your dentist will confirm whether clear braces suit your case.",
    slugs: ["invisible-braces"],
    visual: { kind: "art" },
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<Slug, Service>;

/** "Why choose us" points listed on every live treatment page, plus insurance from the About page. */
export const trustPoints = [
  { title: "Experience and expertise", body: "Treatment is carried out by qualified dentists across the fields of modern dentistry." },
  { title: "Honesty and integrity", body: "Clear, transparent advice — our values are built on trust and transparency." },
  { title: "Careful diagnosis", body: "Concerns are assessed and analysed before any treatment is recommended." },
  { title: "Focused on you", body: "A comfortable, stress-free atmosphere and a personal approach for every patient." },
  {
    title: "Reasonable prices & insurance",
    body: "Reasonable treatment prices. We accept many insurance plans and offer flexible payment plans for uninsured patients.",
  },
];

/** How TDC Dental describes its approach (About, Smile Gallery and site footer copy). */
export const journeySteps = [
  { title: "Assessment", body: "We assess your smile and identify any concerns before discussing treatment." },
  { title: "A personal plan", body: "Your treatment plan is tailored to your needs and lifestyle." },
  { title: "Clear communication", body: "Each step is explained clearly, so you know what to expect before anything begins." },
  { title: "With you to the result", body: "From your first consultation to your final result, our team is with you every step of the way." },
];

export const serviceFaqs = [
  {
    q: "Which treatment is right for me?",
    a: "That depends on your teeth, gums and goals. A dentist will assess your smile, explain the options and recommend a plan — suitability for any treatment is always confirmed in person.",
  },
  {
    q: "What are the options for replacing missing teeth?",
    a: "Common options include dental implants, bridges and dentures. The best choice depends on your oral health and personal preferences, which your dentist will discuss with you.",
  },
  {
    q: "What is a Hollywood smile made of?",
    a: "We use zirconia or e.max veneers. Treatment begins with smile analysis and smile design so the new smile suits your facial features.",
  },
  {
    q: "Is teeth whitening safe, and how long does it last?",
    a: "Professional whitening is safe when carried out under dental supervision. Results typically last from six months to two years, depending on habits such as coffee, tea and smoking.",
  },
  {
    q: "How do invisible braces work?",
    a: "Clear braces are made specifically to fit your mouth and can correct a range of orthodontic irregularities without metal brackets. Your dentist will confirm whether they suit your case.",
  },
  {
    q: "Do you accept insurance or offer payment plans?",
    a: "We accept many insurance providers and offer flexible payment plans for uninsured patients. Share your provider details and we will confirm your cover.",
  },
  {
    q: "How do I book an appointment?",
    a: `Call us on ${clinic.phoneDisplay}, message us on WhatsApp, or send an enquiry through the form on our homepage.`,
  },
] as const;
