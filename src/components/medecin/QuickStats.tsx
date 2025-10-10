import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Users, Calendar, Building2, Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'
// import { mockMedecinStats } from '@/mock/medecinStats'


 export interface MedecinDashboardStats {
  totalPatients: number
  rendezVousAujourdhui: number
  hopitauxAffilies: number
  specialite: string
  pendingAppointments?: number
  averageRating?: number
  totalConsultations?: number
  responseTime?: string
}

export const mockMedecinStats: MedecinDashboardStats = {
  totalPatients: 128,
  rendezVousAujourdhui: 5,
  hopitauxAffilies: 3,
  specialite: "Cardiologie",
  pendingAppointments: 2,
  averageRating: 4.6,
  totalConsultations: 340,
  responseTime: "1h 15min"
}


interface QuickStatsProps {
  stats?: MedecinDashboardStats
  className?: string
}

export default function QuickStats({ stats = mockMedecinStats , className }: QuickStatsProps) {
  return (
    <div className={cn(className, "grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 gap-4 ")}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPatients}</div>
          <p className="text-xs text-muted-foreground">Patients suivis</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">RDV Aujourd'hui</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.rendezVousAujourdhui}</div>
          <p className="text-xs text-muted-foreground">Rendez-vous prévus</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hôpitaux</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.hopitauxAffilies}</div>
          <p className="text-xs text-muted-foreground">Hôpitaux affiliés</p>
        </CardContent>
      </Card>


    </div>
  )
}
