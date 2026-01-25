import axios from "axios";
import type { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true, // 🔒 Absolute requirement for cookies
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;
