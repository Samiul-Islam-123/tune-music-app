const { getAllSongs } = require('../controllers/SongsController');

const SongsRouter = require('express').Router();

SongsRouter.get('/', getAllSongs);

module.exports = SongsRouter;