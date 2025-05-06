import express from 'express';
import {
 
    getHostStats,
    getHostEvents
} from '../controllers/hostController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect, authorize } = authMiddleware;

const router = express.Router();

// All routes require authentication and host role
router.use(protect);
router.use(authorize('host'));

// Get host dashboard statistics
router.get('/stats', getHostStats);

// Get host's events
router.get('/events', getHostEvents);

export { router as hostRouter }; 