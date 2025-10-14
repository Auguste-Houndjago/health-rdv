// components/DocumentModal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, User, Calendar } from "lucide-react";

interface Document {
  id: string;
  titre: string;
  description?: string;
  type: string;
  url: string;
  dateCreation: string;
  size?: number;
  patient: {
    prenom: string;
    nom: string;
    email: string;
    telephone?: string;
  };
  rendezVous: Array<{
    date: string;
    motif?: string;
    statut: string;
  }>;
}

interface DocumentModalProps {
  /** Le texte du bouton qui ouvre la modale */
  triggerLabel: string;
  /** Le document à afficher */
  document?: Document;
  /** Si la modale est ouverte (contrôlée) */
  open?: boolean;
  /** Callback quand l'état d'ouverture change */
  onOpenChange?: (open: boolean) => void;
  /** Callback pour le téléchargement */
  onDownload?: (url: string, filename: string) => void;
  /** Fonction pour obtenir l'icône du fichier */
  getFileIcon?: (type: string) => React.ReactNode;
  /** Fonction pour formater la taille du fichier */
  formatFileSize?: (size: number) => string;
  /** Fonction pour obtenir le label du type de fichier */
  getFileTypeLabel?: (type: string) => string;
  /** Fonction pour obtenir le badge de statut du rendez-vous */
  getStatutRendezVousBadge?: (statut: string) => React.ReactNode;
}

export default function DocumentModal({
  triggerLabel,
  document,
  open,
  onOpenChange,
  onDownload,
  getFileIcon,
  formatFileSize,
  getFileTypeLabel,
  getStatutRendezVousBadge,
}: DocumentModalProps) {
  
  const handleDownload = () => {
    if (document && onDownload) {
      onDownload(document.url, document.titre);
    }
  };

  const defaultGetFileIcon = (type: string) => {
    const iconClass = "h-6 w-6";
    switch (type) {
      case 'pdf':
        return <div className="text-red-500">📄</div>;
      case 'image':
        return <div className="text-blue-500">🖼️</div>;
      case 'word':
        return <div className="text-blue-600">📝</div>;
      default:
        return <div className="text-gray-500">📎</div>;
    }
  };

  const defaultFormatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const defaultGetFileTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'pdf': 'Document PDF',
      'image': 'Image',
      'word': 'Document Word',
      'excel': 'Document Excel',
    };
    return labels[type] || 'Document';
  };

  const defaultGetStatutRendezVousBadge = (statut: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (statut) {
      case 'CONFIRME':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Confirmé</span>;
      case 'ANNULE':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Annulé</span>;
      case 'EN_ATTENTE':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>En attente</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{statut}</span>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails du Document</DialogTitle>
          <DialogDescription>
            Informations complètes du document patient
          </DialogDescription>
        </DialogHeader>

        {document && (
          <div className="space-y-6">
            {/* En-tête du document */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                {getFileIcon ? getFileIcon(document.type) : defaultGetFileIcon(document.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {document.titre}
                </h3>
                {document.description && (
                  <p className="text-muted-foreground">
                    {document.description}
                  </p>
                )}
              </div>
            </div>

            {/* Informations patient et document */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Patient</h4>
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <div className="font-medium">
                      {document.patient.prenom} {document.patient.nom}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {document.patient.email}
                    </div>
                    {document.patient.telephone && (
                      <div className="text-sm text-muted-foreground">
                        {document.patient.telephone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Document</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Type:</span>{" "}
                    {getFileTypeLabel ? getFileTypeLabel(document.type) : defaultGetFileTypeLabel(document.type)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(document.dateCreation).toLocaleDateString('fr-FR')}
                  </div>
                  {document.size && (
                    <div className="text-sm">
                      <span className="font-medium">Taille:</span>{" "}
                      {formatFileSize ? formatFileSize(document.size) : defaultFormatFileSize(document.size)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Historique des rendez-vous */}
            {document.rendezVous && document.rendezVous.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Historique des rendez-vous</h4>
                <div className="space-y-3">
                  {document.rendezVous.map((rdv, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div>
                          <div className="font-medium">
                            {new Date(rdv.date).toLocaleDateString('fr-FR')} à {new Date(rdv.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          {rdv.motif && (
                            <div className="text-sm text-muted-foreground">
                              {rdv.motif}
                            </div>
                          )}
                        </div>
                      </div>
                      {getStatutRendezVousBadge ? getStatutRendezVousBadge(rdv.statut) : defaultGetStatutRendezVousBadge(rdv.statut)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <DialogFooter className="flex justify-end space-x-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">
                  Fermer
                </Button>
              </DialogClose>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </DialogFooter>
          </div>
        )}

        {!document && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun document sélectionné</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}