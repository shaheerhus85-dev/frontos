"use client";

import { useMemo, useState } from "react";

import { LeadDetailSheet } from "@/components/dashboard/leads/lead-detail-sheet";
import { LeadsList } from "@/components/dashboard/leads/leads-list";
import { LeadsPipeline } from "@/components/dashboard/leads/leads-pipeline";
import {
  LeadsToolbar,
  type LeadAgentFilter,
  type LeadSourceFilter,
  type LeadStageFilter,
  type LeadsView,
} from "@/components/dashboard/leads/leads-toolbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeadRecord } from "@/data/leads";

type LeadsWorkspaceProps = Readonly<{
  leads: readonly LeadRecord[];
}>;

export function LeadsWorkspace({ leads }: LeadsWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<LeadStageFilter>("All");
  const [source, setSource] = useState<LeadSourceFilter>("All");
  const [agent, setAgent] = useState<LeadAgentFilter>("All");
  const [view, setView] = useState<LeadsView>("pipeline");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        query.length === 0 ||
        lead.name.toLowerCase().includes(query) ||
        lead.company?.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query);
      const matchesStage = stage === "All" || lead.stage === stage;
      const matchesSource = source === "All" || lead.source === source;
      const matchesAgent = agent === "All" || lead.agent === agent;

      return matchesSearch && matchesStage && matchesSource && matchesAgent;
    });
  }, [agent, leads, search, source, stage]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    stage !== "All" ||
    source !== "All" ||
    agent !== "All";

  function clearFilters() {
    setSearch("");
    setStage("All");
    setSource("All");
    setAgent("All");
  }

  function openLead(lead: LeadRecord) {
    setFeedback(null);
    setSelectedLead(lead);
  }

  return (
    <>
      <Card className="min-w-0 overflow-hidden" data-testid="leads-workspace">
        <CardHeader className="flex-row items-end justify-between gap-4 pb-5">
          <div>
            <CardTitle>Lead pipeline</CardTitle>
            <p className="mt-1 text-sm text-secondary">
              Qualify opportunities and keep every prospect moving forward.
            </p>
          </div>
          <p className="hidden shrink-0 text-xs font-semibold text-muted sm:block">
            {leads.length} active records
          </p>
        </CardHeader>

        <LeadsToolbar
          search={search}
          stage={stage}
          source={source}
          agent={agent}
          view={view}
          resultCount={filteredLeads.length}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearch}
          onStageChange={setStage}
          onSourceChange={setSource}
          onAgentChange={setAgent}
          onViewChange={setView}
          onClear={clearFilters}
        />

        {view === "pipeline" ? (
          <LeadsPipeline leads={filteredLeads} onSelect={openLead} />
        ) : (
          <LeadsList leads={filteredLeads} onSelect={openLead} />
        )}
      </Card>

      <LeadDetailSheet
        lead={selectedLead}
        feedback={feedback}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedLead(null);
            setFeedback(null);
          }
        }}
        onAction={setFeedback}
      />
    </>
  );
}
