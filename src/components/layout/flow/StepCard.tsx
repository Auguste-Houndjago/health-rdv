"use client"

import * as React from "react"

interface StepCardProps {
  title: string
  children: React.ReactNode
}

export function StepCard({  children }: StepCardProps) {
  return (
    <div className="w-full max-w-md  ">
 
      {children}
    </div>
  )
} 