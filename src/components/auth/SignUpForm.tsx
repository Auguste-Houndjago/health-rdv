// src/components/SignUpForm.tsx (Composant Client)
"use client";

import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { useActionState } from "react";
import { GlassInputWrapper } from "./components";
import { PasswordInput } from "./PasswordInput";
import { signUpAction } from "@/services/auth/actions";
import { Role } from "@prisma/client";

interface SignUpFormProps {
  onGoogleSignUp?: () => void;
  role?: Role;
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

  // Affichage du toast à chaque changement de message
  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message, { duration: 7000 });
      } else {
        toast.error(state.message);
      }
    }
  }, [state?.message, state?.success]);

  return (
    <>
      {/* Toaster Sonner */}
      <Toaster position="top-right" />

      <form className="space-y-5" action={formAction}>
        {/* Email */}
        <div className="animate-element animate-delay-400">
          <label className="text-sm font-medium text-muted-foreground">Adresse Email</label>
          <GlassInputWrapper>
            <input 
              name="email" 
              type="email" 
              placeholder="Entrez votre adresse email" 
              className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" 
            />
          </GlassInputWrapper>
          {state?.errors?.email && (
            <p className="text-destructive text-xs mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Mot de passe */}
        <PasswordInput
          name="password"
          label="Mot de passe"
          placeholder="Créez un mot de passe"
          delay="animate-delay-500"
          error={state?.errors?.password}
        />

        {/* Confirmer le mot de passe */}
        <PasswordInput
          name="confirmPassword"
          label="Confirmer le mot de passe"
          placeholder="Confirmez votre mot de passe"
          delay="animate-delay-600"
          error={state?.errors?.confirmPassword}
        />

        {/* Conditions générales */}
        <div className="animate-element animate-delay-700 flex items-center gap-3 text-sm">
          <input 
            type="checkbox" 
            name="terms" 
            className="custom-checkbox" 
          />
          <span className="text-foreground/90">
            J'accepte les <a href="#" className="text-violet-400 hover:underline transition-colors">Conditions Générales</a>
          </span>
        </div>
        {state?.errors?.terms && (
          <p className="text-destructive text-xs mt-1 ml-7">{state.errors.terms}</p>
        )}

        {/* Bouton d'inscription */}
        <button
          type="submit"
          disabled={isPending}
          className="animate-element animate-delay-800 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Création du compte..." : "S'inscrire"}
        </button>
      </form>
    </>
  );
}
