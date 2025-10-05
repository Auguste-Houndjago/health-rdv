
import { getUserInfo } from "@/services/users";
import { redirect } from "next/navigation";
import {SignInPage} from "@/components/auth/SignInPage"
import { SignUpPage } from "@/components/auth/SignUpPage";

export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const user = await getUserInfo()

  if (user) {
    return redirect("/");
  }

 return(
      <SignUpPage role="MEDECIN" title="INSCRIPTION" description="Patient"/>
 )
}
