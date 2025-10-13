"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Stethoscope, Calendar, Award } from "lucide-react"

interface HospitalStatsProps {
  stats: {
    medecins: number
    specialites: number
    rendezvous: number
    patients: number
  }
  className?: string
}

const items = [
  {
    label: "Médecins",
    color: "text-blue-600",
    bg: "bg-blue-100",
    accent: "bg-blue-500/5",
    icon: Users,
    subtitle: "Professionnels qualifiés",
    key: "medecins",
  },
  {
    label: "Spécialités",
    color: "text-green-600",
    bg: "bg-green-100",
    accent: "bg-green-500/5",
    icon: Stethoscope,
    subtitle: "Domaines d'expertise",
    key: "specialites",
  },
  {
    label: "Rendez-vous",
    color: "text-purple-600",
    bg: "bg-purple-100",
    accent: "bg-purple-500/5",
    icon: Calendar,
    subtitle: "Consultations mensuelles",
    key: "rendezvous",
  },
  {
    label: "Patients",
    color: "text-orange-600",
    bg: "bg-orange-100",
    accent: "bg-orange-500/5",
    icon: Award,
    subtitle: "Patients satisfaits",
    key: "patients",
  },
]

export default function HospitalStats({ stats, className = "" }: HospitalStatsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {items.map(({ label, color, bg, accent, icon: Icon, subtitle, key }) => (
        <Card
          key={key}
          className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${color} mb-1`}>{label}</p>
                <p className="text-2xl font-semibold text-foreground">
                  {stats[key as keyof typeof stats] ?? 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              </div>
              <div className={`p-3 rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
            </div>
            <div className={`absolute top-0 right-0 w-20 h-20 ${accent} rounded-full -translate-y-10 translate-x-10`} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
