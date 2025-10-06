// src/app/medecin/patients/page.tsx
import PatientsPage from "@/components/medecin/PatientsPage"
import { getUserInfo } from "@/services/users/userInfo"

export default async function MedecinPatientsPage() {
  const user = await getUserInfo()
  const medecinId = user?.id || ""
  return <PatientsPage medecinId={medecinId} />
}
