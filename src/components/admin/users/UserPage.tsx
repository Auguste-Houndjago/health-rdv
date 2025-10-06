// src/components/admin/users/UserPage.tsx
"use client"

import UsersTable from "@/components/users-table/users-table"
import { useState } from "react"
import { useUsers } from "@/hooks/users/useUsers"

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<"all" | "role" | "sex">("all")
  const [roleFilter, setRoleFilter] = useState<"all" | "ADMIN" | "MEDECIN" | "PATIENT">("all")
  const [sexFilter, setSexFilter] = useState<"all" | "Homme" | "Femme">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Construction des filtres basée sur l'état
  const filters = {
    role: activeTab === "role" ? roleFilter : "all",
    sexe: activeTab === "sex" ? sexFilter : "all",
    searchQuery: searchQuery.trim() || undefined
  }

  // Utilisation du hook personnalisé
  const { data, stats, loading, error, filters: { applied } } = useUsers({
    filters,
    sort: { key: "nom", order: "asc" }
  })

  const handleTabChange = (value: string) => {
    const [type, val] = value.split(":")
    setActiveTab(type as "all" | "role" | "sex")
    
    // Reset des sous-filtres quand on change de type
    if (type === "all") {
      setRoleFilter("all")
      setSexFilter("all")
      setSearchQuery("")
    }
  }

  const handleRoleFilter = (value: string) => {
    setActiveTab("role")
    setRoleFilter(value as "all" | "ADMIN" | "MEDECIN" | "PATIENT")
    setSearchQuery("")
  }

  const handleSexFilter = (value: string) => {
    setActiveTab("sex")
    setSexFilter(value as "all" | "Homme" | "Femme")
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
          <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground mt-2">
            Liste complète des utilisateurs avec leurs rôles et informations
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-muted-foreground">Total</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.byRole.MEDECIN}</div>
            <div className="text-muted-foreground">Médecins</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.byRole.PATIENT}</div>
            <div className="text-muted-foreground">Patients</div>
          </div>
        </div>

        <div className="space-y-4">


          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {data.items.length} utilisateur{data.items.length > 1 ? "s" : ""} affiché
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
            <UsersTable users={data.items} />
      </div>
    </div>
  )
}