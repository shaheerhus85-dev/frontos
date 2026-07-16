import type { Metadata } from "next";

import { AgentPerformance } from "@/components/dashboard/overview/agent-performance";
import { CallTrendChart } from "@/components/dashboard/overview/call-trend-chart";
import { Integrations } from "@/components/dashboard/overview/integrations";
import { KpiCard } from "@/components/dashboard/overview/kpi-card";
import { RecentActivity } from "@/components/dashboard/overview/recent-activity";
import { ServicesChart } from "@/components/dashboard/overview/services-chart";
import { Upcoming } from "@/components/dashboard/overview/upcoming";
import { kpiMetrics } from "@/data/overview";

export const metadata: Metadata = {
  title: "Overview",
};

export default function OverviewPage() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="Overview dashboard"
    >
      {kpiMetrics.map((metric) => (
        <KpiCard
          key={metric.id}
          metric={metric}
          className="col-span-6 xl:col-span-3"
        />
      ))}

      <CallTrendChart className="col-span-12 xl:col-span-8" />
      <ServicesChart className="col-span-12 xl:col-span-4" />

      <RecentActivity className="col-span-12 xl:col-span-8" />
      <Upcoming className="col-span-12 xl:col-span-4" />

      <AgentPerformance className="col-span-12 xl:col-span-8" />
      <Integrations className="col-span-12 xl:col-span-4" />
    </section>
  );
}
