const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const cache = require("../config/cache");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
    try {
        let { username, email, password } = req.body;

        email = email.toLowerCase().trim();

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({ msg: "Account already exists" });
        }

        const hash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS) || 10
        );

        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        });

        res.cookie("token", token);

        return res.status(201).json({
            msg: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

async function loginController(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        }).select("+password");

        if (!user) {
            return res.status(404).json({
                "msg": "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                "msg": "Wrong credentials"
            });
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        });

        res.cookie("token", token);

        res.status(200).json({
            "msg": "User login successfull",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

async function logoutController(req, res) {
    const token = req.cookies?.token;

    res.clearCookie("token");

    // await blacklistModel.create({
    //     token
    // });

    await cache.set(token, Date.now().toString(), "EX", 60 * 60);

    res.status(200).json({
        "msg": "Logout successful"
    });
}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        "msg": "User fetched successfully",
        user
    });
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}