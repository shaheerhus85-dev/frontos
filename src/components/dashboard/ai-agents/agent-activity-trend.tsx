"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  dailyAgentTrend,
  weeklyAgentTrend,
  type TrendPoint,
} from "@/data/ai-agents";
import { cn } from "@/lib/utils";

const periods = ["Daily", "Weekly"] as const;
type Period = (typeof periods)[number];

function summaryFor(period: Period, data: readonly TrendPoint[]) {
  const completed = data.reduce((sum, point) => sum + point.completed, 0);
  const successful = data.reduce((sum, point) => sum + point.successful, 0);
  const peak = data.reduce((highest, point) =>
    point.completed > highest.completed ? point : highest,
  );

  return `${period} agent activity: ${completed.toLocaleString("en-US")} tasks completed, ${successful.toLocaleString("en-US")} successful, with peak activity of ${peak.completed} tasks at ${peak.label}.`;
}

export function AgentActivityTrend({
  className,
}: Readonly<{ className?: string }>) {
  const [period, setPeriod] = useState<Period>("Weekly");
  const data = period === "Daily" ? dailyAgentTrend : weeklyAgentTrend;

  return (
    <Card
      className={cn("h-full min-w-0", className)}
      data-testid="agent-activity-trend"
    >
      <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Agent Activity Trend</CardTitle>
          <p className="mt-1 text-xs text-muted">
            Completed and successful tasks
          </p>
        </div>
        <div
          className="inline-flex w-fit rounded-xl bg-[#f1f4fa] p-1"
          role="group"
          aria-label="Agent activity time range"
        >
          {periods.map((option) => (
            <button
              key={option}
              type="button"
              className={cn(
                "h-8 rounded-lg px-3 text-xs font-semibold transition-[background-color,color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                period === option
                  ? "bg-surface text-[#1f67d7] shadow-[0_1px_3px_rgb(16_21_37/0.08)]"
                  : "text-[#758096] hover:text-[#2d3950]",
              )}
              aria-pressed={period === option}
              onClick={() => setPeriod(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-5 sm:px-5">
        <p className="sr-only" role="status" aria-live="polite">
          {summaryFor(period, data)}
        </p>
        <div
          className="h-[260px] w-full"
          aria-label={`${period} agent activity area chart`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[...data]}
              margin={{ top: 8, right: 12, left: 4, bottom: 0 }}
              accessibilityLayer
            >
              <defs>
                <linearGradient
                  id="agentCompletedFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2878ff" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#2878ff" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#e8edf5"
                strokeDasharray="3 5"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7a8498", fontSize: 11 }}
                tickMargin={12}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#929aad", fontSize: 11 }}
                tickMargin={7}
                width={34}
              />
              <Tooltip
                cursor={{ stroke: "#b8cdf4", strokeDasharray: "3 3" }}
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #e3e8f2",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgb(16 21 37 / 0.08)",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#5f687c", marginBottom: "4px" }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="#2878ff"
                strokeWidth={2.5}
                fill="url(#agentCompletedFill)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#2878ff",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="successful"
                name="Successful"
                stroke="#7457ff"
                strokeWidth={2}
                fill="transparent"
                strokeDasharray="5 4"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#7457ff",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-5 text-[11px] font-medium text-secondary">
          <span className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full bg-violet"
              aria-hidden="true"
            />
            Successful
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
