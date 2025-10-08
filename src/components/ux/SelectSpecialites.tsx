"use client"
import { useId } from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSpecialites } from "@/hooks/specialites/useSpecialites"


interface SelectSpecialitesProps {
  onChange?: (specialiteId: string) => void
  value?: string
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export default function SelectSpecialites({
  onChange,
  value,
  placeholder = "Sélectionner une spécialité",
  label = "Spécialité",
  required = false,
  disabled = false,
  className = ""
}: SelectSpecialitesProps) {
  const id = useId()
  const { specialites, isLoading, error } = useSpecialites()
  
  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Erreur lors du chargement des spécialités
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Select 
        value={value} 
        onValueChange={onChange}
        required={required}
        disabled={disabled || isLoading}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={isLoading ? "Chargement..." : placeholder} />
        </SelectTrigger>
        <SelectContent>
          {specialites.map((specialite) => (
            <SelectItem key={specialite.id} value={specialite.id}>
              {specialite.nom}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
