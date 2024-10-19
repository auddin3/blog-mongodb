const mongoose = require('mongoose');
let database;

async function connect() {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/blog');
        
        database = mongoose.connection;  
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
    }
}

function getDb() {
    if (!database || database.readyState !== 1) {
        throw { message: 'Database connection not established!' };
    }
    return database;
}

function closeDatabase() {
    if (database) mongoose.connection.close()
}

module.exports = {
    connectToDatabase: connect,
    getDb,
    closeDatabase
};
