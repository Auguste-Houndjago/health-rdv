"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TimeSlot {
  heureDebut: string
  heureFin: string
  duree: number
  isPast?: boolean
}

interface SimpleTimeSlotSelectorProps {
  timeSlots: TimeSlot[]
  selectedSlot: TimeSlot | null
  onSlotSelect: (slot: TimeSlot) => void
  loading?: boolean
}

export default function SimpleTimeSlotSelector({
  timeSlots,
  selectedSlot,
  onSlotSelect,
  loading = false
}: SimpleTimeSlotSelectorProps) {
  
  // Grouper les créneaux par période
  const groupSlotsByPeriod = () => {
    const morning: TimeSlot[] = []
    const afternoon: TimeSlot[] = []
    const evening: TimeSlot[] = []

    timeSlots.forEach(slot => {
      const hour = parseInt(slot.heureDebut.split(':')[0])
      if (hour < 12) morning.push(slot)
      else if (hour < 17) afternoon.push(slot)
      else evening.push(slot)
    })

    return { morning, afternoon, evening }
  }

  const { morning, afternoon, evening } = groupSlotsByPeriod()

  const SlotGroup = ({ 
    title, 
    slots, 
    color 
  }: { 
    title: string
    slots: TimeSlot[]
    color: string
  }) => {
    if (slots.length === 0) return null

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", color)} />
          <h4 className="text-sm font-medium">{title}</h4>
          <Badge variant="secondary" className="ml-auto text-xs">
            {slots.length}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {slots.map((slot, index) => (
            <Button
              key={index}
              variant={selectedSlot?.heureDebut === slot.heureDebut ? "default" : "outline"}
              size="sm"
              disabled={slot.isPast}
              className={cn(
                "h-auto py-2 transition-all",
                selectedSlot?.heureDebut === slot.heureDebut && "ring-2 ring-primary ring-offset-2",
                slot.isPast && "opacity-40 cursor-not-allowed bg-gray-100"
              )}
              onClick={() => !slot.isPast && onSlotSelect(slot)}
            >
              <div className="flex flex-col items-center">
                <span className="font-semibold text-sm">{slot.heureDebut}</span>
                <span className="text-xs opacity-70">{slot.duree}min</span>
                {slot.isPast && <span className="text-[10px] text-muted-foreground">Passé</span>}
              </div>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    )
  }

  if (timeSlots.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Aucun créneau disponible</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <SlotGroup title="Matin" slots={morning} color="bg-orange-400" />
      <SlotGroup title="Après-midi" slots={afternoon} color="bg-blue-400" />
      <SlotGroup title="Soir" slots={evening} color="bg-purple-400" />
    </div>
  )
}

