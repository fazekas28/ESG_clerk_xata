import React from 'react';
import { OrganizationSwitcher } from '@clerk/nextjs';

export default function Header() {
 return (
  <header>
   <nav className="bg-gray-800">
    <div className="sm:px-6 lg:px-8">
     <div className="relative flex h-10 sm:h-14 items-center justify-between">

      <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">

       <div className=''>
        <a className='text-white font-bold lg:tracking-[0.25em] pl-10 lg:pl-10'>Pateo Hyundai ESG</a>
       </div>

      </div>

      <div className='flex flex-row gap-5'>
       <div>
        <OrganizationSwitcher />
       </div>
      </div>

     </div>
    </div>

   </nav>
  </header>
 );
}
