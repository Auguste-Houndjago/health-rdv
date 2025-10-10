// src/app/medecin/patients/page.tsx
import PatientsPage from "@/components/medecin/PatientsPage"
import { getUserInfo } from "@/services/users/userInfo"
import { redirect } from "next/navigation"

export default async function MedecinPatientsPage() {
  const user = await getUserInfo()
  const tempId ="aab240c1-d87b-4aaf-8d74-107387eb2233"
  const medecinId = user?.id 

  if (!medecinId) {
    return redirect("/")
  }

  return <PatientsPage medecinId={medecinId} />
}
