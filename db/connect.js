const mongoose = require('mongoose');

const Connect = async () => {
    try {
        const mongoURI = process.env.MONGO_LOCAL_URL;

        if (!mongoURI) {
            console.error('MONGO_LOCAL_URL is not defined.');
            return;
        }

        // Connect without deprecated options
        await mongoose.connect(mongoURI);

        mongoose.connection.on('connected', () => {
            console.log('Connected to Database');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose default connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });

    } catch (error) {
        console.error('Some unexpected error occurred\nMore info:', error);
    }
};

module.exports = { Connect };
