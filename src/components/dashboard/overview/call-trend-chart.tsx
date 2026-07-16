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
import { callTrendData } from "@/data/overview";
import { cn } from "@/lib/utils";

const periods = ["Daily", "Weekly", "Monthly"] as const;
type Period = (typeof periods)[number];

export function CallTrendChart({
  className,
}: Readonly<{ className?: string }>) {
  const [period, setPeriod] = useState<Period>("Weekly");

  return (
    <Card
      data-testid="call-trend-chart"
      className={cn("h-full min-w-0", className)}
    >
      <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Call Trend</CardTitle>
          <p className="mt-1 text-xs text-[#7a8498]">May 12 – May 18</p>
        </div>
        <div
          className="inline-flex w-fit rounded-xl bg-[#f1f4fa] p-1"
          role="group"
          aria-label="Call trend time range"
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
        <p className="sr-only">
          Calls increased from 142 on May 12 to 237 on May 18, with daily
          fluctuations.
        </p>
        <div className="h-[250px] w-full" aria-label="Call trend area chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[...callTrendData]}
              margin={{ top: 8, right: 12, left: 8, bottom: 0 }}
              accessibilityLayer
            >
              <CartesianGrid
                stroke="#e8edf5"
                strokeDasharray="3 5"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7a8498", fontSize: 11 }}
                tickMargin={12}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#929aad", fontSize: 11 }}
                tickMargin={8}
                width={38}
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
                formatter={(value) => [`${value} calls`, "Calls"]}
              />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#2878FF"
                strokeWidth={2.5}
                fill="#2878FF"
                fillOpacity={0.08}
                dot={{
                  r: 3,
                  fill: "#ffffff",
                  stroke: "#2878FF",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5,
                  fill: "#2878FF",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
