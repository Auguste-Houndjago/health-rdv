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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Search, 
  Filter,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  User,
  FileText,
  Stethoscope,
  Clock,
  Settings,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  Heart,
  Activity,
  Trash2,
  Archive,
  MarkAsRead,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  // Données simulées - à remplacer par des hooks réels
  const notifications = [
    {
      id: "1",
      titre: "Nouveau rendez-vous confirmé",
      message: "Le patient Jean Dupont a confirmé son rendez-vous du 25 janvier à 09:00",
      type: "RENDEZ_VOUS",
      priorite: "NORMALE",
      statut: "NON_LU",
      date: "2024-01-20T10:30:00",
      emetteur: "Système",
      patient: "Jean Dupont",
      action: "Voir le rendez-vous"
    },
    {
      id: "2",
      titre: "Rapport médical en attente",
      message: "Le rapport cardiologique de Marie Martin est prêt à être consulté",
      type: "RAPPORT",
      priorite: "HAUTE",
      statut: "NON_LU",
      date: "2024-01-20T09:15:00",
      emetteur: "Dr. Assistant",
      patient: "Marie Martin",
      action: "Consulter le rapport"
    },
    {
      id: "3",
      titre: "Demande d'affiliation hôpital",
      message: "Nouvelle demande d'affiliation reçue de l'Hôpital Central",
      type: "AFFILIATION",
      priorite: "NORMALE",
      statut: "LU",
      date: "2024-01-19T16:45:00",
      emetteur: "Hôpital Central",
      patient: null,
      action: "Examiner la demande"
    },
    {
      id: "4",
      titre: "Rappel consultation urgente",
      message: "Consultation urgente programmée demain à 14:00 avec Pierre Bernard",
      type: "URGENCE",
      priorite: "CRITIQUE",
      statut: "NON_LU",
      date: "2024-01-19T14:20:00",
      emetteur: "Système",
      patient: "Pierre Bernard",
      action: "Voir les détails"
    },
    {
      id: "5",
      titre: "Formation continue disponible",
      message: "Nouvelle formation 'Cardiologie moderne' disponible en ligne",
      type: "FORMATION",
      priorite: "FAIBLE",
      statut: "LU",
      date: "2024-01-18T11:30:00",
      emetteur: "Service Formation",
      patient: null,
      action: "S'inscrire"
    },
    {
      id: "6",
      titre: "Mise à jour du système",
      message: "Nouvelle version de l'application disponible avec de nouvelles fonctionnalités",
      type: "SYSTEME",
      priorite: "NORMALE",
      statut: "LU",
      date: "2024-01-17T08:00:00",
      emetteur: "Équipe Technique",
      patient: null,
      action: "Mettre à jour"
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unread") return matchesSearch && notification.statut === "NON_LU";
    if (activeTab === "urgent") return matchesSearch && notification.priorite === "CRITIQUE";
    if (activeTab === "appointments") return matchesSearch && notification.type === "RENDEZ_VOUS";
    if (activeTab === "reports") return matchesSearch && notification.type === "RAPPORT";
    if (activeTab === "system") return matchesSearch && notification.type === "SYSTEME";
    
    return matchesSearch;
  });

  const handleViewNotification = (notification: any) => {
    setSelectedNotification(notification);
    setShowNotificationDialog(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "RENDEZ_VOUS":
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case "RAPPORT":
        return <FileText className="h-4 w-4 text-green-600" />;
      case "AFFILIATION":
        return <Stethoscope className="h-4 w-4 text-purple-600" />;
      case "URGENCE":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "FORMATION":
        return <User className="h-4 w-4 text-orange-600" />;
      case "SYSTEME":
        return <Settings className="h-4 w-4 text-gray-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPrioriteBadge = (priorite: string) => {
    switch (priorite) {
      case "CRITIQUE":
        return <Badge className="bg-red-100 text-red-800">Critique</Badge>;
      case "HAUTE":
        return <Badge className="bg-orange-100 text-orange-800">Haute</Badge>;
      case "NORMALE":
        return <Badge className="bg-blue-100 text-blue-800">Normale</Badge>;
      case "FAIBLE":
        return <Badge className="bg-gray-100 text-gray-800">Faible</Badge>;
      default:
        return <Badge variant="secondary">{priorite}</Badge>;
    }
  };

  const getStatutIcon = (statut: string) => {
    if (statut === "NON_LU") {
      return <div className="w-2 h-2 bg-blue-600 rounded-full"></div>;
    }
    return null;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "RENDEZ_VOUS":
        return "Rendez-vous";
      case "RAPPORT":
        return "Rapport";
      case "AFFILIATION":
        return "Affiliation";
      case "URGENCE":
        return "Urgence";
      case "FORMATION":
        return "Formation";
      case "SYSTEME":
        return "Système";
      default:
        return type;
    }
  };

  const stats = {
    totalNotifications: notifications.length,
    notificationsNonLues: notifications.filter(n => n.statut === "NON_LU").length,
    notificationsUrgentes: notifications.filter(n => n.priorite === "CRITIQUE").length,
    notificationsAujourdhui: notifications.filter(n => 
      new Date(n.date).toDateString() === new Date().toDateString()
    ).length
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Gérez vos alertes et messages
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowSettingsDialog(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
          <Button variant="outline">
            <MarkAsRead className="h-4 w-4 mr-2" />
            Marquer tout lu
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Nouvelle notification
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotifications}</div>
            <p className="text-xs text-muted-foreground">
              Notifications reçues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non lues</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notificationsNonLues}</div>
            <p className="text-xs text-muted-foreground">
              À consulter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notificationsUrgentes}</div>
            <p className="text-xs text-muted-foreground">
              Priorité critique
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notificationsAujourdhui}</div>
            <p className="text-xs text-muted-foreground">
              Reçues aujourd'hui
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche et filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une notification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="unread">Non lues</TabsTrigger>
          <TabsTrigger value="urgent">Urgentes</TabsTrigger>
          <TabsTrigger value="appointments">RDV</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Liste des notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Notifications</CardTitle>
              <CardDescription>
                {filteredNotifications.length} notification(s) trouvée(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                      notification.statut === "NON_LU" ? "bg-blue-50 border-blue-200" : ""
                    }`}
                    onClick={() => handleViewNotification(notification)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatutIcon(notification.statut)}
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.titre}</h3>
                          <div className="flex items-center space-x-2">
                            {getPrioriteBadge(notification.priorite)}
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Type: {getTypeLabel(notification.type)}</span>
                            <span>De: {notification.emetteur}</span>
                            {notification.patient && (
                              <span>Patient: {notification.patient}</span>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            {notification.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de détail notification */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la Notification</DialogTitle>
            <DialogDescription>
              Informations complètes de la notification
            </DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  {getTypeIcon(selectedNotification.type)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedNotification.titre}
                  </h3>
                  <p className="text-muted-foreground">
                    {new Date(selectedNotification.date).toLocaleString('fr-FR')}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getPrioriteBadge(selectedNotification.priorite)}
                    <Badge variant="outline">
                      {getTypeLabel(selectedNotification.type)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Message</Label>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">
                  {selectedNotification.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Émetteur</Label>
                  <p className="text-sm">{selectedNotification.emetteur}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priorité</Label>
                  <p className="text-sm">{selectedNotification.priorite}</p>
                </div>
                {selectedNotification.patient && (
                  <div>
                    <Label className="text-sm font-medium">Patient</Label>
                    <p className="text-sm">{selectedNotification.patient}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Statut</Label>
                  <p className="text-sm">{selectedNotification.statut}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>
                  Fermer
                </Button>
                <Button variant="outline">
                  <Archive className="h-4 w-4 mr-2" />
                  Archiver
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marquer comme lu
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog des paramètres */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paramètres des Notifications</DialogTitle>
            <DialogDescription>
              Configurez vos préférences de notification
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Notifications par email</Label>
                  <p className="text-xs text-muted-foreground">
                    Recevoir les notifications par email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Notifications push</Label>
                  <p className="text-xs text-muted-foreground">
                    Recevoir les notifications push
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Rappels de rendez-vous</Label>
                  <p className="text-xs text-muted-foreground">
                    Recevoir des rappels pour les RDV
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Notifications urgentes</Label>
                  <p className="text-xs text-muted-foreground">
                    Recevoir les notifications critiques
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Fréquence des rappels</Label>
              <Select defaultValue="1h">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="30m">30 minutes</SelectItem>
                  <SelectItem value="1h">1 heure</SelectItem>
                  <SelectItem value="2h">2 heures</SelectItem>
                  <SelectItem value="24h">24 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
                Annuler
              </Button>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

