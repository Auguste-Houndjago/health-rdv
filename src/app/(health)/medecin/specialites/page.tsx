"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Award, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw
} from "lucide-react";
import { getMedecinInfo, MedecinInfoPayload } from '@/app/actions/medecin';
import { useEntityFilter } from '@/hooks/entity/useEntityFilter';

export default function SpecialitesPage() {
  const fetchMedecinInfo = async (): Promise<MedecinInfoPayload[]> => {
    const result = await getMedecinInfo();
    return [result];
  };

  const {loading, error, data} = useEntityFilter<MedecinInfoPayload>({
    entityName: "getMedecinInfo",
    fetchFn: fetchMedecinInfo,
  });

  const medecinInfo = data?.items?.[0];
  const specialite = medecinInfo?.specialite;
  const personalInfo = medecinInfo?.utilisateur;

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement de votre spécialité...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !medecinInfo) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="text-center py-8">
            <Stethoscope className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
            <p className="text-muted-foreground">
              Impossible de charger les informations de votre spécialité
            </p>
            <Button className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ma Spécialité</h1>
          <p className="text-muted-foreground">
            Informations sur votre spécialité médicale
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Informations principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte principale de la spécialité */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="h-5 w-5 mr-2" />
              {specialite?.nom || 'Spécialité non définie'}
            </CardTitle>
            <CardDescription>
              {specialite?.description || 'Aucune description disponible'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  Dr. {personalInfo?.prenom} {personalInfo?.nom}
                </h3>
                <p className="text-muted-foreground">
                  {medecinInfo?.titre || 'Médecin'}
                </p>
                <div className="mt-2">
                  <Badge variant={medecinInfo?.statut === 'APPROUVE' ? 'default' : 'secondary'}>
                    {medecinInfo?.statut === 'APPROUVE' ? 'Approuvé' : 'En attente d\'approbation'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <h4 className="font-medium text-sm mb-2">Votre expérience</h4>
                <p className="text-sm text-muted-foreground">
                  {medecinInfo?.anneeExperience || 0} ans d'expérience
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Numéro de licence</h4>
                <p className="text-sm text-muted-foreground font-mono">
                  {medecinInfo?.numLicence || 'Non renseigné'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Disponibilité</h4>
                <p className="text-sm text-muted-foreground">
                  {medecinInfo?.isDisponible ? 'Disponible' : 'Indisponible'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Message si pas de spécialité */}
      {!specialite && (
        <Card>
          <CardContent className="text-center py-8">
            <Stethoscope className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune spécialité définie</h3>
            <p className="text-muted-foreground">
              Votre profil médecin n'a pas encore de spécialité associée
            </p>
            <Button className="mt-4">
              <Stethoscope className="h-4 w-4 mr-2" />
              Définir ma spécialité
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
