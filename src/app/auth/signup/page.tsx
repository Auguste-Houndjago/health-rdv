
import { getUserInfo } from "@/services/users";
import { redirect } from "next/navigation";
import {SignInPage} from "@/components/auth/sign-in"

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
      <SignInPage/>
 )
}
