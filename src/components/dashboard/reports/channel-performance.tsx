import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  channelPerformance,
  type ChannelPerformanceRecord,
} from "@/data/reports";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function Trend({ record }: Readonly<{ record: ChannelPerformanceRecord }>) {
  const Icon =
    record.trend === "up"
      ? ArrowUpRight
      : record.trend === "down"
        ? ArrowDownRight
        : ArrowRight;
  const label =
    record.trend === "up" ? "Up" : record.trend === "down" ? "Down" : "Steady";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold",
        record.trend === "up"
          ? "text-[#168861]"
          : record.trend === "down"
            ? "text-[#c34558]"
            : "text-[#667187]",
      )}
      aria-label={`${label} ${record.trendValue}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {record.trendValue}
    </span>
  );
}

export function ChannelPerformance() {
  return (
    <Card
      data-testid="channel-performance"
      className="col-span-12 min-w-0 overflow-hidden"
    >
      <CardHeader className="pb-5">
        <CardTitle>Channel performance</CardTitle>
        <p className="text-sm text-secondary">
          Qualified lead sources and their contribution to booking revenue.
        </p>
      </CardHeader>
      <div
        className="hidden overflow-x-auto sm:block"
        data-testid="channel-performance-table"
      >
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead className="border-y border-border bg-[#fafbfe] text-[11px] font-semibold tracking-[0.04em] text-[#778196] uppercase">
            <tr>
              <th className="px-6 py-3">Channel</th>
              <th className="px-4 py-3 text-right">Leads</th>
              <th className="px-4 py-3 text-right">Bookings</th>
              <th className="px-4 py-3 text-right">Conversion</th>
              <th className="px-4 py-3 text-right">Revenue</th>
              <th className="px-6 py-3 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {channelPerformance.map((record) => (
              <tr
                key={record.id}
                data-testid={`channel-row-${record.id}`}
                className="text-sm text-[#344057]"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-semibold text-[#27334a]"
                >
                  {record.channel}
                </th>
                <td className="px-4 py-4 text-right tabular-nums">
                  {record.leads}
                </td>
                <td className="px-4 py-4 text-right tabular-nums">
                  {record.bookings}
                </td>
                <td className="px-4 py-4 text-right font-medium tabular-nums">
                  {record.conversionRate}%
                </td>
                <td className="px-4 py-4 text-right font-semibold tabular-nums">
                  {currency.format(record.revenue)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Trend record={record} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-border bg-[#fafbfe] text-sm font-semibold text-[#27334a]">
            <tr>
              <th className="px-6 py-3.5">Total</th>
              <td className="px-4 py-3.5 text-right">586</td>
              <td className="px-4 py-3.5 text-right">428</td>
              <td className="px-4 py-3.5 text-right">73.0%</td>
              <td className="px-4 py-3.5 text-right">$186,420</td>
              <td className="px-6 py-3.5 text-right text-xs text-muted">
                Selected period
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div
        className="space-y-3 px-4 pb-4 sm:hidden"
        data-testid="channel-performance-mobile"
      >
        {channelPerformance.map((record) => (
          <article
            key={record.id}
            data-testid={`channel-card-${record.id}`}
            className="rounded-xl border border-border bg-[#fbfcff] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold text-[#27334a]">
                {record.channel}
              </h4>
              <Trend record={record} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs">
              <div>
                <dt className="text-muted">Leads</dt>
                <dd className="mt-0.5 font-semibold text-[#344057]">
                  {record.leads}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Bookings</dt>
                <dd className="mt-0.5 font-semibold text-[#344057]">
                  {record.bookings}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Conversion</dt>
                <dd className="mt-0.5 font-semibold text-[#344057]">
                  {record.conversionRate}%
                </dd>
              </div>
              <div>
                <dt className="text-muted">Revenue</dt>
                <dd className="mt-0.5 font-semibold text-[#344057]">
                  {currency.format(record.revenue)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </Card>
  );
}
