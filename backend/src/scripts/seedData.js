import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userModels.js';
import Event from '../models/eventModels.js';
import Feedback from '../models/feedbackModels.js';
import Team from '../models/teamModels.js';
import Profit from '../models/profitModels.js';
import Settings from '../models/settingsModels.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedUsers = async () => {
    try {
        // Clear existing users
        await User.deleteMany({});

        const password = 'Rudra@1234';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create sample users
        const users = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin'
            },
            {
                name: 'Host User',
                email: 'host@example.com',
                password: hashedPassword,
                role: 'host'
            },
            {
                name: 'Regular User',
                email: 'user@example.com',
                password: hashedPassword,
                role: 'user'
            }
        ];

        // Create users
        await User.insertMany(users);

        console.log('Sample users created with passwords:');
        console.log('Admin: admin@example.com / Rudra@1234');
        console.log('Host: host@example.com / Rudra@1234');
        console.log('User: user@example.com / Rudra@1234');
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

const seedEvents = async () => {
    try {
        await Event.deleteMany({});
        
        const host = await User.findOne({ role: 'host' });
        
        const events = [
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
                        name: 'General Admission',
                        price: 299.99,
                        quantity: 400,
                        available: 400,
                        description: 'Access to all conference sessions'
                    },
                    {
                        name: 'VIP',
                        price: 499.99,
                        quantity: 100,
                        available: 100,
                        description: 'VIP access with premium benefits'
                    }
                ],
                status: 'approved',
                images: [{
                    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
                    isMain: true
                }],
                capacity: 500
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
                        name: 'Single Day',
                        price: 199.99,
                        quantity: 3000,
                        available: 3000,
                        description: 'Access for one day'
                    },
                    {
                        name: 'Full Pass',
                        price: 499.99,
                        quantity: 2000,
                        available: 2000,
                        description: 'Access for all three days'
                    }
                ],
                status: 'approved',
                images: [{
                    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
                    isMain: true
                }],
                capacity: 10000
            }
        ];

        await Event.insertMany(events);
        console.log('Sample events created');
    } catch (error) {
        console.error('Error seeding events:', error);
        process.exit(1);
    }
};

const seedFeedback = async () => {
    try {
        await Feedback.deleteMany({});
        console.log('Feedback collection cleared');
    } catch (error) {
        console.error('Error seeding feedback:', error);
        process.exit(1);
    }
};

const seedTeams = async () => {
    try {
        await Team.deleteMany({});
        console.log('Teams collection cleared');
    } catch (error) {
        console.error('Error seeding teams:', error);
        process.exit(1);
    }
};

const seedProfits = async () => {
    try {
        await Profit.deleteMany({});
        console.log('Profits collection cleared');
    } catch (error) {
        console.error('Error seeding profits:', error);
        process.exit(1);
    }
};

const seedSettings = async () => {
    try {
        await Settings.deleteMany({});
        console.log('Settings collection cleared');
    } catch (error) {
        console.error('Error seeding settings:', error);
        process.exit(1);
    }
};

const seedAll = async () => {
    try {
        await connectDB();
        await seedUsers();
        await seedEvents();
        await seedFeedback();
        await seedTeams();
        await seedProfits();
        await seedSettings();
        console.log('All seed data created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

// Run the seed function
seedAll(); 