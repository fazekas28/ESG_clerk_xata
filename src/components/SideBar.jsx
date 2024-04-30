import { UserButton, auth } from '@clerk/nextjs';
import React from 'react';
import { FaHome, FaFolder, FaSearch, FaCog, FaPaperPlane, FaChartLine } from 'react-icons/fa';

export default function SideBar() {
 const { userId } = auth();

 if (!userId) {
  return null;
 }

 return (
  <div className='bg-gray-800 h-full w-10 fixed top-0 left-0 flex flex-col items-center justify-between pt-20 sm:w-14'>
   <div className='flex flex-col items-center pt-8 gap-2'>
    <div className=' flex w-full h-12 items-center justify-center hover:bg-gray-700'>
     <UserButton afterSignOutUrl='/' />
    </div>

    <a href='/' className='text-white p-2 hover:bg-gray-700'>
     <FaHome size={20} />
    </a>
    <a href='/sendmtrinfo' className='text-white p-2 hover:bg-gray-700'>
     <FaPaperPlane size={20} />
    </a>
    <a href='/dashboard' className='text-white p-2 hover:bg-gray-700'>
     <FaChartLine size={20} />
    </a>
    <a href='/search' className='text-white p-2 hover:bg-gray-700'>
     <FaSearch size={20} />
    </a>
    <a href='/filialinfo' className='text-white p-2 hover:bg-gray-700'>
     <FaCog size={20} />
    </a>
   </div>
  </div>
 );
}
