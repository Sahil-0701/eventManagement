import express from 'express';
import {
    register,
    login,
    logout,
    getMe
} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect } = authMiddleware;

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.use(protect);
router.get('/me', getMe);
router.post('/logout', logout);

export { router as authRouter }; 