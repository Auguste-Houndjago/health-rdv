"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Award,
  Calendar,
  CheckCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { getMedecinInfo, MedecinInfoPayload } from "@/app/actions/medecin";
import { useEntityFilter } from "@/hooks/entity/useEntityFilter";

export default function SpecialitesPage() {
  const fetchMedecinInfo = async (): Promise<MedecinInfoPayload[]> => {
    const result = await getMedecinInfo();
    return [result];
  };

  const { loading, error, data } = useEntityFilter<MedecinInfoPayload>({
    entityName: "getMedecinInfo",
    fetchFn: fetchMedecinInfo,
  });

  const medecinInfo = data?.items?.[0];
  const specialite = medecinInfo?.specialite;
  const personalInfo = medecinInfo?.utilisateur;

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center h-64">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement ...</span>
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
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Erreur de chargement
            </h3>
            <p className="text-muted-foreground">
              Impossible de charger les informations de votre spécialité
            </p>
            <Button variant="outline" className="mt-4">
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
      <div className="rounded-xl p-6 border border-border bg-muted/30">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Ma Spécialité
            </h1>
            <p className="text-muted-foreground">
              Informations détaillées sur votre spécialité médicale
            </p>
          </div>
        </div>
      </div>

      {/* Informations principales */}
      <Card className="shadow-sm border-border">
        <CardHeader className="border-b border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-muted">
                <Stethoscope className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                  {specialite?.nom || "Spécialité non définie"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {specialite?.description || "Aucune description disponible"}
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={
                medecinInfo?.statut === "APPROUVE" ? "default" : "secondary"
              }
              className="text-sm px-4 py-2 font-medium"
            >
              {medecinInfo?.statut === "APPROUVE"
                ? "Approuvé"
                : "En attente d'approbation"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Informations du médecin */}
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-muted rounded-2xl">
              <Award className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">
                Dr. {personalInfo?.prenom} {personalInfo?.nom}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {medecinInfo?.titre || "Médecin"}
              </p>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    medecinInfo?.isDisponible
                      ? "bg-success"
                      : "bg-destructive/70"
                  }`}
                ></div>
                <span className="text-sm text-muted-foreground">
                  {medecinInfo?.isDisponible
                    ? "Disponible pour consultations"
                    : "Indisponible"}
                </span>
              </div>
            </div>
          </div>

          {/* Grille d'informations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Expérience */}
            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-medium text-foreground">Expérience</h4>
              </div>
              <p className="text-2xl font-semibold text-foreground mb-1">
                {medecinInfo?.anneeExperience || 0}
              </p>
              <p className="text-sm text-muted-foreground">
                années d'expérience
              </p>
            </div>

            {/* Licence */}
            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-medium text-foreground">Licence</h4>
              </div>
              <p className="text-sm font-mono text-foreground mb-1">
                {medecinInfo?.numLicence || "Non renseigné"}
              </p>
              <p className="text-sm text-muted-foreground">numéro de licence</p>
            </div>

            {/* Statut */}
            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-medium text-foreground">Statut</h4>
              </div>
              <p
                className={`text-sm font-medium ${
                  medecinInfo?.isDisponible
                    ? "text-success"
                    : "text-destructive/80"
                }`}
              >
                {medecinInfo?.isDisponible ? "Disponible" : "Indisponible"}
              </p>
              <p className="text-sm text-muted-foreground">
                pour les consultations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
