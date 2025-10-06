import type React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { RiCheckLine, RiUserLine, RiStethoscopeLine, RiHeartPulseLine } from "@remixicon/react"
import type { UsersWithRole } from "./types"
import { RowActions } from "./row-actions"
import { statusFilterFn, roleFilterFn } from "./filter-functions"

interface GetColumnsProps {
  data: UsersWithRole[]
  setData: React.Dispatch<React.SetStateAction<UsersWithRole[]>>
}

export const getColumns = ({ data, setData }: GetColumnsProps): ColumnDef<UsersWithRole>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Utilisateur",
    accessorKey: "nom",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.original.avatarUrl ? (
          <img
            className="rounded-full"
            src={row.original.avatarUrl || "/placeholder.svg"}
            width={32}
            height={32}
            alt={`${row.original.prenom} ${row.original.nom}`}
          />
        ) : (
          <div className="flex size-8 items-center justify-center rounded-full bg-muted">
            <RiUserLine className="size-4 text-muted-foreground" />
          </div>
        )}
        <div>
          <div className="font-medium">
            {row.original.prenom} {row.original.nom}
          </div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      </div>
    ),
    size: 240,
    enableHiding: false,
  },
  {
    header: "Rôle",
    accessorKey: "role",
    cell: ({ row }) => {
      const role = row.original.role
      const roleConfig = {
        ADMIN: { label: "Admin", icon: RiUserLine, color: "text-blue-600" },
        MEDECIN: { label: "Médecin", icon: RiStethoscopeLine, color: "text-emerald-600" },
        PATIENT: { label: "Patient", icon: RiHeartPulseLine, color: "text-purple-600" },
      }
      const config = roleConfig[role]
      const Icon = config.icon

      return (
        <div className="flex items-center gap-2">
          <Icon className={cn("size-4", config.color)} aria-hidden="true" />
          <span>{config.label}</span>
        </div>
      )
    },
    size: 120,
    filterFn: roleFilterFn,
  },
  {
    header: "Statut",
    accessorKey: "status",
    cell: ({ row }) => {
      const statusConfig = {
        ACTIF: { label: "Actif", color: "text-emerald-600" },
        INACTIF: { label: "Inactif", color: "text-muted-foreground" },
        PENDING: { label: "En attente", color: "text-amber-600" },
      }
      const config = statusConfig[row.original.status]

      return (
        <div className="flex items-center h-full">
          <Badge variant="outline" className={cn("gap-1 py-0.5 px-2 text-sm", config.color)}>
            {row.original.status === "ACTIF" && (
              <RiCheckLine className="text-emerald-500" size={14} aria-hidden="true" />
            )}
            {config.label}
          </Badge>
        </div>
      )
    },
    size: 120,
    filterFn: statusFilterFn,
  },
  {
    header: "Téléphone",
    accessorKey: "telephone",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.telephone || "—"}</span>,
    size: 140,
  },
  {
    header: "Spécialité",
    accessorKey: "medecin",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.medecin?.specialite.nom || "—"}</span>,
    size: 140,
  },
  {
    header: "Licence",
    accessorKey: "medecin.numLicence",
    cell: ({ row }) => (
      <span className="text-muted-foreground font-mono text-xs">{row.original.medecin?.numLicence || "—"}</span>
    ),
    size: 120,
  },
  {
    header: "Groupe sanguin",
    accessorKey: "patient.groupeSanguin",
    cell: ({ row }) => {
      const groupe = row.original.patient?.groupeSanguin
      if (!groupe || groupe === "INCONNU") return <span className="text-muted-foreground">—</span>

      const formatted = groupe.replace("_", " ")
      return (
        <Badge variant="outline" className="font-mono text-xs">
          {formatted}
        </Badge>
      )
    },
    size: 130,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions setData={setData} data={data} item={row.original} />,
    size: 60,
    enableHiding: false,
  },
]
