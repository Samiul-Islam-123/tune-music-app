import React from 'react'


function SongCard({image, title, setCurrentSong, Song}) {
  return (
    <div className='overflow-hidden z-10 p-2 h-[30vh]  rounded-2xl m-2 hover:cursor-pointer ' onClick={() => {
      //console.log(Song);
      setCurrentSong(Song)
    }}>
        <div className=' h-[15vh] w-56  rounded-2xl object-fill overflow-hidden'><img src={image} alt="" /></div>
        <div className=' w-56 mt-2 overflow-hidden'> <h1 className=' text-xl '>{title}</h1></div>
        
    </div>
    
  )
}

export default SongCard