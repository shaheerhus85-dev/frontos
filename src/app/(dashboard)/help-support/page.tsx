import type { Metadata } from "next";

import { HelpSupportWorkspace } from "@/components/dashboard/help-support/help-support-workspace";

export const metadata: Metadata = { title: "Help & Support" };

export default function HelpSupportPage() {
  return (
    <section
      className="mx-auto w-full max-w-[1440px] pb-2"
      aria-label="Help & Support dashboard"
    >
      <HelpSupportWorkspace />
    </section>
  );
}
