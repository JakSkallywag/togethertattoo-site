import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/contact-form";

const jakImages = [
  "02-Head-Lillys.jpg",
  "03-Back-Monstera.jpg",
  "04-forearm-Winged-Dagger.jpg",
  "05-forearm-Gum.jpg",
  "07-hand-Bat.jpg",
  "08-sternum-dagger.JPG",
  "09-forearm-finelinetext.jpg",
  "011-calf-fern.JPG",
  "012-chest-Brahmaeamoth.jpg",
  "013-back-silverprincess.jpg",
  "015-forearm-banksia.jpg",
  "017-ribs-jellyfish.jpg",
];

const pipImageCount = 6;

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-white font-semibold tracking-wide">Together Tattoo</span>
          <div className="flex gap-6 items-center">
            <Link href="#artists" className="text-gray-400 hover:text-white transition-colors text-sm">
              Artists
            </Link>
            <Link href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">
              About
            </Link>
            <Link href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-black text-white pt-16">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 py-24 md:py-32">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight">
            Together Tattoo
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 text-center mb-3 font-light">
            Custom Tattoo Studio
          </p>
          <p className="text-base text-gray-500">
            Castlemaine, Victoria
          </p>
        </section>

        {/* Separator */}
        <div className="border-t border-white/20 mx-auto max-w-6xl"></div>

        {/* Artists Section */}
        <section id="artists" className="px-4 py-16">

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

          {/* Separator */}
          <div className="border-t border-white/10 mx-auto max-w-4xl mb-20"></div>

          {/* Pip Tattoos */}
          <div className="max-w-6xl mx-auto">
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
                <div className="flex gap-4 justify-center md:justify-start">
                  <Link
                    href="#contact"
                    className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-colors font-medium text-sm"
                  >
                    Contact Pip
                  </Link>
                  <Link
                    href="https://instagram.com/pip.irene"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    @pip.irene
                  </Link>
                </div>
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
        </section>

        {/* About Section */}
        <section id="about" className="px-6 py-16 border-t border-gray-800 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">About the Studio</h2>
          <p className="text-gray-300 text-center">
            Together Tattoo is a custom tattoo studio based in Castlemaine, in the heart of central Victoria. We focus on creating one-of-a-kind tattoos in a comfortable, welcoming environment.
          </p>
        </section>

        {/* Contact Form (for Pip) */}
        <section id="contact" className="px-6 py-16 border-t border-gray-800">
          <ContactForm />
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-6">
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
