"use client";


import QuickStats from "@/components/medecin/QuickStats";
import SpecialiteCard from "@/components/specialite/SpecialiteCard";

import MedecinsTabs from "@/components/medecin/PatientTabs";
import { getMedecinInfo, getRdvByMedecinId, MedecinInfoPayload, MedecinRendezVousType } from "@/app/actions/medecin";
import { useEntityFilter } from "@/hooks/entity/useEntityFilter";

export default function MedecinDashboard() {



  const fetchMedecinInfo = async (): Promise<MedecinInfoPayload[]> => {
    const result = await getMedecinInfo();
    return [result];
  };

  const {loading, error, data} = useEntityFilter<MedecinInfoPayload>({
    entityName: "getMedecinInfo",
    fetchFn: fetchMedecinInfo,
  });



  const medecinInfo = data?.items?.[0];
  const  specialite = medecinInfo?.specialite
  const  personalInfo = medecinInfo?.utilisateur;

  const medecinId = medecinInfo?.id;
  

  


  return (
<div className="space-y-4">

  {/* header */}
  <div className="flex justify-between h-20 border items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord Médecin</h1>

        </div>
      
      </div>
      <div className="flex justify-between   border-1 gap-4 border-indigo-300">


        <div className=" flex flex-col items-center flex-1 ">

<QuickStats  />

        </div>
        <div className="border flex justify-between ">
        <SpecialiteCard specialite={specialite}  />
        </div>
    
      </div>

      <MedecinsTabs/>

</div>
  );
}



