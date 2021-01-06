const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    messages: [{
        recipient: {
            type: Schema.Types.ObjectId,
            ref: User,
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