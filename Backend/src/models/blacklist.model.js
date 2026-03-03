const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "The token must be provided"]
    }
}, {
    timestamps: true
});

const blacklistModel = mongoose.model("Blacklist", blacklistSchema);

module.exports = blacklistModel;