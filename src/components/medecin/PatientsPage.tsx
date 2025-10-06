// src/components/medecin/PatientsPage.tsx
"use client"

import PatientsTable from "@/components/patients-table/patients-table"
import { useState } from "react"
import { usePatients } from "@/hooks/patients/usePatients"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RiUserLine, RiHeartLine, RiCalendarLine, RiPulseLine } from "@remixicon/react"

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "sexe" | "groupe" | "status">("all")
  const [sexeFilter, setSexeFilter] = useState<"all" | "Homme" | "Femme" | "Autre">("all")
  const [groupeFilter, setGroupeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "ACTIF" | "INACTIF" | "PENDING">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Construction des filtres basée sur l'état
  const filters = {
    sexe: activeTab === "sexe" ? sexeFilter : "all",
    groupeSanguin: activeTab === "groupe" ? groupeFilter : "all",
    status: activeTab === "status" ? statusFilter : "all",
    searchQuery: searchQuery.trim() || undefined,
    medecinId: "current-medecin-id" // À remplacer par l'ID du médecin connecté
  }

  // Utilisation du hook personnalisé
  const { data, stats, loading, error, filters: { applied } } = usePatients({
    filters,
    sort: { key: "nom", order: "asc" }
  })

  const handleTabChange = (value: string) => {
    const [type, val] = value.split(":")
    setActiveTab(type as "all" | "sexe" | "groupe" | "status")
    
    // Reset des sous-filtres quand on change de type
    if (type === "all") {
      setSexeFilter("all")
      setGroupeFilter("all")
      setStatusFilter("all")
      setSearchQuery("")
    }
  }

  const handleSexeFilter = (value: string) => {
    setActiveTab("sexe")
    setSexeFilter(value as "all" | "Homme" | "Femme" | "Autre")
    setSearchQuery("")
  }

  const handleGroupeFilter = (value: string) => {
    setActiveTab("groupe")
    setGroupeFilter(value)
    setSearchQuery("")
  }

  const handleStatusFilter = (value: string) => {
    setActiveTab("status")
    setStatusFilter(value as "all" | "ACTIF" | "INACTIF" | "PENDING")
    setSearchQuery("")
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-red-500">Erreur: {error.message}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes Patients</h1>
          <p className="text-muted-foreground mt-2">
            Gestion de vos patients et de leurs informations médicales
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <RiUserLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Patients suivis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients Actifs</CardTitle>
              <RiPulseLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.byStatus.ACTIF}</div>
              <p className="text-xs text-muted-foreground">
                En cours de suivi
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hommes</CardTitle>
              <RiHeartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bySexe.Homme}</div>
              <p className="text-xs text-muted-foreground">
                Patients masculins
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Femmes</CardTitle>
              <RiHeartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bySexe.Femme}</div>
              <p className="text-xs text-muted-foreground">
                Patients féminines
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Onglets de filtrage */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="sexe">Par Sexe</TabsTrigger>
            <TabsTrigger value="groupe">Par Groupe Sanguin</TabsTrigger>
            <TabsTrigger value="status">Par Statut</TabsTrigger>
          </TabsList>

          <TabsContent value="sexe" className="space-y-4">
            <div className="flex gap-2">
              <Badge 
                variant={sexeFilter === "Homme" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSexeFilter("Homme")}
              >
                Hommes ({stats.bySexe.Homme})
              </Badge>
              <Badge 
                variant={sexeFilter === "Femme" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSexeFilter("Femme")}
              >
                Femmes ({stats.bySexe.Femme})
              </Badge>
              <Badge 
                variant={sexeFilter === "Autre" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSexeFilter("Autre")}
              >
                Autre ({stats.bySexe.Autre})
              </Badge>
            </div>
          </TabsContent>

          <TabsContent value="groupe" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {Object.entries(stats.byGroupeSanguin).map(([groupe, count]: [string, number]) => (
                <Badge 
                  key={groupe}
                  variant={groupeFilter === groupe ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleGroupeFilter(groupe)}
                >
                  {groupe} ({count})
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <div className="flex gap-2">
              <Badge 
                variant={statusFilter === "ACTIF" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleStatusFilter("ACTIF")}
              >
                Actifs ({stats.byStatus.ACTIF})
              </Badge>
              <Badge 
                variant={statusFilter === "INACTIF" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleStatusFilter("INACTIF")}
              >
                Inactifs ({stats.byStatus.INACTIF})
              </Badge>
              <Badge 
                variant={statusFilter === "PENDING" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleStatusFilter("PENDING")}
              >
                En attente ({stats.byStatus.PENDING})
              </Badge>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {data.items.length} patient{data.items.length > 1 ? "s" : ""} affiché
              {data.items.length > 1 ? "s" : ""}
              {applied && " (filtrés)"}
            </div>
            
            {loading && (
              <div className="text-sm text-muted-foreground">
                Chargement...
              </div>
            )}
          </div>
        </div>

        <PatientsTable patients={data.items} isLoading={loading} />
      </div>
    </div>
  )
}