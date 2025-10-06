
import { getUserInfo } from "@/services/users";
import { redirect } from "next/navigation";
import { SignUpPage } from "@/components/auth/SignUpPage";

export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const message = params?.message;

  const user = await getUserInfo({cache:false})

  if (user) {
    return redirect("/");
  }

 return(
  <div>
    <SignUpPage role="MEDECIN" title="INSCRIPTION" description="Medecin"/>
  </div>
      
 )
}
