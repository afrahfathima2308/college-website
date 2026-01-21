const mongoose = require('mongoose');
const User = require('./src/models/User');
const config = require('./src/config/env');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://afrahfathimasowdagar_db_user:Affu23110805XYZ@cluster0.tpargf4.mongodb.net/sritDB?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to DB');

        const students = await User.find({ role: 'student' });
        console.log('--- ALL STUDENTS ---');
        students.forEach(s => {
            console.log(`Name: ${s.name}, Email: ${s.email}, Branch: ${s.branch || 'UNDEFINED'}`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUsers();
