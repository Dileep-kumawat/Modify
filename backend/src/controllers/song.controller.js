const { uploadFile } = require("../middlewares/songUpload.middleware");
const songModel = require("../models/song.model");
const NodeID3 = require('node-id3');

async function uploadController(req, res) {
    const { mood } = req.query;
    const songBuffer = req.file.buffer;
    const tags = NodeID3.read(songBuffer);

    const songTitle = tags.title;
    const artist = tags.artist;
    const imageBuffer = tags.image.imageBuffer;

    // const imageKitSong = await uploadFile({ buffer: songBuffer, fileName: songTitle + ".mp3" })
    // const imageKitPoster = await uploadFile({ buffer: imageBuffer, fileName: songTitle + ".jpeg" })

    // optimization of song and poster uploads
    const [imageKitSong, imageKitPoster] = await Promise.all([
        uploadFile({ buffer: songBuffer, fileName: songTitle + ".mp3" }),
        uploadFile({ buffer: imageBuffer, fileName: songTitle + ".jpeg" })
    ])

    const song = await songModel.create({
        songUrl: imageKitSong.url,
        posterUrl: imageKitPoster.url,
        title: songTitle,
        artist,
        mood
    });

    res.status(201).json({
        msg: "Song uploaded successfully",
        song
    });
}

async function getSongsController(req, res) {
    const { mood } = req.query;

    // const songs = await songModel.find({ mood });

    const count = await songModel.estimatedDocumentCount();
    const random = Math.floor(Math.random() * count);
    const song = await songModel.findOne({ mood }).skip(random).limit(1);

    res.status(200).json({
        song
    });
}

module.exports = {
    uploadController,
    getSongsController
}