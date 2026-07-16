import { CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { upcomingEntries } from "@/data/overview";
import { cn } from "@/lib/utils";

export function Upcoming({ className }: Readonly<{ className?: string }>) {
  return (
    <Card data-testid="upcoming" className={cn("h-full min-w-0", className)}>
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pt-3 pb-2 sm:px-6">
        <ul aria-label="Upcoming schedule">
          {upcomingEntries.map((entry) => (
            <li
              key={entry.title}
              className="flex min-w-0 items-start gap-3 border-b border-border py-4 first:pt-2 last:border-0"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#edf4ff] text-primary">
                <CalendarClock
                  className="size-[17px] stroke-[1.8]"
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#1a2338]">
                  {entry.title}
                </p>
                {entry.category ? (
                  <p className="mt-0.5 truncate text-xs text-[#687389]">
                    {entry.category}
                  </p>
                ) : null}
                <time className="mt-1 block text-xs font-medium text-[#7a8498]">
                  {entry.time}
                </time>
              </div>
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
          View calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
