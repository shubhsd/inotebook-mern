const mongoose = require('mongoose');
const { Schema } = mongoose;

// Making schema for users

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);

// Here mongoose.model takes 2 arguments - 1.) name of model 2.) schema name
// This schema would be used in the routes.