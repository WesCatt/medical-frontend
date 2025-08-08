import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' ? "http://medical-backend.westcat.cn/api" : "http://127.0.0.1:2587/api";

const api = axios.create({
    baseURL,
});


export default api;