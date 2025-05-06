import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import  ticketRouter  from './routes/ticketRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { taskRouter } from './routes/taskRoutes.js';
import { galleryRouter } from './routes/galleryRoutes.js';

import { authRouter } from './routes/authRoutes.js';
import { eventRouter } from './routes/eventRoutes.js';
import { hostRouter } from './routes/hostRoutes.js';
import { registrationRouter } from './routes/registrationRoutes.js';
import { analyticsRouter } from './routes/analyticsRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/hosts', hostRouter);
app.use('/api/registrations', registrationRouter);
app.use('/api/analytics', analyticsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

export default app; 