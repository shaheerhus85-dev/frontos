"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyPerformance, weeklyPerformance } from "@/data/reports";
import { cn } from "@/lib/utils";

const periods = ["Weekly", "Monthly"] as const;
type Period = (typeof periods)[number];

const compactCurrency = new Intl.NumberFormat("en-US", {
  notation: "compact",
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function PerformanceOverview() {
  const [period, setPeriod] = useState<Period>("Weekly");
  const data = period === "Weekly" ? weeklyPerformance : monthlyPerformance;
  const summary =
    period === "Weekly"
      ? "Weekly view: 7 daily points totaling $186,420 in revenue and 396 completed bookings."
      : "Monthly view: 6 monthly points showing growth from $121,800 to $186,420 and 284 to 396 completed bookings.";

  return (
    <Card
      data-testid="performance-overview"
      className="col-span-12 min-w-0 overflow-hidden xl:col-span-7"
    >
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <CardTitle>Performance overview</CardTitle>
          <p className="mt-1 text-sm text-secondary">
            Revenue and completed bookings across the selected period.
          </p>
        </div>
        <div
          className="inline-flex w-fit shrink-0 rounded-xl bg-[#f1f4fa] p-1"
          role="group"
          aria-label="Performance time range"
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
        <p data-testid="performance-summary" className="sr-only">
          {summary}
        </p>
        <div
          className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 px-3 text-[11px] font-semibold text-[#5e6980]"
          aria-label="Performance chart legend"
        >
          <span className="inline-flex items-center gap-2">
            <span
              className="h-0.5 w-5 rounded-full bg-primary"
              aria-hidden="true"
            />
            Revenue (USD)
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-0.5 w-5 rounded-full bg-violet"
              aria-hidden="true"
            />
            Completed bookings
          </span>
        </div>
        <div
          className="h-[270px] w-full"
          aria-label={`${period} revenue and completed bookings line chart`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[...data]}
              margin={{ top: 8, right: 2, left: 2, bottom: 0 }}
              accessibilityLayer
            >
              <CartesianGrid
                stroke="#e8edf5"
                strokeDasharray="3 5"
                vertical={false}
              />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7a8498", fontSize: 10 }}
                tickMargin={12}
                interval="preserveStartEnd"
                minTickGap={18}
              />
              <YAxis
                yAxisId="revenue"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#929aad", fontSize: 10 }}
                tickFormatter={(value) => compactCurrency.format(Number(value))}
                width={48}
              />
              <YAxis
                yAxisId="bookings"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#929aad", fontSize: 10 }}
                width={32}
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
                formatter={(value, name) =>
                  name === "Revenue"
                    ? [currency.format(Number(value)), "Revenue"]
                    : [`${value} bookings`, "Completed bookings"]
                }
              />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#2878ff"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#fff", stroke: "#2878ff", strokeWidth: 2 }}
                activeDot={{
                  r: 5,
                  fill: "#2878ff",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                isAnimationActive={false}
              />
              <Line
                yAxisId="bookings"
                type="monotone"
                dataKey="bookings"
                name="Completed bookings"
                stroke="#7457ff"
                strokeWidth={2.25}
                dot={{ r: 3, fill: "#fff", stroke: "#7457ff", strokeWidth: 2 }}
                activeDot={{
                  r: 5,
                  fill: "#7457ff",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
