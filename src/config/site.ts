import { APP_ROUTES } from "@/config/constants";
import type { NavigationItem } from "@/types/navigation";

export const siteConfig = {
  name: "FrontOS",
  defaultTitle: "FrontOS — AI Business Operations",
  titleTemplate: "%s | FrontOS",
  description:
    "A premium AI business-operations platform for focused, scalable work.",
  locale: "en",
} as const;

export const navigationConfig = {
  marketing: [] satisfies NavigationItem[],
  dashboard: [
    {
      label: "Overview",
      href: APP_ROUTES.overview,
    },
    {
      label: "Calls",
      href: APP_ROUTES.calls,
    },
  ] satisfies NavigationItem[],
} as const;
