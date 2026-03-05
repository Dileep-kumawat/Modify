const express = require("express");
const { uploadController, getSongsController } = require("../controllers/song.controller");
const upload = require("../middlewares/multer.middleware");

const songRoute = express.Router();

/**
 * @route /api/song/upload?mood
 * @description upload an song to database
 */
songRoute.post("/upload", upload.single('song'), uploadController);

/**
 * @route /api/song/?mood
 * @description fetch the songs according to the mood
 */
songRoute.get("/", getSongsController);

module.exports = songRoute;