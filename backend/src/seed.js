import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModels.js';
import Event from './models/eventModels.js';
import Registration from './models/registrationModel.js';
import Feedback from './models/feedbackModels.js';
import Team from './models/teamModels.js';
import Settings from './models/settingsModels.js';
import Profit from './models/profitModels.js';
import Gallery from './models/Gallery.js';
import Task from './models/taskModels.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Event.deleteMany({});
        await Registration.deleteMany({});
        await Feedback.deleteMany({});
        await Team.deleteMany({});
        await Settings.deleteMany({});
        await Profit.deleteMany({});
        await Gallery.deleteMany({});
        await Task.deleteMany({});

        // Create users
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'Admin@123',
            role: 'admin',
            isVerified: true
        });

        const host = await User.create({
            name: 'Event Host',
            email: 'host@example.com',
            password: 'Host@123',
            role: 'host',
            isVerified: true
        });

        const users = await User.create([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'User@123',
                role: 'user',
                isVerified: true
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'User@123',
                role: 'user',
                isVerified: true
            }
        ]);

        // Create events
        const events = await Event.create([
            {
                title: 'Tech Conference 2024',
                description: 'Annual technology conference featuring the latest innovations',
                host: host._id,
                category: 'conference',
                startDate: new Date('2024-05-15'),
                endDate: new Date('2024-05-17'),
                venue: {
                    name: 'Convention Center',
                    address: '123 Tech Street',
                    city: 'New York',
                    state: 'NY',
                    country: 'USA'
                },
                ticketTypes: [
                    {
                        name: 'Early Bird',
                        price: 299,
                        quantity: 100,
                        available: 100,
                        description: 'Early bird ticket with full access'
                    },
                    {
                        name: 'Regular',
                        price: 399,
                        quantity: 200,
                        available: 200,
                        description: 'Regular ticket with full access'
                    }
                ],
                status: 'approved',
                images: [
                    {
                        url: 'https://example.com/tech-conference.jpg',
                        isMain: true
                    }
                ],
                capacity: 500,
                registrationDeadline: new Date('2024-05-10')
            },
            {
                title: 'Music Festival',
                description: 'Three-day music festival with top artists',
                host: host._id,
                category: 'concert',
                startDate: new Date('2024-06-20'),
                endDate: new Date('2024-06-22'),
                venue: {
                    name: 'Central Park',
                    address: 'Central Park West',
                    city: 'New York',
                    state: 'NY',
                    country: 'USA'
                },
                ticketTypes: [
                    {
                        name: 'VIP',
                        price: 499,
                        quantity: 50,
                        available: 50,
                        description: 'VIP access with backstage pass'
                    },
                    {
                        name: 'General',
                        price: 199,
                        quantity: 1000,
                        available: 1000,
                        description: 'General admission ticket'
                    }
                ],
                status: 'approved',
                images: [
                    {
                        url: 'https://example.com/music-festival.jpg',
                        isMain: true
                    }
                ],
                capacity: 10000,
                registrationDeadline: new Date('2024-06-15')
            }
        ]);

        // Create registrations
        await Registration.create([
            {
                event: events[0]._id,
                user: users[0]._id,
                ticketType: events[0].ticketTypes[0],
                quantity: 2,
                totalAmount: 598,
                status: 'confirmed',
                paymentStatus: 'completed',
                paymentDetails: {
                    method: 'credit_card',
                    transactionId: 'txn_123456',
                    amount: 598,
                    currency: 'USD',
                    status: 'completed',
                    timestamp: new Date()
                },
                attendees: [
                    {
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '+1234567890'
                    },
                    {
                        name: 'Jane Doe',
                        email: 'jane@example.com',
                        phone: '+1234567891'
                    }
                ]
            }
        ]);

        // Create feedback
        await Feedback.create({
            user: users[0]._id,
            event: events[0]._id,
            rating: 5,
            comment: 'Great event! Learned a lot.',
            status: 'approved'
        });

        // Create team
        await Team.create({
            host: host._id,
            name: 'Event Management Team',
            members: [
                {
                    user: users[0]._id,
                    role: 'manager',
                    permissions: ['create_event', 'edit_event', 'manage_tickets', 'view_reports']
                }
            ],
            events: [events[0]._id]
        });

        // Create settings
        await Settings.create([
            {
                user: admin._id,
                notifications: {
                    email: true,
                    push: true,
                    eventUpdates: true,
                    ticketUpdates: true
                },
                theme: 'light',
                language: 'en',
                timezone: 'UTC',
                profileVisibility: 'public'
            },
            {
                user: host._id,
                notifications: {
                    email: true,
                    push: true,
                    eventUpdates: true,
                    ticketUpdates: true
                },
                theme: 'dark',
                language: 'en',
                timezone: 'UTC',
                profileVisibility: 'public'
            }
        ]);

        // Create profit records
        await Profit.create({
            host: host._id,
            event: events[0]._id,
            totalRevenue: 10000,
            expenses: [
                {
                    category: 'Venue',
                    amount: 5000,
                    description: 'Venue rental for 3 days'
                },
                {
                    category: 'Marketing',
                    amount: 2000,
                    description: 'Social media and email marketing'
                }
            ],
            netProfit: 3000,
            ticketSales: [
                {
                    ticketType: 'Early Bird',
                    quantity: 50,
                    price: 299,
                    total: 14950
                }
            ]
        });

        // Create gallery
        await Gallery.create({
            eventId: events[0]._id,
            images: [
                {
                    url: 'https://example.com/event-photo1.jpg',
                    caption: 'Opening ceremony',
                    uploadedBy: host._id
                }
            ]
        });

        // Create tasks
        await Task.create({
            event: events[0]._id,
            title: 'Setup Registration Desk',
            description: 'Set up registration desk and check-in system',
            assignedTo: users[0]._id,
            status: 'pending',
            priority: 'high',
            dueDate: new Date('2024-05-14'),
            createdBy: host._id
        });

        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
