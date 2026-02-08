import Image from "next/image";
import Link from "next/link";

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

const pipImageCount = 8;

const reviewImages = [
  "review-01.png",
  "review-02.png",
  "review-03.png",
  "review-04.png",
  "review-05.png",
  "review-06.png",
  "review-07.png",
  "review-09.png",
  "review-010.png",
  "review-011.png",
  "review-012.png",
  "review-013.png",
];

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-white font-semibold tracking-wide">Together Tattoo</span>
          <div className="flex gap-6 items-center">
            <Link href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">
              About
            </Link>
            <Link href="#artists" className="text-gray-400 hover:text-white transition-colors text-sm">
              Artists
            </Link>
            <Link href="#find-us" className="text-gray-400 hover:text-white transition-colors text-sm">
              Find Us
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-black text-white pt-16">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 py-24 md:py-32">
          <h1 className="flex items-center gap-4 md:gap-6 mb-8 w-full max-w-4xl justify-center">
            <Image
              src="/Branding/tt-logo.jpg"
              alt="Together Tattoo logo"
              width={120}
              height={120}
              className="invert h-auto w-[15%] flex-shrink-0"
              priority
            />
            <Image
              src="/Branding/tt-title.jpg"
              alt="Together Tattoo"
              width={600}
              height={266}
              className="invert h-auto flex-1 min-w-0"
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

          <p className="text-xl md:text-2xl text-gray-300 text-center mb-3 font-light">
            Custom Tattoo Studio
          </p>
          <p className="text-base text-gray-500">
            Castlemaine, Victoria
          </p>
        </section>

        {/* Separator */}
        <div className="border-t border-white/20 mx-auto max-w-6xl"></div>

        {/* About Section */}
        <section id="about" className="px-6 py-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">About the Studio</h2>
          <p className="text-gray-300 text-center mb-8">
            Together Tattoo is a custom tattoo studio based in Castlemaine, in the heart of central Victoria. We focus on creating one-of-a-kind tattoos in a comfortable, welcoming environment.
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
        <div className="border-t border-white/20 mx-auto max-w-6xl"></div>

        {/* Artists Section */}
        <section id="artists" className="px-4 py-16">

          {/* Pip Tattoos */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 px-2">
              <div className="w-24 h-24 relative flex-shrink-0 rounded-full overflow-hidden bg-gray-800">
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                  Photo
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold mb-2">Pip Tattoos</h2>
                <p className="text-gray-300 mb-3">
                  Tattoo designs created using lino printing techniques.
                </p>
                <p className="text-gray-400 text-sm">
                  Contact Pip via{" "}
                  <Link
                    href="https://instagram.com/pip.irene"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-4 py-1 rounded-full hover:bg-gray-200 transition-colors font-medium"
                  >
                    Instagram
                  </Link>
                  {" "}or email togethertattoo@proton.me
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {Array.from({ length: pipImageCount }).map((_, index) => (
                <div key={index} className="aspect-square relative overflow-hidden bg-gray-900 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Coming soon</span>
                </div>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-white/10 mx-auto max-w-4xl mb-20"></div>

          {/* Jak Rapmund */}
          <div className="max-w-6xl mx-auto">
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
                <h2 className="text-2xl font-semibold mb-2">Jak Rapmund</h2>
                <p className="text-gray-300 mb-3">
                  Fine line, blackwork, and botanical tattoos. Black ink only. 13 years experience across studios in Berlin, New York, Paris, Hong Kong, and Seoul.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <Link
                    href="https://www.jakrapmund.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-colors font-medium text-sm"
                  >
                    Book with Jak
                  </Link>
                  <Link
                    href="https://instagram.com/jakrapmund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    @jakrapmund
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {jakImages.map((image, index) => (
                <div key={index} className="aspect-square relative overflow-hidden">
                  <Image
                    src={`/portfolio/jak/${image}`}
                    alt={`Tattoo by Jak Rapmund - ${image.replace(/^\d+-/, "").replace(/\.[^.]+$/, "").replace(/-/g, " ")}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 border-t border-gray-800">
          <h2 className="text-2xl font-semibold text-center mb-8">Testimonials</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-6 pb-4" style={{ width: "max-content" }}>
              {reviewImages.map((image, index) => (
                <div
                  key={index}
                  className="w-72 flex-shrink-0 rounded-lg overflow-hidden bg-gray-900"
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
          <p className="text-center text-gray-500 text-sm mt-6">
            Swipe to see more →
          </p>
        </section>

        {/* Find Us / Google Maps Section */}
        <section id="find-us" className="py-16 border-t border-gray-800">
          <h2 className="text-2xl font-semibold text-center mb-8">Find Us</h2>
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
                <Link href="https://instagram.com/pip.irene" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  @pip.irene
                </Link>
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Together Tattoo. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
