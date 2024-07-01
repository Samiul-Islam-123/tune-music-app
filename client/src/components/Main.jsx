import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import SongCard from './SongCard'
import Playheader from './Playheader'

const Main = ()=>{
  return (
    <>
        <Nav />
        <div className=' flex flex-1'>
            <Sidebar />
            <div className='relative flex flex-col h-8 flex-1 '>
              <h1 className=' text-3xl font-bold ml-8 m-5'>Songs</h1>
              <div className='relative flex flex-1  flex-wrap'>
              {
                [{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                },{
                  image: "https://i1.sndcdn.com/artworks-0WovZIV3mGnvybu3-LeSzUA-t500x500.jpg",
                  title: "Haule Haule"
                }].map((item) => (
                    <SongCard image={item.image} title={item.title}/>
                )
                )
                
              }
                  
              <Playheader /> 
            </div>
            </div>
             
        </div>
    </>
  )
}

export default Main