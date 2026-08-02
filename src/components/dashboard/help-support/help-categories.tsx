"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BookOpenText,
  Bot,
  CalendarCheck2,
  PhoneCall,
  PlugZap,
  Rocket,
  Settings2,
} from "lucide-react";

import type { HelpCategory, HelpCategoryId } from "@/data/help-support";

const categoryIcons: Record<HelpCategoryId, LucideIcon> = {
  "getting-started": Rocket,
  "calls-conversations": PhoneCall,
  "bookings-leads": CalendarCheck2,
  "ai-agents": Bot,
  "knowledge-base": BookOpenText,
  integrations: PlugZap,
  reports: BarChart3,
  "workspace-settings": Settings2,
};

export function HelpCategories({
  categories,
  onSelect,
}: Readonly<{
  categories: readonly HelpCategory[];
  onSelect: (category: HelpCategory) => void;
}>) {
  return (
    <section aria-labelledby="help-categories-heading">
      <div className="mb-3">
        <h2
          id="help-categories-heading"
          className="font-display text-lg font-semibold tracking-tight text-[#182136]"
        >
          Help categories
        </h2>
        <p className="mt-1 text-sm text-secondary">
          Browse operational guidance by FrontOS workspace area.
        </p>
      </div>
      {categories.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id];
            return (
              <article
                key={category.id}
                className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-4 shadow-subtle"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f1f5ff] text-primary">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-[#f1f4fa] px-2.5 py-1 text-xs font-semibold text-[#687389]">
                    {category.articleCount} articles
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-[#27334a]">
                  {category.title}
                </h3>
                <p className="mt-1 [display:-webkit-box] overflow-hidden text-[13px] leading-5 text-secondary [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                  {category.description}
                </p>
                <ul className="mt-3 space-y-1.5 border-t border-border pt-2.5">
                  {category.featuredArticles.map((article) => (
                    <li
                      key={article}
                      className="flex gap-2 text-xs leading-5 text-[#526078]"
                    >
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-[#87aef2]"
                        aria-hidden="true"
                      />
                      {article}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onSelect(category)}
                  aria-label={`View ${category.title} articles`}
                  className="mt-auto inline-flex min-h-10 items-center gap-1.5 self-start pt-3 text-sm font-semibold text-primary transition-colors outline-none hover:text-[#1a63d4] focus-visible:rounded-lg focus-visible:ring-3 focus-visible:ring-primary/20"
                >
                  View articles
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border-strong bg-surface px-5 py-10 text-center">
          <p className="font-semibold text-[#344057]">No matching categories</p>
          <p className="mt-1 text-sm text-secondary">
            Try a broader search or clear the current query.
          </p>
        </div>
      )}
    </section>
  );
}
