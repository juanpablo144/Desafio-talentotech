import axios from "axios";

const iAxios = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

iAxios.interceptors.request.use(
    config => {
        if(config.data.acceptance != "false"){
            config.headers['Autorizacion'] = "Autorizo";
        }else{
            config.headers['Autorizacion'] = "No Autorizo";
            
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

iAxios.interceptors.response.use(
    response => {
        return (response)
    },
    error => {
        if (error.response && error.response === 401) {
            window.location.href = '/'
        }
        return (Promise.reject(error))
    }
);

export { iAxios };