import { getHopitaux } from '@/services/hopitaux'
import React from 'react'
import { cn } from '@/lib/utils'
import HopitalCardM from './HopitalCardM'
import { getUserInfo } from '@/services/users'

interface HopitalCardsProps {
    className?: string
}
export default async function HopitalCards({className}: HopitalCardsProps) {
    const hopitaux = await getHopitaux()
    const user = await getUserInfo()


  return (
              <div className={cn("grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", className)}>
        {hopitaux.map((hopital) => (
          <HopitalCardM key={hopital.id} {...hopital} />
        ))}
      </div>

  )
}
