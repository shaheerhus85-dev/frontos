"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceBookings } from "@/data/overview";
import { cn } from "@/lib/utils";

export function ServicesChart({ className }: Readonly<{ className?: string }>) {
  return (
    <Card
      data-testid="top-services-chart"
      className={cn("h-full min-w-0", className)}
    >
      <CardHeader>
        <CardTitle>Top Services Booked</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <p className="sr-only">
          328 total bookings: Consultation 45%, Cleaning 25%, Support 20%, and
          Other 10%.
        </p>
        <div
          className="relative mx-auto h-[190px] w-full max-w-[260px]"
          aria-label="Services donut chart"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart accessibilityLayer>
              <Pie
                data={[...serviceBookings]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={78}
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {serviceBookings.map((service) => (
                  <Cell key={service.name} fill={service.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #e3e8f2",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgb(16 21 37 / 0.08)",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${value}%`, "Bookings"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
            <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-[#151d30]">
              328
            </span>
            <span className="mt-0.5 text-[11px] font-medium text-[#8a93a5]">
              Total
            </span>
          </div>
        </div>
        <ul
          className="grid grid-cols-2 gap-x-4 gap-y-2.5"
          aria-label="Service booking legend"
        >
          {serviceBookings.map((service) => (
            <li
              key={service.name}
              className="flex min-w-0 items-center gap-2 text-xs"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: service.color }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-[#5f687c]">
                {service.name}
              </span>
              <span className="font-semibold text-[#263248]">
                {service.value}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
