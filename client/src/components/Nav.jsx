import React, { useEffect, useState } from 'react'
import { TbMenu2 } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { UserButton } from '@clerk/clerk-react';
import axios from "axios"

function Nav({click,setClick}) {

  const [searchQuery, setSearchQeury] = useState("");
  const [SearchResults, setSearchResults] = useState(null);

  async function SearchSongs() { 
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/song/search?SearchQuery=${searchQuery}`);
    if(response.data.success === true)
    {
      //console.log(response.data)
      setSearchResults(response.data.SearchedSongs);
    }

    else{
      alert(response.data.messaage)
    }
  }

  useEffect(() => {
    if(searchQuery!="")
    SearchSongs();
  },[searchQuery])

  return (
    <>
    <header className=' z-10'>
        <nav className=' w-screen h-[7vh]  flex justify-between items-center px-8 border'>
            <div className=' w-[5vh] h-[5vh] rounded-full hover:border  flex justify-center items-center'>
              <TbMenu2 onClick={()=>{
                setClick(!click)
              }} size={20}/>
            </div>
            <div className='  w-1/4 h-[5vh] border rounded-full px-4 flex items-center'>
                <input type="text" onChange={e => {
                  if(e.target.value === "")
                    setSearchQeury("");
                  
                  else
                  setSearchQeury(e.target.value);
              }} className=' flex flex-1 focus:outline-none h-full' />
                <CiSearch size={24} className=' ml-auto '/>
            </div>
            <div className='flex items-center justify-center w-[5vh] h-[5vh] rounded-full ' style={{ width: '34px', height: '34px' }}>
              <UserButton />
            </div>
        </nav>
    </header>
              {SearchResults && (<>
                {
                SearchResults.map(item => {
                  console.log(item)
                  return (<>
                  <div>
                    <h3>
                     {item.SongTitle}
                    </h3>
                    <img src={item.thumnailURL} width={"150px"} height={"150px"}></img>
                    Ekhane ektu Mushi Mushi Korte hobe tomake :)
                  </div>
                  </>)
                })
              }
              </>)}
              

              </>
  )
}

export default Nav