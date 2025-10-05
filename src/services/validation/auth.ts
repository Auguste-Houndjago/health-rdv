//
import * as v from "valibot";

export const signUpSchema = v.pipe(
  v.object({
    email: v.pipe(
      v.string("Email is required"),
      v.email("Please enter a valid email address")
    ),
    password: v.pipe(
      v.string("Password is required"),
      v.minLength(8, "Password must be at least 8 characters"),
      // v.regex(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      //   "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      // )
    ),
    confirmPassword: v.string("Please confirm your password"),
    terms: v.literal(true, "You must accept the terms and conditions"),
  }),
  v.forward(
    v.check(
      (input) => input.password === input.confirmPassword,
      "Passwords do not match"
    ),
    ["confirmPassword"]
  )
);