// src/components/SignUpForm.tsx (Client Component)
"use client";

import { useActionState } from "react";
import { GlassInputWrapper } from "./components";
import { PasswordInput } from "./PasswordInput";
import { signUpAction } from "@/services/auth/actions";
import { Role } from "@prisma/client";


interface SignUpFormProps {
  onGoogleSignUp?: () => void;
  role?: Role
}

// Typage de l'état retourné par l'action serveur
interface SignUpState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export function SignUpForm({ onGoogleSignUp, role }: SignUpFormProps) {
  // Wrapper pour correspondre à la signature attendue par useActionState(prevState, formData)
  const actionHandler = async (_prevState: SignUpState | null, formData: FormData): Promise<SignUpState> => {
    return await signUpAction(formData, role);
  };

  const initialState: SignUpState | null = null;

  const [state, formAction, isPending] = useActionState<SignUpState | null, FormData>(
    actionHandler,
    initialState
  );

  return (
    <>
      {/* Message de succès ou d'erreur */}
      {state?.message && (
        <div className={`animate-element animate-delay-250 p-4 rounded-2xl ${
          state.success 
            ? "bg-green-500/10 border border-green-500/20 text-green-600" 
            : "bg-destructive/10 border border-destructive/20 text-destructive"
        }`}>
          <p className="text-sm">{state.message}</p>
        </div>
      )}

      <form className="space-y-5" action={formAction}>
        {/* Email */}
        <div className="animate-element animate-delay-400">
          <label className="text-sm font-medium text-muted-foreground">Email Address</label>
          <GlassInputWrapper>
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" 
            />
          </GlassInputWrapper>
          {state?.errors?.email && (
            <p className="text-destructive text-xs mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Create a password"
          delay="animate-delay-500"
          error={state?.errors?.password}
        />

        {/* Confirm Password */}
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          delay="animate-delay-600"
            error={state?.errors?.confirmPassword}
        />

        {/* Terms & Conditions */}
        <div className="animate-element animate-delay-700 flex items-center gap-3 text-sm">
          <input 
            type="checkbox" 
            name="terms" 
            className="custom-checkbox" 
          />
          <span className="text-foreground/90">
            I agree to the <a href="#" className="text-violet-400 hover:underline transition-colors">Terms & Conditions</a>
          </span>
        </div>
        {state?.errors?.terms && (
          <p className="text-destructive text-xs mt-1 ml-7">{state.errors.terms}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="animate-element animate-delay-800 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}