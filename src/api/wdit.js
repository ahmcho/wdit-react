import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://wdit-api-ac.herokuapp.com/'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;