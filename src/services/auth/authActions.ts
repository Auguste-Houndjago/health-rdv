"use server";

import { signOut } from "@/services/auth";

export async function logoutAction() {
  await signOut(); 
}
