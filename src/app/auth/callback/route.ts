// auth/callback/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  
  const supabase = await createClient();
  let session = null;
  let error = null;

  // Échange du code pour la session
  if (code) {
    const result = await supabase.auth.exchangeCodeForSession(code);
    session = result.data.session;
    error = result.error;
  } else if (token_hash && type) {
    const result = await supabase.auth.verifyOtp({ type, token_hash });
    session = result.data.session;
    error = result.error;
  }

  if (error) {
    console.error("Erreur d'authentification:", error.message);
    return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
  }

  if (!session) {
    console.error("Aucune session disponible");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Récupération des métadonnées utilisateur directement depuis la session
  const userMetadata = session.user.user_metadata || {};
  
  console.log("User Metadata:", userMetadata);

  const userFunction = userMetadata.function || "GUEST";
  const userRole = userMetadata.role || "GUEST";
  const orgSlug = userMetadata.hopital?.slug || null;
  const hopitalId = userMetadata.hopital?.id || null;
  const newUser = userMetadata.status === "PENDING";
  const hasOrg = Boolean(hopitalId);
  const invitationToken = userMetadata.invitationToken;

  console.log("User Function:", userFunction, "User Role:", userRole, "Has Org:", hasOrg, "New User:", newUser);

  // Logique de redirection
  if (newUser) {
    console.log("Redirecting new user to /auth/information");
    return NextResponse.redirect(new URL("/auth/information", request.url));
  }

  if ((userFunction === "RESPONSABLE" || userFunction === "SUPER_ADMIN") && !hasOrg) {
    console.log("Redirecting to org setup page");
    return NextResponse.redirect(new URL("/auth/org-setup", request.url));
  }

  // Redirections spécifiques aux rôles (décommentez si nécessaire)
  /*
  if (userRole === "MEDECIN") {
    return NextResponse.redirect(
      new URL(hasOrg ? "/medecin" : "/medecin/hopital", request.url),
    );
  }

  if (userRole === "PATIENT") {
    return NextResponse.redirect(
      new URL(hasOrg ? "/patient" : "/patient/hopital", request.url),
    );
  }
  */

  // Redirection par défaut vers les informations
  console.log("Redirecting to default information page");
  return NextResponse.redirect(new URL("/auth/information", request.url));
}