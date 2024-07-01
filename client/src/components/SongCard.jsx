import React from 'react'


function SongCard({image, title}) {
  return (
    <div className=' p-2 h-[28vh] border rounded-2xl m-2'>
        <div className=' h-[18vh] w-36 border rounded-2xl object-fill overflow-hidden'><img className=' h-full w-full' src={image} alt="" /></div>
        <div className=' w-36 mt-2 overflow-hidden'> <h1 className=' text-xl '>{title}</h1></div>
        
    </div>
    
  )
}

export default SongCard