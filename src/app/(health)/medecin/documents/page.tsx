"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { 
  FileText, 
  Search, 
  Download,
  Eye,
  User,
  Calendar,
  File,
  Image,
  FileSpreadsheet,
  FileImage,
  Loader2,
  RefreshCw,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Archive,
  Heart,
  Stethoscope
} from "lucide-react"
import { toast } from "sonner"
import { RiFilePdf2Fill } from "@remixicon/react"

interface PatientDocument {
  id: string
  titre: string
  description?: string
  url: string
  dateCreation: Date
  type?: string
  size?: number
  patient: {
    id: string
    nom: string
    prenom: string
    email: string
    telephone?: string
  }
  rendezVous: {
    id: string
    date: Date
    statut: string
    motif?: string
  }[]
}

export default function MedecinDocumentsPage() {
  const [documents, setDocuments] = useState<PatientDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<string>("all")
  const [selectedDocument, setSelectedDocument] = useState<PatientDocument | null>(null)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [medecinId, setMedecinId] = useState<string | null>(null)

  // Charger les données au montage
  useEffect(() => {
    chargerDonnees()
  }, [])

  const chargerDonnees = async () => {
    setLoading(true)
    try {
      // Récupérer l'utilisateur connecté
      const response = await fetch('/api/medecin/profile')
      if (response.ok) {
        const data = await response.json()
        setMedecinId(data.id)
        
        // Charger les documents des patients
        await chargerDocumentsPatients(data.id)
      } else {
        toast.error("Erreur lors de la récupération du profil médecin")
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
      toast.error("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  const chargerDocumentsPatients = async (medecinId: string) => {
    try {
      const response = await fetch(`/api/medecin/documents?medecinId=${medecinId}`)
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

  const handleViewDocument = (document: PatientDocument) => {
    setSelectedDocument(document)
    setShowDocumentDialog(true)
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
    if (type.includes('pdf')) return <RiFilePdf2Fill className="h-4 w-4 text-red-600" />
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

  const getStatutRendezVousBadge = (statut: string) => {
    switch (statut) {
      case "CONFIRME":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
      case "EN_ATTENTE":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "ANNULE":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  // Obtenir la liste unique des patients
  const patients = Array.from(
    new Map(documents.map(doc => [doc.patient.id, doc.patient])).values()
  )

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.patient.prenom.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesPatient = selectedPatient === "all" || doc.patient.id === selectedPatient
    
    if (activeTab === "all") return matchesSearch && matchesPatient
    if (activeTab === "recent") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return matchesSearch && matchesPatient && new Date(doc.dateCreation) >= oneWeekAgo
    }
    if (activeTab === "images") return matchesSearch && matchesPatient && doc.type?.includes('image')
    if (activeTab === "pdfs") return matchesSearch && matchesPatient && doc.type?.includes('pdf')
    
    return matchesSearch && matchesPatient
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
          <h1 className="text-3xl font-bold">Documents Patients</h1>
          <p className="text-muted-foreground">
            Consultez les documents médicaux de vos patients
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={chargerDonnees}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">
              Documents patients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">
              Patients avec documents
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
              Documents récents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.reduce((acc, doc) => acc + doc.rendezVous.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Consultations totales
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document ou patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les patients</SelectItem>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.prenom} {patient.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <CardTitle>Documents des Patients</CardTitle>
              <CardDescription>
                {filteredDocuments.length} document(s) trouvé(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun document</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? "Aucun document ne correspond à votre recherche" : "Aucun document de patient disponible"}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Rendez-vous</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            {getFileIcon(document.type)}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">
                                {document.titre}
                              </div>
                              {document.description && (
                                <div className="text-xs text-muted-foreground truncate">
                                  {document.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-sm">
                                {document.patient.prenom} {document.patient.nom}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {document.patient.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {getFileTypeLabel(document.type)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(document.dateCreation).toLocaleDateString('fr-FR')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {document.rendezVous.slice(0, 2).map((rdv, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">
                                  {new Date(rdv.date).toLocaleDateString('fr-FR')}
                                </span>
                                {getStatutRendezVousBadge(rdv.statut)}
                              </div>
                            ))}
                            {document.rendezVous.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{document.rendezVous.length - 2} autres
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDocument(document)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadDocument(document.url, document.titre)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de détail document */}
      <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails du Document</DialogTitle>
            <DialogDescription>
              Informations complètes du document patient
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  {getFileIcon(selectedDocument.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selectedDocument.titre}
                  </h3>
                  {selectedDocument.description && (
                    <p className="text-muted-foreground">
                      {selectedDocument.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Patient</h4>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {selectedDocument.patient.prenom} {selectedDocument.patient.nom}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedDocument.patient.email}
                      </div>
                      {selectedDocument.patient.telephone && (
                        <div className="text-sm text-muted-foreground">
                          {selectedDocument.patient.telephone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Document</h4>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">Type:</span> {getFileTypeLabel(selectedDocument.type)}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Date:</span> {new Date(selectedDocument.dateCreation).toLocaleDateString('fr-FR')}
                    </div>
                    {selectedDocument.size && (
                      <div className="text-sm">
                        <span className="font-medium">Taille:</span> {formatFileSize(selectedDocument.size)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Historique des rendez-vous</h4>
                <div className="space-y-2">
                  {selectedDocument.rendezVous.map((rdv, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {new Date(rdv.date).toLocaleDateString('fr-FR')} à {new Date(rdv.date).toTimeString().slice(0, 5)}
                          </div>
                          {rdv.motif && (
                            <div className="text-sm text-muted-foreground">
                              {rdv.motif}
                            </div>
                          )}
                        </div>
                      </div>
                      {getStatutRendezVousBadge(rdv.statut)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                  Fermer
                </Button>
                <Button onClick={() => handleDownloadDocument(selectedDocument.url, selectedDocument.titre)}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}