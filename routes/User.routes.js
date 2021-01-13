import express from "express";
const router = express.Router();
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import * as userController from "../controllers/User.controller";
import { routes } from "../utils/routeConstants";
const { authRoutes } = routes;

// registration routes
router.post(authRoutes.register, asyncMiddleware(userController.addUser));

export default router;
