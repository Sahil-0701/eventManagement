import mongoose from 'mongoose';
import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing users
        await User.deleteMany({});

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // Create a host user
        const host = await User.create({
            name: 'Test Host',
            email: 'host@example.com',
            password: hashedPassword,
            role: 'host'
        });

        // Create a regular user
        const user = await User.create({
            name: 'Test User',
            email: 'user@example.com',
            password: hashedPassword,
            role: 'user'
        });

        console.log('Created host user:', host);
        console.log('Created regular user:', user);
        console.log('\nYou can now login with these credentials:');
        console.log('Host User - Email: host@example.com, Password: password123');
        console.log('Regular User - Email: user@example.com, Password: password123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
