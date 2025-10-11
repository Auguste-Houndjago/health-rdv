'use client'
import React, { useState } from "react";
import OptionModal from "../OptionModal";
import { useDemandeHopital } from "@/hooks/useDemandeHopital";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, X, CheckCircle, Clock, XCircle } from "lucide-react";

interface HopitalIntegrationProps {
  hopitalId: string;
  hopitalNom: string;
}

export default function HopitalIntegration({ 
  hopitalId, 
  hopitalNom 
}: HopitalIntegrationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  const {
    statutDemande,
    isLoadingStatut,
    envoyerDemande,
    annulerDemande,
    hasDemande,
    getStatutDemande,
    getStatutText,
    getStatutColor,
    getStatutIcon,
    isCreating,
    isCancelling,
    setMessage: setMessageHook
  } = useDemandeHopital({ hopitalId });

  const demande = getStatutDemande(hopitalId);
  const hasExistingDemande = hasDemande(hopitalId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hopitalId) {
      envoyerDemande(hopitalId, message);
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleAnnuler = () => {
    if (hopitalId) {
      annulerDemande(hopitalId);
      setIsOpen(false);
    }
  };

  const getTriggerLabel = () => {
    if (isLoadingStatut) return "Chargement...";
    if (hasExistingDemande) {
      return `Statut: ${getStatutText(demande?.statut || "")}`;
    }
    return "Faire une demande";
  };

  const getTriggerVariant = () => {
    if (hasExistingDemande) {
      switch (demande?.statut) {
        case "EN_ATTENTE":
          return "secondary";
        case "APPROUVE":
          return "default";
        case "REJETE":
          return "destructive";
        default:
          return "outline";
      }
    }
    return "outline";
  };

  const getStatusIcon = () => {
    if (hasExistingDemande) {
      switch (demande?.statut) {
        case "EN_ATTENTE":
          return <Clock className="w-4 h-4" />;
        case "APPROUVE":
          return <CheckCircle className="w-4 h-4" />;
        case "REJETE":
          return <XCircle className="w-4 h-4" />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <OptionModal
      triggerLabel={getTriggerLabel()}
      title={hasExistingDemande ? `Statut de votre demande - ${hopitalNom}` : `Adresser une demande à ${hopitalNom}`}
      description={
        hasExistingDemande ? (
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${getStatutColor(demande?.statut || "")}`}>
              {getStatusIcon()}
              {getStatutText(demande?.statut || "")}
            </div>
            
            {demande?.message && (
              <div>
                <h4 className="font-medium text-sm mb-2">Votre message :</h4>
                <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  {demande.message}
                </p>
              </div>
            )}

            {demande?.reponse && (
              <div>
                <h4 className="font-medium text-sm mb-2">Réponse de l'hôpital :</h4>
                <p className="text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  {demande.reponse}
                </p>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p>Date de demande : {new Date(demande?.dateDemande || "").toLocaleDateString("fr-FR")}</p>
              {demande?.dateReponse && (
                <p>Date de réponse : {new Date(demande.dateReponse).toLocaleDateString("fr-FR")}</p>
              )}
            </div>

            {demande?.statut === "EN_ATTENTE" && (
              <div className="pt-4">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleAnnuler}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Annulation...
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Annuler la demande
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <p>
              Lorsque vous adressez une demande à un hôpital, celle-ci est transmise
              directement au <strong>service d'administration</strong> de l'établissement.
              Votre profil professionnel et vos informations liées à votre compte seront
              consultables par le service chargé de l'examen des candidatures.
            </p>

            <p>
              Ce processus permet à l'hôpital <strong>{hopitalNom}</strong> d'évaluer
              votre dossier en fonction de ses besoins internes et des spécialités
              disponibles.
            </p>

            <p>
              Une fois votre demande traitée, vous recevrez une <strong>réponse par e-mail</strong>. 
              Vous pourrez également <strong>consulter le statut de votre demande </strong> 
              directement sur cette page ou dans votre espace personnel.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  placeholder="Ajoutez un message personnel à votre demande..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isCreating}
                  className="flex-1"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer la demande
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )
      }
      closeLabel={hasExistingDemande ? "Fermer" : "Annuler"}
      onClose={() => {
        setIsOpen(false);
        setMessage("");
      }}
    />
  );
}
