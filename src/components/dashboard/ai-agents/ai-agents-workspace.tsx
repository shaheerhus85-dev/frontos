"use client";

import { useMemo, useState } from "react";

import { AgentDetailSheet } from "@/components/dashboard/ai-agents/agent-detail-sheet";
import { AgentDirectory } from "@/components/dashboard/ai-agents/agent-directory";
import {
  AgentsToolbar,
  type AgentFunctionFilter,
  type AgentSort,
  type AgentStatusFilter,
} from "@/components/dashboard/ai-agents/agents-toolbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { AIAgent } from "@/data/ai-agents";

export function AIAgentsWorkspace({
  initialAgents,
}: Readonly<{ initialAgents: readonly AIAgent[] }>) {
  const [agents, setAgents] = useState<AIAgent[]>([...initialAgents]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AgentStatusFilter>("All");
  const [agentFunction, setAgentFunction] =
    useState<AgentFunctionFilter>("All");
  const [sort, setSort] = useState<AgentSort>("performance");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const visibleAgents = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = agents.filter((agent) => {
      const matchesSearch =
        query.length === 0 ||
        agent.name.toLowerCase().includes(query) ||
        agent.role.toLowerCase().includes(query) ||
        agent.responsibility.toLowerCase().includes(query);
      const matchesStatus = status === "All" || agent.status === status;
      const matchesFunction =
        agentFunction === "All" || agent.function === agentFunction;

      return matchesSearch && matchesStatus && matchesFunction;
    });

    return [...filtered].sort((first, second) => {
      if (sort === "tasks") {
        return second.tasksHandled - first.tasksHandled;
      }
      if (sort === "response") {
        return first.responseTimeSeconds - second.responseTimeSeconds;
      }
      if (sort === "name") {
        return first.name.localeCompare(second.name);
      }
      return second.successRate - first.successRate;
    });
  }, [agentFunction, agents, search, sort, status]);

  const selectedAgent =
    agents.find((agent) => agent.id === selectedAgentId) ?? null;
  const hasActiveFilters =
    search.trim().length > 0 || status !== "All" || agentFunction !== "All";

  function clearFilters() {
    setSearch("");
    setStatus("All");
    setAgentFunction("All");
  }

  function openAgent(agent: AIAgent) {
    setSelectedAgentId(agent.id);
    setFeedback(null);
  }

  function toggleStatus(agent: AIAgent) {
    const nextStatus = agent.status === "Paused" ? "Active" : "Paused";
    setAgents((current) =>
      current.map((item) =>
        item.id === agent.id ? { ...item, status: nextStatus } : item,
      ),
    );
    setFeedback(
      nextStatus === "Paused"
        ? `${agent.name} paused in this local preview; no persistent configuration was changed.`
        : `${agent.name} resumed in this local preview; no persistent configuration was changed.`,
    );
  }

  return (
    <>
      <Card
        className="min-w-0 overflow-hidden"
        data-testid="ai-agents-workspace"
      >
        <CardHeader className="flex-row items-end justify-between gap-4 pb-5">
          <div>
            <CardTitle>Agent directory</CardTitle>
            <p className="mt-1 text-sm text-secondary">
              Monitor responsibilities, performance, and live operating state.
            </p>
          </div>
          <p className="hidden shrink-0 text-xs font-semibold text-muted sm:block">
            {agents.length} configured agents
          </p>
        </CardHeader>

        <AgentsToolbar
          search={search}
          status={status}
          agentFunction={agentFunction}
          sort={sort}
          resultCount={visibleAgents.length}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onFunctionChange={setAgentFunction}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        <AgentDirectory agents={visibleAgents} onSelect={openAgent} />
      </Card>

      <AgentDetailSheet
        agent={selectedAgent}
        feedback={feedback}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAgentId(null);
            setFeedback(null);
          }
        }}
        onToggleStatus={toggleStatus}
        onAction={setFeedback}
      />
    </>
  );
}
