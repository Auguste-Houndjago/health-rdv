import Loading from '@/components/loading'
import AppointmentsContent from '@/components/patient/appointments/PatientAppointmentsPage'

import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <AppointmentsContent />
    </Suspense>
  )
}
