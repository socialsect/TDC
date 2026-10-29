import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServicesHero } from "@/components/services/ServicesHero";
import { TreatmentIndex } from "@/components/services/TreatmentIndex";
import { FeaturedTreatments } from "@/components/services/FeaturedTreatments";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { WhyChoose } from "@/components/services/WhyChoose";
import { TreatmentJourney } from "@/components/services/TreatmentJourney";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { BookCta } from "@/components/services/BookCta";
import { clinic, services } from "@/content/site";

// Same path as the live site (tdcdental.ae/our-services/) so existing links and rankings carry over.
const description =
  "Dental implants, restorative dentistry, porcelain veneers, Hollywood smile, teeth whitening and invisible braces at TDC Dental Clinic in Deira, Dubai.";

export const metadata: Metadata = {
  title: "Dental Services in Dubai | TDC Dental Clinic",
  description,
  alternates: { canonical: "/our-services" },
  openGraph: {
    type: "website",
    siteName: clinic.name,
    title: "Dental Services — TDC Dental Clinic, Dubai",
    description,
    url: "/our-services",
    images: [{ url: "/images/clinic-corridor.jpg", width: 1600, height: 1200, alt: "TDC Dental Clinic, Deira, Dubai" }],
  },
  twitter: { card: "summary_large_image", title: "Dental Services — TDC Dental Clinic", description, images: ["/images/clinic-corridor.jpg"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dental services at TDC Dental Clinic",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "MedicalProcedure", name: s.title, url: new URL(s.href, clinic.siteUrl).toString() },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <SiteShell>
        <ServicesHero />
        <TreatmentIndex />
        <FeaturedTreatments />
        <ServicesGrid />
        <WhyChoose />
        <TreatmentJourney />
        <ServicesFaq />
        <BookCta />
      </SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
