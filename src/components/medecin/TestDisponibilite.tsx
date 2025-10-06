"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { creerPlanningDisponibilite } from '@/app/actions/disponibilites'
import { toast } from 'sonner'

export default function TestDisponibilite() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  const testCreerDisponibilite = async () => {
    setLoading(true)
    setResult('')
    
    try {
      // Données de test
      const formData = new FormData()
      formData.append('medecinId', 'test-medecin-id')
      formData.append('specialiteId', 'test-specialite-id')
      formData.append('dateDebut', '2024-01-01')
      formData.append('dateFin', '2024-12-31')
      formData.append('creneaux', JSON.stringify([
        {
          jour: 'lundi',
          heureDebut: '09:00',
          heureFin: '17:00',
          dureeConsultation: 30,
          pauseEntreConsultations: 10,
          actif: true
        },
        {
          jour: 'mardi',
          heureDebut: '09:00',
          heureFin: '17:00',
          dureeConsultation: 30,
          pauseEntreConsultations: 10,
          actif: true
        }
      ]))

      const result = await creerPlanningDisponibilite(formData)
      
      if (result.success) {
        setResult(`✅ Succès: ${result.message}`)
        toast.success("Test de création de disponibilités réussi !")
      } else {
        setResult(`❌ Erreur: ${result.errors?.join(', ') || result.message}`)
        toast.error("Test de création de disponibilités échoué")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      setResult(`❌ Exception: ${errorMessage}`)
      toast.error("Erreur lors du test")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Test de création de disponibilités</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testCreerDisponibilite} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Test en cours...' : 'Tester la création de disponibilités'}
        </Button>
        
        {result && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          <p><strong>Ce test vérifie :</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>La validation des données avec Valibot</li>
            <li>La structure des créneaux horaires</li>
            <li>La gestion des erreurs</li>
            <li>Le retour des messages de succès/erreur</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
