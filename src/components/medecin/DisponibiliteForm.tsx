"use client"

import React, { useState, useEffect } from "react";
import { useDisponibilites } from "@/hooks/useDisponibilites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Trash2, 
  Clock, 
  Calendar,
  Building,
  Save,
  X,
  AlertCircle
} from "lucide-react";
// Types pour les jours de la semaine
type JourSemaine = "LUNDI" | "MARDI" | "MERCREDI" | "JEUDI" | "VENDREDI" | "SAMEDI" | "DIMANCHE";
import { toast } from "sonner";

interface CreneauFormData {
  jour: JourSemaine;
  heureDebut: string;
  heureFin: string;
  dureeConsultation: number;
  pauseEntreConsultations: number;
  actif: boolean;
}

interface DisponibiliteFormProps {
  hopitalId?: string;
  planningId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const JOURS_SEMAINE: { value: JourSemaine; label: string }[] = [
  { value: "LUNDI", label: "Lundi" },
  { value: "MARDI", label: "Mardi" },
  { value: "MERCREDI", label: "Mercredi" },
  { value: "JEUDI", label: "Jeudi" },
  { value: "VENDREDI", label: "Vendredi" },
  { value: "SAMEDI", label: "Samedi" },
  { value: "DIMANCHE", label: "Dimanche" }
];

export default function DisponibiliteForm({ 
  hopitalId, 
  planningId, 
  onSuccess, 
  onCancel 
}: DisponibiliteFormProps) {
  const [formData, setFormData] = useState({
    dateDebut: "",
    dateFin: "",
    creneaux: [] as CreneauFormData[]
  });
  const [erreurs, setErreurs] = useState<string[]>([]);

  const { 
    plannings, 
    creerPlanning, 
    modifierPlanning, 
    validerCreneaux,
    isCreating,
    isUpdating 
  } = useDisponibilites();

  // Charger les données du planning si modification
  useEffect(() => {
    if (planningId && plannings.length > 0) {
      const planning = plannings.find(p => p.id === planningId);
      if (planning) {
        setFormData({
          dateDebut: planning.dateDebut.toISOString().split('T')[0],
          dateFin: planning.dateFin ? planning.dateFin.toISOString().split('T')[0] : "",
          creneaux: planning.creneaux.map(creneau => ({
            jour: creneau.jour,
            heureDebut: creneau.heureDebut,
            heureFin: creneau.heureFin,
            dureeConsultation: creneau.dureeConsultation,
            pauseEntreConsultations: creneau.pauseEntreConsultations,
            actif: creneau.actif
          }))
        });
      }
    }
  }, [planningId, plannings]);

  const ajouterCreneau = () => {
    setFormData(prev => ({
      ...prev,
      creneaux: [
        ...prev.creneaux,
        {
          jour: "LUNDI",
          heureDebut: "09:00",
          heureFin: "17:00",
          dureeConsultation: 30,
          pauseEntreConsultations: 0,
          actif: true
        }
      ]
    }));
  };

  const supprimerCreneau = (index: number) => {
    setFormData(prev => ({
      ...prev,
      creneaux: prev.creneaux.filter((_, i) => i !== index)
    }));
  };

  const modifierCreneau = (index: number, field: keyof CreneauFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      creneaux: prev.creneaux.map((creneau, i) => 
        i === index ? { ...creneau, [field]: value } : creneau
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErreurs([]);

    // Validation des données
    const validation = validerCreneaux(formData.creneaux);
    if (!validation.valide) {
      setErreurs(validation.erreurs);
      return;
    }

    if (!formData.dateDebut) {
      setErreurs(["La date de début est obligatoire"]);
      return;
    }

    if (formData.dateFin && new Date(formData.dateFin) <= new Date(formData.dateDebut)) {
      setErreurs(["La date de fin doit être après la date de début"]);
      return;
    }

    // Soumettre le formulaire
    const data = {
      hopitalId,
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin || undefined,
      creneaux: formData.creneaux
    };

    if (planningId) {
      modifierPlanning(planningId, data);
    } else {
      creerPlanning(data);
    }

    onSuccess?.();
  };

  const isProcessing = isCreating || isUpdating;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {planningId ? "Modifier le planning" : "Nouveau planning de disponibilité"}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Période */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateDebut">Date de début *</Label>
              <Input
                id="dateDebut"
                type="date"
                value={formData.dateDebut}
                onChange={(e) => setFormData(prev => ({ ...prev, dateDebut: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
              <Input
                id="dateFin"
                type="date"
                value={formData.dateFin}
                onChange={(e) => setFormData(prev => ({ ...prev, dateFin: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          {/* Créneaux */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-medium">Créneaux de disponibilité</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={ajouterCreneau}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter un créneau
              </Button>
            </div>

            {formData.creneaux.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucun créneau défini</p>
                <p className="text-sm">Cliquez sur "Ajouter un créneau" pour commencer</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.creneaux.map((creneau, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {JOURS_SEMAINE.find(j => j.value === creneau.jour)?.label}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {creneau.heureDebut} - {creneau.heureFin}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={creneau.actif}
                          onCheckedChange={(checked) => 
                            modifierCreneau(index, 'actif', checked)
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => supprimerCreneau(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Jour</Label>
                        <Select
                          value={creneau.jour}
                          onValueChange={(value: JourSemaine) => 
                            modifierCreneau(index, 'jour', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {JOURS_SEMAINE.map(jour => (
                              <SelectItem key={jour.value} value={jour.value}>
                                {jour.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Heure de début</Label>
                        <Input
                          type="time"
                          value={creneau.heureDebut}
                          onChange={(e) => 
                            modifierCreneau(index, 'heureDebut', e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Heure de fin</Label>
                        <Input
                          type="time"
                          value={creneau.heureFin}
                          onChange={(e) => 
                            modifierCreneau(index, 'heureFin', e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Durée consultation (min)</Label>
                        <Input
                          type="number"
                          min="15"
                          max="120"
                          value={creneau.dureeConsultation}
                          onChange={(e) => 
                            modifierCreneau(index, 'dureeConsultation', parseInt(e.target.value) || 30)
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label>Pause entre consultations (min)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="60"
                        value={creneau.pauseEntreConsultations}
                        onChange={(e) => 
                          modifierCreneau(index, 'pauseEntreConsultations', parseInt(e.target.value) || 0)
                        }
                        className="w-32"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Erreurs */}
          {erreurs.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Erreurs de validation</span>
              </div>
              <ul className="list-disc list-inside text-sm text-red-700">
                {erreurs.map((erreur, index) => (
                  <li key={index}>{erreur}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <Separator />
          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isProcessing}
              >
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            )}
            <Button
              type="submit"
              disabled={isProcessing || formData.creneaux.length === 0}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isProcessing ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}