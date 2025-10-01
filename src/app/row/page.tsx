import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-8'>
        <Link href={'/'}>
          Home
        </Link>

    </div>
  )
}
