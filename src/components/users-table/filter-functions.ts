import type { FilterFn } from "@tanstack/react-table"
import type { UsersWithRole } from "./types"

export const statusFilterFn: FilterFn<UsersWithRole> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true
  const status = row.getValue(columnId) as string
  return filterValue.includes(status)
}

export const roleFilterFn: FilterFn<UsersWithRole> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true
  const role = row.getValue(columnId) as string
  return filterValue.includes(role)
}
