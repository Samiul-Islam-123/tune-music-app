import React from 'react'
import { TbMenu2 } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { UserButton } from '@clerk/clerk-react';

function Nav({click,setClick}) {
  return (
    <header className=' z-10'>
        <nav className=' w-screen h-[7vh]  flex justify-between items-center px-8 border'>
            <div className=' w-[5vh] h-[5vh] rounded-full hover:border  flex justify-center items-center'>
              <TbMenu2 onClick={()=>{
                setClick(!click)
              }} size={20}/>
            </div>
            <div className='  w-1/4 h-[5vh] border rounded-full px-4 flex items-center'>
                <input type="text" className=' flex flex-1 focus:outline-none h-full' />
                <CiSearch size={24} className=' ml-auto '/>
            </div>
            <div className='flex items-center justify-center w-[5vh] h-[5vh] rounded-full ' style={{ width: '34px', height: '34px' }}>
              <UserButton />
            </div>
        </nav>
    </header>
  )
}

export default Nav