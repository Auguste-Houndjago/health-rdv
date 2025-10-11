"use client"

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mettreAJourStatutDemande } from "@/services/medecins/demande";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  MapPin,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Send
} from "lucide-react";
import { toast } from "sonner";

interface DemandeModalProps {
  demande: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function DemandeModal({ demande, isOpen, onClose }: DemandeModalProps) {
  const [reponse, setReponse] = useState("");
  const [action, setAction] = useState<"APPROUVE" | "REJETE" | null>(null);

  const updateMutation = useMutation({
    mutationFn: ({ statut, reponse }: { statut: "APPROUVE" | "REJETE"; reponse?: string }) =>
      mettreAJourStatutDemande({
        demandeId: demande.id,
        statut,
        reponse
      }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(
          action === "APPROUVE" 
            ? "Demande approuvée avec succès" 
            : "Demande rejetée avec succès"
        );
        onClose();
      } else {
        toast.error(result.error || "Erreur lors de la mise à jour");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de la demande");
    },
  });

  const handleApprove = () => {
    setAction("APPROUVE");
    updateMutation.mutate({
      statut: "APPROUVE",
      reponse: reponse.trim() || undefined
    });
  };

  const handleReject = () => {
    setAction("REJETE");
    updateMutation.mutate({
      statut: "REJETE",
      reponse: reponse.trim() || undefined
    });
  };

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

  const isProcessing = updateMutation.isPending;
  const canModify = demande.statut === "EN_ATTENTE";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Demande de {demande.medecin.utilisateur.prenom} {demande.medecin.utilisateur.nom}
          </DialogTitle>
          <DialogDescription>
            Détails de la demande d'intégration et actions possibles
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations du médecin */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Informations du médecin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Nom complet</Label>
                  <p className="text-sm">
                    {demande.medecin.utilisateur.prenom} {demande.medecin.utilisateur.nom}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-500">Titre</Label>
                  <p className="text-sm">{demande.medecin.titre}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-500">Spécialité</Label>
                  <p className="text-sm">
                    {demande.medecin.specialite?.nom || "Non spécifiée"}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-500">Expérience</Label>
                  <p className="text-sm">
                    {demande.medecin.anneeExperience ? 
                      `${demande.medecin.anneeExperience} ans` : 
                      "Non spécifiée"
                    }
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-500">Numéro de licence</Label>
                  <p className="text-sm font-mono">{demande.medecin.numLicence}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">Contact</Label>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {demande.medecin.utilisateur.email}
                  </div>
                  {demande.medecin.utilisateur.telephone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {demande.medecin.utilisateur.telephone}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détails de la demande */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Détails de la demande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Date de demande</Label>
                  <p className="text-sm">
                    {new Date(demande.dateDemande).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-500">Statut actuel</Label>
                  <div className="mt-1">
                    {getStatutBadge(demande.statut)}
                  </div>
                </div>
              </div>

              {demande.message && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Message du médecin</Label>
                  <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm">{demande.message}</p>
                  </div>
                </div>
              )}

              {demande.reponse && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Réponse précédente</Label>
                  <div className="mt-1 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">{demande.reponse}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {canModify && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reponse">Réponse (optionnel)</Label>
                  <Textarea
                    id="reponse"
                    placeholder="Ajoutez un message de réponse au médecin..."
                    value={reponse}
                    onChange={(e) => setReponse(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing && action === "APPROUVE" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Approbation...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approuver
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleReject}
                    disabled={isProcessing}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isProcessing && action === "REJETE" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Rejet...
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-2" />
                        Rejeter
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
