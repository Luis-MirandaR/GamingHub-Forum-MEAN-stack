const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`MongoDB connected on ${dbURL}`);
    })
    .catch(err => console.log(`MongoDB connection error: ${err}`));
    
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
    });
}
