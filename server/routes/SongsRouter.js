const { getAllSongs, getSongById, updateSong, deleteSong, streamSong, SearchSong } = require('../controllers/SongsController');

const SongsRouter = require('express').Router();

SongsRouter.get('/', getAllSongs);
SongsRouter.get("/:id", getSongById );
SongsRouter.put("/:id", updateSong);
SongsRouter.delete("/:id", deleteSong);
SongsRouter.get("/stream/:id", streamSong);
SongsRouter.post("/search", SearchSong)

module.exports = SongsRouter;