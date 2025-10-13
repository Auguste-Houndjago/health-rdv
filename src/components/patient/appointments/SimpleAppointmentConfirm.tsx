"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Calendar, Clock, AlertCircle, Loader2, File, X } from 'lucide-react'
import { TimeSlot } from './SimpleTimeSlotSelector'

interface SimpleAppointmentConfirmProps {
  medecinNom: string
  medecinPrenom: string
  specialite: string
  selectedDate: Date
  selectedSlot: TimeSlot
  patientId: string
  onConfirm: (motif: string, files?: File[]) => Promise<void>
  onBack: () => void
}

export default function SimpleAppointmentConfirm({
  medecinNom,
  medecinPrenom,
  specialite,
  selectedDate,
  selectedSlot,
  patientId,
  onConfirm,
  onBack
}: SimpleAppointmentConfirmProps) {
  const [motif, setMotif] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleConfirm = async () => {
    if (!motif.trim()) {
      setError('Le motif est requis')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await onConfirm(motif.trim(), selectedFiles)
    } catch (err) {
      setError('Erreur lors de la confirmation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Récapitulatif */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Récapitulatif
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Médecin</p>
            <p className="font-semibold">
              Dr. {medecinPrenom} {medecinNom} - {specialite}
            </p>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-muted-foreground text-xs">Date</p>
                <p className="font-medium">{formatDate(selectedDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-muted-foreground text-xs">Heure</p>
                <p className="font-medium">{selectedSlot.heureDebut}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motif */}
      <div className="space-y-2">
        <Label htmlFor="motif">Motif de consultation *</Label>
        <Input
          id="motif"
          placeholder="Ex: Consultation générale, douleur..."
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
        />
      </div>

      {/* Upload documents */}
      <div className="space-y-2">
        <Label htmlFor="documents">
          Documents médicaux <span className="text-xs text-muted-foreground">(optionnel)</span>
        </Label>
        
        {selectedFiles.length > 0 && (
          <div className="space-y-2 mb-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-primary" />
                  <div className="text-xs">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div className="border-2 border-dashed rounded-lg p-3">
          <Input
            id="documents"
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <Label 
            htmlFor="documents" 
            className="cursor-pointer flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <File className="h-4 w-4" />
            <span>Cliquez pour ajouter des fichiers</span>
          </Label>
        </div>
      </div>

      {/* Erreur */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={loading}
          className="flex-1"
        >
          Retour
        </Button>
        <Button 
          onClick={handleConfirm}
          disabled={loading || !motif.trim()}
          className="flex-1"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Confirmation...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmer
            </>
          )}
        </Button>
      </div>

      {/* Info */}
      <Alert>
        <AlertDescription className="text-xs">
          Vous recevrez une confirmation par email et un rappel 24h avant.
        </AlertDescription>
      </Alert>
    </div>
  )
}

