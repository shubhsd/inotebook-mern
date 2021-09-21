const mongoose = require('mongoose');
const { Schema } = mongoose;

// Making schema for users

const notesSchema = new Schema({

    // Here we have to associate notes with specif user i.e no other user can see notes of different user so we will add field user here (we will kind of set foreign key here)

    user: {
        type: mongoose.Schema.Types.ObjectId,
        //Means here user is some object id of different model i.e foreign key
        // Here we are storing user id
        ref: 'user'
        //Here we will tell from which model we are taking reference from i.e ID from 
    },

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