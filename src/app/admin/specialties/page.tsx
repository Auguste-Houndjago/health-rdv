import SpecialiteForm from '@/components/specialite/SpecialiteForm'
import AdminSpecialites from '@/components/admin/specialties/AdminSpecialites'
import React from 'react'

export default function page() {
  return (
    <div className="container py-6 space-y-6">
      <AdminSpecialites />
      <SpecialiteForm />
  
    </div>
  )
}
