// src/utils/supabase/client.ts

import { Database } from "@/types/database";
import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

//nouvelle instance 
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

//Instance globale (partagée côté navigateur)
export const supabase = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
