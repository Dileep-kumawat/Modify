const express = require("express");
const { uploadController } = require("../controllers/song.controller");
const upload = require("../middlewares/multer.middleware");

const songRoute = express.Router();

/**
 * @route /api/song/upload
 */
songRoute.post("/upload", upload.single('song'), uploadController);

module.exports = songRoute;