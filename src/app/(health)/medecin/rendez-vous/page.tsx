"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  MoreHorizontal,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { 
  obtenirRendezVousMedecin, 
  obtenirStatistiquesRendezVous,
  type RendezVous 
} from "@/app/actions/rendez-vous";

export default function RendezVousPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRDVDialog, setShowRDVDialog] = useState(false);
  const [selectedRDV, setSelectedRDV] = useState<RendezVous | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);
  const [stats, setStats] = useState({
    totalRDV: 0,
    rdvAujourdhui: 0,
    rdvConfirmes: 0,
    rdvEnAttente: 0
  });
  const [loading, setLoading] = useState(true);

  // Charger les données au montage du composant
  useEffect(() => {
    chargerDonnees();
  }, []);

  const chargerDonnees = async () => {
    setLoading(true);
    try {
      const [rdvResult, statsResult] = await Promise.all([
        obtenirRendezVousMedecin(),
        obtenirStatistiquesRendezVous()
      ]);

      if (rdvResult.success) {
        setRendezVous(rdvResult.data || []);
      } else {
        toast.error(rdvResult.error || "Erreur lors du chargement des rendez-vous");
      }

      if (statsResult.success) {
        setStats(statsResult.data || {
          totalRDV: 0,
          rdvAujourdhui: 0,
          rdvConfirmes: 0,
          rdvEnAttente: 0
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const filteredRDV = rendezVous.filter(rdv =>
    rdv.patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rdv.patient.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rdv.motif.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewRDV = (rdv: RendezVous) => {
    setSelectedRDV(rdv);
    setShowRDVDialog(true);
  };

  const handleRefresh = () => {
    chargerDonnees();
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "CONFIRME":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case "EN_ATTENTE":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "ANNULE":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case "CONFIRME":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "EN_ATTENTE":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "ANNULE":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des rendez-vous...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rendez-vous</h1>
          <p className="text-muted-foreground">
            Gérez votre planning et vos rendez-vous
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
          >
            Liste
          </Button>
          <Button 
            variant={viewMode === "calendar" ? "default" : "outline"}
            onClick={() => setViewMode("calendar")}
          >
            Calendrier
          </Button>
          <Button variant="outline" onClick={handleRefresh}>
            <Clock className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total RDV</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRDV}</div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rdvAujourdhui}</div>
            <p className="text-xs text-muted-foreground">
              Rendez-vous prévus
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmés</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rdvConfirmes}</div>
            <p className="text-xs text-muted-foreground">
              RDV confirmés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rdvEnAttente}</div>
            <p className="text-xs text-muted-foreground">
              À confirmer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche et filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un rendez-vous..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vue calendrier ou liste */}
      {viewMode === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Liste des Rendez-vous</CardTitle>
            <CardDescription>
              {filteredRDV.length} rendez-vous trouvé(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRDV.map((rdv) => (
                  <TableRow key={rdv.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {rdv.patient.prenom[0]}{rdv.patient.nom[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {rdv.patient.prenom} {rdv.patient.nom}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {rdv.patient.telephone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {new Date(rdv.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{rdv.heure}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {rdv.motif}
                      </div>
                    </TableCell>
                    <TableCell>
                      {rdv.duree} min
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatutIcon(rdv.statut)}
                        {getStatutBadge(rdv.statut)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRDV(rdv)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
            <CardDescription>
              Vue calendrier des rendez-vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-6">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="w-80">
                <h3 className="font-semibold mb-4">Rendez-vous du jour</h3>
                <div className="space-y-3">
                  {filteredRDV
                    .filter(rdv => rdv.date === (selectedDate ? format(selectedDate, 'yyyy-MM-dd') : new Date().toISOString().split('T')[0]))
                    .map((rdv) => (
                      <Card key={rdv.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">
                              {rdv.patient.prenom} {rdv.patient.nom}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {rdv.heure} - {rdv.motif}
                            </div>
                          </div>
                          {getStatutIcon(rdv.statut)}
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog de détail RDV */}
      <Dialog open={showRDVDialog} onOpenChange={setShowRDVDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du Rendez-vous</DialogTitle>
            <DialogDescription>
              Informations complètes du rendez-vous
            </DialogDescription>
          </DialogHeader>
          {selectedRDV && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">
                    {selectedRDV.patient.prenom[0]}{selectedRDV.patient.nom[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedRDV.patient.prenom} {selectedRDV.patient.nom}
                  </h3>
                  <p className="text-muted-foreground">
                    {new Date(selectedRDV.date).toLocaleDateString('fr-FR')} à {selectedRDV.heure}
                  </p>
                  {getStatutBadge(selectedRDV.statut)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Téléphone</Label>
                  <p className="text-sm">{selectedRDV.patient.telephone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedRDV.patient.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Motif</Label>
                  <p className="text-sm">{selectedRDV.motif}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Durée</Label>
                  <p className="text-sm">{selectedRDV.duree} minutes</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Notes</Label>
                <Textarea 
                  defaultValue={selectedRDV.notes}
                  placeholder="Ajouter des notes..."
                  className="mt-2"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowRDVDialog(false)}>
                  Fermer
                </Button>
                <Button variant="outline">
                  <XCircle className="h-4 w-4 mr-2" />
                  Annuler RDV
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

