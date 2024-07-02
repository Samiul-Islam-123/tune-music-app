import React, { useEffect, useState } from 'react'
import SongCard from '../components/SongCard'
import Playheader from '../components/Playheader';
import axios from 'axios';

function Home() {

    const [Songs, setSongs] = useState();
    const [Currentsong, setCurrentSong] = useState();

    async function fetchFeedSongs() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/song/?limit=20`);
        if (response.data.success === true) {
            setSongs(response.data.songs);
        }

        else {
            alert(response.data.message)
        }
    }

    useEffect(() => {
        fetchFeedSongs()
    }, [])

    return (
        <>
            <div className='z-10 flex flex-col h-[80vh] mb-[13vh] flex-1 custom-scrollbar'>
                <h1 className='z-10 text-3xl overflow-hidden font-bold ml-8 m-5'>Songs</h1>
                <div className='z-10 h-24 flex flex-1 flex-wrap custom-scrollbar ml-12'>
                    {Songs && (<>
                        {Songs.map((item, index) => (
                            <>
                                
                                <SongCard Song = {item} key={index} image={item.thumnailURL} title={item.SongTitle} setCurrentSong = {setCurrentSong}/>
                            </>
                        ))}
                    </>)}

                </div>
                <Playheader Currentsong = {Currentsong}/>
            </div>
        </>
    )
}

export default Home