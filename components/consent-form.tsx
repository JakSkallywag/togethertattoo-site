"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FormData = {
  artist: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  dob: string;
  phone: string;
  email: string;
  emergencyName: string;
  emergencyPhone: string;
  eaten: string;
  sober: string;
  pregnant: string;
  bloodborne: string;
  skinConditions: string;
  skinConditionDetails: string;
  consentPermanent: boolean;
  consentRisks: boolean;
  consentAftercare: boolean;
  consentHealth: boolean;
  consentFading: boolean;
  consentQuestions: boolean;
  consentPhotography: boolean;
  consentLiability: boolean;
  consentIndemnity: boolean;
  consentAccuracy: boolean;
  newsletter: boolean;
};

const initial: FormData = {
  artist: "",
  firstName: "", lastName: "", pronouns: "", dob: "", phone: "", email: "",
  emergencyName: "", emergencyPhone: "",
  eaten: "", sober: "", pregnant: "", bloodborne: "", skinConditions: "",
  skinConditionDetails: "",
  consentPermanent: false, consentRisks: false, consentAftercare: false,
  consentHealth: false, consentFading: false, consentQuestions: false,
  consentPhotography: false, consentLiability: false, consentIndemnity: false,
  consentAccuracy: false, newsletter: false,
};

// ─── Signature canvas ─────────────────────────────────────────────────────────

function SignatureCanvas({
  canvasRef,
  onDrawn,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onDrawn: (drawn: boolean) => void;
}) {
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1200;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#e8e4dc";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [canvasRef]);

  const getPoint = (canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDraw = (x: number, y: number) => {
    isDrawing.current = true;
    lastPoint.current = { x, y };
  };

  const continueDraw = (x: number, y: number) => {
    if (!isDrawing.current || !lastPoint.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPoint.current = { x, y };
    onDrawn(true);
  };

  const stopDraw = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onDrawn(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="w-full h-32 bg-[#111111] border border-[#2e2e2e] rounded cursor-crosshair touch-none"
        onMouseDown={(e) => {
          const c = canvasRef.current;
          if (!c) return;
          const p = getPoint(c, e.clientX, e.clientY);
          startDraw(p.x, p.y);
        }}
        onMouseMove={(e) => {
          const c = canvasRef.current;
          if (!c) return;
          const p = getPoint(c, e.clientX, e.clientY);
          continueDraw(p.x, p.y);
        }}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={(e) => {
          e.preventDefault();
          const c = canvasRef.current;
          if (!c) return;
          const p = getPoint(c, e.touches[0].clientX, e.touches[0].clientY);
          startDraw(p.x, p.y);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          const c = canvasRef.current;
          if (!c) return;
          const p = getPoint(c, e.touches[0].clientX, e.touches[0].clientY);
          continueDraw(p.x, p.y);
        }}
        onTouchEnd={stopDraw}
      />
      <button
        type="button"
        onClick={clear}
        className="mt-2 text-xs text-[#555555] hover:text-[#aaaaaa] transition-colors"
      >
        Clear signature
      </button>
    </div>
  );
}

// ─── Image compression ────────────────────────────────────────────────────────

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No canvas context"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

const inputClass =
  "w-full bg-[#111111] border border-[#2e2e2e] rounded px-3 py-2 text-[#e8e4dc] text-sm placeholder-[#444444] focus:outline-none focus:border-[#555555]";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-[#aaaaaa] mb-1.5">
        {label}
        {required && <span className="text-[#666666] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function RadioGroup({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-5 mt-1">
      {["yes", "no"].map((opt) => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="accent-[#e8e4dc]"
          />
          <span className="text-sm text-[#e8e4dc] capitalize">{opt === "yes" ? "Yes" : "No"}</span>
        </label>
      ))}
    </div>
  );
}

function ConsentCheck({
  checked,
  onChange,
  optional,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 flex-shrink-0 accent-[#e8e4dc]"
      />
      <span className="text-sm text-[#999999] leading-relaxed group-hover:text-[#bbbbbb] transition-colors">
        {children}
        {optional && <span className="text-[#555555] ml-1">(optional)</span>}
      </span>
    </label>
  );
}

function Divider() {
  return <div className="border-t border-[#2e2e2e]" />;
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function ConsentForm() {
  const [data, setData] = useState<FormData>(initial);
  const [signatureDrawn, setSignatureDrawn] = useState(false);
  const [idPhoto, setIdPhoto] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const update = (patch: Partial<FormData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const handleIdPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setErrors(["ID photo must be under 10MB"]);
      return;
    }
    try {
      const compressed = await compressImage(file);
      setIdPhoto(compressed);
    } catch {
      setErrors(["Could not process the photo. Please try again."]);
    }
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!data.artist) errs.push("Please select your artist");
    if (!data.firstName.trim()) errs.push("First name is required");
    if (!data.lastName.trim()) errs.push("Last name is required");
    if (!data.dob) errs.push("Date of birth is required");
    if (!data.phone.trim()) errs.push("Phone number is required");
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.push("A valid email address is required");
    if (!data.emergencyName.trim()) errs.push("Emergency contact name is required");
    if (!data.emergencyPhone.trim()) errs.push("Emergency contact phone is required");
    if (!data.eaten) errs.push("Please answer: have you eaten in the past 4 hours?");
    if (!data.sober) errs.push("Please answer: are you free from alcohol and drugs?");
    if (data.sober === "no")
      errs.push("Tattooing cannot proceed if you are under the influence of alcohol or drugs");
    if (!data.pregnant) errs.push("Please answer: are you currently pregnant or nursing?");
    if (!data.bloodborne) errs.push("Please answer: blood-borne or communicable conditions");
    if (!data.skinConditions) errs.push("Please answer: skin conditions at the site");
    const requiredConsents: (keyof FormData)[] = [
      "consentPermanent", "consentRisks", "consentAftercare", "consentHealth",
      "consentFading", "consentQuestions", "consentLiability", "consentIndemnity",
      "consentAccuracy",
    ];
    if (requiredConsents.some((k) => !data[k]))
      errs.push("Please read and tick all required consent statements");
    if (!signatureDrawn) errs.push("Signature is required");
    return [...new Set(errs)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors([]);
    setSubmitting(true);
    const signature = canvasRef.current?.toDataURL("image/png") ?? null;
    try {
      const res = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, signature, idPhoto, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors(["Something went wrong. Please try again or contact us directly."]);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-serif mb-4">Form received</h1>
        <p className="text-[#888888] leading-relaxed">
          Thank you — your consent form has been submitted. A copy has been sent to your email.
          <br />If you have any questions before your appointment, feel free to get in touch.
        </p>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const artistLabel = data.artist === "jak" ? "Jak Rapmund" : data.artist === "pip" ? "Pip" : "";

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[#666666] text-xs tracking-widest uppercase mb-4">Together Tattoo</p>
        <h1 className="font-serif text-2xl mb-3">Tattoo Consent Form</h1>
        <p className="text-[#888888] text-sm leading-relaxed">
          Please read each section carefully and complete all required fields before your appointment.
          A copy will be emailed to you on submission.
        </p>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-8 p-4 border border-[#5a2020] bg-[#1a0f0f] rounded">
          <p className="text-sm text-[#cc6666] font-medium mb-2">Please fix the following:</p>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((err, i) => (
              <li key={i} className="text-sm text-[#cc6666]">{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Flu notice */}
      <div className="mb-10 p-4 border border-[#2e2e2e] rounded bg-[#161616]">
        <p className="text-sm text-[#aaaaaa] leading-relaxed">
          <strong className="text-[#e8e4dc]">Feeling unwell?</strong>{" "}
          If you have flu-like symptoms on the day of your appointment, please contact us to
          reschedule. There is no penalty for rescheduling due to illness.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ── 0. Artist Selection ── */}
        <section className="space-y-4">
          <h2 className="font-serif text-lg">Your Artist</h2>
          <div className="flex gap-5">
            {[
              { value: "jak", label: "Jak Rapmund" },
              { value: "pip", label: "Pip" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="artist"
                  value={opt.value}
                  checked={data.artist === opt.value}
                  onChange={() => update({ artist: opt.value })}
                  className="accent-[#e8e4dc]"
                />
                <span className="text-sm text-[#e8e4dc]">{opt.label}</span>
              </label>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 1. Client Information ── */}
        <section className="space-y-5">
          <h2 className="font-serif text-lg">Client Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" required>
              <input
                className={inputClass}
                value={data.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
              />
            </Field>
            <Field label="Last name" required>
              <input
                className={inputClass}
                value={data.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Preferred pronouns">
            <input
              className={inputClass}
              placeholder="e.g. she/her"
              value={data.pronouns}
              onChange={(e) => update({ pronouns: e.target.value })}
            />
          </Field>
          <Field label="Date of birth" required>
            <input
              type="date"
              className={inputClass}
              value={data.dob}
              onChange={(e) => update({ dob: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" required>
              <input
                type="tel"
                className={inputClass}
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                className={inputClass}
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Emergency contact name" required>
              <input
                className={inputClass}
                value={data.emergencyName}
                onChange={(e) => update({ emergencyName: e.target.value })}
              />
            </Field>
            <Field label="Emergency contact phone" required>
              <input
                type="tel"
                className={inputClass}
                value={data.emergencyPhone}
                onChange={(e) => update({ emergencyPhone: e.target.value })}
              />
            </Field>
          </div>
        </section>

        <Divider />

        {/* ── 2. Pre-Appointment Check ── */}
        <section className="space-y-6">
          <div>
            <h2 className="font-serif text-lg mb-1">Pre-Appointment Check</h2>
            <p className="text-[#666666] text-sm">
              Please answer honestly — this helps ensure a safe appointment.
            </p>
          </div>
          <div className="space-y-6">
            <Field label="Have you eaten within the past 4 hours?" required>
              <RadioGroup
                name="eaten"
                value={data.eaten}
                onChange={(v) => update({ eaten: v })}
              />
              {data.eaten === "no" && (
                <p className="mt-2 text-xs text-[#888888]">
                  Please eat something before your appointment — tattooing on an empty stomach can
                  cause dizziness or fainting.
                </p>
              )}
            </Field>
            <Field label="Are you free from alcohol and drugs today?" required>
              <RadioGroup
                name="sober"
                value={data.sober}
                onChange={(v) => update({ sober: v })}
              />
              {data.sober === "no" && (
                <p className="mt-2 text-xs text-[#cc6666]">
                  Tattooing cannot proceed if you are under the influence of alcohol or drugs.
                </p>
              )}
            </Field>
            <Field label="Are you currently pregnant or nursing?" required>
              <RadioGroup
                name="pregnant"
                value={data.pregnant}
                onChange={(v) => update({ pregnant: v })}
              />
              {data.pregnant === "yes" && (
                <p className="mt-2 text-xs text-[#888888]">
                  Please discuss this with your artist before your appointment — we may need to reschedule.
                </p>
              )}
            </Field>
            <Field
              label="Do you have any blood-borne pathogens or communicable diseases?"
              required
            >
              <RadioGroup
                name="bloodborne"
                value={data.bloodborne}
                onChange={(v) => update({ bloodborne: v })}
              />
            </Field>
            <Field
              label="Do you have any skin conditions at or near the area to be tattooed?"
              required
            >
              <RadioGroup
                name="skinConditions"
                value={data.skinConditions}
                onChange={(v) => update({ skinConditions: v })}
              />
              {data.skinConditions === "yes" && (
                <textarea
                  className={`${inputClass} mt-3`}
                  rows={3}
                  placeholder="Please describe the condition..."
                  value={data.skinConditionDetails}
                  onChange={(e) => update({ skinConditionDetails: e.target.value })}
                />
              )}
            </Field>
          </div>
        </section>

        <Divider />

        {/* ── 3. Acknowledgement & Consent ── */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-lg mb-1">Acknowledgement & Consent</h2>
            <p className="text-[#666666] text-sm">
              Please read each statement carefully and tick to confirm your agreement.
              All statements except photography are required.
            </p>
          </div>
          <div className="space-y-5">
            <ConsentCheck
              checked={data.consentPermanent}
              onChange={(v) => update({ consentPermanent: v })}
            >
              <strong className="text-[#e8e4dc]">Permanent procedure.</strong>{" "}
              I understand that tattooing is a permanent procedure. I understand that complete removal
              is rarely achieved, and that removal treatments (such as laser) are costly, painful, and
              may cause scarring.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentRisks}
              onChange={(v) => update({ consentRisks: v })}
            >
              <strong className="text-[#e8e4dc]">Risks.</strong>{" "}
              I understand and accept the risks associated with tattooing, including but not limited
              to infection, scarring, and rare allergic reactions to pigments. I acknowledge these
              risks can be minimised through proper aftercare and full disclosure of relevant health
              information.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentAftercare}
              onChange={(v) => update({ consentAftercare: v })}
            >
              <strong className="text-[#e8e4dc]">Aftercare & healing.</strong>{" "}
              I agree to follow all aftercare instructions provided by my artist. I understand that
              failure to do so may result in infection, poor healing, or colour loss, and that I bear
              responsibility for any such outcomes.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentHealth}
              onChange={(v) => update({ consentHealth: v })}
            >
              <strong className="text-[#e8e4dc]">Health declaration.</strong>{" "}
              I declare that, to the best of my knowledge, I am in good health and do not have any
              condition that would significantly increase my risk, including: blood-borne diseases,
              bleeding disorders, diabetes requiring insulin, epilepsy, immunosuppression, or active
              skin conditions at the tattooed site. I am not pregnant or nursing. If any of these
              apply, I have informed my artist prior to this appointment.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentFading}
              onChange={(v) => update({ consentFading: v })}
            >
              <strong className="text-[#e8e4dc]">Fading & variation.</strong>{" "}
              I understand that tattoo results vary based on individual skin type, placement, and
              aftercare. Colour and density may change over time. Touch-ups may be required and are
              not included in the original price unless agreed otherwise.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentQuestions}
              onChange={(v) => update({ consentQuestions: v })}
            >
              <strong className="text-[#e8e4dc]">Informed consent.</strong>{" "}
              I confirm I have had the opportunity to ask questions about the procedure, design, and
              aftercare, and that all questions have been answered to my satisfaction before
              proceeding.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentLiability}
              onChange={(v) => update({ consentLiability: v })}
            >
              <strong className="text-[#e8e4dc]">Release of liability.</strong>{" "}
              I release {artistLabel || "my artist"} and Together Tattoo from all liability for any damages, losses, or
              claims arising from this tattooing procedure, except where caused by gross negligence or
              wilful misconduct.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentIndemnity}
              onChange={(v) => update({ consentIndemnity: v })}
            >
              <strong className="text-[#e8e4dc]">Indemnification.</strong>{" "}
              I agree to indemnify and hold harmless {artistLabel || "my artist"} and Together Tattoo from any claims,
              damages, costs, or legal fees arising from my failure to disclose relevant health
              information, or my failure to follow aftercare instructions.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentAccuracy}
              onChange={(v) => update({ consentAccuracy: v })}
            >
              <strong className="text-[#e8e4dc]">Accuracy of information.</strong>{" "}
              I confirm that all information provided on this form is true and accurate to the best of
              my knowledge. I understand that providing false or incomplete information may void any
              claims against the artist or studio.
            </ConsentCheck>
            <ConsentCheck
              checked={data.consentPhotography}
              onChange={(v) => update({ consentPhotography: v })}
              optional
            >
              <strong className="text-[#e8e4dc]">Photography.</strong>{" "}
              I consent to photographs of my tattoo being taken for portfolio use, including on social
              media and the Together Tattoo website. I understand I may withdraw this consent at any time.
              Declining does not affect my service in any way.
            </ConsentCheck>
          </div>
        </section>

        <Divider />

        {/* ── 4. Signature & ID ── */}
        <section className="space-y-5">
          <h2 className="font-serif text-lg">Signature</h2>
          <Field label="Sign below using your mouse or finger" required>
            <SignatureCanvas canvasRef={canvasRef} onDrawn={setSignatureDrawn} />
          </Field>
          <p className="text-sm text-[#666666]">
            Date: <span className="text-[#aaaaaa]">{today}</span>
          </p>
          <Field label="Photo of ID">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleIdPhoto}
              className="text-sm text-[#aaaaaa] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-[#2e2e2e] file:bg-[#111111] file:text-[#e8e4dc] file:text-xs file:cursor-pointer hover:file:border-[#555555] transition-colors"
            />
            <p className="mt-1.5 text-xs text-[#555555]">
              Optional. Tap to take a photo or upload from your device.
            </p>
            {idPhoto && (
              <p className="mt-1 text-xs text-[#666666]">Photo attached.</p>
            )}
          </Field>
        </section>

        <Divider />

        {/* ── 5. Newsletter ── */}
        <section>
          <ConsentCheck
            checked={data.newsletter}
            onChange={(v) => update({ newsletter: v })}
            optional
          >
            <strong className="text-[#e8e4dc]">Newsletter.</strong>{" "}
            Sign me up for occasional updates from Jak — new work, availability, and writing.
            Unsubscribe any time.
          </ConsentCheck>
        </section>

        {/* Submit */}
        <div className="space-y-4 pb-8">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 border border-[#e8e4dc] text-[#e8e4dc] text-sm tracking-wide rounded hover:bg-[#e8e4dc] hover:text-[#1a1a1a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : "Submit consent form"}
          </button>
          <p className="text-xs text-[#555555] text-center">
            By submitting this form you confirm that you have read, understood, and agreed to all
            statements above.
          </p>
        </div>

      </form>
    </div>
  );
}
