// @/components/patients-table/table-filters.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter, Trash2 } from "lucide-react"
import type { Table } from "@tanstack/react-table"
import type { PatientWithUser } from "./types"

interface TableFiltersProps {
  table: Table<PatientWithUser>
  onDeleteRows: () => void
}

export function TableFilters({ table, onDeleteRows }: TableFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sexeFilter, setSexeFilter] = useState<string>("all")
  const [groupeSanguinFilter, setGroupeSanguinFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    table.getColumn("utilisateur")?.setFilterValue(value)
  }

  const handleSexeFilter = (value: string) => {
    setSexeFilter(value)
    table.getColumn("sexe")?.setFilterValue(value === "all" ? "" : value)
  }

  const handleGroupeSanguinFilter = (value: string) => {
    setGroupeSanguinFilter(value)
    table.getColumn("groupeSanguin")?.setFilterValue(value === "all" ? "" : value)
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    table.getColumn("utilisateur.status")?.setFilterValue(value === "all" ? "" : value)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSexeFilter("all")
    setGroupeSanguinFilter("all")
    setStatusFilter("all")
    table.resetColumnFilters()
  }

  const hasActiveFilters = searchQuery || sexeFilter !== "all" || groupeSanguinFilter !== "all" || statusFilter !== "all"

  return (
    <div className="flex flex-col gap-4">
      {/* Barre de recherche */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Rechercher un patient..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8"
          />
          <Filter className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Effacer
          </Button>
        )}
      </div>

      {/* Filtres */}
      <div className="flex items-center gap-2 flex-wrap">
        <Select value={sexeFilter} onValueChange={handleSexeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sexe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les sexes</SelectItem>
            <SelectItem value="Homme">Homme</SelectItem>
            <SelectItem value="Femme">Femme</SelectItem>
            <SelectItem value="Autre">Autre</SelectItem>
          </SelectContent>
        </Select>

        <Select value={groupeSanguinFilter} onValueChange={handleGroupeSanguinFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Groupe sanguin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les groupes</SelectItem>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>

        {/* <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="ACTIF">Actif</SelectItem>
            <SelectItem value="INACTIF">Inactif</SelectItem>
            <SelectItem value="PENDING">En attente</SelectItem>
          </SelectContent>
        </Select> */}

        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {table.getFilteredSelectedRowModel().rows.length} sélectionné(s)
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={onDeleteRows}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          </div>
        )}
      </div>

      {/* Indicateur de filtres actifs */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Filtres actifs:</span>
          {searchQuery && <Badge variant="outline">Recherche: "{searchQuery}"</Badge>}
          {sexeFilter !== "all" && <Badge variant="outline">Sexe: {sexeFilter}</Badge>}
          {groupeSanguinFilter !== "all" && <Badge variant="outline">Groupe: {groupeSanguinFilter}</Badge>}
          {/* {statusFilter !== "all" && <Badge variant="outline">Statut: {statusFilter}</Badge>} */}
        </div>
      )}
    </div>
  )
}
