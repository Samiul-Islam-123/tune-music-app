import React, { useEffect, useState, useRef, useCallback } from 'react';
import SongCard from '../components/SongCard';
import Playheader from '../components/Playheader';
import axios from 'axios';
import { useSong } from '../contexts/SongContext';

function Home() {
    const [Songs, setSongs] = useState([]);
    const {currentSong, setCurrentSong} = useSong();
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const limit = 30; // Define the limit here for consistency

    const fetchFeedSongs = useCallback(async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/song/?limit=${limit}&offset=${offset}`);
        if (response.data.success) {
            setSongs(prevSongs => [...prevSongs, ...response.data.songs]);
            if (response.data.songs.length < limit) {
                setHasMore(false); // No more songs to load
            }
        } else {
            alert(response.data.message);
        }
    }, [offset]);

    useEffect(() => {
        fetchFeedSongs();
    }, [offset, fetchFeedSongs]);

    const observer = useRef();
    const lastSongElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                //alert('You have reached the bottom!');
                setOffset(prevOffset => prevOffset + limit);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    const playNextSong = () => {
        setCurrentSong(prev => {
            const currentIndex = Songs.findIndex(song => song.SongURL === prev.SongURL);
            const nextIndex = (currentIndex + 1) % Songs.length;
            return Songs[nextIndex];
        });
    };

    return (
        <>
            <div className='z-10 flex flex-col h-[80vh] mb-[13vh] flex-1 custom-scrollbar'>
                <h1 className='z-10 text-3xl overflow-hidden font-bold ml-8 m-5'>Songs</h1>
                <div className='z-10 h-24 flex flex-1 flex-wrap custom-scrollbar ml-12'>
                    {Songs && Songs.map((item, index) => {
                        if (Songs.length === index + 1) {
                            return (
                                <div ref={lastSongElementRef} key={index}>
                                    <SongCard Song={item} image={item.thumnailURL} title={item.SongTitle}  />
                                </div>
                            );
                        } else {
                            return (
                                <SongCard Song={item} key={index} image={item.thumnailURL} title={item.SongTitle}  />
                            );
                        }
                    })}
                </div>
                <Playheader Currentsong={currentSong} playNextSong={playNextSong} />
            </div>
        </>
    );
}

export default Home;
