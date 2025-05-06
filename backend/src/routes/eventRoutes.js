import express from 'express';
import {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getHostEvents,
    submitEvent,
    approveEvent,
    getEventStats
} from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect, authorize } = authMiddleware;

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEvent);

// Protected routes
router.use(protect);
router.get('/host/me', getHostEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.put('/:id/submit', submitEvent);
router.get('/:id/stats', getEventStats);

// Admin routes
router.use(authorize('admin'));
router.put('/:id/approve', approveEvent);

export { router as eventRouter }; 