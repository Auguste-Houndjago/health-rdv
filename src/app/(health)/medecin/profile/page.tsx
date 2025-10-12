"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  BarChart3,
  Loader2,
  RefreshCw,
  Edit,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";
import { getMedecinProfile, updateMedecinProfile, type MedecinProfile } from "@/services/medecins/specialite";

export default function MedecinProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<MedecinProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    dateNaissance: '',
    anneeExperience: 0,
    titre: '',
    isDisponible: true
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
    setLoading(true);
      const result = await getMedecinProfile();
      
      if (result.success) {
        setProfile(result.data);
        setEditData({
          nom: result.data.nom,
          prenom: result.data.prenom,
          telephone: result.data.telephone,
          dateNaissance: result.data.dateNaissance || '',
          anneeExperience: result.data.anneeExperience,
          titre: result.data.titre,
          isDisponible: result.data.isDisponible
        });
      } else {
        toast.error(result.error || 'Erreur lors du chargement');
      }
    } catch (err) {
      toast.error('Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setEditData({
        nom: profile.nom,
        prenom: profile.prenom,
        telephone: profile.telephone,
        dateNaissance: profile.dateNaissance || '',
        anneeExperience: profile.anneeExperience,
        titre: profile.titre,
        isDisponible: profile.isDisponible
      });
    }
  };

  const handleSave = async () => {
    try {
      const result = await updateMedecinProfile(editData);
      
      if (result.success) {
        toast.success(result.message || 'Profil mis à jour avec succès');
        setIsEditing(false);
        await loadProfile();
      } else {
        toast.error(result.error || 'Erreur lors de la mise à jour');
      }
    } catch (err) {
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  const handleRefresh = () => {
    loadProfile();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement du profil...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Profil non trouvé</h3>
            <p className="text-muted-foreground">
              Impossible de charger votre profil médecin
            </p>
            <Button onClick={handleRefresh} className="mt-4">
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
          <h1 className="text-3xl font-bold">Mon Profil Médecin</h1>
          <p className="text-muted-foreground">
            Dr. {profile.prenom} {profile.nom} - {profile.specialite.nom}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          {!isEditing ? (
            <Button onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Annuler
          </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
          </Button>
            </>
          )}
        </div>
      </div>

      {/* Informations principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil principal */}
        <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informations personnelles
                </CardTitle>
            <CardDescription>
              Vos informations de base et contact
            </CardDescription>
              </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-lg">
                  {profile.prenom[0]}{profile.nom[0]}
                </AvatarFallback>
              </Avatar>
                      <div>
                <h3 className="text-xl font-semibold">
                  Dr. {profile.prenom} {profile.nom}
                </h3>
                <p className="text-muted-foreground">{profile.titre}</p>
                <Badge variant={profile.isDisponible ? "default" : "secondary"}>
                  {profile.isDisponible ? "Disponible" : "Indisponible"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                {isEditing ? (
                  <Input
                    id="nom"
                    value={editData.nom}
                    onChange={(e) => setEditData({...editData, nom: e.target.value})}
                  />
                ) : (
                  <p className="text-sm">{profile.nom}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                {isEditing ? (
                  <Input
                    id="prenom"
                    value={editData.prenom}
                    onChange={(e) => setEditData({...editData, prenom: e.target.value})}
                  />
                ) : (
                  <p className="text-sm">{profile.prenom}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <p className="text-sm flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {profile.email}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                {isEditing ? (
                  <Input
                    id="telephone"
                    value={editData.telephone}
                    onChange={(e) => setEditData({...editData, telephone: e.target.value})}
                  />
                ) : (
                  <p className="text-sm flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {profile.telephone}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateNaissance">Date de naissance</Label>
                {isEditing ? (
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={editData.dateNaissance}
                    onChange={(e) => setEditData({...editData, dateNaissance: e.target.value})}
                  />
                ) : (
                  <p className="text-sm">{profile.dateNaissance || 'Non renseignée'}</p>
                )}
                      </div>
              <div className="space-y-2">
                <Label htmlFor="titre">Titre professionnel</Label>
                {isEditing ? (
                  <Input
                    id="titre"
                    value={editData.titre}
                    onChange={(e) => setEditData({...editData, titre: e.target.value})}
                  />
                ) : (
                  <p className="text-sm">{profile.titre}</p>
                )}
                    </div>
                </div>
              </CardContent>
            </Card>

        {/* Informations professionnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
              <Stethoscope className="h-5 w-5 mr-2" />
              Informations professionnelles
                </CardTitle>
              </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Spécialité</Label>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{profile.specialite.nom}</span>
                        </div>
                      </div>

            <div className="space-y-2">
              <Label>Numéro de licence</Label>
              <p className="text-sm font-mono">{profile.numLicence}</p>
            </div>

            <div className="space-y-2">
              <Label>Années d'expérience</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editData.anneeExperience}
                  onChange={(e) => setEditData({...editData, anneeExperience: parseInt(e.target.value) || 0})}
                />
              ) : (
                <p className="text-sm">{profile.anneeExperience} ans</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Statut</Label>
              <Badge variant={profile.statut === 'APPROUVE' ? 'default' : 'secondary'}>
                {profile.statut === 'APPROUVE' ? 'Approuvé' : 'En attente'}
                      </Badge>
                    </div>

            <div className="space-y-2">
              <Label>Disponibilité</Label>
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editData.isDisponible}
                    onCheckedChange={(checked) => setEditData({...editData, isDisponible: checked})}
                  />
                  <span className="text-sm">{editData.isDisponible ? 'Disponible' : 'Indisponible'}</span>
                </div>
              ) : (
                <p className="text-sm">{profile.isDisponible ? 'Disponible' : 'Indisponible'}</p>
              )}
                </div>
              </CardContent>
            </Card>
          </div>

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Spécialité</TabsTrigger>
          <TabsTrigger value="hopitaux">Hôpitaux</TabsTrigger>
          <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
        </TabsList>

        {/* Onglet Spécialité */}
        <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2" />
                Ma Spécialité
                </CardTitle>
              <CardDescription>
                Informations détaillées sur votre spécialité médicale
              </CardDescription>
              </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{profile.specialite.nom}</h3>
                  <p className="text-muted-foreground">{profile.specialite.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Formation requise</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      DES {profile.specialite.nom} (4 ans)
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Votre expérience</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {profile.anneeExperience} ans d'expérience
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Statut d'approbation</Label>
                    <div className="mt-1">
                      <Badge variant={profile.statut === 'APPROUVE' ? 'default' : 'secondary'}>
                        {profile.statut === 'APPROUVE' ? 'Approuvé' : 'En attente d\'approbation'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Disponibilité</Label>
                    <div className="mt-1">
                      <Badge variant={profile.isDisponible ? 'default' : 'secondary'}>
                        {profile.isDisponible ? 'Disponible pour consultations' : 'Indisponible'}
                      </Badge>
                  </div>
                  </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        </TabsContent>

        {/* Onglet Hôpitaux */}
        <TabsContent value="hopitaux" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Mes Hôpitaux
                </CardTitle>
              <CardDescription>
                Hôpitaux où vous exercez votre spécialité
              </CardDescription>
              </CardHeader>
              <CardContent>
              {profile.hopitaux.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun hôpital associé</h3>
                  <p className="text-muted-foreground">
                    Vous n'êtes pas encore affilié à un hôpital
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.hopitaux.map((hopital) => (
                    <Card key={hopital.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{hopital.nom}</h4>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {hopital.adresse}
                            </p>
                  </div>
                </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Statistiques */}
        <TabsContent value="statistiques" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Années d'expérience</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profile.anneeExperience}</div>
                <p className="text-xs text-muted-foreground">
                  ans d'expérience
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spécialité</CardTitle>
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profile.specialite.nom}</div>
                <p className="text-xs text-muted-foreground">
                  Spécialité médicale
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hôpitaux</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profile.hopitaux.length}</div>
                <p className="text-xs text-muted-foreground">
                  Hôpitaux affiliés
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Statut</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Badge variant={profile.statut === 'APPROUVE' ? 'default' : 'secondary'}>
                    {profile.statut === 'APPROUVE' ? 'Approuvé' : 'En attente'}
                  </Badge>
                  </div>
                <p className="text-xs text-muted-foreground">
                  Statut d'approbation
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Informations du compte
              </CardTitle>
              <CardDescription>
                Détails de votre compte médecin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Date de création</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(profile.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Dernière mise à jour</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(profile.updatedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Numéro de licence</Label>
                    <p className="text-sm font-mono text-muted-foreground mt-1">
                      {profile.numLicence}
                    </p>
                  </div>
                          <div>
                    <Label className="text-sm font-medium">Disponibilité</Label>
                    <div className="mt-1">
                      <Badge variant={profile.isDisponible ? 'default' : 'secondary'}>
                        {profile.isDisponible ? 'Disponible' : 'Indisponible'}
                      </Badge>
                          </div>
                        </div>
                        </div>
                        </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}



