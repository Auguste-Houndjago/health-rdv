"use server"
import HeroSection from '@/components/home/Home'
import Header from '@/components/layout/Header';
import SpecialiterListe from '@/components/specialities/SpecialiterListe';
import SpecialiterSlides from '@/components/specialities/SpecialiterSlides';
import HopitalList from "@/components/hopital/HopitalList";

import { clearCache, getUserInfo } from '@/services/users';
import SearchDoctor from '@/components/SearchDoctor';
import NoiseOverlay from '@/components/design/NoiseOverlay';


export default async function page() {
  clearCache()
const user = await getUserInfo({cache:false})


    // const isConnect = user?.id? true : false

clearCache()
  return (

      <div className="flex relative flex-col  min-h-screen bg-design-bg ">
      <Header user={user}  />
        <div className="flex flex-col gap-2">
          <HeroSection/>
          <span className="max-w-[600px]"><SearchDoctor   /></span>
        </div>
        <div className="gap-20 pt-32 flex flex-col ">
          <SpecialiterListe/>
          <SpecialiterSlides/>
          <HopitalList/>
        </div>
        <NoiseOverlay intensity={18} blendMode="difference" />
    </div>
  )
}
  