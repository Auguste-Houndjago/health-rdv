"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, FileText, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface RendezVous {
  id: string
  date: Date
  statut: string
  duree: number
  motif: string
}

interface RendezVousDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rendezVous: RendezVous[]
  medecinNom: string
  medecinPrenom: string
  specialite: string
  onCancel?: (rdvId: string) => void
  loading?: boolean
}

export function RendezVousDetailsModal({
  open,
  onOpenChange,
  rendezVous,
  medecinNom,
  medecinPrenom,
  specialite,
  onCancel,
  loading = false
}: RendezVousDetailsModalProps) {
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (statut: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      'CONFIRME': { variant: 'default', label: 'Confirmé' },
      'EN_ATTENTE': { variant: 'secondary', label: 'En attente' },
      'ANNULE': { variant: 'destructive', label: 'Annulé' },
      'TERMINE': { variant: 'outline', label: 'Terminé' }
    }

    const config = variants[statut] || { variant: 'outline', label: statut }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (rendezVous.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vos rendez-vous</DialogTitle>
          <DialogDescription>
            Avec Dr. {medecinPrenom} {medecinNom} - {specialite}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {rendezVous.map((rdv, index) => (
            <div key={rdv.id}>
              {index > 0 && <Separator className="my-4" />}
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formatDate(rdv.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatTime(rdv.date)}</span>
                      <span className="text-muted-foreground text-sm">({rdv.duree} min)</span>
                    </div>

                    {rdv.motif && (
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">{rdv.motif}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(rdv.statut)}
                    
                    {rdv.statut !== 'ANNULE' && rdv.statut !== 'TERMINE' && onCancel && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCancel(rdv.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Annuler
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

