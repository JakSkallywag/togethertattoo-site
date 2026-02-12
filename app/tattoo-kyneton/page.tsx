import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tattoo Studio Near Kyneton | Together Tattoo, Castlemaine",
  description:
    "Looking for a tattoo artist near Kyneton? Together Tattoo is a custom tattoo studio in Castlemaine, just 20 minutes from Kyneton. Fine line, blackwork, botanical, and lino print-inspired tattoos.",
  keywords: [
    "tattoo Kyneton",
    "tattoo artist Kyneton",
    "tattoo studio near Kyneton",
    "Kyneton tattoo",
    "custom tattoo Kyneton",
    "tattoo Macedon Ranges",
    "tattoo Castlemaine",
    "Together Tattoo",
  ],
  alternates: {
    canonical: "/tattoo-kyneton",
  },
};

const portfolioImages = [
  { src: "/portfolio/jak/03-Back-Monstera.jpg", alt: "Monstera leaf tattoo by Jak Rapmund" },
  { src: "/portfolio/pip/piptattoo02.jpg", alt: "Lino print-inspired tattoo by Pip" },
  { src: "/portfolio/jak/011-calf-fern.JPG", alt: "Fern tattoo by Jak Rapmund" },
  { src: "/portfolio/pip/piptattoo04.jpg", alt: "Block print tattoo by Pip" },
  { src: "/portfolio/jak/04-forearm-Winged-Dagger.jpg", alt: "Winged dagger tattoo by Jak Rapmund" },
  { src: "/portfolio/pip/piptattoo06.jpg", alt: "Printmaking tattoo by Pip" },
];

export default function TattooKyneton() {
  return (
    <>
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Branding/tt-logo.jpg"
              alt="Together Tattoo logo"
              width={28}
              height={28}
              className="invert h-7 w-auto"
            />
            <span className="text-white font-semibold tracking-wide">Together Tattoo</span>
          </Link>
          <Link
            href="/#book"
            className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors font-medium"
          >
            Book Now
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-black text-white pt-16">
        {/* Hero */}
        <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Tattoo Studio Near Kyneton
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Together Tattoo is a custom tattoo studio in Castlemaine, just a 20-minute drive from Kyneton and the Macedon Ranges.
          </p>
        </section>

        {/* About */}
        <section className="px-6 py-16 border-t border-gray-800 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Custom Tattoos, Close to Kyneton</h2>
          <p className="text-gray-300 mb-4">
            If you&apos;re in Kyneton, Woodend, or the wider Macedon Ranges, Together Tattoo is one of the closest custom tattoo studios to you. Castlemaine is a quick 20-minute drive north along the Calder Freeway, with free parking right outside the studio.
          </p>
          <p className="text-gray-300 mb-4">
            You can also reach us by train. The V/Line service from Kyneton to Castlemaine takes about 15 minutes, and the studio is a short walk from the station.
          </p>
          <p className="text-gray-300">
            We work by appointment only, so your session is planned and unhurried. We provide a calm, comfortable environment with low lighting and chill music to make the experience as relaxing as possible.
          </p>
        </section>

        {/* Artists */}
        <section className="px-6 py-16 border-t border-gray-800 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Our Artists</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Jak Rapmund</h3>
              <p className="text-gray-300">
                Fine line, blackwork, and botanical tattoos. Black ink only. 13 years experience across studios in Berlin, New York, Paris, Hong Kong, and Seoul.
              </p>
              <Link href="https://www.jakrapmund.com" className="text-gray-400 hover:text-white transition-colors text-sm mt-2 inline-block">
                View Jak&apos;s portfolio and book &rarr;
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Pip Tattoo</h3>
              <p className="text-gray-300">
                Tattoo designs created using lino printing techniques. Each piece begins as a hand-carved block print, giving every tattoo a distinctive character.
              </p>
              <Link href="https://www.piptattoo.com" className="text-gray-400 hover:text-white transition-colors text-sm mt-2 inline-block">
                View Pip&apos;s portfolio and book &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio Sample */}
        <section className="px-4 py-16 border-t border-gray-800">
          <h2 className="text-2xl font-semibold text-center mb-8">Our Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-4xl mx-auto">
            {portfolioImages.map((image, index) => (
              <div key={index} className="aspect-square relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Getting Here */}
        <section className="px-6 py-16 border-t border-gray-800 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Getting Here from Kyneton</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">By car:</strong> Castlemaine is about 20 minutes from Kyneton via the Calder Freeway. Head north and take the Castlemaine exit. Free street parking is available right outside the studio on Halford Street.
            </p>
            <p>
              <strong className="text-white">By train:</strong> V/Line runs regular services from Kyneton to Castlemaine, taking about 15 minutes. The studio is a short walk from Castlemaine station.
            </p>
            <p>
              <strong className="text-white">Good to know:</strong> We&apos;re on Dja Dja Wurrung country in the heart of Castlemaine, surrounded by great food and coffee if you want to make a day of it.
            </p>
          </div>
        </section>

        {/* Map */}
        <section className="py-16 border-t border-gray-800">
          <h2 className="text-2xl font-semibold text-center mb-4">Find Us</h2>
          <p className="text-gray-400 text-center max-w-lg mx-auto px-6 mb-8">
            Together Tattoo is based in Castlemaine, a short drive from Kyneton, Daylesford, and Bendigo.
          </p>
          <div className="max-w-4xl mx-auto px-6">
            <div className="aspect-[16/9] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d100867.3795312821!2d144.982016!3d-37.8109952!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad73732da393915%3A0x2686d805177e7676!2sTogether%20Tattoo!5e0!3m2!1sen!2sau!4v1770575181443!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Together Tattoo - Castlemaine, Victoria"
              />
            </div>
            <p className="text-gray-400 text-center mt-4">
              Halford Street, Castlemaine, VIC
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 border-t border-gray-800 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Book?</h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Send us your tattoo idea and we&apos;ll get back to you with available dates.
          </p>
          <Link
            href="/#book"
            className="inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors font-medium"
          >
            Book a Tattoo
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-6">
                <Link href="https://instagram.com/togethertattoo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  @togethertattoo
                </Link>
                <Link href="https://instagram.com/jakrapmund" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  @jakrapmund
                </Link>
                <Link href="https://instagram.com/pip.tattoo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  @pip.tattoo
                </Link>
              </div>
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Together Tattoo. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
