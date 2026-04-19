"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { posthog } from "@/app/_lib/posthog-client";
import { Dialog } from "@/app/_components/primitives";
import { EASE_OUT_EXPO } from "@/app/_lib/motion-config";
import { BOOKING_URL } from "@/app/(landing)/_lib/qualification-config";
import { useQualificationPopupContext } from "./qualification-popup-provider";
import { StepIntro } from "./step-intro";
import { StepBusinessType } from "./step-business-type";
import { StepSpend } from "./step-spend";
import { StepTimeline } from "./step-timeline";
import { StepContact } from "./step-contact";
import { StepQualified } from "./step-qualified";
import { StepNotAFit } from "./step-not-a-fit";
import type {
  PopupStep,
  QualificationFormState,
  GhlLeadResponse,
  Role,
} from "@/app/(landing)/_types/qualification";
import axios from "axios";

const INITIAL_FORM: QualificationFormState = {
  businessType: null,
  spend: null,
  timeline: null,
  role: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  website: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactErrors = Partial<
  Record<"role" | "firstName" | "lastName" | "email" | "phone" | "website", string>
>;

const STEP_ORDER: PopupStep[] = [
  "intro",
  "business-type",
  "spend",
  "timeline",
  "contact",
  "qualified",
  "not-a-fit",
];

export function QualificationPopup() {
  const { isOpen, source, close } = useQualificationPopupContext();
  const [step, setStep] = useState<PopupStep>("intro");
  const [form, setForm] = useState<QualificationFormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [result, setResult] = useState<GhlLeadResponse | null>(null);

  useEffect(() => {
    if (isOpen) {
      posthog.capture("qualification_popup_opened", { trigger: source });
      setStep("intro");
      setForm(INITIAL_FORM);
      setResult(null);
      setContactErrors({});
    }
  }, [isOpen, source]);

  function handleClose() {
    if (!["qualified", "not-a-fit"].includes(step)) {
      posthog.capture("qualification_abandoned", {
        last_step: STEP_ORDER.indexOf(step),
      });
    }
    close();
  }

  function goTo(next: PopupStep) {
    posthog.capture("qualification_step_completed", { step_name: step });
    setStep(next);
    posthog.capture("qualification_step_viewed", {
      step: STEP_ORDER.indexOf(next),
    });
  }

  const handleSubmit = useCallback(async () => {
    const errors: ContactErrors = {};
    if (!form.role) errors.role = "Please select your role.";
    if (!form.firstName.trim()) errors.firstName = "Required";
    if (!form.lastName.trim()) errors.lastName = "Required";
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email))
      errors.email = "Enter a valid email.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7)
      errors.phone = "Enter a valid phone number.";
    if (!form.website.trim()) errors.website = "Required";

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    setContactErrors({});
    setIsSubmitting(true);

    const searchParams = new URLSearchParams(window.location.search);
    const currentForm = form;
    const payload = {
      ...currentForm,
      sourceUrl: window.location.href,
      utm: {
        source: searchParams.get("utm_source") ?? undefined,
        medium: searchParams.get("utm_medium") ?? undefined,
        campaign: searchParams.get("utm_campaign") ?? undefined,
        content: searchParams.get("utm_content") ?? undefined,
        term: searchParams.get("utm_term") ?? undefined,
      },
    };

    try {
      const { data } = await axios.post<GhlLeadResponse>("/api/ghl-lead", payload);
      setResult(data);
      posthog.capture("qualification_submitted", {
        qualified: data.qualified,
        business_type: currentForm.businessType,
        spend: currentForm.spend,
        timeline: currentForm.timeline,
        role: currentForm.role,
      });
      setStep(data.qualified ? "qualified" : "not-a-fit");
    } catch {
      setResult({ ok: false, qualified: false, redirectUrl: null });
      setStep("not-a-fit");
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
        >
          {step === "intro" && (
            <StepIntro
              onStart={() => {
                posthog.capture("qualification_step_viewed", { step: 1 });
                setStep("business-type");
              }}
              onClose={handleClose}
            />
          )}

          {step === "business-type" && (
            <StepBusinessType
              value={form.businessType}
              onChange={(v) => setForm((p) => ({ ...p, businessType: v }))}
              onNext={() => goTo("spend")}
              onBack={() => setStep("intro")}
            />
          )}

          {step === "spend" && (
            <StepSpend
              value={form.spend}
              onChange={(v) => setForm((p) => ({ ...p, spend: v }))}
              onNext={() => goTo("timeline")}
              onBack={() => setStep("business-type")}
            />
          )}

          {step === "timeline" && (
            <StepTimeline
              value={form.timeline}
              onChange={(v) => setForm((p) => ({ ...p, timeline: v }))}
              onNext={() => goTo("contact")}
              onBack={() => setStep("spend")}
            />
          )}

          {step === "contact" && (
            <StepContact
              value={{
                role: form.role,
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                website: form.website,
              }}
              onRoleChange={(v: Role) => setForm((p) => ({ ...p, role: v }))}
              onFieldChange={(key, val) => setForm((p) => ({ ...p, [key]: val }))}
              onSubmit={handleSubmit}
              onBack={() => setStep("timeline")}
              isSubmitting={isSubmitting}
              errors={contactErrors}
            />
          )}

          {step === "qualified" && result && (
            <StepQualified
              redirectUrl={result.redirectUrl ?? BOOKING_URL}
              eventId={result.eventId}
            />
          )}

          {step === "not-a-fit" && <StepNotAFit onClose={handleClose} />}
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
}
