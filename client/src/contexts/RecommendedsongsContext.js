import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useSong } from './SongContext'; // Assuming this is the path to your SongContext

const RecommendedSongsContext = createContext();

export const RecommendedSongsProvider = ({ children }) => {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const { setCurrentSong } = useSong(); // Using useSong hook from SongContext

  const playNextSong = () => {
    setCurrentSongIndex(prevIndex => prevIndex + 1);
  };

  const fetchNextRecommendations = async (currentSongID) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/song/getRecommendation`, {
        targetSongID: currentSongID
      });

      console.log(response)

      if (!response.data.success) {
        throw new Error('Failed to fetch recommended songs');
      }

      const recommendedSongs = response.data.recommended;
      setRecommendedSongs(recommendedSongs);
      setCurrentSongIndex(0); // Reset current song index to play from the beginning

      // Set the first recommended song as the current song
      setCurrentSong(recommendedSongs[0].song);

    } catch (error) {
      console.error('Error fetching recommended songs:', error);
      // Handle error appropriately
    }
  };

  return (
    <RecommendedSongsContext.Provider
      value={{
        recommendedSongs,
        currentSongIndex,
        playNextSong,
        fetchNextRecommendations
      }}
    >
      {children}
    </RecommendedSongsContext.Provider>
  );
};

export const useRecommendedSongs = () => useContext(RecommendedSongsContext);
