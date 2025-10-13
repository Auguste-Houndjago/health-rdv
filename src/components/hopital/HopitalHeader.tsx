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
  Calendar
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
    <Card className="overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar / Image de l'hôpital */}
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2">
              {image ? (
                <AvatarImage src={image} alt={nom} className="object-cover" />
              ) : (
                <AvatarFallback className="bg-primary/10">
                  <Building2 className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          {/* Informations principales */}
          <div className="flex-1 min-w-0">
            {/* Nom et badge */}
            <div className="flex items-start gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex-1 min-w-0">
                {nom}
              </h1>
              {verified && (
                <Badge variant="secondary" className="flex-shrink-0">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Vérifié
                </Badge>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-muted-foreground text-base md:text-lg mb-4 line-clamp-2">
                {description}
              </p>
            )}

            <Separator className="my-4" />

            {/* Coordonnées */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Adresse */}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">Adresse</p>
                  <p className="text-sm text-muted-foreground truncate" title={adresse}>
                    {adresse}
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">Téléphone</p>
                  <a 
                    href={`tel:${contact}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors truncate block"
                  >
                    {contact}
                  </a>
                </div>
              </div>

              {/* Site web */}
              {url && (
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Site web</p>
                    <a 
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors truncate block"
                    >
                      Visiter le site
                    </a>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-start gap-2">
                <Link href={ slug ? `/hopital/${slug}/rendez-vous` : `#`}>
                <Button variant="default" size="lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  Prendre rendez-vous
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

