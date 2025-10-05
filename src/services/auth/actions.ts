"use server";

import * as v from "valibot";

import { signUp } from "@/services/auth/supabase";
import { signUpSchema } from "@/services/validation";
import { Role } from "@prisma/client";

export async function signUpAction(formData: FormData, role:Role = "PATIENT") {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    terms: formData.get("terms") === "on",
  };

  const result = v.safeParse(signUpSchema, rawData);

  if (!result.success) {
    const errors = result.issues.reduce((acc, issue) => {
      const path = issue.path?.[0].key as string;
      acc[path] = issue.message;
      return acc;
    }, {} as Record<string, string>);

    return {
      success: false,
      errors,
      message: "Validation failed",
    };
  }

  const { email, password } = result.output;

  const response = await signUp(email, password, { role });

  if (!response.success) {
    return {
      success: false,
      message: response.error || "Sign up failed",
    };
  }

  return {
    success: true,
    message: response.message,
  };
}



