import express from 'express';
import {
    bookTickets,
    getUserTickets,
    getTicket,
    cancelTicket,
    getEventTickets,
    updatePaymentStatus
} from '../controllers/ticketController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect, authorize } = authMiddleware;

const router = express.Router();

// Protected routes
router.use(protect);
router.post('/', bookTickets);
router.get('/user', getUserTickets);
router.get('/:id', getTicket);
router.put('/:id/cancel', cancelTicket);
router.get('/event/:eventId', getEventTickets);
router.put('/:id/payment', updatePaymentStatus);

export default router; 