import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, Calendar, User } from 'lucide-react'
import { Utilisateur } from './types'

interface ProfileCardProps {
  utilisateur: Utilisateur
  titre?: string
  numLicence: string
  anneeExperience?: number
}

export default function ProfileCard({ 
  utilisateur, 
  titre, 
  numLicence, 
  anneeExperience 
}: ProfileCardProps) {
  const initials = `${utilisateur.prenom?.[0] || ''}${utilisateur.nom?.[0] || ''}`.toUpperCase()
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={utilisateur.avatarUrl || '/avatar.png'} alt={`${utilisateur.prenom} ${utilisateur.nom}`} />
            <AvatarFallback className="text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">
              Dr. {utilisateur.prenom} {utilisateur.nom}
            </CardTitle>
            <p className="text-muted-foreground">{titre || ''}</p>
            <Badge variant="secondary" className="mt-1">
              Licence: {numLicence}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{utilisateur.email}</span>
          </div>
          
          {utilisateur.telephone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{utilisateur.telephone}</span>
            </div>
          )}
          
          {utilisateur.dateNaissance && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Né(e) le {new Date(utilisateur.dateNaissance).toLocaleDateString('fr-FR')}
              </span>
            </div>
          )}
          
          {anneeExperience && (
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{anneeExperience} ans d'expérience</span>
            </div>
          )}
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Statut du compte</span>
            <Badge variant={utilisateur.status === 'ACTIF' ? 'default' : 'secondary'}>
              {utilisateur.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
