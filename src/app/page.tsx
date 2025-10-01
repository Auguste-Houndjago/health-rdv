"use client"
import Home from '@/components/home/Home'
import DebugPWAVercel from '@/components/notification/notif'
import { useEntity } from '@/hooks/entity/useEntity';
import { useEntityCache } from '@/hooks/entity/useEntityCache';


import Link from 'next/link';
import React, { useEffect } from 'react'

export default function page() {




  return (
    <div>
      {/* <pre>
        {JSON.stringify(data, null, 2)}
      </pre> */}

      <Link href={"/test"}>
     page test
      </Link>



      {/* <Home/> */}
      {/* <DebugPWAVercel/> */}
    </div>
  )
}
  