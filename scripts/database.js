const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase() {
    try {
        const connectionString = process.env.MONGODB_URI;
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
    }
}

function getDb() {
    const db = mongoose.connection;
    if (!db || db.readyState !== 1) {
        throw new Error('Database connection not established!');
    }
    return db; 
}

function closeDatabase() {
    const db = mongoose.connection;
    if (db) {
        db.close();
        console.log('Database connection closed');
    }
}

module.exports = {
    connectToDatabase,
    getDb,
    closeDatabase
};
