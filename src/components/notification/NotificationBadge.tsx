"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { obtenirStatistiquesNotifications } from "@/services/notifications/notifications-actions"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NotificationBadgeProps {
  className?: string
  variant?: "sidebar" | "header"
}

export function NotificationBadge({ className, variant = "header" }: NotificationBadgeProps) {
  const [nonLues, setNonLues] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const chargerStats = async () => {
      setLoading(true)
      try {
        const result = await obtenirStatistiquesNotifications()
        if (result.success) {
          setNonLues(result.data.notificationsNonLues)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des stats:", error)
      } finally {
        setLoading(false)
      }
    }

    chargerStats()

    // Recharger toutes les 60 secondes
    const interval = setInterval(chargerStats, 60000)

    return () => clearInterval(interval)
  }, [])

  if (variant === "sidebar") {
    return (
      <Link href="/patient/notification" className={cn("relative", className)}>
        <Bell className="h-5 w-5" />
        {nonLues > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            variant="destructive"
          >
            {nonLues > 9 ? '9+' : nonLues}
          </Badge>
        )}
      </Link>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn("relative", className)}
      asChild
    >
      <Link href="/patient/notification">
        <Bell className="h-5 w-5" />
        {nonLues > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            variant="destructive"
          >
            {nonLues > 9 ? '9+' : nonLues}
          </Badge>
        )}
      </Link>
    </Button>
  )
}

