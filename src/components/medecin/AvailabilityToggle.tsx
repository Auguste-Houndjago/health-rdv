import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, XCircle } from 'lucide-react'

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
  disabled = false 
}: AvailabilityToggleProps) {
  const handleToggle = (checked: boolean) => {
    if (!loading && !disabled) {
      onToggle(checked)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Disponibilité
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Switch
              checked={isDisponible}
              onCheckedChange={handleToggle}
              disabled={disabled || loading}
            />
            <div className="flex items-center space-x-2">
              {isDisponible ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Disponible
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">
                    Indisponible
                  </span>
                </>
              )}
            </div>
          </div>
          
          <Badge 
            variant={isDisponible ? 'default' : 'secondary'}
            className={isDisponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          >
            {isDisponible ? 'Actif' : 'Inactif'}
          </Badge>
        </div>
        
        {loading && (
          <div className="mt-3 text-sm text-muted-foreground">
            Mise à jour en cours...
          </div>
        )}
        
        <div className="mt-3 text-xs text-muted-foreground">
          {isDisponible 
            ? 'Les patients peuvent vous contacter et prendre rendez-vous.'
            : 'Vous n\'apparaissez pas dans les recherches de patients.'
          }
        </div>
      </CardContent>
    </Card>
  )
}
