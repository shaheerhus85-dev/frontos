import { ChevronRight } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recentActivity } from "@/data/overview";
import { cn } from "@/lib/utils";

export function RecentActivity({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <Card
      data-testid="recent-activity"
      className={cn("h-full min-w-0", className)}
    >
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pt-3 pb-2 sm:px-6">
        <ul aria-label="Recent activity entries">
          {recentActivity.map((entry) => (
            <li
              key={entry.name}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-3.5 last:border-0 sm:grid-cols-[auto_minmax(0,1fr)_minmax(8rem,.85fr)_auto] md:grid-cols-[auto_minmax(0,1fr)_minmax(8rem,.85fr)_auto_auto]"
            >
              <Avatar fallback={entry.initials} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1a2338]">
                  {entry.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-[#7a8498] sm:hidden">
                  {entry.action} · {entry.category}
                </p>
                <time className="mt-1 block text-[11px] text-[#8a93a5] sm:hidden">
                  {entry.time}
                </time>
              </div>
              <div className="hidden min-w-0 sm:block">
                <p className="truncate text-sm font-medium text-[#3f4b63]">
                  {entry.action}
                </p>
                <p className="mt-0.5 truncate text-xs text-[#8a93a5]">
                  {entry.category}
                </p>
              </div>
              <time className="hidden text-xs whitespace-nowrap text-[#7a8498] md:block">
                {entry.time}
              </time>
              <ChevronRight
                className="size-4 shrink-0 stroke-[1.8] text-[#a0a8b8]"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-end py-3">
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="text-primary disabled:opacity-100"
        >
          View all activity
        </Button>
      </CardFooter>
    </Card>
  );
}
