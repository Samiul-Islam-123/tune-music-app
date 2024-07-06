import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";

function Player({ audioSrc, onEnded, playNextSong }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        if (audio) {
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);
            audio.addEventListener('ended', handleNextSong);

            audio.play()
            togglePlayPause()

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.removeEventListener('ended', handleNextSong);
            };
        }
    }, [audioSrc]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextSong = () => {
        setIsPlaying(false);
        if (playNextSong) {
            playNextSong();
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    };

    return (
        <div className='w-full h-[12vh] flex flex-col items-center'>
            <div className='flex justify-around my-5'>
                <IoPlayBack size={30} onClick={() => audioRef.current.currentTime -= 10} />
                {isPlaying ? (
                    <FaPause onClick={togglePlayPause} size={30} />
                ) : (
                    <FaPlay onClick={togglePlayPause} size={30} />
                )}
                <IoPlayForward size={30} onClick={() => audioRef.current.currentTime += 10} />
            </div>
            <div className='flex items-center w-full'>
                <p className='mr-2 w-[60px] text-center'>{formatTime(currentTime)}</p>
                <div className='flex-grow mx-2'>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={(e) => (audioRef.current.currentTime = e.target.value)}
                        className='w-full'
                    />
                </div>
                <p className='ml-2 w-[60px] text-center'>{formatTime(duration)}</p>
            </div>
            <audio ref={audioRef} src={audioSrc} onEnded={onEnded}></audio>
        </div>
    );
}

export default Player;
