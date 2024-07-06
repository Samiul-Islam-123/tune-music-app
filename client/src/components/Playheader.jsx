import React from "react";
import { useSong } from "../contexts/SongContext";
import Player from "./Player";

function Playheader({ Currentsong, playNextSong }) {
    const { currentSong, setCurrentSong } = useSong();

    return (
        <>
            {Currentsong && (
                <div className="z-10 fixed bottom-0 w-full h-[13vh] border flex items-center justify-center px-5 bg-gray-900">
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
                        <h3 className="text-lg font-bold text-white">{Currentsong.SongTitle}</h3>
                        <a href={Currentsong.SongURL} className="text-sm text-blue-500" target="_blank" rel="noopener noreferrer">
                            Listen to the song
                        </a>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <Player audioSrc={Currentsong.SongURL} playNextSong={playNextSong} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Playheader;
