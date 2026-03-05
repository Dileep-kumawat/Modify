const express = require("express");
const songRoute = require("./routes/song.route");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_ENDPOINT,
    credentials: true
}));

app.use(express.static('../public'));

/**
 * @route /api/song
 * @description All apis related to bussiness logic of song
 */
app.use('/api/song', songRoute);

module.exports = app;