import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['manager', 'coordinator', 'staff'],
            required: true
        },
        permissions: [{
            type: String,
            enum: ['create_event', 'edit_event', 'manage_tickets', 'view_reports']
        }]
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, {
    timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
