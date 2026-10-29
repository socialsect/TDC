import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { Commitment } from "@/components/sections/Commitment";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Dentists } from "@/components/sections/Dentists";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqContact } from "@/components/sections/FaqContact";
import { Insights } from "@/components/sections/Insights";
import { ContactLocation } from "@/components/sections/ContactLocation";
import { clinic } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  url: clinic.siteUrl,
  email: clinic.email,
  telephone: clinic.phoneDisplay,
  image: `${clinic.siteUrl}/images/clinic-reception.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 408, Warba Center, Al-Muraqqabat",
    addressLocality: "Deira, Dubai",
    addressCountry: "AE",
  },
  sameAs: clinic.social.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <SiteShell>
        <Hero />
        <Commitment />
        <About />
        <Services />
        <Dentists />
        <Testimonials />
        <FaqContact />
        <Insights />
        <ContactLocation />
      </SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
