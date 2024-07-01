import React from 'react'
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";


function Playheader() {
  return (
    <div className=' fixed bottom-0 w-full h-[11vh] border flex flex-1  items-center px-5'>
        <div className=' w-[9vh] h-[9vh] rounded-xl border'></div>
        {/* <div className=' h-full flex justify-between items-center w-1/6 mx-12'>
            <IoPlaySkipBack size={30}/>
            <IoPlay size={30}/>
            <IoPlaySkipForward size={30}/>
        </div> */}
        <audio play controls src="https://res.cloudinary.com/duwx8enno/video/upload/v1719820534/uploads/ptlxe5y0zeddwyuad5ej.mp3"></audio>
    </div>
  )
}

export default Playheader