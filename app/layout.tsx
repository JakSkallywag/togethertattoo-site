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
  title: "Together Tattoo | Custom Tattoo Studio | Castlemaine, VIC",
  description: "Custom tattoo studio in Castlemaine, Victoria. Fine line, blackwork, botanical, and lino print-inspired tattoos by Jak Rapmund and Pip Tattoos.",
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
  ],
  authors: [{ name: "Together Tattoo" }],
  creator: "Together Tattoo",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.togethertattoo.com",
    siteName: "Together Tattoo",
    title: "Together Tattoo | Custom Tattoo Studio | Castlemaine, VIC",
    description: "Custom tattoo studio in Castlemaine, Victoria. Fine line, blackwork, botanical, and lino print-inspired tattoos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Together Tattoo | Custom Tattoo Studio | Castlemaine",
    description: "Custom tattoo studio in Castlemaine, Victoria.",
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
    description: "Custom tattoo studio in Castlemaine, Victoria. Fine line, blackwork, botanical, and lino print-inspired tattoos.",
    url: "https://www.togethertattoo.com",
    sameAs: [
      "https://instagram.com/jakrapmund",
      "https://instagram.com/pip.irene",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Castlemaine",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
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
        sameAs: "https://instagram.com/pip.irene",
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
