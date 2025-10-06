"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Building2, 
  Search, 
  Plus, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send
} from "lucide-react";
import { toast } from "sonner";

export default function HopitauxPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDemandeDialog, setShowDemandeDialog] = useState(false);
  const [selectedHopital, setSelectedHopital] = useState<any>(null);

  // Données simulées - à remplacer par des hooks réels
  const hopitaux = [
    {
      id: "1",
      nom: "Hôpital Central",
      adresse: "123 Rue de la Santé, Paris",
      contact: "01 23 45 67 89",
      specialites: ["Cardiologie", "Neurologie", "Chirurgie"],
      statutDemande: "APPROUVE",
      dateAffiliation: "2024-01-15"
    },
    {
      id: "2", 
      nom: "Clinique Saint-Martin",
      adresse: "456 Avenue des Médecins, Lyon",
      contact: "04 12 34 56 78",
      specialites: ["Cardiologie", "Pneumologie"],
      statutDemande: "EN_ATTENTE",
      dateAffiliation: null
    },
    {
      id: "3",
      nom: "Centre Hospitalier Nord",
      adresse: "789 Boulevard de la Santé, Marseille",
      contact: "04 98 76 54 32",
      specialites: ["Cardiologie", "Endocrinologie", "Radiologie"],
      statutDemande: "REJETE",
      dateAffiliation: null
    }
  ];

  const hopitauxDisponibles = [
    {
      id: "4",
      nom: "Hôpital Universitaire",
      adresse: "321 Rue de l'Université, Toulouse",
      contact: "05 12 34 56 78",
      specialites: ["Cardiologie", "Neurologie", "Chirurgie cardiaque"],
      description: "Hôpital universitaire de référence en cardiologie"
    },
    {
      id: "5",
      nom: "Institut du Cœur",
      adresse: "654 Avenue du Cœur, Nice",
      contact: "04 87 65 43 21",
      specialites: ["Cardiologie", "Chirurgie cardiaque"],
      description: "Spécialisé dans les pathologies cardiaques"
    }
  ];

  const handleDemandeAffiliation = (hopital: any) => {
    setSelectedHopital(hopital);
    setShowDemandeDialog(true);
  };

  const submitDemande = () => {
    // Logique de soumission de la demande
    toast.success(`Demande d'affiliation envoyée à ${selectedHopital.nom}`);
    setShowDemandeDialog(false);
    setSelectedHopital(null);
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "APPROUVE":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approuvé</Badge>;
      case "EN_ATTENTE":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case "REJETE":
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejeté</Badge>;
      default:
        return <Badge variant="outline">Non demandé</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Hôpitaux</h1>
          <p className="text-muted-foreground">
            Gérez vos affiliations hospitalières et vos demandes
          </p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un hôpital..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hôpitaux affiliés */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Mes Hôpitaux Affiliés
            </CardTitle>
            <CardDescription>
              Hôpitaux où vous exercez actuellement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hopitaux.map((hopital) => (
                <div key={hopital.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{hopital.nom}</h3>
                    {getStatutBadge(hopital.statutDemande)}
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {hopital.adresse}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {hopital.contact}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hopital.specialites.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    {hopital.dateAffiliation && (
                      <div className="text-xs text-green-600">
                        Affilié depuis le {hopital.dateAffiliation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hôpitaux disponibles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Hôpitaux Disponibles
            </CardTitle>
            <CardDescription>
              Demandez une affiliation à ces hôpitaux
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hopitauxDisponibles.map((hopital) => (
                <div key={hopital.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{hopital.nom}</h3>
                    <Button 
                      size="sm" 
                      onClick={() => handleDemandeAffiliation(hopital)}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Demander
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {hopital.adresse}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {hopital.contact}
                    </div>
                    <p className="text-xs">{hopital.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hopital.specialites.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des demandes */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Demandes</CardTitle>
          <CardDescription>
            Suivi de toutes vos demandes d'affiliation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hôpital</TableHead>
                <TableHead>Date de demande</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Spécialités</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hopitaux.map((hopital) => (
                <TableRow key={hopital.id}>
                  <TableCell className="font-medium">{hopital.nom}</TableCell>
                  <TableCell>
                    {hopital.dateAffiliation || "En attente"}
                  </TableCell>
                  <TableCell>
                    {getStatutBadge(hopital.statutDemande)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {hopital.specialites.slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {hopital.specialites.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{hopital.specialites.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      {hopital.statutDemande === "REJETE" && (
                        <Button variant="outline" size="sm">
                          Refaire
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de demande d'affiliation */}
      <Dialog open={showDemandeDialog} onOpenChange={setShowDemandeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demande d'Affiliation</DialogTitle>
            <DialogDescription>
              Demander une affiliation à {selectedHopital?.nom}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation</Label>
              <Textarea
                id="motivation"
                placeholder="Expliquez pourquoi vous souhaitez rejoindre cet hôpital..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialites">Spécialités d'intérêt</Label>
              <Input
                id="specialites"
                placeholder="Cardiologie, Chirurgie cardiaque..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disponibilite">Disponibilité</Label>
              <Input
                id="disponibilite"
                placeholder="Lundi - Vendredi, 8h-18h"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDemandeDialog(false)}>
                Annuler
              </Button>
              <Button onClick={submitDemande}>
                <Send className="h-4 w-4 mr-2" />
                Envoyer la demande
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}



