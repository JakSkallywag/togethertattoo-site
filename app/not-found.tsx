import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#e8e4dc] text-[#1a1a1a] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[#888888] text-sm tracking-widest uppercase mb-4">404</p>
      <h1 className="text-3xl font-semibold mb-4">Page not found</h1>
      <p className="text-[#555555] mb-8 max-w-sm">
        That page doesn&apos;t exist. If you were trying to book or get in touch, you can reach us directly.
      </p>
      <a
        href="mailto:togethertattoo@proton.me"
        className="text-[#1a1a1a] underline underline-offset-4 mb-4"
      >
        togethertattoo@proton.me
      </a>
      <Link href="/" className="text-[#888888] hover:text-[#1a1a1a] transition-colors text-sm mt-6">
        ← Back to home
      </Link>
    </main>
  );
}
