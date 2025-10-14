import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Globe,
  Building2,
  Star,
  Calendar,
  ShieldCheck
} from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

interface HopitalHeaderProps {
  nom: string
  description?: string | null
  adresse: string
  contact: string
  url?: string | null
  image?: string | null
  verified?: boolean
  slug?: string
}

export default function HopitalHeader({
  nom,
  description,
  adresse,
  contact,
  url,
  image,
  verified = false,
  slug
}: HopitalHeaderProps) {
  return (
    <Card className="overflow-hidden bg-white isolate border-4 border-gray-200 dark:bg-background shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Avatar / Image de l'hôpital */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <Avatar className="h-28 w-28 lg:h-32 lg:w-32 ">
              {image ? (
                <AvatarImage src={image} alt={nom} className="object-cover" />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5">
                  <Building2 className="h-12 w-12 text-primary/70" />
                </AvatarFallback>
              )}
            </Avatar>
            
            {/* Badge vérifié aligné sous l'avatar */}
            {verified && (
              <Badge variant="default" className="px-3 py-1.5 bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
                <ShieldCheck className="h-3 w-3 mr-1.5" />
                Établissement vérifié
              </Badge>
            )}
          </div>

          {/* Informations principales */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* En-tête avec nom et actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground break-words">
                  {nom}
                </h1>
                
                {/* Description */}
                {description && (
                  <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">
                    {description}
                  </p>
                )}
              </div>

              {/* Bouton CTA */}
              <div className="flex-shrink-0">
                <Link href={slug ? `/hopital/${slug}/rendez-vous` : "#"}>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre rendez-vous
                  </Button>
                </Link>
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Grille des coordonnées */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              {/* Adresse */}
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                  <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">Adresse</p>
                  <p 
                    className="text-sm text-muted-foreground leading-relaxed break-words"
                    title={adresse}
                  >
                    {adresse}
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors duration-200">
                  <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">Contact</p>
                  <a 
                    href={`tel:${contact}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block break-words"
                  >
                    {contact}
                  </a>
                </div>
              </div>

              {/* Site web */}
              {url && (
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-200">
                    <Globe className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm font-semibold text-foreground">Site web</p>
                    <a 
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block truncate"
                      title={url}
                    >
                      {url.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
              )}

              {/* Note ou information supplémentaire */}
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors duration-200">
                  <Star className="h-4 w-4 text-amber-600 flex-shrink-0" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">Disponibilité</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Rendez-vous en ligne disponibles
                  </p>
                </div>
              </div>
            </div>

            {/* Informations supplémentaires pour mobile */}
            <div className="flex flex-col sm:hidden space-y-3 pt-4">
              {verified && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Établissement médical vérifié et certifié</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}