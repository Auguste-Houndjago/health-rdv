import { getHopitaux } from '@/services/hopitaux'
import React from 'react'
import { cn } from '@/lib/utils'
import HopitalCardM from './HopitalCardM'

interface HopitalCardsProps {
    className?: string
}
export default async function HopitalCards({className}: HopitalCardsProps) {
    const hopitaux = await getHopitaux()


  return (
              <div className={cn("grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
        {hopitaux.map((hopital) => (
          <HopitalCardM key={hopital.id} {...hopital} />
        ))}
      </div>

  )
}
