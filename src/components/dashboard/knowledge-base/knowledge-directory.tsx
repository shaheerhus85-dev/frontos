"use client";

import { ChevronRight, CircleUserRound, Eye, Tag } from "lucide-react";

import {
  FreshnessBadge,
  KnowledgeStatusBadge,
} from "@/components/dashboard/knowledge-base/knowledge-badges";
import { Button } from "@/components/ui/button";
import type { KnowledgeArticle } from "@/data/knowledge-base";

export function KnowledgeDirectory({
  articles,
  onSelect,
}: Readonly<{
  articles: readonly KnowledgeArticle[];
  onSelect: (article: KnowledgeArticle) => void;
}>) {
  if (!articles.length)
    return (
      <div className="grid min-h-64 place-items-center px-6 py-12 text-center">
        <div>
          <p className="font-display text-base font-semibold">
            No articles found
          </p>
          <p className="mt-1 text-sm text-secondary">
            Try a different title, owner, category, status, or freshness.
          </p>
        </div>
      </div>
    );
  return (
    <>
      <div
        className="hidden overflow-hidden lg:block"
        data-testid="knowledge-table"
      >
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            Knowledge articles, freshness, and agent usage
          </caption>
          <thead className="bg-[#fafbfe] text-[10px] font-semibold tracking-[0.04em] text-muted uppercase">
            <tr>
              <th className="w-[31%] px-5 py-3" scope="col">
                Article
              </th>
              <th className="w-[11%] px-2.5 py-3" scope="col">
                Category
              </th>
              <th className="w-[13%] px-2.5 py-3" scope="col">
                Status
              </th>
              <th
                className="hidden w-[12%] px-2.5 py-3 min-[1200px]:table-cell"
                scope="col"
              >
                Last updated
              </th>
              <th className="w-[10%] px-2.5 py-3" scope="col">
                Usage
              </th>
              <th
                className="hidden w-[11%] px-2.5 py-3 min-[1400px]:table-cell"
                scope="col"
              >
                Confidence
              </th>
              <th className="w-[13%] px-2.5 py-3" scope="col">
                Freshness
              </th>
              <th
                className="hidden w-[13%] px-2.5 py-3 min-[1200px]:table-cell"
                scope="col"
              >
                Owner
              </th>
              <th className="w-12 px-2.5 py-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map((article) => (
              <tr
                key={article.id}
                data-testid={`knowledge-row-${article.id}`}
                className="group transition-colors focus-within:bg-[#f7f9fd] hover:bg-[#fafbfe]"
              >
                <td className="px-5 py-4">
                  <p className="truncate text-sm font-semibold text-[#182136]">
                    {article.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted">
                    {article.summary}
                  </p>
                </td>
                <td className="px-2.5 py-4 text-xs font-medium text-[#48556d]">
                  {article.category}
                </td>
                <td className="px-2.5 py-4">
                  <KnowledgeStatusBadge status={article.status} />
                </td>
                <td className="hidden px-2.5 py-4 text-xs whitespace-nowrap text-secondary min-[1200px]:table-cell">
                  {article.updatedAt}
                </td>
                <td className="px-2.5 py-4 text-sm font-semibold text-[#344057]">
                  {article.usageCount.toLocaleString("en-US")}
                </td>
                <td className="hidden px-2.5 py-4 min-[1400px]:table-cell">
                  <span className="text-sm font-semibold text-[#344057]">
                    {article.confidenceScore}%
                  </span>
                </td>
                <td className="px-2.5 py-4">
                  <FreshnessBadge freshness={article.freshnessStatus} />
                </td>
                <td className="hidden px-2.5 py-4 text-xs font-medium text-secondary min-[1200px]:table-cell">
                  {article.owner}
                </td>
                <td className="px-2.5 py-4">
                  <Button
                    variant="icon"
                    className="size-9"
                    onClick={() => onSelect(article)}
                    aria-label={`View article details for ${article.title}`}
                    aria-haspopup="dialog"
                  >
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul
        className="divide-y divide-border lg:hidden"
        aria-label="Knowledge library"
      >
        {articles.map((article) => (
          <li key={article.id} data-testid="mobile-knowledge-card">
            <button
              type="button"
              onClick={() => onSelect(article)}
              className="w-full px-4 py-4 text-left transition-colors outline-none hover:bg-[#fafbfe] focus-visible:bg-[#f7f9fd] focus-visible:ring-3 focus-visible:ring-primary/20 sm:px-5"
              aria-label={`View article details for ${article.title}`}
              aria-haspopup="dialog"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-sm leading-5 font-semibold text-[#182136]">
                    {article.title}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                    <Tag className="size-3.5" aria-hidden="true" />
                    {article.category}
                  </span>
                </span>
                <ChevronRight
                  className="mt-1 size-4 shrink-0 text-muted"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-3 flex flex-wrap gap-2">
                <KnowledgeStatusBadge status={article.status} />
                <FreshnessBadge freshness={article.freshnessStatus} />
              </span>
              <span className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="size-3.5" aria-hidden="true" />
                  {article.usageCount.toLocaleString("en-US")} uses
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CircleUserRound className="size-3.5" aria-hidden="true" />
                  {article.owner}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
