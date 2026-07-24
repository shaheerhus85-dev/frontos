import type { Metadata } from "next";

import { LeadsKpiCard } from "@/components/dashboard/leads/leads-kpi-card";
import { LeadsWorkspace } from "@/components/dashboard/leads/leads-workspace";
import { leadRecords, leadsKpis } from "@/data/leads";

export const metadata: Metadata = {
  title: "Leads",
};

export default function LeadsPage() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="Leads dashboard"
    >
      {leadsKpis.map((metric) => (
        <LeadsKpiCard
          key={metric.id}
          metric={metric}
          className="col-span-6 xl:col-span-3"
        />
      ))}

      <div className="col-span-12 min-w-0">
        <LeadsWorkspace leads={leadRecords} />
      </div>
    </section>
  );
}
