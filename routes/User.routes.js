import express from "express";
const router = express.Router();
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import * as userController from "../controllers/User.controller";
import { routes } from "../utils/routeConstants";
const { authRoutes } = routes;

router.post(authRoutes.register, asyncMiddleware(userController.registerUser));
router.post(authRoutes.login, asyncMiddleware(userController.loginUser));
router.post(authRoutes.verifyEmail, asyncMiddleware(userController.verifyEmail));
router.post(authRoutes.verifyContact, asyncMiddleware(userController.verifyContact))

export default router;
