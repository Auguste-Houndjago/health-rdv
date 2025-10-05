import { createClient } from "@/utils/supabase/server";
import { cache } from "react";


export async function getAuthUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;

  return user;
}



export const getCachedUser = cache(getAuthUser);



