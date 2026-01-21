const axios = require('axios');

const testApi = async () => {
    try {
        // 1. Login as Faculty to get token
        console.log('Logging in as faculty...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'faculty@srit.ac.in',
            password: 'srit1234'
        });

        const token = loginRes.data.data.token;
        console.log('Login successful. Token obtained.');

        // 2. Get Students by Branch
        console.log('Fetching CSM students...');
        const studentsRes = await axios.get('http://localhost:5000/api/marks/branch/CSM', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('--- API RESPONSE ---');
        console.log('Count:', studentsRes.data.count);
        console.log('Data:', JSON.stringify(studentsRes.data.data, null, 2));

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

testApi();
