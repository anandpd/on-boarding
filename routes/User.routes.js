import express from "express";
const router = express.Router();
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import * as userController from "../controllers/User.controller";
import { verifyToken } from '../middlewares/authMiddleware'
import { routes } from "../utils/routeConstants";
const { authRoutes } = routes;

router.post(authRoutes.register, asyncMiddleware(userController.registerUser));
router.post(authRoutes.login, asyncMiddleware(userController.loginUser));
router.post(authRoutes.remove, verifyToken, asyncMiddleware(userController.removeUser))
router.post(authRoutes.verifyEmail, asyncMiddleware(userController.verifyEmail));
router.post(authRoutes.sendotp, asyncMiddleware(userController.sendOTPtoContact))
router.post(authRoutes.verifyotp, asyncMiddleware(userController.verifyOtp))

export default router;
