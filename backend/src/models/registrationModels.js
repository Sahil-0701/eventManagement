import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ticketType: {
        name: String,
        price: Number
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'refunded'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'wallet'],
        required: true
    },
    paymentDetails: {
        transactionId: String,
        paymentDate: Date,
        amount: Number
    },
    attendees: [{
        name: String,
        email: String,
        phone: String
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
registrationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Registration = mongoose.model('Registration', registrationSchema);

export { Registration }; 