"use client"
import Home from '@/components/home/Home'
import DebugPWAVercel from '@/components/notification/notif'
import { useEntity } from '@/hooks/entity/useEntity';
import { useEntityCache } from '@/hooks/entity/useEntityCache';


import Link from 'next/link';
import React, { useEffect } from 'react'
import MedecinPhoneAnimation from '@/components/animation/Medecin_phone'
import { Alpha, Flex, TextAnimate } from '@/components/animation/TextAnimate';
import VaporizeTextCycle, { VaporizeText } from '@/components/animation/VaporizeTextUx';

export default function page() {




  return (
    <div>
        <Home/>
    </div>
  )
}
  