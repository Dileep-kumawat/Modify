const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username must be provided"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: [true, "email must be provided"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required: [true, "password must be provided"],
        select: false
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;