import type { Metadata } from "next";
import { LegalPageShell } from "../_components/legal-page-shell";
import { PRIVACY_POLICY_CONTENT } from "../_lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy | XMA Agency",
  description:
    "Learn how XMA Agency collects, uses, and protects your personal information. Read our privacy policy for details on data handling and your rights.",
  openGraph: {
    title: "Privacy Policy | XMA Agency",
    description:
      "Learn how XMA Agency collects, uses, and protects your personal information.",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPageShell {...PRIVACY_POLICY_CONTENT} />;
}
