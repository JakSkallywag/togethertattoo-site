import type { Metadata } from "next";
import { Merriweather, Montserrat } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.togethertattoo.com"),
  title: "Together Tattoo | Tattoo Studio | Daylesford, VIC",
  description: "Tattoo studio in Daylesford, Victoria. Fine line, blackwork, botanical, and lino print-inspired tattoos by Jak Rapmund and Pip Tattoo. Inside The Rex, 47 Vincent Street.",
  keywords: [
    "tattoo studio Castlemaine",
    "tattoo artist Castlemaine",
    "custom tattoos Castlemaine",
    "tattoo near me",
    "Castlemaine tattoo",
    "central Victoria tattoo",
    "Together Tattoo",
    "fine line tattoos",
    "blackwork tattoos",
    "botanical tattoos",
    "lino print tattoos",
    "tattoo Daylesford",
    "tattoo artist Daylesford",
    "tattoo Kyneton",
    "tattoo artist Kyneton",
    "tattoo Bendigo",
    "tattoo artist Bendigo",
    "tattoo central Victoria",
  ],
  authors: [{ name: "Together Tattoo" }],
  creator: "Together Tattoo",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.togethertattoo.com",
    siteName: "Together Tattoo",
    title: "Together Tattoo | Tattoo Studio | Daylesford, VIC",
    description: "Tattoo studio in Daylesford, Victoria. Fine line, blackwork, botanical, and lino print-inspired tattoos. Inside The Rex, 47 Vincent Street.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Together Tattoo | Tattoo Studio | Daylesford",
    description: "Tattoo studio in Daylesford, Victoria. Fine line, blackwork, botanical tattoos. Inside The Rex, 47 Vincent Street.",
  },
  verification: {
    google: "qAxdcXxJnE0CfTUPYTguTHV_214x1nu-QoV5GTkr6xM",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: "Together Tattoo",
    description: "Tattoo studio in Daylesford, Victoria. Fine line, blackwork, botanical, and lino print-inspired tattoos. Inside The Rex, 47 Vincent Street.",
    url: "https://www.togethertattoo.com",
    sameAs: [
      "https://instagram.com/togethertattoo",
      "https://instagram.com/jakrapmund",
      "https://instagram.com/pip.tattoo",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "47 Vincent Street",
      addressLocality: "Daylesford",
      addressRegion: "VIC",
      postalCode: "3460",
      addressCountry: "AU",
    },
    areaServed: [
      { "@type": "City", name: "Castlemaine", containedInPlace: { "@type": "State", name: "Victoria" } },
      { "@type": "City", name: "Daylesford", containedInPlace: { "@type": "State", name: "Victoria" } },
      { "@type": "City", name: "Kyneton", containedInPlace: { "@type": "State", name: "Victoria" } },
      { "@type": "City", name: "Bendigo", containedInPlace: { "@type": "State", name: "Victoria" } },
      { "@type": "City", name: "Ballarat", containedInPlace: { "@type": "State", name: "Victoria" } },
      { "@type": "City", name: "Melbourne", containedInPlace: { "@type": "State", name: "Victoria" } },
    ],
    employee: [
      {
        "@type": "Person",
        name: "Jak Rapmund",
        jobTitle: "Tattoo Artist",
        url: "https://www.jakrapmund.com",
        sameAs: "https://instagram.com/jakrapmund",
      },
      {
        "@type": "Person",
        name: "Pip",
        jobTitle: "Tattoo Artist",
        url: "https://www.piptattoo.com",
        sameAs: "https://instagram.com/pip.tattoo",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${merriweather.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
