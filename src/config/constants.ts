export const APP_ROUTES = {
  home: "/",
  onboarding: "/onboarding",
  overview: "/overview",
  calls: "/calls",
} as const;

export const ENVIRONMENT_KEYS = {
  supabaseUrl: "NEXT_PUBLIC_SUPABASE_URL",
  supabaseAnonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  supabaseServiceRoleKey: "SUPABASE_SERVICE_ROLE_KEY",
} as const;
