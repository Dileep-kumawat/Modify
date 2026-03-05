const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songUrl: {
        type: String,
        required: [true, "The song must be provided!"]
    },
    posterUrl: {
        type: String,
        required: [true, "The poster must be provided!"]
    },
    title: {
        type: String,
        required: [true, "The title must be provided"]
    },
    artist: {
        type: String,
        required: [true, "The author must be provided"]
    },
    mood: {
        type: String,
        required: [true, "The mood must be provided"],
        enum: {
            values: ['happy', 'sad', 'angry', 'suprised'],
            message: "The value must be one of the enum"
        }
    }
});

const songModel = mongoose.model('Song', songSchema);

module.exports = songModel;