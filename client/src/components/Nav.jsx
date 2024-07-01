import React from 'react'
import { TbMenu2 } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";

function Nav() {
  return (
    <header>
        <nav className=' w-screen h-[7vh] border flex justify-between items-center px-8'>
            <div className=' w-[5vh] h-[5vh] rounded-full hover:border  flex justify-center items-center'><TbMenu2 size={20}/></div>
            <div className='  w-1/4 h-[5vh] border rounded-full px-4 flex items-center'>
                <input type="text" className=' flex flex-1 focus:outline-none h-full' />
                <CiSearch size={24} className=' ml-auto '/>
            </div>
            <div className=' w-[5vh] h-[5vh] rounded-full border'></div>
        </nav>
    </header>
  )
}

export default Nav