import React from 'react'
import { OrganizationSwitcher } from '@clerk/nextjs'

export default function Header() {

 return (
  <header>
   <nav className="bg-gray-800">
    <div className="px-2 sm:px-6 lg:px-8">
     <div className="relative flex h-16 items-center justify-between">

      <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">

       <div>
        <a className='text-white font-bold lg:tracking-[0.25em] pl-16 lg:pl-10'>Pateo Hyundai ESG</a>
       </div>

      </div>
      <div className=' flex flex-row gap-5'>
       <div>
        <OrganizationSwitcher />
       </div>
      </div>

     </div>
    </div>

   </nav>

  </header>
 )
}
