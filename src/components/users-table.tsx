"use client"


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { GripVertical, Trash2 } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import { UsersWithRole } from "@/services/users/users"

interface UsersTableProps {
  users: UsersWithRole[]
  onReorder?: (users: UsersWithRole[]) => void
}

const statusColors = {
  ACTIF: "bg-green-500/10 text-green-700 dark:text-green-400",
  INACTIF: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  PENDING: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
}

const roleColors = {
  ADMIN: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  MEDECIN: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  PATIENT: "bg-teal-500/10 text-teal-700 dark:text-teal-400",
}

const medecinStatusColors = {
  EN_ATTENTE: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  APPROUVE: "bg-green-500/10 text-green-700 dark:text-green-400",
  REJETE: "bg-red-500/10 text-red-700 dark:text-red-400",
}

function SortableRow({
  user,
  isSelected,
  onSelect,
}: {
  user: UsersWithRole
  isSelected: boolean
  onSelect: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: user.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getInitials = (nom: string, prenom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  const formatBloodType = (type: string) => {
    return type.replace("_", " ")
  }

  return (
    <TableRow ref={setNodeRef} style={style} className={isSelected ? "bg-muted/50" : ""}>
      <TableCell className="w-12">
        <button
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>
      </TableCell>
      <TableCell className="w-12">
        <Checkbox checked={isSelected} onCheckedChange={() => onSelect(user.id)} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback>{getInitials(user.nom, user.prenom)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {user.prenom} {user.nom}
            </div>
            {user.dateNaissance && (
              <div className="text-sm text-muted-foreground">
                Né(e) le {new Date(user.dateNaissance).toLocaleDateString("fr-FR")}
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="text-sm">{user.email}</div>
          {user.telephone && <div className="text-sm text-muted-foreground">{user.telephone}</div>}
        </div>
      </TableCell>
      <TableCell>
        <Badge className={roleColors[user.role]}>{user.role}</Badge>
      </TableCell>
      <TableCell>
        <Badge className={statusColors[user.status]}>{user.status}</Badge>
      </TableCell>
      <TableCell>
        {user.role === "MEDECIN" && user.medecin && (
          <div className="space-y-1">
            <div className="text-sm font-medium">{user.medecin.specialite.nom}</div>
            <div className="text-sm text-muted-foreground">Licence: {user.medecin.numLicence}</div>
            <Badge className={medecinStatusColors[user.medecin.statut]}>{user.medecin.statut}</Badge>
          </div>
        )}
        {user.role === "PATIENT" && user.patient && (
          <div className="space-y-1">
            <div className="text-sm">
              <span className="font-medium">Groupe sanguin:</span> {formatBloodType(user.patient.groupeSanguin)}
            </div>
            <div className="text-sm text-muted-foreground">Sexe: {user.patient.sexe}</div>
          </div>
        )}
        {user.role === "ADMIN" && <div className="text-sm text-muted-foreground">Administrateur système</div>}
      </TableCell>
    </TableRow>
  )
}

export function UsersTable({ users: initialUsers, onReorder }: UsersTableProps) {
  const [users, setUsers] = useState(initialUsers)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setUsers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newOrder = arrayMove(items, oldIndex, newIndex)
        onReorder?.(newOrder)
        return newOrder
      })
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(users.map((u) => u.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleDeleteSelected = () => {
    setUsers((prev) => prev.filter((u) => !selectedIds.has(u.id)))
    setSelectedIds(new Set())
  }

  const allSelected = users.length > 0 && selectedIds.size === users.length
  const someSelected = selectedIds.size > 0 && selectedIds.size < users.length

  return (
    <div className="space-y-4">
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
          <div className="text-sm font-medium">
            {selectedIds.size} élément{selectedIds.size > 1 ? "s" : ""} sélectionné{selectedIds.size > 1 ? "s" : ""}
          </div>
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </div>
      )}

      <div className="rounded-lg border border-border bg-card">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead > Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext items={users.map((u) => u.id)} strategy={verticalListSortingStrategy}>
                {users.map((user) => (
                  <SortableRow
                    key={user.id}
                    user={user}
                    isSelected={selectedIds.has(user.id)}
                    onSelect={handleSelect}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  )
}
