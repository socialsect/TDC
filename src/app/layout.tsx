import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import { clinic } from "@/content/site";
import { ToothCursor } from "@/components/layout/ToothCursor";
import { Preloader } from "@/components/layout/Preloader";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "TDC Dental Clinic in Deira, Dubai: dental implants, veneers, Hollywood smile, teeth whitening, invisible braces and restorative dentistry in a calm, modern clinic.";

export const metadata: Metadata = {
  // Canonical domain is the clinic's current live site. Confirm before launch.
  metadataBase: new URL(clinic.siteUrl),
  title: "Dentist in Dubai | TDC Dental Clinic",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: clinic.name,
    title: "TDC Dental Clinic — Your Smile, Our Passion",
    description,
    locale: "en_AE",
    images: [{ url: "/images/clinic-reception.jpg", width: 1600, height: 1200, alt: "Reception at TDC Dental Clinic, Dubai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TDC Dental Clinic — Dentist in Dubai",
    description,
    images: ["/images/clinic-reception.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Runs before first paint so the hero can be hidden for its entrance without a flash.
// If the user prefers reduced motion the class is never added and nothing is hidden.
// Also turns off the browser's scroll restoration, so a reload opens the page at the top
// (HashScroll handles where each page opens).
// With motion allowed it also adds html.preloading, so the logo preloader covers the first
// paint without a flash (components/layout/Preloader.tsx), and sets an absolute 8s limit from
// navigation start that holds even if the CSS or JavaScript bundles are slow or fail.
const motionFlag = `try{history.scrollRestoration='manual'}catch(e){}try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var h=document.documentElement;h.classList.add('motion-ok','preloading');setTimeout(function(){if(!h.classList.contains('preloader-exiting'))h.classList.remove('preloading')},Math.max(0,8000-performance.now()))}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before
          React hydrates. This only ignores mismatches on <body>'s own attributes, not its contents. */}
      <body suppressHydrationWarning>
        <Preloader />
        {children}
        <ToothCursor />
      </body>
    </html>
  );
}
