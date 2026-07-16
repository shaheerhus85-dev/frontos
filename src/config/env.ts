import { z } from "zod";

const publicEnvironmentSchema = z
  .object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  })
  .refine(
    ({ NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL }) =>
      Boolean(NEXT_PUBLIC_SUPABASE_ANON_KEY) ===
      Boolean(NEXT_PUBLIC_SUPABASE_URL),
    {
      message:
        "Supabase public URL and anonymous key must be configured together.",
    },
  );

const serverEnvironmentSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

export const publicEnvironment = publicEnvironmentSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export function getServerEnvironment() {
  return serverEnvironmentSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}

export function getSupabasePublicConfiguration() {
  const url = publicEnvironment.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return { url, anonKey } as const;
}
