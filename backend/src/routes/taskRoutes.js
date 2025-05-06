import express from 'express';
import {
    createTask,
    getEventTasks,
    getTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getAssignedTasks
} from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect, authorize } = authMiddleware;

const router = express.Router();

// Protected routes
router.use(protect);
router.post('/', authorize('host', 'admin'), createTask);
router.get('/event/:eventId', getEventTasks);
router.get('/:id', getTask);
router.put('/:id', authorize('host', 'admin'), updateTask);
router.delete('/:id', authorize('host', 'admin'), deleteTask);
router.put('/:id/status', updateTaskStatus);
router.get('/assigned/me', getAssignedTasks);

export { router as taskRouter }; 