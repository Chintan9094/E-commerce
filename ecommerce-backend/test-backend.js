import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

async function testBackend() {
    try {
        console.log('Testing Registration...');
        const regRes = await axios.post(`${API_URL}/register`, {
            name: 'Node Test User',
            email: 'nodetest@example.com',
            password: 'password123'
        });
        console.log('Registration successful:', regRes.data);

        console.log('Testing Login...');
        const loginRes = await axios.post(`${API_URL}/login`, {
            email: 'nodetest@example.com',
            password: 'password123'
        });
        console.log('Login successful:', loginRes.data);
        console.log('Cookies:', loginRes.headers['set-cookie']);

    } catch (error) {
        console.error('Test failed:', error.response ? error.response.data : error.message);
    }
}

testBackend();
