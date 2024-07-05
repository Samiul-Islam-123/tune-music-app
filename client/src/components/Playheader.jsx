import React, { useEffect, useRef } from "react";
import { useSong } from "../contexts/SongContext";
import Player from "./Player";

function Playheader({ playNextSong }) {

    const {currentSong, setCurrentSong} = useSong();

    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [currentSong]);

    return (
        <>
            {currentSong && (
                <div className="z-10 fixed bottom-0 w-full border-t-white/30 border-t h-[13vh] bg-zinc-900 bg-opacity-40 rounded-lg flex flex-1 items-center px-5">
                    <div className="w-[9vh] h-[9vh] rounded-xl border mr-[3.5vw]">
                        {currentSong.thumnailURL && (
                            <img
                                src={currentSong.thumnailURL}
                                alt="Song Thumbnail"
                                className="w-full h-full rounded-xl object-cover"
                            />
                        )}
                    </div>
                    <div className="flex flex-col ">
                        <h3 className="text-lg font-bold">{currentSong.SongTitle}</h3>
                        <a href={currentSong.SongURL} className="text-sm text-blue-500" target="_blank" rel="noopener noreferrer">
                            Listen to the song
                        </a>
                    </div>
                    <div className='flex items-center'>
                        <Player />
                        <audio
                            ref={audioRef}
                            controls
                            style={{ width: "300px" }}
                            onEnded={playNextSong}
                        >
                            <source src={currentSong.SongURL} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            )}
        </>
    );
}

export default Playheader;
