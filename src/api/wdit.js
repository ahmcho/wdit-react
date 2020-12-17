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

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    const errorJSON = JSON.parse(error.request.response);
    return Promise.reject(errorJSON.message)
});

export default instance;