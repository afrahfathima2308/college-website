const mongoose = require('mongoose');
const User = require('./src/models/User');
const Booking = require('./src/models/Booking');
const Mark = require('./src/models/Mark');
const config = require('./src/config/env');

const resetDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://afrahfathimasowdagar_db_user:Affu23110805XYZ@cluster0.tpargf4.mongodb.net/sritDB?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to DB');

        console.log('Deleting all Bookings...');
        await Booking.deleteMany({});

        console.log('Deleting all Marks...');
        await Mark.deleteMany({});

        console.log('Deleting all Users...');
        await User.deleteMany({});

        console.log('✅ Database successfully reset!');
        process.exit(0);
    } catch (error) {
        console.error('Error resetting database:', error);
        process.exit(1);
    }
};

resetDatabase();
