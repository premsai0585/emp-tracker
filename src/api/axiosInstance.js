import axios from "axios";

const backendURL = 'http://127.0.0.1:5000/';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: backendURL
})

export default axiosInstance;