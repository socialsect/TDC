import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { AboutHero } from "@/components/about/AboutHero";
import { OurStory } from "@/components/about/OurStory";
import { Philosophy } from "@/components/about/Philosophy";
import { OwnerSection } from "@/components/about/OwnerSection";
import { ClinicEnvironment } from "@/components/about/ClinicEnvironment";
import { PatientExperience } from "@/components/about/PatientExperience";
import { AboutReviews } from "@/components/about/AboutReviews";
import { BookCta } from "@/components/services/BookCta";
import { clinic } from "@/content/site";

// Same path as the live site (tdcdental.ae/about-us/).
const description =
  "TDC Dental Clinic in Al-Muraqqabat, Deira: an owner-led clinic offering high-quality, affordable and compassionate dental care in a comfortable, modern setting.";

export const metadata: Metadata = {
  title: "About Us | TDC Dental Clinic, Deira, Dubai",
  description,
  alternates: { canonical: "/about-us" },
  openGraph: {
    type: "website",
    siteName: clinic.name,
    title: "About TDC Dental Clinic",
    description,
    url: "/about-us",
    images: [{ url: "/images/clinic-treatment-room-2.jpg", width: 1600, height: 1200, alt: "A treatment room at TDC Dental Clinic" }],
  },
  twitter: { card: "summary_large_image", title: "About TDC Dental Clinic", description, images: ["/images/clinic-treatment-room-2.jpg"] },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutHero />
      <OurStory />
      <Philosophy />
      <OwnerSection />
      <ClinicEnvironment />
      <PatientExperience />
      <AboutReviews />
      <BookCta />
    </SiteShell>
  );
}
