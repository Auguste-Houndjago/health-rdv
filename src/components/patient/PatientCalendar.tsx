"use client"

import { useState, useEffect, useMemo } from "react"
import { getMedecinPlanning, MedecinPlanning } from "@/services/medecins/medecins"
import { getRendezVousPatientMedecin } from "@/services/patients/rendez-vous-patient"
import { CalendarCard } from "../calendar/calendar-card"
import { useCreneauxDisponibles } from "@/hooks/useCreneauxDisponibles"
import { useRendezVousMutations } from "@/hooks/useRendezVousMutations"
import { useDocumentUploader } from "@/hooks/utils/useDocumentUploader"
import SimpleTimeSlotSelector, { TimeSlot } from "./appointments/SimpleTimeSlotSelector"
import SimpleAppointmentConfirm from "./appointments/SimpleAppointmentConfirm"
import { RendezVousActionDialog } from "./appointments/RendezVousActionDialog"
import { RendezVousDetailsModal } from "./appointments/RendezVousDetailsModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Stethoscope } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

interface PatientCalendarProps {
  medecinId: string
  patientId: string
  hopitalSlug?: string
  hopitalId?: string
}

interface ExistingRendezVous {
  id: string
  date: Date
  statut: string
  duree: number
  motif: string
}

export default function PatientCalendar({
  medecinId,
  patientId,
  hopitalSlug = '',
  hopitalId 
}: PatientCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [creneauxDisponibles, setCreneauxDisponibles] = useState<TimeSlot[]>([])
  const [step, setStep] = useState<'calendar' | 'confirm'>('calendar')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [planningData, setPlanningData] = useState<MedecinPlanning | null>(null)
  const [existingRendezVous, setExistingRendezVous] = useState<ExistingRendezVous[]>([])
  const [conflictingRdv, setConflictingRdv] = useState<ExistingRendezVous | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<'change' | 'cancel'>('change')
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedDayRdv, setSelectedDayRdv] = useState<ExistingRendezVous[]>([])

  const { createRendezVous, updateRendezVous, cancelRendezVous, loading: mutationLoading } = useRendezVousMutations()
  const { uploadDocument } = useDocumentUploader()
  const { getCreneauxForDate } = useCreneauxDisponibles({ medecinId, hopitalSlug })

  // Récupération des rendez-vous existants
  useEffect(() => {
    let isMounted = true

    const fetchRendezVous = async () => {
      const result = await getRendezVousPatientMedecin(medecinId)
      if (isMounted && result.success) {
        setExistingRendezVous(result.data)
      }
    }

    if (medecinId) {
      fetchRendezVous()
    }

    return () => {
      isMounted = false
    }
  }, [medecinId])

  // Récupération du planning
  useEffect(() => {
    let isMounted = true
    
    const fetchPlanning = async () => {
      try {
        if (isMounted) setLoading(true)
        const result = await getMedecinPlanning({ medecinId, hopitalSlug })
        if (isMounted) {
          setPlanningData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError('Erreur lors du chargement du planning')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (medecinId) {
      fetchPlanning()
    }

    return () => {
      isMounted = false
    }
  }, [medecinId, hopitalSlug])

  const medecin = planningData?.medecin
  const planningCreneaux = useMemo(() => {
    return planningData?.medecin?.plannings?.flatMap(p => p.creneaux) || []
  }, [planningData])

  const rendezVousExistants = useMemo(() => {
    return planningData?.medecin?.rendezVous || []
  }, [planningData])

  // Générer les jours du calendrier
  const calendarDays = useMemo(() => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    
    const days = []
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentYear, currentMonth, i)
      
      const rdvDuJour = existingRendezVous.filter(rdv => {
        const rdvDate = new Date(rdv.date)
        return rdvDate.toDateString() === date.toDateString()
      })

      days.push({
        day: i.toString(),
        date,
    isCurrentMonth: true,
        rendezVous: rdvDuJour,
        hasPatientRendezVous: rdvDuJour.length > 0
      })
    }
    
    return days
  }, [existingRendezVous])

  // Calculer les créneaux disponibles
  useEffect(() => {
    let isMounted = true
    
    if (selectedDate && planningCreneaux.length > 0) {
      getCreneauxForDate(selectedDate, planningCreneaux, rendezVousExistants).then(creneaux => {
        if (isMounted) {
          const now = new Date()
          const creneauxFiltered = creneaux.map(creneau => {
            const [heures, minutes] = creneau.heureDebut.split(':').map(Number)
            const creneauDate = new Date(selectedDate)
            creneauDate.setHours(heures, minutes, 0, 0)
            
            return {
              ...creneau,
              isPast: creneauDate < now
            }
          })
          
          setCreneauxDisponibles(creneauxFiltered)
        }
      })
    }

    return () => {
      isMounted = false
    }
  }, [selectedDate, planningCreneaux, rendezVousExistants, getCreneauxForDate])

  const handleDaySelect = (dayData: any) => {
    // Si le jour a des RDV, ouvrir le modal de détails
    if (dayData.hasPatientRendezVous) {
      setSelectedDayRdv(dayData.rendezVous)
      setDetailsModalOpen(true)
    } else {
      setSelectedDate(dayData.date)
      setSelectedSlot(null)
      setStep('calendar')
    }
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    const dateStr = selectedDate?.toISOString().split('T')[0]
    
    // Vérifier si le patient a déjà un RDV sur cette date (peu importe l'heure)
    const rdvSurLaDate = existingRendezVous.find(rdv => {
      const rdvDate = new Date(rdv.date)
      const rdvDateStr = rdvDate.toISOString().split('T')[0]
      return rdvDateStr === dateStr && rdv.statut !== 'ANNULE'
    })

    if (rdvSurLaDate) {
      toast.error("Vous avez déjà un rendez-vous prévu ce jour-là", {
        description: `Le ${new Date(rdvSurLaDate.date).toLocaleDateString('fr-FR')} à ${new Date(rdvSurLaDate.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
      })
      return
    }

    // Vérifier si conflit avec même heure
    const rdvConflict = existingRendezVous.find(rdv => {
      const rdvDate = new Date(rdv.date)
      const rdvDateStr = rdvDate.toISOString().split('T')[0]
      const rdvHour = rdvDate.toTimeString().slice(0, 5)
      
      return rdvDateStr === dateStr && rdvHour === slot.heureDebut
    })

    if (rdvConflict) {
      setConflictingRdv(rdvConflict)
      setSelectedSlot(slot)
      
      if (rdvConflict.statut === 'CONFIRME') {
        setDialogType('cancel')
      } else {
        setDialogType('change')
      }
      
      setDialogOpen(true)
    } else {
      setSelectedSlot(slot)
      setStep('confirm')
    }
  }

  const handleDialogConfirm = async () => {
    if (!conflictingRdv || !selectedSlot || !selectedDate) return

    if (dialogType === 'cancel') {
      const result = await cancelRendezVous({ rendezVousId: conflictingRdv.id })
      
      if (result.success) {
        setExistingRendezVous(prev => prev.filter(rdv => rdv.id !== conflictingRdv.id))
        setDialogOpen(false)
        setConflictingRdv(null)
        setStep('confirm')
        toast.success("Rendez-vous annulé avec succès")
      }
    } else {
      const dateStr = selectedDate.toISOString().split('T')[0]
      
      const result = await updateRendezVous({
        rendezVousId: conflictingRdv.id,
        date: dateStr,
        heure: selectedSlot.heureDebut,
        duree: selectedSlot.duree,
        motif: conflictingRdv.motif
      })
      
      if (result.success) {
        const rdvResult = await getRendezVousPatientMedecin(medecinId)
        if (rdvResult.success) {
          setExistingRendezVous(rdvResult.data)
        }
        setDialogOpen(false)
        setConflictingRdv(null)
        toast.success("Rendez-vous modifié avec succès")
        
        setTimeout(() => {
          setSelectedDate(null)
          setSelectedSlot(null)
          setStep('calendar')
        }, 2000)
      }
    }
  }

  const handleConfirm = async (motif: string, files?: File[]) => {
    if (!selectedDate || !selectedSlot) return

    const dateStr = selectedDate.toISOString().split('T')[0]
    
    const toastId = toast.loading("Création du rendez-vous...")
    
    const result = await createRendezVous({
      medecinId,
      date: dateStr,
      heure: selectedSlot.heureDebut,
      duree: selectedSlot.duree,
      motif,
      hopitalId: hopitalId || ''
    })

    if (result.success) {
      // Upload des fichiers si présents
      if (files && files.length > 0) {
        for (const file of files) {
          await uploadDocument({
            titre: file.name.replace(/\.[^/.]+$/, ""),
            description: `Document pour RDV du ${dateStr}`,
            file,
            patientId
          })
        }
      }

      // Recharger les RDV
      const rdvResult = await getRendezVousPatientMedecin(medecinId)
      if (rdvResult.success) {
        setExistingRendezVous(rdvResult.data)
      }
      
      toast.success("Rendez-vous créé avec succès !", {
        id: toastId,
        description: `Le ${new Date(dateStr).toLocaleDateString('fr-FR')} à ${selectedSlot.heureDebut}`
      })
      
      setTimeout(() => {
        setSelectedDate(null)
        setSelectedSlot(null)
        setStep('calendar')
      }, 2000)
    } else {
      toast.error("Erreur lors de la création", {
        id: toastId,
        description: result.error
      })
    }
  }

  const handleCancelFromModal = async (rdvId: string) => {
    const result = await cancelRendezVous({ rendezVousId: rdvId })
    
    if (result.success) {
      setExistingRendezVous(prev => prev.filter(rdv => rdv.id !== rdvId))
      setSelectedDayRdv(prev => prev.filter(rdv => rdv.id !== rdvId))
      toast.success("Rendez-vous annulé avec succès")
      
      if (selectedDayRdv.length === 1) {
        setDetailsModalOpen(false)
      }
    } else {
      toast.error("Erreur lors de l'annulation")
    }
  }

  const handleBack = () => {
    setSelectedSlot(null)
    setStep('calendar')
  }

  if (loading) {
    return (
      <div className="w-full h-[630px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du planning...</p>
        </div>
      </div>
    )
  }

  if (error || !medecin) {
    return (
      <div className="w-full h-[630px] flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement du planning du médecin
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex justify-center h-[630px] overflow-hidden mx-auto p-0">
        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Choisir une date
                  </CardTitle>
                  {medecin && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4" />
                      <span className="font-medium">
                        Dr. {medecin.utilisateur.prenom} {medecin.utilisateur.nom}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
          <CalendarCard
                  currentDate={new Date()}
                  days={calendarDays}
                  selectedDate={selectedDate}
            onNavigate={() => {}}
                  onDaySelect={handleDaySelect}
          />
              </CardContent>
            </Card>
        </div>

          <div className="w-full md:w-80">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  {step === 'calendar' ? (
                    <>
                      <Stethoscope className="h-5 w-5" />
                      Créneaux disponibles
                    </>
                  ) : (
                    <>
                      <Stethoscope className="h-5 w-5" />
                      Confirmation
                    </>
                  )}
                </CardTitle>
                {selectedDate && step === 'calendar' && (
                  <Badge variant="secondary" className="w-fit">
                    {selectedDate.toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-[500px]">
                {step === 'calendar' ? (
                  selectedDate ? (
                    <SimpleTimeSlotSelector
                      timeSlots={creneauxDisponibles}
                      selectedSlot={selectedSlot}
                      onSlotSelect={handleSlotSelect}
                    />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Sélectionnez une date</p>
            </div>
                  )
                ) : (
                  selectedDate && selectedSlot && medecin && (
                    <SimpleAppointmentConfirm
                      medecinNom={medecin.utilisateur.nom}
                      medecinPrenom={medecin.utilisateur.prenom || ''}
                      specialite={medecin.specialite.nom}
                      selectedDate={selectedDate}
                      selectedSlot={selectedSlot}
                      patientId={patientId}
                      onConfirm={(motif, files) => handleConfirm(motif, files)}
                      onBack={handleBack}
                    />
                  )
                )}
              </CardContent>
            </Card>
          </div>
      </div>
    </div>

      {conflictingRdv && selectedDate && selectedSlot && (
        <RendezVousActionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          type={dialogType}
          existingDate={new Date(conflictingRdv.date).toISOString().split('T')[0]}
          existingHour={new Date(conflictingRdv.date).toTimeString().slice(0, 5)}
          newDate={selectedDate.toISOString().split('T')[0]}
          newHour={selectedSlot.heureDebut}
          onConfirm={handleDialogConfirm}
          loading={mutationLoading}
        />
      )}

      {medecin && (
        <RendezVousDetailsModal
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          rendezVous={selectedDayRdv}
          medecinNom={medecin.utilisateur.nom}
          medecinPrenom={medecin.utilisateur.prenom || ''}
          specialite={medecin.specialite.nom}
          onCancel={handleCancelFromModal}
          loading={mutationLoading}
        />
      )}
    </>
  )
}
