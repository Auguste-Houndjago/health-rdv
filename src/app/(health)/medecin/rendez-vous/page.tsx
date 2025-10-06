"use client";

import React, { useState } from "react";
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
import { fr } from "date-fns/locale";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  FileText,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";

export default function RendezVousPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRDVDialog, setShowRDVDialog] = useState(false);
  const [selectedRDV, setSelectedRDV] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  // Données simulées - à remplacer par des hooks réels
  const rendezVous = [
    {
      id: "1",
      patient: {
        nom: "Dupont",
        prenom: "Jean",
        telephone: "01 23 45 67 89",
        email: "jean.dupont@email.com"
      },
      date: "2024-01-25",
      heure: "09:00",
      duree: 30,
      motif: "Consultation de routine",
      statut: "CONFIRME",
      notes: "Patient stable, tension normale"
    },
    {
      id: "2",
      patient: {
        nom: "Martin",
        prenom: "Marie",
        telephone: "01 98 76 54 32",
        email: "marie.martin@email.com"
      },
      date: "2024-01-25",
      heure: "10:30",
      duree: 45,
      motif: "Suivi diabète",
      statut: "CONFIRME",
      notes: "Contrôle glycémie, adaptation traitement"
    },
    {
      id: "3",
      patient: {
        nom: "Bernard",
        prenom: "Pierre",
        telephone: "01 45 67 89 01",
        email: "pierre.bernard@email.com"
      },
      date: "2024-01-26",
      heure: "14:00",
      duree: 60,
      motif: "Consultation urgente",
      statut: "EN_ATTENTE",
      notes: "Douleurs thoraciques, ECG à faire"
    },
    {
      id: "4",
      patient: {
        nom: "Leroy",
        prenom: "Sophie",
        telephone: "01 34 56 78 90",
        email: "sophie.leroy@email.com"
      },
      date: "2024-01-27",
      heure: "11:15",
      duree: 30,
      motif: "Contrôle post-opératoire",
      statut: "ANNULE",
      notes: "Patient a annulé, reporter à la semaine prochaine"
    }
  ];

  const filteredRDV = rendezVous.filter(rdv =>
    rdv.patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rdv.patient.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rdv.motif.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewRDV = (rdv: any) => {
    setSelectedRDV(rdv);
    setShowRDVDialog(true);
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

  const stats = {
    totalRDV: rendezVous.length,
    rdvAujourdhui: rendezVous.filter(rdv => rdv.date === new Date().toISOString().split('T')[0]).length,
    rdvConfirmes: rendezVous.filter(rdv => rdv.statut === "CONFIRME").length,
    rdvEnAttente: rendezVous.filter(rdv => rdv.statut === "EN_ATTENTE").length
  };

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

