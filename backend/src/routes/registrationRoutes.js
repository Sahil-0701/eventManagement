import express from 'express';
import {
    createRegistration,
    getUserRegistrations,
    getEventRegistrations,
    updateRegistrationStatus,
    updatePaymentStatus
} from '../controllers/registrationController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect, authorize } = authMiddleware;

const router = express.Router();

// Protected routes
router.use(protect);
router.post('/', createRegistration);
router.get('/my-registrations', getUserRegistrations);
router.get('/event/:eventId', getEventRegistrations);
router.put('/:id/status', updateRegistrationStatus);
router.put('/:id/payment', updatePaymentStatus);

export { router as registrationRouter }; 