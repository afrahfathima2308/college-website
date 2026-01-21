const mongoose = require('mongoose');
const User = require('./src/models/User');
const config = require('./src/config/env');

const migrateUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://afrahfathimasowdagar_db_user:Affu23110805XYZ@cluster0.tpargf4.mongodb.net/sritDB?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to DB');

        const result = await User.updateMany(
            { role: 'student', branch: { $exists: false } }, // Criteria: Student and no branch
            { $set: { branch: 'CSM' } } // Update: Set branch to CSM by default
        );

        console.log(`Updated ${result.modifiedCount} users to branch CSM`);

        // Check again
        const students = await User.find({ role: 'student' });
        console.log('--- UPDATED STUDENTS ---');
        students.forEach(s => {
            console.log(`Name: ${s.name}, Branch: ${s.branch}`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

migrateUsers();
