import { Ticket } from '../models/ticketModels.js';
import { Event } from '../models/eventModels.js';

// @desc    Book tickets for an event
// @route   POST /api/tickets
// @access  Private
export const bookTickets = async (req, res) => {
    try {
        const { eventId, ticketType, quantity, attendees } = req.body;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (event.status !== 'approved') {
            return res.status(400).json({
                success: false,
                message: 'Event is not available for booking'
            });
        }

        const selectedTicketType = event.ticketTypes.find(
            type => type.name === ticketType
        );

        if (!selectedTicketType) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ticket type'
            });
        }

        if (selectedTicketType.available < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough tickets available'
            });
        }

        const ticket = await Ticket.create({
            event: eventId,
            user: req.user._id,
            ticketType: {
                name: selectedTicketType.name,
                price: selectedTicketType.price
            },
            quantity,
            totalPrice: selectedTicketType.price * quantity,
            attendees,
            status: 'pending',
            paymentStatus: 'pending'
        });

        selectedTicketType.available -= quantity;
        await event.save();

        res.status(201).json({
            success: true,
            data: ticket
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user's tickets
// @route   GET /api/tickets/user
// @access  Private
export const getUserTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user._id })
            .populate('event', 'title startDate endDate venue')
            .sort({ bookingDate: -1 });

        res.json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
export const getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate('event', 'title startDate endDate venue')
            .populate('user', 'username email');

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        const event = await Event.findById(ticket.event);
        if (ticket.user.toString() !== req.user._id.toString() && 
            event.host.toString() !== req.user._id.toString() && 
            req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this ticket'
            });
        }

        res.json({
            success: true,
            data: ticket
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Cancel ticket
// @route   PUT /api/tickets/:id/cancel
// @access  Private
export const cancelTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        if (ticket.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this ticket'
            });
        }

        if (ticket.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Ticket is already cancelled'
            });
        }

        const event = await Event.findById(ticket.event);

        const ticketType = event.ticketTypes.find(
            type => type.name === ticket.ticketType.name
        );
        if (ticketType) {
            ticketType.available += ticket.quantity;
            await event.save();
        }

        ticket.status = 'cancelled';
        await ticket.save();

        res.json({
            success: true,
            message: 'Ticket cancelled successfully',
            data: ticket
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get event tickets (Host only)
// @route   GET /api/tickets/event/:eventId
// @access  Private/Host
export const getEventTickets = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (event.host.toString() !== req.user._id.toString() && 
            req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view these tickets'
            });
        }

        const tickets = await Ticket.find({ event: event._id })
            .populate('user', 'username email')
            .sort({ bookingDate: -1 });

        res.json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update ticket payment status
// @route   PUT /api/tickets/:id/payment
// @access  Private
export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus, paymentId } = req.body;
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        if (ticket.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this ticket'
            });
        }

        if (!['pending', 'paid', 'failed'].includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment status'
            });
        }

        ticket.paymentStatus = paymentStatus;
        if (paymentId) {
            ticket.paymentId = paymentId;
        }

        if (paymentStatus === 'paid') {
            ticket.status = 'confirmed';
        }

        await ticket.save();

        res.json({
            success: true,
            message: 'Payment status updated successfully',
            data: ticket
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
