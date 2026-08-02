"use client";

import { Search, Sparkles, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { SuggestedSearch } from "@/data/help-support";

export function SupportSearch({
  query,
  resultCount,
  suggestions,
  onQueryChange,
  onSuggestionSelect,
}: Readonly<{
  query: string;
  resultCount: number;
  suggestions: readonly SuggestedSearch[];
  onQueryChange: (query: string) => void;
  onSuggestionSelect: (suggestion: SuggestedSearch) => void;
}>) {
  return (
    <Card
      data-testid="support-hero"
      className="relative min-w-0 overflow-hidden border-[#d8e4fa] bg-[linear-gradient(135deg,#ffffff_0%,#f6f9ff_58%,#faf8ff_100%)] px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-6"
    >
      <span
        className="pointer-events-none absolute -top-16 -right-12 size-44 rounded-full bg-primary/8 blur-2xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -bottom-20 left-1/3 size-40 rounded-full bg-violet/8 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d9e4fb] bg-white/80 px-2.5 py-1 text-xs font-semibold text-[#41658e]">
            <Sparkles className="size-3.5 text-violet" aria-hidden="true" />
            FrontOS support center
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[#11182a] sm:text-3xl">
            How can we help?
          </h2>
        </div>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
          Search practical guidance for configuring, monitoring, and supporting
          your FrontOS workspace.
        </p>

        <div className="relative mt-4 max-w-4xl">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-primary"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Search help resources"
            placeholder="Search setup, AI agents, integrations, reports, or workspace settings"
            className="h-12 rounded-2xl border-[#cbd9ef] bg-white pr-12 pl-12 text-base shadow-[0_8px_24px_rgb(30_72_130/0.08)]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="absolute top-1/2 right-2.5 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-secondary transition-colors outline-none hover:bg-surface-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/20"
              aria-label="Clear help search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
        <p
          className="mt-1.5 min-h-5 text-xs font-medium text-[#61708a]"
          role="status"
          aria-live="polite"
        >
          {query
            ? `${resultCount} matching ${resultCount === 1 ? "article" : "articles"}`
            : "Search across help categories and popular articles."}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold text-[#687389]">
            Suggested:
          </span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              onClick={() => onSuggestionSelect(suggestion)}
              className="min-h-9 rounded-full border border-[#d7e2f4] bg-white/90 px-3 text-xs font-semibold text-[#4b607e] transition-[border-color,background-color,color] outline-none hover:border-[#b9cbed] hover:bg-[#f5f8ff] hover:text-primary focus-visible:ring-3 focus-visible:ring-primary/20"
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
