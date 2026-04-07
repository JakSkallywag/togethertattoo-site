import type { Metadata } from "next";
import ConsentForm from "@/components/consent-form";

export const metadata: Metadata = {
  title: "Consent Form — Together Tattoo",
  robots: { index: false, follow: false },
};

export default function ConsentPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-[#e8e4dc]">
      <ConsentForm />
    </main>
  );
}
