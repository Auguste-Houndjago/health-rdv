"use client"

import React, { useState } from "react";
import { useDisponibilites } from "@/hooks/useDisponibilites";
import DisponibiliteForm from "./DisponibiliteForm";
import DisponibiliteCalendar from "./DisponibiliteCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Plus, 
  Calendar, 
  Settings, 
  Eye,
  Edit,
  Trash2,
  Building,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DisponibilitePage() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [showForm, setShowForm] = useState(false);
  const [editingPlanning, setEditingPlanning] = useState<string | null>(null);
  const [viewingPlanning, setViewingPlanning] = useState<string | null>(null);

  const { 
    plannings, 
    isLoading, 
    getStatistiques,
    getCreneauxPlanning 
  } = useDisponibilites();

  const stats = getStatistiques();

  const handleCreatePlanning = () => {
    setEditingPlanning(null);
    setShowForm(true);
  };

  const handleEditPlanning = (planningId: string) => {
    setEditingPlanning(planningId);
    setShowForm(true);
  };

  const handleViewPlanning = (planningId: string) => {
    setViewingPlanning(planningId);
  };

  const handleDeletePlanning = (planningId: string) => {
    // La suppression est gérée par le hook
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPlanning(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPlanning(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Chargement des disponibilités...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions rapides */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleCreatePlanning} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouveau planning
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setActiveTab("calendar")}
          className="flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Calendrier
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setActiveTab("list")}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Liste des plannings
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total plannings</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Actifs</p>
                <p className="text-2xl font-bold">{stats.actifs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Avec hôpital</p>
                <p className="text-2xl font-bold">{stats.avecHopital}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Sans hôpital</p>
                <p className="text-2xl font-bold">{stats.sansHopital}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="list">Liste des plannings</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <DisponibiliteCalendar
            onEdit={handleEditPlanning}
            onDelete={handleDeletePlanning}
            onView={handleViewPlanning}
          />
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Liste des plannings</CardTitle>
            </CardHeader>
            <CardContent>
              {plannings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Aucun planning</h3>
                  <p>Créez votre premier planning de disponibilité</p>
                  <Button 
                    onClick={handleCreatePlanning}
                    className="mt-4"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer un planning
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {plannings.map((planning) => (
                    <Card key={planning.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">
                              Planning du {format(new Date(planning.dateDebut), "dd/MM/yyyy", { locale: fr })}
                            </h3>
                            {planning.dateFin && (
                              <span className="text-gray-500">
                                au {format(new Date(planning.dateFin), "dd/MM/yyyy", { locale: fr })}
                              </span>
                            )}
                            {!planning.dateFin && (
                              <span className="text-green-600 text-sm">Permanent</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {planning.creneaux.length} créneau{planning.creneaux.length > 1 ? 'x' : ''}
                            </div>
                            
                            {planning.hopital && (
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {planning.hopital.nom}
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${planning.actif ? 'bg-green-500' : 'bg-gray-400'}`} />
                              {planning.actif ? 'Actif' : 'Inactif'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewPlanning(planning.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPlanning(planning.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePlanning(planning.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de formulaire */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPlanning ? "Modifier le planning" : "Nouveau planning de disponibilité"}
            </DialogTitle>
          </DialogHeader>
          <DisponibiliteForm
            planningId={editingPlanning || undefined}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Modal de visualisation */}
      <Dialog open={!!viewingPlanning} onOpenChange={() => setViewingPlanning(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du planning</DialogTitle>
          </DialogHeader>
          {viewingPlanning && (
            <div className="space-y-4">
              {(() => {
                const planning = plannings.find(p => p.id === viewingPlanning);
                if (!planning) return null;

                return (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-medium">Période</h4>
                      <p className="text-sm text-gray-600">
                        Du {format(new Date(planning.dateDebut), "dd/MM/yyyy", { locale: fr })}
                        {planning.dateFin && (
                          <> au {format(new Date(planning.dateFin), "dd/MM/yyyy", { locale: fr })}</>
                        )}
                        {!planning.dateFin && " (Permanent)"}
                      </p>
                    </div>

                    {planning.hopital && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Hôpital</h4>
                        <p className="text-sm text-gray-600">{planning.hopital.nom}</p>
                        <p className="text-sm text-gray-500">{planning.hopital.adresse}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="font-medium">Créneaux ({planning.creneaux.length})</h4>
                      <div className="space-y-2">
                        {planning.creneaux.map((creneau, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {creneau.jour.toLowerCase().replace(/^\w/, c => c.toUpperCase())}
                              </span>
                              <span className="text-sm text-gray-600">
                                {creneau.heureDebut} - {creneau.heureFin}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {creneau.dureeConsultation}min + {creneau.pauseEntreConsultations}min pause
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
