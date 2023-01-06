import { ENVConfig } from '@config/env';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const AxiosClient = axios.create({
    baseURL: ENVConfig.API_URL,
    headers: {
        'content-type': 'application/json',
    },
});

// handle request to convert all api requests to snake_case
AxiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (config.headers && config.headers['Content-Type'] === 'multipart/form-data') return config;

    return config;
});

// handle response to convert all api responses to camelCase
AxiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            // cover response to camelCase
            return response.data;
        }
        return response;
    },
    (error) => {
        return error;
    }
);

export default AxiosClient;
