// components/medecin-additional-info.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Shield } from "lucide-react"

interface Utilisateur {
  createdAt?: Date
  updatedAt?: Date
  role?: string
  status?: string
}

interface MedecinData {
  numLicence?: string
  titre?: string
  anneeExperience?: number
  statut?: string
  utilisateur?: Utilisateur
}

interface MedecinAdditionalInfoProps {
  medecinData?: MedecinData
}

interface InfoItemProps {
  label: string
  value?: string | number
  className?: string
}

function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">
        {value || (
          <span className="text-muted-foreground italic">N/A</span>
        )}
      </span>
    </div>
  )
}

interface StatusBadgeProps {
  statut?: string
  size?: "sm" | "md" | "lg"
}

function StatusBadge({ statut, size = "md" }: StatusBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2"
  }

  const getStatusVariant = (statut?: string) => {
    switch (statut?.toLowerCase()) {
      case 'actif':
      case 'approuvé':
        return "bg-green-100 text-green-800 border-green-200"
      case 'en attente':
      case 'en_attente':
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 'rejeté':
      case 'inactif':
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Badge 
      variant="outline" 
      className={`${sizeClasses[size]} ${getStatusVariant(statut)} border`}
    >
      {statut || "Inconnu"}
    </Badge>
  )
}

export function MedecinAdditionalInfo({ medecinData }: MedecinAdditionalInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Carte Informations professionnelles */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            Informations professionnelles
          </CardTitle>
          <CardDescription>
            Détails sur la pratique médicale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <InfoItem 
              label="Numéro de licence" 
              value={medecinData?.numLicence}
            />
            <Separator />
            <InfoItem 
              label="Titre" 
              value={medecinData?.titre}
            />
            <Separator />
            {medecinData?.anneeExperience && (
              <>
                <InfoItem 
                  label="Années d'expérience" 
                  value={`${medecinData.anneeExperience} ans`}
                />
                <Separator />
              </>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Statut d'approbation</span>
              <StatusBadge statut={medecinData?.statut} size="sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carte Statut du compte */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            Statut du compte
          </CardTitle>
          <CardDescription>
            Informations de compte et autorisations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <InfoItem 
              label="Compte créé" 
              value={
                medecinData?.utilisateur?.createdAt 
                  ? new Date(medecinData.utilisateur.createdAt).toLocaleDateString('fr-FR')
                  : undefined
              }
            />
            <Separator />
            <InfoItem 
              label="Dernière mise à jour" 
              value={
                medecinData?.utilisateur?.updatedAt 
                  ? new Date(medecinData.utilisateur.updatedAt).toLocaleDateString('fr-FR')
                  : undefined
              }
            />
            <Separator />
            <InfoItem 
              label="Rôle" 
              value={medecinData?.utilisateur?.role}
            />
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Statut du compte</span>
              {medecinData?.utilisateur?.status ? (
                <StatusBadge statut={medecinData.utilisateur.status} size="sm" />
              ) : (
                <Badge variant="outline" className="text-xs">
                  N/A
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}