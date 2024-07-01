import React from 'react'


function SongCard({image, title}) {
  return (
    <div className=' p-2 h-[28vh]  rounded-2xl m-2 hover:cursor-pointer ' onClick={() => {console.log("hi mf")}}>
        <div className=' h-[18vh] w-36  rounded-2xl object-fill overflow-hidden'><img className=' h-full w-full' src={image} alt="" /></div>
        <div className=' w-36 mt-2 overflow-hidden'> <h1 className=' text-xl '>{title}</h1></div>
        
    </div>
    
  )
}

export default SongCard