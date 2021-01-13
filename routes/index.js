import express from 'express'
import userRoutes from './User.routes'
const router = express.Router();

// Auth Routes
router.use('/auth', userRoutes)

export default router;