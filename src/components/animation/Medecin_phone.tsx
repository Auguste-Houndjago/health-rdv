"use client";

import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface MedecinPhoneAnimationProps {
  className?: string; // ✅ prop pour styler le parent
}

export default function MedecinPhoneAnimation({ className }: MedecinPhoneAnimationProps) {
  return (
    <div className={cn("flex items-center justify-center overflow-hidden", className)}>
      <DotLottieReact
        src="/animations/Medecin_phone.lottie"
        autoplay
        loop
        style={{ width: "100%", height: "100%" }} 
      />
    </div>
  );
}
