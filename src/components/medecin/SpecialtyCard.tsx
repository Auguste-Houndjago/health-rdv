import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Stethoscope, FileText } from 'lucide-react'
import Image from 'next/image'
import { Specialite } from './types'

interface SpecialtyCardProps {
  specialite?: Specialite
}

export default function SpecialtyCard({ specialite }: SpecialtyCardProps) {
  if (!specialite) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">Aucune spécialité disponible</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{specialite.nom}</CardTitle>
            <Badge variant="outline" className="mt-1">
              Spécialité
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {specialite.image && (
          <div className="mb-4">
            <div className="relative h-32 w-full rounded-lg overflow-hidden bg-muted">
              <Image
                src={specialite.image}
                alt={specialite.nom}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        {specialite.description && (
          <div className="flex items-start space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {specialite.description}
            </p>
          </div>
        )}
        
        {!specialite.description && (
          <p className="text-sm text-muted-foreground italic">
            Aucune description disponible pour cette spécialité.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
