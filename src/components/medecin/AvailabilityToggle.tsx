import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import StatusBadge from "./StatusBadge"

interface AvailabilityToggleProps {
  isDisponible: boolean
  onToggle: (available: boolean) => void
  loading?: boolean
  disabled?: boolean
}

export default function AvailabilityToggle({
  isDisponible,
  onToggle,
  loading = false,
  disabled = false,
}: AvailabilityToggleProps) {
  const handleToggle = (checked: boolean) => {
    if (!loading && !disabled) onToggle(checked)
  }

  return (
    <Card className="w-full p-3">

      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch
              checked={isDisponible}
              onCheckedChange={handleToggle}
              disabled={disabled || loading}
            />
            <div className="flex items-center gap-1.5 text-sm">
              {isDisponible ? (
                <>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-foreground">Disponible</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Indisponible</span>
                </>
              )}
            </div>
          </div>
        </div>

        {loading && (
          <p className="text-xs text-muted-foreground">…</p>
        )}

        <p className="text-xs text-muted-foreground">
          {isDisponible
            ? "Les patients peuvent vous contacter"
            : "Vous n'apparaissez pas dans les recherches"}
        </p>
      </CardContent>
    </Card>
  )
}
