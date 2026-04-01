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
      <nav className="fixed top-0 w-full bg-[#e8e4dc]/95 backdrop-blur-sm border-b border-[#c8c4bc] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Branding/tt-logo.jpg"
              alt="Together Tattoo logo"
              width={28}
              height={28}
              className="mix-blend-multiply h-7 w-auto"
            />
            <span className="text-[#1a1a1a] font-semibold tracking-wide">Together Tattoo</span>
          </Link>
          <Link
            href="/#book"
            className="border border-[#1a1a1a] px-4 py-1.5 text-xs tracking-widest uppercase text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#e8e4dc] transition-colors"
          >
            Book
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-[#e8e4dc] text-[#1a1a1a] pt-16">

        {/* Announcement Banner */}
        <div className="bg-[#1a1a1a] text-center py-3 px-6">
          <p className="text-sm text-[#aaaaaa]">
            <span className="text-[#e8e4dc] font-medium">We&apos;re moving to Daylesford.</span>{" "}
            Opening mid-2026 at The Rex, Vincent Street — bookings open now.
          </p>
        </div>

        {/* Hero */}
        <section className="flex flex-col items-center justify-center px-6 py-16 md:py-24">
          <h1 className="flex items-center justify-center gap-4 md:gap-8 mb-8 w-full max-w-4xl">
            <Image
              src="/Branding/tt-logo.jpg"
              alt="Together Tattoo logo"
              width={120}
              height={120}
              className="mix-blend-multiply h-20 md:h-36 w-auto flex-shrink-0"
              priority
            />
            <Image
              src="/Branding/tt-title.jpg"
              alt="Together Tattoo"
              width={600}
              height={266}
              className="mix-blend-multiply h-20 md:h-36 w-auto flex-shrink-0 object-contain"
              priority
            />
          </h1>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-4xl mb-8">
            {portfolioImages.map((image, index) => (
              <div key={index} className="aspect-square relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>

          <p className="text-base md:text-lg text-[#555555] text-center font-light tracking-wide">
            Fine Line, Botanical &amp; Blackwork Tattoos in Daylesford
          </p>
          <p className="text-sm text-[#888888] mt-2">
            Inside The Rex, Vincent Street
          </p>
        </section>

        {/* About */}
        <section className="px-6 py-16 border-t border-[#c8c4bc] max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Custom Tattoos, Now in Daylesford</h2>
          <p className="text-[#555555] mb-4">
            Together Tattoo is moving to Daylesford — setting up studio inside The Rex, a beautifully restored Spanish Art Deco building on Vincent Street, now home to a growing community of artists, makers, and creatives.
          </p>
          <p className="text-[#555555] mb-4">
            We specialise in custom fine line, botanical, and blackwork tattooing, as well as flash and walk-ins. Whether you have a detailed concept in mind or want to pick something off the wall, we&apos;ve got you.
          </p>
          <p className="text-[#555555]">
            The space is calm, the music is chill, and there&apos;s no rush — just good tattooing in a great building.
          </p>
        </section>

        {/* Artists */}
        <section className="px-6 py-16 border-t border-[#c8c4bc] max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Our Artists</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Jak Rapmund</h3>
              <p className="text-[#555555]">
                Fine line, blackwork, and botanical tattoos. Black ink only. 13 years experience across studios in Berlin, New York, Paris, Hong Kong, and Seoul.
              </p>
              <Link href="https://www.jakrapmund.com" className="text-[#888888] hover:text-[#1a1a1a] transition-colors text-sm mt-2 inline-block">
                View Jak&apos;s portfolio and book &rarr;
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Pip Tattoo</h3>
              <p className="text-[#555555]">
                Tattoo designs created using lino printing techniques. Each piece begins as a hand-carved block print, giving every tattoo a distinctive character.
              </p>
              <Link href="https://www.piptattoo.com" className="text-[#888888] hover:text-[#1a1a1a] transition-colors text-sm mt-2 inline-block">
                View Pip&apos;s portfolio and book &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* The Rex */}
        <section className="px-6 py-16 border-t border-[#c8c4bc] max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Inside The Rex</h2>
          <p className="text-[#555555] mb-4">
            The Rex is a landmark 1928 Spanish Art Deco building on Vincent Street — Daylesford&apos;s main street. Originally a cinema, it&apos;s been beautifully restored as a creative cultural hub, home to artists, galleries, a community cinema, and independent businesses.
          </p>
          <p className="text-[#555555]">
            It&apos;s the kind of building that makes you slow down. We&apos;re glad to be part of it.
          </p>
        </section>

        {/* Location */}
        <section className="py-16 border-t border-[#c8c4bc]">
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
        <section className="px-6 py-16 border-t border-[#c8c4bc] text-center">
          <h2 className="text-2xl font-semibold mb-4">Book a Tattoo in Daylesford</h2>
          <p className="text-[#555555] mb-8 max-w-lg mx-auto">
            We&apos;re taking bookings now for our Daylesford studio. Send us your idea and we&apos;ll be in touch with dates.
          </p>
          <Link
            href="/#book"
            className="inline-block bg-[#1a1a1a] text-[#e8e4dc] px-8 py-3 rounded-full hover:bg-[#333333] transition-colors font-medium"
          >
            Book a Tattoo
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#c8c4bc] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-6">
                <Link href="https://instagram.com/togethertattoo" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#1a1a1a] transition-colors">
                  @togethertattoo
                </Link>
                <Link href="https://instagram.com/jakrapmund" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#1a1a1a] transition-colors">
                  @jakrapmund
                </Link>
                <Link href="https://instagram.com/pip.tattoo" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#1a1a1a] transition-colors">
                  @pip.tattoo
                </Link>
              </div>
              <p className="text-[#888888] text-sm">
                &copy; {new Date().getFullYear()} Together Tattoo. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
