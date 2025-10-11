import React, { Suspense } from 'react'
import PatientAppointmentsPage from '@/components/patient/appointments/PatientAppointmentsPage'
import Loading from '@/components/loading'

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <PatientAppointmentsPage />
    </Suspense>
  )
}
