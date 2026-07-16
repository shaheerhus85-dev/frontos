import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

export default function OverviewPage() {
  return (
    <section
      className="grid min-h-full place-items-center"
      aria-label="Overview workspace status"
    >
      <p className="text-sm font-medium text-muted">
        Overview workspace ready.
      </p>
    </section>
  );
}
