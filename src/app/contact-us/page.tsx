import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { clinic } from "@/content/site";

// Same path as the live site (tdcdental.ae/contact-us/).
const description = `Contact TDC Dental Clinic in Deira, Dubai. Call ${clinic.phoneDisplay}, message us on WhatsApp, email ${clinic.email} or send an appointment request online.`;

export const metadata: Metadata = {
  title: "Contact Us | TDC Dental Clinic, Deira, Dubai",
  description,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    type: "website",
    siteName: clinic.name,
    title: "Contact TDC Dental Clinic",
    description,
    url: "/contact-us",
    images: [{ url: "/images/clinic-reception.jpg", width: 1600, height: 1200, alt: "Reception at TDC Dental Clinic, Dubai" }],
  },
  twitter: { card: "summary_large_image", title: "Contact TDC Dental Clinic", description, images: ["/images/clinic-reception.jpg"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact TDC Dental Clinic",
  url: `${clinic.siteUrl}/contact-us`,
  mainEntity: {
    "@type": "Dentist",
    name: clinic.name,
    telephone: clinic.phoneDisplay,
    email: clinic.email,
    address: { "@type": "PostalAddress", streetAddress: "Office 408, Warba Center, Al-Muraqqabat", addressLocality: "Deira, Dubai", addressCountry: "AE" },
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteShell>
        <ContactHero />
        <ContactDetails />
        <ContactFormSection />
      </SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
