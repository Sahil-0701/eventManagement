import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['concert', 'conference', 'workshop', 'exhibition', 'sports', 'other']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    venue: {
        name: String,
        address: String,
        city: String,
        state: String,
        country: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    ticketTypes: [{
        name: String,
        price: Number,
        quantity: Number,
        available: Number,
        description: String
    }],
    status: {
        type: String,
        enum: ['draft', 'pending', 'approved', 'rejected', 'cancelled', 'completed'],
        default: 'draft'
    },
    images: [{
        url: String,
        publicId: String,
        isMain: {
            type: Boolean,
            default: false
        }
    }],
    tags: [String],
    capacity: Number,
    registrationDeadline: Date,
    requirements: [String],
    rating: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
eventSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Event = mongoose.model('Event', eventSchema);

export { Event }; 