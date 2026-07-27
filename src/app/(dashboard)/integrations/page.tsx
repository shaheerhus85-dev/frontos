import type { Metadata } from "next";

import { IntegrationInsights } from "@/components/dashboard/integrations/integration-insights";
import { IntegrationKpiCard } from "@/components/dashboard/integrations/integration-kpi-card";
import { IntegrationsWorkspace } from "@/components/dashboard/integrations/integrations-workspace";
import { integrationKpis, integrations } from "@/data/integrations";

export const metadata: Metadata = { title: "Integrations" };

export default function IntegrationsPage() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="Integrations dashboard"
    >
      {integrationKpis.map((metric) => (
        <IntegrationKpiCard
          key={metric.id}
          metric={metric}
          className="col-span-6 xl:col-span-3"
        />
      ))}
      <div className="col-span-12 min-w-0">
        <IntegrationsWorkspace initialIntegrations={integrations} />
      </div>
      <IntegrationInsights />
    </section>
  );
}
