"use client";

import { useMemo, useState } from "react";

import { ArticleDetailSheet } from "@/components/dashboard/knowledge-base/article-detail-sheet";
import { KnowledgeDirectory } from "@/components/dashboard/knowledge-base/knowledge-directory";
import {
  KnowledgeToolbar,
  type CategoryFilter,
  type FreshnessFilter,
  type KnowledgeSort,
  type StatusFilter,
} from "@/components/dashboard/knowledge-base/knowledge-toolbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { KnowledgeArticle, ReviewPriority } from "@/data/knowledge-base";

const priorityRank: Record<ReviewPriority, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export function KnowledgeWorkspace({
  initialArticles,
}: Readonly<{ initialArticles: readonly KnowledgeArticle[] }>) {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([
    ...initialArticles,
  ]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [freshness, setFreshness] = useState<FreshnessFilter>("All");
  const [sort, setSort] = useState<KnowledgeSort>("recent");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const visibleArticles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles
      .filter(
        (article) =>
          (!query ||
            [
              article.title,
              article.summary,
              article.owner,
              ...article.tags,
            ].some((value) => value.toLowerCase().includes(query))) &&
          (category === "All" || article.category === category) &&
          (status === "All" || article.status === status) &&
          (freshness === "All" || article.freshnessStatus === freshness),
      )
      .sort((a, b) =>
        sort === "usage"
          ? b.usageCount - a.usageCount
          : sort === "confidence"
            ? b.confidenceScore - a.confidenceScore
            : sort === "priority"
              ? priorityRank[b.reviewPriority] - priorityRank[a.reviewPriority]
              : sort === "title"
                ? a.title.localeCompare(b.title)
                : Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
      );
  }, [articles, category, freshness, search, sort, status]);
  const selectedArticle =
    articles.find((article) => article.id === selectedId) ?? null;
  const hasActiveFilters =
    Boolean(search.trim()) ||
    category !== "All" ||
    status !== "All" ||
    freshness !== "All";
  function updateArticle(
    id: string,
    patch: Partial<KnowledgeArticle>,
    message: string,
  ) {
    setArticles((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
    setFeedback(message);
  }
  return (
    <>
      <Card
        className="min-w-0 overflow-hidden"
        data-testid="knowledge-workspace"
      >
        <CardHeader className="flex-row items-end justify-between gap-4 pb-5">
          <div>
            <CardTitle>Knowledge library</CardTitle>
            <p className="mt-1 text-sm text-secondary">
              Review articles, coverage, freshness, and agent usage.
            </p>
          </div>
          <p className="hidden shrink-0 text-xs font-semibold text-muted sm:block">
            {articles.length} article profiles
          </p>
        </CardHeader>
        <KnowledgeToolbar
          search={search}
          category={category}
          status={status}
          freshness={freshness}
          sort={sort}
          resultCount={visibleArticles.length}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
          onFreshnessChange={setFreshness}
          onSortChange={setSort}
          onClear={() => {
            setSearch("");
            setCategory("All");
            setStatus("All");
            setFreshness("All");
          }}
        />
        <KnowledgeDirectory
          articles={visibleArticles}
          onSelect={(article) => {
            setSelectedId(article.id);
            setFeedback(null);
          }}
        />
      </Card>
      <ArticleDetailSheet
        article={selectedArticle}
        feedback={feedback}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedId(null);
            setFeedback(null);
          }
        }}
        onAction={setFeedback}
        onMarkReviewed={(article) =>
          updateArticle(
            article.id,
            { freshnessStatus: "Current", lastReviewedAt: "Jul 26, 2026" },
            `${article.title} was marked reviewed in this local preview.`,
          )
        }
        onTogglePublished={(article) => {
          const next = article.status === "Published" ? "Draft" : "Published";
          updateArticle(
            article.id,
            { status: next },
            `${article.title} is now ${next.toLowerCase()} in this local preview.`,
          );
        }}
        onArchive={(article) =>
          updateArticle(
            article.id,
            { status: "Archived" },
            `${article.title} was archived in this local preview.`,
          )
        }
      />
    </>
  );
}
