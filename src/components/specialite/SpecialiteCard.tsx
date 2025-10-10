import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { CardTitle } from '../ui/card'
import { Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'

type Specialite ={
    nom?: string
    description?: string
    image?: string
}

interface SpecialiteCardProps {
    specialite?: Specialite
    className?: string
}

export default function SpecialiteCard({specialite,className}:SpecialiteCardProps) {
  return (  
    <div className={cn(className, "w-52 h-full overflow-hidden")}>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Spécialité</CardTitle>
          <Stethoscope className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{specialite?.nom|| "-----"}</div>
          <p className="text-xs text-muted-foreground">Domaine d'expertise</p>
        </CardContent>
      </Card>
    </div>
  )
}   
