import React, { useState } from 'react'
import { FaPlay,FaPause  } from "react-icons/fa6";
import { IoPlayBack, IoPlayForward  } from "react-icons/io5";

function Player() {
    const [play, setPlay] = useState(true)
    const clickHandler = () => {
        setPlay(!play)
    }
  return (
    <div className=' ml-16  w-[40vw] h-[12vh] flex flex-col '>

        <div className=' flex w- 1/3 justify-around px-[170px] my-5'>
            <IoPlayBack size={30}/>
            {
                !play && <FaPlay onClick={()=> clickHandler()} size={30}/>
            }
            {
                play && <FaPause onClick={()=> clickHandler()} size={30}/>
            }
            <IoPlayForward size={30}/>
        </div>

        <div className=' flex flex-1 '>
            <p className=' mr-2'>1:23</p>
            <hr className=' w-[90%] border'/>
            <p className=' ml-2'>3:00</p>
        </div>

    </div>
  )
}

export default Player