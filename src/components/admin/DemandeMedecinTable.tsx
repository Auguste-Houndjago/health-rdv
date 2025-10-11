"use client"

import React, { useState } from "react";
import { useAdminDemandes } from "@/hooks/useAdminDemandes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  User, 
  Mail, 
  Phone,
  Calendar,
  FileText,
  MapPin
} from "lucide-react";

import DemandeFilters from "./DemandeFilters";
import DemandeModal from "./DemandeModal";

interface DemandeMedecinTableProps {
  hopitalId?: string;
}

export default function DemandeMedecinTable({ hopitalId }: DemandeMedecinTableProps) {
  const [selectedDemande, setSelectedDemande] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredDemandes, setFilteredDemandes] = useState<any[]>([]);

  const { 
    demandes,
    isLoading, 
    error,
    refetch 
  } = useAdminDemandes({ hopitalId });

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "EN_ATTENTE":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        );
      case "APPROUVE":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approuvée
          </Badge>
        );
      case "REJETE":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejetée
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Inconnu
          </Badge>
        );
    }
  };

  const handleViewDemande = (demande: any) => {
    setSelectedDemande(demande);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDemande(null);
    refetch(); // Rafraîchir les données après action
  };

  const handleFilterChange = React.useCallback((filtered: any[]) => {
    setFilteredDemandes(filtered);
  }, []);

  // Utiliser les demandes filtrées ou toutes les demandes
  const displayDemandes = filteredDemandes.length > 0 ? filteredDemandes : demandes;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Chargement des demandes...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <XCircle className="w-8 h-8 mx-auto mb-2" />
            <p>Erreur lors du chargement des demandes</p>
            <Button 
              variant="outline" 
              onClick={() => refetch()}
              className="mt-2"
            >
              Réessayer
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (demandes.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Aucune demande</h3>
            <p>Il n'y a actuellement aucune demande de médecin pour cet hôpital.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <DemandeFilters onFilterChange={handleFilterChange} hopitalId={hopitalId} />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Demandes reçues ({displayDemandes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Expérience</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayDemandes.map((demande: any) => (
                  <TableRow key={demande.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {demande.medecin.utilisateur.prenom} {demande.medecin.utilisateur.nom}
                          </div>
                          <div className="text-sm text-gray-500">
                            {demande.medecin.titre}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        {demande.medecin.specialite?.nom || "Non spécifiée"}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        {demande.medecin.anneeExperience ? 
                          `${demande.medecin.anneeExperience} ans` : 
                          "Non spécifiée"
                        }
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          {demande.medecin.utilisateur.email}
                        </div>
                        {demande.medecin.utilisateur.telephone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {demande.medecin.utilisateur.telephone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {new Date(demande.dateDemande).toLocaleDateString("fr-FR")}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      {getStatutBadge(demande.statut)}
                    </TableCell>
                    
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDemande(demande)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && selectedDemande && (
        <DemandeModal
          demande={selectedDemande}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
