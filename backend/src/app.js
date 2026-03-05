const express = require("express");
const songRoute = require("./routes/song.route");

const app = express();

app.use(express.json());

/**
 * @route /api/song
 * @description All apis related to bussiness logic of song
 */
app.use('/api/song', songRoute);

module.exports = app;