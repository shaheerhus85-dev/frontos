import type { Metadata } from "next";

import { AgentActivityTrend } from "@/components/dashboard/ai-agents/agent-activity-trend";
import { AIAgentsKpiCard } from "@/components/dashboard/ai-agents/ai-agents-kpi-card";
import { AIAgentsWorkspace } from "@/components/dashboard/ai-agents/ai-agents-workspace";
import { AttentionRequired } from "@/components/dashboard/ai-agents/attention-required";
import { WorkloadDistribution } from "@/components/dashboard/ai-agents/workload-distribution";
import { agentKpis, aiAgents } from "@/data/ai-agents";

export const metadata: Metadata = {
  title: "AI Agents",
};

export default function AIAgentsPage() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="AI Agents dashboard"
    >
      {agentKpis.map((metric) => (
        <AIAgentsKpiCard
          key={metric.id}
          metric={metric}
          className="col-span-6 xl:col-span-3"
        />
      ))}

      <div className="col-span-12 min-w-0">
        <AIAgentsWorkspace initialAgents={aiAgents} />
      </div>

      <AgentActivityTrend className="col-span-12 xl:col-span-7" />
      <AttentionRequired className="col-span-12 xl:col-span-5" />
      <WorkloadDistribution agents={aiAgents} className="col-span-12" />
    </section>
  );
}
