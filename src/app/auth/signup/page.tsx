
import { getUserInfo } from "@/services/users";
import { redirect } from "next/navigation";

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
  // <SignupMainOrg/>
  <></>
 )
}
