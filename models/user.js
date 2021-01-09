const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        recipient: {
            type: Schema.Types.ObjectId,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date
        }
    }]
});

module.exports = mongoose.model('User', userSchema);