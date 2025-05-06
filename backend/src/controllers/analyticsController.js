import { Event } from '../models/eventModels.js';
import { Registration } from '../models/registrationModels.js';
import Profit from '../models/profitModels.js';


// @desc    Get admin dashboard insights
// @route   GET /api/analytics/admin
// @access  Private/Admin
export const getAdminInsights = async (req, res) => {
    try {
        const [
            totalEvents,
            pendingEvents,
            totalRevenue,
            totalUsers,
            totalHosts,
            recentEvents
        ] = await Promise.all([
            Event.countDocuments(),
            Event.countDocuments({ status: 'pending' }),
            Registration.aggregate([
                { $match: { paymentStatus: 'completed' } },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]),
            Event.distinct('host').count(),
            Event.countDocuments({ status: 'approved' }),
            Event.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('host', 'name email')
        ]);

        res.json({
            success: true,
            data: {
                totalEvents,
                pendingEvents,
                totalRevenue: totalRevenue[0]?.total || 0,
                totalUsers,
                totalHosts,
                recentEvents
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get host dashboard insights
// @route   GET /api/analytics/host
// @access  Private/Host
export const getHostInsights = async (req, res) => {
    try {
        const [
            myEvents,
            totalRevenue,
            totalTickets,
            upcomingEvents,
            profitData
        ] = await Promise.all([
            Event.countDocuments({ host: req.user._id }),
            Registration.aggregate([
                { 
                    $match: { 
                        paymentStatus: 'completed',
                        event: { $in: await Event.find({ host: req.user._id }).distinct('_id') }
                    } 
                },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]),
            Registration.countDocuments({
                event: { $in: await Event.find({ host: req.user._id }).distinct('_id') }
            }),
            Event.find({ 
                host: req.user._id,
                startDate: { $gt: new Date() }
            })
            .sort({ startDate: 1 })
            .limit(5),
            Profit.find({ host: req.user._id })
                .sort({ date: -1 })
                .limit(5)
        ]);

        res.json({
            success: true,
            data: {
                myEvents,
                totalRevenue: totalRevenue[0]?.total || 0,
                totalTickets,
                upcomingEvents,
                profitData
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get event-specific analytics
// @route   GET /api/analytics/event/:id
// @access  Private/Host
export const getEventAnalytics = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (event.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this event analytics'
            });
        }

        const [
            registrations,
            revenue,
            ticketTypes,
            profit
        ] = await Promise.all([
            Registration.find({ event: req.params.id })
                .populate('user', 'name email'),
            Registration.aggregate([
                { 
                    $match: { 
                        event: event._id,
                        paymentStatus: 'completed'
                    } 
                },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]),
            Registration.aggregate([
                { $match: { event: event._id } },
                { $group: { 
                    _id: '$ticketType.name',
                    count: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }}
            ]),
            Profit.findOne({ event: req.params.id })
        ]);

        res.json({
            success: true,
            data: {
                event,
                totalRegistrations: registrations.length,
                totalRevenue: revenue[0]?.total || 0,
                ticketTypes,
                profit,
                registrations
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 