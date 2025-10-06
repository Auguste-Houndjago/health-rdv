// @/components/patients-table/table-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Eye, Edit, Trash2 } from "@remixicon/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { PatientWithUser } from "./types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface TableColumnsProps {
  data: PatientWithUser[]
  setData: (data: PatientWithUser[]) => void
}

export const getColumns = ({ data, setData }: TableColumnsProps): ColumnDef<PatientWithUser>[] => [
  {
    accessorKey: "utilisateur",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original
      const user = patient.utilisateur
      const initials = `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase()
      
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl || ""} alt={`${user.prenom} ${user.nom}`} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.prenom} {user.nom}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "utilisateur.telephone",
    header: "Téléphone",
    cell: ({ row }) => {
      const telephone = row.original.utilisateur.telephone
      return telephone ? (
        <span className="text-sm">{telephone}</span>
      ) : (
        <span className="text-sm text-muted-foreground">Non renseigné</span>
      )
    },
  },
  {
    accessorKey: "utilisateur.dateNaissance",
    header: "Âge",
    cell: ({ row }) => {
      const dateNaissance = row.original.utilisateur.dateNaissance
      if (!dateNaissance) return <span className="text-sm text-muted-foreground">Non renseigné</span>
      
      const age = new Date().getFullYear() - new Date(dateNaissance).getFullYear()
      return <span className="text-sm">{age} ans</span>
    },
  },
  {
    accessorKey: "sexe",
    header: "Sexe",
    cell: ({ row }) => {
      const sexe = row.original.sexe || row.original.utilisateur.sexe
      return sexe ? (
        <Badge variant="secondary" className="text-xs">
          {sexe}
        </Badge>
      ) : (
        <span className="text-sm text-muted-foreground">Non renseigné</span>
      )
    },
  },
  {
    accessorKey: "groupeSanguin",
    header: "Groupe sanguin",
    cell: ({ row }) => {
      const groupeSanguin = row.original.groupeSanguin
      return groupeSanguin ? (
        <Badge variant="outline" className="text-xs">
          {groupeSanguin}
        </Badge>
      ) : (
        <span className="text-sm text-muted-foreground">Non renseigné</span>
      )
    },
  },
  {
    accessorKey: "poids",
    header: "Poids/Taille",
    cell: ({ row }) => {
      const poids = row.original.poids
      const taille = row.original.taille
      
      if (!poids && !taille) {
        return <span className="text-sm text-muted-foreground">Non renseigné</span>
      }
      
      return (
        <div className="text-sm">
          {poids && <span>{poids} kg</span>}
          {poids && taille && <span className="text-muted-foreground"> / </span>}
          {taille && <span>{taille} cm</span>}
        </div>
      )
    },
  },
  {
    accessorKey: "utilisateur.status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.original.utilisateur.status
      const variant = status === "ACTIF" ? "default" : status === "INACTIF" ? "destructive" : "secondary"
      
      return (
        <Badge variant={variant} className="text-xs">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "rendezVous",
    header: "Dernier RDV",
    cell: ({ row }) => {
      const rendezVous = row.original.rendezVous
      if (!rendezVous || rendezVous.length === 0) {
        return <span className="text-sm text-muted-foreground">Aucun</span>
      }
      
      const dernierRDV = rendezVous[0]
      return (
        <div className="text-sm">
          <div>{format(new Date(dernierRDV.date), "dd/MM/yyyy", { locale: fr })}</div>
          <div className="text-xs text-muted-foreground">{dernierRDV.heure}</div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(patient.id)}
            >
              Copier l'ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Voir le profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
