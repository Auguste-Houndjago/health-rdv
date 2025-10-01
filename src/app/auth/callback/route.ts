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
   return NextResponse.redirect(new URL("/organization/register", origin));
  }

  if (session) {
    await supabase.auth.refreshSession({
      refresh_token: session.refresh_token,
    });
  }

  // 🔽 Utilisation de la fonction getUserInfo à la place de getUser()
  const userInfo = await getUserInfo();

  if (userInfo) {
    const userFunction = userInfo.function;
    const userRole = userInfo.role;
    const orgSlug = userInfo.hopital.id;
    const newUser = userInfo.status === "PENDING";
    const hasOrg = Boolean(userInfo.hopital?.id);
    const invitationToken = userInfo.invitationToken;

    // Check for invitation token and redirect to welcome/token page
    // if (invitationToken) {
    //   return NextResponse.redirect(
    //     new URL(`/welcome/token?token=${invitationToken}`, requestUrl.origin),
    //   );
    // }

    console.log(
      "userFunction" , userFunction, "userRole", userRole, "hasOrg", hasOrg
    )

    if (userFunction === "MEDECIN" && !hasOrg) {
      console.log("REDIRECT ORG SETUP PAGE");
      return NextResponse.redirect(
        new URL("/auth/org-setup", requestUrl.origin),
      );
    }


    // if (userRole === "ADMIN") {
    //   return NextResponse.redirect(
    //     new URL(hasOrg ? "/admin" : "/auth/org-setup", requestUrl.origin),
    //   );
    // }

    // if (userRole === "TEACHER" && newUser && orgSlug) {
    //   return NextResponse.redirect(
    //     new URL(`/setting/welcome?org=${orgSlug}`, requestUrl.origin),
    //   );
    // }

    // return NextResponse.redirect(
    //   new URL("/auth/setup-role", requestUrl.origin),
    // );
  }

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}
