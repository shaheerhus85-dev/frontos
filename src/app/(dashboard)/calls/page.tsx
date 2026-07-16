import type { Metadata } from "next";

import { CallsKpiCard } from "@/components/dashboard/calls/calls-kpi-card";
import { CallsWorkspace } from "@/components/dashboard/calls/calls-workspace";
import { callRecords, callsKpis } from "@/data/calls";

export const metadata: Metadata = {
  title: "Calls",
};

export default function CallsPage() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="Calls dashboard"
    >
      {callsKpis.map((metric) => (
        <CallsKpiCard
          key={metric.id}
          metric={metric}
          className="col-span-6 xl:col-span-3"
        />
      ))}

      <div className="col-span-12 min-w-0">
        <CallsWorkspace calls={callRecords} />
      </div>
    </section>
  );
}
