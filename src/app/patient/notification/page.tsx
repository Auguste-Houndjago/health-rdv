"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { 
  Bell, 
  Search, 
  Calendar,
  FileText,
  AlertCircle,
  Clock,
  RefreshCw,
  CheckCircle,
  Trash2,
  Heart,
  Loader2
} from "lucide-react"
import { toast } from "sonner"
import { 
  obtenirNotifications,
  marquerNotificationLue,
  marquerToutesNotificationsLues,
  supprimerNotification,
  obtenirStatistiquesNotifications,
} from "@/services/notifications/notifications-actions"

interface Notification {
  id: string
  titre: string
  message: string
  type: string
  lue: boolean
  priorite: string
  emetteur: string
  patient: string | null
  dateCreation: Date
  lien?: string | null
  data?: any
}

export default function PatientNotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotificationDialog, setShowNotificationDialog] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalNotifications: 0,
    notificationsNonLues: 0,
    notificationsUrgentes: 0
  })

  // Charger les données au montage
  useEffect(() => {
    chargerDonnees()
  }, [])

  const chargerDonnees = async () => {
    setLoading(true)
    try {
      const [notificationsResult, statsResult] = await Promise.all([
        obtenirNotifications(),
        obtenirStatistiquesNotifications()
      ])

      if (notificationsResult.success) {
        setNotifications(notificationsResult.data || [])
      } else {
        toast.error(notificationsResult.error || "Erreur lors du chargement des notifications")
      }

      if (statsResult.success) {
        setStats(statsResult.data || stats)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
      toast.error("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    chargerDonnees()
  }

  const handleMarquerLue = async (notificationId: string) => {
    try {
      const result = await marquerNotificationLue(notificationId)
      if (result.success) {
        toast.success(result.message)
        chargerDonnees()
      } else {
        toast.error(result.error || "Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const handleMarquerToutesLues = async () => {
    try {
      const result = await marquerToutesNotificationsLues()
      if (result.success) {
        toast.success(result.message)
        chargerDonnees()
      } else {
        toast.error(result.error || "Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const handleSupprimer = async (notificationId: string) => {
    try {
      const result = await supprimerNotification(notificationId)
      if (result.success) {
        toast.success(result.message)
        chargerDonnees()
      } else {
        toast.error(result.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la suppression")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des notifications...</span>
          </div>
        </div>
      </div>
    )
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && !notification.lue
    if (activeTab === "urgent") return matchesSearch && notification.priorite === "URGENTE"
    if (activeTab === "appointments") return matchesSearch && notification.type === "RENDEZ_VOUS"
    
    return matchesSearch
  })

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification)
    setShowNotificationDialog(true)
    // Marquer comme lue automatiquement
    if (!notification.lue) {
      handleMarquerLue(notification.id)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "RENDEZ_VOUS":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "DOCUMENT":
        return <FileText className="h-4 w-4 text-green-600" />
      case "URGENCE":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPrioriteBadge = (priorite: string) => {
    switch (priorite) {
      case "URGENTE":
        return <Badge className="bg-red-100 text-red-800">Urgente</Badge>
      case "NORMALE":
        return <Badge className="bg-blue-100 text-blue-800">Normale</Badge>
      default:
        return <Badge variant="secondary">{priorite}</Badge>
    }
  }

  const getStatutIcon = (lue: boolean) => {
    if (!lue) {
      return <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
    }
    return null
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "RENDEZ_VOUS":
        return "Rendez-vous"
      case "DOCUMENT":
        return "Document"
      case "URGENCE":
        return "Urgence"
      case "SYSTEME":
        return "Système"
      default:
        return type
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Gérez vos notifications et alertes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline" onClick={handleMarquerToutesLues}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Marquer tout lu
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
            <div className="text-2xl font-bold">{notifications.filter(n => 
              new Date(n.dateCreation).toDateString() === new Date().toDateString()
            ).length}</div>
            <p className="text-xs text-muted-foreground">
              Reçues aujourd'hui
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
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
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucune notification pour le moment
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                        !notification.lue ? "bg-blue-50 border-blue-200" : ""
                      }`}
                      onClick={() => handleViewNotification(notification)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatutIcon(notification.lue)}
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.titre}</h3>
                            <div className="flex items-center space-x-2">
                              {getPrioriteBadge(notification.priorite)}
                              <span className="text-xs text-muted-foreground">
                                {new Date(notification.dateCreation).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Type: {getTypeLabel(notification.type)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!notification.lue && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleMarquerLue(notification.id)
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Marquer lu
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSupprimer(notification.id)
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                    {new Date(selectedNotification.dateCreation).toLocaleString('fr-FR')}
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

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>
                  Fermer
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleSupprimer(selectedNotification.id)
                    setShowNotificationDialog(false)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
                {!selectedNotification.lue && (
                  <Button onClick={() => handleMarquerLue(selectedNotification.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marquer comme lu
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
