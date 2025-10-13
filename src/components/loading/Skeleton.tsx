// components/skeletons/SkeletonMedecinPage.tsx
import React from "react"

export function Skeleton() {
  return (
    <main className="max-w-6xl w-full flex flex-col gap-y-14 min-h-screen mx-auto lg:px-12 p-6">
      {/* Skeleton pour l'en-tête */}
      <section className="mb-8 flex flex-col items-center">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </section>

      <div className="flex flex-col gap-y-20">
        {/* Skeleton pour la carte médecin et spécialité */}
        <section className="gap-4 flex flex-col md:flex-row justify-center">
          {/* Skeleton carte médecin */}
          <div className="flex justify-center">
            <div className="w-80 h-40 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Skeleton spécialité */}
          <div className="w-full border-2 rounded-md p-2">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </section>

        {/* Skeleton pour le calendrier */}
        <section className="flex flex-col">
          <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
          <div className="w-full h-96 bg-gray-200 rounded animate-pulse"></div>
        </section>
      </div>
    </main>
  )
}