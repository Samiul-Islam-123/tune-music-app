const SpotifyWebApi = require('spotify-web-api-node');
require("dotenv").config();

// Initialize Spotify API instance
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Function to authorize Spotify API requests
async function authorizeSpotifyApi() {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        const accessToken = data.body['access_token'];
        spotifyApi.setAccessToken(accessToken);
        console.log('Spotify API Authorized');
        return true;
    } catch (error) {
        console.error('Error authorizing Spotify API:', error);
        return false;
    }
}

// Function to fetch detailed track information including audio features
// Function to fetch detailed track information including additional metadata
async function getTrackDetails(trackName) {
    try {
        await authorizeSpotifyApi(); // Authorize Spotify API first
        const searchResult = await spotifyApi.searchTracks(trackName);
        const track = searchResult.body.tracks.items[0]; // Assuming the first track in search results

        if (!track) {
            console.log('Track not found.');
            return null;
        }

        // Fetch more detailed track information including audio features
        const detailedTrackInfo = await spotifyApi.getAudioFeaturesForTrack(track.id);
        const artistInfo = await spotifyApi.getArtist(track.artists[0].id); // Get artist details for the first artist

        if (detailedTrackInfo && detailedTrackInfo.body && artistInfo && artistInfo.body) {
            // Extract audio features
            const { tempo, danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, duration_ms } = detailedTrackInfo.body;

            // Extract additional metadata
            const genres = artistInfo.body.genres;
            const popularity = track.popularity;
            const releaseDate = track.album.release_date;
            const explicit = track.explicit;
            const album = {
                name: track.album.name,
                release_date: track.album.release_date,
                cover_image: track.album.images.length > 0 ? track.album.images[0].url : null
            };

            // Return track details with all metadata
            return {
                name: track.name,
                artists: track.artists.map(artist => artist.name),
                audioFeatures: {
                    tempo,
                    danceability,
                    energy,
                    key,
                    loudness,
                    mode,
                    speechiness,
                    acousticness,
                    instrumentalness,
                    liveness,
                    valence,
                    duration_ms
                },
                genres,
                popularity,
                releaseDate,
                explicit,
                album
            };
        } else {
            console.log('Detailed track information not available.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching track details:', error);
        return null;
    }
}


module.exports = {
    getTrackDetails,
};
