import React from 'react'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'

interface StatusBadgeProps {
  statut: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

export default function StatusBadge({ 
  statut, 
  size = 'md', 
  showIcon = true 
}: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'APPROUVE':
      case 'APPROVED':
        return {
          variant: 'default' as const,
          label: 'Approuvé',
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800 border-green-200'
        }
      case 'EN_ATTENTE':
      case 'PENDING':
        return {
          variant: 'secondary' as const,
          label: 'En attente',
          icon: Clock,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        }
      case 'REJETE':
      case 'REJECTED':
        return {
          variant: 'destructive' as const,
          label: 'Rejeté',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200'
        }
      case 'SUSPENDU':
      case 'SUSPENDED':
        return {
          variant: 'destructive' as const,
          label: 'Suspendu',
          icon: AlertCircle,
          className: 'bg-orange-100 text-orange-800 border-orange-200'
        }
      default:
        return {
          variant: 'outline' as const,
          label: statut,
          icon: AlertCircle,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }
  }

  const config = getStatusConfig(statut)
  const Icon = config.icon

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  }

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${sizeClasses[size]} flex items-center gap-1.5`}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  )
}
