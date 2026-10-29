import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServiceDetailTemplate } from "@/components/service-detail/ServiceDetailTemplate";
import { clinic, services } from "@/content/site";
import { serviceDetails } from "@/content/service-details";

// Same paths as the live site (tdcdental.ae/service/dental-implants/ …) so existing links and rankings carry over.
const pageSlug = (href: string) => href.split("/").pop()!;
const find = (slug: string) => {
  const service = services.find((s) => pageSlug(s.href) === slug);
  return service ? { service, detail: serviceDetails[service.slug] } : null;
};

// The page reads `params` to pick its content. All six paths are prerendered in full from
// generateStaticParams, so there is nothing to stream; the page must arrive whole because
// MotionRoot builds the page's animations once, on mount. Opt out of the instant-shell check
// rather than splitting the page behind a Suspense fallback.
export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: pageSlug(s.href) }));
}

export async function generateMetadata({ params }: PageProps<"/service/[slug]">): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { service, detail } = found;
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    alternates: { canonical: service.href },
    openGraph: {
      type: "website",
      siteName: clinic.name,
      title: `${service.title} — ${clinic.name}, Dubai`,
      description: detail.metaDescription,
      url: service.href,
      images: [{ url: detail.image.src, width: 1600, height: 1200, alt: detail.image.alt }],
    },
    twitter: { card: "summary_large_image", title: `${service.title} — ${clinic.name}`, description: detail.metaDescription, images: [detail.image.src] },
  };
}

export default async function ServicePage({ params }: PageProps<"/service/[slug]">) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { service, detail } = found;

  const url = (path: string) => new URL(path, clinic.siteUrl).toString();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
        { "@type": "ListItem", position: 2, name: "Our services", item: url("/our-services") },
        { "@type": "ListItem", position: 3, name: service.title, item: url(service.href) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: detail.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <SiteShell>
        <ServiceDetailTemplate service={service} detail={detail} />
      </SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
