import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tattoo Studio in Daylesford | Fine Line, Botanical & Blackwork | Together Tattoo",
  description:
    "Together Tattoo is opening in Daylesford. Fine line, botanical, and blackwork tattoos by Jak Rapmund and Pip Tattoo — inside The Rex, Vincent Street, Daylesford.",
  keywords: [
    "tattoos Daylesford",
    "tattoo Daylesford",
    "tattoo studio Daylesford",
    "fine line tattoos Daylesford",
    "fine line tattoo Daylesford",
    "botanical tattoo Daylesford",
    "blackwork tattoo Daylesford",
    "tattoo artist Daylesford",
    "custom tattoo Daylesford",
    "Together Tattoo",
    "The Rex Daylesford",
  ],
  alternates: {
    canonical: "/tattoo-daylesford",
  },
};

const portfolioImages = [
  { src: "/portfolio/jak/02-Head-Lillys.jpg", alt: "Fine line botanical tattoo by Jak Rapmund" },
  { src: "/portfolio/pip/piptattoo01.jpg", alt: "Lino print-inspired tattoo by Pip" },
  { src: "/portfolio/jak/013-back-silverprincess.jpg", alt: "Silver princess tattoo by Jak Rapmund" },
  { src: "/portfolio/pip/piptattoo03.jpg", alt: "Block print tattoo by Pip" },
  { src: "/portfolio/jak/015-forearm-banksia.jpg", alt: "Banksia tattoo by Jak Rapmund" },
  { src: "/portfolio/pip/piptattoo05.jpg", alt: "Printmaking tattoo by Pip" },
];

export default function TattooDaylesford() {
  return (
    <>
      <nav className="fixed top-0 w-full bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2e2e2e] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Branding/tt-logo.jpg"
              alt="Together Tattoo logo"
              width={28}
              height={28}
              className="invert mix-blend-screen h-7 w-auto"
            />
            <span className="text-[#e8e4dc] font-semibold tracking-wide">Together Tattoo</span>
          </Link>
          <Link
            href="/#book"
            className="border border-[#e8e4dc] px-4 py-1.5 text-xs tracking-widest uppercase text-[#e8e4dc] hover:bg-[#e8e4dc] hover:text-[#1a1a1a] transition-colors"
          >
            Book
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-[#1a1a1a] text-[#e8e4dc] pt-16">

        {/* Announcement Banner */}
        <div className="bg-[#2e2e2e] border-b border-[#3e3e3e] text-center py-3 px-6">
          <p className="text-sm text-[#aaaaaa]">
            <span className="text-[#e8e4dc] font-medium">We&apos;re moving to Daylesford.</span>{" "}
            Opening mid-2026 at The Rex, Vincent Street — bookings open now.
          </p>
        </div>

        {/* Hero */}
        <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Fine Line, Botanical & Blackwork Tattoos in Daylesford
          </h1>
          <p className="text-xl text-[#aaaaaa] font-light">
            Together Tattoo is opening a studio in Daylesford — inside The Rex, a restored 1928 Art Deco building on Vincent Street in the heart of town.
          </p>
        </section>

        {/* About */}
        <section className="px-6 py-16 border-t border-[#2e2e2e] max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Custom Tattoos, Now in Daylesford</h2>
          <p className="text-[#aaaaaa] mb-4">
            After years based in Castlemaine, Together Tattoo is bringing its custom fine line, botanical, and blackwork tattooing to Daylesford. We&apos;re setting up studio inside The Rex — a beautifully restored Spanish Art Deco building on Vincent Street, now home to a growing community of artists, makers, and creatives.
          </p>
          <p className="text-[#aaaaaa] mb-4">
            We specialise in considered, custom work: fine line botanical pieces, blackwork, and lino print-inspired designs. Every tattoo is designed for you — we don&apos;t do flash or walk-ins.
          </p>
          <p className="text-[#aaaaaa]">
            We work by appointment only, so your session is unhurried and the space is calm. Low lighting, chill music, no rush.
          </p>
        </section>

        {/* Artists */}
        <section className="px-6 py-16 border-t border-[#2e2e2e] max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Our Artists</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Jak Rapmund</h3>
              <p className="text-[#aaaaaa]">
                Fine line, blackwork, and botanical tattoos. Black ink only. 13 years experience across studios in Berlin, New York, Paris, Hong Kong, and Seoul.
              </p>
              <Link href="https://www.jakrapmund.com" className="text-[#888888] hover:text-[#e8e4dc] transition-colors text-sm mt-2 inline-block">
                View Jak&apos;s portfolio and book &rarr;
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Pip Tattoo</h3>
              <p className="text-[#aaaaaa]">
                Tattoo designs created using lino printing techniques. Each piece begins as a hand-carved block print, giving every tattoo a distinctive character.
              </p>
              <Link href="https://www.piptattoo.com" className="text-[#888888] hover:text-[#e8e4dc] transition-colors text-sm mt-2 inline-block">
                View Pip&apos;s portfolio and book &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio Sample */}
        <section className="px-4 py-16 border-t border-[#2e2e2e]">
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

        {/* The Rex */}
        <section className="px-6 py-16 border-t border-[#2e2e2e] max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Inside The Rex</h2>
          <p className="text-[#aaaaaa] mb-4">
            The Rex is a landmark 1928 Spanish Art Deco building on Vincent Street — Daylesford&apos;s main street. Originally a cinema, it&apos;s been beautifully restored as a creative cultural hub, home to artists, galleries, a community cinema, and independent businesses.
          </p>
          <p className="text-[#aaaaaa]">
            It&apos;s the kind of building that makes you slow down. We&apos;re glad to be part of it.
          </p>
        </section>

        {/* Location */}
        <section className="py-16 border-t border-[#2e2e2e]">
          <h2 className="text-2xl font-semibold text-center mb-4">Find Us in Daylesford</h2>
          <p className="text-[#888888] text-center max-w-lg mx-auto px-6 mb-8">
            The Rex, Vincent Street, Daylesford VIC 3460 — right in the centre of town.
          </p>
          <div className="max-w-4xl mx-auto px-6">
            <div className="aspect-[16/9] rounded-lg overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=47+Vincent+Street,+Daylesford+VIC+3460&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Together Tattoo - The Rex, Daylesford, Victoria"
              />
            </div>
            <p className="text-[#888888] text-center mt-4">
              The Rex, 47 Vincent Street, Daylesford VIC
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 border-t border-[#2e2e2e] text-center">
          <h2 className="text-2xl font-semibold mb-4">Book a Tattoo in Daylesford</h2>
          <p className="text-[#aaaaaa] mb-8 max-w-lg mx-auto">
            We&apos;re taking bookings now for our Daylesford studio. Send us your idea and we&apos;ll be in touch with dates.
          </p>
          <Link
            href="/#book"
            className="inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors font-medium"
          >
            Book a Tattoo
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#2e2e2e] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-6">
                <Link href="https://instagram.com/togethertattoo" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#e8e4dc] transition-colors">
                  @togethertattoo
                </Link>
                <Link href="https://instagram.com/jakrapmund" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#e8e4dc] transition-colors">
                  @jakrapmund
                </Link>
                <Link href="https://instagram.com/pip.tattoo" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#e8e4dc] transition-colors">
                  @pip.tattoo
                </Link>
              </div>
              <p className="text-[#666666] text-sm">
                &copy; {new Date().getFullYear()} Together Tattoo. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
