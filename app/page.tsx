import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/booking-form";
import GalleryLightbox from "@/components/gallery-lightbox";

const jakImages = [
  "02-Head-Lillys.jpg",
  "03-Back-Monstera.jpg",
  "04-forearm-Winged-Dagger.jpg",
  "05-forearm-Gum.jpg",
  "09-forearm-finelinetext.jpg",
  "011-calf-fern.JPG",
  "013-back-silverprincess.jpg",
  "015-forearm-banksia.jpg",
];

const pipImages = [
  "piptattoo01.jpg",
  "piptattoo02.jpg",
  "piptattoo03.jpg",
  "piptattoo04.jpg",
  "piptattoo05.jpg",
  "piptattoo06.jpg",
  "piptattoo07.jpg",
  "piptattoo08.jpg",
];

const reviewImages = [
  "review-0.png",
  "review-01.png",
  "review-02.png",
  "review-03.png",
  "review-04.png",
  "review-07.png",
  "review-08.png",
  "review-09.png",
  "review-010.png",
  "review-011.png",
  "review-012.png",
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#e8e4dc]/95 backdrop-blur-sm border-b border-[#c8c4bc] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/Branding/tt-logo.jpg"
              alt="Together Tattoo logo"
              width={28}
              height={28}
              className="mix-blend-multiply h-7 w-auto"
            />
            <span className="text-[#1a1a1a] font-semibold tracking-wide">Together Tattoo</span>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="https://instagram.com/togethertattoo" target="_blank" rel="noopener noreferrer" aria-label="@togethertattoo on Instagram" className="text-[#666666] hover:text-[#1a1a1a] transition-colors flex items-center">
              <InstagramIcon />
            </Link>
            <Link href="#about" className="text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm">
              About
            </Link>
            <Link href="#artists" className="text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm">
              Artists
            </Link>
            <Link href="/aftercare" className="text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm">
              Aftercare
            </Link>
            <Link href="#book" className="border border-[#1a1a1a] px-4 py-1.5 text-xs tracking-widest uppercase text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#e8e4dc] transition-colors">
              Book
            </Link>
            <Link href="#find-us" className="text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm">
              Find Us
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-[#e8e4dc] text-[#1a1a1a] pt-16">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 py-24 md:py-32">
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

          {/* Studio Photo */}
          <div className="w-full max-w-4xl aspect-[16/9] relative overflow-hidden rounded-lg mb-8">
            <Image
              src="/Branding/pip-in-studio.jpg"
              alt="Inside Together Tattoo studio"
              fill
              className="object-cover"
              priority
            />
          </div>

          <p className="text-xl md:text-2xl text-[#555555] text-center mb-3 font-light">
            Custom Tattoo Studio
          </p>
          <p className="text-base text-[#888888]">
            Castlemaine, Victoria
          </p>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 py-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">About the Studio</h2>
          <p className="text-[#555555] text-center mb-4">
            Together Tattoo is a custom tattoo studio on Dja Dja Wurrung country, Castlemaine. We focus on providing tattoos of the highest quality, working with you to bring your vision to life.
          </p>
          <p className="text-[#555555] text-center mb-8">
            We provide a calming environment for what is sometimes a difficult and painful experience. We always play chill music, have low lighting to reduce distraction and make your tattoo as comfortable as possible.
          </p>
          <div className="aspect-[16/10] relative overflow-hidden rounded-lg">
            <Image
              src="/Branding/us-2.jpg"
              alt="Pip and Jak outside Together Tattoo studio"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Separator */}
        <div className="border-t border-black/20 mx-auto max-w-6xl"></div>

        {/* Artists Section */}
        <section id="artists" className="px-4 py-16">
          <h2 className="text-3xl font-semibold text-center mb-16">Our Artists</h2>

          {/* Jak Rapmund */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 px-2">
              <div className="w-24 h-24 relative flex-shrink-0 rounded-full overflow-hidden">
                <Image
                  src="/portfolio/jak/Headshot.jpg"
                  alt="Jak Rapmund - Tattoo Artist"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Jak Rapmund</h3>
                <p className="text-[#555555] mb-3">
                  Fine line, blackwork, and botanical tattoos. Black ink only. 13 years experience across studios in Berlin, New York, Paris, Hong Kong, and Seoul.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <Link
                    href="#book"
                    className="bg-[#1a1a1a] text-[#e8e4dc] px-5 py-2 rounded-full hover:bg-[#333333] transition-colors font-medium text-sm"
                  >
                    Book with Jak
                  </Link>
                  <Link
                    href="https://instagram.com/jakrapmund"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="@jakrapmund on Instagram"
                    className="text-[#666666] hover:text-[#1a1a1a] transition-colors flex items-center"
                  >
                    <InstagramIcon />
                  </Link>
                </div>
              </div>
            </div>
            <GalleryLightbox images={jakImages} folder="portfolio/jak" />
          </div>

          {/* Separator */}
          <div className="border-t border-black/10 mx-auto max-w-4xl mb-20"></div>

          {/* Pip Tattoo */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 px-2">
              <div className="w-24 h-24 relative flex-shrink-0 rounded-full overflow-hidden">
                <Image
                  src="/portfolio/pip/pipprofile.jpg"
                  alt="Pip - Tattoo Artist"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Pip Tattoo</h3>
                <p className="text-[#555555] mb-3">
                  Tattoo designs created using lino printing techniques.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <Link
                    href="#book"
                    className="bg-[#1a1a1a] text-[#e8e4dc] px-5 py-2 rounded-full hover:bg-[#333333] transition-colors font-medium text-sm"
                  >
                    Book with Pip
                  </Link>
                  <Link
                    href="https://instagram.com/pip.tattoo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="@pip.tattoo on Instagram"
                    className="text-[#666666] hover:text-[#1a1a1a] transition-colors flex items-center"
                  >
                    <InstagramIcon />
                  </Link>
                </div>
              </div>
            </div>
            <GalleryLightbox images={pipImages} folder="portfolio/pip" />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 border-t border-[#c8c4bc]">
          <h2 className="text-2xl font-semibold text-center mb-8">Testimonials</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-6 pb-4" style={{ width: "max-content" }}>
              {reviewImages.map((image, index) => (
                <div
                  key={index}
                  className="w-72 flex-shrink-0 rounded-lg overflow-hidden bg-[#d8d4cc]"
                >
                  <Image
                    src={`/reviews/${image}`}
                    alt={`Google review ${index + 1}`}
                    width={288}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[#888888] text-sm mt-6">
            Swipe to see more →
          </p>
        </section>

        {/* Booking Form Section */}
        <section id="book" className="py-16 px-6 border-t border-[#c8c4bc]">
          <BookingForm />
        </section>

        {/* Find Us / Google Maps Section */}
        <section id="find-us" className="py-16 border-t border-[#c8c4bc]">
          <h2 className="text-2xl font-semibold text-center mb-4">Find Us</h2>
          <p className="text-[#666666] text-center max-w-lg mx-auto px-6 mb-8">
            Together Tattoo is based in Castlemaine — a short drive from Daylesford, Kyneton, and Bendigo. We&apos;ve had clients come from as far as Ballarat and Melbourne. There&apos;s also a direct train from Melbourne through to Bendigo that stops right in Castlemaine.
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
            <p className="text-[#666666] text-center mt-4">
              Halford Street, Castlemaine, VIC
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#c8c4bc] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <Link
                href="https://reference.togethertattoo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] hover:text-[#1a1a1a] transition-colors text-sm"
              >
                Reference Tool →
              </Link>
              <p className="text-[#888888] text-sm">
                © {new Date().getFullYear()} Together Tattoo. All rights reserved.
              </p>
              <Link href="https://instagram.com/togethertattoo" target="_blank" rel="noopener noreferrer" aria-label="@togethertattoo on Instagram" className="text-[#666666] hover:text-[#1a1a1a] transition-colors flex items-center">
                <InstagramIcon />
              </Link>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
