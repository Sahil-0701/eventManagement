import { Event } from '../models/eventModels.js';
import { Ticket } from '../models/ticketModels.js';

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Host
export const createEvent = async (req, res) => {
    try {
        const event = await Event.create({
            ...req.body,
            host: req.user._id,
            status: 'draft'
        });

        res.status(201).json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
    try {
        const { category, status, search, page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        console.log('Query:', query);
        const events = await Event.find(query)
            .populate('host', 'username email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        console.log('Found events:', events);

        const count = await Event.countDocuments(query);
        console.log('Total count:', count);

        res.json({
            success: true,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: events
        });
    } catch (error) {
        console.error('Error in getEvents:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('host', 'username email');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Host
export const updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user is the host or admin
        if (event.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this event'
            });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Host
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user is the host or admin
        if (event.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this event'
            });
        }

        await event.remove();

        res.json({
            success: true,
            message: 'Event removed'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Submit event for approval
// @route   PUT /api/events/:id/submit
// @access  Private/Host
export const submitEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (event.host.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to submit this event'
            });
        }

        event.status = 'pending';
        await event.save();

        res.json({
            success: true,
            message: 'Event submitted for approval',
            data: event
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Approve/reject event
// @route   PUT /api/events/:id/approve
// @access  Private/Admin
export const approveEvent = async (req, res) => {
    try {
        const { status } = req.body;
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        event.status = status;
        await event.save();

        res.json({
            success: true,
            message: `Event ${status}`,
            data: event
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get events by host
// @route   GET /api/events/host/me
// @access  Private/Host
export const getHostEvents = async (req, res) => {
    try {
        const events = await Event.find({ host: req.user._id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get event statistics
// @route   GET /api/events/:id/stats
// @access  Private/Host
export const getEventStats = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('ticketTypes')
            .populate('registrations');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        const tickets = await Ticket.find({ event: event._id })
            .populate('ticketType');

        res.status(200).json({
            success: true,
            data: {
                totalRegistrations: event.registrations.length,
                totalRevenue: tickets.reduce((acc, t) => acc + (t.ticketType.price * t.quantity), 0),
                ticketTypes: event.ticketTypes.map(type => ({
                    ...type.toObject(),
                    sold: tickets.filter(t => t.ticketType.name === type.name)
                        .reduce((acc, t) => acc + t.quantity, 0)
                }))
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 