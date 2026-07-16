import type { Metadata } from "next";

import { FoundationPlaceholder } from "@/components/shared/foundation-placeholder";

export const metadata: Metadata = {
  title: "Overview",
};

export default function OverviewPlaceholderPage() {
  return (
    <FoundationPlaceholder
      eyebrow="Route Placeholder"
      title="Overview"
      description="The private dashboard will be implemented in a later phase."
    />
  );
}
