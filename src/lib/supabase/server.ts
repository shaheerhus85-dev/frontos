import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicConfiguration } from "@/config/env";

export function createSupabaseServerClient() {
  const { anonKey, url } = getSupabasePublicConfiguration();

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
