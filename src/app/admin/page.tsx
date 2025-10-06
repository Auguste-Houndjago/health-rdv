"use client";

import React, { useState } from "react";
import { useHopitaux } from "@/hooks/hopitaux/useHopitaux";
import { useUsers } from "@/hooks/users/useUsers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Search, Users, Building2, Activity, Eye, Edit, Trash2, UserPlus, TrendingUp, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");

  // Utilisation des hooks
  const { 
    hopitaux, 
    isLoading: hopitauxLoading, 
    deleteHopital,
    deleteHopitalPending 
  } = useHopitaux();

  const { 
    data: usersData, 
    loading: usersLoading,
    stats: userStats,
    refetch: refetchUsers 
  } = useUsers({
    filters: {
      searchQuery: userSearch,
      role: userRoleFilter as any
    }
  });

  // Statistiques des hôpitaux
  const hopitalStats = {
    total: hopitaux.length,
    totalMedecins: hopitaux.reduce((acc, hopital) => acc + (hopital._count?.medecin || 0), 0),
    totalSpecialites: hopitaux.reduce((acc, hopital) => acc + (hopital._count?.specialites || 0), 0),
    totalRendezVous: hopitaux.reduce((acc, hopital) => acc + (hopital._count?.rendevous || 0), 0),
  };

  // Gestion de la suppression d'hôpital
  const handleDeleteHopital = async (id: string, nom: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'hôpital "${nom}" ?`)) {
      try {
        await deleteHopital(id);
        toast.success("Hôpital supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  // Formatage des données utilisateurs pour le tableau
  const users = usersData?.items || [];

  if (hopitauxLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre plateforme de santé
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel Hôpital
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel hôpital</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer un nouvel hôpital.
              </DialogDescription>
            </DialogHeader>
            <AddHopitalForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hôpitaux</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hopitalStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Hôpitaux enregistrés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Médecins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hopitalStats.totalMedecins}</div>
            <p className="text-xs text-muted-foreground">
              Médecins au total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Utilisateurs inscrits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hopitalStats.totalRendezVous}</div>
            <p className="text-xs text-muted-foreground">
              Rendez-vous planifiés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="hospitals">Hôpitaux</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>

        {/* Onglet Aperçu */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Statistiques utilisateurs par rôle */}
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs par Rôle</CardTitle>
                <CardDescription>Répartition des utilisateurs selon leur rôle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(userStats.byRole).map(([role, count]) => (
                    <div key={role} className="flex justify-between items-center">
                      <span className="capitalize">{role.toLowerCase()}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Derniers hôpitaux ajoutés */}
            <Card>
              <CardHeader>
                <CardTitle>Derniers Hôpitaux</CardTitle>
                <CardDescription>Hôpitaux récemment ajoutés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hopitaux.slice(0, 5).map((hopital) => (
                    <div key={hopital.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{hopital.nom}</p>
                        <p className="text-sm text-muted-foreground">{hopital.localisation}</p>
                      </div>
                      <Badge variant="outline">
                        {hopital._count?.medecin || 0} médecins
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques et métriques avancées */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Croissance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Nouveaux utilisateurs</span>
                    <span className="text-sm font-medium">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Nouveaux hôpitaux</span>
                    <span className="text-sm font-medium">+3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Activité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Rendez-vous aujourd'hui</span>
                    <span className="text-sm font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Médecins actifs</span>
                    <span className="text-sm font-medium">{hopitalStats.totalMedecins}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statut des Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(userStats.byStatus).map(([status, count]) => (
                    <div key={status} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{status.toLowerCase()}</span>
                      <Badge variant={status === "ACTIF" ? "default" : "secondary"}>
                        {count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Hôpitaux */}
        <TabsContent value="hospitals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Hôpitaux</CardTitle>
              <CardDescription>
                Liste complète des hôpitaux et leurs informations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Médecins</TableHead>
                    <TableHead>Spécialités</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hopitaux.map((hopital) => (
                    <TableRow key={hopital.id}>
                      <TableCell className="font-medium">{hopital.nom}</TableCell>
                      <TableCell>{hopital.adresse}</TableCell>
                      <TableCell>{hopital.contact}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {hopital._count?.medecin || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {hopital._count?.specialites || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteHopital(hopital.id, hopital.nom)}
                            disabled={deleteHopitalPending}
                          >
                            {deleteHopitalPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
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

        {/* Onglet Utilisateurs */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Utilisateurs</CardTitle>
              <CardDescription>
                Recherchez et gérez les utilisateurs de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Barre de recherche et filtres */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un utilisateur..."
                      className="pl-8"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrer par rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    <SelectItem value="ADMIN">Administrateurs</SelectItem>
                    <SelectItem value="MEDECIN">Médecins</SelectItem>
                    <SelectItem value="PATIENT">Patients</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tableau des utilisateurs */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatarUrl || ""} />
                            <AvatarFallback>
                              {user.prenom?.[0]}{user.nom?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.prenom} {user.nom}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.telephone || "Non renseigné"}</TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === "ADMIN" ? "destructive" :
                          user.role === "MEDECIN" ? "default" : "secondary"
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.status === "ACTIF" ? "default" :
                          user.status === "INACTIF" ? "secondary" : "outline"
                        }>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
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

// Composant pour le formulaire d'ajout d'hôpital
function AddHopitalForm() {
  const { createHopital, createHopitalPending } = useHopitaux();
  const [formData, setFormData] = useState({
    nom: "",
    adresse: "",
    contact: "",
    description: "",
    localisation: "",
    fuseauHoraire: "Europe/Paris"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createHopital(formData);
      toast.success("Hôpital créé avec succès");
      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        adresse: "",
        contact: "",
        description: "",
        localisation: "",
        fuseauHoraire: "Europe/Paris"
      });
    } catch (error) {
      toast.error("Erreur lors de la création de l'hôpital");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom de l'hôpital</Label>
          <Input
            id="nom"
            value={formData.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            value={formData.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse</Label>
        <Input
          id="adresse"
          value={formData.adresse}
          onChange={(e) => handleChange("adresse", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="localisation">Localisation</Label>
        <Input
          id="localisation"
          value={formData.localisation}
          onChange={(e) => handleChange("localisation", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline">
          Annuler
        </Button>
        <Button type="submit" disabled={createHopitalPending}>
          {createHopitalPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Créer l'hôpital
        </Button>
      </div>
    </form>
  );
}