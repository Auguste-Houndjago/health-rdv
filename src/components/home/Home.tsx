import React from 'react'
import NoiseOverlay from '../design/NoiseOverlay'
import HeroSection from '../hero/HeroSection'

export default function Home() {
  return (

        <div className="flex relative flex-col bg-design-bg ">
        <div className="flex flex-col gap-2">
          <HeroSection/>
          {/* <span className="max-w-[600px]"><SearchDoctor   /></span> */}
        </div>

        <NoiseOverlay intensity={18} blendMode="difference" />
    </div>

  )
}
