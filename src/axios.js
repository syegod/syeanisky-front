import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
})

export default instance;