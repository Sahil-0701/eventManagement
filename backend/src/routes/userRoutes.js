import express from 'express';
import {
    getUserProfile,
    getUsers,
    loginUser,
    registerUser,
    requestHostRole,
    updateUserProfile,
    
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect, authorize } = authMiddleware;

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.use(protect);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/request-host', requestHostRole);

// Admin routes
router.use(authorize('admin'));
router.get('/', getUsers);
router.put('/:id', updateUserProfile);

export { router as userRouter }; 