const mongoose = require('mongoose');

// To suppress the warning and use the new default behavior
mongoose.set('strictQuery', false);

const connectDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Database connected: ',
        connect.connection.host,
        connect.connection.name 
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;