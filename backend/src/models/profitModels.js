import mongoose from 'mongoose';

const profitSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    totalRevenue: {
        type: Number,
        required: true
    },
    expenses: [{
        category: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: String
    }],
    netProfit: {
        type: Number,
        required: true
    },
    ticketSales: [{
        ticketType: String,
        quantity: Number,
        price: Number,
        total: Number
    }],
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Profit = mongoose.model('Profit', profitSchema);

export default Profit;
