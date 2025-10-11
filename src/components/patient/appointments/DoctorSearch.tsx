"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, Star, Clock, Euro, User } from 'lucide-react'
import { Medecin } from './PatientAppointmentsPage'
import { useEntityFilter } from '@/hooks/entity/useEntityFilter'
import { getAllMedecins } from '@/app/actions/medecin'

// Type pour les médecins avec hôpitaux multiples
interface MedecinWithHopitaux {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string | null
  specialite: string
  tarif: number
  note: number
  experience: number
  hopitaux: Array<{
    id: string
    nom: string
    adresse: string
  }>
}

interface DoctorSearchProps {
  onMedecinSelect: (medecin: Medecin) => void
}

export default function DoctorSearch({ onMedecinSelect }: DoctorSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialite, setSpecialite] = useState('all')
  const [hopital, setHopital] = useState('all')

  // Utilisation du hook useEntityFilter pour récupérer les médecins
  const { data, loading, error } = useEntityFilter<MedecinWithHopitaux>({
    entityName: "getAllMedecins",
    fetchFn: getAllMedecins
  })

  // Filtrage côté client pour les critères de recherche
  const filteredMedecins = (data?.items || []).filter(medecin => {
    // Filtre par nom/prénom
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const nomMatch = medecin.nom.toLowerCase().includes(searchLower)
      const prenomMatch = medecin.prenom.toLowerCase().includes(searchLower)
      if (!nomMatch && !prenomMatch) return false
    }

    // Filtre par spécialité
    if (specialite !== 'all' && medecin.specialite !== specialite) {
      return false
    }

    // Filtre par hôpital
    if (hopital !== 'all') {
      const hasMatchingHopital = medecin.hopitaux.some(h => 
        h.nom.toLowerCase().includes(hopital.toLowerCase())
      )
      if (!hasMatchingHopital) return false
    }

    return true
  })

  const specialites = [
    'Cardiologie',
    'Dermatologie',
    'Gynécologie',
    'Neurologie',
    'Ophtalmologie',
    'Orthopédie',
    'Pédiatrie',
    'Psychiatrie',
    'Radiologie',
    'Urologie'
  ]

  const hopitaux = [
    'Hôpital Central',
    'Clinique Saint-Pierre',
    'Centre Médical Nord',
    'Hôpital Universitaire',
    'Clinique du Sud'
  ]

  const handleMedecinClick = (medecinWithHopitaux: MedecinWithHopitaux) => {
    // Transformer le médecin avec hôpitaux multiples en format Medecin
    const medecin: Medecin = {
      id: medecinWithHopitaux.id,
      nom: medecinWithHopitaux.nom,
      prenom: medecinWithHopitaux.prenom,
      specialite: medecinWithHopitaux.specialite,
      hopital: medecinWithHopitaux.hopitaux[0] || {
        id: '',
        nom: 'Non spécifié',
        adresse: ''
      },
      tarif: medecinWithHopitaux.tarif,
      note: medecinWithHopitaux.note,
      experience: medecinWithHopitaux.experience
    }
    onMedecinSelect(medecin)
  }

  return (
    <div className="space-y-6">
      {/* Formulaire de recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher un Médecin
          </CardTitle>
          <CardDescription>
            Trouvez le médecin qui correspond à vos besoins
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du médecin</label>
              <Input
                placeholder="Dr. Dupont..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Spécialité</label>
              <Select value={specialite} onValueChange={setSpecialite}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une spécialité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les spécialités</SelectItem>
                  {specialites.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Hôpital</label>
              <Select value={hopital} onValueChange={setHopital}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un hôpital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les hôpitaux</SelectItem>
                  {hopitaux.map((hop) => (
                    <SelectItem key={hop} value={hop}>
                      {hop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error.message || 'Erreur lors du chargement'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Résultats de recherche */}
      {loading && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Chargement des médecins...</p>
          </CardContent>
        </Card>
      )}

      {!loading && filteredMedecins.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Médecins disponibles ({filteredMedecins.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedecins.map((medecin) => (
              <Card 
                key={medecin.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleMedecinClick(medecin)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">
                        Dr. {medecin.prenom} {medecin.nom}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {medecin.hopitaux[0]?.nom || 'Non spécifié'}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {medecin.specialite}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{medecin.note}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Euro className="h-4 w-4" />
                      <span>{medecin.tarif}€</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{medecin.experience} ans d'expérience</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{medecin.hopitaux[0]?.adresse || 'Adresse non spécifiée'}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-3">
                    <User className="h-4 w-4 mr-2" />
                    Choisir ce médecin
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!loading && filteredMedecins.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun médecin trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
