import axiox from 'axios';

const api = axiox.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true
});

export default api;
