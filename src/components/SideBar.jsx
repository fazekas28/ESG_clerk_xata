import { UserButton, auth } from '@clerk/nextjs';
import React from 'react'
import { FaHome, FaFolder, FaSearch, FaCog } from 'react-icons/fa';


export default function SideBar() {

 const { userId } = auth();

 if (!userId) {
  return null;
 }

 return (
  <div className='bg-gray-800 h-screen w-16 fixed flex flex-col items-center justify-between pt-28'>
   <div className='flex flex-col items-center pt-8'>
    <div className=' flex w-full h-16 pb-5 items-center justify-center hover:bg-gray-700'>
     <UserButton />
    </div>

    <a href='/' className='text-white p-4 hover:bg-gray-700'>
     <FaHome size={30} />
    </a>
    <a href='#' className='text-white p-4 hover:bg-gray-700'>
     <FaFolder size={30} />
    </a>
    <a href='#' className='text-white p-4 hover:bg-gray-700'>
     <FaSearch size={30} />
    </a>
    <a href='filialinfo' className='text-white p-4 hover:bg-gray-700'>
     <FaCog size={30} />
    </a>

   </div>
  </div >
 )
}
