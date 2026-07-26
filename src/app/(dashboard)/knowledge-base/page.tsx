import type { Metadata } from "next";

import { KnowledgeInsights } from "@/components/dashboard/knowledge-base/knowledge-insights";
import { KnowledgeKpiCard } from "@/components/dashboard/knowledge-base/knowledge-kpi-card";
import { KnowledgeWorkspace } from "@/components/dashboard/knowledge-base/knowledge-workspace";
import { knowledgeArticles, knowledgeKpis } from "@/data/knowledge-base";

export const metadata: Metadata = { title: "Knowledge Base" };

export default function KnowledgeBasePage() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="Knowledge Base dashboard"
    >
      {knowledgeKpis.map((metric) => (
        <KnowledgeKpiCard
          key={metric.id}
          metric={metric}
          className="col-span-6 xl:col-span-3"
        />
      ))}
      <div className="col-span-12 min-w-0">
        <KnowledgeWorkspace initialArticles={knowledgeArticles} />
      </div>
      <KnowledgeInsights />
    </section>
  );
}
