import React from "react";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

function Playheader({ Currentsong }) {
    console.log(Currentsong);

    return (
        <>
            {Currentsong && (<>
            
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
                        <audio controls autoPlay style={{ width: "300px" }}>
                            <source src={Currentsong.SongURL} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
            {/* <div className=' h-full flex justify-between items-center w-1/6 mx-12'>
                <IoPlaySkipBack size={30}/>
                <IoPlay size={30}/>
                <IoPlaySkipForward size={30}/>
            </div> */}
            {/* <AudioPlayer
                layout='horizontal-reverse'
                src={Currentsong.SongURL}
                onPlay={e => console.log("onPlay")}
                className=''
                style={{width: "70%", height: "95%"}}
                // other props here
            /> */}
        </div>
            </>)}
        </>
    );
}

export default Playheader;
