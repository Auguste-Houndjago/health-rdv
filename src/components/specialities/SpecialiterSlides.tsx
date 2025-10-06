
import React from 'react'
import { specialities } from './mock'
import { SpecialitiesSlider } from './SpecialitiesSlider'

export default function SpecialiterSlides() {
  return (
    <div>
          <SpecialitiesSlider specialities={specialities} />
    </div>
  )
}
