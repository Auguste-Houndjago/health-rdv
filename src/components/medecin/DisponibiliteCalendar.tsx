"use client"

import React, { useState } from "react";
import { useDisponibilites } from "@/hooks/useDisponibilites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Building, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";
import { format, parseISO, isWithinInterval, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { fr } from "date-fns/locale";

interface DisponibiliteCalendarProps {
  hopitalId?: string;
  onEdit?: (planningId: string) => void;
  onDelete?: (planningId: string) => void;
  onView?: (planningId: string) => void;
}

const JOURS_SEMAINE = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];

export default function DisponibiliteCalendar({ 
  hopitalId, 
  onEdit, 
  onDelete, 
  onView 
}: DisponibiliteCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { 
    plannings, 
    getStatistiques, 
    supprimerPlanning,
    isDeleting 
  } = useDisponibilites();

  const stats = getStatistiques();

  // Filtrer les plannings par hôpital si spécifié
  const planningsFiltres = hopitalId 
    ? plannings.filter(p => p.hopitalId === hopitalId)
    : plannings;

  // Obtenir la semaine de la date sélectionnée
  const startWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const endWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const daysOfWeek = eachDayOfInterval({ start: startWeek, end: endWeek });

  // Obtenir les créneaux pour un jour donné
  const getCreneauxForDay = (date: Date) => {
    const dayName = JOURS_SEMAINE[date.getDay() === 0 ? 6 : date.getDay() - 1];
    
    return planningsFiltres
      .filter(planning => {
        const dateDebut = parseISO(planning.dateDebut.toISOString().split('T')[0]);
        const dateFin = planning.dateFin ? parseISO(planning.dateFin.toISOString().split('T')[0]) : null;
        
        return isWithinInterval(date, {
          start: dateDebut,
          end: dateFin || new Date('2099-12-31')
        });
      })
      .flatMap(planning => 
        planning.creneaux
          .filter(creneau => creneau.jour === dayName && creneau.actif)
          .map(creneau => ({
            ...creneau,
            planningId: planning.id,
            hopital: planning.hopital
          }))
      );
  };

  const handleDelete = async (planningId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce planning ?")) {
      supprimerPlanning(planningId);
      onDelete?.(planningId);
    }
  };

  return (
    <div className="space-y-6">


      {/* Calendrier */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Calendrier des disponibilités
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
              >
                Aujourd'hui
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Navigation du mois */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
            >
              ← Précédent
            </Button>
            
            <h3 className="text-lg font-semibold">
              {format(selectedDate, "MMMM yyyy", { locale: fr })}
            </h3>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
            >
              Suivant →
            </Button>
          </div>

          {/* En-têtes des jours */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center p-2 font-medium text-gray-600">
                {format(day, "EEE", { locale: fr })}
                <div className="text-sm text-gray-400">
                  {format(day, "d")}
                </div>
              </div>
            ))}
          </div>

          {/* Créneaux pour chaque jour */}
          <div className="space-y-4">
            {daysOfWeek.map((day, dayIndex) => {
              const creneaux = getCreneauxForDay(day);
              const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
              
              return (
                <div key={dayIndex} className={`p-4 rounded-lg border ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {format(day, "EEEE d MMMM", { locale: fr })}
                      </span>
                      {isToday && (
                        <Badge variant="default">Aujourd'hui</Badge>
                      )}
                    </div>
                    <Badge variant="outline">
                      {creneaux.length} créneau{creneaux.length > 1 ? 'x' : ''}
                    </Badge>
                  </div>

                  {creneaux.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Aucun créneau disponible</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {creneaux.map((creneau, creneauIndex) => (
                        <div key={creneauIndex} className="bg-white p-3 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">
                                {creneau.heureDebut} - {creneau.heureFin}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {onView && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onView(creneau.planningId)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              )}
                              {onEdit && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onEdit(creneau.planningId)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(creneau.planningId)}
                                disabled={isDeleting}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Durée:</span>
                              <span>{creneau.dureeConsultation} min</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Pause:</span>
                              <span>{creneau.pauseEntreConsultations} min</span>
                            </div>
                            {creneau.hopital && (
                              <div className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                <span className="text-xs">{creneau.hopital.nom}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
