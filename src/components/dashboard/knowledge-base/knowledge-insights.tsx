import { AlertTriangle, ArrowUpRight, BookCheck } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { knowledgeAttention, knowledgeCoverage } from "@/data/knowledge-base";

export function KnowledgeInsights() {
  return (
    <section
      className="col-span-12 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5 xl:gap-6"
      aria-label="Knowledge insights"
      data-testid="knowledge-insights"
    >
      <Card data-testid="knowledge-coverage">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookCheck className="size-4 text-primary" aria-hidden="true" />
            Knowledge coverage
          </CardTitle>
          <p className="text-sm text-secondary">
            Coverage of approved answers across each topic.
          </p>
        </CardHeader>
        <div className="grid gap-x-5 gap-y-4 p-5 sm:grid-cols-2 sm:p-6">
          {knowledgeCoverage.map((item) => (
            <div key={item.category}>
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#526078]">
                  {item.category}
                </span>
                <span className="font-semibold text-[#344057]">
                  {item.value}%
                </span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8edf5]"
                role="progressbar"
                aria-label={`${item.category} knowledge coverage`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.value}
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card data-testid="knowledge-attention">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-warning" aria-hidden="true" />
            Attention required
          </CardTitle>
          <p className="text-sm text-secondary">
            Focused updates that will improve answer quality.
          </p>
        </CardHeader>
        <ul className="divide-y divide-border px-5 pb-3 sm:px-6">
          {knowledgeAttention.map((item) => (
            <li key={item.title} className="flex items-center gap-3 py-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#fff7e8] text-warning">
                <AlertTriangle className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-[#27334a]">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-xs text-secondary">
                  {item.detail}
                </span>
              </span>
              <span className="text-[11px] font-semibold text-[#9b671a]">
                {item.priority}
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
