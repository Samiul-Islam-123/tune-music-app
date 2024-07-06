import React, { useEffect, useRef } from "react";
import { useSong } from "../contexts/SongContext";

function Playheader({ Currentsong, playNextSong }) {

    const {currentSong, setCurrentSong} = useSong()

    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [Currentsong]);

    return (
        <>
            {Currentsong && (
                <div className="z-10 fixed bottom-0 w-full h-[13vh] border flex flex-1 items-center px-5">
                    <div className="w-[9vh] h-[9vh] rounded-xl border mr-[3.5vw]">
                        {Currentsong.thumnailURL && (
                            <img
                                src={Currentsong.thumnailURL}
                                alt="Song Thumbnail"
                                className="w-full h-full rounded-xl object-cover"
                            />
                        )}
                    </div>
                    <div className="flex flex-col mr-auto">
                        <h3 className="text-lg font-bold">{Currentsong.SongTitle}</h3>
                        <a href={Currentsong.SongURL} className="text-sm text-blue-500" target="_blank" rel="noopener noreferrer">
                            Listen to the song
                        </a>
                    </div>
                    <div className='flex items-center'>
                        <audio
                            ref={audioRef}
                            controls
                            style={{ width: "300px" }}
                            onEnded={playNextSong}
                        >
                            <source src={Currentsong.SongURL} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            )}
        </>
    );
}

export default Playheader;
