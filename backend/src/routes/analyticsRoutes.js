import express from 'express';
import {
    getAdminInsights,
    getHostInsights,
    getEventAnalytics
} from '../controllers/analyticsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect, authorize } = authMiddleware;

const router = express.Router();

// All routes are protected
router.use(protect);

// Admin routes
router.get('/admin', authorize('admin'), getAdminInsights);

// Host routes
router.get('/host', authorize('host'), getHostInsights);
router.get('/event/:id', authorize('host'), getEventAnalytics);

export { router as analyticsRouter }; 