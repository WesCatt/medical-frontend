import axios from "axios";

const baseURL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_DEV_URL;

const api = axios.create({
    baseURL,
});


export default api;