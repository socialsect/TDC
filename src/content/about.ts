/**
 * About Us page content.
 *
 * Source: tdcdental.ae/about-us/ (checked 29 Oct 2026) — mission, values and approach copy,
 * reworded for clarity without adding claims. The live site publishes no owner name, role,
 * qualifications, founding year or clinic history; those stay null until the clinic supplies
 * them, and the page renders without them.
 */

/** Owner details — fill in once confirmed by the clinic. The owner section adapts automatically. */
export const owner: {
  name: string | null;
  role: string | null;
  bio: string | null;
  photo: { src: string; alt: string } | null;
} = {
  name: null,
  role: null,
  bio: null,
  photo: null,
};

export const storyParagraphs = [
  "TDC Dental Clinic was founded with one mission: to provide high-quality, affordable and compassionate dental care for families and individuals in the UAE.",
  "The clinic combines modern technology with a team of trained professionals who are passionate about oral health and patient satisfaction.",
  "Dental visits can be stressful, so we prioritise a comfortable atmosphere, clear communication and personalised treatment plans that fit your needs and lifestyle.",
];

/** From the live About page's mission, values and approach copy. */
export const principles = [
  {
    title: "Comfort first",
    body: "A welcoming, stress-free environment where patients of all ages feel comfortable and respected.",
  },
  {
    title: "Clear communication",
    body: "A professional but caring approach — we walk you through every step of your treatment.",
  },
  {
    title: "Personal treatment plans",
    body: "Plans built around your needs and lifestyle, with prevention and early intervention in mind.",
  },
  {
    title: "Informed decisions",
    body: "Options are explained before anything begins. Whether a treatment suits you is always confirmed by your dentist.",
  },
  {
    title: "Trust and transparency",
    body: "Our values are built on trust, transparency and total health — and we treat every patient like part of our family.",
  },
];

/** Genuine clinic photography (from tdcdental.ae). */
export const clinicPhotos = [
  { src: "/images/clinic-reception.jpg", alt: "Reception and waiting area at TDC Dental Clinic, with the TDC logo on a timber wall", caption: "Reception" },
  { src: "/images/clinic-treatment-room.jpg", alt: "A treatment room at TDC Dental Clinic with a modern dental chair beside floor-to-ceiling windows", caption: "Treatment room" },
  { src: "/images/clinic-corridor.jpg", alt: "Waiting area and corridor at TDC Dental Clinic", caption: "Waiting area" },
];
