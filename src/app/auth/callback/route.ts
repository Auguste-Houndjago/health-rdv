import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { getUserInfo } from "@/services/users";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const requestUrl = new URL(request.url);
  const redirectTo = request.nextUrl.clone();

  redirectTo.searchParams.delete("code");
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  const origin = request.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL;

  const supabase = await createClient();
  let session = null;
  let error = null;

  if (code) {
    ({
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code));
  } else if (token_hash && type) {
    ({
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({ type, token_hash }));
  }

  if (error) {
    console.error("Erreur d'authentification:", error.message);
  //  return NextResponse.redirect(new URL("/", origin));
  }

  if (session) {
    await supabase.auth.refreshSession({
      refresh_token: session.refresh_token,
    });
  }

  // 🔽 Utilisation de la fonction getUserInfo à la place de getUser()
  const userInfo = await getUserInfo({ cache: false });

  if (userInfo) {
    const userFunction = userInfo.function;
    const userRole = userInfo.role;
    const orgSlug = userInfo.hopital?.slug ?? null; 
    const hopitalId = userInfo.hopital?.id ?? null; 
    const newUser = userInfo.status === "PENDING";
    const hasOrg = Boolean(hopitalId);
    const invitationToken = userInfo.invitationToken;


    console.log(
      "userFunction" , userFunction, "userRole", userRole, "hasOrg", hasOrg
    )


    if (newUser) {
      return NextResponse.redirect(new URL("/auth/information", origin));
    }
  

    if ((userFunction === "RESPONSABLE" || userFunction === "SUPER_ADMIN") && !hasOrg) {
      console.log("REDIRECT ORG SETUP PAGE");
      return NextResponse.redirect(
        new URL("/auth/org-setup", requestUrl.origin),
      );
    }


    console.log(
      "url:", requestUrl.origin ,"error:"
    )



    if (userRole === "MEDECIN") {
      return NextResponse.redirect(
        new URL(hasOrg ? "/medecin" : "/medecin/hopital", requestUrl.origin),
      );
    }

    if (userRole === "PATIENT") {
      return NextResponse.redirect(
        new URL(hasOrg ? "/patient" : "/patient/hopital", requestUrl.origin),
      );
    }

    return NextResponse.redirect(
      new URL("/auth/information", requestUrl.origin),
    );
  }

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}
