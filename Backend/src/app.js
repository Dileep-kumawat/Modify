const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : process.env.FRONTEND_ENDPOINT,
    credentials : true
}));

// Auth Routes
app.use("/api/auth", authRouter);

module.exports = app;