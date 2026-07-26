"use client";

import {
  Archive,
  Bot,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FilePenLine,
  Gauge,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  FreshnessBadge,
  KnowledgeStatusBadge,
} from "@/components/dashboard/knowledge-base/knowledge-badges";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { KnowledgeArticle } from "@/data/knowledge-base";

function Detail({
  icon: Icon,
  label,
  value,
}: Readonly<{ icon: typeof Bot; label: string; value: React.ReactNode }>) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-[#fafbfe] p-3">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.04em] text-muted uppercase">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </p>
      <div className="mt-1.5 text-sm font-semibold break-words text-[#27334a]">
        {value}
      </div>
    </div>
  );
}

function Chips({
  title,
  values,
  tone = "blue",
}: Readonly<{
  title: string;
  values: readonly string[];
  tone?: "blue" | "violet";
}>) {
  return (
    <div className="rounded-xl border border-border bg-[#fafbfe] p-3">
      <p className="text-[10px] font-semibold tracking-[0.04em] text-muted uppercase">
        {title}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {values.length ? (
          values.map((value) => (
            <span
              key={value}
              className={
                tone === "blue"
                  ? "rounded-full border border-[#d7e2f6] bg-[#f1f6ff] px-2 py-1 text-[11px] font-semibold text-[#41658e]"
                  : "rounded-full border border-[#e3dcfb] bg-[#f8f6ff] px-2 py-1 text-[11px] font-semibold text-[#625485]"
              }
            >
              {value}
            </span>
          ))
        ) : (
          <span className="text-xs text-muted">None linked</span>
        )}
      </div>
    </div>
  );
}

function HealthList({
  title,
  items,
  tone,
}: Readonly<{
  title: string;
  items: readonly string[];
  tone: "good" | "warning";
}>) {
  const Icon = tone === "good" ? CheckCircle2 : CircleAlert;
  return (
    <section>
      <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
        <Icon
          className={
            tone === "good" ? "size-4 text-success" : "size-4 text-warning"
          }
          aria-hidden="true"
        />
        {title}
      </h3>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={
              tone === "good"
                ? "flex gap-2 rounded-xl border border-[#d6eadf] bg-[#f3fbf7] px-3 py-2.5 text-sm leading-5 text-[#4d6c61]"
                : "flex gap-2 rounded-xl border border-[#f0dfbd] bg-[#fffaf0] px-3 py-2.5 text-sm leading-5 text-[#786548]"
            }
          >
            <span
              className={
                tone === "good"
                  ? "mt-2 size-1.5 shrink-0 rounded-full bg-success"
                  : "mt-2 size-1.5 shrink-0 rounded-full bg-warning"
              }
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

type Props = Readonly<{
  article: KnowledgeArticle | null;
  feedback: string | null;
  onOpenChange: (open: boolean) => void;
  onMarkReviewed: (article: KnowledgeArticle) => void;
  onTogglePublished: (article: KnowledgeArticle) => void;
  onArchive: (article: KnowledgeArticle) => void;
  onAction: (message: string) => void;
}>;

export function ArticleDetailSheet({
  article,
  feedback,
  onOpenChange,
  onMarkReviewed,
  onTogglePublished,
  onArchive,
  onAction,
}: Props) {
  return (
    <Sheet open={Boolean(article)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close article details"
        className="w-[calc(100vw-0.5rem)] max-w-none sm:w-[min(45rem,calc(100vw-2rem))]"
        data-testid="article-detail-sheet"
      >
        {article ? (
          <>
            <SheetHeader className="pr-16">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-primary">
                  {article.category}
                </span>
                <KnowledgeStatusBadge status={article.status} />
              </div>
              <SheetTitle className="mt-1 leading-6">
                {article.title}
              </SheetTitle>
              <SheetDescription>
                Article details, AI usage, performance, and knowledge health.
              </SheetDescription>
            </SheetHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <section aria-labelledby="core-information">
                <h3
                  id="core-information"
                  className="font-display text-sm font-semibold"
                >
                  Core information
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Detail
                    icon={UserRound}
                    label="Owner"
                    value={article.owner}
                  />
                  <Detail
                    icon={FilePenLine}
                    label="Source"
                    value={article.source}
                  />
                  <Detail
                    icon={CalendarDays}
                    label="Created"
                    value={article.createdAt}
                  />
                  <Detail
                    icon={Clock3}
                    label="Last updated"
                    value={article.updatedAt}
                  />
                  <Detail
                    icon={CheckCircle2}
                    label="Last reviewed"
                    value={article.lastReviewedAt}
                  />
                  <Detail
                    icon={CalendarDays}
                    label="Next review"
                    value={article.nextReviewAt}
                  />
                </div>
              </section>
              <section className="mt-5" aria-labelledby="performance">
                <h3
                  id="performance"
                  className="font-display text-sm font-semibold"
                >
                  Performance
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Detail
                    icon={Bot}
                    label="Usage"
                    value={article.usageCount.toLocaleString("en-US")}
                  />
                  <Detail
                    icon={CheckCircle2}
                    label="Answer success"
                    value={`${article.successRate}%`}
                  />
                  <Detail
                    icon={Gauge}
                    label="Confidence"
                    value={`${article.confidenceScore}%`}
                  />
                  <Detail
                    icon={Sparkles}
                    label="Freshness"
                    value={
                      <FreshnessBadge freshness={article.freshnessStatus} />
                    }
                  />
                </div>
              </section>
              <section className="mt-5">
                <h3 className="font-display text-sm font-semibold">
                  Content preview
                </h3>
                <p className="mt-2 rounded-2xl border border-border bg-[#fafbfe] p-4 text-sm leading-6 text-[#526078]">
                  {article.contentPreview}
                </p>
              </section>
              <section className="mt-5" aria-labelledby="ai-usage">
                <h3
                  id="ai-usage"
                  className="font-display text-sm font-semibold"
                >
                  AI usage
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Chips
                    title="Linked AI agents"
                    values={article.linkedAgents}
                  />
                  <Chips
                    title="Linked channels"
                    values={article.linkedChannels}
                    tone="violet"
                  />
                  <Chips
                    title="Common customer questions"
                    values={article.relatedQuestions}
                  />
                  <Chips title="Tags" values={article.tags} tone="violet" />
                </div>
              </section>
              <section
                className="mt-5 space-y-4"
                aria-labelledby="knowledge-health"
              >
                <h3
                  id="knowledge-health"
                  className="font-display text-sm font-semibold"
                >
                  Knowledge health
                </h3>
                <HealthList
                  title="Strengths"
                  items={article.strengths}
                  tone="good"
                />
                <HealthList
                  title="Missing information"
                  items={article.missingInformation}
                  tone="warning"
                />
                <HealthList
                  title="Review risks"
                  items={article.reviewRisks}
                  tone="warning"
                />
                <div className="rounded-2xl border border-[#d9e4fb] bg-[#f5f8ff] p-4">
                  <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-[#253654]">
                    <Sparkles
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    Recommended next action
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#52627d]">
                    {article.recommendedAction}
                  </p>
                </div>
              </section>
              <section className="mt-5">
                <h3 className="font-display text-sm font-semibold">
                  Recent activity
                </h3>
                <ol className="mt-3">
                  {article.recentActivity.map((activity, index) => (
                    <li
                      key={activity.id}
                      className="relative flex gap-3 pb-5 last:pb-0"
                    >
                      {index < article.recentActivity.length - 1 ? (
                        <span
                          className="absolute top-3 bottom-0 left-[5px] w-px bg-border"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span
                        className="relative mt-1.5 size-3 shrink-0 rounded-full border-2 border-surface bg-primary"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-[#344057]">
                          {activity.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-5 text-secondary">
                          {activity.detail}
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          {activity.time}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
            <footer className="shrink-0 border-t border-border bg-surface px-4 py-4 sm:px-6">
              {feedback ? (
                <p
                  className="mb-3 rounded-xl border border-[#cfe0ff] bg-[#edf4ff] px-3 py-2.5 text-sm leading-5 font-medium text-[#315b9e]"
                  role="status"
                  aria-live="polite"
                >
                  {feedback}
                </p>
              ) : null}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    onAction(
                      "Edit mode is a local preview; no article content was changed.",
                    )
                  }
                >
                  <FilePenLine className="size-4" aria-hidden="true" />
                  Edit article
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onMarkReviewed(article)}
                >
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  Mark reviewed
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onTogglePublished(article)}
                >
                  <Send className="size-4" aria-hidden="true" />
                  {article.status === "Published" ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-error hover:text-error"
                  onClick={() => onArchive(article)}
                >
                  <Archive className="size-4" aria-hidden="true" />
                  Archive
                </Button>
              </div>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
