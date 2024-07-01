const { uploadSingleSong, uploadMultipleSongs } = require("../controllers/DeveloperController");
const upload = require("../services/FileUpload");

const DeveloperRouter = require("express").Router();

DeveloperRouter.post("/upload-single", upload.fields([
    { name: "song", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
]), uploadSingleSong);

DeveloperRouter.post("/upload-multiple", upload.fields([
    { name: "songs", maxCount: 10 },
    { name: "thumbnails", maxCount: 10 }
]), uploadMultipleSongs);

module.exports = DeveloperRouter;
