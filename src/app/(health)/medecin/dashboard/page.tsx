"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  Building2, 
  Stethoscope, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  BarChart3
} from "lucide-react";

export default function MedecinDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Données simulées - à remplacer par des hooks réels
  const stats = {
    totalPatients: 156,
    rendezVousAujourdhui: 8,
    hopitauxAffilies: 3,
    specialite: "Cardiologie"
  };

  const patientsRecents = [
    { id: "1", nom: "Dupont", prenom: "Jean", maladie: "Hypertension", derniereVisite: "2024-01-15" },
    { id: "2", nom: "Martin", prenom: "Marie", maladie: "Diabète", derniereVisite: "2024-01-14" },
    { id: "3", nom: "Bernard", prenom: "Pierre", maladie: "Arythmie", derniereVisite: "2024-01-13" },
  ];

  const rendezVousAujourdhui = [
    { id: "1", patient: "Jean Dupont", heure: "09:00", motif: "Consultation de routine" },
    { id: "2", patient: "Marie Martin", heure: "10:30", motif: "Suivi diabète" },
    { id: "3", patient: "Pierre Bernard", heure: "14:00", motif: "Contrôle tension" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord Médecin</h1>
          <p className="text-muted-foreground">
            Bienvenue, Dr. [Nom] - Spécialité: {stats.specialite}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Activité
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              Patients suivis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RDV Aujourd'hui</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rendezVousAujourdhui}</div>
            <p className="text-xs text-muted-foreground">
              Rendez-vous prévus
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hôpitaux</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hopitauxAffilies}</div>
            <p className="text-xs text-muted-foreground">
              Hôpitaux affiliés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spécialité</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{stats.specialite}</div>
            <p className="text-xs text-muted-foreground">
              Domaine d'expertise
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="rendez-vous">Rendez-vous</TabsTrigger>
        </TabsList>

        {/* Onglet Aperçu */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rendez-vous d'aujourd'hui */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Rendez-vous d'aujourd'hui
                </CardTitle>
                <CardDescription>Votre planning du jour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rendezVousAujourdhui.map((rdv) => (
                    <div key={rdv.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{rdv.patient}</p>
                        <p className="text-sm text-muted-foreground">{rdv.motif}</p>
                      </div>
                      <Badge variant="outline">{rdv.heure}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patients récents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Patients récents
                </CardTitle>
                <CardDescription>Dernières consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientsRecents.map((patient) => (
                    <div key={patient.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {patient.prenom[0]}{patient.nom[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.prenom} {patient.nom}</p>
                          <p className="text-sm text-muted-foreground">{patient.maladie}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {patient.derniereVisite}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Widgets d'aide au diagnostic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Classification des maladies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Cardiologie</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Endocrinologie</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Autres</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Tendances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Nouveaux patients</span>
                    <span className="text-sm font-medium text-green-600">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">RDV cette semaine</span>
                    <span className="text-sm font-medium">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Statut
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Patients actifs</span>
                    <Badge variant="default">142</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">En attente</span>
                    <Badge variant="secondary">14</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Patients */}
        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes Patients</CardTitle>
              <CardDescription>
                Liste de tous vos patients avec leurs informations médicales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Maladie</TableHead>
                    <TableHead>Dernière visite</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientsRecents.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {patient.prenom[0]}{patient.nom[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.prenom} {patient.nom}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{patient.maladie}</Badge>
                      </TableCell>
                      <TableCell>{patient.derniereVisite}</TableCell>
                      <TableCell>
                        <Badge variant="default">Actif</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Rendez-vous */}
        <TabsContent value="rendez-vous" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes Rendez-vous</CardTitle>
              <CardDescription>
                Gestion de votre planning et des rendez-vous
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date/Heure</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rendezVousAujourdhui.map((rdv) => (
                    <TableRow key={rdv.id}>
                      <TableCell className="font-medium">{rdv.patient}</TableCell>
                      <TableCell>{rdv.heure}</TableCell>
                      <TableCell>{rdv.motif}</TableCell>
                      <TableCell>
                        <Badge variant="default">Confirmé</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm">
                            Annuler
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}



