import { ChannelPerformance } from "@/components/dashboard/reports/channel-performance";
import { ConversionFunnel } from "@/components/dashboard/reports/conversion-funnel";
import { OperationalEfficiency } from "@/components/dashboard/reports/operational-efficiency";
import { PerformanceOverview } from "@/components/dashboard/reports/performance-overview";
import { ReportInsights } from "@/components/dashboard/reports/report-insights";
import { ReportsActions } from "@/components/dashboard/reports/reports-actions";
import { ReportsKpiCard } from "@/components/dashboard/reports/reports-kpi-card";
import { reportKpis } from "@/data/reports";

export function ReportsWorkspace() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="Reports dashboard"
    >
      <div className="col-span-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-[#11182a]">
            Reporting workspace
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            A connected view of acquisition, revenue, conversion, and
            operational performance.
          </p>
        </div>
        <ReportsActions />
      </div>

      {reportKpis.map((metric) => (
        <div key={metric.id} className="col-span-6 xl:col-span-3">
          <ReportsKpiCard metric={metric} />
        </div>
      ))}

      <div className="col-span-12 grid min-w-0 grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <PerformanceOverview />
        <ConversionFunnel />
      </div>

      <ChannelPerformance />

      <div className="col-span-12 grid min-w-0 grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <OperationalEfficiency />
        <ReportInsights />
      </div>
    </section>
  );
}
