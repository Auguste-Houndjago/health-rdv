"use client";

import React, { useState, useEffect } from "react";
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
  Send,
  Loader2,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { useHopitaux } from "@/hooks/hopitaux/useHopitaux";
import { 
  obtenirHopitauxMedecin,
  obtenirHopitauxDisponibles,
  creerDemandeAffiliation,
  obtenirDemandesAffiliation,
  annulerDemandeAffiliation,
  obtenirStatistiquesHopitaux,
  type HopitalAffiliation,
  type DemandeAffiliation
} from "@/app/actions/medecin-hopitaux";

export default function HopitauxPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDemandeDialog, setShowDemandeDialog] = useState(false);
  const [selectedHopital, setSelectedHopital] = useState<HopitalAffiliation | null>(null);
  const [hopitaux, setHopitaux] = useState<HopitalAffiliation[]>([]);
  const [hopitauxDisponibles, setHopitauxDisponibles] = useState<HopitalAffiliation[]>([]);
  const [demandes, setDemandes] = useState<DemandeAffiliation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    hopitauxAffilies: 0,
    demandesEnAttente: 0,
    demandesApprouvees: 0,
    demandesRejetees: 0
  });

  // Utiliser le hook useHopitaux pour les données des hôpitaux
  const { hopitaux: hopitauxData, isLoading: hopitauxLoading, refetch: refetchHopitaux } = useHopitaux();

  // Charger les données au montage du composant
  useEffect(() => {
    chargerDonnees();
  }, []);

  const chargerDonnees = async () => {
    setLoading(true);
    try {
      const [hopitauxResult, hopitauxDisponiblesResult, demandesResult, statsResult] = await Promise.all([
        obtenirHopitauxMedecin(),
        obtenirHopitauxDisponibles(),
        obtenirDemandesAffiliation(),
        obtenirStatistiquesHopitaux()
      ]);

      if (hopitauxResult.success) {
        setHopitaux(hopitauxResult.data || []);
      } else {
        toast.error(hopitauxResult.error || "Erreur lors du chargement des hôpitaux");
      }

      if (hopitauxDisponiblesResult.success) {
        setHopitauxDisponibles(hopitauxDisponiblesResult.data || []);
      }

      if (demandesResult.success) {
        setDemandes(demandesResult.data || []);
      }

      if (statsResult.success) {
        setStats(statsResult.data || stats);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    chargerDonnees();
    refetchHopitaux();
  };

  const handleDemandeAffiliation = (hopital: HopitalAffiliation) => {
    setSelectedHopital(hopital);
    setShowDemandeDialog(true);
  };

  const submitDemande = async (formData: FormData) => {
    if (!selectedHopital) return;

    try {
      const demandeData = new FormData();
      demandeData.append('hopitalId', selectedHopital.id);
      demandeData.append('motivation', formData.get('motivation') as string);
      demandeData.append('specialitesInteret', formData.get('specialitesInteret') as string);
      demandeData.append('disponibilite', formData.get('disponibilite') as string);

      const result = await creerDemandeAffiliation(demandeData);

      if (result.success) {
        toast.success(result.message || `Demande d'affiliation envoyée à ${selectedHopital.nom}`);
    setShowDemandeDialog(false);
    setSelectedHopital(null);
        chargerDonnees(); // Recharger les données
      } else {
        toast.error(result.error || "Erreur lors de l'envoi de la demande");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la demande:", error);
      toast.error("Erreur lors de la soumission de la demande");
    }
  };

  const handleAnnulerDemande = async (demandeId: string) => {
    try {
      const result = await annulerDemandeAffiliation(demandeId);
      if (result.success) {
        toast.success(result.message);
        chargerDonnees(); // Recharger les données
      } else {
        toast.error(result.error || "Erreur lors de l'annulation");
      }
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error);
      toast.error("Erreur lors de l'annulation");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des hôpitaux...</span>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
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
              {demandes.map((demande) => (
                <TableRow key={demande.id}>
                  <TableCell className="font-medium">{demande.hopitalId}</TableCell>
                  <TableCell>
                    {new Date(demande.dateDemande).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    {getStatutBadge(demande.statut)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {demande.specialitesInteret.split(',').slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec.trim()}
                        </Badge>
                      ))}
                      {demande.specialitesInteret.split(',').length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{demande.specialitesInteret.split(',').length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      {demande.statut === "EN_ATTENTE" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAnnulerDemande(demande.id)}
                        >
                          Annuler
                        </Button>
                      )}
                      {demande.statut === "REJETE" && (
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
          <form action={submitDemande} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation</Label>
              <Textarea
                id="motivation"
                name="motivation"
                placeholder="Expliquez pourquoi vous souhaitez rejoindre cet hôpital..."
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialitesInteret">Spécialités d'intérêt</Label>
              <Input
                id="specialitesInteret"
                name="specialitesInteret"
                placeholder="Cardiologie, Chirurgie cardiaque..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disponibilite">Disponibilité</Label>
              <Input
                id="disponibilite"
                name="disponibilite"
                placeholder="Lundi - Vendredi, 8h-18h"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowDemandeDialog(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Envoyer la demande
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}



