import type { Metadata } from "next";

import { FoundationPlaceholder } from "@/components/shared/foundation-placeholder";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default function OnboardingPlaceholderPage() {
  return (
    <FoundationPlaceholder
      eyebrow="Route Placeholder"
      title="Onboarding"
      description="The onboarding experience will be implemented in a later phase."
    />
  );
}
