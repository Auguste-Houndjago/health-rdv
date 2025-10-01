"use client"

import { BasicUserList } from '@/components/test/entity/userExamples';
import { FilteredUserList, SearchableUserList } from '@/hooks/entity/_test/exemples';
import { useEntity } from '@/hooks/entity/useEntity';
import { useEntityCache } from '@/hooks/entity/useEntityCache';
import Exemple from '@/hooks/entityCrud/usageExemple';
import { fetchTeachers } from '@/services/users/teacherActions';
import Link from 'next/link';

import React, { useEffect } from 'react'

export default function page() {



  return (
    <div className='p-80 flex flex-col gap-20 border-4 bg-accent/20'>

      <h1>page test</h1>
      <Link href={"/"}>
     page home
      </Link>
      {/* <pre>
        {JSON.stringify(teachers, null, 2)}
      </pre> */}
<Exemple/>
<BasicUserList/>

<FilteredUserList/>

<SearchableUserList/>
    </div>
  )
}
