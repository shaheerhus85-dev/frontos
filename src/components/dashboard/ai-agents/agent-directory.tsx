import { BotOff } from "lucide-react";

import { AgentCard } from "@/components/dashboard/ai-agents/agent-card";
import type { AIAgent } from "@/data/ai-agents";

export function AgentDirectory({
  agents,
  onSelect,
}: Readonly<{
  agents: readonly AIAgent[];
  onSelect: (agent: AIAgent) => void;
}>) {
  if (agents.length === 0) {
    return (
      <div className="grid min-h-72 place-items-center px-5 py-12 text-center">
        <div>
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#f0f3f9] text-muted">
            <BotOff className="size-5" aria-hidden="true" />
          </span>
          <h3 className="mt-3 font-display text-base font-semibold">
            No agents found
          </h3>
          <p className="mt-1 text-sm text-secondary">
            Try a different search or clear the active filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3 xl:p-6"
      data-testid="agent-directory"
    >
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} onSelect={onSelect} />
      ))}
    </div>
  );
}
