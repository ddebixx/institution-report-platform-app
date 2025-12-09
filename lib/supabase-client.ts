import { createClient } from "@supabase/supabase-js"

import { clientEnv } from "./env"

export const supabaseClient = createClient(
  clientEnv.NEXT_PUBLIC_SUPABASE_URL,
  clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

