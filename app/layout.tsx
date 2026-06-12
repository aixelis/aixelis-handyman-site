import type { Metadata } from "next";
import type { MetaHTMLAttributes } from "react";
import { siteContent } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
  keywords: [...siteContent.metadata.keywords],
  openGraph: {
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
    type: "website",
    locale: "en_US",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: siteContent.brand,
  description: siteContent.metadata.description,
  telephone: "+1-626-252-4457",
  areaServed: [
    { "@type": "City", name: "Walnut" },
    { "@type": "City", name: "Diamond Bar" },
    { "@type": "City", name: "Rowland Heights" },
    { "@type": "AdministrativeArea", name: "Los Angeles County" },
    { "@type": "AdministrativeArea", name: "Orange County" },
    { "@type": "City", name: "Irvine" },
  ],
  serviceType: [...siteContent.metadata.keywords],
  priceRange: "$$",
};

const impactVerificationMeta: MetaHTMLAttributes<HTMLMetaElement> & {
  value: string;
} = {
  name: "impact-site-verification",
  value: "e63f9c9e-e03a-48a3-9d3d-840b8a8fe499",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <meta {...impactVerificationMeta} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
