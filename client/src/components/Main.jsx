import React, { useState } from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import SongCard from './SongCard'
import Playheader from './Playheader'
import Home from '../Pages/Home'

const Main = () => {
  const songs = [
    { image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg", title: "Haule Haule" },
    { image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg", title: "Haule Haule" },
    // ... other songs
  ];
  const [click, setClick] = useState(true)
  return (
    <>

      <div className=' -z-10 w-[40vw] h-[40vw] fixed top-[-20vh] left-[-20vh] rounded-full bg-purple-600 filter blur-[250px]'></div>
      <div className=' opacity-80 -z-10 w-[60vw] h-[60vw] fixed bottom-[-30vh] right-[-50vh] rounded-full bg-fuchsia-700 filter blur-[300px]'></div>
      <Nav click={click} setClick={setClick} />
      <div className='flex flex-1'>
        <Sidebar click={click} />
        <Home />
      </div>

    </>
  )
}

export default Main