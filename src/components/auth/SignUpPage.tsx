
import { Role } from "@prisma/client";
import MedecinPhoneAnimation from "../animation/Medecin_phone";
import { TextAnimate } from "../animation/TextAnimate";
import { GoogleIcon } from "./components";
import { SignUpForm } from "./SignUpForm";
import { handleGoogleLogin } from "@/services/auth/googleAuth";

interface SignUpPageProps {
  title?: string;
  description?: string;
  heroImage?: string;
  onGoogleSignUp?: () => void;
  role?:Role
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  title = "Inscription",
  description = "Cree un compte Patient",
  heroImage,
  onGoogleSignUp,
  role

}) => {
  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw]">
      
      <section className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="w-full max-w-md">
          <div className="flex flex-col  gap-6">
           
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight uppercase">{title}</h1>
            <div className="flex justify-between relative ">
              <p className="animate-element animate-delay-200 text-3xl text-muted-foreground">{description}</p>
          
              <div className="flex items-center justify-center absolute right-0">
                <MedecinPhoneAnimation className="size-30 border-2 border-indigo-500 rounded-full"/>
              </div>
              
            </div>
          
            {/* Formulaire client avec action serveur */}
            <SignUpForm  role={role} />

            <div className="animate-element animate-delay-900 relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground bg-background absolute">Or continue with</span>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="animate-element animate-delay-1000 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="animate-element animate-delay-1100 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="#" className="text-violet-400 hover:underline transition-colors">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </section>

      {heroImage && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </section>
      )}
    </div>
  );
};