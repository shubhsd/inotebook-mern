// Connection to mongodb (database)

const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false' //Copied from mongo db compass

const connectToMongo = async () => {
    mongoose.connect(mongoUri, () => {
        console.log('connected to mongo successfully ++++++  log coming from db.js file');
    });
};

module.exports = connectToMongo;

