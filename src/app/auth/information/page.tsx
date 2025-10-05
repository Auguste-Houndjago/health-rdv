
import VaporizeTextCycle, { Tag } from "@/components/animation/VaporizeTextUx";
import AuthSteper, { Role } from "@/components/layout/flow/AuthSteper";


import { getUserInfo } from "@/services/users";

import { redirect } from "next/navigation";


export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const user = await getUserInfo()
  const role = user?.role 

  if (role !== "PATIENT" && role !== "MEDECIN") {
    console.log("role pas inclut", role)
    return redirect("/");
  }
  


 return(
    <div>
      <h1>Information {user?.email} {user?.nom} {user?.prenom} </h1>

      <div className="flex flex-col border-2 gap-8">
        <div className="flex flex-col  ">
        <VaporizeTextCycle color="#000000" texts={["Bienvenue", "A", "HEALTH - CARE"]} 
                        spread={5}
                        density={5}
                        animation={{
                            vaporizeDuration: 2,
                            fadeInDuration: 1,
                            waitDuration: 0.5
                        }}
                        direction="left-to-right"
                        alignment="center"
                        tag={Tag.H1}
        />
        </div>
         <AuthSteper role={role} />
      </div>
    </div>
 )
}
