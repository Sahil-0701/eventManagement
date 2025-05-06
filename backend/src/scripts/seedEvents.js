import mongoose from 'mongoose';
import Event from '../models/eventModels.js';
import User from '../models/userModels.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const seedEvents = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Find a host user
        const host = await User.findOne({ role: 'host' });
        if (!host) {
            console.error('No host user found. Please create a host user first.');
            process.exit(1);
        }

        // Sample events
        const events = [
            {
                title: 'Tech Conference 2024',
                description: 'Annual technology conference featuring the latest innovations',
                category: 'conference',
                startDate: new Date('2024-06-15'),
                endDate: new Date('2024-06-17'),
                venue: {
                    name: 'Convention Center',
                    address: '123 Tech Street',
                    city: 'Silicon Valley',
                    state: 'California',
                    country: 'USA'
                },
                ticketTypes: [
                    {
                        name: 'General Admission',
                        price: 299,
                        available: 100,
                        description: 'Access to all conference sessions'
                    },
                    {
                        name: 'VIP',
                        price: 599,
                        available: 50,
                        description: 'VIP access with premium seating and networking events'
                    }
                ],
                host: host._id,
                status: 'approved'
            },
            {
                title: 'Summer Music Festival',
                description: 'Three days of amazing music and performances',
                category: 'concert',
                startDate: new Date('2024-07-20'),
                endDate: new Date('2024-07-22'),
                venue: {
                    name: 'Central Park',
                    address: '456 Music Avenue',
                    city: 'New York',
                    state: 'New York',
                    country: 'USA'
                },
                ticketTypes: [
                    {
                        name: 'Single Day',
                        price: 99,
                        available: 200,
                        description: 'Access for one day of the festival'
                    },
                    {
                        name: 'Full Pass',
                        price: 249,
                        available: 100,
                        description: 'Access to all three days of the festival'
                    }
                ],
                host: host._id,
                status: 'approved'
            }
        ];

        // Clear existing events
        await Event.deleteMany({});

        // Insert new events
        const createdEvents = await Event.insertMany(events);
        console.log('Created events:', createdEvents);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding events:', error);
        process.exit(1);
    }
};

seedEvents();
