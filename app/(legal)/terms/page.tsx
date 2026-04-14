import type { Metadata } from "next";
import { LegalPageShell } from "../_components/legal-page-shell";
import { TERMS_OF_SERVICE_CONTENT } from "../_lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service | XMA Agency",
  description:
    "Review the Terms of Service for XMA Agency's AI-powered video production and digital marketing services.",
  openGraph: {
    title: "Terms of Service | XMA Agency",
    description:
      "Review the Terms of Service for XMA Agency's AI-powered video production and digital marketing services.",
  },
};

export default function TermsOfServicePage() {
  return <LegalPageShell {...TERMS_OF_SERVICE_CONTENT} />;
}
