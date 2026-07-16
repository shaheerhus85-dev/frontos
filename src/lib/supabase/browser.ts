"use client";

import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicConfiguration } from "@/config/env";

export function createSupabaseBrowserClient() {
  const { anonKey, url } = getSupabasePublicConfiguration();

  return createClient(url, anonKey);
}
