import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import ScrollFX from "@/components/ScrollFX";
import { site } from "@/lib/site";
import { isIndexable } from "@/lib/env";
import "./globals.css";
import "./home.css";
import "./sections.css";
import "./sections2.css";
import "./animations.css";
import "./v2.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--font-bricolage",
});

const title = `${site.name} | ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  applicationName: site.name,
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ECTO India auto-rickshaw mobility platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": site.organizationId,
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", url: `${site.url}/logo.png` },
  description: site.description,
  foundingDate: "2024-02", // start date per client; not an incorporation date
  founder: [
    { "@id": site.founder.personId },
    { "@type": "Person", name: site.coFounder.name, jobTitle: "Co-founder", url: site.coFounder.url },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: site.contactEmail,
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": site.websiteId,
  url: site.url,
  name: site.name,
  publisher: { "@id": site.organizationId },
  inLanguage: "en-IN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={bricolage.variable}>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <ScrollFX />
        {children}
      </body>
    </html>
  );
}