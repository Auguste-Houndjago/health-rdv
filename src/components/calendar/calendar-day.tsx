"use client"

import { DayData } from "@/hooks/use-calendar"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"


interface CalendarDayProps {
  dayData: DayData
  isSelected: boolean
  onSelect: (dayData: DayData) => void
  onHover?: (day: string | null) => void
}

export function CalendarDay({ dayData, isSelected, onSelect, onHover }: CalendarDayProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getDayClasses = () => {
    let classes =
      "relative flex items-center justify-center py-1 rounded-xl transition-all duration-200"

    // Bordure bleue pour les RDV du patient
    const hasPatientRdv = (dayData as any).hasPatientRendezVous
    
    if (isSelected) {
      classes +=
        " bg-[#1e1e1e] text-foreground border-2 border-zinc-600 dark:bg-[#1e1e1e] dark:border-zinc-600 dark:text-white" +
        " bg-muted text-primary border border-muted-foreground"
    } else if (dayData.isCurrentMonth) {
      if (hasPatientRdv) {
        classes += " cursor-pointer border-2 border-blue-400 bg-blue-50 dark:bg-blue-950 text-primary dark:border-blue-500"
      } else {
        classes += " cursor-pointer border bg-muted text-primary dark:bg-[#1e1e1e]"
      }
    } else {
      classes +=
        " bg-muted/40 text-muted-foreground dark:bg-zinc-700/20 dark:text-zinc-400"
    }

    return classes
  }

  return (
    <motion.div
      className={getDayClasses()}
      style={{ height: "4rem" }}
      onClick={() => dayData.isCurrentMonth && onSelect(dayData)}
      onMouseEnter={() => {
        setIsHovered(true)
        onHover?.(dayData.day)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover?.(null)
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div className="flex flex-col items-center justify-center">
        <span className="text-sm">{dayData.day}</span>
      </motion.div>

      {/* Badge de rendez-vous */}
      {dayData.rendezVous && dayData.rendezVous.length > 0 && (
        <motion.div
          className="absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-primary dark:bg-zinc-700 dark:text-white"
          layoutId={`day-${dayData.day}-meeting-count`}
        >
          {dayData.rendezVous.length}
        </motion.div>
      )}

      <AnimatePresence>
        {dayData.rendezVous && dayData.rendezVous.length > 0 && isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex size-10 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary dark:bg-zinc-700 "
              layoutId={`day-${dayData.day}-meeting-count`}
            >
              {dayData.rendezVous.length}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
