import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import axios from "axios";
import { useSong } from '../contexts/SongContext';
import { useRecommendedSongs } from '../contexts/RecommendedsongsContext';

function Player() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { currentSong, setCurrentSong } = useSong();
  const { recommendedSongs, currentSongIndex, playNextSong, fetchNextRecommendations } = useRecommendedSongs();

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);

      audio.play();
      togglePlayPause();

      audio.addEventListener('ended', handleSongEnd);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleSongEnd);
      };
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongEnd = () => {
    if (currentSongIndex < recommendedSongs.length - 1) {
      playNextSong(); // Increment currentSongIndex
      const nextSong = recommendedSongs[currentSongIndex + 1].song;
      setCurrentSong(nextSong); // Update currentSong context
      audioRef.current.src = nextSong.SongURL; // Set audio source to next song
      audioRef.current.play(); // Start playing the next song
      setIsPlaying(true); // Set playing state to true
    } else {
      fetchNextRecommendations(currentSong._id); // Fetch next recommendations
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
      <audio ref={audioRef} src={currentSong ? currentSong.SongURL : ''}></audio>
    </div>
  );
}

export default Player;
