import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tattoo Aftercare | Together Tattoo",
  description: "Aftercare instructions for your tattoo by Together Tattoo. How to care for your second skin dressing and keep your tattoo healing well.",
};

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Aftercare() {
  return (
    <>
      {/* Navigation */}
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
          <Link href="/" className="text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm">
            ← Back
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-[#e8e4dc] text-[#1a1a1a] pt-16">

        {/* Page Header */}
        <div className="max-w-2xl mx-auto px-6 pt-12 pb-8">
          <h1 className="font-serif text-3xl mb-3">Aftercare</h1>
          <p className="text-[#666666] text-sm leading-relaxed">
            Your artist will walk you through this when your tattoo is done — this page is here as a reference if you need it later.
          </p>
          <p className="text-[#888888] text-sm mt-3">
            Monitor your tattoo for any unusual redness, swelling, or pain. If something doesn&apos;t feel right, contact your artist. For serious symptoms, see a doctor.
          </p>
        </div>

        <div className="border-t border-[#c8c4bc] max-w-2xl mx-auto"></div>

        {/* Second Skin Section */}
        <section className="max-w-2xl mx-auto px-6 py-12">
          <h2 className="font-serif text-xl mb-6">Second skin dressing</h2>
          <ol className="flex flex-col gap-6 text-[#555555] text-sm leading-relaxed">
            <li className="flex gap-4">
              <span className="text-[#999999] font-mono text-xs pt-0.5 flex-shrink-0">01</span>
              <p>Leave the film on for <strong className="text-[#1a1a1a]">3–5 days</strong>. Remove it in the shower or under running water — peel slowly from top to bottom.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] font-mono text-xs pt-0.5 flex-shrink-0">02</span>
              <p>Wash the tattoo gently with warm water and liquid soap. Pat dry with a clean paper towel, then apply a thin layer of gentle moisturiser or tattoo balm.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] font-mono text-xs pt-0.5 flex-shrink-0">03</span>
              <p>Keep moisturising a few times a day for <strong className="text-[#1a1a1a]">at least a few weeks</strong>. A thin layer is all you need — don&apos;t overload it.</p>
            </li>
          </ol>
        </section>

        <div className="border-t border-[#c8c4bc] max-w-2xl mx-auto"></div>

        {/* Early Removal Section */}
        <section className="max-w-2xl mx-auto px-6 py-12">
          <h2 className="font-serif text-xl mb-2">If the film comes off early</h2>
          <p className="text-[#888888] text-sm mb-4">You may need to remove the second skin before 3 days if:</p>
          <ul className="flex flex-col gap-2 text-[#888888] text-sm mb-6 leading-relaxed">
            <li className="flex gap-3"><span className="flex-shrink-0">—</span><p>The skin around the tattoo becomes red, swollen, or throbs — this could be a reaction to the film</p></li>
            <li className="flex gap-3"><span className="flex-shrink-0">—</span><p>The edges start peeling up and exposing the tattoo underneath</p></li>
            <li className="flex gap-3"><span className="flex-shrink-0">—</span><p>You notice unusual irritation or it simply won&apos;t stay on</p></li>
          </ul>
          <ol className="flex flex-col gap-6 text-[#555555] text-sm leading-relaxed">
            <li className="flex gap-4">
              <span className="text-[#999999] font-mono text-xs pt-0.5 flex-shrink-0">01</span>
              <p>Remove the film gently and wash with warm water and liquid soap. Pat dry with a clean paper towel. Avoid bar soap and bath towels — both can harbour bacteria.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] font-mono text-xs pt-0.5 flex-shrink-0">02</span>
              <p>Apply a thin layer of <strong className="text-[#1a1a1a]">aftercare cream</strong> with clean hands.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] font-mono text-xs pt-0.5 flex-shrink-0">03</span>
              <p>Wash, dry, and balm <strong className="text-[#1a1a1a]">3 times a day</strong> for at least the first 3 days.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] font-mono text-xs pt-0.5 flex-shrink-0">04</span>
              <p>After that, switch to a gentle moisturiser or tattoo balm a few times a day for at least a few weeks.</p>
            </li>
          </ol>
        </section>

        <div className="border-t border-[#c8c4bc] max-w-2xl mx-auto"></div>

        {/* Things to Remember */}
        <section className="max-w-2xl mx-auto px-6 py-12">
          <h2 className="font-serif text-xl mb-6">Things to remember</h2>
          <ul className="flex flex-col gap-5 text-[#555555] text-sm leading-relaxed">
            <li className="flex gap-4">
              <span className="text-[#999999] flex-shrink-0">—</span>
              <p>Your tattoo is an open wound. Infection risk is highest in the first 3 days. It should be healed within 2 weeks, but won&apos;t be fully settled in your skin for around 6 weeks.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] flex-shrink-0">—</span>
              <p>No soaking for at least 2 weeks — that means baths, saunas, jacuzzis, and swimming. Showers are fine.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] flex-shrink-0">—</span>
              <p>Depending on where the tattoo is, you may need to pause your usual exercise routine for a week or more.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] flex-shrink-0">—</span>
              <p><strong className="text-[#1a1a1a]">Do not rub or pick</strong> the healing area. This can cause ink loss and increase infection risk.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] flex-shrink-0">—</span>
              <p>Sun exposure fades tattoos over time. Once healed, protect it with at least <strong className="text-[#1a1a1a]">SPF 30</strong> whenever it&apos;s exposed.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-[#999999] flex-shrink-0">—</span>
              <p>If you notice unusual redness, swelling, or throbbing, contact your artist. If symptoms are serious, see a doctor.</p>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#c8c4bc] py-12 mt-8">
          <div className="max-w-2xl mx-auto px-6 flex justify-between items-center">
            <Link href="https://instagram.com/togethertattoo" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#1a1a1a] transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </Link>
            <p className="text-[#999999] text-sm">
              © {new Date().getFullYear()} Together Tattoo
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}
