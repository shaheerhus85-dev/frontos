import Link from "next/link";

import { APP_ROUTES } from "@/config/constants";
import { cn } from "@/lib/utils";

type FrontOSLogoProps = Readonly<{
  compact?: boolean;
  className?: string;
  href?: string;
}>;

export function FrontOSLogo({
  className,
  compact = false,
  href = APP_ROUTES.overview,
}: FrontOSLogoProps) {
  return (
    <Link
      href={href}
      data-testid="frontos-logo"
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-lg focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:outline-none",
        className,
      )}
      aria-label="FrontOS overview"
    >
      <svg
        viewBox="0 0 32 32"
        className="size-[30px] shrink-0"
        data-logo-mark="aurora-prism-star"
        aria-hidden="true"
      >
        <path
          d="M14.15 2.75c.86 6.7 4.35 10.18 11.05 11.05-6.7.86-10.19 4.35-11.05 11.05C13.29 18.15 9.8 14.66 3.1 13.8c6.7-.87 10.19-4.35 11.05-11.05Z"
          fill="#2878FF"
        />
        <path
          d="M24.9 2.6c.3 2.12 1.38 3.2 3.5 3.5-2.12.3-3.2 1.38-3.5 3.5-.3-2.12-1.38-3.2-3.5-3.5 2.12-.3 3.2-1.38 3.5-3.5Z"
          fill="#7457FF"
        />
      </svg>
      <span
        className={cn(
          "font-display text-xl font-bold tracking-[-0.04em] text-[#11182a]",
          compact && "sr-only",
        )}
      >
        FrontOS
      </span>
    </Link>
  );
}
