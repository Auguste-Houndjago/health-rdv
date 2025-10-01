"use client"
import Home from '@/components/home/Home'
import DebugPWAVercel from '@/components/notification/notif'
import { useEntity } from '@/hooks/entity/useEntity';
import { useEntityCache } from '@/hooks/entity/useEntityCache';
import { fetchTeachers } from '@/services/users/teacherActions';

import Link from 'next/link';
import React, { useEffect } from 'react'

export default function page() {

  // const { data  } = useEntityCache({
  //   entityName: "teachers",
  //   fetchFn: fetchTeachers,
  //   sort: {
  //     key: "name",
  //     order: "asc"
  //   }
  // });

  const { data:teachers  } = useEntity({
    entityName: "teachers",
    fetchFn: fetchTeachers,
    staleTime: 1000 * 60 * 5
    
  });


  return (
    <div>
      {/* <pre>
        {JSON.stringify(data, null, 2)}
      </pre> */}

      <Link href={"/test"}>
     page test
      </Link>
      <pre>
        {JSON.stringify(teachers, null, 2)}
      </pre>


      {/* <Home/> */}
      {/* <DebugPWAVercel/> */}
    </div>
  )
}
  