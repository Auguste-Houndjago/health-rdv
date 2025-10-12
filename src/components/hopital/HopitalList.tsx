
import React from "react"
import HopitalCard from "./HopitalCard"

import  {getHopitaux} from "@/services/hopitaux"
import { cn } from "@/lib/utils";

interface HopitalListProps {
  className?: string;
}
export default async function HopitalList({className}: HopitalListProps) {
  const hopitaux = await getHopitaux()

  return (
    <div className={cn("p-6 mx-auto", className)}>
 <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
  Liste des Hôpitaux
</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hopitaux.map((hopital) => (
          <HopitalCard key={hopital.id} {...hopital} />
        ))}
      </div>
    </div>
  )
}
