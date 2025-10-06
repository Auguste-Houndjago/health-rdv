"use client"

import { useId, useMemo, useRef } from "react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { RiCloseCircleLine, RiDeleteBinLine, RiErrorWarningLine, RiFilter3Line, RiSearch2Line } from "@remixicon/react"
import type { UsersWithRole } from "./types"
import { roleLabels, statusLabels } from "./types"

interface TableFiltersProps {
  table: Table<UsersWithRole>
  onDeleteRows: () => void
}

export function TableFilters({ table, onDeleteRows }: TableFiltersProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const statusColumn = table.getColumn("status")
  const statusFacetedValues = statusColumn?.getFacetedUniqueValues()
  const statusFilterValue = statusColumn?.getFilterValue()

  const roleColumn = table.getColumn("role")
  const roleFacetedValues = roleColumn?.getFacetedUniqueValues()
  const roleFilterValue = roleColumn?.getFilterValue()

  const uniqueStatusValues = useMemo(() => {
    if (!statusColumn) return []
    const values = Array.from(statusFacetedValues?.keys() ?? [])
    return values.sort()
  }, [statusColumn, statusFacetedValues])

  const statusCounts = useMemo(() => {
    if (!statusColumn) return new Map()
    return statusFacetedValues ?? new Map()
  }, [statusColumn, statusFacetedValues])

  const selectedStatuses = useMemo(() => {
    return (statusFilterValue as string[]) ?? []
  }, [statusFilterValue])

  const uniqueRoleValues = useMemo(() => {
    if (!roleColumn) return []
    const values = Array.from(roleFacetedValues?.keys() ?? [])
    return values.sort()
  }, [roleColumn, roleFacetedValues])

  const roleCounts = useMemo(() => {
    if (!roleColumn) return new Map()
    return roleFacetedValues ?? new Map()
  }, [roleColumn, roleFacetedValues])

  const selectedRoles = useMemo(() => {
    return (roleFilterValue as string[]) ?? []
  }, [roleFilterValue])

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table.getColumn("status")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  const handleRoleChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("role")?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table.getColumn("role")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Filter by name */}
        <div className="relative">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className={cn(
              "peer min-w-60 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent",
              Boolean(table.getColumn("nom")?.getFilterValue()) && "pe-9",
            )}
            value={(table.getColumn("nom")?.getFilterValue() ?? "") as string}
            onChange={(e) => table.getColumn("nom")?.setFilterValue(e.target.value)}
            placeholder="Rechercher par nom"
            type="text"
            aria-label="Rechercher par nom"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
            <RiSearch2Line size={20} aria-hidden="true" />
          </div>
          {Boolean(table.getColumn("nom")?.getFilterValue()) && (
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/60 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Effacer le filtre"
              onClick={() => {
                table.getColumn("nom")?.setFilterValue("")
                if (inputRef.current) {
                  inputRef.current.focus()
                }
              }}
            >
              <RiCloseCircleLine size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Delete button */}
        {table.getSelectedRowModel().rows.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="ml-auto bg-transparent" variant="outline">
                <RiDeleteBinLine className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                Supprimer
                <span className="-me-1 ms-1 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                  {table.getSelectedRowModel().rows.length}
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                  aria-hidden="true"
                >
                  <RiErrorWarningLine className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action ne peut pas être annulée. Cela supprimera définitivement{" "}
                    {table.getSelectedRowModel().rows.length}{" "}
                    {table.getSelectedRowModel().rows.length === 1
                      ? "utilisateur sélectionné"
                      : "utilisateurs sélectionnés"}
                    .
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteRows}>Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {/* Filter by status */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <RiFilter3Line className="size-5 -ms-1.5 text-muted-foreground/60" size={20} aria-hidden="true" />
              Statut
              {selectedStatuses.length > 0 && (
                <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                  {selectedStatuses.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto min-w-36 p-3" align="end">
            <div className="space-y-3">
              <div className="text-xs font-medium uppercase text-muted-foreground/60">Statut</div>
              <div className="space-y-3">
                {uniqueStatusValues.map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`${id}-status-${i}`}
                      checked={selectedStatuses.includes(value)}
                      onCheckedChange={(checked: boolean) => handleStatusChange(checked, value)}
                    />
                    <Label htmlFor={`${id}-status-${i}`} className="flex grow justify-between gap-2 font-normal">
                      {statusLabels[value] || value}{" "}
                      <span className="ms-2 text-xs text-muted-foreground">{statusCounts.get(value)}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {/* Filter by role */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <RiFilter3Line className="size-5 -ms-1.5 text-muted-foreground/60" size={20} aria-hidden="true" />
              Rôle
              {selectedRoles.length > 0 && (
                <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                  {selectedRoles.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto min-w-36 p-3" align="end">
            <div className="space-y-3">
              <div className="text-xs font-medium uppercase text-muted-foreground/60">Rôle</div>
              <div className="space-y-3">
                {uniqueRoleValues.map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`${id}-role-${i}`}
                      checked={selectedRoles.includes(value)}
                      onCheckedChange={(checked: boolean) => handleRoleChange(checked, value)}
                    />
                    <Label htmlFor={`${id}-role-${i}`} className="flex grow justify-between gap-2 font-normal">
                      {roleLabels[value] || value}{" "}
                      <span className="ms-2 text-xs text-muted-foreground">{roleCounts.get(value)}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
