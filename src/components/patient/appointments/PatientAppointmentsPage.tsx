"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, MapPin, User, Search } from 'lucide-react'
import DoctorSearch from '@/components/patient/appointments/DoctorSearch'
import TimeSlotSelector from '@/components/patient/appointments/TimeSlotSelector'
import AppointmentConfirmation from '@/components/patient/appointments/AppointmentConfirmation'
import PatientAppointmentsList from '@/components/patient/appointments/PatientAppointmentsList'
import { useEntityFilter } from '@/hooks/entity/useEntityFilter'

export interface Medecin {
  id: string
  nom: string
  prenom: string
  specialite: string
  hopital: {
    id: string
    nom: string
    adresse: string
  }
  experience: number
}

export interface CreneauDisponible {
  heureDebut: string
  heureFin: string
  duree: number
}

export interface RendezVousPatient {
  id: string
  medecin: Medecin
  date: string
  heure: string
  duree: number
  motif: string
  statut: 'CONFIRME' | 'EN_ATTENTE' | 'ANNULE' | 'TERMINE'
  hopitalId?: string
  notes?: string
}

export default function PatientAppointmentsPage() {
  const [selectedMedecin, setSelectedMedecin] = useState<Medecin | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedCreneau, setSelectedCreneau] = useState<CreneauDisponible | null>(null)
  const [motif, setMotif] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<'search' | 'time' | 'confirm'>('search')

  const handleMedecinSelect = (medecin: Medecin) => {
    setSelectedMedecin(medecin)
    setCurrentStep('time')
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  const handleCreneauSelect = (creneau: CreneauDisponible) => {
    setSelectedCreneau(creneau)
    setCurrentStep('confirm')
  }

  const handleBackToSearch = () => {
    setSelectedMedecin(null)
    setCurrentStep('search')
  }

  const handleBackToTime = () => {
    setSelectedCreneau(null)
    setCurrentStep('time')
  }

  const handleAppointmentConfirm = () => {
    // Logique de confirmation du rendez-vous
    console.log('Rendez-vous confirmé:', {
      medecin: selectedMedecin,
      date: selectedDate,
      creneau: selectedCreneau,
      motif
    })
    
    // Reset du formulaire
    setSelectedMedecin(null)
    setSelectedDate('')
    setSelectedCreneau(null)
    setMotif('')
    setCurrentStep('search')
  }


  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Prendre un Rendez-vous</h1>
        <p className="text-muted-foreground">
          Trouvez un médecin et réservez votre consultation
        </p>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">Nouveau Rendez-vous</TabsTrigger>
          <TabsTrigger value="list">Mes Rendez-vous</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Réservation de Rendez-vous
              </CardTitle>
              <CardDescription>
                Suivez les étapes pour réserver votre consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Indicateur de progression */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center md:space-x-4">
                  <div className={`flex items-center space-x-2 ${currentStep === 'search' ? 'text-primary' : currentStep === 'time' || currentStep === 'confirm' ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'search' ? 'bg-primary text-primary-foreground' : currentStep === 'time' || currentStep === 'confirm' ? 'bg-green-600 text-white' : 'bg-muted'}`}>
                      <Search className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Recherche</span>
                  </div>
                  
                  <div className={`w-2 md:w-8 h-1 ${currentStep === 'time' || currentStep === 'confirm' ? 'bg-green-600' : 'bg-muted'}`}></div>
                  
                  <div className={`flex items-center space-x-2 ${currentStep === 'time' ? 'text-primary' : currentStep === 'confirm' ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'time' ? 'bg-primary text-primary-foreground' : currentStep === 'confirm' ? 'bg-green-600 text-white' : 'bg-muted'}`}>
                      <Clock className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Créneau</span>
                  </div>
                  
                  <div className={`w-2 md:w-8 h-1 ${currentStep === 'confirm' ? 'bg-green-600' : 'bg-muted'}`}></div>
                  
                  <div className={`flex items-center space-x-2 ${currentStep === 'confirm' ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'confirm' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Confirmation</span>
                  </div>
                </div>
              </div>

              {/* Contenu des étapes */}
              {currentStep === 'search' && (
                <DoctorSearch 
                  onMedecinSelect={handleMedecinSelect}
                />
              )}

              {currentStep === 'time' && selectedMedecin && (
                <TimeSlotSelector
                  medecin={selectedMedecin}
                  onDateSelect={handleDateSelect}
                  onCreneauSelect={handleCreneauSelect}
                  onBack={handleBackToSearch}
                />
              )}

              {currentStep === 'confirm' && selectedMedecin && selectedCreneau && (
                <AppointmentConfirmation
                  medecin={selectedMedecin}
                  date={selectedDate}
                  creneau={selectedCreneau}
                  motif={motif}
                  onMotifChange={setMotif}
                  onConfirm={handleAppointmentConfirm}
                  onBack={handleBackToTime}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <PatientAppointmentsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}