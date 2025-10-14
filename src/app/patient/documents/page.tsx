"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  Trash2,
  Calendar,
  File,
  Image,
  FileSpreadsheet,
  FileImage,
  Loader2,
  RefreshCw,
  Plus,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"
import { DocumentUpload } from "@/components/documents/DocumentUpload"
import { useDocumentUploader } from "@/hooks/utils/useDocumentUploader"
import { getUserInfo } from "@/services/users"

interface Document {
  id: string
  titre: string
  description?: string
  url: string
  dateCreation: Date
  type?: string
  size?: number
}

export default function PatientDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [patientId, setPatientId] = useState<string | null>(null)

  // Charger les données au montage
  useEffect(() => {
    chargerDonnees()
  }, [])

  const chargerDonnees = async () => {
    setLoading(true)
    try {
      // Récupérer l'utilisateur connecté
      const user = await getUserInfo({ cache: false })
      if (!user) {
        toast.error("Utilisateur non authentifié")
        return
      }

      // Récupérer l'ID du patient
      const response = await fetch('/api/patient/profile')
      if (response.ok) {
        const data = await response.json()
        setPatientId(data.id)
        
        // Charger les documents du patient
        await chargerDocuments(data.id)
      } else {
        toast.error("Erreur lors de la récupération du profil patient")
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
      toast.error("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  const chargerDocuments = async (patientId: string) => {
    try {
      const response = await fetch(`/api/patient/documents?patientId=${patientId}`)
      if (response.ok) {
        const data = await response.json()
        setDocuments(data.documents || [])
      } else {
        toast.error("Erreur lors du chargement des documents")
      }
    } catch (error) {
      console.error("Erreur lors du chargement des documents:", error)
      toast.error("Erreur lors du chargement des documents")
    }
  }

  const handleUploadSuccess = () => {
    setShowUploadDialog(false)
    if (patientId) {
      chargerDocuments(patientId)
    }
    toast.success("Document téléversé avec succès")
  }

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const response = await fetch(`/api/patient/documents/${documentId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        toast.success("Document supprimé avec succès")
        if (patientId) {
          chargerDocuments(patientId)
        }
      } else {
        toast.error("Erreur lors de la suppression du document")
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      toast.error("Erreur lors de la suppression du document")
    }
  }

  const handleDownloadDocument = (url: string, titre: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = titre
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getFileIcon = (type?: string) => {
    if (!type) return <File className="h-4 w-4" />
    
    if (type.includes('image')) return <Image className="h-4 w-4 text-green-600" />
    if (type.includes('pdf')) return <FileText className="h-4 w-4 text-red-600" />
    if (type.includes('spreadsheet') || type.includes('excel')) return <FileSpreadsheet className="h-4 w-4 text-green-600" />
    if (type.includes('word') || type.includes('document')) return <FileText className="h-4 w-4 text-blue-600" />
    
    return <File className="h-4 w-4" />
  }

  const getFileTypeLabel = (type?: string) => {
    if (!type) return "Fichier"
    
    if (type.includes('image')) return "Image"
    if (type.includes('pdf')) return "PDF"
    if (type.includes('spreadsheet') || type.includes('excel')) return "Tableur"
    if (type.includes('word') || type.includes('document')) return "Document"
    
    return "Fichier"
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Taille inconnue"
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "recent") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return matchesSearch && new Date(doc.dateCreation) >= oneWeekAgo
    }
    if (activeTab === "images") return matchesSearch && doc.type?.includes('image')
    if (activeTab === "pdfs") return matchesSearch && doc.type?.includes('pdf')
    
    return matchesSearch
  })

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des documents...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mes Documents</h1>
          <p className="text-muted-foreground">
            Gérez vos documents médicaux et rapports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={chargerDonnees}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un document</DialogTitle>
                <DialogDescription>
                  Téléversez un nouveau document médical
                </DialogDescription>
              </DialogHeader>
              {patientId && (
                <DocumentUpload 
                  patientId={patientId} 
                  onUploadSuccess={handleUploadSuccess}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">
              Documents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(doc => {
                const oneWeekAgo = new Date()
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
                return new Date(doc.dateCreation) >= oneWeekAgo
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Ajoutés récemment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(doc => doc.type?.includes('image')).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Photos et scans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PDFs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(doc => doc.type?.includes('pdf')).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Documents PDF
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
                placeholder="Rechercher un document..."
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
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pdfs">PDFs</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Liste des documents */}
          <Card>
            <CardHeader>
              <CardTitle>Mes Documents</CardTitle>
              <CardDescription>
                {filteredDocuments.length} document(s) trouvé(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun document</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Aucun document ne correspond à votre recherche" : "Vous n'avez pas encore de documents"}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setShowUploadDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter votre premier document
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocuments.map((document) => (
                    <Card key={document.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {getFileIcon(document.type)}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium max-w-[100px] xl:max-w-[200px] text-sm truncate">
                                {document.titre}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {getFileTypeLabel(document.type)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDownloadDocument(document.url, document.titre)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => window.open(document.url, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteDocument(document.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {document.description && (
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {document.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {new Date(document.dateCreation).toLocaleDateString('fr-FR')}
                          </span>
                          {document.size && (
                            <span>{formatFileSize(document.size)}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}