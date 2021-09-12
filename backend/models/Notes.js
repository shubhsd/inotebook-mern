const mongoose = require('mongoose');
const { Schema } = mongoose;

// Making schema for users

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', notesSchema);

// Here mongoose.model takes 2 arguments - 1.) name of model 2.) schema name
// This schema would be used in the routes.