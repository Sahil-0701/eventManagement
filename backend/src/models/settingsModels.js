import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    notifications: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        },
        eventUpdates: {
            type: Boolean,
            default: true
        },
        ticketUpdates: {
            type: Boolean,
            default: true
        }
    },
    theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'light'
    },
    language: {
        type: String,
        default: 'en'
    },
    timezone: {
        type: String,
        default: 'UTC'
    },
    profileVisibility: {
        type: String,
        enum: ['public', 'private', 'friends'],
        default: 'public'
    }
}, {
    timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
