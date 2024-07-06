import React from 'react'
import { useSong } from '../contexts/SongContext';

function SearchSongCard({image, title, Song}) {

  const {setCurrentSong} = useSong();

  return (
    <div className='overflow-hidden z-10 p-2 h-[8vh]  flex  rounded-2xl m-2 hover:cursor-pointer ' onClick={() => {
      console.log(Song);
      setCurrentSong(Song)
    }}>
        <div className=' h-[8vh] w-[7vw]  rounded-2xl object-fill overflow-hidden'><img src={image} alt="" /></div>
        <div className=' max-w-40 h-[8vh]  mt-2 ml-4 overflow-hidden'> <h1 className=' text-xl '>{title}</h1></div>
        
    </div>
    
  )
}

export default SearchSongCard