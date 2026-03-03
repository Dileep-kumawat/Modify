const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const cache = require("../config/cache");

async function authMiddleware(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(404).json({
            "msg": "Token not found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // const isBlacklistToken = await blacklistModel.findOne({ token });

        const isBlacklistToken = await cache.get(token);

        if (isBlacklistToken) {
            return res.status(401).json({
                "msg": "Blacklisted Token | Unauthorized"
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(400).json({
            "msg": "token verification fails!"
        });
    }
}

module.exports = {
    authMiddleware
}