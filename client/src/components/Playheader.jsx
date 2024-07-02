import React from "react";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';


function Playheader() {
    

    return (
        <div className=" z-10 fixed bottom-0 w-full h-[13vh] border flex flex-1 items-center px-5">
            <div className=" w-[9vh] h-[9vh] rounded-xl border mr-[3.5vw]"></div>
            {/* <div className=' h-full flex justify-between items-center w-1/6 mx-12'>
            <IoPlaySkipBack size={30}/>
            <IoPlay size={30}/>
            <IoPlaySkipForward size={30}/>
        </div> */}
            {/* <AudioPlayer
        layout='horizontal-reverse'
        src="https://res.cloudinary.com/duwx8enno/video/upload/v1719827837/uploads/c9bvyyalh0ixkhro0qkn.mp3"
        onPlay={e => console.log("onPlay")}
        className=''
        style={{width: "70%", height: "95%"}}
      // other props here
      /> */}

           
        </div>
    );
}

export default Playheader;
