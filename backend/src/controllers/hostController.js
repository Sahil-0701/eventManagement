import { Event } from '../models/eventModels.js';
import Booking from '../models/bookingModels.js';
import User from '../models/userModels.js';

// Get host dashboard statistics
export const getHostStats = async (req, res) => {
  try {
    const hostId = req.user._id;

    const totalEvents = await Event.countDocuments({ host: hostId });

    const upcomingEvents = await Event.countDocuments({
      host: hostId,
      date: { $gte: new Date() }
    });

    const events = await Event.find({ host: hostId });
    const eventIds = events.map(event => event._id);

    const bookings = await Booking.find({ event: { $in: eventIds } });
    const totalTickets = bookings.reduce((sum, booking) => sum + booking.tickets, 0);
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

    res.json({
      totalEvents,
      totalRevenue,
      totalTickets,
      upcomingEvents
    });
  } catch (error) {
    console.error('Error fetching host stats:', error);
    res.status(500).json({ message: 'Error fetching host statistics' });
  }
};

// Get host's events
export const getHostEvents = async (req, res) => {
  try {
    const hostId = req.user._id;
    const events = await Event.find({ host: hostId })
      .populate('team', 'name email')
      .sort({ date: -1 });

    const eventsWithStats = await Promise.all(events.map(async (event) => {
      const bookings = await Booking.find({ event: event._id });
      const ticketsSold = bookings.reduce((sum, booking) => sum + booking.tickets, 0);
      const revenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

      return {
        ...event.toObject(),
        ticketsSold,
        revenue
      };
    }));

    res.json(eventsWithStats);
  } catch (error) {
    console.error('Error fetching host events:', error);
    res.status(500).json({ message: 'Error fetching host events' });
  }
};

// Add team member to event
export const addTeamMember = async (req, res) => {
  try {
    const { eventId, email } = req.body;
    const hostId = req.user._id;

    const event = await Event.findOne({ _id: eventId, host: hostId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (event.team.includes(user._id)) {
      return res.status(400).json({ message: 'User is already in the team' });
    }

    event.team.push(user._id);
    await event.save();

    res.json({ message: 'Team member added successfully' });
  } catch (error) {
    console.error('Error adding team member:', error);
    res.status(500).json({ message: 'Error adding team member' });
  }
};

// Remove team member from event
export const removeTeamMember = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const hostId = req.user._id;

    const event = await Event.findOne({ _id: eventId, host: hostId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.team = event.team.filter(memberId => memberId.toString() !== userId);
    await event.save();

    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    console.error('Error removing team member:', error);
    res.status(500).json({ message: 'Error removing team member' });
  }
};

// Delete host account
export const deleteHost = async (req, res) => {
  try {
    const hostId = req.user._id;

    // Delete all events associated with the host
    await Event.deleteMany({ host: hostId });

    // Delete the host's user account
    await User.findByIdAndDelete(hostId);

    res.json({
      success: true,
      message: 'Host account and associated events deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting host account:', error);
    res.status(500).json({ message: 'Error deleting host account' });
  }
};
