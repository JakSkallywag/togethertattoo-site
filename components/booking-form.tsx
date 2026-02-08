"use client";

import { useState } from "react";

const artists = [
  { label: "Pip Tattoos", value: "pip" },
  { label: "Jak Rapmund", value: "jak" },
  { label: "I'm not sure", value: "not-sure" },
];

const sizes = [
  { label: "Tiny (under 5cm)", value: "tiny" },
  { label: "Small (5-10cm)", value: "small" },
  { label: "Medium (10-15cm)", value: "medium" },
  { label: "Large (15-20cm)", value: "large" },
  { label: "Extra Large (20-30cm)", value: "xl" },
  { label: "I'm not sure", value: "not-sure" },
];

const placementAreas = [
  { label: "Arms", value: "arms" },
  { label: "Legs", value: "legs" },
  { label: "Torso", value: "torso" },
  { label: "Hands/Neck", value: "hands-neck" },
  { label: "Large projects", value: "large" },
  { label: "I'm not sure yet", value: "not-sure" },
];

const placements = [
  { label: "Forearm", value: "forearm", area: "arms" },
  { label: "Upper arm", value: "upper-arm", area: "arms" },
  { label: "Inner arm", value: "inner-arm", area: "arms" },
  { label: "Elbow", value: "elbow", area: "arms" },
  { label: "Calf", value: "calf", area: "legs" },
  { label: "Thigh", value: "thigh", area: "legs" },
  { label: "Shin", value: "shin", area: "legs" },
  { label: "Knee", value: "knee", area: "legs" },
  { label: "Shoulder", value: "shoulder", area: "torso" },
  { label: "Chest", value: "chest", area: "torso" },
  { label: "Ribs", value: "ribs", area: "torso" },
  { label: "Spine", value: "spine", area: "torso" },
  { label: "Feet", value: "feet", area: "torso" },
  { label: "Hands", value: "hands", area: "hands-neck" },
  { label: "Neck", value: "neck", area: "hands-neck" },
  { label: "Full sleeve", value: "full-sleeve", area: "large" },
  { label: "Full leg", value: "full-leg", area: "large" },
  { label: "Full back", value: "full-back", area: "large" },
  { label: "Not sure", value: "not-sure", area: "not-sure" },
];

const availabilityOptions = [
  { label: "Weekdays (Mon–Fri)", value: "weekdays" },
  { label: "Weekends", value: "weekends" },
  { label: "Either works for me", value: "either" },
];

const pronounOptions = [
  { label: "He/Him", value: "he-him" },
  { label: "She/Her", value: "she-her" },
  { label: "They/Them", value: "they-them" },
  { label: "Other", value: "other" },
];

type FormData = {
  artist: string;
  isCoverUp: boolean | null;
  description: string;
  size: string;
  placementArea: string;
  placement: string;
  availability: string;
  name: string;
  email: string;
  phone: string;
  pronouns: string;
  pronounsOther: string;
  isOver18: boolean;
};

const TOTAL_STEPS = 7;

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    artist: "",
    isCoverUp: null,
    description: "",
    size: "",
    placementArea: "",
    placement: "",
    availability: "",
    name: "",
    email: "",
    phone: "",
    pronouns: "",
    pronounsOther: "",
    isOver18: false,
  });

  const nextStep = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const isStepValid = (): boolean => {
    switch (step) {
      case 1: return formData.artist !== "";
      case 2: return formData.isCoverUp !== null;
      case 3: return formData.size !== "";
      case 4: return formData.placement !== "" && formData.placementArea !== "";
      case 5: return formData.description.trim().length > 10;
      case 6: return formData.availability !== "";
      case 7:
        const pronounValid = formData.pronouns !== "" &&
          (formData.pronouns !== "other" || formData.pronounsOther.trim() !== "");
        return formData.name.trim() !== "" &&
               formData.email.includes("@") &&
               pronounValid &&
               formData.isOver18;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid()) return;

    setIsSubmitting(true);
    setError("");

    const selectedArtist = artists.find(a => a.value === formData.artist);
    const selectedSize = sizes.find(s => s.value === formData.size);
    const selectedPlacement = placements.find(p => p.value === formData.placement);
    const selectedAvailability = availabilityOptions.find(a => a.value === formData.availability);

    const displayPronouns = formData.pronouns === "other"
      ? formData.pronounsOther
      : pronounOptions.find(p => p.value === formData.pronouns)?.label || "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artist: formData.artist,
          artistLabel: selectedArtist?.label || formData.artist,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pronouns: displayPronouns,
          description: formData.description,
          size: selectedSize?.label || formData.size,
          placement: selectedPlacement?.label || formData.placement,
          availability: selectedAvailability?.label || formData.availability,
          isCoverUp: formData.isCoverUp,
        }),
      });

      if (!response.ok) throw new Error("Failed to send");

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly at togethertattoo@proton.me");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Step {step} of {TOTAL_STEPS}</span>
      </div>
      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  );

  const optionButton = (isSelected: boolean) => `
    w-full p-4 text-left rounded-lg border transition-colors
    ${isSelected
      ? "border-white bg-white text-black"
      : "border-gray-700 hover:border-gray-500"
    }
  `;

  const navButton = (isPrimary: boolean, isDisabled: boolean = false) => `
    px-6 py-3 rounded-lg font-medium transition-colors
    ${isPrimary
      ? isDisabled
        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
        : "bg-white text-black hover:bg-gray-200"
      : "border border-gray-700 hover:border-gray-500"
    }
  `;

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-2xl font-semibold mb-4">Thank you!</h2>
        <p className="text-gray-400">
          We&apos;ve received your inquiry. Please check your email for confirmation and next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">Book a Tattoo</h2>

      <ProgressBar />

      {/* Step 1: Artist */}
      {step === 1 && (
        <div>
          <label className="block text-sm font-medium mb-4">Who would you like to tattoo you?</label>
          <div className="flex flex-col gap-3">
            {artists.map(a => (
              <button
                key={a.value}
                onClick={() => setFormData({ ...formData, artist: a.value })}
                className={optionButton(formData.artist === a.value)}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Cover-up */}
      {step === 2 && (
        <div>
          <label className="block text-sm font-medium mb-4">Is this a cover-up?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFormData({ ...formData, isCoverUp: false })}
              className={optionButton(formData.isCoverUp === false)}
            >
              No, fresh tattoo
            </button>
            <button
              onClick={() => setFormData({ ...formData, isCoverUp: true })}
              className={optionButton(formData.isCoverUp === true)}
            >
              Yes, cover-up
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Size */}
      {step === 3 && (
        <div>
          <label className="block text-sm font-medium mb-4">How big are you thinking?</label>
          <div className="flex flex-col gap-3">
            {sizes.map(s => (
              <button
                key={s.value}
                onClick={() => setFormData({ ...formData, size: s.value })}
                className={optionButton(formData.size === s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Placement */}
      {step === 4 && (
        <div>
          <label className="block text-sm font-medium mb-4">Where on your body?</label>

          {!formData.placementArea && (
            <div className="grid grid-cols-2 gap-3">
              {placementAreas.map(area => (
                <button
                  key={area.value}
                  onClick={() => {
                    if (area.value === "not-sure") {
                      setFormData({ ...formData, placementArea: area.value, placement: "not-sure" });
                    } else {
                      setFormData({ ...formData, placementArea: area.value, placement: "" });
                    }
                  }}
                  className={optionButton(false)}
                >
                  {area.label}
                </button>
              ))}
            </div>
          )}

          {formData.placementArea && formData.placementArea !== "not-sure" && (
            <div>
              <button
                onClick={() => setFormData({ ...formData, placementArea: "", placement: "" })}
                className="text-sm text-gray-400 hover:text-white mb-3 flex items-center gap-1"
              >
                ← Change area
              </button>
              <div className="grid grid-cols-2 gap-3">
                {placements
                  .filter(p => p.area === formData.placementArea)
                  .map(p => (
                    <button
                      key={p.value}
                      onClick={() => setFormData({ ...formData, placement: p.value })}
                      className={optionButton(formData.placement === p.value)}
                    >
                      {p.label}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {formData.placementArea === "not-sure" && (
            <div className="text-center py-4">
              <p className="text-gray-400 mb-3">No worries! We&apos;ll help you decide on placement.</p>
              <button
                onClick={() => setFormData({ ...formData, placementArea: "", placement: "" })}
                className="text-sm text-gray-400 hover:text-white"
              >
                ← Go back
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Description */}
      {step === 5 && (
        <div>
          <label className="block text-sm font-medium mb-4">Describe your tattoo idea</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us about the tattoo you have in mind — subject, style, any details that matter to you"
            className="w-full h-32 p-4 bg-transparent border border-gray-700 rounded-lg focus:border-white focus:outline-none resize-none"
          />
          <p className="text-gray-500 text-xs mt-2">
            Don&apos;t worry about reference images yet — we&apos;ll ask for those in our reply
          </p>
        </div>
      )}

      {/* Step 6: Availability */}
      {step === 6 && (
        <div>
          <label className="block text-sm font-medium mb-2">When works best for you?</label>
          <p className="text-gray-500 text-sm mb-4">We&apos;re flexible with scheduling, but it helps to know your preference</p>
          <div className="flex flex-col gap-3">
            {availabilityOptions.map(a => (
              <button
                key={a.value}
                onClick={() => setFormData({ ...formData, availability: a.value })}
                className={optionButton(formData.availability === a.value)}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 7: Contact Details */}
      {step === 7 && (
        <div>
          <label className="block text-sm font-medium mb-4">Your details</label>
          <div className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className="w-full p-4 bg-transparent border border-gray-700 rounded-lg focus:border-white focus:outline-none"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full p-4 bg-transparent border border-gray-700 rounded-lg focus:border-white focus:outline-none"
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Phone (optional)"
              className="w-full p-4 bg-transparent border border-gray-700 rounded-lg focus:border-white focus:outline-none"
            />
            <div>
              <p className="text-sm text-gray-400 mb-2">Pronouns</p>
              <div className="grid grid-cols-2 gap-3">
                {pronounOptions.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setFormData({ ...formData, pronouns: p.value, pronounsOther: p.value !== "other" ? "" : formData.pronounsOther })}
                    className={optionButton(formData.pronouns === p.value)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {formData.pronouns === "other" && (
                <input
                  type="text"
                  value={formData.pronounsOther}
                  onChange={(e) => setFormData({ ...formData, pronounsOther: e.target.value })}
                  placeholder="Please specify"
                  className="w-full mt-3 p-4 bg-transparent border border-gray-700 rounded-lg focus:border-white focus:outline-none"
                />
              )}
            </div>
            <div className="pt-2">
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
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button onClick={prevStep} className={navButton(false)}>
            Back
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className={navButton(true, !isStepValid())}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isStepValid() || isSubmitting}
            className={navButton(true, !isStepValid() || isSubmitting)}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
