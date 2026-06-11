import type { Metadata } from "next";
import type { MetaHTMLAttributes } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aixelis | Handyman, Smart Home, Camera & Network Installation",
  description:
    "Aixelis provides handyman services for homes and businesses in Walnut, Los Angeles, Orange County, and Irvine, including appliance repair, business equipment, networking, security cameras, smart home devices, thermostat installation, small electrical, plumbing, and general repairs.",
  keywords: [
    "Aixelis",
    "handyman Walnut CA",
    "Walnut home repair",
    "Los Angeles handyman",
    "Orange County handyman",
    "Irvine handyman",
    "appliance repair",
    "appliance installation",
    "business equipment repair",
    "business equipment installation",
    "security camera installation",
    "video doorbell installation",
    "smart home installation",
    "smart lock installation",
    "Wi-Fi setup",
    "Ethernet cabling",
    "thermostat installation",
    "TV mounting",
    "furniture assembly",
    "door repair",
    "lock installation",
    "rental property maintenance",
    "shop repair",
  ],
  openGraph: {
    title: "Aixelis | Home & Business Handyman Services",
    description:
      "Handyman, appliance repair, networking, camera installation, smart home setup, thermostat installation, and small repair services for Walnut, Los Angeles, Orange County, and Irvine.",
    type: "website",
    locale: "en_US",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Aixelis",
  description:
    "Home and business handyman services including appliance repair, business equipment support, networking, security camera installation, smart home devices, thermostat installation, small electrical, plumbing, and general repairs.",
  telephone: "+1-626-252-4457",
  areaServed: [
    { "@type": "City", name: "Walnut" },
    { "@type": "City", name: "Diamond Bar" },
    { "@type": "City", name: "Rowland Heights" },
    { "@type": "AdministrativeArea", name: "Los Angeles County" },
    { "@type": "AdministrativeArea", name: "Orange County" },
    { "@type": "City", name: "Irvine" },
  ],
  serviceType: [
    "Handyman service",
    "Appliance repair",
    "Business equipment repair",
    "Ethernet cabling",
    "Wi-Fi setup",
    "Security camera installation",
    "Video doorbell installation",
    "Smart home installation",
    "Smart lock installation",
    "Thermostat installation",
    "TV mounting",
    "Furniture assembly",
    "Door repair",
    "Lock installation",
    "Small electrical repair",
    "Small plumbing repair",
    "Rental property maintenance",
    "Shop repair",
  ],
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
