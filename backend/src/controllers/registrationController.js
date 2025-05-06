import { Registration } from '../models/registrationModels.js';
import { Event } from '../models/eventModels.js';
import User from '../models/userModels.js';

// Create a new registration
export const createRegistration = async (req, res) => {
    try {
        const { eventId, ticketType, quantity, attendees } = req.body;
        const userId = req.user._id;

        // Get event details
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Check if event is approved
        if (event.status !== 'approved') {
            return res.status(400).json({ success: false, message: 'Event is not approved for registration' });
        }

        // Check if registration deadline has passed
        if (new Date() > new Date(event.registrationDeadline)) {
            return res.status(400).json({ success: false, message: 'Registration deadline has passed' });
        }

        // Calculate total amount
        const ticketPrice = event.ticketTypes.find(t => t.name === ticketType)?.price || 0;
        const totalAmount = ticketPrice * quantity;

        // Create registration
        const registration = new Registration({
            event: eventId,
            user: userId,
            ticketType: {
                name: ticketType,
                price: ticketPrice
            },
            quantity,
            totalAmount,
            attendees,
            status: 'pending',
            paymentStatus: 'pending'
        });

        await registration.save();

        res.status(201).json({
            success: true,
            data: registration
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user's registrations
export const getUserRegistrations = async (req, res) => {
    try {
        const userId = req.user._id;
        const registrations = await Registration.find({ user: userId })
            .populate('event', 'title startDate endDate venue')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get event registrations (for hosts and admins)
export const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;
        const user = req.user;

        // Check if user has permission
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        if (user.role !== 'admin' && event.host.toString() !== user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const registrations = await Registration.find({ event: eventId })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update registration status
export const updateRegistrationStatus = async (req, res) => {
    try {
        const { registrationId } = req.params;
        const { status } = req.body;

        const registration = await Registration.findById(registrationId);
        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        // Check if user has permission
        const event = await Event.findById(registration.event);
        if (req.user.role !== 'admin' && event.host.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        registration.status = status;
        await registration.save();

        res.status(200).json({
            success: true,
            data: registration
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
    try {
        const { registrationId } = req.params;
        const { paymentStatus, paymentDetails } = req.body;

        const registration = await Registration.findById(registrationId);
        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        // Check if user has permission
        const event = await Event.findById(registration.event);
        if (req.user.role !== 'admin' && event.host.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        registration.paymentStatus = paymentStatus;
        if (paymentDetails) {
            registration.paymentDetails = paymentDetails;
        }
        await registration.save();

        res.status(200).json({
            success: true,
            data: registration
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 