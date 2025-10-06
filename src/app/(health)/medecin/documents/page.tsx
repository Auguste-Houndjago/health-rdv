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
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Upload,
  Eye,
  Edit,
  Trash2,
  Filter,
  Calendar,
  User,
  File,
  FileImage,
  FileVideo,
  Archive,
  Share2,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { RiFilePdf2Fill } from "@remixicon/react";

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Données simulées - à remplacer par des hooks réels
  const documents = [
    {
      id: "1",
      nom: "Rapport Cardiologie - Janvier 2024",
      type: "RAPPORT",
      format: "PDF",
      taille: "2.4 MB",
      dateCreation: "2024-01-15",
      dateModification: "2024-01-20",
      auteur: "Dr. Martin",
      statut: "PUBLIE",
      description: "Rapport mensuel des consultations cardiologiques",
      tags: ["Cardiologie", "Rapport", "Mensuel"],
      patient: "Jean Dupont",
      consultations: 45
    },
    {
      id: "2",
      nom: "Protocole Hypertension",
      type: "PROTOCOLE",
      format: "DOCX",
      taille: "1.2 MB",
      dateCreation: "2024-01-10",
      dateModification: "2024-01-18",
      auteur: "Dr. Martin",
      statut: "BROUILLON",
      description: "Protocole de traitement de l'hypertension artérielle",
      tags: ["Protocole", "Hypertension", "Traitement"],
      patient: null,
      consultations: 0
    },
    {
      id: "3",
      nom: "ECG Patient 001",
      type: "EXAMEN",
      format: "PDF",
      taille: "850 KB",
      dateCreation: "2024-01-12",
      dateModification: "2024-01-12",
      auteur: "Dr. Martin",
      statut: "ARCHIVE",
      description: "Électrocardiogramme de contrôle",
      tags: ["ECG", "Examen", "Cardiologie"],
      patient: "Marie Leroy",
      consultations: 1
    },
    {
      id: "4",
      nom: "Formation Diabétologie 2024",
      type: "FORMATION",
      format: "PPTX",
      taille: "15.8 MB",
      dateCreation: "2024-01-08",
      dateModification: "2024-01-22",
      auteur: "Dr. Martin",
      statut: "PUBLIE",
      description: "Présentation formation continue diabétologie",
      tags: ["Formation", "Diabétologie", "Présentation"],
      patient: null,
      consultations: 0
    },
    {
      id: "5",
      nom: "Ordonnance Type - Diabète",
      type: "ORDONNANCE",
      format: "PDF",
      taille: "320 KB",
      dateCreation: "2024-01-05",
      dateModification: "2024-01-15",
      auteur: "Dr. Martin",
      statut: "PUBLIE",
      description: "Modèle d'ordonnance pour patients diabétiques",
      tags: ["Ordonnance", "Diabète", "Modèle"],
      patient: null,
      consultations: 12
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "rapports") return matchesSearch && doc.type === "RAPPORT";
    if (activeTab === "examens") return matchesSearch && doc.type === "EXAMEN";
    if (activeTab === "protocoles") return matchesSearch && doc.type === "PROTOCOLE";
    if (activeTab === "formations") return matchesSearch && doc.type === "FORMATION";
    if (activeTab === "ordonnances") return matchesSearch && doc.type === "ORDONNANCE";
    
    return matchesSearch;
  });

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setShowDocumentDialog(true);
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "PUBLIE":
        return <Badge className="bg-green-100 text-green-800">Publié</Badge>;
      case "BROUILLON":
        return <Badge className="bg-yellow-100 text-yellow-800">Brouillon</Badge>;
      case "ARCHIVE":
        return <Badge className="bg-gray-100 text-gray-800">Archivé</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case "PUBLIE":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "BROUILLON":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "ARCHIVE":
        return <Archive className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <RiFilePdf2Fill className="h-4 w-4 text-red-600" />;
      case "DOCX":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "PPTX":
        return <FileImage className="h-4 w-4 text-orange-600" />;
      case "MP4":
        return <FileVideo className="h-4 w-4 text-purple-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "RAPPORT":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "EXAMEN":
        return <File className="h-4 w-4 text-green-600" />;
      case "PROTOCOLE":
        return <FileText className="h-4 w-4 text-purple-600" />;
      case "FORMATION":
        return <FileImage className="h-4 w-4 text-orange-600" />;
      case "ORDONNANCE":
        return <FileText className="h-4 w-4 text-red-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const stats = {
    totalDocuments: documents.length,
    documentsPublies: documents.filter(d => d.statut === "PUBLIE").length,
    documentsBrouillons: documents.filter(d => d.statut === "BROUILLON").length,
    tailleTotale: "22.5 MB"
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Gérez vos documents médicaux et recommandations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowUploadDialog(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Document
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              Documents créés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiés</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsPublies}</div>
            <p className="text-xs text-muted-foreground">
              Documents publiés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brouillons</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsBrouillons}</div>
            <p className="text-xs text-muted-foreground">
              En cours de rédaction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taille Totale</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tailleTotale}</div>
            <p className="text-xs text-muted-foreground">
              Espace utilisé
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets et recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between space-x-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="rapports">Rapports</TabsTrigger>
                <TabsTrigger value="examens">Examens</TabsTrigger>
                <TabsTrigger value="protocoles">Protocoles</TabsTrigger>
                <TabsTrigger value="formations">Formations</TabsTrigger>
                <TabsTrigger value="ordonnances">Ordonnances</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des documents */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Documents</CardTitle>
          <CardDescription>
            {filteredDocuments.length} document(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getFormatIcon(document.format)}
                        {getTypeIcon(document.type)}
                      </div>
                      <div>
                        <div className="font-medium">{document.nom}</div>
                        <div className="text-sm text-muted-foreground">
                          {document.description}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {document.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(document.type)}
                      <span className="text-sm">{document.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getFormatIcon(document.format)}
                      <span className="text-sm">{document.taille}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {new Date(document.dateCreation).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Modifié: {new Date(document.dateModification).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatutIcon(document.statut)}
                      {getStatutBadge(document.statut)}
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
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm">
                        <RiFilePdf2Fill className="h-4 w-4 mr-1" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de détail document */}
      <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du Document</DialogTitle>
            <DialogDescription>
              Informations complètes du document
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  {getFormatIcon(selectedDocument.format)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedDocument.nom}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedDocument.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatutIcon(selectedDocument.statut)}
                    {getStatutBadge(selectedDocument.statut)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <p className="text-sm">{selectedDocument.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Format</Label>
                  <p className="text-sm">{selectedDocument.format}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Taille</Label>
                  <p className="text-sm">{selectedDocument.taille}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Auteur</Label>
                  <p className="text-sm">{selectedDocument.auteur}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date de création</Label>
                  <p className="text-sm">
                    {new Date(selectedDocument.dateCreation).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Dernière modification</Label>
                  <p className="text-sm">
                    {new Date(selectedDocument.dateModification).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              {selectedDocument.patient && (
                <div>
                  <Label className="text-sm font-medium">Patient associé</Label>
                  <p className="text-sm">{selectedDocument.patient}</p>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDocument.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                  Fermer
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Dupliquer
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog d'upload */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importer un Document</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau document à votre bibliothèque
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Fichier</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Glissez-déposez votre fichier ici ou cliquez pour sélectionner
                </p>
              </div>
            </div>
            <div>
              <Label>Type de document</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rapport">Rapport</SelectItem>
                  <SelectItem value="examen">Examen</SelectItem>
                  <SelectItem value="protocole">Protocole</SelectItem>
                  <SelectItem value="formation">Formation</SelectItem>
                  <SelectItem value="ordonnance">Ordonnance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Description du document..." />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Annuler
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Importer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

