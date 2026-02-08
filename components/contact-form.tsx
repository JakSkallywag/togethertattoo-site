"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    isOver18: false,
  });

  const isValid =
    formData.name.trim() !== "" &&
    formData.email.includes("@") &&
    formData.message.trim().length > 10 &&
    formData.isOver18;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or reach out on Instagram.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-2xl font-semibold mb-4">Thank you!</h2>
        <p className="text-gray-400">
          Your message has been sent. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-2">Contact Pip</h2>
      <p className="text-gray-400 text-center text-sm mb-8">
        Interested in getting tattooed by Pip? Send a message below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="w-full p-4 bg-transparent border border-gray-700 rounded-lg focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full p-4 bg-transparent border border-gray-700 rounded-lg focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about the tattoo you have in mind..."
            className="w-full h-32 p-4 bg-transparent border border-gray-700 rounded-lg focus:border-white focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isOver18}
              onChange={(e) => setFormData({ ...formData, isOver18: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-gray-700 bg-transparent"
            />
            <span className="text-sm">I confirm I am 18 years or older</span>
          </label>
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
            !isValid || isSubmitting
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
