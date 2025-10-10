import { SignInPage } from '@/components/auth/SignInPage'
import { completedInformation } from '@/services/auth/permission'
import { getUserInfo } from '@/services/users'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const user = await getUserInfo({cache:false})
  const isComplete = await completedInformation(user)
  if(user && !isComplete){
    redirect("/auth/information")
  }
  return (
    <div>
        <SignInPage/>
    </div>
  )
}
