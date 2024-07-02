import React, { useState } from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import SongCard from './SongCard'
import Playheader from './Playheader'

const Main = ()=>{
  const songs = [
    { image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg", title: "Haule Haule" },
    { image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg", title: "Haule Haule" },
    // ... other songs
  ];
  const [click, setClick] = useState(true)
  return (
    <>

        <div className=' -z-10 w-[40vw] h-[40vw] fixed top-[-20vh] left-[-20vh] rounded-full bg-purple-600 filter blur-[250px]'></div>
        <div className=' -z-10 w-[60vw] h-[60vw] fixed bottom-[-30vh] right-[-50vh] rounded-full bg-fuchsia-700 filter blur-[300px]'></div>
      <Nav click={click} setClick={setClick} />
      <div className='flex flex-1'>
        <Sidebar click={click} />
        <div className='z-10 flex flex-col h-[80vh] mb-[13vh] flex-1 overflow-y-scroll custom-scrollbar'>
          <h1 className='z-10 text-3xl font-bold ml-8 m-5'>Songs</h1>
          <div className='z-10 h-24 flex flex-1 '>
            {songs.map((item, index) => (
              <SongCard key={index} image={item.image} title={item.title} />
            ))}
          </div>
          <Playheader />
        </div>
      </div>

    </>
  )
}

export default Main