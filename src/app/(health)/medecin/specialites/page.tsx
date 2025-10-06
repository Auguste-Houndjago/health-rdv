"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Stethoscope, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Users,
  Calendar,
  Award,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";

export default function SpecialitesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSpecialiteDialog, setShowSpecialiteDialog] = useState(false);
  const [selectedSpecialite, setSelectedSpecialite] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Données simulées - à remplacer par des hooks réels
  const specialites = [
    {
      id: "1",
      nom: "Cardiologie",
      description: "Spécialité médicale qui traite les maladies du cœur et des vaisseaux sanguins",
      competences: [
        "Échocardiographie",
        "Cathétérisme cardiaque",
        "Électrocardiographie",
        "Holter ECG"
      ],
      formation: "DES Cardiologie (4 ans)",
      experience: "8 ans",
      statut: "ACTIVE",
      patientsSuivis: 156,
      consultationsMois: 45
    },
    {
      id: "2",
      nom: "Neurologie",
      description: "Spécialité médicale qui traite les maladies du système nerveux",
      competences: [
        "Électroencéphalographie",
        "IRM cérébrale",
        "Ponction lombaire",
        "Évaluation cognitive"
      ],
      formation: "DES Neurologie (4 ans)",
      experience: "6 ans",
      statut: "ACTIVE",
      patientsSuivis: 89,
      consultationsMois: 32
    },
    {
      id: "3",
      nom: "Endocrinologie",
      description: "Spécialité médicale qui traite les maladies des glandes endocrines",
      competences: [
        "Diabétologie",
        "Thyroïdologie",
        "Métabolisme",
        "Hormonologie"
      ],
      formation: "DES Endocrinologie (4 ans)",
      experience: "4 ans",
      statut: "EN_ATTENTE",
      patientsSuivis: 67,
      consultationsMois: 28
    }
  ];

  const filteredSpecialites = specialites.filter(specialite =>
    specialite.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    specialite.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewSpecialite = (specialite: any) => {
    setSelectedSpecialite(specialite);
    setShowSpecialiteDialog(true);
    setIsEditing(false);
  };

  const handleEditSpecialite = (specialite: any) => {
    setSelectedSpecialite(specialite);
    setShowSpecialiteDialog(true);
    setIsEditing(true);
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "EN_ATTENTE":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "INACTIVE":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case "ACTIVE":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "EN_ATTENTE":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "INACTIVE":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const stats = {
    totalSpecialites: specialites.length,
    specialitesActives: specialites.filter(s => s.statut === "ACTIVE").length,
    totalPatients: specialites.reduce((acc, s) => acc + s.patientsSuivis, 0),
    consultationsMois: specialites.reduce((acc, s) => acc + s.consultationsMois, 0)
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mes Spécialités</h1>
          <p className="text-muted-foreground">
            Gérez vos spécialités médicales et compétences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Spécialité
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spécialités</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSpecialites}</div>
            <p className="text-xs text-muted-foreground">
              Spécialités déclarées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actives</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.specialitesActives}</div>
            <p className="text-xs text-muted-foreground">
              Spécialités actives
            </p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium">Consultations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.consultationsMois}</div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une spécialité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des spécialités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialites.map((specialite) => (
          <Card key={specialite.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{specialite.nom}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatutIcon(specialite.statut)}
                  {getStatutBadge(specialite.statut)}
                </div>
              </div>
              <CardDescription className="line-clamp-2">
                {specialite.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-muted-foreground">Formation</div>
                  <div>{specialite.formation}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Expérience</div>
                  <div>{specialite.experience}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Patients</div>
                  <div>{specialite.patientsSuivis}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Consultations</div>
                  <div>{specialite.consultationsMois}/mois</div>
                </div>
              </div>

              <div>
                <div className="font-medium text-sm mb-2">Compétences clés</div>
                <div className="flex flex-wrap gap-1">
                  {specialite.competences.slice(0, 3).map((competence, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {competence}
                    </Badge>
                  ))}
                  {specialite.competences.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{specialite.competences.length - 3} autres
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewSpecialite(specialite)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Détails
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditSpecialite(specialite)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de détail/modification spécialité */}
      <Dialog open={showSpecialiteDialog} onOpenChange={setShowSpecialiteDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifier la Spécialité" : "Détails de la Spécialité"}
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifiez les informations de votre spécialité" : "Informations complètes de votre spécialité"}
            </DialogDescription>
          </DialogHeader>
          {selectedSpecialite && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedSpecialite.nom}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedSpecialite.description}
                  </p>
                  {getStatutBadge(selectedSpecialite.statut)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Formation</Label>
                  {isEditing ? (
                    <Input defaultValue={selectedSpecialite.formation} className="mt-1" />
                  ) : (
                    <p className="text-sm mt-1">{selectedSpecialite.formation}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Années d'expérience</Label>
                  {isEditing ? (
                    <Input defaultValue={selectedSpecialite.experience} className="mt-1" />
                  ) : (
                    <p className="text-sm mt-1">{selectedSpecialite.experience}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Patients suivis</Label>
                  <p className="text-sm mt-1">{selectedSpecialite.patientsSuivis}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Consultations/mois</Label>
                  <p className="text-sm mt-1">{selectedSpecialite.consultationsMois}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Compétences</Label>
                {isEditing ? (
                  <Textarea 
                    defaultValue={selectedSpecialite.competences.join('\n')}
                    placeholder="Une compétence par ligne..."
                    className="mt-2"
                  />
                ) : (
                  <div className="mt-2 space-y-1">
                    {selectedSpecialite.competences.map((competence, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{competence}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isEditing && (
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea 
                    defaultValue={selectedSpecialite.description}
                    placeholder="Description de la spécialité..."
                    className="mt-2"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSpecialiteDialog(false)}>
                  {isEditing ? "Annuler" : "Fermer"}
                </Button>
                {isEditing ? (
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

