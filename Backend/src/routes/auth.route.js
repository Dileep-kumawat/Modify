const { Router } = require("express");
const { registerController, loginController, getMeController, logoutController } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route /api/auth/register
 * @description Register route to register an user with it's credentials
 */
authRouter.post("/register", registerController);

/**
 * @route /api/auth/login
 * @description Login the user with his credentials
 */
authRouter.post('/login', loginController);

/**
 * @route /api/auth/logout
 * @description Logout the user with his credentials
 */
authRouter.get('/logout', authMiddleware, logoutController);

/**
 * @route /api/auth/get-me
 * @description Get details of the user logged in currently
 */
authRouter.get('/get-me', authMiddleware, getMeController);

module.exports = authRouter;