"use server"
import Home from '@/components/home/Home'


import { clearCache, getAuthUser, getCacheStats, getUserInfo } from '@/services/users';


export default async function page() {
  clearCache()
const user = await getUserInfo({cache:false})

 const realuser = await getAuthUser()
const cached =  getCacheStats()
clearCache()
  return (
    <div>
      <h1>{user?.email} maill</h1>
      <h1>
        <h1> real user : {realuser?.email}</h1>
      size: {cached?.size} max: {cached?.maxSize}
      </h1>
        <Home/>
    </div>
  )
}
  