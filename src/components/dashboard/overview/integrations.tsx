import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Integration } from "@/data/overview";
import { integrations } from "@/data/overview";
import { cn } from "@/lib/utils";

const shortLabels: Record<Integration["id"], string> = {
  calendar: "Calendar",
  gmail: "Gmail",
  hubspot: "HubSpot",
  slack: "Slack",
  sheets: "Sheets",
  whatsapp: "WhatsApp",
  more: "+12",
};

function IntegrationMark({ id }: Readonly<{ id: Integration["id"] }>) {
  if (id === "more") {
    return (
      <span className="grid size-9 place-items-center rounded-xl bg-[#edf3ff] text-sm font-bold text-primary">
        +12
      </span>
    );
  }

  if (id === "calendar") {
    return (
      <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true">
        <rect
          x="4"
          y="4"
          width="28"
          height="28"
          rx="7"
          fill="#fff"
          stroke="#dfe5ef"
        />
        <path
          d="M4 12h28v-1a7 7 0 0 0-7-7H11a7 7 0 0 0-7 7v1Z"
          fill="#4285F4"
        />
        <text
          x="18"
          y="25"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#2878FF"
        >
          31
        </text>
      </svg>
    );
  }

  if (id === "gmail") {
    return (
      <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true">
        <rect
          x="3"
          y="6"
          width="30"
          height="24"
          rx="6"
          fill="#fff"
          stroke="#e3e8f2"
        />
        <path
          d="M6 10.5 18 20l12-9.5"
          fill="none"
          stroke="#EA4335"
          strokeWidth="3"
        />
        <path d="M6 11v15M30 11v15" stroke="#C5221F" strokeWidth="2.5" />
      </svg>
    );
  }

  if (id === "hubspot") {
    return (
      <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true">
        <circle cx="18" cy="18" r="16" fill="#fff3ed" />
        <path
          d="M18 10v6m0 4v6m-5-8H9m14 0h4M12 12l3 3m6 6 3 3"
          stroke="#FF7A59"
          strokeWidth="2.3"
        />
        <circle cx="18" cy="18" r="4" fill="#FF7A59" />
        <circle cx="9" cy="18" r="2.5" fill="#FF7A59" />
        <circle cx="27" cy="18" r="2.5" fill="#FF7A59" />
      </svg>
    );
  }

  if (id === "slack") {
    return (
      <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true">
        <rect x="5" y="14" width="11" height="5" rx="2.5" fill="#36C5F0" />
        <rect x="14" y="5" width="5" height="11" rx="2.5" fill="#2EB67D" />
        <rect x="20" y="17" width="11" height="5" rx="2.5" fill="#ECB22E" />
        <rect x="17" y="20" width="5" height="11" rx="2.5" fill="#E01E5A" />
      </svg>
    );
  }

  if (id === "sheets") {
    return (
      <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true">
        <path
          d="M9 3h13l7 7v23H9a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"
          fill="#0F9D58"
        />
        <path d="M22 3v7h7" fill="#87CEAC" />
        <path
          d="M10 16h14v11H10zM10 20h14M15 16v11"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true">
      <circle cx="18" cy="18" r="16" fill="#25D366" />
      <path
        d="M12.5 11.5c1.4-1.5 2.8.8 3.4 2 .4.8-.8 1.5-1.2 2.1 1.2 2.6 3.2 4.6 5.8 5.8.7-.4 1.4-1.6 2.2-1.2 1.3.6 3.5 2 2 3.4-1 1-2.3 1.6-3.7 1.4-6.6-.9-11.1-5.5-12-12-.2-1.4.5-2.7 1.5-3.5Z"
        fill="#fff"
      />
    </svg>
  );
}

export function Integrations({ className }: Readonly<{ className?: string }>) {
  return (
    <Card
      data-testid="integrations"
      className={cn("h-full min-w-0", className)}
    >
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <ul
          className="grid grid-cols-4 gap-2.5"
          aria-label="Connected integrations"
        >
          {integrations.map((integration) => (
            <li key={integration.id}>
              <div
                className="flex min-h-[76px] min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-[#fbfcff] px-1.5 py-2.5 text-center"
                aria-label={integration.name}
                title={integration.name}
              >
                <IntegrationMark id={integration.id} />
                <span className="w-full truncate text-[10px] font-semibold text-[#59657b]">
                  {shortLabels[integration.id]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
